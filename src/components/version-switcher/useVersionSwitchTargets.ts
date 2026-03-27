import {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const {buildAbsoluteSiteUrl} = require('@site/scripts/build-canonical-site-paths');
const {resolveVersionSwitchTarget} = require('@site/scripts/resolve-version-switch-target');

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
  const manifestUrl = useBaseUrl('/docs/doc-paths.json');
  const {siteConfig} = useDocusaurusContext();
  const {defaultBranch, docsSiteBase, siteUrl, versionFallbackDocPath} =
    siteConfig.customFields as CustomFields;
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
