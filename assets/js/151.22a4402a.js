(window.webpackJsonp=window.webpackJsonp||[]).push([[151],{502:function(s,a,t){"use strict";t.r(a);var n=t(25),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"xargs"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#xargs"}},[s._v("#")]),s._v(" xargs")]),s._v(" "),t("p",[t("code",[s._v("xargs")]),s._v(" 可以将 "),t("code",[s._v("stdin")]),s._v(" 中以空格或换行符进行分隔的数据，形成以空格分隔的参数（arguments），传递给其他命令。")]),s._v(" "),t("p",[s._v("由于是以空格作为分隔符，所以有一些文件名或者其他意义的字符串内含有空格的时候，"),t("code",[s._v("xargs")]),s._v(" 可能会误判。")]),s._v(" "),t("h2",{attrs:{id:"常用选项"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用选项"}},[s._v("#")]),s._v(" 常用选项")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("-a, --arg-file"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("FILE\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 从指定的文件 FILE 中读取输入内容")]),s._v("\n-d, --delimiter"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("DEL\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 指定 xargs 处理输入内容时的分隔符，默认是按空格和换行符作为分隔符，输出 arguments 时按空格分隔")]),s._v("\n-E EOF_STR\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 遇到 EOF_STR 时表示输入的结束")]),s._v("\n-I REPLACE_STR\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将 xargs 输出的每一项参数单独赋值给后面的命令，参数需要用指定的替代字符串 REPLACE_STR 代替")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# REPLACE_STR 可以使用 {} $ @ 等符号，其主要作用是当 xargs command 后有多个参数时，调整参数位置")]),s._v("\n")])])]),t("h2",{attrs:{id:"案例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#案例"}},[s._v("#")]),s._v(" 案例")]),s._v(" "),t("p",[s._v("将 "),t("code",[s._v("shell")]),s._v(" 的特殊字符反引号还原成一般字符：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'`0123`4 56789'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" -t "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("0123"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("56789")]),s._v("\n")])])]),t("p",[s._v("从指定的文件中读取输入内容：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" test.txt\na\nb\nc\n\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" -a test.txt\na b c\n")])])]),t("p",[s._v("以指定字符分隔输入的内容（"),t("em",[s._v("分隔符必须是单个字符或转义序列")]),s._v("）：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" a,b,c "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v("\na b c\n")])])]),t("p",[s._v("设置 "),t("code",[s._v("xargs")]),s._v(" 读入参数时的结束标识（"),t("em",[s._v("结束标志必须要是单独的字段，即以空格或者换行符前后分隔的字段")]),s._v("），以逗号结束：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" 01234 , "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("56789")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" -E "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('","')]),s._v("\n01234\n")])])]),t("p",[s._v("备份以 "),t("code",[s._v("txt")]),s._v(" 为后缀的文件：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v(" -name "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*.txt"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("xargs")]),s._v(" -I "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" /tmp/"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(".bak\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);