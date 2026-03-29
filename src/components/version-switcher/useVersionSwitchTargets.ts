import {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const {
  buildAbsoluteSiteUrl,
  buildSharedDocsManifestPath,
  resolveVersionSwitchTarget,
} = require('@site/release-policy/browser');

type VersionPathsManifest = Record<string, string[]>;

type SwitchTarget = {
  href: string;
  label: string;
};

type CustomFields = {
  defaultBranch: string;
  docsSiteBase: string;
  siteUrl: string;
  versionFallbackDocPath: string;
};

type UseVersionSwitchTargetsParams = {
  currentVersion: string;
  versions: string[];
};

export const useVersionSwitchTargets = ({
  currentVersion,
  versions,
}: UseVersionSwitchTargetsParams): SwitchTarget[] => {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const {defaultBranch, docsSiteBase, siteUrl, versionFallbackDocPath} =
    siteConfig.customFields as CustomFields;
  const manifestUrl = buildAbsoluteSiteUrl({
    siteUrl,
    path: buildSharedDocsManifestPath({docsSiteBase}),
  });
  const [manifest, setManifest] = useState<VersionPathsManifest>({});

  useEffect(() => {
    let cancelled = false;

    fetch(manifestUrl)
      .then((response) => (response.ok ? response.json() : {}))
      .then((loadedManifest) => {
        if (!cancelled) {
          setManifest(loadedManifest);
        }
      })
      .catch(() => {
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
      siteUrl,
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
