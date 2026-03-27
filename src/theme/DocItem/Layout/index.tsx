import React from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import VersionAlert from '@site/src/components/version-alert/VersionAlert';

export default function DocItemLayoutWrapper(
  props: React.ComponentProps<typeof DocItemLayout>,
): React.JSX.Element {
  return (
    <>
      <VersionAlert />
      <DocItemLayout {...props} />
    </>
  );
}
