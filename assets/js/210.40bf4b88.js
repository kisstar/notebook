(window.webpackJsonp=window.webpackJsonp||[]).push([[210],{625:function(a,s,t){"use strict";t.r(s);var e=t(62),n=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"目录处理命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#目录处理命令"}},[a._v("#")]),a._v(" 目录处理命令")]),a._v(" "),t("p",[a._v("囊括目录的增删改查操作命令。")]),a._v(" "),t("h2",{attrs:{id:"命令格式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#命令格式"}},[a._v("#")]),a._v(" 命令格式")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("命令"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("包名或路径"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("选项"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("h2",{attrs:{id:"常用选项介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用选项介绍"}},[a._v("#")]),a._v(" 常用选项介绍")]),a._v(" "),t("ul",[t("li",[a._v("创建目录")])]),a._v(" "),t("p",[t("code",[a._v("mkdir")]),a._v("(单词原意：make directions)，该命令用于创建目录，后面直接跟目录的名称，当我们需要递归创建目录时必须加上 "),t("code",[a._v("-p")]),a._v(" 参数，使用形式即：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("mkdir")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("-p"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("目录"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("ul",[t("li",[a._v("切换目录")])]),a._v(" "),t("p",[t("code",[a._v("cd")]),a._v("(单词原意：change directory)，该命令用于切换目录，后面跟目录即可，这里需要介绍的是一些简化操作：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 进入当前用户的家目录：")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" ~\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 进入上次目录：")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" -\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 进入上一级目录：")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("\n")])])]),t("ul",[t("li",[a._v("输出当前目录")])]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("pwd")]),a._v("\n")])])]),t("ul",[t("li",[a._v("删除空目录")])]),a._v(" "),t("p",[t("code",[a._v("rmdir")]),a._v("(单词原意：remove empty directory)，该命令用于删除空目录，用于删除非空目录时会报错，其使用方式为：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("rmdir")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("目录"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("ul",[t("li",[a._v("删除文件或目录")])]),a._v(" "),t("p",[t("code",[a._v("rm")]),a._v("(单词原意：remove)，该命令用于删除文件或目录，当我们需要删除目录时需要加上 "),t("code",[a._v("-r")]),a._v(" 参数，另外该命令每次执行时会提示是否确认删除，要取消该提示需要需要 "),t("code",[a._v("-f")]),a._v(" 参数，所以我们在使用这条命令时，通常的使用形式为：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" -rf "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("目录"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("ul",[t("li",[a._v("复制目录")])]),a._v(" "),t("p",[t("code",[a._v("cp")]),a._v("(单词原意：copy)，该命令用于复制文件或目录，它支持以下参数：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# -r 复制目录。")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# -p 同时复制文件的属性。")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# -d 若文件是链接文件，则复制链接属性。")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# -a 其效果是以上参数的合集，相当于 -pdr。")]),a._v("\n")])])]),t("ul",[t("li",[a._v("移动/剪切/改名命令 "),t("code",[a._v("mv")]),a._v("，命令的原意为 "),t("code",[a._v("move")]),a._v("，其使用形式为")])]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("mv")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("源文件或源目录"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("目标目录"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);