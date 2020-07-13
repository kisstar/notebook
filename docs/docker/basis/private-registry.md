# Docker 私有仓库

在工作中，一些公司的私有镜像或则其它个人镜像并不想提交到公开的仓库中，为了方便对这些镜像进行管理，Docker 不仅提供了一个中央仓库，同时也允许我们搭建本地私有仓库。

## 私有仓库搭建

Docker 官方提供了一个搭建私有仓库的镜像 `registry`，运行该镜像并暴露 5000 端口，就可以使用了。

```bash
# 拉取私有仓库镜像
docker pull registry
# 启动私有仓库容器
docker run -id --name=registry -p 5000:5000 registry
```

现在，打开浏览器输入地址 `http://私有仓库服务器IP:5000/v2/_catalog`，看到 `{"repositories":[]}` 表示私有仓库搭建成功。

接着，让 Docker 信任私有仓库地址：

```bash
vim /etc/docker/daemon.json
# { "insecure-registries": ["私有仓库服务器IP:5000"] }
```

设置完成后，需要重启一下 Docker，同时不要忘记启动私有仓库容器：

```bash
systemctl restart docker
docker start registry
```

## 将镜像上传至私有仓库

标记本地镜像，将其归入私有仓库：

```bash
# docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]
docker tag centos 私有仓库服务器IP:5000/centos
```

将本地的镜像上传到镜像仓库：

```bash
# docker push [OPTIONS] NAME[:TAG]
docker push 私有仓库服务器IP:5000/centos
```

Registry 服务默认会将上传的镜像保存在容器的 `/var/lib/registry` 目录，所以在启动时我们可以将主机的 `/opt/registry` 目录挂载到该目录。

```bash
# 查看已上传镜像信息
$ docker exec registry ls /var/lib/registry/docker/registry/v2/repositories
centos
```

## 从私有仓库拉取镜像

```bash
# 拉取镜像
docker pull 私有仓库服务器IP:5000/centos
```

## Harbor

Harbor 是一个用于存储和分发 Docker 镜像的企业级 Registry 服务器。

官方提供的私有仓库 `registry` 服务，功能比较简单。Harbor 则基于该服务增加了一些安全、访问控制、管理的功能以满足企业对于镜像仓库的需求。

要使用 Harbor 首先需要在 [Harbor releases page][harbor_releases] 下载你需要的版本（online 和 offline 的区别是后者包含需要的镜像文件）。

以 `offline` 版为例，接着使用 `tar` 解压安装包：

```bash
tar xvf harbor-offline-installer-version.tgz
```

随后，编辑 `harbor.yml` 文件，根据情况修改 `hostname`、`post`、存储目录等配置。

最后，通过运行 `install.sh` 构建镜像，并把服务启动起来。

详细的按照过程可以查看[官方的说明][harbor_install_config]。

## 参考

- [安装 Harbor 管理镜像服务 - 东北小狐狸 - 博客园](https://www.cnblogs.com/hellxz/p/install_harbor.html)

[harbor_releases]: https://github.com/goharbor/harbor/releases
[harbor_install_config]: https://github.com/goharbor/harbor/blob/master/docs/install-config/_index.md
