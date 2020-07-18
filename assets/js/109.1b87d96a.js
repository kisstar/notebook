(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{419:function(e,a,n){"use strict";n.r(a);var t=n(25),s=Object(t.a)({},(function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"npm-是如何运行命令的"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#npm-是如何运行命令的"}},[e._v("#")]),e._v(" NPM 是如何运行命令的")]),e._v(" "),n("p",[e._v("NPM 是随同 "),n("code",[e._v("NodeJS")]),e._v(" 一起安装的包管理工具，能解决 "),n("code",[e._v("NodeJS")]),e._v(" 代码部署上的很多问题。")]),e._v(" "),n("h2",{attrs:{id:"npm-link"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#npm-link"}},[e._v("#")]),e._v(" npm link")]),e._v(" "),n("p",[n("code",[e._v("Node")]),e._v(" 规定，使用一个模块时，需要将其安装到全局的或项目的 "),n("code",[e._v("node_modules")]),e._v(" 目录之中。")]),e._v(" "),n("p",[e._v("开发 NPM 模块（假设在家目录下名为：myModule）的时候，有时我们希望可以在本地直接使用，让 "),n("code",[e._v("require('myModule')")]),e._v(" 会自动加载本机开发中的模块，以方便调试。")]),e._v(" "),n("p",[e._v("解决方法就是在全局的 "),n("code",[e._v("node_modules")]),e._v(" 目录之中，生成一个符号链接，指向模块的本地目录。")]),e._v(" "),n("p",[e._v("需要做的就是在开发中的模块目录执行下面的命令（NPM 会在全局模块安装的目录内，生成一个符号链接文件，该文件的名字就是 "),n("code",[e._v("package.json")]),e._v(" 文件中指定的模块名）:")]),e._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("link")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# /path/to/node_global/node_modules/myModule -> ~/myModule")]),e._v("\n")])])]),n("p",[e._v("现在我们一个拥有一个全局安装的模块（'myModule'）了。")]),e._v(" "),n("p",[e._v("如果我们要让这个模块安装在项目内，还需要在项目目录内，再次运行 "),n("code",[e._v("npm link")]),e._v(" 命令，并指定模块名。")]),e._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("link")]),e._v(" myModule  "),n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# $(pwd)/node_modules/myModule -> /path/to/node_global/node_modules/myModule")]),e._v("\n")])])]),n("p",[e._v("你可以使用更加简洁的语法，直接在项目目录内执行下面的命令：")]),e._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("link")]),e._v(" ~/myModule\n")])])]),n("ul",[n("li",[e._v("在包文件夹中的执行 "),n("code",[e._v("npm link")]),e._v(" 将在全局文件夹 "),n("code",[e._v("{prefix}/lib/node_modules/<package>")]),e._v(" 中创建一个链接到该包的符号链接。")]),e._v(" "),n("li",[e._v("在其他位置，"),n("code",[e._v("npm link package-name")]),e._v(" 将创建从全局安装的 "),n("code",[e._v("package-name")]),e._v(" 到当前文件夹的 "),n("code",[e._v("node_modules")]),e._v(" 的符号链接。")])]),e._v(" "),n("p",[n("strong",[e._v("注意")]),e._v("：链接应该指向包名，而不是该包的目录名。")]),e._v(" "),n("h2",{attrs:{id:"package-json-bin"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#package-json-bin"}},[e._v("#")]),e._v(" package.json bin")]),e._v(" "),n("p",[e._v("在 NPM 中许多包都建有了一个或多个可执行文件，它们希望在安装时被添加到 PATH 中从而能够执行，为此 NPM 在 "),n("code",[e._v("package.json")]),e._v(" 文件中提供了 "),n("code",[e._v("bin")]),e._v(" 字段，使得这实现起来非常容易。")]),e._v(" "),n("p",[e._v("该字段实际上指定的是命令名到本地文件名的映射。在安装时，NPM 会将文件链接到 "),n("code",[e._v("${prefix}/bin")]),e._v("（对于全局安装）或 "),n("code",[e._v("./node_modules/.bin/")]),e._v("（对于本地安装）目录。")]),e._v(" "),n("p",[e._v("对于单个可执行文件你可以按照下面的格式配置：")]),e._v(" "),n("div",{staticClass:"language-json extra-class"},[n("pre",{pre:!0,attrs:{class:"language-json"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[e._v('"name"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[e._v('"my-program"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[e._v('"bin"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[e._v('"./path/to/program.js"')]),e._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),n("p",[e._v("而对于多个执行文件，则可以写成对象的形式：")]),e._v(" "),n("div",{staticClass:"language-json extra-class"},[n("pre",{pre:!0,attrs:{class:"language-json"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[e._v('"name"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[e._v('"my-module"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),n("span",{pre:!0,attrs:{class:"token property"}},[e._v('"bin"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token property"}},[e._v('"my-program"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[e._v('"./path/to/program.js"')]),e._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),n("p",[e._v("这样在包（'my-module'）局部安装时，将创建从 "),n("code",[e._v("program.js")]),e._v(" 脚本到 "),n("code",[e._v("./node_modules/.bin/my-program")]),e._v(" 的符号链接。")]),e._v(" "),n("p",[e._v("但是我们在本地开发，怎么才能直接执行自定义的命令呢？")]),e._v(" "),n("p",[e._v("其中一种解决方式就是结合上面介绍的 "),n("code",[e._v("npm link")]),e._v(" 命令。在包内执行 "),n("code",[e._v("npm link")]),e._v(" 时，相当于将包安装到了全局，所以除了上面说的功能外，它还会将把包中 "),n("code",[e._v("bin")]),e._v(" 字段申明的内容链接到 "),n("code",[e._v("{prefix}/bin/{name}")]),e._v("，这和我们上面描述的刚好吻合。")]),e._v(" "),n("h2",{attrs:{id:"npx"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#npx"}},[e._v("#")]),e._v(" npx")]),e._v(" "),n("p",[e._v("NPM 从 "),n("code",[e._v("v5.2")]),e._v(" 版开始，增加了 "),n("code",[e._v("npx")]),e._v(" 命令，用来调用项目内部安装的模块。它的原理很简单，就是在运行的时候，会到 "),n("code",[e._v("node_modules/.bin")]),e._v(" 路径和环境变量 $PATH 里面，检查命令是否存在。")]),e._v(" "),n("p",[e._v("使用 "),n("code",[e._v("npx")]),e._v(" 的一大好处就是能够避免全局安装的模块，甚至我们都不需要安装它（保留）。当你使用 "),n("code",[e._v("npx")]),e._v(" 紧跟着一个模块名时，如果本地不存在就会将模块下载到一个临时目录，使用以后再删除掉。")]),e._v(" "),n("p",[e._v("另外，你可以指定 "),n("code",[e._v("--no-install")]),e._v(" 参数，强制使用本地的模块。如果本地不存在该模块，就会报错。与之相反的是 "),n("code",[e._v("--ignore-existing")]),e._v(" 参数。")]),e._v(" "),n("h2",{attrs:{id:"package-json-scripts"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#package-json-scripts"}},[e._v("#")]),e._v(" package.json scripts")]),e._v(" "),n("p",[e._v("在 "),n("code",[e._v("package.json")]),e._v(" 文件中还提供了一个常用且强大的字段 "),n("code",[e._v("scripts")]),e._v("，使用 "),n("code",[e._v("scripts")]),e._v(" 字段可以自定义脚本命令。")]),e._v(" "),n("p",[e._v("NPM 脚本的原理非常简单。每当执行 "),n("code",[e._v("npm run")]),e._v("，就会自动新建一个 Shell，在这个 "),n("code",[e._v("Shell")]),e._v(" 里面执行指定的脚本命令。因此，只要是 "),n("code",[e._v("Shell")]),e._v("（一般是 Bash）可以运行的命令，就可以写在 NPM 脚本里面。")]),e._v(" "),n("p",[e._v("比较特别的是，"),n("code",[e._v("npm run")]),e._v(" 新建的这个 "),n("code",[e._v("Shell")]),e._v("，会将当前目录的 "),n("code",[e._v("node_modules/.bin")]),e._v(" 子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样。")]),e._v(" "),n("p",[e._v("这意味着，当前目录的 "),n("code",[e._v("node_modules/.bin")]),e._v(" 子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。")]),e._v(" "),n("h2",{attrs:{id:"refs"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#refs"}},[e._v("#")]),e._v(" refs")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://docs.npmjs.com/files/package.json",target:"_blank",rel:"noopener noreferrer"}},[e._v("npm-package.json | npm Documentation"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"http://javascript.ruanyifeng.com/nodejs/packagejson.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("package.json 文件 -- JavaScript 标准参考教程（alpha）"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://docs.npmjs.com/cli/link.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("npm-link | npm Documentation"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://javascript.ruanyifeng.com/nodejs/npm.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("npm 模块管理器 -- JavaScript 标准参考教程（alpha）"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("npm scripts 使用指南 - 阮一峰的网络日志"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2019/02/npx.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("npx 使用教程 - 阮一峰的网络日志"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/33928507",target:"_blank",rel:"noopener noreferrer"}},[e._v("package.json 里的一些属性讲解 - 知乎"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://www.cnblogs.com/tzyy/p/5193811.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("npm package.json 属性详解 - 桃子夭夭 - 博客园"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://juejin.im/post/5ab3f77df265da2392364341",target:"_blank",rel:"noopener noreferrer"}},[e._v("2018 年了，你还是只会 npm install 吗？ - 掘金"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"http://c.biancheng.net/cpp/view/2739.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Shell 特殊变量：Shell $0, $#, $*, $@, $?, $$和命令行参数_C 语言中文网"),n("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=s.exports}}]);