import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Disclose DSL',
  tagline: 'A fluent, declarative DSL for animation and motion design',
  url: 'https://thiagopac.github.io',
  baseUrl: '/disclose-dsl/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'thiagopac',
  projectName: 'disclose-dsl',
  trailingSlash: false,

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Disclose DSL',
      items: [
        { to: '/', label: 'Docs', position: 'left' },
        { to: '/examples', label: 'Examples', position: 'left' },
        { to: '/play', label: 'Play', position: 'left' },
        {
          href: 'https://github.com/thiagopac/disclose-dsl',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/' },
            { label: 'Shapes', to: '/shapes' },
            { label: 'Modifiers', to: '/modifiers' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Examples', to: '/examples' },
            { label: 'Play', to: '/play' },
            { label: 'GitHub', href: 'https://github.com/thiagopac/disclose-dsl' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Disclose DSL.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
