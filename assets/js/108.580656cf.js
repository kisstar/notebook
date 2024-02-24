(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{522:function(s,a,t){"use strict";t.r(a);var e=t(62),r=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"docker-私有仓库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker-私有仓库"}},[s._v("#")]),s._v(" Docker 私有仓库")]),s._v(" "),t("p",[s._v("在工作中，一些公司的私有镜像或则其它个人镜像并不想提交到公开的仓库中，为了方便对这些镜像进行管理，Docker 不仅提供了一个中央仓库，同时也允许我们搭建本地私有仓库。")]),s._v(" "),t("h2",{attrs:{id:"私有仓库搭建"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#私有仓库搭建"}},[s._v("#")]),s._v(" 私有仓库搭建")]),s._v(" "),t("p",[s._v("Docker 官方提供了一个搭建私有仓库的镜像 "),t("code",[s._v("registry")]),s._v("，运行该镜像并暴露 5000 端口，就可以使用了。")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 拉取私有仓库镜像")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull registry\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动私有仓库容器")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -id --name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("registry -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),s._v(":5000 registry\n")])])]),t("p",[s._v("现在，打开浏览器输入地址 "),t("code",[s._v("http://私有仓库服务器IP:5000/v2/_catalog")]),s._v("，看到 "),t("code",[s._v('{"repositories":[]}')]),s._v(" 表示私有仓库搭建成功。")]),s._v(" "),t("p",[s._v("接着，让 Docker 信任私有仓库地址：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/docker/daemon.json\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v('# { "insecure-registries": ["私有仓库服务器IP:5000"] }')]),s._v("\n")])])]),t("p",[s._v("设置完成后，需要重启一下 Docker，同时不要忘记启动私有仓库容器：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("systemctl restart "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" start registry\n")])])]),t("h2",{attrs:{id:"将镜像上传至私有仓库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#将镜像上传至私有仓库"}},[s._v("#")]),s._v(" 将镜像上传至私有仓库")]),s._v(" "),t("p",[s._v("标记本地镜像，将其归入私有仓库：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" tag centos 私有仓库服务器IP:5000/centos\n")])])]),t("p",[s._v("将本地的镜像上传到镜像仓库：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker push [OPTIONS] NAME[:TAG]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" push 私有仓库服务器IP:5000/centos\n")])])]),t("p",[s._v("Registry 服务默认会将上传的镜像保存在容器的 "),t("code",[s._v("/var/lib/registry")]),s._v(" 目录，所以在启动时我们可以将主机的 "),t("code",[s._v("/opt/registry")]),s._v(" 目录挂载到该目录。")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看已上传镜像信息")]),s._v("\n$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" registry "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" /var/lib/registry/docker/registry/v2/repositories\ncentos\n")])])]),t("h2",{attrs:{id:"从私有仓库拉取镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#从私有仓库拉取镜像"}},[s._v("#")]),s._v(" 从私有仓库拉取镜像")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 拉取镜像")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull 私有仓库服务器IP:5000/centos\n")])])]),t("h2",{attrs:{id:"harbor"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#harbor"}},[s._v("#")]),s._v(" Harbor")]),s._v(" "),t("p",[s._v("Harbor 是一个用于存储和分发 Docker 镜像的企业级 Registry 服务器。")]),s._v(" "),t("p",[s._v("官方提供的私有仓库 "),t("code",[s._v("registry")]),s._v(" 服务，功能比较简单。Harbor 则基于该服务增加了一些安全、访问控制、管理的功能以满足企业对于镜像仓库的需求。")]),s._v(" "),t("p",[s._v("要使用 Harbor 首先需要在 "),t("a",{attrs:{href:"https://github.com/goharbor/harbor/releases",target:"_blank",rel:"noopener noreferrer"}},[s._v("Harbor releases page"),t("OutboundLink")],1),s._v(" 下载你需要的版本（online 和 offline 的区别是后者包含需要的镜像文件）。")]),s._v(" "),t("p",[s._v("以 "),t("code",[s._v("offline")]),s._v(" 版为例，接着使用 "),t("code",[s._v("tar")]),s._v(" 解压安装包：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" xvf harbor-offline-installer-version.tgz\n")])])]),t("p",[s._v("随后，编辑 "),t("code",[s._v("harbor.yml")]),s._v(" 文件，根据情况修改 "),t("code",[s._v("hostname")]),s._v("、"),t("code",[s._v("post")]),s._v("、存储目录等配置。")]),s._v(" "),t("p",[s._v("最后，通过运行 "),t("code",[s._v("install.sh")]),s._v(" 构建镜像，并把服务启动起来。")]),s._v(" "),t("p",[s._v("详细的按照过程可以查看"),t("a",{attrs:{href:"https://github.com/goharbor/harbor/blob/master/docs/install-config/_index.md",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方的说明"),t("OutboundLink")],1),s._v("。")]),s._v(" "),t("h2",{attrs:{id:"参考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[s._v("#")]),s._v(" 参考")]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://www.cnblogs.com/hellxz/p/install_harbor.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("安装 Harbor 管理镜像服务 - 东北小狐狸 - 博客园"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=r.exports}}]);