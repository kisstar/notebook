(window.webpackJsonp=window.webpackJsonp||[]).push([[150],{501:function(t,a,s){"use strict";s.r(a);var n=s(25),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"requirejs-三"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#requirejs-三"}},[t._v("#")]),t._v(" RequireJS (三)")]),t._v(" "),s("p",[t._v("RequireJS 的基本配置。")]),t._v(" "),s("h2",{attrs:{id:"配置-baseurl"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-baseurl"}},[t._v("#")]),t._v(" 配置 baseUrl")]),t._v(" "),s("p",[t._v("我们知道当我们不使用 "),s("code",[t._v("data-main")]),t._v(" 属性，也不设置 "),s("code",[t._v("baseUrl")]),t._v(" 的值时，这时加载模块的路径（baseUrl）默认是在 "),s("code",[t._v(".html")]),t._v(" 文件所在目录。")]),t._v(" "),s("p",[t._v("当我们使用 "),s("code",[t._v("data-main")]),t._v(" 属性时，加载 JavaScript 文件的根路径就变成了 "),s("code",[t._v("data-main")]),t._v(" 属性所指定 JavaScript 文件所在目录。")]),t._v(" "),s("p",[t._v("这里我们将介绍的是如何手动的配置 "),s("code",[t._v("baseUrl")]),t._v("，我们可以在前面提到的主模块里进行配置。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// main.js")]),t._v("\nrequire"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  baseUrl"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("另外需要提到的是 RequireJS 的加载机制：")]),t._v(" "),s("ul",[s("li",[t._v("RequireJS 使用 "),s("code",[t._v("head.appendChild()")]),t._v(" 将每一个依赖加载为一个 "),s("code",[t._v("script")]),t._v(" 标签。")]),t._v(" "),s("li",[t._v("加载后立即执行。")])]),t._v(" "),s("h2",{attrs:{id:"加载第三方模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#加载第三方模块"}},[t._v("#")]),t._v(" 加载第三方模块")]),t._v(" "),s("p",[t._v("RequireJS 加载的模块，采用 AMD 规范。也就是说，模块必须按照 AMD 的规定来写，也就是使用 "),s("code",[t._v("define()")]),t._v(" 来申明的模块。")]),t._v(" "),s("p",[t._v("但是部分时候需要加载非 AMD 规范的 JavaScript，比如老版本的 jQuery、Bootstrap 以及 "),s("code",[t._v("Modernizr.js")]),t._v("，那么，RequireJS 是否能够加载这些非规范的模块呢？")]),t._v(" "),s("p",[t._v("答案是可以的，不过我们需要对其进行相应的配置，以 "),s("code",[t._v("Modernizr.js")]),t._v(" 为例来认识以下 "),s("code",[t._v("shim")]),t._v("。")]),t._v(" "),s("img",{staticClass:"center",attrs:{height:"350",src:t.$withBase("/images/js/require-shim.png"),alt:"require-shim"}}),t._v(" "),s("p",[t._v("这样配置后，我们就可以在其他模块中引用 Modernizr 模块：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Modernizr'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("Modernizr")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// do something")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("对于像 Bootstrap 这样只有依赖没有输出的我们只需要注明它的依赖。就像下面这样：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// main.js")]),t._v("\nrequirejs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  shim"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    bootstrap"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jquery'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("当然你也可以像下面这么写，不过上面的写法看起来更简洁：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// main.js")]),t._v("\nrequirejs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  shim"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    bootstrap"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      deps"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'jquery'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"配置-map"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-map"}},[t._v("#")]),t._v(" 配置 map")]),t._v(" "),s("p",[t._v("在项目开发的初期我们使用了模块的最新且稳定的版本，然而模块随时可能会更新，当我们需要相应模块最新版本的功能时，却又担心升级后之前项目依赖的低版本会产生问题，这时候就陷入了两难的抉择。")]),t._v(" "),s("p",[t._v("这时候就需要用到 "),s("code",[t._v("map")]),t._v(" 配置，在这里我们以需要不同版本的 jQuery 为例。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// main.js")]),t._v("\nrequirejs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  map"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/login'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      jquery"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./lib/jquery'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/index'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      jquery"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./lib/jquery2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("根据以上的配置虽然 "),s("code",[t._v("app/login")]),t._v(" 和 "),s("code",[t._v("app/index")]),t._v(" 这两个模块都加载了 jQuery，但 "),s("code",[t._v("app/login")]),t._v(" 加载 jQuery 模块时，将加载 "),s("code",[t._v("jquery.js")]),t._v("，而 "),s("code",[t._v("app/index")]),t._v(" 加载 jQuery 模块时，将加载 "),s("code",[t._v("jquery2.js")]),t._v("。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// main.js")]),t._v("\nrequirejs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  map"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      jquery"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./lib/jquery'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'app/index'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      jquery"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./lib/jquery2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("当我们像上面这么配置时，除了加载 "),s("code",[t._v("app/index")]),t._v(" 模块会加载 "),s("code",[t._v("jquery2.js")]),t._v(" 外，其它模块加载 jQuery 模块时，都会去加载 "),s("code",[t._v("jquery.js")]),t._v("。")]),t._v(" "),s("h2",{attrs:{id:"其它常用配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#其它常用配置"}},[t._v("#")]),t._v(" 其它常用配置")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("waitSeconds")]),t._v("：设置加载 JavaScript 的等待时间，默认为 7 秒，超出后将会报错；如果设置为 0，则禁用等待超时。")]),t._v(" "),s("li",[s("strong",[t._v("urlArgs")]),t._v("：加载文件时，在 "),s("code",[t._v("url")]),t._v(" 后面添加额外的 "),s("code",[t._v("query")]),t._v(" 参数。")])]),t._v(" "),s("h2",{attrs:{id:"参考资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[t._v("#")]),t._v(" 参考资料")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"http://www.runoob.com/w3cnote/requirejs-tutorial-1.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("菜鸟教程"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.ibm.com/developerworks/cn/web/1209_shiwei_requirejs/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("IBM"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2012/11/require_js.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("阮一峰的网络日志"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.imooc.com/learn/787",target:"_blank",rel:"noopener noreferrer"}},[t._v("慕课网"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=r.exports}}]);