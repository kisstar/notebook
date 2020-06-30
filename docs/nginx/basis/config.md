# 配置

Nginx 的配置可以分为三大块：全局块、Events 块和 Http 块。

## 全局快

全局快包含从配置文件开始到 `events` 块之间的内容，主要是设置一些影响 Nginx 服务器整体运行的配置指令。

在全局快中主要配置运行 Nginx 服务器的用户（组），允许生成的 Worker Process 数、进程 PID、日志存放路径和类型以及配置文件的引入等。

例如：

```bash
worker_processes  1;
```

这是 Nginx 服务器并发处理服务的关键配置，`worker_processes` 值越大，可以支持的并发处理量也越多，但是会受到硬件、软件等设备的制约

## events

Events 块涉及的指令主要影响 Nginx 服务器与用户的网络连接。

常用的设置包括是否开启对多 Worker Process 下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 Worker Process 可以同时支持的最大连接数等。

例如：

```bash
events {
  worker_connections 1024;
}
```

上述例子就表示每个 Worker Process 支持的最大连接数为 1024。

这部分的配置对 Nginx 的性能影响较大，在实际中应该灵活配置。

## http

`http` 块也可以简单分为 `http` 全局块和 `server` 块。

在 `http` 全局块中配置的指令包括文件引入、 MIME-TYPE 定义、日志自定义、连接超时时间、单链接请求数上限等。

`server` 块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。

每个 `http` 块可以包括多个 `server` 块，而每个 `server` 块就相当于一个虚拟主机。

另外，每个 `server` 块也分为全局 `server` 块，以及可以同时包含多个 `locaton` 块。

全局 `server` 块最常见的配置是本虚拟机主机的监听配置和本虚拟主机的名称或 IP 配置。

每个 `server` 块可以配置多个 `location` 块。

`location` 块的主要作用是基于 Nginx 服务器接收到的请求字符串（例如 server_name/uri-string），对虚拟主机名称（也可以是 IP 别名）之外的字符串（例如前面的 /uri-string）进行匹配，对特定的请求进行处理。

地址定向、数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行。

### location

```bash
location =   URI
  ┬      ┬    ┬
  │      │    └─────────────── 前缀|正则
  │      └────────────── 可选的修饰符（用于匹配模式及优先级）
  └──────────────── 必须的
```

其中修饰符可以为：

- `=`: 用于不含正则表达式的 URI 前，要求请求字符串与 URI 严格匹配，如果匹配成功就停止向下搜索并立即处理该请求。
- `~`: 用于表示 URI 包含正则表达式，并且区分大小写。
- `~*`: 用于表示 URI 包含正则表达式，并且不区分大小写。
- `^~*`: 用于不含正则表达式的 URI 前，要求 Nginx 服务器找到表示 URI 和请求字符串匹配度最高的 `location` 后，立即使用此 `location` 处理请求，而不再使用 `location` 块中的正则 URI 和请求字符串做匹配。

## 案例

环境：Windows（主机） + centos 7（虚拟机）。

我们可以先关闭掉虚拟机的防火墙，方便主机访问虚拟机上的服务。

```bash
systemctl stop firewalld.service
# 进一步，还可以禁止开机启动
systemctl disable firewalld.service
```

关闭后可以查看防火墙的状态：

```bash
$ firewall-cmd --stat
not running
```

另外，为了能够让 Nginx 正常工作还需要确认停用 SELinux：

```bash
# 关闭
setenforce 0
```

### 反向代理

实现效果：打开浏览器，在浏览器地址栏输入地址 `www.nginx.com/www`，访问到 Linux 系统中启动的 `tomcat` 静态页面。

为了方便，我们这里使用 Docker 来启动 `tomcat`。另外，由于现在的 `tomcat` 镜像启动后，默认的页面是空的，不好确认服务是否确认成功，所以我们先在原有的镜像上加点东西。

```dockerfile
FROM tomcat

RUN mkdir -p mkdir /usr/local/tomcat/webapps/www
RUN echo "Hello Nginx, I'm tomcat 8080" >> /usr/local/tomcat/webapps/www/index.html
```

使用上面的 Dockerfile 文件生成新的 `kisstar/tomcat` 镜像：

```bash
docker build -t kisstar/tomcat .
```

通过该镜像启动：

```bash
docker run -d -p 8080:8080 --name 8080 kisstar/tomcat
```

现在我们通过 IP 就可以访问到上面的内容，假如虚拟机的 IP 为 192.168.1.7，则可以访问 <http://192.168.1.7:8080/www>。

为了可以通过域名来进行访问，我们需要在主机的 `hosts`（Windows 目录：C:\Windows\System32\drivers\etc）下进行配置：

