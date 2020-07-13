# 尝新

`Webpack` 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。

它做的事情是，分析你的项目结构，递归地构建一个依赖关系图(dependency graph)，找到应用程序需要的每个模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript 等），将其转换和打包为合适的一个或多个 `bundle`。

## 初始化

针对项目的一些基本配置，对项目仓库进行初始化，比如创建 MIT 协议文件、配置不需要进行版本控制的文件等。

针对各类编辑器，还可以设置一些通用的代码格式：

```bash
# .editorconfig
root = true

# Unix-style
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

# Matches markdown files
[*.md]
insert_final_newline = false
trim_trailing_whitespace = false
```

## 安装

首先创建一个目录，并在该目录中使用 `yarn init` 进行初始化，根据项目的相关信息进行配置，或则你也可以直接在其后面加上参数 `-y` 直接使用默认的信息。

```bash
mkdir webpack-basis && cd $_
yarn init -y
```

随后在本地安装 `webpack` 和 `webpack-cli`（用于在命令行中运行 webpack）。

```bash
yarn add -D webpack webpack-cli
```

## 零配置打包

从 `Webpack 4.0` 开始秉承约定优于配置的理念的思想，现在我们可以进行零配置使用，默认情况下它约定：

- `entry` 的默认值是 `./src`。
- `output.path` 的默认值是 `./dist`。
- `mode` 的默认值是 `production`。

现在，创建项目的入口文件 `./src/index.js`，并在其中输入一些测试代码：

```javascript
console.log('Hello world!')
```

然后使用下面的命令进行打包：

```bash
npx webpack
```

打包完成后会在 `./dist` 下生成被打包优化后的 `main.js`。

我们可以创建一个 `./index.html` 来引入使用我们打包后的文件，当我们用浏览器打开该 HTML 文件时，可见会在控制台打印 "Hello world!" 的字样。

