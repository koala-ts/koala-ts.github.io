import React from 'react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type {Props as DropdownNavbarItemProps} from '@theme/NavbarItem/DropdownNavbarItem';
import {useVersionSwitchTargets} from '@site/src/components/version-switcher/useVersionSwitchTargets';

type Props = Omit<DropdownNavbarItemProps, 'items'> & {
  currentVersion: string;
  versions: string[];
};

export default function VersionSwitcherDropdown({
  currentVersion,
  versions,
  ...dropdownProps
}: Props): React.JSX.Element {
  const items = useVersionSwitchTargets({
    currentVersion,
    versions,
  });

  return (
    <DropdownNavbarItem
      label={`Version: ${currentVersion}`}
      items={items}
      {...dropdownProps}
    />
  );
}
