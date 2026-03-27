import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import type {ComponentTypesObject} from '@theme/NavbarItem/ComponentTypes';
import VersionSwitcherDropdown from '@site/src/components/version-switcher/VersionSwitcherDropdown';

export default {
  ...ComponentTypes,
  'custom-version-switcher': VersionSwitcherDropdown,
} satisfies ComponentTypesObject;