更多默认配置你可以在这里看到 [完整的约定](https://github.com/webpack/webpack/blob/next/lib/WebpackOptionsDefaulter.js)，而关于 `npx` 的信息你也可以点击 [npx 使用教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2019/02/npx.html) 进行了解。

## 基础配置

`Webpack` 默认使用的配置文件为 `./webpack.config.js`，不过我们在执行 `webpack` 命令时可以通过 `--config` 参数指定配置文件，这里我们创建配置文件 `webpack.common.js` 放置在 `./config` 目录下面。

```javascript
// webpack.common.js
const path = require('path')

const baseConfig = {
  entry: '../src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, '../dist'), // 指定输出文件所在目录
    filename: '[name].js', // 输出文件名，其中 name 为变量，值为入口文件名
  },
}

module.exports = baseConfig
```

需要注意的是指定的输出文件所在目录必须使用绝对地址，这里可以使用 `path` 模块来处理。

另外，入口文件可以以数组的形式指定多个入口文件，如果要给每个文件取特定的名称的话，也可以使用对象的模式：

```javascript
entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
}
```

对应的，在指定出口文件时可以使用 name、hash、chunkhash、contenthash 等来指定，相关内容可点击 [查看更多](https://imweb.io/topic/5b6f224a3cb5a02f33c013ba) 进行了解。

## 脚本命令

完成上面的配置我们就可以使用命令 `npx webpack --config config/webpack.common.js` 来进行打包了，但是这条命令看起来显得比较长，如果添加更多参数的话，那么就更加糟糕了，它会导致使用起来很麻烦。

所幸 NPM 允许在 `package.json` 文件里面，使用 `scripts` 字段定义脚本命令，这给我们带来了很大的方便。

但是，单纯的使用它也可能会让 `package.json` 文件中变得不可收拾，比如过多的脚本命令会让该文件变得很臃肿。

另外，当我们在 JSON 中配置脚本时，不能对一些关键的选项进行注释，所以这里我们使用 `nps` 来管理脚本命令。

首先我们需要安装 `nps` 和 `nps-utils`，建议将 `nps` 进行全局安装，或者将 `./node_modules/.bin` 添加到环境变量，这样以便于使用 `nps` 命令。

然后，创建 `nps` 模块的配置文件 `./package-scripts.js` 来指定一些命令：

```javascript
const npsUtils = require('nps-utils')
// Accepts any number of scripts, filters out any falsy ones and joins them with ' && '
const { series } = npsUtils
// The UNIX command `rm -rf` for node
const { rimraf } = npsUtils

module.exports = {
  scripts: {
    build: {
      description: 'Clean dist directory and run all builds',
      default: series(rimraf('dist/*'), 'webpack --config config/webpack.common.js'),
    },
  },
}
```

现在你可以使用命令 `nps build` 来进行打包了。如果没有进行全局安装，也没有修改环境变量的话，你依然可以通过 `npx nps build` 来执行打包。

当然我们依然可以结合在 `package.json` 文件里面的 `scripts` 字段来使用，就像这样：

```json
"scripts": {
    "build": "npx nps build"
},
```

显然这比一开始直接在 `package.json` 文件里面，使用 `scripts` 字段要简单的多，而且我们还获得了更多的配置和其它方便，你可以点击 [nps - Github](https://github.com/kentcdodds/nps) 和 [nps-utils - API Document](https://doc.esdoc.org/github.com/kentcdodds/nps-utils/) 了解更多相关信息。

## 打包模式

到目前位置，每次我们使用前面配置的打包命令时都会得到一个警告，提示我们需要会打包指定一个模式（development 或 production）。

通常我们会针对不同的模式做一些不同的配置，因此我们可以为每个环境编写彼此独立的 `webpack` 配置。

遵循不重复原则(Don't repeat yourself - DRY)，我们需要保留一个“通用”配置。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。为了将这些配置合并在一起，我们将使用一个名为 `webpack-merge` 的工具。

首先我们需要先安装 `webpack-merge`：

```bash
yarn add -D webpack-merge
```

然后创建 `./config/webpack.prod.js` 和 `./config/webpack.dev.js` 两个文件：

```javascript
// ./config/webpack.dev.js
const merge = require('webpack-merge')
const common = require('./webpack.common')

const devConfig = {
  mode: 'development',
}

module.exports = merge(common, devConfig)

// ./config/webpack.prod.js
const merge = require('webpack-merge')
const common = require('./webpack.common')

const prodConfig = {
  mode: 'production',
}

module.exports = merge(common, prodConfig)
```

最后在 `./package-scripts` 文件中添加启用两种模式的命令：

```javascript
// 省略部分代码...
build: {
    default: {
        description: 'Clean dist directory and run all builds in mode production',
        script: series(
            rimraf('dist/*'),
            'webpack --config config/webpack.prod.js'
        )
    },
    dev: {
        description: 'Clean dist directory and run all builds in mode development',
        script: series(
            rimraf('dist/*'),
            'webpack --config config/webpack.dev.js'
        )
    }
}
// 省略部分代码...
```

现在，当我们使用 `npm run build` 命令打包时，打开 `./dist/main.js` 文件可以看到其中的内容是经过压缩的，如果我们需要运行在开发环境的代码只需要执行 `npx nps build.dev` 命令，或者你也可以在 `package.json` 文件中进行配置相应的命令。

## 动态生产 HTML 文件

首先改变目录 `./config` 为 `./scripts` 以更加语义化，因为其中的配置文件都是给脚本执行的。而且，这样后续我们也可以将相应的命令添加到该目录中以便管理。

然后，将目录 `./src` 改名为 `./app`，将所有程序的代码放在该目录中。

最开始我们为项目创建了一个 `./index.html` 文件，并手动引入了打包后的文件，但是当我们为打包后的文件提供动态的文件名时，我们需要再次更改其中引用部分的内容，这样添加了开发的任务。

HtmlWebpackPlugin 插件简化了 HTML 文件的创建，以便为你的 `webpack` 包提供服务，这对于解决上面的问题显得尤为又用。现在我们先来对其进行安装：

```bash
yarn add -D html-webpack-plugin
```

然后我们移除 `./index.html` 文件，并在 `./index.html` 目录下创建该插件使用的 HTML 模版文件 `./app/index.html`，随便将 `/favicon.ico` 也移动到 `./app/image` 目录，然后改变配置文件：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const htmlWebpackPluginConf = {
  template: './app/index.html', // 指定模版
  filename: 'index.html', // 输出文件名
  favicon: './app/images/favicon.ico',
}

const prodConfig = {
  mode: 'development',
  plugins: [new HtmlWebpackPlugin(htmlWebpackPluginConf)],
}

module.exports = merge(common, prodConfig)
```

在 `development` 模式下还应该在 `htmlWebpackPluginConf` 中添加 `minify` 属性：

```javascript
minify: {
    removeComments: true, // 移除注释
    removeRedundantAttributes: true, // 移除冗余属性
    collapseWhitespace: true // 移除空白
}
```

## 加载样式

前面我们已经可以动态的创建 HTML 文件了，现在开始处理一些样式文件。首先我们创建一个样式文件 `./app/styles/app.css`：

```css
html,
body {
  width: 100%;
  height: 100%;
}

body {
  background: linear-gradient(#c0c0c0, #707070);
}
```

然后在入口文件中引入:

```javascript
import './styles/app.css'
// ...
```

但是现在直接打包的话会报错，因为它并不是一个模块文件，所以此时我们需要使用 `css-lodaer` 来将 CSS 转化成 CommonJS 模块，另外我们还需要使用 `style-loader` 将 JavaScript 字符串生成为 `style` 节点。同样我们需要对其进行安装：

```bash
yarn add -D css-loader style-loader
```

使用多个 `loader` 的原因是 `loader` 使用保持功能单一的思想，它们的执行顺序由下往上（从右向左）执行，现在我们来对其进行配置：

```javascript
// webpack-common.js
// ...
const rules = [
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
    ],
  },
]

const baseConfig = {
  // ...
  module: {
    rules: rules,
  },
}
```

尽管它已经可以工作了，但是更多的在开发过程中我们使用的会是 `less`、`sass` 或者是 `stylus`，对此我们需要做的就是安装相应的依赖和 `loader`，并添加相应的匹配规则，然后同上一样进行配置，只需要在最后再添加上安装的 `loader` 即可，比如将上面的 `app.css` 改为 `app.less` 并安装 `less` 和 `less-loader`：

```bash
yarn add -D less less-loader
```

最后启用对 `less` 支持：

```javascript
{
    test: /\.less$/,
    use: [{
        loader: 'style-loader'
    }, {
        loader: 'css-loader'
    }, {
        loader: 'less-loader'
    }]
}
```

## 添加 CSS 前缀

不同的浏览器对于某些样式的支持程度也是不一样的，为了解决一些兼容的问题，通常我们会添加一些浏览器前缀，`postcss-loader` 正是用来自动解决这个需求的，首先对其进行安装：

```bash
yarn add -D postcss-loader autoprefixer
```

然后在配置文件后启用它：

```javascript
{
    test: /\.less$/,
    use: [{
        loader: 'style-loader'
    }, {
        loader: 'css-loader'
    }, {
        loader: 'post-loader'
    }, {
        loader: 'less-loader'
    }]
}
```

最后再为其添加一个单独的配置文件 `./postcss.config.js`：

```javascript
module.exports = {
  plugins: [require('autoprefixer')],
}
```

## 使用环境变量

在分离 CSS 之前先来安装一下 `cross-env`，虽然我们为不同的环境启用了不同的配置文件，但是对于一些配置来说，在各个环境下的差异比较小，没有必要为了一点差异而再将大部分内容重写一遍。

`cross-env` 能跨平台地设置及使用环境变量，我们通过该变量来进行一些轻量的特殊配置，比如我们可以将前面的 `HtmlWebpackPlugin` 的配置来改变一些，将其它环境的配置移除后修改通用配置 `webpack-base.js`，配置内容和 `webpack.prod.js` 的配置基本一样，只是配置对象中 `minify` 属性的值我们不能直接给定：

```javascript
const htmlWebpackPluginConf = {
  template: './app/index.html', // 指定模版
  filename: 'index.html', // 输出文件名
  favicon: './app/images/favicon.ico',
  minify:
    process.env.NODE_ENV !== 'production'
      ? null
      : {
          removeComments: true, // 移除注释
          removeRedundantAttributes: true, // 移除冗余属性
          collapseWhitespace: true, // 移除空白
        },
}
```

那么，其中的 process.env.NODE_ENV 变量怎么得到呢，这就需要使用到上面安装的 `cross-env`，我们不能在 `package-scripts.js` 中用队列设置，因为它用 `&&` 进行拼接导致 `cross-env` 模块下，它划分出前后两个环境，因此我们直接在 `package.json` 中配置：

```json
"scripts": {
    "build": "npx cross-env NODE_ENV=production npx nps build",
    "build.dev": "npx nps build.dev"
},
```

## 分离样式文件

`ExtractTextWebpackPlugin` 和 `mini-css-extract-plugin` 两个插件都可以用于提取 `css` 到独立的文件，在这里我们来使用后者来进行构建，因为它使用异步加载，并且更加容易使用，现在先对其进行安装：

```bash
yarn add -D mini-css-extract-plugin
```

然后在 `webpack.common.js` 中进行配置：

```javascript
// ...
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rules = [
  {
    test: /\.(le|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: devMode,
        },
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'less-loader',
      },
    ],
  },
]

const miniCssExtractPluginCfg = {
  name: 'styles/[name].css',
}

const baseConfig = {
  // ...
  plugins: [new MiniCssExtractPlugin(miniCssExtractPluginCfg)],
}

module.exports = baseConfig
```

可见，我们将样式的处理最后一步从 `style-loader` 的手中转交给了 `MiniCssExtractPlugin` 插件并在相应位置启用了它。

## 压缩样式文件

现在样式文件虽然被抽离出来了，但是点开打包后的 CSS 文件会发现在两种模式下代码都没有被压缩，在开发环境也许这是我们想要的，但对于线上的代码来说却是不必要的，所以我们需要根据不用的模式来进行配置。

`Webpack 4` 官方移除了 `commonchunk` 插件，改用了 `optimization` 属性进行更加灵活的配置。

如果我们需要对样式代码进行压缩的话，就需要使用到 `OptimizeCSSAssetsPlugin` 插件，此时由于打破了默认启用的压缩脚本的配置，因此还需要连通 `TerserJSPlugin` 插件一起安装：

```bash
yarn add -D optimize-css-assets-webpack-plugin terser-webpack-plugin
```

然后在生产模式的配置文件 `webpack.prod.js` 中配置：

```javascript
// ...
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

const prodConfig = {
  mode: 'production',
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin(), new TerserJSPlugin()],
  },
}
// ...
```

## 编译 JavaScript

现在，开发中我们通常会使用版本更新的 JavaScript，但是同层叠样式一样存在许多兼容上的问题，为了解决这个问题，我们需要一个名为 `Babel` 的强大编译器。

`Babel` 是一个工具链，主要用于将 `ECMAScript 2015+` 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

首先将入口文件打印 'Hello world!' 得语句包含在一个箭头函数中：

```javascript
// index.js
// ...
const sayHello = () => console.log('Hello world!')

