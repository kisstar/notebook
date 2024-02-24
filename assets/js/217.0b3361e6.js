(window.webpackJsonp=window.webpackJsonp||[]).push([[217],{632:function(t,a,s){"use strict";s.r(a);var e=s(62),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"挂载"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#挂载"}},[t._v("#")]),t._v(" 挂载")]),t._v(" "),s("p",[t._v("挂载是指由操作系统使一个存储设备上的计算机文件和目录可供用户通过计算机的文件系统访问的一个过程。")]),t._v(" "),s("p",[t._v("通常，当计算机关机时，每个已挂载存储都将经历一次卸载，以确保所有排队的数据被写入，并保证介质上文件系统结构的完整性。")]),t._v(" "),s("h2",{attrs:{id:"简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[t._v("#")]),t._v(" 简介")]),t._v(" "),s("p",[t._v("我们可以简单的将挂载理解为分配盘符，在 "),s("code",[t._v("Windows")]),t._v(" 系统中依然如此，只是我们插入硬盘或媒体设备时系统会自动完成此项工作。")]),t._v(" "),s("p",[t._v("在 "),s("code",[t._v("Linux")]),t._v(" 中将所有的设备都看作文件，并且只有一个根目录。在装系统时，我们分配给 "),s("code",[t._v("Linux")]),t._v(" 的所有区都在根目录下的某个位置，比如 "),s("code",[t._v("/home")]),t._v(" 等等。")]),t._v(" "),s("p",[t._v("我们要访问存储设备中的文件，就必须将文件所在的分区挂载到一个已存在的目录上，然后通过访问这个目录来访问存储设备。")]),t._v(" "),s("h2",{attrs:{id:"mount"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mount"}},[t._v("#")]),t._v(" MOUNT")]),t._v(" "),s("p",[s("code",[t._v("mount")]),t._v(" 命令用于加载文件系统到指定的加载点。")]),t._v(" "),s("p",[t._v("此命令最常用于挂载 CDROM，使我们可以访问 CDROM 中的数据，当你将光盘插入 CDROM 中时，"),s("code",[t._v("Linux")]),t._v(" 并不会自动挂载，必须使用 "),s("code",[t._v("mount")]),t._v(" 命令来手动完成挂载。")]),t._v(" "),s("p",[t._v("需要注意的是，挂载点必须是一个已经存在的目录，这个目录可以不为空，但挂载后这个目录下以前的内容将不可用，只有在 "),s("code",[t._v("umount")]),t._v(" 卸载以后才会恢复正常。")]),t._v(" "),s("p",[t._v("另外，只有目录才能被挂载，文件不可以被挂载，而如果挂载在非空目录下可能会导致系统异常，所以建议挂载在空目录下。对于经常使用的设备可写入文件 "),s("code",[t._v("/etc/fastab")]),t._v("，以使系统在每次开机时自动加载。")]),t._v(" "),s("p",[s("code",[t._v("mount")]),t._v(" 加载设备的信息记录在 "),s("code",[t._v("/etc/mtab")]),t._v(" 文件中，可使用 "),s("code",[t._v("umount")]),t._v(" 命令卸载清除记录。")]),t._v(" "),s("p",[t._v("注释：在 "),s("code",[t._v("/etc/fstab")]),t._v(" 文件里显示的内容包括，第一列是挂载的文件系统的设备名，第二列是挂载点，第三列是挂载的文件系统类型，第四列是挂载的选项，选项间用逗号分隔。")]),t._v(" "),s("h3",{attrs:{id:"语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#语法"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-hV"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),t._v(" -a "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-fFnrsvw"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-t vfstype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-fnrsvw"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-o options "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(","),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v("."),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" device "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dir")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-fnrsvw"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-t vfstype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-o options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" device "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dir")]),t._v("\n")])])]),s("h3",{attrs:{id:"常用选项"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用选项"}},[t._v("#")]),t._v(" 常用选项")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-l")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("显示已加载的文件系统列表")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-a")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("加载文件 “/etc/fstab” 中描述的所有文件系统")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-n")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("加载没有写入文件 “/etc/mtab” 中的文件系统")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-r")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("将文件系统加载为只读模式")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-v")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("冗长模式，输出指令执行的详细信息")])])])]),t._v(" "),s("h3",{attrs:{id:"常用挂载命令格式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用挂载命令格式"}},[t._v("#")]),t._v(" 常用挂载命令格式")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-t文件系统"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("-o特殊选项"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" 设备文件名 挂载点\n")])])]),s("h3",{attrs:{id:"实例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实例"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),s("p",[t._v("从新挂载 "),s("code",[t._v("/home")]),t._v(" 分区，并移除执行权限。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" ~\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("vi")]),t._v(" test.sh "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# 写入 echo "hello world!"')]),t._v("\nchomd "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("755")]),t._v(" test.sh\n./test.sh "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 输出 hello world!")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),t._v(" -o remount,noexec /home\n./test.sh "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提示权限不足")]),t._v("\n")])])]),s("p",[t._v("挂载光盘。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),t._v(" -t iso9660 dev/sr0 /media\n")])])]),s("h2",{attrs:{id:"umount"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#umount"}},[t._v("#")]),t._v(" UMOUNT")]),t._v(" "),s("p",[t._v("用于卸载已经加载的文件系统。")]),t._v(" "),s("h3",{attrs:{id:"语法-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#语法-2"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("umount")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("选项"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("参数"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("h3",{attrs:{id:"常用选项-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用选项-2"}},[t._v("#")]),t._v(" 常用选项")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-a")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("卸除 "),s("code",[t._v("/etc/mtab")]),t._v(" 中记录的所有文件系统")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-n")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("卸除时不要将信息存入 "),s("code",[t._v("/etc/mtab")]),t._v(" 文件中")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-t<文件系统类型>")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("仅卸除选项中所指定的文件系统")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-v")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("执行时显示详细的信息")])])])]),t._v(" "),s("h3",{attrs:{id:"实例-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实例-2"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),s("p",[t._v("通过挂载点卸载并显示详细的信息。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("umount")]),t._v(" -v /meida\n")])])]),s("p",[t._v("注意，进程正在使用的设备无法被卸载。")]),t._v(" "),s("h2",{attrs:{id:"fdisk"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fdisk"}},[t._v("#")]),t._v(" FDISK")]),t._v(" "),s("p",[t._v("创建和维护分区表的程序，它兼容 DOS 类型的分区表、BSD 或者 SUN 类型的磁盘列表。")]),t._v(" "),s("h3",{attrs:{id:"语法-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#语法-3"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fdisk")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("必要参数"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("选择参数"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("h3",{attrs:{id:"常用选项-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用选项-3"}},[t._v("#")]),t._v(" 常用选项")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-l")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("列出素所有分区表，必要参数")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-u")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v('与 "-l" 搭配使用，显示分区数目，必要参数')])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-s<分区编号>")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("指定分区")])])])]),t._v(" "),s("p",[t._v("菜单操作说明：")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("n")]),t._v("：新建分区")]),t._v(" "),s("li",[s("code",[t._v("d")]),t._v("：删除分区")]),t._v(" "),s("li",[s("code",[t._v("w")]),t._v("：保存修改")]),t._v(" "),s("li",[s("code",[t._v("l")]),t._v("：显示分区类型")]),t._v(" "),s("li",[s("code",[t._v("p")]),t._v("：显示分区信息")]),t._v(" "),s("li",[s("code",[t._v("q")]),t._v("：退出不保存")]),t._v(" "),s("li",[s("code",[t._v("t")]),t._v("：设置分区号")]),t._v(" "),s("li",[s("code",[t._v("v")]),t._v("：进行分区检查")])]),t._v(" "),s("h3",{attrs:{id:"实例-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实例-3"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),s("p",[t._v("显示当前分区情况。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fdisk")]),t._v(" -l\n")])])]),s("p",[t._v("根据上面的命令我们可以查看 U 盘设备的文件名，从而进行挂载 U 盘。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("mount")]),t._v(" -t vfat /dev/sdb1 /mnt\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);