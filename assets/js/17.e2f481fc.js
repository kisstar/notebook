(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{431:function(t,a,n){"use strict";n.r(a);var s=n(62),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"_138-随机链表的复制"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_138-随机链表的复制"}},[t._v("#")]),t._v(" 138. 随机链表的复制")]),t._v(" "),n("h2",{attrs:{id:"解题思路"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#解题思路"}},[t._v("#")]),t._v(" 解题思路")]),t._v(" "),n("ul",[n("li",[t._v("遍历整个链表，将每个节点复制一份，同时以旧节点为键，新节点为值存入 map 中")]),t._v(" "),n("li",[t._v("判断当前节点的 random 节点是否存在 map，存在则直接赋值取出来进行更新")]),t._v(" "),n("li",[t._v("如果当前节点的 random 不存在 map，则以对应的 random 节点为键，当前节点为值存入 map，因为可能存在多个节点指向同一个 random 节点，所以用 set 存储")]),t._v(" "),n("li",[t._v("在遍历过程中，同时检查当前节点是否存在被指向的记录，存在则更新 map 中记录的节点，让其 random 指向当前节点复制后的节点")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("copyRandomList")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("head")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" weakMap "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WeakMap")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" newMap "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WeakMap")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("node"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" current")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("node"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("weakMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("has")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      weakMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      weakMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Set")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("changePointer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" target")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("weakMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("has")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      weakMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("node")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        node"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("random "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" target\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      weakMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("delete")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("run")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("head")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("head"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" head\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" newHead "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" prev "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" newHead\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" current "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" head\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      prev"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("current "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      newMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prev"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理被复制过的")]),t._v("\n\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("has")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("random"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        prev"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("random "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" newMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("random"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("random"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prev"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理节点还没有复制的")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n      "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("changePointer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" prev"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 配合 add() 方法处理没复制过的")]),t._v("\n      prev "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" prev"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next\n      current "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" newHead"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("next\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("run")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("head"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("更多解题思路可以参考 138 题的"),n("a",{attrs:{href:"https://leetcode.cn/problems/copy-list-with-random-pointer/solutions/889166/fu-zhi-dai-sui-ji-zhi-zhen-de-lian-biao-rblsf/",target:"_blank",rel:"noopener noreferrer"}},[t._v("解题报告"),n("OutboundLink")],1),t._v("。")]),t._v(" "),n("h2",{attrs:{id:"参考"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),n("p",[t._v("-"),n("a",{attrs:{href:"https://leetcode.cn/problems/copy-list-with-random-pointer/description/",target:"_blank",rel:"noopener noreferrer"}},[t._v("138. 随机链表的复制 - 力扣（LeetCode）"),n("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);