sayHello()
```

然后，我们在对其进行编译，现在打开打包后的 HTML 文件查看控制台，可以发现依然顺利的输出了 'Hello world!'，但是查看打包后的 JavaScript 文件会看到其中的箭头函数依然存在，并没有转换为低版本中的语法。

现在准备使用 `Babel` 来进行转换，要使用它首先我们得对相关依赖进行安装：

- `babel-loader` => 使能够使用 `Babel` 和 `Webpack` 来转换生产 JavaScript 文件。
- `@babel/cli` => `Babel` 的命令行工具。
- `@babel/core` => `Babel` 的核心功能，包含各种转换方法。
- `@babel/preset-env` => `Babel` 的插件集合（官方预设），定义如何转换，可以根据定制。

```bash
yarn add -D babel-loader @babel/cli @babel/core @babel/preset-env
```

然后在通用配置文件中配置将脚本文件交给 `babel-loader` 来处理：

```javascript
const rules = [
  // ...
  {
    test: /\.js$/,
    loader: 'babel-loader',
  },
]
```

接着在根目录下创建一个配置文件 `babel.config.js`：

```javascript
module.exports = function(api) {
  api.cache(true)

  const presets = ['@babel/preset-env']
  const plugins = []

  return {
    presets,
    plugins,
  }
}
```

到这里它已经可以正常工作了，至少将我们的箭头函数转换为了普通的函数，现在我们还需要创建一个配置文件 `.browserslistrc`（也可以在 package.josn 文件中通过 字段设置），它指定了项目的目标浏览器的范围。这个值会被 `@babel/preset-env`, `Autoprefixer`, `stylelint`, `eslint-plugin-compat` 等用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

```bash
[production staging]
>0.2%,
not dead,
not op_mini all

