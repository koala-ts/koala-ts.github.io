import React from 'react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {useVersionSwitchTargets} from '@site/src/components/version-switcher/useVersionSwitchTargets';

type Props = {
  currentVersion: string;
  position?: 'left' | 'right';
  versions: string[];
};

export default function VersionSwitcherDropdown({
  currentVersion,
  position = 'right',
  versions,
}: Props): React.JSX.Element {
  const items = useVersionSwitchTargets({
    currentVersion,
    versions,
  });

  return (
    <DropdownNavbarItem
      label={`Version: ${currentVersion}`}
      position={position}
      items={items}
    />
  );
}
