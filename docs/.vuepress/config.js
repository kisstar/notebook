const zhNav = require('./nav/zh-cn');

module.exports = {
  base: '/notebook/', // 基准 URL，引用图片时需要加上基准 URL，为了便于切换可使用内置的帮助器 $withBase
  title: 'notes | Kisstar',
  description: "Kisstar's personal notes",
  themeConfig: {
    logo: '/logo.png',
    nav: zhNav,
  },
  nextLinks: false,
};