[development]
last 1 chrome version,
last 1 firefox version,
last 1 safari version
```

## 按需配置 Babel 插件

现在一些基本的高级语法都可以被转换为低版本的语法了，但是并不是所有最新的语法它都支持，因为 @babel/preset-env 是一部分插件的集合，但并不是所有的，不过它包含基本上我们所能用到的。

如果你需要使用更高级的语法，比如 `class` 和 `decorate`，需要我们安装配置相应的插件，现在我们在入口文件中来创建使用这两个语法：

```javascript
function sayName(target) {
  console.log(target.name)
}

@sayName
class TestClass {
  constructor() {
    console.log('Hello world!')
  }
}

new TestClass()
```

此时进行打包毫无意外会报错，接着安装相应的插件：

```bash
yarn add -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

最后，在配置文件中配置即可：

```javascript
// babal.config.js
// ...
const plugins = [
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true,
    },
  ],
  '@babel/plugin-proposal-class-properties',
]
// ...
```

这里只是对这两种常用的高级语法做一个说明，对于其它不再开始集合中的插件，我们都可以这样进行使用。就像一开始说的，`Babel` 是一个编译器（输入源码 => 输出编译后的代码）。就像其他编译器一样，编译过程分为三个阶段：解析、转换和打印输出。

我们配置的插件主要就是用于转换阶段，如果不使用插件（或其集合），那么 `Babel` 就相当于什么也不做，然后原样输出你的代码（空格、换行等格式不保证）。

## 其它语法支持

`@babel/polyfill` 模块包括 `core-js` 和一个自定义的 `regenerator runtime` 模块用于模拟完整的 `ES2015+` 环境。

这样我们就可以使用诸如 `Promise` 和 `WeakMap` 之类的新的内置组件、 `Array.from` 或 `Object.assign` 之类的静态方法、 `Array.prototype.includes` 之类的实例方法以及生成器函数（需要 `regenerator` 插件）。

```javascript
// ./app/index.js
const str = 'Hello world!'
console.log(str.includes('e'))
```

如果现在直接打包，那么对于 `includes` 方法不会做任何处理，我们需要安装 `@babel/polyfill`：

```bash
yarn add @babel/polyfill core-js@3
```

当然我们没必要直接加载整个 `@babel/polyfill` 模块，幸运的是在我们所使用的 `env preset` 提供了一个 "useBuiltIns" 参数，当此参数设置为 "usage" 时，就会加载上面所提到的最后一个优化措施，也就是只包含你所需要的 `polyfill`。

```javascript
// ...
const presets = [
  // 如果 preset 名称的前缀为 babel-preset- 可以省略该前缀
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
]
// ...
```

这样 `Babel` 将检查我们的所有代码，以便查找目标环境中缺失的功能，然后只把必须的 `polyfill` 包含进来，再次进行打包 `Babel` 会将 `includes` 方法的实现打包在代码中，需要注意的是需要在通用的 `Webpack` 配置文件中在匹配脚本的规则里，使用 `exclude` 属性排除 `node_modules` 目录。

## 加载字体和图片

`file-loader` 和 `url-loader` 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，包括字体。

首先来安装一下依赖：

```bash
yarn add -D url-loader file-loader
```

然后在 `Webpack` 的配置文件中相应地方（rules）添加下面的规则，以让其知道何时如何处理：

```javascript
{
    test: /\.(png|svg|jpg|gif)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192,
            fallback: 'file-loader',
            name: 'images/[name].[ext]',
        }
    }]
}, {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    options: {
        limit: 8192,
        fallback: 'file-loader',
        name: 'font/[name].[ext]',
    }
}
```

## 使用 source map

当 `Webpack` 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置，因为在提示错误时，只会提示到打包后文件中的位置，这通常对我们来说没有多大的帮助。

所幸 JavaScript 提供了 `source map` 功能，将编译后的代码映射回原始源代码，并提供了很多不同的选项可用。

- source-map：单独生成一个 `source-map` 文件，报错会定位到行和列。
- eval-source-map：不会生成单独的文件，报错会定位到行和列。
- cheap-module-source-map：生成一个单独的映射文件，报错仅提示所在行。
- cheap-module-eval-source-map：不会生成单独的文件，报错仅提示所在行。

