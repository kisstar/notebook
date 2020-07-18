(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{473:function(a,s,t){"use strict";t.r(s);var n=t(25),e=Object(n.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"基础命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基础命令"}},[a._v("#")]),a._v(" 基础命令")]),a._v(" "),t("p",[a._v("在 Docker 客户端，可以通过命令来操控 Docker 来完成指定的任务，其格式通常为：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" COMMAND "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("arg"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("h2",{attrs:{id:"帮助命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#帮助命令"}},[a._v("#")]),a._v(" 帮助命令")]),a._v(" "),t("p",[a._v("显示 Docker 版本信息：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker version\n")])])]),t("p",[a._v("显示 Docker 系统信息，包括镜像和容器数：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker info\n")])])]),t("p",[a._v("显示命令的帮助信息：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("COMMAND"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" --help\n")])])]),t("h2",{attrs:{id:"镜像命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#镜像命令"}},[a._v("#")]),a._v(" 镜像命令")]),a._v(" "),t("p",[t("strong",[a._v("列出本地镜像")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker images "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("REPOSITORY"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(":TAG"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n\nREPOSITORY          TAG                 IMAGE ID            CREATED             SIZE\nhello-world         latest              bf756fb1ae65        "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),a._v(" months ago        "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("13")]),a._v(".3kB\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 镜像的仓库源      镜像的标签           镜像 ID             创建的时间          镜像大小")]),a._v("\n")])])]),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("-a: 列出本地所有的镜像（含中间映像层，默认情况下，过滤掉中间映像层）")]),a._v(" "),t("li",[a._v("-q: 只显示镜像 ID")]),a._v(" "),t("li",[a._v("--digests: 显示镜像的摘要信息")]),a._v(" "),t("li",[a._v("--no-trunc: 显示完整的镜像信息")]),a._v(" "),t("li",[a._v("-f: 显示满足条件的镜像")])]),a._v(" "),t("p",[a._v("对于标签，如果不明确指定将默认为 "),t("code",[a._v("latest")]),a._v("，例如你只使用 "),t("code",[a._v("ubuntu")]),a._v("，Docker 将默认使用 "),t("code",[a._v("ubuntu:latest")]),a._v("。")]),a._v(" "),t("p",[t("strong",[a._v("从 Docker Hub 查找镜像")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker search "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" IMAGE\n")])])]),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("-s: 列出收藏数不小于指定值的镜像")]),a._v(" "),t("li",[a._v("--no-trunc: 显示完整的镜像描述")]),a._v(" "),t("li",[a._v("--automated: 只列出 "),t("code",[a._v("automated build")]),a._v(" 类型的镜像")])]),a._v(" "),t("p",[t("strong",[a._v("从镜像仓库中拉取或者更新指定镜像")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker pull "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" NAME"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(":TAG"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v("@DIGEST"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("-a: 拉取所有 "),t("code",[a._v("tagged")]),a._v(" 镜像")]),a._v(" "),t("li",[a._v("--disable-content-trust: 忽略镜像的校验，默认开启")])]),a._v(" "),t("p",[a._v("如拉取最新的 "),t("code",[a._v("centos")]),a._v(" 镜像：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker pull centos\n")])])]),t("p",[t("strong",[a._v("删除本地一个或多少镜像")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker rmi "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" IMAGE "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("IMAGE"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("-f: 强制删除（如：如果有容器正在使用该镜像，可以通过此强制删除）")]),a._v(" "),t("li",[a._v("--no-prune: 不移除该镜像的过程镜像，默认移除")])]),a._v(" "),t("p",[a._v("如删除全部镜像：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker rmi -f "),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),a._v("docker images -aq"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("\n")])])]),t("h2",{attrs:{id:"容器命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#容器命令"}},[a._v("#")]),a._v(" 容器命令")]),a._v(" "),t("p",[t("strong",[a._v("创建一个新的容器并运行一个命令")]),a._v(":")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker run "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" IMAGE "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("COMMAND"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("ARG"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("--name: 为容器指定一个名称")]),a._v(" "),t("li",[a._v("-i: 以交互模式运行容器")]),a._v(" "),t("li",[a._v("-t: 为容器重新分配一个伪输入终端")]),a._v(" "),t("li",[a._v("-d: 后台运行容器，并返回容器 ID")]),a._v(" "),t("li",[a._v("-P: 随机端口映射，容器内部端口随机映射到主机的端口")]),a._v(" "),t("li",[a._v("-p: 指定端口映射，格式为：主机(宿主)端口:容器端口")])]),a._v(" "),t("p",[a._v("根据上面拉取的 "),t("code",[a._v("centos")]),a._v(" 镜像创建一个容器：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker run -it centos\n")])])]),t("p",[a._v("在容器中使用命令 "),t("code",[a._v("exit")]),a._v(" 可以退出并关闭容器，如果想只退出但保持容器的运行的话，可以使用："),t("code",[a._v("Ctrl + p + q")]),a._v("。")]),a._v(" "),t("p",[a._v("当然，也可以直接以后台运行的模式启动一个容器：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker run -d centos\n")])])]),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[a._v("WARNING")]),a._v(" "),t("p",[a._v("如果直接运行上面的命令，容器启动后会自动退出，因为 Docker 容器在后台运行，就必须对应有一个前台进程。")])]),a._v(" "),t("p",[a._v("通常，后台运行一个容器时会将运行的程序以前台进程的形式运行。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker run -d --name mycentos centos /bin/sh -c "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"while true; do echo Hello world; sleep 2; done"')]),a._v("\n")])])]),t("p",[t("strong",[a._v("列出容器")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n\nCONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES\nd3b9c4580162        centos              "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/bin/bash"')]),a._v("         "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v(" minutes ago       Up "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v(" minutes                            focused_curie\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 容器 ID           使用的镜像           启动容器时运行的命令 容器的创建时间      容器状态      端口信息和使用的连接类型  容器名称")]),a._v("\n")])])]),t("p",[a._v("容器的状态包括：created（已创建）、restarting（重启中）、running（运行中）、removing（迁移中）、paused（暂停）、exited（停止）、dead（死亡）。")]),a._v(" "),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("-a: 显示所有的容器，包括未运行的")]),a._v(" "),t("li",[a._v("-l: 显示最近创建的容器")]),a._v(" "),t("li",[a._v("-n: 列出最近创建的 n 个容器")]),a._v(" "),t("li",[a._v("-q: 静默模式，只显示容器编号")]),a._v(" "),t("li",[a._v("-f: 根据条件过滤显示的内容")]),a._v(" "),t("li",[a._v("--format: 指定返回值的模板文件")]),a._v(" "),t("li",[a._v("--no-trunc: 不截断输出")]),a._v(" "),t("li",[a._v("-s: 显示总的文件大小")])]),a._v(" "),t("p",[t("strong",[a._v("重启/停止/启动容器")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 重启容器")]),a._v("\ndocker restart "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("CONTAINER"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 停止一个运行中的容器")]),a._v("\ndocker stop "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("CONTAINER"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 启动一个或多个已经被停止的容器")]),a._v("\ndocker start "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("CONTAINER"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[a._v("强制停止可以使用，或者说杀掉一个运行中的容器：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("kill")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("CONTAINER"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[t("strong",[a._v("删除一个或多个容器")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("CONTAINER"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("-f: 通过 SIGKILL 信号强制删除一个运行中的容器")]),a._v(" "),t("li",[a._v("-l: 移除容器间的网络连接，而非容器本身")]),a._v(" "),t("li",[a._v("-v: 删除与容器关联的卷")])]),a._v(" "),t("p",[a._v("删除多个容器除了一个个列举外，也可以参考下面的命令：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" -f "),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" -aq"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 或者")]),a._v("\ndocker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" -aq "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("xargs")]),a._v(" docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v("\n")])])]),t("h2",{attrs:{id:"其它"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#其它"}},[a._v("#")]),a._v(" 其它")]),a._v(" "),t("p",[t("strong",[a._v("获取容器的日志")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker logs "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER\n")])])]),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("-f: 跟踪日志输出")]),a._v(" "),t("li",[a._v("-t: 显示时间戳")]),a._v(" "),t("li",[a._v("--tail: 仅列出最新 N 条容器日志")]),a._v(" "),t("li",[a._v("--since: 显示某个开始时间的所有日志")])]),a._v(" "),t("p",[a._v("如查看容器 "),t("code",[a._v("mycentos")]),a._v(" 从 2020 年 1 月 1 日后的最新 10 条日志：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker logs --since"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"2020-01-01"')]),a._v(" --tail"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("10")]),a._v(" mycentos\n")])])]),t("p",[t("strong",[a._v("查看容器内的进程")]),a._v("：")]),a._v(" "),t("p",[a._v("容器运行时不一定有 "),t("code",[a._v("/bin/bash")]),a._v(" 终端来交互执行 "),t("code",[a._v("top")]),a._v(" 命令，而且容器还不一定有 "),t("code",[a._v("top")]),a._v(" 命令，因此可以使用下面的命令来查看容器中正在运行的进程：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("top")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("ps OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[t("strong",[a._v("获取容器/镜像的元数据")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker inspect "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" NAME"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v("ID "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("NAME"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v("ID"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("."),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[a._v("常用选项：")]),a._v(" "),t("ul",[t("li",[a._v("-s: 显示总的文件大小")]),a._v(" "),t("li",[a._v("-f: 指定返回值的模板文件")]),a._v(" "),t("li",[a._v("--type: 为指定类型返回 JSON")])]),a._v(" "),t("p",[t("strong",[a._v("连接到正在运行中的容器")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker attach "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER\n")])])]),t("p",[a._v("使用下面的命令可以达到同样的目的：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("exec")]),a._v(" -it mycentos /bin/bash\n")])])]),t("p",[a._v("通过 "),t("code",[a._v("docker exec")]),a._v(" 还可以直接在运行的容器中执行命令而不用进入容器。")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("exec")]),a._v(" -t mycentos "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v("\n")])])]),t("p",[a._v("也就是说 "),t("code",[a._v("attach")]),a._v(" 是直接进入容器启动命令的终端，不会启动新的进程；而 "),t("code",[a._v("exec")]),a._v(" 是在容器中打开新的终端，并且可以启动新的进程。")]),a._v(" "),t("p",[t("strong",[a._v("拷贝容器内的文件到主机上")]),a._v("：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("cp")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("OPTIONS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" CONTAINER:SRC_PATH DEST_PATH\n")])])]),t("p",[a._v("比如将容器 "),t("code",[a._v("96f7f14e99ab")]),a._v(" 的 "),t("code",[a._v("/www")]),a._v(" 目录拷贝到主机的 "),t("code",[a._v("/tmp")]),a._v(" 目录中：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("docker "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("cp")]),a._v("  96f7f14e99ab:/www /tmp/\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);