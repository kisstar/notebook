(window.webpackJsonp=window.webpackJsonp||[]).push([[257],{670:function(a,s,t){"use strict";t.r(s);var e=t(62),n=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"认识-nginx"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#认识-nginx"}},[a._v("#")]),a._v(" 认识 Nginx")]),a._v(" "),t("p",[a._v("Nginx 是一款是由俄罗斯的程序设计师 Igor Sysoev 所开发高性能的 Web 和反向代理服务器，也是一个 IMAP/POP3/SMTP 代理服务器。")]),a._v(" "),t("h2",{attrs:{id:"代理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#代理"}},[a._v("#")]),a._v(" 代理")]),a._v(" "),t("p",[a._v("代理包括正向代理和反向代理。")]),a._v(" "),t("p",[t("strong",[a._v("正向代理")]),a._v("是一个位于客户端和目标服务器之间的服务器，为了从目标服务器取得内容，客户端向代理发送一个请求并指定目标，然后代理向目标服务器转交请求并将获得的内容返回给客户端。")]),a._v(" "),t("p",[a._v("客户端必须要进行一些特别的设置才能使用正向代理。")]),a._v(" "),t("p",[a._v("正向代理的用途：")]),a._v(" "),t("ul",[t("li",[a._v("访问原来无法访问的资源")]),a._v(" "),t("li",[a._v("可以做缓存，加速访问资源")])]),a._v(" "),t("p",[t("strong",[a._v("反向代理")]),a._v("是一种可以集中地调用内部服务，并提供统一接口给公共客户的 Web 服务器。")]),a._v(" "),t("p",[a._v("反向代理实际运行方式是指以代理服务器来接受连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给请求连接的客户端，此时代理服务器对外就表现为一个服务器。")]),a._v(" "),t("p",[a._v("可以看出反向代理对外都是透明的，访问者者并不知道自己访问的是一个代理。因为客户端不需要任何配置就可以访问。")]),a._v(" "),t("p",[a._v("反向代理的作用：")]),a._v(" "),t("ul",[t("li",[a._v("保证内网的安全。隐藏后端服务器的信息，屏蔽黑名单中的 IP，限制每个客户端的连接数")]),a._v(" "),t("li",[a._v("提高可扩展性和灵活性。客户端只能看到反向代理服务器的 IP，这使你可以增减服务器或者修改它们的配置")]),a._v(" "),t("li",[a._v("缓存。直接返回命中的缓存结果")]),a._v(" "),t("li",[a._v("静态内容直接返回")]),a._v(" "),t("li",[a._v("负载均衡，通过反向代理服务器来优化网站的负载")])]),a._v(" "),t("h2",{attrs:{id:"负载均衡"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#负载均衡"}},[a._v("#")]),a._v(" 负载均衡")]),a._v(" "),t("p",[a._v("客户端发送多个请求到服务器，服务器处理请求，有一些可能要与数据库进行交互，服务器处理完毕后，再将结果返回给客户端。")]),a._v(" "),t("p",[a._v("这种架构模式对于早期的系统相对单一，并发请求相对较少的情况下是比较适合的，成本也低。")]),a._v(" "),t("p",[a._v("随着信息数量的不断增长，访问量和数据量的飞速增长，以及系统业务的复杂度增加，这种架构会造成服务器相应客户端的请求日益缓慢，并发量特别大的时候，还容易造成服务器直接崩溃。")]),a._v(" "),t("p",[a._v("很明显这是由于服务器性能的瓶颈造成的问题，那么如何解决这种情况呢？")]),a._v(" "),t("p",[a._v("我们首先想到的可能是升级服务器的配置，比如提高 CPU 执行频率，加大内存等提高机器的物理性能来解决此问题，但是我们知道摩尔定律的日益失效，硬件的性能提升已经不能满足日益提升的需求了。")]),a._v(" "),t("p",[a._v("最明显的一个例子，天猫双十一当天，某个热销商品的瞬时访问量是极其庞大的，那么类似上面的系统架构，将机器都增加到现有的顶级物理配置，都是不能够满足需求的。那么怎么办呢？")]),a._v(" "),t("p",[a._v("上面的分析我们去掉了增加服务器物理配置来解决问题的办法，也就是说纵向解决问题的办法行不通了，那么横向增加服务器的数量呢？这时候集群的概念产生了。")]),a._v(" "),t("p",[t("strong",[a._v("单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器上的情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们所说的负载均衡")]),a._v("。")]),a._v(" "),t("h2",{attrs:{id:"动静分离"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#动静分离"}},[a._v("#")]),a._v(" 动静分离")]),a._v(" "),t("p",[a._v("在 Web 开发中，通常来说，静态资源是指 HTML、JavaScript、CSS、图片等文件，而动态资源就是指那些后台资源。")]),a._v(" "),t("p",[a._v("为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度。降低原来单个服务器的压力。")]),a._v(" "),t("img",{attrs:{src:a.$withBase("/images/nginx/dynamic-and-static-separation.png"),alt:"dynamic-and-static-separation"}}),a._v(" "),t("p",[a._v("静态资源可以部署在 Nginx 上，当一个请求来的时候，如果是静态资源的请求，就直接到 Nginx 配置的静态资源目录下面获取资源，如果是动态资源的请求，Nginx 利用反向代理的原理，把请求转发给后台应用去处理，从而实现动静分离。")]),a._v(" "),t("h2",{attrs:{id:"安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[a._v("#")]),a._v(" 安装")]),a._v(" "),t("p",[a._v("在官网中提供了详尽的"),t("a",{attrs:{href:"https://nginx.org/en/download.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("安装介绍"),t("OutboundLink")],1),a._v("，这里我们以 "),t("code",[a._v("centos")]),a._v(" 系统的 "),t("a",{attrs:{href:"https://nginx.org/en/linux_packages.html#RHEL-CentOS",target:"_blank",rel:"noopener noreferrer"}},[a._v("Nginx 安装"),t("OutboundLink")],1),a._v(" 为例。")]),a._v(" "),t("p",[a._v("首先通过创建 "),t("code",[a._v("/etc/yum.repos.d/nginx.repo")]),a._v(" 文件，并写入下面的内容来设置 Nginx 的 "),t("code",[a._v("yum")]),a._v(" 仓库：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("nginx-stable"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("name")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("nginx stable repo\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("baseurl")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("http://nginx.org/packages/centos/"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$releasever")]),a._v("/"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$basearch")]),a._v("/\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("gpgcheck")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("enabled")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("gpgkey")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("https://nginx.org/keys/nginx_signing.key\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("module_hotfixes")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("true\n")])])]),t("p",[a._v("注意这里的 "),t("code",[a._v("$releasever")]),a._v(" 要改为当前系统的版本号，比如 "),t("code",[a._v("centos 7")]),a._v(" 就需要把 "),t("code",[a._v("$releasever")]),a._v(" 改成 7。")]),a._v(" "),t("p",[a._v("然后，执行下面的命令安装 Nginx：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("yum "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" nginx\n")])])]),t("p",[a._v("最后，检查是否安装成功：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("$ nginx -v\nnginx version: nginx/1.18.0\n")])])]),t("h2",{attrs:{id:"启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#启动"}},[a._v("#")]),a._v(" 启动")]),a._v(" "),t("p",[a._v("使用 "),t("code",[a._v("systemctl")]),a._v(" 命令进行启动：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("systemctl start nginx\n")])])]),t("p",[a._v("启动后通过 "),t("code",[a._v("curl http://localhost")]),a._v(" 就可以查看到网页的内容。为了让其它机器可以访问到，我们还需要开发 80 端口：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# --permanent 表示永久生效")]),a._v("\nfirewall-cmd --add-service"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("http --permanent\nfirewall-cmd --add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("80")]),a._v("/tcp --permanent\n")])])]),t("p",[a._v("设置完成后，重启防火墙：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("firewall-cmd -–reload\n")])])]),t("p",[a._v("查看开放的端口号：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("firewall-cmd --list-all\n")])])]),t("p",[a._v("现在，局域网中的电脑就可以通过输入 IP 来进行访问了。")]),a._v(" "),t("h2",{attrs:{id:"常用命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[a._v("#")]),a._v(" 常用命令")]),a._v(" "),t("p",[a._v("查看版本：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("nginx -v\n")])])]),t("p",[a._v("检查配置文件：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("nging -t\n")])])]),t("p",[a._v("指定配置文件：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("nginx -c path/to/config-file "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 默认为 /etc/nginx/nginx.conf")]),a._v("\n")])])]),t("p",[a._v("重新加载：")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("nginx -s reload\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);