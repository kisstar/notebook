(window.webpackJsonp=window.webpackJsonp||[]).push([[143],{399:function(a,s,t){"use strict";t.r(s);var e=t(25),n=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"bat-基础"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#bat-基础"}},[a._v("#")]),a._v(" Bat 基础")]),a._v(" "),t("p",[a._v("批处理文件是无格式的文本文件，它包含一条或多条命令。它的文件扩展名为 "),t("code",[a._v(".bat")]),a._v(" 或 "),t("code",[a._v(".cmd")]),a._v("。")]),a._v(" "),t("h2",{attrs:{id:"cd-和-dp0-的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cd-和-dp0-的区别"}},[a._v("#")]),a._v(" %cd% 和 %~dp0 的区别")]),a._v(" "),t("p",[t("code",[a._v("%cd%")]),a._v("：脚本执行的当前目录（全路径）。 "),t("code",[a._v("%~dp0%")]),a._v("：脚本文件所在的目录（全路径），并且带结尾的 "),t("code",[a._v("\\")]),a._v("。")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("@echo off\n\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("set")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("path_cd")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("%cd%\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("set")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("path_dp0")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("%~dp0\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" Value of cd: %path_cd%\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" Value of dp0: %path_dp0%\npause\n")])])]),t("h2",{attrs:{id:"setlocal"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#setlocal"}},[a._v("#")]),a._v(" SETLOCAL")]),a._v(" "),t("p",[a._v("在执行 SETLOCAL 之后所做的环境改动只限于批处理文件。")]),a._v(" "),t("p",[a._v("要还原原先的设置，必须执行 ENDLOCAL。")]),a._v(" "),t("p",[a._v("达到批处理文件结尾时，对于该批处理文件的每个尚未执行的 SETLOCAL 命令，都会有一个隐含的 ENDLOCAL 被执行。")]),a._v(" "),t("h2",{attrs:{id:"replace"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#replace"}},[a._v("#")]),a._v(" replace")]),a._v(" "),t("p",[a._v("替换的命令格式为："),t("code",[a._v("%variable:oldStr=newStr%")]),a._v("，及匹配变量 "),t("code",[a._v("varibale")]),a._v(" 中的 "),t("code",[a._v("oldstr")]),a._v(" 变替换为 "),t("code",[a._v("newStr")]),a._v(" 后输出。")]),a._v(" "),t("p",[a._v("例如在 NPM 自动生成的模块命令行脚本中有下面一行命令：")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 将 PATHEXT 当中的 ;.JS; 替换为 ;，避免搜索 JavaScript 文件")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# https://stackoverflow.com/questions/28602962/why-to-exclude-js-from-pathext-for-global-node-js-commands-on-windows")]),a._v("\n@SET "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("PATHEXT")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("%PATHEXT:"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(".JS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("%\n")])])]),t("h2",{attrs:{id:"ubstring"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ubstring"}},[a._v("#")]),a._v(" ubstring")]),a._v(" "),t("p",[a._v("提取子串 "),t("code",[a._v("%variable:~m[,n]%")]),a._v("，其中 "),t("code",[a._v("m")]),a._v(" 是跳过的字符长度，"),t("code",[a._v("n")]),a._v(" 是保留的字符长度（可省略），并且两者都可以是负数，表示从后往前数。")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("@echo off\n\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("set")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("str")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("abcdefg\n\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" %str:~1,2%\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("bc")]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" %str:~-1%\ng\n")])])]),t("h2",{attrs:{id:"command-line-arguments"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#command-line-arguments"}},[a._v("#")]),a._v(" command line arguments")]),a._v(" "),t("p",[t("code",[a._v("%n")]),a._v(": 第 "),t("code",[a._v("n")]),a._v(" 个参数，"),t("code",[a._v("n")]),a._v(" 从 1 到 9。")]),a._v(" "),t("p",[t("code",[a._v("%*")]),a._v(": 所有的参数（最多 255 个）。")])])}),[],!1,null,null,null);s.default=n.exports}}]);