declare module '@docusaurus/router' {
  export type LocationLike = {
    pathname: string;
    search: string;
    hash: string;
  };

  export function useLocation(): LocationLike;
}

declare module '@docusaurus/useDocusaurusContext' {
  type DocusaurusContext = {
    siteConfig: {
      title?: string;
      url: string;
      customFields?: unknown;
    };
  };

  export default function useDocusaurusContext(): DocusaurusContext;
}

declare module '@docusaurus/useBaseUrl' {
  export default function useBaseUrl(path: string): string;
}

declare module '@docusaurus/Link' {
  import type {ComponentProps, JSX} from 'react';

  type LinkProps = ComponentProps<'a'> & {
    to?: string;
    href?: string;
  };

  export default function Link(props: LinkProps): JSX.Element;
}

declare module '@docusaurus/theme-common' {
  import type {ComponentType, ReactNode} from 'react';

  export const ThemeClassNames: {
    docs: {
      docSidebarMenu: string;
    };
  };

  export type NavbarSecondaryMenuComponent<Props> = ComponentType<Props>;

  export function NavbarSecondaryMenuFiller<Props>(input: {
    component: NavbarSecondaryMenuComponent<Props>;
    props: Props;
  }): ReactNode;

  export function useThemeConfig(): {
    navbar: {
      items: unknown[];
    };
  };
}

declare module '@docusaurus/theme-common/internal' {
  export function useNavbarMobileSidebar(): {
    toggle(): void;
  };
}

declare module '@theme/Layout' {
  import type {PropsWithChildren, JSX} from 'react';

  type LayoutProps = PropsWithChildren<{
    title?: string;
    description?: string;
  }>;

  export default function Layout(props: LayoutProps): JSX.Element;
}

declare module '@theme/CodeBlock' {
  import type {PropsWithChildren, JSX} from 'react';

  type CodeBlockProps = PropsWithChildren<{
    language?: string;
  }>;

  export default function CodeBlock(props: CodeBlockProps): JSX.Element;
}

declare module '@theme/NavbarItem/DropdownNavbarItem' {
  import type {JSX} from 'react';

  export type Props = {
    label?: string;
    items?: Array<{
      href: string;
      label: string;
    }>;
    [key: string]: unknown;
  };

  export default function DropdownNavbarItem(props: Props): JSX.Element;
}

declare module '@theme/NavbarItem/ComponentTypes' {
  import type {ComponentType} from 'react';

  export type ComponentTypesObject = Record<string, ComponentType<unknown>>;
}

declare module '@theme-original/NavbarItem/ComponentTypes' {
  import type {ComponentTypesObject} from '@theme/NavbarItem/ComponentTypes';

  const ComponentTypes: ComponentTypesObject;
  export default ComponentTypes;
}

declare module '@theme/DocSidebarItems' {
  import type {JSX} from 'react';

  type SidebarItem = {
    type: string;
    href?: string;
  };

  type DocSidebarItemsProps = {
    items: unknown[];
    activePath: string;
    onItemClick?: (item: SidebarItem) => void;
    level: number;
  };

  export default function DocSidebarItems(
    props: DocSidebarItemsProps,
  ): JSX.Element;
}

declare module '@theme/NavbarItem' {
  import type {JSX} from 'react';

  export type Props = {
    label?: string;
    type?: string;
    mobile?: boolean;
    onClick?: () => void;
    [key: string]: unknown;
  };

  export default function NavbarItem(props: Props): JSX.Element;
}

declare module '@theme/DocSidebar/Mobile' {
  export type Props = {
    sidebar: unknown[];
    path: string;
  };
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
