const {buildCanonicalDocsContentPath} = require('./build-canonical-site-paths');

const trimSlashes = (value) => value.replace(/^\/+|\/+$/g, '');

const parseCurrentDocPath = ({
  currentPathname,
  defaultBranch,
  docsSiteBase = '/',
  targetVersion,
}) => {
  const normalizedCurrentPathname = trimSlashes(currentPathname);
  const normalizedSiteBase = trimSlashes(docsSiteBase);

  if (normalizedSiteBase) {
    const siteBasePrefix = `${normalizedSiteBase}/`;

    if (!normalizedCurrentPathname.startsWith(siteBasePrefix)) {
      return null;
    }
  }

  const relativePath = normalizedSiteBase
    ? normalizedCurrentPathname.slice(normalizedSiteBase.length + 1)
    : normalizedCurrentPathname;

  const segments = relativePath.split('/').filter(Boolean);

  if (segments[0] !== 'docs' || segments.length < 2) {
    return null;
  }

  if (segments[1] === targetVersion) {
    return trimSlashes(segments.slice(2).join('/')) || null;
  }

  if (segments[1] === defaultBranch || segments[1] === 'next') {
    return trimSlashes(segments.slice(2).join('/')) || null;
  }

  return trimSlashes(segments.slice(1).join('/')) || null;
};

const resolveVersionSwitchTarget = ({
  availableDocPathsByVersion,
  currentPathname,
  defaultBranch,
  docsSiteBase = '/',
  fallbackDocPath,
  targetVersion,
}) => {
  const normalizedFallbackDocPath = trimSlashes(fallbackDocPath);
  const currentDocPath = parseCurrentDocPath({
    currentPathname,
    defaultBranch,
    docsSiteBase,
    targetVersion,
  });
  const targetDocPaths = new Set(availableDocPathsByVersion[targetVersion] ?? []);
  const targetDocPath =
    currentDocPath && targetDocPaths.has(currentDocPath)
      ? currentDocPath
      : normalizedFallbackDocPath;

  return buildCanonicalDocsContentPath({
    docsSiteBase,
    defaultBranch,
    versionSlug: targetVersion,
    docPath: targetDocPath,
  });
};

module.exports = {
  parseCurrentDocPath,
  resolveVersionSwitchTarget,
};
