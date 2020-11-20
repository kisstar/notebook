# 搭建 webpack-angular 基础开发环境

简述搭建 Angular 开发环境的背景和大体内容。

## 背景

由于之前没有接触过 AngularJS，加上公司用的 AngularJS 的版本比较低，所以准备自己搭建一个 AngularJS 的开发环境，从而可以更好的学习和验证。

虽然使用的 AngularJS 的版本比较低，但是也可以记录一下安装开发环境的基本步骤，对于有相关需求的也能有个标本，即使安装使用其它的环境也可以进行参考，毕竟有些步骤是都会使用到的，一通百通。

## 搭建步骤

- 创建远程仓库 `angular-market`
- `git clone <remote>`
- 创建 `.gitignore` 文件
- `yarn init`
- `yarn add -D webpack webpack-cli`
- 创建 `/config` 下 `webpack.base.config.js` 文件

```javascript
// webpack.base.config.js
const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    // filename: 'bundle.js', //输出文件的文件名
    path: path.join(__dirname, '../'), // 输出文件所在目录
    // publicPath: 'www.yoursite.com'
  },
  module: {
    //
  },
  // 创建路径别名
  resolve: {
    alias: {
      '@': resolve('../src'),
    },
  },
  plugins: [
    //
  ],
}
```

- 在进行下一步时我们需要用到 `webpack-merge` 所以我们先进行安装 `yarn add -D webpack-merge`
- 创建 `/config` 下 `webpack.dev.config.js` 文件

```javascript
const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  output: {
    filename: 'market/js/[name].[hash].js',
    chunkFilename: 'market/js/[name].[hash].js',
  },
  module: {
    //
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    //
  ],
})
```

- 创建 `/config` 下 `webpack.prod.config.js` 文件

```javascript
const webpack = require('webpack')
const path = require('path')
const webpackBaseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  output: {
    //
  },
  module: {
    //
  },
  plugins: [
    //
  ],
})
```

- 前端项目肯定少不了 `.html` 文件，所以接下来安装一个产生 `.html` 文件的插件

```bash
# 安装
$ yarn add -D html-webpack-plugin
```

```javascript
// 在 webpack.base.config.js 文件 下引入
const HTMLWebpackPlugin = require('html-webpack-plugin')

// 并在 webpack.base.config.js 文件 下配置
plugins: [
  new HTMLWebpackPlugin({
    //创建 .html 并自动引入打包后的文件
    template: 'index.html',
    inject: true, // 参照根目录创建的 .html 来生成 .html
  }),
]
```

- 在根目录创建 `index.html` 成为上面安装的插件的模板
- 为了使得项目便于调试，我们为项目设置热更新

```bash
# 安装
$ yarn add -D webpack-dev-server
```

```javascript
// 并在 webpack.dev.config.js 配置
devServer: {
    contentBase: path.join(__dirname, 'market'),
    port:8080,
    // host:'0.0.0.0'
}
```

- 在 `package.json` 下配置开发指令

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --base ./market --open --inline --hot --compress --config config/webpack.dev.config.js",
    "build": "webpack --config config/webpack.prod.config.js"
}
```

- 使用命令 `yarn add angular@1.4.6` 安装 `Angular`
- 安装配置 `bootstrap` 和 `jQuery`

```bash
# 安装
$ yarn add bootstrap@4.1.1 popper.js@1.14.3 jquery
```

```javascript
// 在 webpack-base-config.js 配置
plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
  }),
]

// 在 /src 创建入口文件 main.js
// 引入 bootstrap 的 css 文件
import 'bootstrap/dist/css/bootstrap.min.css'
//引入angular
const Angular = require('angular')
```

- 创建第一个插件

```javascript
// 在 /src/controllers/hello-world 创建 hello-world.js
module.exports = function(App) {
  App.directive('helloWorld', function() {
    return {
      restrict: 'E',
      template: '<span>Hello world</span>',
      replace: true,
      controller: function($scope, $element) {
        $element.bind('click', function() {
          console.log('测试成功')
        })
      },
    }
  })
}

// 在 main.js 下引入
// 引入自定义的指令文件
require('./controllers/hello-world/hello-world.js')(App)
```

- 安装处理 `css` 的 `loader`

```bash
# 安装
$ yarn add -D css-loader style-loader postcss-loader autoprefixer
```

```javascript
// 在 webpack.base.config.js 配置
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
  ]
}

// 在根目录下添加 postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: { browsers: 'last 5 version' },
  },
}
```

- 配置 `less`

```bash
# 安装
$ yarn add -D less less-loader
```

```javascript
// 在 webpack.base.config.js 配置
module: {
    ...
    rules: [
        {
            test: /\.less/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        }
    ]
    ...
}
```

```javascript
// 在 hello-world.js 下引入
import('./hello-world.less')
```

```less
// 调试 less 在 hello-world.js 同目录下创建 hello-world.less
body {
  background: antiquewhite;
  .hello-world {
    color: red;
  }
}
```

- 配置 `pug`(jade)

```bash
# 安装
$ yarn add -D pug pug-loader
```

```javascript
// 在 webpack.base.config.js 下配置
module: {
    ...
    rules: [
        {
            test: /\.pug$/,
             use: [
                 'pug-html-loader'
             ]
        }
    ]
    ...
}
```

```pug
// 修改根目录下的 index.html 为 index.pug
doctype html
html(lang="en" ng-app="app")
    head
        meta(charset="UTF-8")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible" content="ie=edge")
        title 商城
    body
        div(class="container")
            hello-world
