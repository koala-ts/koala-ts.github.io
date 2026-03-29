import {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type VersionPathsManifest = Record<string, string[]>;

type SwitchTarget = {
  href: string;
  label: string;
};

type VersionEntry = {
  slug: string;
  label: string;
  routeBasePath: string;
  introDocId: string;
  fallbackDocId: string;
};

type CustomFields = {
  versions: VersionEntry[];
  latestVersion: string;
  docPathManifest: VersionPathsManifest;
};

const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, '');

const buildDocsContentPath = ({
  version,
  docPath,
}: {
  version: VersionEntry;
  docPath: string;
}): string => `/${trimSlashes(version.routeBasePath)}/${trimSlashes(docPath)}`;

const parseCurrentVersion = ({
  currentPathname,
  versions,
  latestVersion,
}: {
  currentPathname: string;
  versions: VersionEntry[];
  latestVersion: string;
}): VersionEntry => {
  const normalizedPath = trimSlashes(currentPathname);
  const matchedVersion = versions.find(({routeBasePath}) =>
    normalizedPath === trimSlashes(routeBasePath) ||
    normalizedPath.startsWith(`${trimSlashes(routeBasePath)}/`),
  );

  return matchedVersion ?? versions.find(({slug}) => slug === latestVersion) ?? versions[0];
};

const parseCurrentDocPath = ({
  currentPathname,
  currentVersion,
}: {
  currentPathname: string;
  currentVersion: VersionEntry;
}): string | null => {
  const normalizedPath = trimSlashes(currentPathname);
  const normalizedRouteBasePath = trimSlashes(currentVersion.routeBasePath);

  if (
    normalizedPath !== normalizedRouteBasePath &&
    !normalizedPath.startsWith(`${normalizedRouteBasePath}/`)
  ) {
    return null;
  }

  return trimSlashes(normalizedPath.slice(normalizedRouteBasePath.length)) || null;
};

const resolveVersionSwitchTarget = ({
  availableDocPathsByVersion,
  currentPathname,
  currentVersion,
  targetVersion,
}: {
  availableDocPathsByVersion: VersionPathsManifest;
  currentPathname: string;
  currentVersion: VersionEntry;
  targetVersion: VersionEntry;
}): string => {
  const currentDocPath = parseCurrentDocPath({
    currentPathname,
    currentVersion,
  });
  const targetDocPaths = new Set(availableDocPathsByVersion[targetVersion.slug] ?? []);
  const targetDocPath =
    currentDocPath && targetDocPaths.has(currentDocPath)
      ? currentDocPath
      : trimSlashes(targetVersion.fallbackDocId);

  return buildDocsContentPath({
    version: targetVersion,
    docPath: targetDocPath,
  });
};

export const useVersionSwitchTargets = (): {
  currentVersion: string;
  items: SwitchTarget[];
} => {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const {versions, latestVersion, docPathManifest} =
    siteConfig.customFields as CustomFields;
  const [manifest, setManifest] = useState<VersionPathsManifest>(docPathManifest);
  const currentVersion = parseCurrentVersion({
    currentPathname: pathname,
    versions,
    latestVersion,
  });

  useEffect(() => {
    setManifest(docPathManifest);
  }, [docPathManifest]);

  return {
    currentVersion: currentVersion.label,
    items: versions.map((version) => ({
      href: resolveVersionSwitchTarget({
        availableDocPathsByVersion: manifest,
        currentPathname: pathname,
        currentVersion,
        targetVersion: version,
      }),
      label: version.label,
    })),
  };
};
