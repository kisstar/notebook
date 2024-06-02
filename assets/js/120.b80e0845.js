(window.webpackJsonp=window.webpackJsonp||[]).push([[120],{533:function(t,e,a){"use strict";a.r(e);var s=a(62),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"认识-docker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#认识-docker"}},[t._v("#")]),t._v(" 认识 Docker")]),t._v(" "),a("p",[t._v("Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。")]),t._v(" "),a("h2",{attrs:{id:"背景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),a("p",[t._v("软件开发最大的麻烦事之一，就是环境配置。包括操作系统的设置，各种库和组件的安装等。")]),t._v(" "),a("p",[t._v("通常，软件开发者会在 Windows 或者 Mac 电脑上进行开发，最后部署在 Linux 服务器上。这样的差异常常导致软件在开发环境是正常的，而部署时却出现各种各样的问题。")]),t._v(" "),a("p",[t._v("所以，如果能带环境安装将会省下不少麻烦，虚拟机就是这样一种解决方案。")]),t._v(" "),a("p",[t._v("虚拟机就像是一个应用程序，它可以在一种操作系统里面运行另一种操作系统。通过虚拟机开发者就可以还原软件的原始环境。")]),t._v(" "),a("p",[t._v("但是虚拟机存在资源占用多、启动慢等缺点。由此，又发展出了另一种虚拟化技术：Linux 容器。")]),t._v(" "),a("p",[t._v("Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。它启动块、占用资源少，体积相对比较小。")]),t._v(" "),a("p",[t._v("Docker 就是属于 Linux 容器的一种封装，提供简单易用的容器使用接口。它是目前最流行的 Linux 容器解决方案。")]),t._v(" "),a("h2",{attrs:{id:"三要素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三要素"}},[t._v("#")]),t._v(" 三要素")]),t._v(" "),a("p",[t._v("Docker 的三要素包括：镜像、容器和仓库。")]),t._v(" "),a("p",[a("strong",[t._v("镜像")]),t._v("（image）：镜像可以看作是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。")]),t._v(" "),a("p",[t._v("镜像不包含任何动态数据，其内容在构建之后也不会被改变。")]),t._v(" "),a("p",[a("strong",[t._v("容器")]),t._v("（container）：容器是使用镜像创建的运行实例。可以把一个容器看作是一个简易版的 Linux 环境。")]),t._v(" "),a("p",[t._v("它可以被启动、开始、停止、删除。每个容器是相互隔离的、保证安全的平台。")]),t._v(" "),a("p",[a("strong",[t._v("仓库")]),t._v("（Repository）：集中存放镜像文件的场所。最大的公开仓库就是 "),a("a",{attrs:{href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Docker Hub"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("p",[t._v("仓库和仓库注册服务器（Registry）是有区别的，仓库注册服务器中往往存放了多个仓库，每个仓库中又包含了多个镜像，每个镜像又可能包含不同的标签。")]),t._v(" "),a("p",[t._v("Docker 本身就是一个容器运行载体或称之为管理引擎。")]),t._v(" "),a("p",[t._v("我们把程序的配置和依赖打包成一个可以交付的运行环境，这个包就是镜像文件，通过镜像文件才能产生容器，同一个镜像可以生成多个同时运行的容器实例。")]),t._v(" "),a("h2",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),a("p",[t._v("Docker 是一个开源的商业产品，包括社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE）。")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://docs.docker.com/engine/install/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),a("OutboundLink")],1),t._v("中列出了详细的安装方法，这里以 CentOS 7 为例，安装 Docker CE。")]),t._v(" "),a("p",[t._v("安装所需的软件包:")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("yum "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -y yum-utils\n")])])]),a("p",[t._v("设置稳定的仓库，这里使用阿里云：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" yum-config-manager "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --add-repo "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo\n")])])]),a("p",[t._v("安装最新版本的 Docker Engine-Community 和 containerd，或者转到下一步安装特定版本：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" yum "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -y docker-ce docker-ce-cli containerd.io\n")])])]),a("p",[t._v("安装完成后，运行下面的命令，验证是否安装成功：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" version\n")])])]),a("p",[t._v("启动 Docker：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl start "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v("\n")])])]),a("h2",{attrs:{id:"镜像加速器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#镜像加速器"}},[t._v("#")]),t._v(" 镜像加速器")]),t._v(" "),a("p",[t._v("国内从 Docker Hub 拉取镜像有时会遇到困难，此时可以配置镜像加速器。Docker 官方和国内很多云服务商都提供了国内加速器服务。例如：")]),t._v(" "),a("ul",[a("li",[t._v("网易："),a("a",{attrs:{href:"https://hub-mirror.c.163.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://hub-mirror.c.163.com/"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("七牛云加速器："),a("a",{attrs:{href:"https://reg-mirror.qiniu.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://reg-mirror.qiniu.com"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("阿里云：//<你的 ID>.mirror.aliyuncs.com")])]),t._v(" "),a("p",[t._v("你可以同时添加几个国内的镜像，如果有不能使用的，会切换到可以使用个的镜像来拉取。")]),t._v(" "),a("p",[t._v("阿里云的镜像地址可以在"),a("a",{attrs:{href:"https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),a("OutboundLink")],1),t._v("登陆后进行获取，由阿里云提供个人专属镜像地址。")]),t._v(" "),a("p",[t._v("配置时，对于 Ubuntu16.04+、Debian8+、CentOS7 而言，需要在 "),a("code",[t._v("/etc/docker/daemon.json")]),t._v(" 中写入如下内容（如果文件不存在请新建该文件）：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"registry-mirrors"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://reg-mirror.qiniu.com/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("之后重新启动服务：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl daemon-reload\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" systemctl restart "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v("\n")])])]),a("h2",{attrs:{id:"hello-world"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hello-world"}},[t._v("#")]),t._v(" Hello World")]),t._v(" "),a("p",[t._v("接下来，通过拉取最简单的 "),a("a",{attrs:{href:"https://hub.docker.com/_/hello-world",target:"_blank",rel:"noopener noreferrer"}},[t._v("hello-world"),a("OutboundLink")],1),t._v(" 来体验一下：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" image pull library/hello-world\n")])])]),a("p",[t._v("抓取成功以后，就可以在本机运行这个镜像文件了：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" container run hello-world\n\nHello from Docker"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("\nThis message shows that your installation appears to be working correctly.\n\nTo generate this message, Docker took the following steps:\n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(". The Docker client contacted the Docker daemon.\n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(". The Docker daemon pulled the "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello-world"')]),t._v(" image from the Docker Hub.\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("amd64"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(". The Docker daemon created a new container from that image "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("which")]),t._v(" runs the\n    executable that produces the output you are currently reading.\n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v(". The Docker daemon streamed that output to the Docker client, "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("which")]),t._v(" sent it\n    to your terminal.\n\nTo try something "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("more")]),t._v(" ambitious, you can run an Ubuntu container with:\n $ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run -it ubuntu "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bash")]),t._v("\n\nShare images, automate workflows, and "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("more")]),t._v(" with a "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("free")]),t._v(" Docker ID:\n https://hub.docker.com/\n\nFor "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("more")]),t._v(" examples and ideas, visit:\n https://docs.docker.com/get-started/\n")])])]),a("p",[t._v("其实，"),a("code",[t._v("docker container run")]),t._v(" 命令具有自动抓取 "),a("code",[t._v("image")]),t._v(" 文件的功能。如果发现本地没有指定的 "),a("code",[t._v("image")]),t._v(" 文件，就会从仓库自动抓取。")]),t._v(" "),a("p",[t._v("所以，前面的 "),a("code",[t._v("docker image pull")]),t._v(" 命令并不是必需的。")]),t._v(" "),a("h2",{attrs:{id:"小结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),a("p",[t._v("Docker 是一个 Client-Server 结构的系统，其守护进程运行在主机上，然后通过 Socket 连接从客户端访问，守护进程从客户端接受命令并管理运行在主机上的容器。")]),t._v(" "),a("p",[t._v("虚拟机通常由必要的硬件和软件组成，而 Docker 不需要 Hypervisor 实现硬件资源虚拟化，运行在 Doker 容器上的程序都是直接使用的实际物理机的硬件资源。因此在 CPU、内存利用率上 Docker 有明显的优势。")]),t._v(" "),a("p",[t._v("另外，Docker 利用的是宿主机的内核。因此，在创建一个新的容器时不需要像虚拟机一样重新加载一个新的操作系统内核，从而避免了加载操作系统内核这样比较耗时、费资源的一个过程，显得更轻、更快。")])])}),[],!1,null,null,null);e.default=r.exports}}]);