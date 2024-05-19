(window.webpackJsonp=window.webpackJsonp||[]).push([[268],{680:function(a,s,t){"use strict";t.r(s);var e=t(62),n=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"尝新"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#尝新"}},[a._v("#")]),a._v(" 尝新")]),a._v(" "),t("p",[t("code",[a._v("npm")]),a._v(" 是 JavaScript 世界的包管理工具，并且是 "),t("code",[a._v("Node.js")]),a._v(" 平台的默认包管理工具。通过 "),t("code",[a._v("npm")]),a._v(" 可以安装、共享、分发代码,管理项目依赖关系。")]),a._v(" "),t("h2",{attrs:{id:"版本信息"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#版本信息"}},[a._v("#")]),a._v(" 版本信息")]),a._v(" "),t("p",[a._v("查看当前 "),t("code",[a._v("npm")]),a._v(" 的版本信息，也可以用来检测是否安装成功。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" -v\n")])])]),t("h2",{attrs:{id:"使用淘宝镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用淘宝镜像"}},[a._v("#")]),a._v(" 使用淘宝镜像")]),a._v(" "),t("p",[a._v("国内直接使用 "),t("code",[a._v("npm")]),a._v(" 的官方镜像是非常慢的，这里推荐使用淘宝 NPM 镜像。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" -g cnpm --registry"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("https://registry.npm.taobao.org\n")])])]),t("p",[a._v("往后使用 "),t("code",[a._v("cnpm")]),a._v(" 代替 "),t("code",[a._v("npm")]),a._v("，体验飞一般的速度，或者你也可以使用 "),t("a",{attrs:{href:"https://github.com/Pana/nrm",target:"_blank",rel:"noopener noreferrer"}},[a._v("nrm"),t("OutboundLink")],1),a._v("。")]),a._v(" "),t("h2",{attrs:{id:"初始化包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#初始化包"}},[a._v("#")]),a._v(" 初始化包")]),a._v(" "),t("p",[t("code",[a._v("npm init")]),a._v(" 用来初始化生成一个新的 "),t("code",[a._v("package.json")]),a._v(" 文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，可以一路回车。")]),a._v(" "),t("p",[a._v("如果使用了 "),t("code",[a._v("-f")]),a._v("（代表 force）、-y（代表 yes），则跳过提问阶段，直接生成一个新的 "),t("code",[a._v("package.json")]),a._v(" 文件，后续你也可以随时直接更改该文件。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" init -y\n")])])]),t("h2",{attrs:{id:"打开包主页"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#打开包主页"}},[a._v("#")]),a._v(" 打开包主页")]),a._v(" "),t("p",[a._v("执行 "),t("code",[a._v("home")]),a._v(" 命令会打开 "),t("code",[a._v("<packageName>")]),a._v(" 的主页。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" home "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("packageName"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("p",[a._v("例如，如果指定 "),t("code",[a._v("<packageName>")]),a._v(" 为 "),t("code",[a._v("lodash")]),a._v("，那么就就会打开 "),t("code",[a._v("Lodash")]),a._v(" 官网。没有安装（全局/某个项目） "),t("code",[a._v("package")]),a._v(" 不影响该命令的使用。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" home lodash\n")])])]),t("h2",{attrs:{id:"打开包仓库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#打开包仓库"}},[a._v("#")]),a._v(" 打开包仓库")]),a._v(" "),t("p",[a._v("类似上面的 "),t("code",[a._v("home")]),a._v(" 命令， "),t("code",[a._v("repo")]),a._v(" 命令会打开 "),t("code",[a._v("<packageName>")]),a._v(" 的 "),t("code",[a._v("Github")]),a._v(" 仓库。同样，不需要安装对应的 "),t("code",[a._v("package")]),a._v(" 就能使用。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 如打开 Express 的官方仓库地址。")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" repo express\n")])])]),t("h2",{attrs:{id:"查看包信息"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查看包信息"}},[a._v("#")]),a._v(" 查看包信息")]),a._v(" "),t("p",[t("code",[a._v("npm info")]),a._v(" 命令可以查看每个模块的具体信息。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" info "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("packageName"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("p",[a._v("比如，查看 "),t("code",[a._v("lodash")]),a._v(" 模块的信息。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" info lodash\n")])])]),t("p",[a._v("你也可以直接获取具体想要的信息，比如：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" info lodash "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("homepage "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" version "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" description"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("h2",{attrs:{id:"查找包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查找包"}},[a._v("#")]),a._v(" 查找包")]),a._v(" "),t("p",[t("code",[a._v("npm search")]),a._v(" 命令用于搜索 "),t("code",[a._v("npm")]),a._v(" 仓库，它后面可以跟字符串，也可以跟正则表达式。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" search "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("Reg "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" String"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("h2",{attrs:{id:"安装包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装包"}},[a._v("#")]),a._v(" 安装包")]),a._v(" "),t("ul",[t("li",[a._v("安装的方式通常分为全局安装和局部安装，比如现在需要安装 "),t("code",[a._v("lodash")]),a._v("：")])]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 不加任何参数会根据项目下的 package.json 文件中定义的依赖进行安装")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 局部安装")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" lodash\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 全局安装")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" -global lodash\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" intall -g lodah "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 使用 -global 简写模式 -g")]),a._v("\n")])])]),t("ul",[t("li",[a._v("除了指定包名外，还可以直接输入 "),t("code",[a._v("Github")]),a._v(" 代码库地址。")])]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" https://github.com/lodash/lodash\n")])])]),t("p",[a._v("安装之前，"),t("code",[a._v("npm install")]),a._v(" 会先检查，"),t("code",[a._v("node_modules")]),a._v(" 目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。")]),a._v(" "),t("ul",[t("li",[t("p",[a._v("如果你希望，一个模块不管是否安装过，"),t("code",[a._v("npm")]),a._v(" 都要强制重新安装，可以使用 "),t("code",[a._v("-f")]),a._v(" 或 "),t("code",[a._v("--force")]),a._v(" 参数。")])]),a._v(" "),t("li",[t("p",[a._v("另外，使用 "),t("code",[a._v("npm install")]),a._v(" 总会安装最新的版本，如果你需呀安装特定的版本则需要在后面进行指定。")])])]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("packageName"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("@"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("version"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("packageName"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("@"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("tag"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("ul",[t("li",[a._v("对于一个项目所需要的依赖，一般分为开发环境的依赖和生产环境的依赖。在安装模块时，可以根据依赖所处分类而写入 "),t("code",[a._v("package.json")]),a._v(" 文件中的不同字段中。")])]),a._v(" "),t("p",[a._v("当我们在安装模块时使用 "),t("code",[a._v("--save")]),a._v(" 参数时，将模块安装到项目目录下，并在 "),t("code",[a._v("package.json")]),a._v(" 文件的 "),t("code",[a._v("dependencies")]),a._v(" 字段写入依赖，而使用 "),t("code",[a._v("--save-dev")]),a._v(" 的意思是将模块安装到项目目录下，并在 "),t("code",[a._v("package.json")]),a._v(" 文件的 "),t("code",[a._v("devDependencies")]),a._v(" 字段写入依赖，运行 "),t("code",[a._v("npm install --production")]),a._v(" 或者注明 NODE_ENV 变量值为 "),t("code",[a._v("production")]),a._v(" 时，不会自动下载模块到 "),t("code",[a._v("node_modules")]),a._v(" 目录中。")]),a._v(" "),t("p",[a._v("简单而言，"),t("code",[a._v("devDependencies")]),a._v(" 节点下的模块是我们在开发时需要用的，比如项目中压缩"),t("code",[a._v("CSS")]),a._v("、JavaScript 的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用 "),t("code",[a._v("--save-dev")]),a._v(" 的形式安装。像 "),t("code",[a._v("express")]),a._v(" 这些模块是项目运行必备的，应该安装在 "),t("code",[a._v("dependencies")]),a._v(" 节点下，所以我们应该使用 "),t("code",[a._v("--save")]),a._v(" 的形式安装。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" webpack --save-dev\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" express --save\n")])])]),t("h2",{attrs:{id:"升级已安装的包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#升级已安装的包"}},[a._v("#")]),a._v(" 升级已安装的包")]),a._v(" "),t("p",[a._v("我们可以使用以下命令更新模块：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 升级到最新版本")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" update lodash\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 升级到指定版本")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" update lodash@3.10.1\n")])])]),t("h2",{attrs:{id:"查看已安装的包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查看已安装的包"}},[a._v("#")]),a._v(" 查看已安装的包")]),a._v(" "),t("p",[t("code",[a._v("npm list")]),a._v(" 命令以树形结构列出当前项目安装的所有模块，以及它们依赖的模块。如果加上 "),t("code",[a._v("global")]),a._v(" 参数，会列出全局安装的模块，通常这样直接列出的树形结构比较庞大，我们可以通过 "),t("code",[a._v("--depth")]),a._v(" 指定显示的层级。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看所有已安装")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" list\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看某个已安装的模块")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" list "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("packageName"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看所有全局安装")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" list -g\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 指定层级")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" list -g --depth"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("\n")])])]),t("h2",{attrs:{id:"移除包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#移除包"}},[a._v("#")]),a._v(" 移除包")]),a._v(" "),t("p",[a._v("我们可以使用以下命令来卸载已安装的模块。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# npm uninstall 使用 npm install 相同的 flag")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" uninstall lodash\n")])])]),t("h2",{attrs:{id:"检查包的过时依赖"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#检查包的过时依赖"}},[a._v("#")]),a._v(" 检查包的过时依赖")]),a._v(" "),t("p",[a._v("在项目中，运行 "),t("code",[a._v("outdated")]),a._v(" 命令会通过 "),t("code",[a._v("npm registry")]),a._v(" 检查是否有过时的 "),t("code",[a._v("package")]),a._v("，并在命令行中打印出当前版本、所需版本以及最新版本。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" outdated\n")])])]),t("h2",{attrs:{id:"检查-package-json-中未声明的包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#检查-package-json-中未声明的包"}},[a._v("#")]),a._v(" 检查 package.json 中未声明的包")]),a._v(" "),t("p",[a._v("运行 "),t("code",[a._v("prune")]),a._v(" 命令，"),t("code",[a._v("npm CLI")]),a._v(" 会读取 "),t("code",[a._v("package.json")]),a._v("，并将结果与项目的 "),t("code",[a._v("/node_modules")]),a._v(" 目录进行对比，并打印出不在 "),t("code",[a._v("package.json")]),a._v(" 之列的模块列表。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" prune\n")])])]),t("p",[t("code",[a._v("npm prune")]),a._v(" 命令接着会拿出这些 "),t("code",[a._v("package")]),a._v("，并移除那些没有手动加到 "),t("code",[a._v("package.json")]),a._v(" 中或没有使用 "),t("code",[a._v("--save")]),a._v(" 标志安装的 "),t("code",[a._v("package")]),a._v("。")]),a._v(" "),t("h2",{attrs:{id:"锁定依赖版本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#锁定依赖版本"}},[a._v("#")]),a._v(" 锁定依赖版本")]),a._v(" "),t("p",[a._v("在项目中使用 "),t("code",[a._v("shrinkwrap")]),a._v(" 命令，会生成一个 "),t("code",[a._v("npm-shrinkwrap.json")]),a._v(" 文件，将项目依赖锁定在当前在 "),t("code",[a._v("node_modules")]),a._v(" 中使用的特定版本。")]),a._v(" "),t("p",[a._v("运行 "),t("code",[a._v("npm install")]),a._v(" 时，若发现存在 "),t("code",[a._v("npm-shrinkwrap.json")]),a._v("，则会覆盖列出的依赖以及 "),t("code",[a._v("package.json")]),a._v(" 中的任何语义版本范围。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" shrinkwrap\n")])])]),t("p",[a._v("它的功能就像是 "),t("code",[a._v("yarn.lock")]),a._v(" 一样，如果你在使用 "),t("code",[a._v("yarn")]),a._v("，那么它是默认就会生成的。")]),a._v(" "),t("h2",{attrs:{id:"运行脚本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#运行脚本"}},[a._v("#")]),a._v(" 运行脚本")]),a._v(" "),t("p",[t("code",[a._v("npm")]),a._v(" 不仅可以用于模块管理，还可以用于执行脚本。"),t("code",[a._v("package.json")]),a._v(" 文件有一个 "),t("code",[a._v("scripts")]),a._v(" 字段，可以用于指定脚本命令，供 "),t("code",[a._v("npm")]),a._v(" 直接调用。")]),a._v(" "),t("div",{staticClass:"language-json extra-class"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[a._v('"test"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"echo \\"Error: no test specified\\" && exit 1"')]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("p",[t("code",[a._v("npm run")]),a._v(" 是 "),t("code",[a._v("npm run-script")]),a._v(" 的缩写，一般都使用前者，但是后者可以更好的反应这个命令的本质。当不加任何参数时，会列出 "),t("code",[a._v("package.json")]),a._v(" 里面所有可以执行的脚本命令。")]),a._v(" "),t("p",[t("code",[a._v("npm")]),a._v(" 内置了两个命令简写， "),t("code",[a._v("npm test")]),a._v(" 等同于执行 "),t("code",[a._v("npm run test")]),a._v("。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v("\n")])])]),t("p",[a._v("并且 "),t("code",[a._v("npm run")]),a._v(" 为每条命令提供了 "),t("code",[a._v("pre-")]),a._v(" 和 "),t("code",[a._v("post-")]),a._v(" 两个钩子（hook）。以 "),t("code",[a._v("npm run deploy")]),a._v(" 为例，执行这条命令之前， "),t("code",[a._v("npm")]),a._v(" 会先查看有没有定义 "),t("code",[a._v("predeploy")]),a._v(" 和 "),t("code",[a._v("postdeploy")]),a._v(" 两个钩子，如果有的话，就会先执行 "),t("code",[a._v("npm run predeploy")]),a._v("，然后执行 "),t("code",[a._v("npm run deploy")]),a._v("，最后执行 "),t("code",[a._v("npm run postdeploy")]),a._v("。")]),a._v(" "),t("div",{staticClass:"language-json extra-class"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[a._v('"scripts"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[a._v('"predeploy"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"gitbook build"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[a._v('"deploy"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"gh-pages --dist _book  --dest /  --branch gh-pages --dotfiles=true --add=true"')]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("h2",{attrs:{id:"what-s-npx"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-s-npx"}},[a._v("#")]),a._v(" What's Npx")]),a._v(" "),t("p",[t("code",[a._v("npx")]),a._v(" 想要解决的主要问题，就是调用项目内部安装的模块。比如，如果我们需要调用项目下的 "),t("code",[a._v("lessc")]),a._v(" 命令，必须像下面这样：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("node-modules/.bin/lessc --version\n")])])]),t("p",[a._v("而通过 "),t("code",[a._v("npx")]),a._v(" 你可以不必全局安装 "),t("code",[a._v("less")]),a._v(" 就可以直接快速使用：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("npx lessc -v\n")])])]),t("p",[a._v("甚至，我们都不需要安装 "),t("code",[a._v("less")]),a._v("，它的安装也比较简单。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" -g npx\n")])])]),t("p",[a._v("你可以点击 "),t("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2019/02/npx.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("npx 使用教程"),t("OutboundLink")],1),a._v(" 查看更多信息。")]),a._v(" "),t("h2",{attrs:{id:"参考资料"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[a._v("#")]),a._v(" 参考资料")]),a._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://www.npmjs.com/",target:"_blank",rel:"noopener noreferrer"}},[a._v("npm"),t("OutboundLink")],1)]),a._v(" "),t("li",[t("a",{attrs:{href:"https://www.zcfy.cc/article/1206",target:"_blank",rel:"noopener noreferrer"}},[a._v("让人倾倒的 11 个 npm trick"),t("OutboundLink")],1)]),a._v(" "),t("li",[t("a",{attrs:{href:"https://segmentfault.com/p/1210000009653830/read",target:"_blank",rel:"noopener noreferrer"}},[a._v("NPM 学习笔记整理"),t("OutboundLink")],1)]),a._v(" "),t("li",[t("a",{attrs:{href:"https://www.limitcode.com/detail/59a15b1a69e95702e0780249.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("NPM install -save 和 -save-dev 傻傻分不清"),t("OutboundLink")],1)]),a._v(" "),t("li",[t("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2019/02/npx.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("npx 使用教程"),t("OutboundLink")],1)]),a._v(" "),t("li",[t("a",{attrs:{href:"https://nodesource.com/blog/eleven-npm-tricks-that-will-knock-your-wombat-socks-off/",target:"_blank",rel:"noopener noreferrer"}},[a._v("11 Simple npm Tricks That Will Knock Your Wombat Socks Off"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=n.exports}}]);