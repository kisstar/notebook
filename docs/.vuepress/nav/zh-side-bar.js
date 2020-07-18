module.exports = {
  '/css/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/box-model'],
    },
    {
      title: '面试',
      sidebarDepth: 2,
      children: ['interview/css-hv-center'],
    },
  ],
  '/less/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/meet-less'],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/use-advanced'],
    },
  ],
  '/js/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [
        '',
        'basis/meet-js',
        'basis/reference-type',
        'basis/data-type-memory',
        'basis/handle-error',
        'basis/ajax-to-north',
      ],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: [
        'advanced/data-type',
        'advanced/func-progression',
        'advanced/this',
        'advanced/closure',
        'advanced/prototype',
        'advanced/inherit',
        'advanced/single-thread',
        'advanced/create-object',
        'advanced/ergodic',
        'advanced/context-scope',
      ],
    },
    {
      title: '面试',
      sidebarDepth: 2,
      children: [
        'interview/unique-array',
        'interview/scope',
        'interview/all-around',
        'interview/cross-domain',
      ],
    },
    {
      title: '第三方',
      sidebarDepth: 2,
      children: [
        'third-party/require-js-0',
        'third-party/require-js-1',
        'third-party/require-js-2',
        'third-party/require-js-3',
      ],
    },
    {
      title: '奇思妙想',
      sidebarDepth: 2,
      children: ['fantastic-ideas/advanced-func'],
    },
  ],
  '/vue/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/vue-common-qa'],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/vue-mvvm'],
    },
    {
      title: '面试',
      sidebarDepth: 2,
      children: ['interview/comm-between-comp'],
    },
  ],
  '/react/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/react-hooks'],
    },
  ],
  '/web/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/performance'],
    },
    {
      title: '面试',
      sidebarDepth: 2,
      children: ['interview/url2ui'],
    },
  ],
  '/git/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [''],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/git-object', 'advanced/git-ref', 'advanced/deep'],
    },
    {
      title: '问题',
      sidebarDepth: 2,
      children: ['bugfix', 'bugfix/00', 'bugfix/01'],
    },
  ],
  '/vim/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/usage', 'basis/config'],
    },
    {
      title: '插件',
    },
  ],
  '/algorithm/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [''],
    },
    {
      title: '栈',
      sidebarDepth: 2,
      children: ['stack/'],
    },
    {
      title: '队列',
      sidebarDepth: 2,
      children: ['queue/'],
    },
    {
      title: '链表',
      sidebarDepth: 2,
      children: [
        'linked-list/',
        'linked-list/doubly-linked-list',
        'linked-list/reverse-list',
        'linked-list/swap-pairs',
      ],
    },
    {
      title: '集合',
      sidebarDepth: 2,
      children: ['set/'],
    },
    {
      title: '字典',
      sidebarDepth: 2,
      children: ['dictionary/', 'dictionary/hash-table'],
    },
    {
      title: '树',
      sidebarDepth: 2,
      children: ['tree/', 'tree/avl-tree'],
    },
    {
      title: '排序',
      sidebarDepth: 2,
      children: [
        'sort/',
        'sort/bubble-sort',
        'sort/insertion-sort',
        'sort/merge-sort',
        'sort/selection-sort',
      ],
    },
  ],
  '/wechat/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/offiaccount'],
    },
  ],
  '/windows/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/key-map', 'basis/bat'],
    },
  ],
  '/docker/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [
        '',
        'basis/meet-docker',
        'basis/command',
        'basis/image',
        'basis/dockerfile',
        'basis/data-volume',
        'basis/docker-compose',
        'basis/private-registry',
      ],
    },
  ],
  '/nginx/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/meet-nginx', 'basis/config'],
    },
  ],
  '/nodejs/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/nvm-use', 'basis/child-process', 'basis/cluster', 'basis/pm2'],
    },
    {
      title: 'Npm',
      sidebarDepth: 2,
      children: [
        'npm/',
        'npm/basis/npm-use',
        'npm/basis/pkg-json',
        'npm/basis/pkg-lock',
        'npm/basis/npmrc',
        'npm/advanced/npm-command',
      ],
    },
    {
      title: 'Yarn',
      sidebarDepth: 2,
      children: ['yarn/', 'yarn/basis/yarn-use'],
    },
  ],
  '/cp/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [
        '',
        'basis/cp-system',
        'basis/process-thread',
        'basis/network',
        'basis/how-internet-work',
      ],
    },
  ],
  '/linux/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [
        '',
        'basis/meet-linux',
        'basis/open-close',
        'basis/file-search',
        'basis/file-handling',
        'basis/file-view',
        'basis/dir-manage',
        'basis/compress-file',
        'basis/linux-link',
        'basis/disk-management',
        'basis/mount',
        'basis/user-log',
        'basis/user-manage',
        'basis/shell',
        'basis/view-help',
      ],
    },
    {
      title: 'Ubuntu',
      sidebarDepth: 2,
      children: ['ubuntu/install', 'ubuntu/dev-0', 'ubuntu/dev-1'],
    },
  ],
  '/webpack/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/meet-webpack'],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/know-webpack', 'advanced/tapable'],
    },
  ],
  '/database/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/meet-database', 'basis/common-command'],
    },
  ],
  '/other/': [
    {
      title: 'Want',
      sidebarDepth: 2,
      children: [''],
    },
    {
      title: 'GitBook',
      sidebarDepth: 2,
      children: ['gitbook/'],
    },
  ],
  '/': [''],
}