```bash
192.168.1.7 www.nginx.com
```

配置成功后可以通过 <http://www.nginx.com:8080/www/> 访问。

接着就是配置 Nginx：

```bash
cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak
vim /etc/nginx/conf.d/default.conf
```

此处主要是设置监听的服务器名称（server_name）和转发的地址（proxy_pass）：

```bash
server {
    listen       80;
    server_name  192.168.1.7;
    location / {
      proxy_pass http://192.168.1.7:8080;
      root  /www;
      index  index.html index.htm;
    }
}
```

配置完成后重启重载 Nginx：

```bash
nginx -s reload
```

到这里，我们就可以通过 <http://www.nginx.com/www/> 进行访问了。

在上面的例子中，我们直接代理了所有以 `/` 开头的请求到 8080 端口，根据需求，我们还可以根据路径代理到不同的服务里。

比如：访问 `www.nginx.com/www` 转发到 8080 端口，访问 `www.nginx.com/app` 则转发到 8081 端口。

现在，根据上面的镜像我们在 8081 端口新启动一个服务：

```bash
docker run -d -p 8081:8080 --name 8081 kisstar/tomcat
```

为了进行区别，我们改变一下新的容器中的内容：

```bash
docker exec -it 8081 /bin/bash
mv webapps/www webapps/app
echo "Hello Nginx, I'm tomcat 8081" > webapps/app/index.html
```

通过 `Ctrl + p + q` 退出容器，然后开始配置 Nginx：

```nginx
server {
  listen       80;
  server_name  192.168.1.7;
  location ~ /www {
      proxy_pass http://192.168.1.7:8080;
  }
  location ~ /app {
      proxy_pass http://192.168.1.7:8081;
  }
}
```

### 负载均衡

目标：在浏览器中输入地址 <http://www.nginx.com/www/>，通过配置负载均衡，将请求平均分发到 8080 或 8081 端口。

由于现在是要访问同一个路径，所以我们需要在上面的基础上修改一下第二个容器的静态目录路径：

```bash
docker exec 8081 mv /usr/local/tomcat/webapps/app /usr/local/tomcat/webapps/www
```

接着就是配置 Nginx：

```bash
# 添加服务器列表
upstream myserver {
  server  192.168.1.7:8080 weight=1;
  server  192.168.1.7:8081 weight=1;
}
server {
  listen       80;
  server_name  192.168.1.7;

  location ~ / {
    proxy_pass http://myserver; # 代理到配置的服务器列表
    index index.html index.htm;
  }
}
```

配置完成后重载 Nginx，然后访问 <http://www.nginx.com/www/>，快速刷新，会发现返回的内容后交替的出现。这是由于 Nginx 根据我们的配置把请求分配到了不同的服务器上。

负载均衡策略包括：

- **轮询（默认）**

每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器 `down` 掉，会自动剔除。

- **weight**

`weight` 代表权重，默认为 1，权重越高被分配的客户端越多。

指定轮询几率，`weight` 和访问比率成正比，用于后端服务器性能不均的情况。 例如：

```bash
upstream server_pool {
  server  192.168.1.7 weight=10;
  server  192.168.1.8 weight=10;
}
```

- **ip_hash**

每个请求按访问 IP 的 `hash` 结果分配，这样每个访客固定访问一个后端服务器，如此可以解决 `session` 的问题。 例如：

```bash
upstream server_pool {
  ip_hash;
  server 192.168.1.7:80;
  server 192.168.1.8:80;
}
```

- **fair**（第三方，需要安装第三方模块）

按后端服务器的响应时间来分配请求，响应时间短的优先分配。

```bash
upstream server_pool {
  server 192.168.1.7:80;
  server 192.168.1.8:80;
  fair;
}
```

### 动静分离

Nginx 动静分离严格意义上说应该是动态请求跟静态请求分开，可以理解成使用 Nginx 处理静态页面，Tomcat 处理动态页面。

动静分离从目前实现角度来讲大致分为两种：

- 纯粹把静态文件独立成单独的域名，放在独立的服务器上，也是目前主流推崇的方案；
- 动态跟静态文件混合在一起发布，通过 Nginx 来分开。

通过 `location` 指定不同的后缀名实现不同的请求转发。使用 `expires` 参数设置，可以使浏览器缓存过期时间，减少与服务器之前的请求和流量。

具体 Expires 定义：是给一个资源设定一个过期时间，也就是说无需去服务端验证，直接通过浏览器自身确认是否过期。

这里我们简单的配置一下如何通过 Nginx 来访问静态资源：

```bash
server {
  listen    80;
  server_name 192.168.1.7;
  location /www/ {
    root /data/;
    index index.html index.htm;
  }
  location /images/ {
    root /data/;
  }
}
```

