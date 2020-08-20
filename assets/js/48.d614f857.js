(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{388:function(a,t,s){"use strict";s.r(t);var e=s(25),r=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"dockerfile"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile"}},[a._v("#")]),a._v(" Dockerfile")]),a._v(" "),s("p",[a._v("Dockerfile 由一行行命令语句组成：")]),a._v(" "),s("ul",[s("li",[a._v("每条指令保留字都必须为大写字母且后面要跟随至少一个参数")]),a._v(" "),s("li",[s("code",[a._v("#")]),a._v(" 表示注释")]),a._v(" "),s("li",[a._v("指令按照从上到下，顺序执行")]),a._v(" "),s("li",[a._v("每条指令都会创建一个新的镜像层，并对镜像进行提交")])]),a._v(" "),s("p",[a._v("通常，Dockerfile 分为四部分：基础镜像信息、维护者信息、镜像操作指令和容器启动时执行指令。")]),a._v(" "),s("h2",{attrs:{id:"指令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#指令"}},[a._v("#")]),a._v(" 指令")]),a._v(" "),s("p",[a._v("指令的一般格式为 "),s("code",[a._v("INSTRUCTION arguments")]),a._v("，指令包括 FROM、MAINTAINER、RUN 等。")]),a._v(" "),s("h3",{attrs:{id:"from"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#from"}},[a._v("#")]),a._v(" FROM")]),a._v(" "),s("p",[a._v("格式为 "),s("code",[a._v("FROM <image>")]),a._v(" 或 "),s("code",[a._v("FROM <image>:<tag>")]),a._v("。")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("FROM")]),a._v(" centos"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("6\n")])])]),s("p",[a._v("FROM 指令会初始化一个新的构建阶段，并为后续指令设置基础镜像。")]),a._v(" "),s("p",[a._v("所以，一个正确的 Dockerfile 文件的第一条指令必须为 FROM 指令。如果在同一个文件中创建多个镜像时，可以使用多个 FROM 指令（每个镜像一次）。")]),a._v(" "),s("h3",{attrs:{id:"maintainer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#maintainer"}},[a._v("#")]),a._v(" MAINTAINER")]),a._v(" "),s("p",[a._v("格式为 "),s("code",[a._v("MAINTAINER <name>")]),a._v("，指定维护者信息。")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("MAINTAINER")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Kisstar <dwh.chn@foxmail.com>"')]),a._v("\n")])])]),s("p",[a._v("根据官方文档，不推荐再使用 MAINTAINER 指令。相反，应该可以使用 LABEL 指令来定义生成的镜像的作者。")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("LABEL")]),a._v(" maintainer="),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Kisstar <dwh.chn@foxmail.com>"')]),a._v("\n")])])]),s("p",[a._v("LABEL 指令更加灵活，允许设置元数据，并且可以使用 "),s("code",[a._v("docker inspect")]),a._v(" 命令轻松查看。")]),a._v(" "),s("h3",{attrs:{id:"label"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#label"}},[a._v("#")]),a._v(" LABEL")]),a._v(" "),s("p",[a._v("LABEL 指令将元数据添加到镜像中。格式为键值对：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("LABEL")]),a._v(" <key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v("=<value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v(" <key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v("=<value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("...")]),a._v("\n")])])]),s("p",[a._v("要在标签值中包含空格，请使用引号和反斜杠，就像在命令行解析中一样。一些用法示例：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("LABEL")]),a._v(" version="),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"1.0"')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("LABEL")]),a._v(" description="),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"This text illustrates \\\nthat label-values can span multiple lines."')]),a._v("\n")])])]),s("p",[a._v("基镜像或父镜像（起始行中的镜像）中包含的标签会被镜像继承。如果标签已存在但具有不同的值，则最近应用的值将覆盖以前设置的任何值。")]),a._v(" "),s("p",[a._v("要查看镜像的 LABEL，可以使用 "),s("code",[a._v("docker image inspect")]),a._v(" 命令。通过 "),s("code",[a._v("--format")]),a._v(" 选项仅显示标签；")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[a._v("docker image inspect "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("format="),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("''")]),a._v(" centos\n")])])]),s("h3",{attrs:{id:"run"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#run"}},[a._v("#")]),a._v(" RUN")]),a._v(" "),s("p",[a._v("容器构建时需要运行的命令。")]),a._v(" "),s("p",[a._v("格式为：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("RUN")]),a._v(" <command"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# or")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("RUN")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"executable"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"param1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"param2"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("p",[a._v("前者将在 "),s("code",[a._v("shell")]),a._v(" 终端中运行命令，即 "),s("code",[a._v("/bin/sh -c")]),a._v("；后者则使用 "),s("code",[a._v("exec")]),a._v(" 执行。")]),a._v(" "),s("p",[a._v("指定使用其它终端可以通过第二种方式实现，例如：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("RUN")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/bin/bash"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"-c"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"echo hello"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("p",[a._v("每条 RUN 指令将在当前镜像基础上执行指定命令，并提交为新的镜像。当命令较长时可以使用 "),s("code",[a._v("\\")]),a._v(" 来换行。")]),a._v(" "),s("h3",{attrs:{id:"expose"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#expose"}},[a._v("#")]),a._v(" EXPOSE")]),a._v(" "),s("p",[a._v("仅仅只是声明端口，告诉 Docker 服务端容器暴露的端口号，供互联系统使用。")]),a._v(" "),s("p",[a._v("格式为：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("EXPOSE")]),a._v(" <port"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("<port"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("...")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("p",[a._v("在利用 -P 参数来启动容器时，也就是 "),s("code",[a._v("docker run -P")]),a._v(" 时，主机会自动随机分配一个端口映射到 EXPOSE 的端口。")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("EXPOSE")]),a._v(" 8080\n")])])]),s("h3",{attrs:{id:"workdir"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#workdir"}},[a._v("#")]),a._v(" WORKDIR")]),a._v(" "),s("p",[a._v("格式为 "),s("code",[a._v("WORKDIR /path/to/workdir")]),a._v("。")]),a._v(" "),s("p",[a._v("通过该指令可以为后续的 RUN、CMD、ENTRYPOINT 指令配置工作目录。")]),a._v(" "),s("p",[a._v("可以使用多个 WORKDIR 指令，后续命令如果参数是相对路径，则会基于之前命令指定的路径。例如")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("WORKDIR")]),a._v(" /a\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("WORKDIR")]),a._v(" b\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("WORKDIR")]),a._v(" c\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("RUN")]),a._v(" pwd\n")])])]),s("p",[a._v("则最终路径为 "),s("code",[a._v("/a/b/c")]),a._v("。")]),a._v(" "),s("p",[a._v("用 WORKDIR 指定的工作目录，会在构建镜像的每一层中都存在。（WORKDIR 指定的工作目录，必须是提前创建好的）。")]),a._v(" "),s("h3",{attrs:{id:"env"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#env"}},[a._v("#")]),a._v(" ENV")]),a._v(" "),s("p",[a._v("指定一个环境变量，在后续的指令中，可以使用这个环境变量，并在容器运行时保持。")]),a._v(" "),s("p",[a._v("格式为 "),s("code",[a._v("ENV <key> <value>")]),a._v("。例如：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENV")]),a._v(" NODE_VERSION 7.2.0\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("RUN")]),a._v(" curl "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("SLO "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz"')]),a._v(" \\\n  && curl "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("SLO "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc"')]),a._v("\n")])])]),s("p",[a._v("示例中设置 "),s("code",[a._v("NODE_VERSION = 7.2.0")]),a._v("，在后续的指令中可以通过 $NODE_VERSION 来引用。")]),a._v(" "),s("h3",{attrs:{id:"add"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#add"}},[a._v("#")]),a._v(" ADD")]),a._v(" "),s("p",[a._v("ADD 指令和 COPY 的使用格式一致（同样需求下，官方推荐使用 COPY）。功能也类似，不同之处如下：")]),a._v(" "),s("ul",[s("li",[a._v("ADD 的优点：在执行 <源文件> 为 "),s("code",[a._v("tar")]),a._v(" 压缩文件的话，压缩格式为 "),s("code",[a._v("gzip")]),a._v(", "),s("code",[a._v("bzip2")]),a._v(" 以及 "),s("code",[a._v("xz")]),a._v(" 的情况下，会自动复制并解压到 <目标路径>。")]),a._v(" "),s("li",[a._v("ADD 的缺点：在不解压的前提下，无法复制 "),s("code",[a._v("tar")]),a._v(" 压缩文件。会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。具体是否使用，可以根据是否需要自动解压来决定。")])]),a._v(" "),s("p",[a._v("格式为：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ADD")]),a._v(" <src"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v(" <dest"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v("\n")])])]),s("p",[a._v("该命令将复制指定的 "),s("code",[a._v("<src>")]),a._v(" 到容器中的 "),s("code",[a._v("<dest>")]),a._v("。 其中 "),s("code",[a._v("<src>")]),a._v(" 可以是 Dockerfile 所在目录的一个相对路径；也可以是一个 URL；还可以是一个 "),s("code",[a._v("tar")]),a._v(" 文件（自动解压为目录）。")]),a._v(" "),s("h3",{attrs:{id:"copy"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#copy"}},[a._v("#")]),a._v(" COPY")]),a._v(" "),s("p",[a._v("复制指令，从上下文目录中复制文件或者目录到容器里指定路径。")]),a._v(" "),s("p",[a._v("格式为：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("COPY")]),a._v(" <src"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v(" <dest"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v("\n")])])]),s("p",[a._v("复制本地主机的 "),s("code",[a._v("<src>")]),a._v("（为 Dockerfile 所在目录的相对路径）到容器中的 "),s("code",[a._v("<dest>")]),a._v("。")]),a._v(" "),s("p",[a._v("当使用本地目录为源目录时，推荐使用 COPY。")]),a._v(" "),s("h3",{attrs:{id:"volume"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#volume"}},[a._v("#")]),a._v(" VOLUME")]),a._v(" "),s("p",[a._v("定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。它可以避免重要的数据，因容器重启而丢失，也可以避免容器不断变大：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("VOLUME")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"<路径1>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"<路径2>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("...")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("VOLUME")]),a._v(" <路径"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")]),a._v("\n")])])]),s("p",[a._v("在启动容器的时候，我们可以通过 "),s("code",[a._v("-v")]),a._v(" 参数修改挂载点。")]),a._v(" "),s("h3",{attrs:{id:"cmd"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cmd"}},[a._v("#")]),a._v(" CMD")]),a._v(" "),s("p",[a._v("为启动的容器指定默认要运行的程序，程序运行结束，容器也就结束。")]),a._v(" "),s("p",[a._v("类似于 RUN 指令，但 RUN 是在 "),s("code",[a._v("docker build")]),a._v(" 时运行，而 CMD 在 "),s("code",[a._v("docker run")]),a._v(" 时运行。")]),a._v(" "),s("p",[a._v("支持三种格式：")]),a._v(" "),s("ul",[s("li",[a._v("使用 exec 执行："),s("code",[a._v('CMD ["executable","param1","param2"]')])]),a._v(" "),s("li",[a._v("在 "),s("code",[a._v("/bin/sh")]),a._v(" 中执行，提供给需要交互的应用："),s("code",[a._v("CMD command param1 param2")])]),a._v(" "),s("li",[a._v("提供给 ENTRYPOINT 的默认参数："),s("code",[a._v('CMD ["param1","param2"]')])])]),a._v(" "),s("p",[a._v("如果用户启动容器时候指定了运行的命令，则会覆盖掉 CMD 指定的命令。")]),a._v(" "),s("p",[a._v("::: waring")]),a._v(" "),s("p",[a._v("如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。")]),a._v(" "),s("p",[a._v(":::")]),a._v(" "),s("h3",{attrs:{id:"entrypoint"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#entrypoint"}},[a._v("#")]),a._v(" ENTRYPOINT")]),a._v(" "),s("p",[a._v("配置容器启动后执行的命令。")]),a._v(" "),s("p",[a._v("与 CMD 不同，它不会被 "),s("code",[a._v("docker run")]),a._v(" 提供的参数覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序。")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENTRYPOINT")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"executable"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"param1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"param2"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# or")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENTRYPOINT")]),a._v(" command param1 param2（shell 中执行）\n")])])]),s("p",[a._v("如果运行 "),s("code",[a._v("docker run")]),a._v(" 时使用了 "),s("code",[a._v("--entrypoint")]),a._v(" 选项，此选项的参数可当作要运行的程序覆盖 ENTRYPOINT 指令指定的程序。")]),a._v(" "),s("p",[a._v("::: waring")]),a._v(" "),s("p",[a._v("每个 Dockerfile 中只能有一个 ENTRYPOINT，当指定多个时，只有最后一个起效。")]),a._v(" "),s("p",[a._v(":::")]),a._v(" "),s("h3",{attrs:{id:"onbuild"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#onbuild"}},[a._v("#")]),a._v(" ONBUILD")]),a._v(" "),s("p",[a._v("配置当所创建的镜像作为其它新创建镜像的基础镜像时，所执行的操作指令。")]),a._v(" "),s("p",[a._v("格式为 "),s("code",[a._v("ONBUILD [INSTRUCTION]")]),a._v("。")]),a._v(" "),s("p",[a._v("例如，Dockerfile 使用如下的内容创建了镜像 "),s("code",[a._v("image-P")]),a._v("：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ONBUILD")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ADD")]),a._v(" . /app/src\n")])])]),s("p",[a._v("新的 Dockerfile 中使用 "),s("code",[a._v("FROM image-A")]),a._v(" 指定基础镜像时，会自动执行 ONBUILD 指令内容，等价于在后面添加了一条指令：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("FROM")]),a._v(" image"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("A\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#Automatically run the following")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ADD")]),a._v(" . /app/src\n")])])]),s("h2",{attrs:{id:"案例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#案例"}},[a._v("#")]),a._v(" 案例")]),a._v(" "),s("p",[a._v("自定义 "),s("code",[a._v("tomcat")]),a._v(" 镜像：")]),a._v(" "),s("div",{staticClass:"language-dockerfile extra-class"},[s("pre",{pre:!0,attrs:{class:"language-dockerfile"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("FROM")]),a._v(" centos\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("LABEL")]),a._v(" maintainer="),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Kisstar <dwh.chn@foxmail.com>"')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 添加 Java 和 tomcat 到容器")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ADD")]),a._v(" jdk"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("8u171"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("linux"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("x64.tar.gz /usr/local/\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ADD")]),a._v(" apache"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("tomcat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("9.0.8.tar.gz /usr/local/\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 配置 Java 和 tomcat 环境变量")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENV")]),a._v(" JAVA_HOME /usr/local/jdk1.8.0_171\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENV")]),a._v(" CLASSPATH $JAVA_HOME/lib/dt.jar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("$JAVA_HOME/lib/tools.jar\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENV")]),a._v(" CATALINA_HOME /usr/local/apache"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("tomcat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("9.0.8\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENV")]),a._v(" CATALINA_BASE /usr/local/apache"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("tomcat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("9.0.8\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENV")]),a._v(" PATH $PATH"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("$JAVA_HOME/bin"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("$CATALINA_HOME/lib"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("$CATALINA_HOME/bin\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("ENV")]),a._v(" WD /usr/local\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 设置工作路径")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("WORKDIR")]),a._v(" $WD\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 安装 vim 编辑器")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("RUN")]),a._v(" yum "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("y install vim\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 容器运行时监听的端口")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("EXPOSE")]),a._v("  8080\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 启动时运行tomcat")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# ENTRYPOINT [")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/usr/local/apache-tomcat-9.0.8/bin/startup.sh"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# CMD [")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/usr/local/apache-tomcat-9.0.8/bin/catalina.sh"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"run"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("CMD")]),a._v(" /usr/local/apache"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("tomcat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("9.0.8/bin/startup.sh && tail "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("F /usr/local/apache"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("tomcat"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("-")]),a._v("9.0.8/bin/logs/catalina.out\n")])])]),s("h2",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[a._v("#")]),a._v(" 参考")]),a._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://docs.docker.com/engine/reference/builder/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Dockerfile reference | Docker Documentation"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://www.runoob.com/docker/docker-dockerfile.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("Docker Dockerfile | 菜鸟教程"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://wiki.jikexueyuan.com/project/docker-technology-and-combat/instructions.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("指令 - Docker —— 从入门到实践 - 极客学院 Wiki"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=r.exports}}]);