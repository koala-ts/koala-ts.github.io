#!/usr/bin/env bash

set -euo pipefail

json_value() {
  node -e '
    const data = JSON.parse(process.argv[1]);
    const path = process.argv[2].split(".");
    let value = data;

    for (const key of path) {
      value = value?.[key];
    }

    if (value === undefined || value === null) {
      process.exit(1);
    }

    process.stdout.write(String(value));
  ' "$1" "$2"
}

resolve_site_base() {
  if [ -n "${SITE_BASE:-}" ]; then
    return
  fi

  if [ -f .gh-pages/CNAME ]; then
    DOMAIN=$(head -n 1 .gh-pages/CNAME | tr -d '[:space:]')
    SITE_URL="https://${DOMAIN}"
    SITE_BASE="/"
    return
  fi

  OWNER_LC=$(echo "${GITHUB_REPOSITORY_OWNER}" | tr '[:upper:]' '[:lower:]')
  REPO_NAME="${GITHUB_REPOSITORY#*/}"
  REPO_LC=$(echo "${REPO_NAME}" | tr '[:upper:]' '[:lower:]')
  SITE_URL="https://${GITHUB_REPOSITORY_OWNER}.github.io"

  if [ "${REPO_LC}" = "${OWNER_LC}.github.io" ]; then
    SITE_BASE="/"
  else
    SITE_BASE="/${REPO_NAME}/"
  fi
}

build_release_registry_json() {
  RELEASE_REGISTRY_JSON=$(
    node -e '
      const canonicalBranch = process.env.CANONICAL_BRANCH;
      const deployableBranches = (process.env.DEPLOYABLE_BRANCHES || canonicalBranch)
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);

      process.stdout.write(
        JSON.stringify({
          defaultBranch: canonicalBranch,
          deployableBranches,
        }),
      );
    '
  )
}

TARGET_BRANCH=${TARGET_BRANCH:?TARGET_BRANCH is required}
CANONICAL_BRANCH=${CANONICAL_BRANCH:?CANONICAL_BRANCH is required}
GITHUB_TOKEN=${GITHUB_TOKEN:?GITHUB_TOKEN is required}
WRITE_GITHUB_OUTPUT=${WRITE_GITHUB_OUTPUT:-true}

GITHUB_OUTPUT_ARGS=()

if [ "${WRITE_GITHUB_OUTPUT}" = "true" ] && [ -n "${GITHUB_OUTPUT:-}" ]; then
  GITHUB_OUTPUT_ARGS=(--github-output "${GITHUB_OUTPUT}")
fi

build_release_registry_json

REMOTE_BRANCHES=$(git ls-remote --heads origin | awk '{print $2}' | sed 's#refs/heads/##' | paste -sd ',' -)

DEPLOYMENT_JSON=$(
  node release-policy/node.js deploy-branch \
    "${TARGET_BRANCH}" \
    --registry-source "${RELEASE_REGISTRY_JSON}" \
    --existing-branches "${REMOTE_BRANCHES}" \
    "${GITHUB_OUTPUT_ARGS[@]}"
)

SHOULD_SKIP=$(json_value "${DEPLOYMENT_JSON}" "availability.shouldSkip")

if [ "${SHOULD_SKIP}" = "true" ]; then
  echo "$(json_value "${DEPLOYMENT_JSON}" "availability.skipReason")"
  exit 0
fi

rm -rf source .gh-pages
git worktree prune
git worktree add --detach source "origin/${TARGET_BRANCH}"

(
  cd source
  npm ci
)

if git ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1; then
  git clone --depth 1 --branch gh-pages "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" .gh-pages
else
  mkdir -p .gh-pages
  (
    cd .gh-pages
    git init
    git checkout --orphan gh-pages
    git remote add origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
  )
fi

resolve_site_base

mkdir -p .gh-pages/docs

PREPARED_JSON=$(
  node release-policy/node.js deploy-branch \
    "${TARGET_BRANCH}" \
    --registry-source "${RELEASE_REGISTRY_JSON}" \
    --existing-branches "${REMOTE_BRANCHES}" \
    --site-base "${SITE_BASE}" \
    --catalog-path ".gh-pages/docs/versions.json" \
    --manifest-path ".gh-pages/docs/doc-paths.json" \
    --docs-dir "source/docs" \
    "${GITHUB_OUTPUT_ARGS[@]}"
)

CURRENT_BRANCH=$(json_value "${PREPARED_JSON}" "publishContext.currentBranch")
DEFAULT_BRANCH=$(json_value "${PREPARED_JSON}" "publishContext.defaultBranch")
VERSION_SLUG=$(json_value "${PREPARED_JSON}" "publishContext.versionSlug")
DOCS_ROUTE_BASE_PATH=$(json_value "${PREPARED_JSON}" "publishContext.docsRouteBasePath")
IS_DEFAULT_BRANCH=$(json_value "${PREPARED_JSON}" "publishContext.isDefaultBranch")
BUILD_BASE_URL=$(json_value "${PREPARED_JSON}" "layout.buildBaseUrl")
PUBLISH_SOURCE_DIR=$(json_value "${PREPARED_JSON}" "layout.publishSourceDir")
PUBLISH_TARGET_DIR=$(json_value "${PREPARED_JSON}" "layout.publishTargetDir")
VERSIONED_DOCS_DIR=$(json_value "${PREPARED_JSON}" "layout.versionedDocsDir")
VERSION_CSV=$(json_value "${PREPARED_JSON}" "versionCatalog.versionCsv")

(
  cd source
  DOCS_CURRENT_BRANCH="${CURRENT_BRANCH}" \
    DOCS_DEFAULT_BRANCH="${DEFAULT_BRANCH}" \
    DOCS_VERSION="${VERSION_SLUG}" \
    DOCS_VERSIONS="${VERSION_CSV}" \
    DOCS_SITE_BASE="${SITE_BASE}" \
    DOCS_BASE_URL="${BUILD_BASE_URL}" \
    DOCS_ROUTE_BASE_PATH="${DOCS_ROUTE_BASE_PATH}" \
    SITE_URL="${SITE_URL}" \
    npm run build
)

if [ "${IS_DEFAULT_BRANCH}" = "true" ]; then
  rm -rf "${VERSIONED_DOCS_DIR}"

  rsync -a --delete \
    --exclude .git \
    --exclude '.git/***' \
    --exclude docs \
    --exclude 'docs/***' \
    --exclude CNAME \
    source/build/ .gh-pages/

  VERSION_EXCLUDES=$(printf '%s\n' "${VERSION_CSV}" | tr ',' '\n' | sed '/^$/d' | sed 's#^#--exclude=#')

  mkdir -p .gh-pages/docs
  rsync -a --delete \
    --exclude .git \
    --exclude '.git/***' \
    --exclude=versions.json \
    --exclude=doc-paths.json \
    ${VERSION_EXCLUDES} \
    source/build/docs/ .gh-pages/docs/
else
  mkdir -p "${PUBLISH_TARGET_DIR}"
  rsync -a --delete \
    --exclude .git \
    --exclude '.git/***' \
    "source/${PUBLISH_SOURCE_DIR}/" \
    "${PUBLISH_TARGET_DIR}/"
fi

(
  cd .gh-pages
  git config user.name "github-actions[bot]"
  git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
  git add .

  if git diff --cached --quiet; then
    echo "No changes to publish"
    exit 0
  fi

  git commit -m "chore: publish docs ${VERSION_SLUG}"
  git pull --rebase origin gh-pages || true
  git push origin HEAD:gh-pages
)