你可以在 [这里](https://webpack.js.org/configuration/devtool) 查看更加详细的介绍，实现的基本原理就是一个 JSON 键值对，利用 VLQ 编码与特定的规则存储位置信息。

要在 Webpack 中开启 source map 尤为简单，通常在生成模式下我们并不需要改种映射关系，因此我们只需要在开发的环境中配置即可：

```javascript
// webpack.dev.js
// ...
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
}
// ...
```

## 自动编译工具

现在整个项目已经启用了大部分的基本功能，但是每次修改代码之后我们都要重新执行打包命令，然后再刷行页面，这样显得很不方便。现在我们有多个选择：

**使用观察模式**：只需要为 `webpack` 命令加上 `--watch` 参数即可。如此，我们执行打包命令后就不会退出命令行，而是继续观察项目的文件，当我们改变文件内容时会自动再次打包。不过，为了看到修改后的实际效果，我们需要刷新浏览器。

如果需要加上自动刷新浏览器的功能，则可以选择使用 `webpack-dev-server` 来解决这个问题，它将提供了一个简单的 `web` 服务器，并且能够实时重新加载。首先对其进行安装：

```bash
yarn add -D webpack-dev-server
```

然后在开发配置文件中对其进行配置：

```javascript
```

随后为了使用方便，再在 `package-scripts.js` 文件中配置启动命令：

```javascript
// ...
dev: {
    default: {
        description: 'Start a WEB service with development mode',
        script: 'webpack-dev-server --config scripts/webpack.dev.js'
    }
}
// ...
// 顺便将 build 命令中环境变量的设置命令移到了该配置文件中
```

最后再修改一下 package.json 文件：

```json
"scripts": {
    "build": "npx nps build",
    "build.dev": "npx nps build.dev",
    "dev": "npx nps dev"
},
```

现在，可以执行命令 `yarn run dev` 启动项目，然后修改项目中的文件来感受它的妙处了，当然如果你需要更加灵活的配置的话，你也可以使用 `webpack-dev-middleware`，它可以把 `webpack` 处理后的文件传递给一个服务器，这样，我们也可以结合 `express` 来进行处理更多符合自己需求的自定义开发选项。

## tree shaking

`tree shaking` 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 `ES2015` 模块系统中的静态结构特性，例如 `import` 和 `export`。

具体表现为在我们的项目中添加一个新的通用模块文件 `src/math.js`，此文件导出两个函数：

```javascript
export const sum = (a, b) => a + b

export const square = num => num ** 2
```

然后在入口文件中引用其中一个函数：

```javascript
import { square } from './math'

console.log(square(2))
```

现在，虽然我们只引用了 `src/math.js` 文件中导出的其中一个函数，但是当我们进行打包时，会发现其中的两个函数都被打包在了结果中，显然这样的代码有些冗余。

现在我们来 开始使用 `tree shaking`：

- 使用 `ES2015` 模块语法（即 import 和 export）。
- 在项目 `package.json` 文件中，添加一个 "sideEffects" 入口，向 `compiler` 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
- 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。

显然上面我们使用了符合标准的语法，而且压缩工具我们在之前也在 <a href="#压缩样式文件">压缩样式文件</a> 进行了配置，现在只需要添加 `sideEffects` 字段。

## 消除冗余样式

在项目开发中可能产生一些未曾使用的样式代码，使用 `PurifyCSS` 可以大大减少 CSS 冗余，比如我们经常使用的 BootStrap(140KB)，这在实际开发当中是非常有用的。

首先对依赖进行安装：

```bash
yarn add -D glob-all purifycss-webpack purify-css
```

然后在生产环境的配置文件中进行配置：

```javascript
// ...
const path = require('path')
const glob = require('glob-all')
const PurifyCSSPlugin = require('purifycss-webpack')
// ...
plugins: [
  new PurifyCSSPlugin({
    // Give paths to parse for rules. These should be absolute
    paths: glob.sync([
      path.join(process.cwd(), 'app/**/*.html'),
      path.join(process.cwd(), 'app/**/*.js'),
    ]),
  }),
]
// ...
```

测试了一下，好像以 `id` 开头的样式名称（比如 “#id”，“#idtest”，“.id“等）都会被匹配，尽量避免吧。

## 懒加载

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

在 Webpack 中我们使用使用符合 ECMAScript 提案 的 `import()` 语法来实现这个需求，为了直观感受到它的作用，首先我们在入口文件中添加如下代码：

```javascript
// ...
const ele = document.createElement('button')
ele.innerHTML = '加载 lazy.js'
ele.onclick = () => {
  import(/* webpackChunkName: "lazy" */ './lazy.js').then(data => console.log(data.default))
}
document.body.appendChild(ele)
```

然后在 `app` 目录下创建 `lazy.js` 并输入一下内容：

```javascript
export default 'Hello world!'
```

显然现在打包会报错，因为不支持上面所使用的懒加载语法，现在我们需要安装 `@babel/plugin-syntax-dynamic-import` 来提供支持：

```bash
yarn add -D @babel/plugin-syntax-dynamic-import
```

最后在 `babel.config.js` 中配置就可以了：

```javascript
// ...
const plugins = [
  // ...
  '@babel/plugin-syntax-dynamic-import',
]
// ...
```

## 代码分离

从 `Webpck 4` 开始使用 `optimization.splitChunks` 来代替了之前被大家所熟知的 `CommonsChunkPlugin`，默认情况下 `Webpack` 会按照下面的条件进行拆分代码块：

- 可以被共享的新代码块或者模块来自 `node_modules` 目录。
- 新的代码块大于 30kb（min+gziped 之前的体积）。
- 当按需加载块时，并行请求的最大数目将小于或等于 5 。
- 初始页面加载时的最大并行请求数将小于或等于 3。

块打包默认情况下只会影响按需加载模块，因为对初始块也进行优化打包会影响 HTML 中的 `script` 标签数，增加请求数，当然我们可以对其进行配置。

```javascript
// 此次我们在生成模式的配置文件中配置
// ...
optimization: {
    // ...
    splitChunks: {
        chunks: 'async',
        name: true,
        automaticNameDelimiter: '-',
        // the priority is maxInitialRequest/maxAsyncRequests < maxSize < minSize
        minSize: 0,
        maxSize: 0,
        minChunks: 1, // 引用计数
        maxAsyncRequests: 5, // 最大的并行请求数
        maxInitialRequests: 3, // 入口最大的并行请求数
        cacheGroups: { // 缓存组，会继承 splitChunks 的配置
            lodash: {
            priority: -10, // 缓存组打包的先后优先级
            test: /lodash/, // 控制哪些模块被这个缓存组匹配到
            chunks: 'all',
            },
            common: {
            priority: -20,
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true, // 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块
            },
        },
    },
},
// ...
```

然后在入口文件中添加一些测试的内容：

```javascript
// ...
// 被 splitChunks 下缓存组的 lodash 匹配
import _ from 'lodash'

// 被 splitChunks 匹配
import(/* webpackChunkName: "async-util" */ 'util').then(data => console.log(data.default))

const ele = document.createElement('button')
ele.innerHTML = '加载 lazy.js'
ele.onclick = () => {
  // 被 @babel/plugin-syntax-dynamic-import 插件匹配
  import(/* webpackChunkName: "lazy" */ './lazy.js').then(data => console.log(data.default))
}
document.body.appendChild(ele)
```

现在我们进行打包，并可以看到匹配的代码块被打包到了单独的文件中：

```bash
                     favicon.ico   31.3 KiB          [emitted]
                      index.html  532 bytes          [emitted]
              javascript/lazy.js  125 bytes       0  [emitted]  lazy
       javascript/lodash-main.js   68.9 KiB       1  [emitted]  lodash-main
              javascript/main.js   18.6 KiB       2  [emitted]  main
javascript/vendors-async-util.js   9.62 KiB       3  [emitted]  vendors-async-util
                 styles/main.css   61 bytes       2  [emitted]  main
```

这对于多入口的情况尤其有用。

## 缓存

通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。

通过使用 `output.filename` 进行文件名替换（对于 CSS 中 miniCssExtractPluginCfg 的处理也是如此），可以确保浏览器获取到修改后的文件。我们可以在指定输出文件名使用 `contenthash` 占位符，它会随着内容的改变而产生变化。

另外，`Webpack` 提供了一个优化功能，可以使用 `optimization.runtimeChunk` 选项将运行时代码拆分为单独的块。将其设置为 single 以为所有块创建单个运行时包，这样避免每次都处理这部分代码。

现在先进行一次打包，然后更改一下 `app` 下的代码再次进行代码，理想的结果应该是只有 `main` 模块的 `contenthash` 会改变，而事实上并非如此，因为每个 `module.id` 会默认地基于解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变。

好在，我们可以使用 `HashedModuleIdsPlugin` 插件来解决这个问题。

## shim 预置依赖

我们可能会遇到一些需要导出的全局变量的第三方模块，例如 `jQuery` 中的 `$`。通常我们可以直接在 HTML 模版中直接通过 CDN 直接引入就可以了。

如果我们还想在代码中 `import $ from 'jquery';` 来引入的话，自然，这样会产生多余的代码。为了解决这个问题，我们可以在配置文件中进行配置（之后就不会对其进行打包）：

```javascript
// ...
const baseConfig = {
  // ...
  externals: {
    $: 'jquery',
  },
}
// ...
```

不过，这样会直接引入整个库。虽然使用全局依赖是不被推崇的，但是如果需要的话，那么就是 `shim` (预置依赖) 发挥作用的地方。

使用 `ProvidePlugin` 后，能够在 `Webpack` 编译的每个模块中，通过访问一个变量来获取一个 `package`。如果 `Webpack` 看到模块中用到这个变量，它将在最终 `bundle` 中引入给定的 `package`。

首先先安装一下 `lodash`：

```bash
yarn add lodash
```

然后在通用配置文件中进行配置：

```javascript
// ...
const webpack = require('webpack')
// ...
const baseConfig = {
  plugins: [
    // ...
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
  ],
}
// ...
```

不过这样依旧引入了整个库，所以这里我们结合 `exports-loader` 来仅暴露我们需要的到全局，因此首先要对其进行安装：

```bash
yarn add -D exports-loader
```

然后修改一下通用配置文件：

```javascript
// ...
const webpack = require('webpack')
// ...
const baseConfig = {
  plugins: [
    // ...
    new webpack.ProvidePlugin({
      clone: 'exports-loader?clone!lodash/clone',
    }),
  ],
}
// ...
```

现在，我们可以在全局使用 `clone` 方法了，并且只打包了其必须的相关代码。

## module.noParse

防止 `webpack` 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 `import`, `require`, `define` 的调用，或任何其他导入机制。忽略大型的 `library` 可以提高构建性能。

在 `webpack` 中我们可以通过 `module.noParse` 来匹配那些不需要被解析依赖的库，比如 `jquery`，首先我们对其进行安装：

```bash
yarn add jquery
```

然后我们可以在通用配置文件中进行配置即可：

```javascript
module.exports = {
  //...
  module: {
    noParse: /jquery/,
  },
}
```

需要注意的是，这样匹配的话这个第三方库应当是全部引入的，否则会出现错误。比如之前我们按需加载了 `lodash` 的 `clone` 方法，如果在此直接匹配 `lodash` 不处理其中依赖的话是行不通的。

## IgnorePlugin

`IgnorePlugin` 防止与指定正则或函数返回结果匹配的资源在 `import` 或 `require` 调用产生模块。

比如，我们在处理时间时经常会选择使用 `moment` 模块，该模块的入口文件 `moment.js` 中引入了其中 `local` 目录下的各个语言包，通常在我们的项目中我们并不需要所有的语言包。

为了解决引入所有语音包带来的冗余代码，我们可以就可以使用 `IgnorePlugin` 来实现。首先我们还是先来安装一下 `moment`：

```bash
yarn add moment
```

然后在入口文件中引入，并使用它：

```javascript
import moment from 'moment'
import 'moment/locale/zh-cn' // 由于忽略了语言包的引入，所以需要单独引入我们所需的语言包

moment.locale('zh-cn')
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
```

最后在通用配置文件中配置：

```javascript
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/locale$/,
  contextRegExp: /moment$/,
})
```

现在在 `moment` 中所有从 `local` 中的引入都会被忽略。

## expose-loader

假设你要将 `jQuery` 暴露至全局并称为 `$`，那么只需要安装一下 `expose-loader`：

```bash
yarn add -D expose-loader
```

然后在配置文件中添加一下规则即可：

```javascript
// webpack.config.js
module: {
  rules: [
    {
      test: require.resolve('jquery'),
      use: [
        {
          loader: 'expose-loader',
          options: '$',
        },
      ],
    },
  ]
}
```

需要注意的是，前面我们使用 `module.noParse` 忽略了 `jquery` 相关依赖方面的信息，因此我们需要取消忽略。

## HappyPack

`HappyPack` 就能够基于 `Webpack` 把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程，以实现并行打包。

1、安装：

```bash
yarn add -D happypack
```

2、配置

```javascript
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 5 })
// ...
exports.module = {
  rules: [
    {
      test: /\.(le|c)ss$/,
      use: [
        {
          // 这里我们并没有将 MiniCssExtractPlugin 中的 loader 移到 HappyPack 中
          // 因为一些原因移动进去后并不能工作
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: devMode,
          },
        },
        {
          loader: 'happypack/loader?id=styles',
        },
      ],
    },
    {
      test: /.js$/,
      use: 'happypack/loader?id=js',
    },
  ],
}
// ...
exports.plugins = [
  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool, // 使用共享进程池
    loaders: ['babel-loader'],
  }),
  new HappyPack({
    id: 'styles',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'less-loader',
      },
    ],
  }),
]
```

当然，并不是分配的进程越多越好，毕竟开启子进程和进程间的交互也是比较耗时和资源的，因此，推荐在打包大型项目的时候使用该插件，可以更明显的加快打包的速度。

## resolve 属性的配置

我们经常会使用该属性上的 `extensions` 属性，也就是扩展名。当我们加载一个只有指定后缀的文件时，默认加载的扩展名顺序是 `.wasm, .mjs, .js, .json`，然后通常我们并不会接触到 `.wasm` 文件。因此，我们可以改变这个加载顺序。

```javascript
// webpack.common.js
module.exports = {
  //...
  resolve: {
    extensions: ['.js', '.json', '.less', '.css', '.mjs'],
  },
}
```

另外，我们还可以通过其上的 `alias` 来做一些别名，最常用的就是路径别名，对于一些比较的路径用一个名称去代替。

```javascript
module.exports = {
  //...
  resolve: {
    alias: {
      '@style': path.resolve(__dirname, '../app/styles/'),
    },
  },
}
```

现在，我们就可以改变入口文件引入样式文件的方式了。

## Eslint

`ESLint` 是一个 JavaScript 语法规则和代码风格的检查工具，它的目标是保证代码的一致性和避免错误。

首先，我们需要安装 `ESLint`：

```bash
yarn add -D eslint
```

然后，在根目录中添加配置文件：

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {},
}
```

通常，如果我们需要忽略掉一些文件或目录的检测我们可以添加 `.eslintignore` 文件。

## Prettier

在 `Prettier` 环境下，所有的 JavaScript 代码都会转换为抽象语法树，然后被重新格式化。因此，它确保不会对编写的代码进行任何破坏更改。

与 `ESLint` `不同，ESLint` 只是一个代码质量工具 (确保没有未使用的变量、没有全局变量，等等)。而 `Prettier` 只关心格式化文件 (最大长度、混合标签和空格、引用样式等)。你可以将 `ESLint` 和 `Prettier` 结合起来使用，以获得双赢的组合。

在项目中使用，我们将把它添加为 `dev` 依赖项：

```bash
yarn add -D prettier
```

安装成功后，要针对某个特定文件运行的话，只需要运行命令 `yarn prettier --write index.js`，这样便可在当前目录生成 `index.js` 文件。

根据需要可以配置 `Prettier` 的其他选项，通常使用配置文件来做。也可以将这些添加到 `.prettierrc.js` 文件中并放置在项目的根文件夹下：

```javascript
module.exports = {
  printWidth: 100,
  trailingComma: 'none',
  singleQuote: true,
  semi: false,
  jsxBracketSameLine: false,
  bracketSpacing: true,
}
```

然后，你可以将这个命令添加到你的 NPM 脚本中，并将 `app` 文件夹作为一个 `glob` 传递给它，而不是一个单独的文件。格式化脚本是这样的：

```json
// ...
"scripts": {
    // ...
    "prettier": "prettier --write './app/**/*.{js,css,json}'"
},
// ...
```

现在，你可以使用 `yarn run prettier` 命令来进行格式化代码了。

## 代码提交前检查

`husky` 可以让 `git hooks` 的使用变得更简单方便。它会在我们项目根目录下面的 `.git/hooks` 文件夹下面创建 `pre-commit`、`pre-push` 等 `hooks`。这些 `hooks` 可以让我们直接在 `package.json` 的 `scripts` 里运行我们想要在某个 `hook` 阶段执行的命令。

`lint-staged` 可以在 `staged` 阶段的文件上执行 `linters`，简单点来说就是当我们运行 `eslint` 或 `stylelint` 的命令时，只会检查我们通过 `git add` 添加到暂存区的文件，可以避免我们每次检查都把整个项目的代码都检查一遍。

首先我们对两者进行安装：

```bash
yarn add - D husky lint-staged
```

然后在 package.json 文件中进行配置：

```json
{
  "scripts": {
    "lint:base": "eslint --rule \"prettier/prettier: 2\"",
    "lint": "yarn run lint:base -- .",
    "lint:fix": "yarn run lint -- --fix"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "linters": {
      "*.{ts,js,less,css,json}": ["yarn run lint", "git add"]
    },
    "ignore": ["dist/**/*"]
  }
}
```

现在当我们再次提交内容时，就会先对我们提交的内容进行检测，检测失败则无法提交。

## 配置 Stylelint

和 `ESLint` 很像。二者都提供了工具与规则。但如何配置这些规则完全取决于使用者。所以我们要根据需要自己引入或配置规则。

因此我们之前配置使用了 `prettier`，所以这里使用官方推荐的 `stylelint-config-recommended`。当然，首先还是要对它们进行安装：

```bash
yarn add -D prettier stylelint-config-recommended
```

然后在配置文件 `stylelintrc.js` 中进行配置：

```javascript
module.exports = {
  processors: [],
  plugins: [],
  extends: ['stylelint-config-standard'],
  rules: {},
}
```

通过 `stylelintrc.js` 文件还可以忽略对特定的文件或目录进行检测，其语法与 `.gitignore` 一致。

## 代码检测冲突

`stylelint-config-prettier` 可以关闭 `stylelint` 中一些不必要或则与 `prettier` 相互冲突的规则，同样的 `eslint-config-prettier` 也是用于解决 `eslint` 与其的冲突，使用前先进行安装：

```bash
yarn add -D stylelint-config-prettier eslint-config-prettier
```

然后，在各自配置文件中的规则继承的地方写入配置即可：

```javascript
// stylelintrc.js
module.exports = {
  // ...
  extends: [
    // 继承的规则
    'stylelint-config-standard',
    'stylelint-config-prettier',
  ],
  // ...
}

