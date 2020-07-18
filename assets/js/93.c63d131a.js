(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{381:function(t,a,e){"use strict";e.r(a);var s=e(25),v=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"用户和用户组管理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#用户和用户组管理"}},[t._v("#")]),t._v(" 用户和用户组管理")]),t._v(" "),e("p",[e("code",[t._v("Linux")]),t._v(" 系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。")]),t._v(" "),e("p",[t._v("用户的账号一方面可以帮助系统管理员对使用系统的用户进行跟踪，并控制他们对系统资源的访问；另一方面也可以帮助用户组织文件，并为用户提供安全性保护。")]),t._v(" "),e("h2",{attrs:{id:"用户"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#用户"}},[t._v("#")]),t._v(" 用户")]),t._v(" "),e("p",[t._v("每个用户账号都拥有一个惟一的用户名和各自的口令。")]),t._v(" "),e("p",[t._v("用户在登录时键入正确的用户名和口令后，就能够进入系统和自己的主目录。")]),t._v(" "),e("p",[t._v("当前系统中所有用户的信息都存储在 "),e("code",[t._v("/etc/passwd")]),t._v(" 文件中。")]),t._v(" "),e("p",[t._v("该文件中的每一行的内容都包含七列，分别以冒号进行隔开。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("root:x:0:0:root:/root:/bin/bash\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 用户名 : 用户密码占位符 : 用户编号 : 用户组编号 : 用户注释信息 : 用户主目录 : Shell 类型")]),t._v("\n")])])]),e("p",[t._v("当前系统中所有用户的密码信息都被存储在 "),e("code",[t._v("/etc/shadow")]),t._v(" 文件中。")]),t._v(" "),e("p",[t._v("其中的内容与用户信息文件的内容行行对应，同样每行七列，每列以冒号隔开。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("root::::::::\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 账户名称 : 加密后的密码 : 最近改动密码的日期 : 密码不可被变更的天数 : 密码需要重新变更的天数 : 密码过期预警天数 : 密码过期的宽恕时间 : 账号失效日期 : 保留的")]),t._v("\n")])])]),e("h3",{attrs:{id:"useradd"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#useradd"}},[t._v("#")]),t._v(" USERADD")]),t._v(" "),e("p",[e("code",[t._v("useradd")]),t._v(" 命令用于 "),e("code",[t._v("Linux")]),t._v(" 中创建的新的系统用户。")]),t._v(" "),e("h4",{attrs:{id:"语法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语法"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("useradd")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("选项"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("要创建的用户名"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("h4",{attrs:{id:"常用选项"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用选项"}},[t._v("#")]),t._v(" 常用选项")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-c comment")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("指定一段注释性描述")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-d 目录")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("指定用户主目录，如果此目录不存在，则同时使用 "),e("code",[t._v("-m")]),t._v(" 选项，可以创建主目录")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-g 用户组")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("指定用户所属的用户组")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-G 用户组，用户组")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("指定用户所属的附加组")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-s Shell 文件")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("指定用户的登录 Shell")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-u 用户号")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("指定用户的用户号，如果同时有 "),e("code",[t._v("-o")]),t._v(" 选项，则可以重复使用其他用户的标识号")])])])]),t._v(" "),e("h4",{attrs:{id:"实例"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实例"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),e("p",[t._v("新建了一个用户 "),e("code",[t._v("anani")]),t._v("，该用户的登录 "),e("code",[t._v("Shell")]),t._v(" 是 "),e("code",[t._v("/bin/bash")]),t._v("，它属于 "),e("code",[t._v("group")]),t._v(" 用户组，同时又属于 "),e("code",[t._v("adm")]),t._v(" 和 "),e("code",[t._v("root")]),t._v(" 用户组，其中 "),e("code",[t._v("group")]),t._v(" 用户组是其主组。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("useradd")]),t._v(" -s /bin/bash -g group -G adm,root anani\n")])])]),e("h3",{attrs:{id:"userdel"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#userdel"}},[t._v("#")]),t._v(" USERDEL")]),t._v(" "),e("p",[t._v("如果一个用户的账号不再使用，可以从系统中删除。删除用户账号就是要将 "),e("code",[t._v("/etc/passwd")]),t._v(" 等系统文件中的该用户记录删除，必要时还删除用户的主目录。")]),t._v(" "),e("p",[e("code",[t._v("userdel")]),t._v(" 可删除用户帐号与相关的文件。若不加参数，则仅删除用户帐号，而不删除相关文件。")]),t._v(" "),e("h4",{attrs:{id:"语法-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语法-2"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("userdel")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-r"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("用户帐号"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[t._v("使用 "),e("code",[t._v("-r")]),t._v(" 参数会删除用户登入目录以及目录中所有文件。")]),t._v(" "),e("h3",{attrs:{id:"usermod"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#usermod"}},[t._v("#")]),t._v(" USERMOD")]),t._v(" "),e("p",[t._v("修改用户账号就是根据实际情况更改用户的有关属性，如用户号、主目录、用户组、登录 "),e("code",[t._v("Shell")]),t._v(" 等。")]),t._v(" "),e("p",[t._v("修改已有用户的信息使用 "),e("code",[t._v("usermod")]),t._v(" 命令。")]),t._v(" "),e("h4",{attrs:{id:"语法-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语法-3"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("usermod")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("选项"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("用户帐号"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("h4",{attrs:{id:"常用选项-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用选项-2"}},[t._v("#")]),t._v(" 常用选项")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-l<帐号名称>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改用户帐号名称")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-c<备注>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改用户帐号的备注文字")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-g<群组>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改用户所属的群组")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-d<登入目录>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改用户登入时的目录")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-e<有效期限>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改帐号的有效期限")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-s<shell>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改用户登入后所使用的 Shell")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-G<群组>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改用户所属的附加群组")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-f<缓冲天数>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改在密码过期后多少天即关闭该帐号")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-u<uid>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改用户 ID")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-L")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("锁定用户密码，使密码无效")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-U")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("解除密码锁定")])])])]),t._v(" "),e("h4",{attrs:{id:"实例-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实例-2"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),e("p",[t._v("改变用户的 "),e("code",[t._v("uid")]),t._v("。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("usermod")]),t._v(" -u "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("777")]),t._v(" root\n")])])]),e("h3",{attrs:{id:"passwd"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#passwd"}},[t._v("#")]),t._v(" PASSWD")]),t._v(" "),e("p",[t._v("用户管理的一项重要内容是用户口令的管理。用户账号刚创建时没有口令，但是被系统锁定，无法使用，必须为其指定口令后才可以使用，即使是指定空口令。")]),t._v(" "),e("p",[t._v("指定和修改用户口令的 "),e("code",[t._v("Shell")]),t._v(" 命令是 "),e("code",[t._v("passwd")]),t._v("。超级用户可以为自己和其他用户指定口令，普通用户只能用它修改自己的口令。")]),t._v(" "),e("h4",{attrs:{id:"语法-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语法-4"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("passwd")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("选项"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("用户帐号"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("h4",{attrs:{id:"常用选项-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用选项-3"}},[t._v("#")]),t._v(" 常用选项")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-f")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("强制执行")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-S")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("显示密码信息")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-d")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("删除密码")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-l")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("停止账号使用")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-u")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("启用已被停止的账户")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-g")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("修改群组密码")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-x")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("设置密码的有效期")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-i")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("过期后停止用户账号")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-k")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("更新只能发送在过期之后")])])])]),t._v(" "),e("h4",{attrs:{id:"实例-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实例-3"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),e("p",[t._v("修改用户密码。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ passed anani "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 修改用户 anani 的密码")]),t._v("\nEnter new UNIX password: "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 输入新密码，输入的密码无回显")]),t._v("\nRetype new UNIX password: "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 确认密码")]),t._v("\npasswd: password updated successfully\n")])])]),e("h2",{attrs:{id:"用户组"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#用户组"}},[t._v("#")]),t._v(" 用户组")]),t._v(" "),e("p",[t._v("每个用户都有一个用户组，系统可以对一个用户组中的所有用户进行集中管理。")]),t._v(" "),e("p",[t._v("不同 "),e("code",[t._v("Linux")]),t._v(" 系统对用户组的规定有所不同，如 "),e("code",[t._v("Linux")]),t._v(" 下的用户属于与它同名的用户组，这个用户组在创建用户时同时创建。")]),t._v(" "),e("p",[t._v("用户组的管理涉及用户组的添加、删除和修改。组的增加、删除和修改实际上就是对 "),e("code",[t._v("/etc/group")]),t._v(" 文件的更新。")]),t._v(" "),e("p",[t._v("该文件中的每一行的内容都包含四列，分别以冒号进行隔开。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("root:x:0:\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 组名称 : 组密码占位符 : 组编号（root 所在组号为 0） : 组中的用户（仅一个与组名相同的用户或无用户时为空，多个用户则以逗号隔开）")]),t._v("\n")])])]),e("p",[t._v("组号从 1 到 499 属于系统预留的组编号，一般会被分配给安装在系统中的软件或服务，比如 MySQL。")]),t._v(" "),e("p",[t._v("当前系统中用户组的密码信息存储在 "),e("code",[t._v("/etc/gshadow")]),t._v(" 文件中。")]),t._v(" "),e("p",[t._v("该文件中的内容与用户组信息文件中的内容行行对应，同样每行有四列，每列以冒号分隔开。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("root:*::\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 组名称 : 组密码（*、!或为空皆表示无密码） : 组管理者（为空则表示组内用户都可以管理） : 组中的用户（仅一个与组名相同的用户或无用户时为空，多个用户则以逗号隔开）")]),t._v("\n")])])]),e("h3",{attrs:{id:"groupadd"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#groupadd"}},[t._v("#")]),t._v(" GROUPADD")]),t._v(" "),e("p",[e("code",[t._v("groupadd")]),t._v(" 命令用于创建一个新的工作组，新工作组的信息将被添加到系统文件中。")]),t._v(" "),e("h4",{attrs:{id:"语法-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语法-5"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("groupadd")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("选项"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("新建工作组的组名"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("h4",{attrs:{id:"常用选项-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用选项-4"}},[t._v("#")]),t._v(" 常用选项")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-g")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("指定新建工作组的 ID")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-r")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("创建系统工作组，系统工作组的组 ID 小于 500")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-K")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("覆盖配置文件 “/ect/login.defs”")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-o")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("允许添加组 ID 号不唯一的工作组")])])])]),t._v(" "),e("h4",{attrs:{id:"实例-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实例-4"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),e("p",[t._v("建立一个组 "),e("code",[t._v("anani")]),t._v("，并设置组 ID 加入系统。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("groupadd")]),t._v(" -g "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("333")]),t._v(" anani\n")])])]),e("h3",{attrs:{id:"groupdel"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#groupdel"}},[t._v("#")]),t._v(" GROUPDEL")]),t._v(" "),e("p",[t._v("需要从系统上删除群组时，可用 "),e("code",[t._v("groupdel")]),t._v("(group delete) 指令来完成这项工作。")]),t._v(" "),e("p",[t._v("倘若该群组中仍包括某些用户，则必须先删除这些用户后，方能删除群组。")]),t._v(" "),e("h4",{attrs:{id:"语法-6"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语法-6"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("groupdel")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("群组名称"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("h4",{attrs:{id:"实例-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实例-5"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),e("p",[t._v("删除一个群组 "),e("code",[t._v("anani")]),t._v("。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("groupdel")]),t._v(" anani\n")])])]),e("h3",{attrs:{id:"groupmod"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#groupmod"}},[t._v("#")]),t._v(" GROUPMOD")]),t._v(" "),e("p",[t._v("需要更改群组的识别码或名称时，可用 "),e("code",[t._v("groupmod")]),t._v(" 指令来完成这项工作。")]),t._v(" "),e("h4",{attrs:{id:"语法-7"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语法-7"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("groupmod")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-g "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("群组识别码"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("-o"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-n "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("新群组名称"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("群组名称"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("h4",{attrs:{id:"常用选项-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用选项-5"}},[t._v("#")]),t._v(" 常用选项")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-g <群组识别码>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("设置欲使用的群组识别码")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-o")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("重复使用群组识别码")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-n <新群组名称>")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("设置欲使用的群组名称")])])])]),t._v(" "),e("h4",{attrs:{id:"实例-6"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实例-6"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),e("p",[t._v("修改组名 "),e("code",[t._v("anani")]),t._v(" 为 "),e("code",[t._v("sharon")]),t._v("。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("groupmod")]),t._v(" -n sharon anani\n")])])]),e("h3",{attrs:{id:"gpasswd"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gpasswd"}},[t._v("#")]),t._v(" GPASSWD")]),t._v(" "),e("p",[e("code",[t._v("gpasswd")]),t._v(" 命令是 "),e("code",[t._v("Linux")]),t._v(" 下工作组文件 "),e("code",[t._v("/etc/group")]),t._v(" 和 "),e("code",[t._v("/etc/gshadow")]),t._v(" 管理工具。")]),t._v(" "),e("h4",{attrs:{id:"语法-8"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语法-8"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("gpasswd "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("选项"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("要管理的工作组"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("h4",{attrs:{id:"常用选项-6"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用选项-6"}},[t._v("#")]),t._v(" 常用选项")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-a")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("添加用户到组")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-d")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("从组删除用户")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-A")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("指定管理员")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-M")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("指定组成员和 -A 的用途差不多")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-r")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("删除密码")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[t._v("-R")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("限制用户登入组，只有组中的成员才可以用 "),e("code",[t._v("newgrp")]),t._v(" 加入该组")])])])]),t._v(" "),e("h4",{attrs:{id:"实例-7"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实例-7"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),e("p",[t._v("添加一个用户到一个组，同时保留以前添加的组。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("gpasswd -a user_name group_name\n")])])]),e("p",[t._v("如果一个用户同时属于多个用户组，那么用户可以使用 "),e("code",[t._v("newgrp <groupName>")]),t._v(" 在用户组之间切换，以便具有其他用户组的权限。")]),t._v(" "),e("h2",{attrs:{id:"参考资料"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[t._v("#")]),t._v(" 参考资料")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://blog.csdn.net/u012501054/article/details/71522278",target:"_blank",rel:"noopener noreferrer"}},[t._v("Linux 下/etc/passwd 和/etc/shadow 文件详解 - CSDN"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.imooc.com/learn/111",target:"_blank",rel:"noopener noreferrer"}},[t._v("Linux 达人养成计划 II - 慕课网"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.runoob.com/linux/linux-user-manage.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Linux 用户和用户组管理 - 菜鸟教程"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=v.exports}}]);