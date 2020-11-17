module.exports = {
  '/css/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/box-model'],
    },
    {
      title: 'LESS',
      sidebarDepth: 2,
      children: ['less/', 'less/basis/meet-less', 'less/advanced/use-advanced'],
    },
    {
      title: 'SCSS',
      sidebarDepth: 2,
      children: ['scss/', 'scss/basis/meet-scss', 'scss/advanced/syntax'],
    },
    {
      title: '面试',
      sidebarDepth: 2,
      children: ['interview/css-hv-center'],
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
        'basis/meet-regexp',
        'basis/pwa',
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
        'advanced/module',
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
        'third-party/jquery-0',
      ],
    },
    {
      title: '读书笔记',
      sidebarDepth: 2,
      children: [
        'read/ydkjs0',
        'read/ydkjs1',
        'read/ydkjs2',
        'read/ydkjs3',
        'read/ydkjs4',
        'read/ydkjs5',
        'read/ydkjs6',
        'read/ydkjs7',
        'read/ydkjs8',
        'read/ydkjs9',
        'read/ydkjs10',
        'read/ydkjs11',
        'read/ydkjs12',
        'read/ydkjs13',
        'read/ydkjs14',
        'read/ydkjs15',
        'read/ydkjs16',
        'read/ydkjs17',
        'read/ydkjs18',
      ],
    },
    {
      title: '奇思妙想',
      sidebarDepth: 2,
      children: [
        'fantastic-ideas/better-code',
        'fantastic-ideas/throttle-debounce',
        'fantastic-ideas/advanced-func',
        'fantastic-ideas/fresh',
      ],
    },
  ],
  '/ng/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [
        '',
        'basis/basic-grammar',
        'basis/ng-class',
        'basis/custom-component',
        'basis/services',
        'basis/angular-radio',
      ],
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
      children: ['', 'basis/react-hooks', 'basis/story-react'],
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
      children: ['', 'basis/github-work', 'basis/common-scene'],
    },
    {
      title: '命令',
      sidebarDepth: 2,
      children: ['command/log'],
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
      sidebarDepth: 2,
      children: ['plugin/common-plugin'],
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
        'npm/basis/command',
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
  '/mac/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'homebrew'],
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
        'basis/view-help',
      ],
    },
    {
      title: 'Ubuntu',
      sidebarDepth: 2,
      children: ['ubuntu/install', 'ubuntu/dev-0', 'ubuntu/dev-1'],
    },
    {
      title: 'Shell',
      sidebarDepth: 2,
      children: ['shell/meet-shell', 'shell/demo'],
    },
    {
      title: 'Common',
      sidebarDepth: 2,
      children: ['common/', 'common/ssh', 'common/curl'],
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
  '/project/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/commit-lint', 'basis/eslint', 'basis/stylelint'],
    },
  ],
  '/ts/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/meet-ts', 'basis/enum', 'basis/note'],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/term', 'advanced/type-guard'],
    },
  ],
  '/vscode/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/meet-vscode'],
    },
  ],
  '/dev-ops/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/circle-ci'],
    },
  ],
  '/electron/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [''],
    },
  ],
  '/': [''],
}