有点像是把我们的站点放到了 `/data/` 目录，当访问 `192.168.1.7/www` 或 `192.168.1.7/images` 时会在 `/data/` 目录读取相应的文件。

### 高可用

高可用（HA, High Availability）是分布式系统架构设计中必须考虑的因素之一，它通常是指，通过设计减少系统不能提供服务的时间。

这里我们使用 Nginx 来接受第一手请求，当 Nginx 宕机时，那么所有对外提供的接口都将导致无法访问。为了避免这样的惨剧发送，我们可以使用 `keepalived` 来实现 Nginx 的高可用。

Keepalived 软件起初是专为 LVS 负载均衡软件设计的，用来管理并监控 LVS 集群系统中各个服务节点的状态，后来又加入了可以实现高可用的 VRRP (Virtual Router Redundancy Protocol, 虚拟路由器冗余协议）功能。

我们可以通过 `yum` 来安装:

```bash
yum install -y keepalived
```

通过这种方式安装后，其配置文件（keepalived.conf）会存放在 `/etc/keepalived` 中。修改主机配置：

```bash
vrrp_script chk_http_port {
  script "/usr/local/src/check_nginx_pid.sh" # 检测 Nginx 是否可用的脚本
  interval 2 # 检测脚本执行的间隔，单位是秒
  weight 2 # 权重
}
# vrrp 实例定义部分
vrrp_instance VI_1 {
  state MASTER            # 指定 keepalived 的角色，MASTER 为主，BACKUP 为备
  interface ens33         # 当前进行 vrrp 通讯的网络接口卡
  virtual_router_id 66    # 虚拟路由编号，主从要一直
  priority 100            # 优先级，数值越大，获取处理请求的优先级越高
  advert_int 1            # 检查间隔，默认为1s(vrrp组播周期秒数)
  #授权访问
  authentication {
    auth_type PASS # 设置验证类型和密码，MASTER 和 BACKUP 必须使用相同的密码才能正常通信
    auth_pass 1111
  }
  track_script {
    chk_http_port  #（调用检测脚本）
  }
  virtual_ipaddress {
    192.168.1.9 # 定义虚拟 IP，每行一个，可多设
  }
}
```

备用机配置：

```bash
vrrp_script chk_http_port {
  script "/usr/local/src/check_nginx_pid.sh"
  interval 2
  weight 2
}
vrrp_instance VI_1 {
  state BACKUP
  interface ens33
  virtual_router_id 66
  priority 99
  advert_int 1
  authentication {
    auth_type PASS
    auth_pass 1111
  }
  track_script {
    chk_http_port
  }
  virtual_ipaddress {
    192.168.1.9
  }
}
```

检测脚本：

```bash
#!/bin/bash
# 检测 Nginx 是否启动
A=`ps -C nginx --no-header |wc -l`
if [ $A -eq 0 ];
then
  systemctl start nginx
  if [ `ps -C nginx --no-header |wc -l` -eq 0 ];
  then # Nginx 重启失败后停掉 keepalived 服务，进行VIP转移
    killall keepalived
  fi
fi
```

启动：

```bash
systemctl start keepalived.service
```

现在就可以通过虚拟 IP（192.168.1.9）进行访问了，当主机宕机之后，就会自动切换到备用机上进行处理。

## 小结

每个 Nginx 程序都由一个 `master` 进程和多个 `woker` 进程构成。这有利于：

- 利用 Nginx 进行热部署操作
- 每个 `woker` 是独立的进程，如果有其中的一个 `woker` 出现问题，其他 `woker` 仍然可以工作

那么设置多少个 `woker` 合适呢？

通常，`worker` 数和服务器的 CPU 数相等是最为适宜的。

另外，发送一个请求又会占用了 `woker` 几个连接数？

请求的发起和响应就是两个连接数，而当 `tomcat` 要访问数据库时就是四个，所以答案是 2 个或则 4 个。

再者，假设 Nginx 有一个 `master`、四个 `woker`，并且每个 `woker` 支持最大的连接数 1024，那么支持的最大并发数是多少？

- 普通的静态访问最大并发数是: `worker_connections * worker_processes / 2`。
- 如果是 HTTP 作 为反向代理来说，最大并发数量应该是: `worker_connections * worker_processes / 4`。

## 参考

- [鸟哥的 Linux 私房菜 -- 程序管理与 SELinux 初探](http://cn.linux.vbird.org/linux_basic/0440processcontrol_5.php)
- [生产环境之Nginx高可用方案 - SimpleWu - 博客园](https://www.cnblogs.com/SimpleWu/p/11004902.html)
- [Nginx.mmap](https://besterwin.gitee.io/blogs/knowledge/middle/Nginx.html)
