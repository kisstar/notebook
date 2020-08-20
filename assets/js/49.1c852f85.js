(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{401:function(a,s,t){"use strict";t.r(s);var e=t(25),r=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#镜像"}},[a._v("#")]),a._v(" 镜像")]),a._v(" "),t("p",[a._v("镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件等。")]),a._v(" "),t("h2",{attrs:{id:"联合文件系统"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#联合文件系统"}},[a._v("#")]),a._v(" 联合文件系统")]),a._v(" "),t("p",[a._v("Docker 镜像是怎么实现增量的修改和维护的？每个镜像都由很多层次构成，Docker 使用联合文件系统（UnionFS）将这些不同的层结合到一个镜像中去。")]),a._v(" "),t("p",[a._v("联合文件系统是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下。")]),a._v(" "),t("p",[a._v("所以说，联合文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。")]),a._v(" "),t("p",[a._v("而且，基于此不同 Docker 容器就可以共享一些基础的文件系统层，同时再加上自己独有的改动层，大大提高了存储的效率。")]),a._v(" "),t("h2",{attrs:{id:"创建一个新的镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建一个新的镜像"}},[a._v("#")]),a._v(" 创建一个新的镜像")]),a._v(" "),t("p",[a._v("当我们从 Docker 镜像仓库中下载的镜像不能满足我们的需求时，我们可以通过以下两种方式对镜像进行更改:")]),a._v(" "),t("ul",[t("li",[a._v("从已经创建的容器中更新镜像，并且提交这个镜像")]),a._v(" "),t("li",[a._v("使用 Dockerfile 指令来创建一个新的镜像")])]),a._v(" "),t("h3",{attrs:{id:"更新、提交镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#更新、提交镜像"}},[a._v("#")]),a._v(" 更新、提交镜像")]),a._v(" "),t("p",[a._v("现在先来了解一下第一种方式，首先从 Hub 上拉取最新的 "),t("code",[a._v("tomcat")]),a._v(" 镜像到本地：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker pull tomcat\n")])])]),t("p",[a._v("接下来就是运行它。这里需要注意的是，在启动时我们需要将容器中的端口（比如：8080）映射到本地的端口（比如：80）以便于在本地访问：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker run -it -p "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("80")]),a._v(":8080 tomcat\n")])])]),t("p",[a._v("除了上面的通过 "),t("code",[a._v("-p")]),a._v(" 来指定端口映射外，也可以直接使用 "),t("code",[a._v("-P")]),a._v(" 来指定随机映射，然后通过 "),t("code",[a._v("docker ps")]),a._v(" 来查看最后的映射关系。")]),a._v(" "),t("p",[a._v("假如上面我们启动的容器 ID 是 "),t("code",[a._v("5a88617e75e0")]),a._v("，现在进入这个容器中：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("exec")]),a._v(" -it 5a88617e75e0 /bin/bash\n")])])]),t("p",[a._v("在容器的 "),t("code",[a._v("/usr/local/tomcat/webapps/www")]),a._v(" 目录下添加 "),t("code",[a._v("index.html")]),a._v(" 文件并写入以下内容：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("mkdir")]),a._v(" /usr/local/tomcat/webapps/www\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('\'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Docker</title>\n</head>\n<body>\n    <div>Hello Docker!</div>\n</body>\n</html>\'')]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">>")]),a._v(" webapps/www/index.html\n")])])]),t("p",[a._v("到此，你可以在宿主机中通过 "),t("code",[a._v("curl http://localhost/www/")]),a._v(" 来访问到上面的 HTML 内容。")]),a._v(" "),t("p",[a._v("我们已经完成了对容器的修改，下载可以通过命令 "),t("code",[a._v("docker commit")]),a._v(" 来提交容器副本。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker commit "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("REPOSITORY"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(":TAG"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("-a: 提交的镜像作者")]),a._v(" "),t("li",[a._v("-m: 提交时的说明文字")]),a._v(" "),t("li",[a._v("-c: 使用 Dockerfile 指令来创建镜像")]),a._v(" "),t("li",[a._v("-p: 在 commit 时，将容器暂停")])]),a._v(" "),t("p",[a._v("熟悉 Git 的同学看起来应该很熟悉：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker commit -a "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Kisstar"')]),a._v(" -m "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Hello Docker"')]),a._v(" 5a88617e75e0 kisstar/tomcat:1.0.0\n")])])]),t("p",[a._v("然后通过 "),t("code",[a._v("docker iamges")]),a._v(" 就可以看到生成的新的镜像，为进行验证我们先退出之前运行的容器，或者直接全部删除（请确认后执行）：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" -f "),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" -aq"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("\n")])])]),t("p",[a._v("接着利用我们生成的镜像来创建一个新的容器：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker run -it -d -p "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("80")]),a._v(":8080 kisstar/tomcat:1.0.0\n")])])]),t("p",[a._v("现在，无需添加 HTML 文件，通过 "),t("code",[a._v("curl http://localhost/www/")]),a._v(" 就可以直接看到上面的 HTML 内容。")]),a._v(" "),t("h3",{attrs:{id:"基于-dockerfile-创建新的镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基于-dockerfile-创建新的镜像"}},[a._v("#")]),a._v(" 基于 Dockerfile 创建新的镜像")]),a._v(" "),t("p",[a._v("首先，创建一个 Dockerfile 文件，其中包含一组指令来告诉 Docker 如何构建我们的镜像。")]),a._v(" "),t("p",[a._v("这里自定义一个 "),t("code",[a._v("centos")]),a._v(" 镜像，改变启动后的默认路径，并使其支持 "),t("code",[a._v("vim")]),a._v(" 编辑器和 "),t("code",[a._v("ifconfig")]),a._v(" 等命令：")]),a._v(" "),t("div",{staticClass:"language-dockerfile extra-class"},[t("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("FROM")]),a._v(" centos\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("LABEL")]),a._v(" maintainer="),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Kisstar <dwh.chn@foxmail.com>"')]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENV")]),a._v(" WD /usr/local\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("WORKDIR")]),a._v(" $WD\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("RUN")]),a._v(" yum "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("y install vim\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("RUN")]),a._v(" yum "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("y install net"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("tools\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("EXPOSE")]),a._v(" 80\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("CMD")]),a._v(" /bin/bash\n")])])]),t("p",[a._v("每一个指令都会在镜像上创建一个新的层。")]),a._v(" "),t("p",[a._v("然后，我们使用 Dockerfile 文件，通过 "),t("code",[a._v("docker build")]),a._v(" 命令来构建一个镜像：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker build -t kisstar/centos:1.0.0 "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(".")]),a._v("\n")])])]),t("p",[a._v("现在，我们可以使用新的镜像来创建容器：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker run -it kisstar/centos:1.0.0\n")])])]),t("h2",{attrs:{id:"推送本地镜像至阿里云"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#推送本地镜像至阿里云"}},[a._v("#")]),a._v(" 推送本地镜像至阿里云")]),a._v(" "),t("p",[a._v("仓库（Repository）是集中存放镜像的地方，目前 Docker 官方维护了一个公共仓库 "),t("a",{attrs:{href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Docker Hub"),t("OutboundLink")],1),a._v("，大部分需求都可以通过在 Docker Hub 中直接下载镜像来实现。")]),a._v(" "),t("p",[a._v("以下介绍一下如何推送本地镜像至阿里云，与 Docker Hub 类似，只是远程的服务商不一样，操作都是一样的。")]),a._v(" "),t("p",[a._v("首先，前往阿里云控制台登录后选择容器镜像服务，然后点击创建镜像仓库。")]),a._v(" "),t("img",{attrs:{src:a.$withBase("/images/docker/create-ali-repository.png"),alt:"create-ali-repository"}}),a._v(" "),t("p",[a._v("在第二步选择代码源时，直接选择本地镜像。")]),a._v(" "),t("p",[a._v("然后，在仓库列表中就可以看到我们新建的仓库。点击管理，在管理页面我们可以看到详细的操作指南。")]),a._v(" "),t("p",[a._v("推送时，使用用户名和密码进行登录：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker login registry.cn-beijing.aliyuncs.com\n")])])]),t("p",[a._v("登录成功后就可以开始推动我们的镜像了：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker tag "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("ImageId"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" registry.cn-beijing.aliyuncs.com/kisstar/centos:"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("镜像版本号"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\ndocker push registry.cn-beijing.aliyuncs.com/kisstar/centos:"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("镜像版本号"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[a._v("推送成功后就可以拉取我们推送的镜像啦：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker pull registry.cn-beijing.aliyuncs.com/kisstar/centos:"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("镜像版本号"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("h2",{attrs:{id:"参考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[a._v("#")]),a._v(" 参考")]),a._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://wiki.jikexueyuan.com/project/docker-technology-and-combat/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Docker —— 从入门到实践-极客学院 Wiki"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=r.exports}}]);