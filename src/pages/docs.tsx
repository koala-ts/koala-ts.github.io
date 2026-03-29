import React, {useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function DocsRedirectPage(): null {
  const {siteConfig} = useDocusaurusContext();
  const {docsIntroPath} = siteConfig.customFields as {
    docsIntroPath: string;
  };

  useEffect(() => {
    window.location.replace(docsIntroPath);
  }, [docsIntroPath]);

  return null;
}
