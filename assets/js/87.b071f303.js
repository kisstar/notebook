(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{434:function(t,a,v){"use strict";v.r(a);var _=v(25),e=Object(_.a)({},(function(){var t=this,a=t.$createElement,v=t._self._c||a;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"链接命令"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#链接命令"}},[t._v("#")]),t._v(" 链接命令")]),t._v(" "),v("p",[t._v("链接命令可以在文件之间创建链接，通常链接分为硬链接和软链接两种。")]),t._v(" "),v("h2",{attrs:{id:"背景知识"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#背景知识"}},[t._v("#")]),t._v(" 背景知识")]),t._v(" "),v("p",[t._v("格式化是在物理驱动器（磁盘）的所有数据区上写零的操作过程，简单来讲磁盘在格式化的时候，就像就是把一张空白的盘划分成一个个小区域并编号，供计算机储存，读取数据。")]),t._v(" "),v("p",[t._v("格式化的过程通常会导致现有的磁盘或分区中所有的文件被清除，但清空文件并不是格式化真正的目的。")]),t._v(" "),v("p",[t._v("格式化的目的在于对磁盘进行格式化，划分磁道和扇区；同时检查出整个磁盘上有无带缺陷的磁道，对坏道加注标记；建立目录区和文件分配表（记录文件所在位置的表格），使磁盘作好接收 DOS 的准备。")]),t._v(" "),v("p",[t._v("数据被清空的情况，只是附带执行的。")]),t._v(" "),v("h2",{attrs:{id:"硬连接"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#硬连接"}},[t._v("#")]),t._v(" 硬连接")]),t._v(" "),v("p",[t._v("硬连接的实质就是将指向文件分配表中的内容（文件的相关信息：时间，储存位置等）的指针复制给新的文件。")]),t._v(" "),v("p",[t._v("硬连接具备如下特征：")]),t._v(" "),v("ul",[v("li",[t._v("以文件副本的形式存在，但不占用实际空间。")]),t._v(" "),v("li",[t._v("拥有相同的 "),v("code",[t._v("i")]),t._v(" 结点和存储 "),v("code",[t._v("block")]),t._v(" 块，可以看作是同一个文件。")]),t._v(" "),v("li",[t._v("不能跨分区。")]),t._v(" "),v("li",[t._v("不能针对目录使用。")])]),t._v(" "),v("p",[t._v("注意：如果删除其中一个文件，另一个文件仍然可以访问。")]),t._v(" "),v("h2",{attrs:{id:"软链接"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#软链接"}},[t._v("#")]),t._v(" 软链接")]),t._v(" "),v("p",[t._v("软连接的工作方式相对于硬连接来说更加复杂。首先，新的文件会执行文件分配表中一个新的位置，其中记录的不再是所链接对象的相关信息，而是表示一块新的存储位置的信息。")]),t._v(" "),v("p",[t._v("存储信息中的内容，表示了源文件在文件分配表中的块，然后再根据此块读取源文件的内容。")]),t._v(" "),v("p",[t._v("显然，现在如果源文件被删除，那么软文件将不可用。")]),t._v(" "),v("p",[t._v("软连接的特征：")]),t._v(" "),v("ul",[v("li",[t._v("跨文件系统。")]),t._v(" "),v("li",[t._v("以路径的形式存在，类似 "),v("code",[t._v("Windows")]),t._v(" 的快捷方式。")]),t._v(" "),v("li",[t._v("拥有自己的 "),v("code",[t._v("i")]),t._v(" 结点。")]),t._v(" "),v("li",[t._v("可以对目录或一个不存在的文件名进行链接。")])]),t._v(" "),v("h2",{attrs:{id:"语法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#语法"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),v("div",{staticClass:"language-bash extra-class"},[v("pre",{pre:!0,attrs:{class:"language-bash"}},[v("code",[v("span",{pre:!0,attrs:{class:"token function"}},[t._v("ln")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("参数"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("源文件或目录"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("目标文件或目录"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),v("h2",{attrs:{id:"参数"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参数"}},[t._v("#")]),t._v(" 参数")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"left"}},[t._v("名称")]),t._v(" "),v("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("-s")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("软链接(符号链接)")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("-b")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("删除，覆盖以前建立的链接")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("-f")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("强制执行")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("-i")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("交互模式，文件存在则提示用户是否覆盖")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("-d")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("允许超级用户制作目录的硬链接")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("-n")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("把符号链接视为一般目录")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"left"}},[t._v("-v")]),t._v(" "),v("td",{staticStyle:{"text-align":"left"}},[t._v("显示详细的处理过程")])])])]),t._v(" "),v("h2",{attrs:{id:"实例"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#实例"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),v("p",[t._v("给文件创建硬链接，为 "),v("code",[t._v("log2019.log")]),t._v(" 创建硬链接 "),v("code",[t._v("ln2019")]),t._v("，"),v("code",[t._v("log2019.log")]),t._v(" 与 "),v("code",[t._v("ln2019")]),t._v(" 的各项属性相同。")]),t._v(" "),v("div",{staticClass:"language-bash extra-class"},[v("pre",{pre:!0,attrs:{class:"language-bash"}},[v("code",[v("span",{pre:!0,attrs:{class:"token function"}},[t._v("ln")]),t._v(" log2019.log ln2019\n")])])]),v("p",[t._v("给文件创建软链接，为 "),v("code",[t._v("log2019.log")]),t._v(" 文件创建软链接 "),v("code",[t._v("link2019")]),t._v("，如果 "),v("code",[t._v("log2019.log")]),t._v(" 丢失，"),v("code",[t._v("link2019")]),t._v(" 将失效。")]),t._v(" "),v("div",{staticClass:"language-bash extra-class"},[v("pre",{pre:!0,attrs:{class:"language-bash"}},[v("code",[v("span",{pre:!0,attrs:{class:"token function"}},[t._v("ln")]),t._v(" -s log2019.log link2019\n")])])]),v("h2",{attrs:{id:"总结"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),v("p",[t._v("硬链接的意思是一个档案可以有多个名称，而软链接的方式则是产生一个特殊的档案，该档案的内容是指向另一个档案的位置。")]),t._v(" "),v("ul",[v("li",[t._v("两种链接，修改任一个文件，另一个文件都会随之改变。")]),t._v(" "),v("li",[t._v("删除源文件硬连接依然可用，而软连接不再可用。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);