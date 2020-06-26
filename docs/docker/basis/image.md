# 镜像

镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件等。

## 联合文件系统

Docker 镜像是怎么实现增量的修改和维护的？每个镜像都由很多层次构成，Docker 使用联合文件系统（UnionFS）将这些不同的层结合到一个镜像中去。

联合文件系统是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下。

所以说，联合文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

而且，基于此不同 Docker 容器就可以共享一些基础的文件系统层，同时再加上自己独有的改动层，大大提高了存储的效率。

## 创建一个新的镜像

当我们从 Docker 镜像仓库中下载的镜像不能满足我们的需求时，我们可以通过以下两种方式对镜像进行更改:

- 从已经创建的容器中更新镜像，并且提交这个镜像
- 使用 Dockerfile 指令来创建一个新的镜像

### 更新、提交镜像

现在先来了解一下第一种方式，首先从 Hub 上拉取最新的 `tomcat` 镜像到本地：

```bash
docker pull tomcat
```

接下来就是运行它。这里需要注意的是，在启动时我们需要将容器中的端口（比如：8080）映射到本地的端口（比如：80）以便于在本地访问：

```bash
docker run -it -p 80:8080 tomcat
```

除了上面的通过 `-p` 来指定端口映射外，也可以直接使用 `-P` 来指定随机映射，然后通过 `docker ps` 来查看最后的映射关系。

假如上面我们启动的容器 ID 是 `5a88617e75e0`，现在进入这个容器中：

```bash
docker exec -it 5a88617e75e0 /bin/bash
```

在容器的 `/usr/local/tomcat/webapps/www` 目录下添加 `index.html` 文件并写入以下内容：

```bash
mkdir /usr/local/tomcat/webapps/www
echo '<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docker</title>
</head>
<body>
    <div>Hello Docker!</div>
</body>
</html>' >> webapps/www/index.html
```

到此，你可以在宿主机中通过 `curl http://localhost/www/` 来访问到上面的 HTML 内容。

我们已经完成了对容器的修改，下载可以通过命令 `docker commit` 来提交容器副本。

```bash
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

常用选项：

- -a: 提交的镜像作者
- -m: 提交时的说明文字
- -c: 使用 Dockerfile 指令来创建镜像
- -p: 在 commit 时，将容器暂停

熟悉 Git 的同学看起来应该很熟悉：

```bash
docker commit -a "Kisstar" -m "Hello Docker" 5a88617e75e0 kisstar/tomcat:1.0.0
```

然后通过 `docker iamges` 就可以看到生成的新的镜像，为进行验证我们先退出之前运行的容器，或者直接全部删除（请确认后执行）：

```bash
docker rm -f $(docker ps -aq)
```

接着利用我们生成的镜像来创建一个新的容器：

```bash
docker run -it -d -p 80:8080 kisstar/tomcat:1.0.0
```

现在，无需添加 HTML 文件，通过 `curl http://localhost/www/` 就可以直接看到上面的 HTML 内容。

### 基于 Dockerfile 创建新的镜像

首先，创建一个 Dockerfile 文件，其中包含一组指令来告诉 Docker 如何构建我们的镜像。

这里自定义一个 `centos` 镜像，改变启动后的默认路径，并使其支持 `vim` 编辑器和 `ifconfig` 等命令：

```dockerfile
FROM centos
LABEL maintainer="Kisstar <dwh.chn@foxmail.com>"

ENV WD /usr/local
WORKDIR $WD

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD /bin/bash
```

每一个指令都会在镜像上创建一个新的层。

然后，我们使用 Dockerfile 文件，通过 `docker build` 命令来构建一个镜像：

```bash
docker build -t kisstar/centos:1.0.0 .
```

现在，我们可以使用新的镜像来创建容器：

```bash
docker run -it kisstar/centos:1.0.0
```

## 推送本地镜像至阿里云

仓库（Repository）是集中存放镜像的地方，目前 Docker 官方维护了一个公共仓库 [Docker Hub][docker_hub]，大部分需求都可以通过在 Docker Hub 中直接下载镜像来实现。

以下介绍一下如何推送本地镜像至阿里云，与 Docker Hub 类似，只是远程的服务商不一样，操作都是一样的。

首先，前往阿里云控制台登录后选择容器镜像服务，然后点击创建镜像仓库。

<img :src="$withBase('/images/docker/create-ali-repository.png')" alt="create-ali-repository">

在第二步选择代码源时，直接选择本地镜像。

然后，在仓库列表中就可以看到我们新建的仓库。点击管理，在管理页面我们可以看到详细的操作指南。

推送时，使用用户名和密码进行登录：

```bash
docker login registry.cn-beijing.aliyuncs.com
```

登录成功后就可以开始推动我们的镜像了：

```bash
docker tag [ImageId] registry.cn-beijing.aliyuncs.com/kisstar/centos:[镜像版本号]
docker push registry.cn-beijing.aliyuncs.com/kisstar/centos:[镜像版本号]
```

推送成功后就可以拉取我们推送的镜像啦：

```bash
docker pull registry.cn-beijing.aliyuncs.com/kisstar/centos:[镜像版本号]
```

## 参考

- [Docker —— 从入门到实践-极客学院Wiki][docker_technology_and_combat]

[docker_technology_and_combat]: https://wiki.jikexueyuan.com/project/docker-technology-and-combat/
[docker_hub]: https://hub.docker.com/
