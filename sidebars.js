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
      items: ['get-started/configuration'],
    },
    {
      type: 'category',
      label: 'Basics',
      items: ['basics/routing', 'basics/request', 'basics/response'],
    },
  ],
};

module.exports = sidebars;