// eslintrc.js
module.exports = {
  // ...
  extends: ['eslint:recommended', 'prettier'],
  // ...
  rules: {
    'prettier/prettier': 'error',
  },
}
```

## 注释

- 文中文件的相对路径均是相对于项目跟路径而言的。
- 代码快中的 `// ...` 表示省略了一些其它代码。

## 参考资料

- [概念 | Webpack 中文网](https://www.webpackjs.com/concepts/)
- [Webpack 4 Tutorial: from 0 Conf to Production Mode (Updated)](https://www.valentinog.com/blog/webpack/)
- [Webpack 中文文档 - 印记中文](https://webpack.docschina.org)
- [指南 | webpack 中文网](https://www.webpackjs.com/guides/)
- [nps - Github](https://github.com/kentcdodds/nps)
- [nps-utils - API Document](https://doc.esdoc.org/github.com/kentcdodds/nps-utils/)
- [入门 Webpack，看这篇就够了 - 简书](https://www.jianshu.com/p/42e11515c10f)
- [What is an npmignore file and what is it used for](https://javascript.tutorialhorizon.com//2015/06/25/what-is-an-npmignore-file-and-what-is-it-used-for/)
- [npm-developers | npm Documentation](https://docs.npmjs.com/misc/developers)
- [如何降低在 npm 模块中发布敏感信息的可能性 - 知乎](https://zhuanlan.zhihu.com/p/31875370)
- [npx 使用教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2019/02/npx.html)
- [webpack 中的 hash、chunkhash、contenthash 区别 - 掘金](https://juejin.im/post/5a4502be6fb9a0450d1162ed)
- [Webpack 4 如何优雅打包缓存文件 - IMWeb 前端博客](https://imweb.io/topic/5b6f224a3cb5a02f33c013ba)
- [Webpack 中的 sourcemap 以及如何在生产和开发环境中合理的设置 sourcemap 的类型 - CSDN](https://blog.csdn.net/liwusen/article/details/79414508)
- [JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
- [Webpack, loaders, Babel, sourcemaps, React, Hot Module Reload, TypeScript, modules, code splitting and lazy loading full tutorial to transpile and bundle your code](https://blog.wax-o.com/2018/05/webpack-loaders-babel-sourcemaps-react-hot-module-reload-typescript-modules-code-splitting-and-lazy-loading-full-tutorial-to-transpile-and-bundle-your-code/)
- [Webpack 中的 sideEffects 到底该怎么用？](https://zhuanlan.zhihu.com/p/40052192)
- [webpack--css：消除未使用的 CSS - segmentfault](https://segmentfault.com/a/1190000016934089)
- [webpack4---生产环境 css 样式丢失问题 - CSDN](https://blog.csdn.net/qq_37800886/article/details/87856352)
- [webpack SplitChunksPlugin 实用指南](https://juejin.im/post/5b99b9cd6fb9a05cff32007a)
- [没有了 CommonsChunkPlugin，咱拿什么来分包（译）](https://github.com/yesvods/Blog/issues/15)
- [Tree-shaking-with-Bootstrap-4-and-webpack](https://volaresystems.com/blog/post/2018/02/24/Tree-shaking-with-Bootstrap-4-and-webpack)
- [webpack 优化之 HappyPack 实战](https://www.jianshu.com/p/b9bf995f3712)
- [Can HappyPack support MiniCssExtractPlugin？ - Github](https://github.com/amireh/happypack/issues/223)
- [用 Prettier 格式化 JavaScript 代码](https://www.infoq.cn/article/using-prettier-format-javascript-code)
- [用 husky 和 lint-staged 构建超溜的代码检查工作流 - 知乎](https://zhuanlan.zhihu.com/p/27094880)
