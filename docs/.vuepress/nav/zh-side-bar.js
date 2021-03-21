const jsNav = require('./zh/js')
const algorithmNav = require('./zh/algorithm')
const linuxNav = require('./zh/linux')

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
  '/js/': jsNav,
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
        'basis/angular-dev',
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
      children: ['', 'basis/usage', 'basis/tab-win', 'basis/common', 'basis/config'],
    },
    {
      title: '插件',
      sidebarDepth: 2,
      children: ['plugin/common-plugin'],
    },
  ],
  '/algorithm/': algorithmNav,
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
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/listeners'],
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
        'basis/binary',
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
  '/linux/': linuxNav,
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
      title: 'Truth',
      sidebarDepth: 2,
      children: ['popularization-science/key', 'popularization-science/message'],
    },
    {
      title: 'Dev',
      sidebarDepth: 2,
      children: ['dev/proxy'],
    },
    {
      title: 'GitBook',
      sidebarDepth: 2,
      children: ['gitbook/elementary-guide'],
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
  '/chrome/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [''],
    },
    {
      title: '网络',
      sidebarDepth: 2,
      children: ['network/', 'network/reference', 'network/issues'],
    },
  ],
  '/video/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [''],
    },
    {
      title: 'FFmpeg',
      sidebarDepth: 2,
      children: ['ffmpeg/', 'ffmpeg/basic', 'ffmpeg/dev'],
    },
  ],
  '/c/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['', 'basis/'],
    },
  ],
  '/collection/': ['video'],
  '/': [''],
}
