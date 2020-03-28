/*

- 主题至少包含一个 Layout.vue 组件。
- 父主题的所有能力都会"传递"给子主题，对于文件级别的约定，子主题可以通过在同样的位置创建同名文件来覆盖它；
- 对于某些主题配置选项，如 globalLayout，子主题也可以通过同名配置来覆盖它。
- 另外，还可以使用 @parent-theme 来访问父主题的根路径。
- 全局组件 <Content/> 包含解析后的文章内容。
- 如果一个 markdown 文件中有一个 <!-- more --> 注释，则该注释之前的内容会被抓取并暴露在 $page.excerpt 属性中。
- 整个网站以及特定页面的元数据将分别暴露为 this.$site 和 this.$page 属性，它们将会被注入到每一个当前应用的组件中。
  - pages 是一个包含了每个页面元数据对象的数据，包括它的路径、页面标题，以及所有源文件中的 YAML front matter 的数据。
  - 如果用户在 .vuepress/config.js 配置了 themeConfig，你将可以通过 $site.themeConfig 访问到。
- 作为 Vue Router API 的一部分，this.$route 和 this.$router 同样可以使用。

*/

module.exports = {
  extend: '@vuepress/theme-default',
};
