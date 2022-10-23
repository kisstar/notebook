const jsNav = require('./zh/js')
const algorithmNav = require('./zh/algorithm')
const linuxNav = require('./zh/linux')

module.exports = {
  '/css/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/box-model'],
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
  ],
  '/js/': jsNav,
  '/ng/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [
        'basis/basic-grammar',
        'basis/ng-class',
        'basis/custom-component',
        'basis/services',
        'basis/angular-radio',
        'basis/angular-dev',
      ],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/listeners'],
    },
  ],
  '/vue/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/vue-common-qa'],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/vue-mvvm', 'advanced/vue3-response-principle'],
    },
    {
      title: '错误',
      sidebarDepth: 2,
      children: ['error/'],
    },
  ],
  '/react/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/react-hooks', 'basis/story-react'],
    },
  ],
  '/web/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/performance'],
    },
  ],
  '/git/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/github-work'],
    },
    {
      title: '命令',
      sidebarDepth: 2,
      children: ['command/log'],
    },
    {
      title: '场景',
      sidebarDepth: 2,
      children: ['scene/common-scene', 'scene/cross-repo-reuse'],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/git-object', 'advanced/git-ref', 'advanced/deep'],
    },
    {
      title: '问题',
      sidebarDepth: 2,
      children: ['bugfix/00', 'bugfix/01'],
    },
    {
      title: '错误',
      sidebarDepth: 2,
      children: ['error/'],
    },
  ],
  '/vim/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/usage', 'basis/tab-win', 'basis/common', 'basis/config'],
    },
    {
      title: '插件',
      sidebarDepth: 2,
      children: ['plugin/common-plugin', 'plugin/nerdtree'],
    },
  ],
  '/algorithm/': algorithmNav,
  '/wechat/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/offiaccount'],
    },
  ],
  '/windows/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/key-map', 'basis/bat'],
    },
  ],
  '/docker/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: [
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
  '/install-equipment/': [
    {
      title: 'Ubuntu',
      sidebarDepth: 2,
      children: ['ubuntu/install', 'ubuntu/dev-0', 'ubuntu/dev-1'],
    },
  ],
  '/interview/': [
    {
      title: 'CSS',
      sidebarDepth: 2,
      children: ['css/css-hv-center'],
    },
    {
      title: 'JavaScript',
      sidebarDepth: 2,
      children: [
        'js/unique-array',
        'js/flat',
        'js/scope',
        'js/all-around',
        'js/cross-domain',
        'js/parse-url',
      ],
    },
    {
      title: 'Vue',
      sidebarDepth: 2,
      children: ['vue/comm-between-comp'],
    },
    {
      title: 'Web',
      sidebarDepth: 2,
      children: ['web/url2ui'],
    },
    {
      title: 'Algorithm',
      sidebarDepth: 2,
      children: ['algorithm/1602'],
    },
  ],
  '/nginx/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/meet-nginx', 'basis/config'],
    },
  ],
  '/nodejs/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/nvm-use', 'basis/child-process', 'basis/cluster', 'basis/pm2'],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/module', 'advanced/call-c'],
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
      children: ['homebrew'],
    },
  ],
  '/vite/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/quick-start'],
    },
  ],
  '/linux/': linuxNav,
  '/webpack/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/meet-webpack'],
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
      children: ['basis/meet-database', 'basis/common-command'],
    },
  ],
  '/dev/': [
    {
      title: 'Development',
      sidebarDepth: 2,
      children: ['proxy', 'chares'],
    },
  ],
  '/gitbook/': [
    {
      title: 'GitBook',
      sidebarDepth: 2,
      children: ['elementary-guide'],
    },
  ],
  '/popularization-science/': [
    {
      title: 'Truth',
      sidebarDepth: 2,
      children: ['key', 'message'],
    },
  ],
  '/project/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/commit-lint', 'basis/eslint', 'basis/stylelint'],
    },
    {
      title: '错误',
      sidebarDepth: 2,
      children: ['error/eslint'],
    },
  ],
  '/ts/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/meet-ts', 'basis/enum', 'basis/note'],
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
      children: ['basis/meet-vscode'],
    },
  ],
  '/dev-ops/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/circle-ci'],
    },
  ],
  '/electron/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/install', 'basis/start-up', 'basis/project'],
    },
  ],
  '/chrome/': [
    {
      title: '开发工具',
      sidebarDepth: 2,
      children: ['devtools/snippets'],
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
      children: ['basis/concept', 'basis/operation-set', 'basis/autoplay'],
    },
    {
      title: '进阶',
      sidebarDepth: 2,
      children: ['advanced/h265'],
    },
    {
      title: 'FFmpeg',
      sidebarDepth: 2,
      children: [
        'ffmpeg/',
        'ffmpeg/basic',
        'ffmpeg/dev',
        'ffmpeg/filter/des-format',
        'ffmpeg/filter/watermark',
        'ffmpeg/common',
      ],
    },
    {
      title: '错误',
      sidebarDepth: 2,
      children: ['error/'],
    },
  ],
  '/c/': [
    {
      title: '基础',
      sidebarDepth: 2,
      children: ['basis/'],
    },
  ],
  '/collection/': [
    {
      title: '系统',
      sidebarDepth: 2,
      children: ['system/computer', 'system/linux', 'system/mac'],
    },
    {
      title: '语言',
      sidebarDepth: 2,
      children: ['language/css', 'language/js', 'language/nodejs', 'language/weixin'],
    },
    {
      title: '框架',
      sidebarDepth: 2,
      children: ['framework/framework', 'framework/react', 'framework/vue', 'framework/svelte'],
    },
    {
      title: '知识',
      sidebarDepth: 2,
      children: ['knowledge/video'],
    },
    {
      title: '开发工具',
      sidebarDepth: 2,
      children: ['devtools/chrome', 'devtools/git', 'devtools/terminal', 'devtools/yarn'],
    },
    {
      title: '其它',
      sidebarDepth: 2,
      children: ['other/blog', 'other/other'],
    },
  ],
  '/': [''],
}
