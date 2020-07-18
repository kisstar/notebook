(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{425:function(t,e,a){"use strict";a.r(e);var s=a(25),v=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"搭建开发环境（一）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搭建开发环境（一）"}},[t._v("#")]),t._v(" 搭建开发环境（一）")]),t._v(" "),a("p",[t._v("记录如何搭建基本开发环境。")]),t._v(" "),a("h2",{attrs:{id:"包管理系统"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#包管理系统"}},[t._v("#")]),t._v(" 包管理系统")]),t._v(" "),a("p",[t._v("现代类 "),a("code",[t._v("Unix")]),t._v(" 操作系统大多都提供了一个集中的软件包管理机制，以帮助用户搜索、安装和管理软件。而软件通常以「包」的形式存储在仓库中，对软件包的使用和管理被称为包管理。而 "),a("code",[t._v("Linux")]),t._v(" 包的基本组成部分通常有：共享库、应用程序、服务和文档。")]),t._v(" "),a("p",[t._v("如今流行的 "),a("code",[t._v("Linux")]),t._v(" 发行版在包管理工具、方式和形式都大同小异，这里主要就 "),a("code",[t._v("Ubuntu")]),t._v(" 做一个说明。")]),t._v(" "),a("p",[t._v("最近发布的 "),a("code",[t._v("debian")]),t._v(" 衍生版(如 Ubuntu、Raspbian 等)大多数都包含了 "),a("code",[t._v("apt")]),t._v(" 命令，它提供了一个简洁统一的接口，可用于通常由 "),a("code",[t._v("apt-get")]),t._v(" 和 "),a("code",[t._v("apt-cache")]),t._v(" 命令处理的常见操作。")]),t._v(" "),a("p",[t._v("这里就 "),a("code",[t._v("apt")]),t._v(" 相关常用命令做了一个简单的描述：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("选项")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("sudo apt update/apt-get update")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("更新包列表")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("sudo apt upgrade/apt-get upgrade")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("更新已安装的包")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("sudo apt full-upgrade/apt-get dist-upgrade")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("可能会增加或删除包以满足新的依赖项")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("sudo apt install "),a("code",[t._v("<package_string>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("从存储库安装包")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("sudo apt remove "),a("code",[t._v("<package_string>")]),t._v("/sudo apt-get remove "),a("code",[t._v("<package_string>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("移除指定的软件包")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("sudo apt-get autoremove")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("删除不需要的包")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("sudo apt purge "),a("code",[t._v("<package_string>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("彻底删除该 "),a("code",[t._v("package")]),t._v("（包含配置文件）")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("apt search "),a("code",[t._v("<search_string>")]),t._v("/apt-cache search "),a("code",[t._v("<search_string>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("搜索某个包")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("dpkg -s "),a("code",[t._v("<package_string>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("显示包的当前安装状态")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("apt show "),a("code",[t._v("<package_string>")]),t._v("/apt-cache show "),a("code",[t._v("<package_string>")])]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("查看某个软件包的信")])])])]),t._v(" "),a("h2",{attrs:{id:"更换源"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#更换源"}},[t._v("#")]),t._v(" 更换源")]),t._v(" "),a("p",[t._v("由于国外源太慢了，所以在我们安装完 "),a("code",[t._v("Ubuntu")]),t._v(" 系统后先将 "),a("code",[t._v("Ubuntu 18.04")]),t._v(" 修改默认源为国内源。")]),t._v(" "),a("p",[t._v("首先我们对 "),a("code",[t._v("/etc/apt")]),t._v(" 下的 "),a("code",[t._v("sources.list")]),t._v(" 文件进行备份，以免误操作：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cp")]),t._v(" /etc/apt/sources.list /etc/apt/sources.list.bak\n")])])]),a("p",[t._v("然后 在 "),a("code",[t._v("/etc/apt/sources.list")]),t._v(" 文件前面添加如下内容：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse\n")])])]),a("p",[t._v("在使用 "),a("code",[t._v("vi/vim")]),t._v(" 编辑 "),a("code",[t._v("sources.list")]),t._v(" 文件时需要 "),a("code",[t._v("root")]),t._v(" 权限，通过切换到 "),a("code",[t._v("root")]),t._v(" 用户或在命令前面加上 "),a("code",[t._v("sudo")]),t._v(" 进行编辑。")]),t._v(" "),a("p",[t._v("最后使用 "),a("code",[t._v("sudo apt update")]),t._v(" 和 "),a("code",[t._v("sudo apt upgrade")]),t._v(" 进行更新。")]),t._v(" "),a("h2",{attrs:{id:"安装-git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-git"}},[t._v("#")]),t._v(" 安装 Git")]),t._v(" "),a("p",[t._v("Git 是一个免费的开源分布式版本控制系统，旨在快速，高效地处理从小型到大型项目的所有事务，具有廉价本地分支，便捷的临时区域和多个工作流程等功能。")]),t._v(" "),a("p",[t._v("由于它可以有效、高速地处理从很小到非常大的项目版本管理，这对我们开发工作的进行异常有利，所以这里我们先对它进行安装。")]),t._v(" "),a("p",[t._v("首先安装 Git：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v("\n")])])]),a("p",[t._v("然后配置用户信息：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.name "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Your Name"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.email "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"email@example.com"')]),t._v("\n")])])]),a("p",[t._v("最后我们来生成和配置 Git SSH 密钥，在生成密钥之前我们先检测之前是否生成过 SSh 密钥，其原理就是检测家目录下 "),a("code",[t._v(".ssh")]),t._v(" 文件是否存在，所以我们可以通过直接切换 "),a("code",[t._v("cd ~/.ssh")]),t._v(" 或者查看家目录 "),a("code",[t._v("ls -a ~/")]),t._v("。")]),t._v(" "),a("p",[t._v("如果不存在则通过该命令生成：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("ssh-keygen -t rsa -C "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"youremail@example.com"')]),t._v("\n")])])]),a("p",[t._v("然后你就会看到家目录下多了 "),a("code",[t._v(".ssh")]),t._v(" 目录，其中包含 "),a("code",[t._v("id_rsa(")]),t._v("私钥)和 "),a("code",[t._v("id_rsa.pub")]),t._v("(公钥)两个文件，我们要做的就是对 "),a("code",[t._v("id_rsa.pub")]),t._v(" 文件中的内容进行拷贝。")]),t._v(" "),a("p",[t._v("最后，进入自己的 Github，依次点击 “Settings->SSH and GPG keys->New SSH key”，把刚才复制的内容粘贴在 "),a("code",[t._v("key")]),t._v(" 中，点击 Add SSH key 按钮添加，完成。之后，我们 "),a("code",[t._v("push")]),t._v(" 就不用再输入用户和密码。")]),t._v(" "),a("h2",{attrs:{id:"安装-nvm、node、npm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-nvm、node、npm"}},[t._v("#")]),t._v(" 安装 nvm、node、npm")]),t._v(" "),a("p",[t._v("接下来我们需要安装 Node 和 Npm。")]),t._v(" "),a("p",[t._v("在这里我们需要了解一下 Nvm，Nvm 是一个可以让你在同一台机器上安装和切换不同版本 Node 的工具，为了便于对不对版本 Node 的管理，所以这里我们直接安装 Nvm。")]),t._v(" "),a("p",[t._v("Ubuntu 下安装：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bash")]),t._v("\n")])])]),a("p",[t._v("安装成功后，需要关闭终端，重新启动。Nvm 才会生效。")]),t._v(" "),a("p",[t._v("Node.js 是一个事件驱动 I/O 服务端 JavaScript 环境，基于 Google 的 V8 引擎，V8 引擎执行 JavaScript 的速度非常快，性能非常好。")]),t._v(" "),a("p",[t._v("我们这里安装现在最新稳定版 "),a("code",[t._v("v10.14.2")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("nvm "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" v10.14.2\n")])])]),a("p",[t._v("由于 "),a("code",[t._v("npm")]),t._v(" 会跟随 "),a("code",[t._v("node")]),t._v(" 一起被安装，所以我们无需单独对它进行安装。")])])}),[],!1,null,null,null);e.default=v.exports}}]);