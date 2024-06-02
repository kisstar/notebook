(window.webpackJsonp=window.webpackJsonp||[]).push([[241],{655:function(t,a,s){"use strict";s.r(a);var e=s(62),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"grep"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#grep"}},[t._v("#")]),t._v(" grep")]),t._v(" "),s("p",[t._v("Linux 中的 "),s("code",[t._v("grep")]),t._v(" 命令用于查找文件里符合条件的字符串，它能使用正则表达式搜索文本，并把匹配的行打印出来。")]),t._v(" "),s("p",[s("code",[t._v("grep")]),t._v(" 可用于 Shell 脚本，因为 "),s("code",[t._v("grep")]),t._v(" 通过返回一个状态值来说明搜索的状态，如果模板搜索成功，则返回 0，如果搜索不成功，则返回 1，如果搜索的文件不存在，则返回 2。我们利用这些返回值就可进行一些自动化的文本处理工作。")]),t._v(" "),s("h2",{attrs:{id:"格式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#格式"}},[t._v("#")]),t._v(" 格式")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("option"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" pattern "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("file")]),t._v("\n")])])]),s("h2",{attrs:{id:"常用参数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用参数"}},[t._v("#")]),t._v(" 常用参数")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 显示不包含匹配文本的所有行")]),t._v("\n-v 或 --invert-match\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 当指定要查找的是目录而非文件时，必须使用这项参数，否则 grep 指令将回报信息并停止动作")]),t._v("\n-d "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("动作"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 或 --directories"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("动作"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# 以递归的方式查找符合条件的文件，此参数的效果和指定 "-d recurse" 参数相同')]),t._v("\n-r 或 --recursive\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 计算符合样式的列数")]),t._v("\n-c 或 --count\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 在行首显示行号")]),t._v("\n-n\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 忽略字符大小写的差别")]),t._v("\n-i 或 --ignore-case\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 指定规则文件，其内容含有一个或多个规则样式，让 grep 查找符合规则条件的文件内容，格式为每行一个规则样式")]),t._v("\n-f"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("规则文件"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" 或 --file"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("规则文件"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 只显示全字符合的列")]),t._v("\n-w 或 --word-regexp\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 只显示全列符合的列")]),t._v("\n-x --line-regexp\n")])])]),s("h2",{attrs:{id:"规则表达式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#规则表达式"}},[t._v("#")]),t._v(" 规则表达式")]),t._v(" "),s("p",[t._v("和常用正则表达式的使用区别不大，但需要注意在指定个数什么的时候需要使用反斜杠。")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("符号")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[s("code",[t._v("\\<")])]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("锚定单词的开始，如: "),s("code",[t._v("\\<grep'")]),t._v(" 匹配包含以 grep 开头的单词的行")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[s("code",[t._v("\\>")])]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("锚定单词的结束，如 "),s("code",[t._v("grep\\>")]),t._v(" 匹配包含以 grep 结尾的单词的行")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[s("code",[t._v("x\\{m\\}")])]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("重复字符 x，m 次，如："),s("code",[t._v("0\\{5\\}")]),t._v(" 匹配包含 5 个 0 的行")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[s("code",[t._v("x\\{m,\\}")])]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("重复字符 x，至少 m 次，如："),s("code",[t._v("o\\{5,\\}")]),t._v(" 匹配至少有 5 个 o 的行")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[s("code",[t._v("x\\{m,n\\}")])]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("重复字符 x，至少 m 次，不多于 n 次，如："),s("code",[t._v("o\\{5,10\\}")]),t._v(" 匹配 5-10 个 o 的行")])])])]),t._v(" "),s("h2",{attrs:{id:"案列"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#案列"}},[t._v("#")]),t._v(" 案列")]),t._v(" "),s("p",[t._v("在当前目录中，查找文件名以“file”结尾且其内容中包含“test”字符串的文件，并打印出该字符串的行：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("test")]),t._v(" *file\n")])])]),s("p",[t._v("从文件中读取关键词进行搜索：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cat")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("file")]),t._v("\na\nb\nc\n\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cat")]),t._v(" rule.txt\na\nb\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -f rule.txt "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("file")]),t._v("\na\nb\n")])])]),s("p",[t._v("搜索包含 2 个以上 “a” 的行：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cat")]),t._v(" test.txt\na\naaa\naa\n\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a\\{2\\}'")]),t._v(" test.txt\naaa\naa\n")])])]),s("h2",{attrs:{id:"其它"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#其它"}},[t._v("#")]),t._v(" 其它")]),t._v(" "),s("p",[t._v("直接搜索以 “-” 符号开头的匹配模式时，"),s("code",[t._v("grep")]),t._v(" 命令会试图把其当作自己的选项参数来解析，此时使用借助 "),s("code",[t._v("-e")]),t._v(" 选项：")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" -e "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'-a'")]),t._v(" test.txt\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);