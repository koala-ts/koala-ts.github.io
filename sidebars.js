/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Overview',
      items: ['overview/intro'],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/quick-start'],
    },
    {
      type: 'category',
      label: 'Fundamentals',
      items: [
        'fundamentals/routing',
        'fundamentals/request',
        'fundamentals/response',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/configuration', 'guides/static-files'],
    },
    {
      type: 'category',
      label: 'Utilities',
      items: ['utilities/request-scope-store'],
    },
  ],
};

module.exports = sidebars;
