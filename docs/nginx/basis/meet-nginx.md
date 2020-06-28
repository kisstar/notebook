# 认识 Nginx

Nginx 是一款是由俄罗斯的程序设计师 Igor Sysoev 所开发高性能的 Web 和反向代理服务器，也是一个 IMAP/POP3/SMTP 代理服务器。

## 代理

代理包括正向代理和反向代理。

**正向代理**是一个位于客户端和目标服务器之间的服务器，为了从目标服务器取得内容，客户端向代理发送一个请求并指定目标，然后代理向目标服务器转交请求并将获得的内容返回给客户端。

客户端必须要进行一些特别的设置才能使用正向代理。

正向代理的用途：

- 访问原来无法访问的资源
- 可以做缓存，加速访问资源

**反向代理**是一种可以集中地调用内部服务，并提供统一接口给公共客户的 WEB 服务器。

反向代理实际运行方式是指以代理服务器来接受连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给请求连接的客户端，此时代理服务器对外就表现为一个服务器。

可以看出反向代理对外都是透明的，访问者者并不知道自己访问的是一个代理。因为客户端不需要任何配置就可以访问。

反向代理的作用：

- 保证内网的安全。隐藏后端服务器的信息，屏蔽黑名单中的 IP，限制每个客户端的连接数
- 提高可扩展性和灵活性。客户端只能看到反向代理服务器的 IP，这使你可以增减服务器或者修改它们的配置
- 缓存。直接返回命中的缓存结果
- 静态内容直接返回
- 负载均衡，通过反向代理服务器来优化网站的负载

## 负载均衡

客户端发送多个请求到服务器，服务器处理请求，有一些可能要与数据库进行交互，服务器处理完毕后，再将结果返回给客户端。

这种架构模式对于早期的系统相对单一，并发请求相对较少的情况下是比较适合的，成本也低。

随着信息数量的不断增长，访问量和数据量的飞速增长，以及系统业务的复杂度增加，这种架构会造成服务器相应客户端的请求日益缓慢，并发量特别大的时候，还容易造成服务器直接崩溃。

很明显这是由于服务器性能的瓶颈造成的问题，那么如何解决这种情况呢？

我们首先想到的可能是升级服务器的配置，比如提高 CPU 执行频率，加大内存等提高机器的物理性能来解决此问题，但是我们知道摩尔定律的日益失效，硬件的性能提升已经不能满足日益提升的需求了。

最明显的一个例子，天猫双十一当天，某个热销商品的瞬时访问量是极其庞大的，那么类似上面的系统架构，将机器都增加到现有的顶级物理配置，都是不能够满足需求的。那么怎么办呢？

上面的分析我们去掉了增加服务器物理配置来解决问题的办法，也就是说纵向解决问题的办法行不通了，那么横向增加服务器的数量呢？这时候集群的概念产生了。

**单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器上的情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们所说的负载均衡**。

## 动静分离

在 WEB 开发中，通常来说，静态资源是指 HTML、JavaScript、CSS、图片等文件，而动态资源就是指那些后台资源。

为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度。降低原来单个服务器的压力。

<img :src="$withBase('/images/nginx/dynamic-and-static-separation.png')" alt="dynamic-and-static-separation">

静态资源可以部署在 Nginx 上，当一个请求来的时候，如果是静态资源的请求，就直接到 Nginx 配置的静态资源目录下面获取资源，如果是动态资源的请求，Nginx 利用反向代理的原理，把请求转发给后台应用去处理，从而实现动静分离。

## 安装

在官网中提供了详尽的[安装介绍][nginx_download]，这里我们以 `centos` 系统的 [Nginx 安装][nginx_linux_packages] 为例。

首先通过创建 `/etc/yum.repos.d/nginx.repo` 文件，并写入下面的内容来设置 Nginx 的 `yum` 仓库：

```bash
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```

注意这里的 `$releasever` 要改为当前系统的版本号，比如 `centos 7` 就需要把 `$releasever` 改成 7。

然后，执行下面的命令安装 Nginx：

```bash
yum install nginx
```

最后，检查是否安装成功：

```bash
$ nginx -v
nginx version: nginx/1.18.0
```

## 启动

使用 `systemctl` 命令进行启动：

```bash
systemctl start nginx
```

启动后通过 `curl http://localhost` 就可以查看到网页的内容。为了让其它机器可以访问到，我们还需要开发 80 端口：

```bash
# --permanent 表示永久生效
firewall-cmd --add-service=http --permanent
firewall-cmd --add-port=80/tcp --permanent
```

设置完成后，重启防火墙：

```bash
firewall-cmd -–reload
```

查看开放的端口号：

```bash
firewall-cmd --list-all
```

现在，局域网中的电脑就可以通过输入 IP 来进行访问了。

## 常用命令

查看版本：

```bash
nginx -v
```

检查配置文件：

```bash
nging -t
```

指定配置文件：

```bash
nginx -c path/to/config-file # 默认为 /etc/nginx/nginx.conf
```

重新加载：

```bash
nginx -s reload
```

[nginx_download]: https://nginx.org/en/download.html
[nginx_linux_packages]: https://nginx.org/en/linux_packages.html#RHEL-CentOS
