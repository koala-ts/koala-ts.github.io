import {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type VersionPathsManifest = Record<string, string[]>;

type SwitchTarget = {
  href: string;
  label: string;
};

type CustomFields = {
  defaultBranch: string;
  docsSiteBase: string;
  versionFallbackDocPath: string;
};

type UseVersionSwitchTargetsParams = {
  currentVersion: string;
  versions: string[];
};

const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, '');

const normalizeBasePath = (value: string): string => {
  const trimmed = value.trim();
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const withTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return withTrailingSlash.replace(/\/{2,}/g, '/');
};

const buildCanonicalHomePath = ({docsSiteBase}: {docsSiteBase: string}): string =>
  normalizeBasePath(docsSiteBase);

const buildSharedDocsManifestPath = ({
  docsSiteBase,
}: {
  docsSiteBase: string;
}): string => `${buildCanonicalHomePath({docsSiteBase})}docs/doc-paths.json`;

const buildAbsoluteSiteUrl = ({
  siteUrl,
  path,
}: {
  siteUrl: string;
  path: string;
}): string => `${siteUrl.replace(/\/+$/, '')}${path}`;

const buildCanonicalDocsRootPath = ({
  docsSiteBase,
  defaultBranch,
  version,
}: {
  docsSiteBase: string;
  defaultBranch: string;
  version: string;
}): string => {
  const homePath = buildCanonicalHomePath({docsSiteBase});

  if (version === defaultBranch) {
    return `${homePath}docs/`;
  }

  if (version === 'main') {
    return `${homePath}docs/next/`;
  }

  return `${homePath}docs/${version}/`;
};

const buildCanonicalDocsContentPath = ({
  docsSiteBase,
  defaultBranch,
  version,
  docPath,
}: {
  docsSiteBase: string;
  defaultBranch: string;
  version: string;
  docPath: string;
}): string =>
  `${buildCanonicalDocsRootPath({docsSiteBase, defaultBranch, version})}${trimSlashes(docPath)}`;

const parseCurrentDocPath = ({
  currentPathname,
  defaultBranch,
  docsSiteBase,
  targetVersion,
}: {
  currentPathname: string;
  defaultBranch: string;
  docsSiteBase: string;
  targetVersion: string;
}): string | null => {
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
  docsSiteBase,
  fallbackDocPath,
  targetVersion,
}: {
  availableDocPathsByVersion: VersionPathsManifest;
  currentPathname: string;
  defaultBranch: string;
  docsSiteBase: string;
  fallbackDocPath: string;
  targetVersion: string;
}): string => {
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
      : trimSlashes(fallbackDocPath);

  return buildCanonicalDocsContentPath({
    docsSiteBase,
    defaultBranch,
    version: targetVersion,
    docPath: targetDocPath,
  });
};

export const useVersionSwitchTargets = ({
  currentVersion,
  versions,
}: UseVersionSwitchTargetsParams): SwitchTarget[] => {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const {defaultBranch, docsSiteBase, versionFallbackDocPath} =
    siteConfig.customFields as CustomFields;
  const manifestUrl = buildAbsoluteSiteUrl({
    siteUrl: siteConfig.url,
    path: buildSharedDocsManifestPath({docsSiteBase}),
  });
  const [manifest, setManifest] = useState<VersionPathsManifest>({});

  useEffect(() => {
    let cancelled = false;

    fetch(manifestUrl).then((response) => (response.ok ? response.json() : {})).then((loadedManifest) => {
      if (!cancelled) {
        setManifest(loadedManifest);
      }
    }).catch(() => {
      if (!cancelled) {
        setManifest({});
      }
    });

    return () => {
      cancelled = true;
    };
  }, [manifestUrl]);

  return versions.map((version) => ({
    href: buildAbsoluteSiteUrl({
      siteUrl: siteConfig.url,
      path: resolveVersionSwitchTarget({
        availableDocPathsByVersion: manifest,
        currentPathname: pathname,
        defaultBranch,
        docsSiteBase,
        fallbackDocPath: versionFallbackDocPath,
        targetVersion: version,
      }),
    }),
    label: version,
  }));
};
