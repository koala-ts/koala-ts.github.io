import React from 'react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type {Props as DropdownNavbarItemProps} from '@theme/NavbarItem/DropdownNavbarItem';
import {useVersionSwitchTargets} from '@site/src/components/version-switcher/useVersionSwitchTargets';

type Props = Omit<DropdownNavbarItemProps, 'items'>;

export default function VersionSwitcherDropdown({
  ...dropdownProps
}: Props): React.JSX.Element {
  const {currentVersion, items} = useVersionSwitchTargets();

  return (
    <DropdownNavbarItem
      label={`Version: ${currentVersion}`}
      items={items}
      {...dropdownProps}
    />
  );
}
