# 理解 Webpack 工作方式

**Webpack** 的核心是一个现代 `JavaScript` 应用程序的静态模块打包工具。

它处理应用程序时，会在内部构建一个依赖图(dependency graph)，这个依赖图会映射项目所需的每个模块，并生成一个或多个 `bundle`。

在深入理解 `Webpack` 之前，我们需要知道它的本质其实是一种事件流的机制。如果我们查看源码会发现其中最核心的负责编译的 `Compiler` 和负责创建 `bundles` 的 `Compilation` 都是 `Tapable` 的实例。

[Tapable](https://github.com/webpack/tapable) 是一个小型的库，允许你对一个 `JavaScript` 模块添加和应用插件。它可以被继承或混入到其他模块中，其核心原理依赖于发布订阅模式。

## 发布订阅模式

发布订阅模式被广泛用于 `JavaScript` 编程中，比如我们熟知的 `redux`、`EventEmitter` 等。在这中模式中，一个对象会订阅另一个对象的特定活动并在状态改变后获得通知。订阅者也可以被称为观察者，而被观察的对象称为发布者或者主题。

日常生活中的杂志订阅于此非常类似，订阅日志的人将会在特定日期收到日志。一个订阅者通常会包含四个部分：

* `subscribers`，一个数组存储所有的订阅。
* `subscribe`，一个接口，将订阅者添加到 `subscribers` 数组中。
* `unsubscribe`，一个接口，将从 `subscribers` 数组中取消指定的订阅。
* `publish`，一个方法，将循环遍历 `subscribers` 数组中的每个元素以通知（调用）它们。

所有这三种方法都需要一个 type 参数，因为一个发布者可能发布多个事件，而订阅者只想订阅其中一种情况。由于这些事件对于任何发布者对象来说都是通用的，所以我们把它们放在一个对象中进行管理。接下来是一个简单的实现示例：

```javascript
class Publisher {
  constructor() {
    this.subscribers = {
      any: []
    };
  }

  subscribe(fn, type) {
    const { subscribers } = this;
    type = type || "any";
    if (typeof subscribers[type] === undefined) {
      subscribers[type] = [];
    }
    subscribers[type].push(fn);
  }

  unsubscribe(fn, type) {
    this.operateSubscribers("unsubscribe", fn, type);
  }

  publish(type) {
    this.operateSubscribers("publish", arg, type);
  }

  operateSubscribers(action, arg, type) {
    const { subscribers } = this;
    type = type || "any";
    subscribers.some((subscribe, i) => {
      if (action === "publish") {
        subscribe(arg);
      } else if (subscribe === arg) {
        subscribers.splice(i, 1);
        return true;
      }
    });
  }
}
```

我们在使用时只需要取得 `Publisher` 的实例就可以获得一个发布者，促进形成了松散耦合。

## 搭建基础

现在，我们开始来实现一个 `Webpack`，首先创建并初始化项目。

```bash
mkdir my-pack && cd $_ && npm init -y
```

接下来为将来使用我们模块的同学提供一个命令（my-pack），当执行它时会运行我们项目下的 `my-pack.js` 文件，为此我们现在项目根目录下创建该文件。

```bash
mkdir bin && cd $_ && touch my-pack.js
```

并在 `package.json` 文件中通过 `bin` 字段申明声明。

```json
{
  "name": "my-pack",
  "bin": "./bin/my-pack.js",
}
```

为了模块在本地开发时可以直接使用，我们先将其链接到全局安装目录下使其成为一个全局模块。

```bash
npm link
```

然后再新建一个项目（名为：my-project）并初始化后，将上面的模块链接到当前项目以达到安装的目的。

```bash
mkdir my-project && cd $_ && npm init -y
# 安装 my-pack
npm link my-pack
```

现在我们在项目 `my-project` 中执行 `npx my-pack` 就会执行模块中 `bin/my-pack.s` 文件了，不过由于其中没有任何内容所以会报错，现在我们先向其中添加一些内容。

```javascript
#!/urs/bin/env node

// 第一行是必须的，通过 #! 这个约定的标记，告诉系统下面的脚本需要什么解释器来执行
console.log('hello world')
```

接着再执行 `npx my-pack` 你就会看到那个熟悉而亲切的问候语了。

## 理解本质

在实现 Webpack 之前，我们先来看一下它基本做了些什么。首先在模块目录下安装 `webpack` 和 `webpack-cli`。

```bash
npm install --save-dev webpack webpack-cli
```

然后在新建 `src/other.js` 文件，并写上一些内容。

```javascript
module.exports = 'other'
```

新建 `src/index.js` 文件，也写上一些内容。

```javascript
const str = require('./other')
const ret = 'index' + '-' + str
console.log(ret)
module.exports = ret
```

为了打包后的内容好分析，所以我们需要指定打包的模式，为此我们在模块根目录下新建 `webpack.config.js` 文件。

```javascript
const path = require("path")

module.exports = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js"
    }
}
```

现在我们可以进行打包了，打包后将其中无用的注释去掉我们可以看到下面的内容。

```javascript
(function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    // 移除了 __webpack_require__ 上的属性便于查看整体结构
    return module.exports;
  }
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({
  "./src/index.js": (function (module, exports, __webpack_require__) {
    eval("const str = __webpack_require__(/*! ./other */ \"./src/other.js\")\r\nconst ret = 'index' + '-' + str\r\nconsole.log(ret)\r\nmodule.exports = ret\n\n//# sourceURL=webpack:///./src/index.js?");
  }),
  "./src/other.js": (function (module, exports) {
    eval("module.exports = 'other'\n\n//# sourceURL=webpack:///./src/other.js?");
  })
});
```

结构一目了然，它显示了一个立即执行的匿名函数，并为其传入了一个包含项目中模块依赖关系的一个对象。

在这个匿名函数的内部它实现了一个自己的 `require` 函数（这和 `nodejs` 中的 `require` 函数很像），然后在最后传入了入口文件进行调用。

在这个 `require` 函数内部，首先检测了是否在缓存中，不再则创建一个对象作为 `this` 来调用对应的模块，最后返回了这个对象的 `exports` 属性。

## 编译实现

现在我们开始来实现 `Webpack` 所做的工作，首先我们要得到上面自执行函数的参数，为此我们创建一个 `Compiler` 类来完成这件事。

首先在模块目录下创建 `.lib/Compiler.js`，然后我们写下这个类的基本的结构。

```javascript
const path = require('path')

class Compiler {
    constructor(config) {
        this.config = config
        // 工作路径
        this.root = process.cwd()
        // 入口路径
        this.entry = this.config.entry || './src/index.js'
        // 入口文件的路径
        this.entryId = './src/index.js'
        // 存储依赖关系
        this.modules = {}
    }

    /**
     * @description
     * 创建模块的依赖关系
     * @param {string} modulePath 模块路径
     * @param {boolean} isEntry 是否是入口文件
     */
    buildMoudle(modulePath, isEntry) {}

    /**
     * @description
     * 发送打包后的文件
     */
    emitFile() {}

    run() {
        // 创建模块的依赖关系
        this.buildMoudle(path.resolve(this.root, this.entry), true)
        // 发送打包后的文件
        this.emitFile()
    }
}

module.exports = Compiler
```

并在主文件 `my-pack.js` 文件中启用。

```javascript
#!/usr/bin/env node

const path = require('path')
const root = process.cwd()

// 获取项目目录下的配置文件
const config = require(path.resolve(root, 'webpack.config.js'))
// 获取负责编译工作的 Compiler 类
const Compiler = require('../lib/Compiler')

const compiler = new Compiler(config)

// 开始编译
compiler.run();
```

接下来我们来实现 `buildMoudle` 函数的具体内容，为了得到依赖关系，首先我们先获取依赖对象中入口文件对应的 `key` 值，它是相对于工作目录的相对路径。

```javascript
// 得到最终依赖对象中改模块对应的 key 的值
const moduleName = `./${path.relative(this.root, modulePath)}`
```

然后我们需要获取到入口文件的内容，为此我们创建一个辅助函数来完成，它在得到模块路径时会我们返回其中的内容。

```javascript
getSource(modulePath) {
    const content = fs.readFileSync(modulePath, 'utf-8')
    return content
}
```

在 `buildMoudle` 函数中进行调用。

```javascript
buildMoudle(modulePath, isEntry) {
    // 得到最终依赖对象中改模块对应的 key 的值
    const moduleName = `./${path.relative(this.root, modulePath)}`
    // 获取模块内容
    const sourceCode = this.getSource(modulePath)
}
```

在 `Webpack` 的打包结果中我们还看到，每个模块中的 `require` 函数已经被替换成了 `Webpack` 自己的 `__webpack_require__` 函数，因此我们需要对获取到的文件内容进行解析，替换其中的 `require` 函数，为此我们新增一个 `parse` 函数来完成。

在这个函数中，我们先将编写的代码通过 [@babel/parser](https://github.com/babel/babel/tree/master/packages/babel-parser) 解析成抽象语法树（AST），然后通过 [@babel/traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse) 来对语法树进行遍历、操作。

过程中同时结合一个强大的用于处理 AST 节点的工具库 [@babel/types](https://github.com/babel/babel/tree/master/packages/babel-types)，它包含了构造、验证以及变换 AST 节点的一系列方法。

整个工作看起来就像是先对依赖进行安装：

```bash
npm install --save-dev @babel/parser @babel/traverse @babel/types @babel/generator
```

然后是按照正确的方式引入它们：

```javascript
const babelParser = require('@babel/parser')
const tarvese = require('@babel/traverse').default
const t = require('@babel/types')
const generate = require('@babel/generator').default
```

接着是具体的操作，`parse` 函数接受源码和父目录，经过处理后返回源码和依赖：

```javascript
parse(sourceCode, parentPath) {
    const dependencies = [] // 存储依赖
    const ast = babelParser.parse(sourceCode)
    tarvese(ast, {
        CallExpression(p) {
            const node = p.node
            if (node.callee.name === 'require') {
                node.callee.name = '__webpack_require__'
                // 获取函数的参数
                let moduleName = node.arguments[0].value
                // 对没有扩展名的加上扩展名
                moduleName = path.extname(moduleName) ? moduleName : `${moduleName}.js`
                // 最终得到相对工作目录的路径
                moduleName = `./${path.join(parentPath, moduleName)}`
                // 存储到依赖数组中
                dependencies.push(moduleName)
                // 设置 __webpack_require__ 函数的参数
                node.arguments = [t.stringLiteral(moduleName)]
            }
        }
    })
    const retCode = generate(ast).code
    return {
        retCode,
        dependencies
    }
}
```

最后，我们在 `buildMoudle` 函数中对返回的依赖列表进行遍历处理，现在它大概是这个样子的：

```javascript
buildMoudle(modulePath, isEntry) {
    // 得到最终依赖对象中改模块对应的 key 的值
    const moduleName = `./${path.relative(this.root, modulePath)}`
    // 设置入口文件路径
    if (isEntry) {
        this.entryId = moduleName
    }
    // 获取模块内容
    const sourceCode = this.getSource(modulePath)
    // 解析其中的依赖，返回更改后的源码和一个依赖列表
    const {
        retCode,
        dependencies
    } = this.parse(sourceCode, path.dirname(moduleName))
    this.modules[moduleName] = retCode
    // 遍历处理后续的依赖项
    dependencies.forEach(dep => {
        this.buildMoudle(path.resolve(this.root, dep), false)
    })
}
```

在继续工作之前，不妨先来测试一下，看看完成到什么程度了。

在测试之前，先把 `my-pack` 目录下的 `src` 目录和 `webpack.config.js` 文件分别复制一份到 `my-project` 目录，然后在该目录执行命令 `npx my-pack`，顺利的话你应该在 `run` 函数中执行 `buildMoudle` 函数后可以打印 `this.modules` 来得到正确的依赖关系了。

```html
{ './src\\index.js': 'const str = __webpack_require__("./src\\\\other.js");\n\nconst ret = \'index\' + \'-\' + str;\nconsole.log(ret);\nmodule.exports = ret;',
  './src\\other.js': 'module.exports = \'other\';' }
```

## 生成打包结果

现在我们已经拿到了含有依赖关系的对象，接下就可以结合一个固定的模板来根据依赖关系产出我们最后需要的打包结果。在此我们借助 EJS 来完成我们的工作。

首先，我们将之前通过 `webpack` 打包的 `main.js` 进行改动以作为我们的渲染模板。

需要我们改动的地方主要就是传递给自执行函数的参数，它是有我们的依赖对象循环遍历产生的，另外就是函数里面调用 `__webpack_require__` 函数是传递的参数，也就是我们的入口文件。修改后的文件我们保存在 `lib` 目录下的 `main.ejs` 中：

<img :src="$withBase('/images/webpack/main.ejs.png')" alt="main.ejs">

接着我们安装一下 `ejs` 包：

```bash
npm install --save-dev ejs
```

然后在 `Compiler.js` 中引入：

```javascript
const ejs = require('ejs')
```

最后在 `emitFile` 完成我们的主要逻辑：

```javascript
emitFile() {
    // 获取最终的输出文件
    const filename = path.join(
        this.config.output.path,
        this.config.output.filename
    )
    // 读取模板
    const template = this.getSource(path.resolve(__dirname, "./main.ejs"))
    // 渲染
    const code = ejs.render(template, {
        entryId: this.entryId,
        modules: this.modules
    })
    // 保存打包的文件及其内容
    this.assets = {}
    this.assets[filename] = code
    // 创建打包后的文件并写入相应的内容
    fs.writeFileSync(filename, code)
}
```

此时，再次执行 `npx my-pack` 命令进行打包，打包后的内容就可以在网页中引用并使用了。

## Loader 的实现

事实上，`loader` 的本质其实就是一个函数，它会获取到匹配的文件的文件内容，在对内容进行特定的处理后再进行返回。

在 `webpack` 中使用 `loader` 时，我们需要在配置对象中的 `module` 属性下通过 `rules` 属性来进行声明，然后 `webpack` 在得到最初的文件内容时会对配置的规则进行遍历，对匹配的 `loader` 进行调用。

现在，我们先在配置文件中配置 `less-loader` 和 `style-loader`：

```javascript
module: {
    rules: [
        {
            test: /\.less$/,
            use: [
                path.resolve(__dirname, "./loader/style-loader"),
                path.resolve(__dirname, "./loader/less-loader")
            ]
        }
    ]
}
```

随后，我们在对应的目录下来创建这两个简易的 `loader`，首先安装一下 `less-loader` 用到的依赖：

```bash
npm install --save-dev less
```

然后是两个 `loader` 的具体内容：

```javascript
// my-project/loader/style-loader.js
const less = require("less")

function loader(src) {
    let ret = ""
    less.render(src, function(err, r) {
        ret = r.css
    })
    ret = ret.replace(/\n/g, "\\n")
    return ret
}

module.exports = loader

// my-project/loader/less-loader.js
function loader(src) {
    const style = `
        let styleEle = document.createElement('style');
        styleEle.innerHTML = ${JSON.stringify(src)};
        document.head.appendChild(styleEle);
    `
    return style
}

module.exports = loader
```

为了检验他们的效果，我们 `src/index.js` 中引入我们将创建的 `src/index.less` 文件，并在该文件中写下下面的内容，以便查看效果：

```less
body {
    background: red;
}
```

现在剩下关键的一步了，我们需要在 `Compiler` 类的 `getSource` 函数中，取出配置文件中的 `loader` 进行遍历，将每项的规则对资源路径的后缀进行匹配，符合要求则传入资源进行处理。

```javascript
getSource(modulePath) {
    const rules = this.config.module.rules
    let content = fs.readFileSync(modulePath, "utf-8")
    rules.forEach(rule => {
        const { test, use } = rule
        // 对匹配的资源依次调用配置的 loader 进行处理
        if (test.test(modulePath)) {
            use.reduceRight(function(pre, loader) {
                return (content = require(loader)(pre))
            }, content)
        }
    })
    return content
}
```

## 插件的实现

在实现 `loader` 之后，接着就需要让插件来为我们工作了。

插件在 `webpack` 中是一个具有 `apply` 方法的 `JavaScript` 对象。`apply` 方法会被 `webpack compiler` 调用，并且 `compiler` 对象可在整个编译生命周期访问。

现在我们在 `my-pack` 项目下先安装一下 `tapable`。

```bash
npm install -save-dev tapable
```

然后在 `Compiler.js` 中进行引入，为了便于映射实现的原理，在此我们仅引入创建一个同步的钩子。

```javascript
// ...
const { SyncHook } = require("tapable")

class Compiler {
    constructor(config) {
        // ...
        // 钩子
        this.hooks = {
            // ...
            compiler: new SyncHook()
        }
        // 调用插件进行点阅
        const plugins = this.config.plugins
        if (Array.isArray(plugins)) {
            plugins.forEach(plugin => {
                plugin.apply(this)
            })
        }
    }
    // ...
    run() {
        // 发布
        this.hooks.compiler.call()
        // 创建模块的依赖关系
        this.buildMoudle(path.resolve(this.root, this.entry), true)
        // 发送打包后的文件
        this.emitFile()
    }
}
```

接下来在配置文件中添加 `plugins` 字段的内容以进行测试：

```javascript
plugins: [
    new (class TestPlugin {
        apply(compiler) {
            compiler.hooks.compiler.tap("TestPlugin", function() {
                console.log("compiler")
            })
        }
    })()
]
```

现在，执行 `my-pack` 命令，控制台就会打印文本 `compiler` 了。

到目前位置，一个简易的 `webpack` 的工作原理就实现完成了。

## 注意

* 经测试调用所有钩子构造函数时传入的可选参数中的空字符串是无效的，并且如果里面是纯数字的字符串会报错。

## 参考

* [webpack](https://webpack.js.org/)
* [JavaScript模式 (豆瓣)](https://book.douban.com/subject/11506062/)
* [Tapable](https://github.com/webpack/tapable)
* [一口(很长的)气了解 babel - 掘金](https://juejin.im/post/5c19c5e0e51d4502a232c1c6)
* [深入Babel，这一篇就够了 - 掘金](https://juejin.im/post/5c21b584e51d4548ac6f6c99)
* [EJS -- 嵌入式 JavaScript 模板引擎 | EJS 中文文档](https://ejs.bootcss.com/)
