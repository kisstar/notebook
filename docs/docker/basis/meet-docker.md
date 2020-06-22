# Docker 基础

Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。

## 背景

软件开发最大的麻烦事之一，就是环境配置。包括操作系统的设置，各种库和组件的安装等。

通常，软件开发者会在 Windows 或者 Mac 电脑上进行开发，最后部署在 Linux 服务器上。这样的差异常常导致软件在开发环境是正常的，而部署时却出现各种各样的问题。

所以，如果能带环境安装将会省下不少麻烦，虚拟机就是这样一种解决方案。

虚拟机就像是一个应用程序，它可以在一种操作系统里面运行另一种操作系统。通过虚拟机开发者就可以还原软件的原始环境。

但是虚拟机存在资源占用多、启动慢等缺点。由此，又发展出了另一种虚拟化技术：Linux 容器。

Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。它启动块、占用资源少，体积相对比较小。

Docker 就是属于 Linux 容器的一种封装，提供简单易用的容器使用接口。它是目前最流行的 Linux 容器解决方案。

## 三要素

Docker 的三要素包括：镜像、容器和仓库。

**镜像**（image）：镜像可以看作是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。

镜像不包含任何动态数据，其内容在构建之后也不会被改变。

**容器**（container）：容器是使用镜像创建的运行实例。可以把一个容器看作是一个简易版的 Linux 环境。

它可以被启动、开始、停止、删除。每个容器是相互隔离的、保证安全的平台。

**仓库**（Repository）：集中存放镜像文件的场所。最大的公开仓库就是 [Docker Hub][docker_hub]。

仓库和仓库注册服务器（Registry）是有区别的，仓库注册服务器中往往存放了多个仓库，每个仓库中又包含了多个镜像，每个镜像又可能包含不同的标签。

Docker 本身就是一个容器运行载体或称之为管理引擎。

我们把程序的配置和依赖打包成一个可以交付的运行环境，这个包就是镜像文件，通过镜像文件才能产生容器，同一个镜像可以生成多个同时运行的容器实例。

## 安装

Docker 是一个开源的商业产品，包括社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE）。

[官方文档][docker_install]中列出了详细的安装方法，这里以 CentOS 7 为例，安装 Docker CE。

安装所需的软件包:

```bash
yum install -y yum-utils
```

设置稳定的仓库，这里使用阿里云：

```bash
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

安装最新版本的 Docker Engine-Community 和 containerd，或者转到下一步安装特定版本：

```bash
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

安装完成后，运行下面的命令，验证是否安装成功：

```bash
docker version
```

启动 Docker：

```bash
sudo systemctl start docker
```

## 镜像加速器

国内从 Docker Hub 拉取镜像有时会遇到困难，此时可以配置镜像加速器。Docker 官方和国内很多云服务商都提供了国内加速器服务。例如：

- 网易：[https://hub-mirror.c.163.com/][docker_wangyi_mirrors]
- 七牛云加速器：[https://reg-mirror.qiniu.com][docker_qiniuyun_mirrors]
- 阿里云：//<你的 ID>.mirror.aliyuncs.com

你可以同时添加几个国内的镜像，如果有不能使用的，会切换到可以使用个的镜像来拉取。

阿里云的镜像地址可以在[这里][docker_aliyun_mirrors]登陆后进行获取，由阿里云提供个人专属镜像地址。

配置时，对于 Ubuntu16.04+、Debian8+、CentOS7 而言，需要在 `/etc/docker/daemon.json` 中写入如下内容（如果文件不存在请新建该文件）：

```bash
{
  "registry-mirrors": ["https://reg-mirror.qiniu.com/"]
}
```

之后重新启动服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Hello World

接下来，通过拉取最简单的 [hello-world][docker_hello_world] 来体验一下：

```bash
docker image pull library/hello-world
```

抓取成功以后，就可以在本机运行这个镜像文件了：

```bash
$ docker container run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

其实，`docker container run` 命令具有自动抓取 `image` 文件的功能。如果发现本地没有指定的 `image` 文件，就会从仓库自动抓取。

所以，前面的 `docker image pull` 命令并不是必需的。

## 小结

Docker 是一个 Client-Server 结构的系统，其守护进程运行在主机上，然后通过 Socket 连接从客户端访问，守护进程从客户端接受命令并管理运行在主机上的容器。

虚拟机通常由必要的硬件和软件组成，而 Docker 不需要 Hypervisor 实现硬件资源虚拟化，运行在 Doker 容器上的程序都是直接使用的实际物理机的硬件资源。因此在 CPU、内存利用率上 Docker 有明显的优势。

另外，Docker 利用的是宿主机的内核。因此，在创建一个新的容器时不需要像虚拟机一样重新加载一个新的操作系统内核，从而避免了加载操作系统内核这样比较耗时、费资源的一个过程，显得更轻、更快。

[docker_hub]: https://hub.docker.com/
[docker_install]: https://docs.docker.com/engine/install/
[docker_aliyun_mirrors]: https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors
[docker_wangyi_mirrors]: https://hub-mirror.c.163.com/
[docker_qiniuyun_mirrors]: https://reg-mirror.qiniu.com
[docker_hello_world]: https://hub.docker.com/_/hello-world
