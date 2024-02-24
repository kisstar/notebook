(window.webpackJsonp=window.webpackJsonp||[]).push([[293],{707:function(a,t,s){"use strict";s.r(t);var e=s(62),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"标签和窗口"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#标签和窗口"}},[a._v("#")]),a._v(" 标签和窗口")]),a._v(" "),s("p",[a._v("包括标签页，窗口等操作。")]),a._v(" "),s("h2",{attrs:{id:"操作标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#操作标签"}},[a._v("#")]),a._v(" 操作标签")]),a._v(" "),s("p",[a._v("创建签页：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 指定的文件若存在则直接打开，否则在保存后将进行新建")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 此外，tabnew 也具有同样的功能")]),a._v("\ntabedit "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),s("p",[a._v("列出当前所有的 Tab：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(":tabs\n")])])]),s("p",[a._v("跳到上一个/下一个/第一个/最后一个 Tab：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 其中 tabnext 可简写为 tabn，tabprevious 可简写为 tabp")]),a._v("\n:tabnext/:tabprevious/:tabfirst/:tablast\n")])])]),s("p",[a._v("将当前页移动到指定页：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 如果不指定页数则指定移动到最后")]),a._v("\n:tabm "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("p",[a._v("关闭标签页：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# n 是一个数字，指定关闭的标签页，默认关闭当前标签页")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# tabclose 可以简写为 tabc")]),a._v("\n:tabclose "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("p",[a._v("关闭其他标签页：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v(":tabo\n")])])]),s("h3",{attrs:{id:"快捷键"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#快捷键"}},[a._v("#")]),a._v(" 快捷键")]),a._v(" "),s("p",[s("code",[a._v("gt")]),a._v(" – 到下一个页")]),a._v(" "),s("p",[s("code",[a._v("gT")]),a._v(" – 到前一个页")]),a._v(" "),s("p",[s("code",[a._v("[n]gt")]),a._v(" – 到指定页，比如：5gt 就是到第 5 页")]),a._v(" "),s("p",[s("em",[a._v("Vim 默认最多只能打开 10 个标签页。你可以用 "),s("code",[a._v("set tabpagemax=15")]),a._v(" 改变这个限制。")])]),a._v(" "),s("h2",{attrs:{id:"操作窗口"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#操作窗口"}},[a._v("#")]),a._v(" 操作窗口")]),a._v(" "),s("p",[a._v("水平打开多个窗口：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" -o "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[a._v("1")]),a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[a._v("2")]),a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# or")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" -o filename*\n")])])]),s("p",[a._v("垂直打开多个窗口：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" -O "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[a._v("1")]),a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[a._v("2")]),a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# or")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" -O filename*\n")])])]),s("p",[a._v("垂直打开多窗口，并且进行比较：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" -d "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[a._v("1")]),a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[a._v("2")]),a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# or")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" -d filename*\n")])])]),s("p",[a._v("横向分割窗口：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("new "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# or")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("split")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# split 可简写为 sp")]),a._v("\n")])])]),s("p",[a._v("纵向分割窗口：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("vnew "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# or")]),a._v("\nvsplit "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# vsplit 可简写为 vsp")]),a._v("\n")])])]),s("h3",{attrs:{id:"窗口管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#窗口管理"}},[a._v("#")]),a._v(" 窗口管理")]),a._v(" "),s("p",[a._v("切换：")]),a._v(" "),s("p",[a._v("连续按下 ctrl+w 两次则可以一次切换窗口。")]),a._v(" "),s("p",[a._v("按下 ctrl+w 后，再通过 j/k/h/l 进行上下左右切换。")]),a._v(" "),s("p",[a._v("纵向调整：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 例如：:res 5，显示行数调整为5行")]),a._v("\n:res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("ize"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" num\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 把当前窗口高度增加 num 行")]),a._v("\n:res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("ize"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("+num\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 把当前窗口高度减少 num 行")]),a._v("\n:res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("ize"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("-num\n")])])]),s("p",[a._v("另外，你还可以直接使用快捷键进行调整：")]),a._v(" "),s("p",[s("code",[a._v("ctrl+w +")]),a._v(": 纵向扩大（行数增加）")]),a._v(" "),s("p",[s("code",[a._v("ctrl+w –")]),a._v(": 纵向缩小（行数减少）")]),a._v(" "),s("p",[a._v("横向调整：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 指定当前窗口为 num 列")]),a._v("\n:vertical res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("ize"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" num\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 把当前窗口增加 num 列")]),a._v("\n:vertical res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("ize"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("+num\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 把当前窗口减少 num 列")]),a._v("\n:vertical res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("ize"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("-num\n")])])]),s("h2",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[a._v("#")]),a._v(" 参考")]),a._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://justcode.ikeepstudying.com/2018/03/linux-vi-vim%E5%A4%9A%E6%A0%87%E7%AD%BE%E5%92%8C%E5%A4%9A%E7%AA%97%E5%8F%A3-tab%E9%A1%B5%E6%B5%8F%E8%A7%88%E7%9B%AE%E5%BD%95-%E5%A4%9Atab%E9%A1%B5%E7%BC%96%E8%BE%91/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Linux vi/vim 多标签和多窗口, Tab 页浏览目录, 多 Tab 页编辑"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=n.exports}}]);