# 快速开始

Vite 需要 Node.js 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，则需要升级 Node 版本。

## 创建项目

官方提供了创建项目的架手架工具，只需要执行下面的命令：

```bash
yarn create vite
```

上面的命令会一次完成两件事情：

- 全局安装 create-vite，或者如果软件包已存在，则将软件包更新为最新版本；
- 运行位于 package.json 中声明的可执行文件。

最后并会根据用户的选项创建相应的项目。

## 开发命令

在安装了 Vite 的项目中，可以在 npm scripts 中使用 vite 可执行文件：

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

可以指定额外的命令行选项，如 --port 或 --https。运行 `npx vite --help` 获得完整的命令行选项列表。

## 项目

在一个 Vite 项目中，在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件，index.html 在项目最外层而不是在 public 文件夹内。

Vite 将 index.html 视为源码和模块图的一部分，会自动解析 `<script type="module" src="...">`，这个标签指向项目的 JavaScript 源码。

另外，index.html 中的 URL 将被自动转换，因此不再需要 `%PUBLIC_URL%` 占位符了。

## 其它

Vite 以当前工作目录作为根目录启动开发服务器。也可以通过 `vite serve some/sub/dir` 来指定一个替代的根目录。
