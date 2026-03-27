import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from '@site/src/components/version-alert/version-alert.module.css';

const {buildAbsoluteSiteUrl} = require('@site/scripts/build-canonical-site-paths');
const {resolveVersionAlertState} = require('@site/scripts/resolve-version-alert-state');

type CustomFields = {
  currentVersionSlug: string;
  defaultBranch: string;
  siteUrl: string;
  stableDocsPath: string;
};

const alertCopy = {
  legacy: {
    body: 'You are viewing documentation for an older version.',
    linkLabel: 'View the current stable docs.',
    toneClassName: styles.legacy,
  },
  preview: {
    body: 'You are viewing unreleased documentation for the next version.',
    linkLabel: 'View the current stable docs.',
    toneClassName: styles.preview,
  },
} as const;

export default function VersionAlert(): React.JSX.Element | null {
  const {siteConfig} = useDocusaurusContext();
  const {currentVersionSlug, defaultBranch, siteUrl, stableDocsPath} =
    siteConfig.customFields as CustomFields;
  const alertState = resolveVersionAlertState({
    currentVersionSlug,
    defaultBranch,
  });

  if (alertState === 'stable') {
    return null;
  }

  const copy = alertCopy[alertState];
  const stableDocsUrl = buildAbsoluteSiteUrl({
    siteUrl,
    path: stableDocsPath,
  });

  return (
    <div className={`${styles.banner} ${copy.toneClassName}`} role="note">
      <div className={styles.content}>
        <strong className={styles.title}>
          {alertState === 'preview' ? 'Preview docs.' : 'Older docs.'}
        </strong>{' '}
        <span>{copy.body}</span>{' '}
        <a className={styles.link} href={stableDocsUrl}>
          {copy.linkLabel}
        </a>
      </div>
    </div>
  );
}
