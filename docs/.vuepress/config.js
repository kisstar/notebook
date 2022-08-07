const zhNav = require('./nav/zh-nav')
const sidebarNav = require('./nav/zh-side-bar')

module.exports = {
  base: '/notebook/', // 基准 URL，引用图片时需要加上基准 URL，为了便于切换可使用内置的帮助器 $withBase
  title: 'notes | Kisstar',
  description: "Kisstar's personal notes",
  themeConfig: {
    logo: '/logo.png',
    nav: zhNav,
    sidebar: sidebarNav,
    lastUpdated: '最近更新',
    // 编辑链接
    repo: 'kisstar/notebook',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
  },
  plugins: ['vuepress-plugin-mermaidjs'],
  nextLinks: false,
}