```

```javascript
// 在 webapck.base.config.js 对之前 index.html 的引入也对应修改
plugins: [
    ...
    new HTMLWebpackPlugin({
        filename: 'index.html',
        template: 'index.pug',
        inject: true
    })
    ...
]
```

- 配置处理字体和图片

```bash
# 安装
$ yarn add -D url-loader file-loader
```

```javascript
// 在 webapck.base.config.js  配置
module: {
  rules: [
    {
      test: /\.(jpg|png|gif|svg|jpeg|woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            // 配置参数
            limit: 1024, // 比较标准，小于标准的图片转换为 base64 代码
            name: 'blog/images/img-[name].[ext]',
          },
        },
      ],
    },
  ]
}
```

```less
// 修改 hello-world.less
html,
body {
  width: 100%;
  height: 100%;
}
body {
  background: #faebd7 url('../../images/bg-login.jpeg') no-repeat;
  background-size: 100% 100%;
  .hello-world {
    color: red;
  }
}
```

- 规范输出文件的位置

```javascript
// 修改 webpack.dev.config.js
devServer: {
    contentBase: path.join(__dirname, '../market'),
    port:8080,
    // host:'0.0.0.0'
}

// 修改 webpack.prod.config.js 的 output
output: {
    filename: 'market/js/[name].[hash].js',
    chunkFilename: 'market/js/[name].[hash].js'
}
```

- 配置 `clean-webpack-plugin`

```bash
# 安装
$ yarn add -D clean-webpack-plugin
```

```javascript
// 在 webpack.prod.config.js 下引入
const cleanWebpackPlugin = require('clean-webpack-plugin');

// 在 webpack.prod.config.js 下配置
 new cleanWebpackPlugin(['market/*'], {
      root: path.resolve(__dirname, '../')
}),
```

- 删除 `hello-world` 目录，在 `src` 下创建 `template` 目录，该目录下包含作为全局使用的模块
- 在 `template` 下创建 `global-tips` 目录，该目录下包含作为全局提示模块
- 在 `template` 下创建 `global-tips` 目录，其下包含全局提示模块的 `.pug` `.less` `.js`

```pug
// global-tips.pug
.global-tips(ng-class="slideClass")
    .tips-body
        .tips-title(ng-transclude="title") 系统提示
        .tips-content(ng-transclude="content") 提示内容
        .tips-footer(ng-transclude="footer") 链接
    .toggle-tips(ng-click="startSlide()" ng-if="'slide-to-right' === slideClass") 开
    .toggle-tips(ng-click="startSlide()" ng-if="'slide-to-right' !== slideClass") 关
```

```less
// global-tips.less
.global-tips {
  z-index: 5;
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 300px;
  height: 136px;
  box-shadow: 0 2px 4px 2px;
  .toggle-tips {
    text-align: center;
  }
  .tips-body {
    padding: 10px;
    .tips-title {
      font-weight: bolder;
    }
    .tips-content {
      margin: 10px 0;
      p {
        margin: 0;
      }
    }
    .tips-footer {
      //
    }
  }
}
```

```javascript
// global-tip.js
import('./global-tips.less')

module.exports = function(App) {
  App.directive('globalTips', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: {
        title: 'tipsTitle',
        content: 'tipsContent',
        footer: 'tipsFooter',
      },
      template: require('./global-tips.pug'),
      link: function($scope, $element) {
        $scope.startSlide = function() {
          if ('slide-to-top' === $scope.slideClass) {
            $scope.slideClass = ''
          } else {
            $scope.slideClass = 'slide-to-top'
          }
        }
      },
    }
  })
}
```

- 安装配置 `angular-animate`

```bash
# 安装
$ yarn add angular-animate@1.4.6
```

```javascript
// 在 main.js 中修改注入依赖
// 定义一个angular模块
let App = Angular.module('app', [require('angular-animate')])
```

- 修改 `index.pug` 显示全局提示

```pug
div(class="container")
    global-tips
        tips-title 信息提示
        tips-content Hello world
        tips-footer
            a(href="#") 安装提示
```

- 创建动画的样式

```less
// 创建 src/styles/animates/animates.less
/**
 * global-tips
 */
.slide-to-top-add,
.slide-to-top-remove {
  transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s;
}

.slide-to-top,
.slide-to-top-add.slide-to-top-add-active {
  top: -112px !important;
}

.slide-to-top-remove.slide-to-top-remove-active {
  top: 0 !important;
}
```

```javascript
// 在 main.js 引入自定义的动画
import './styles/animates/animates.less'
```

到此，基础环境的搭建就先到一段落了。
