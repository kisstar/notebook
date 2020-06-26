# 数据卷

数据卷是一个可供一个或多个容器使用的特殊目录，它绕过 UFS，可以提供很多有用的特性：

- 数据卷可以在容器之间共享和重用
- 对数据卷的修改会立马生效
- 对数据卷的更新，不会影响镜像
- 卷会一直存在，直到没有容器使用（数据卷的使用，类似于 Linux 下对目录或文件进行 mount）

## 通过 -v 参数创建

在用 `docker run` 命令的时候，可以使用 `-v` 标记来创建一个数据卷并挂载到容器里（同时创建多个也是可以的）：

```bash
docker run -d --name web -p 80:8080 -v /data/www:/usr/local/tomcat/webapps/www tomcat
```

现在，容器中的 `/data/www:/usr/local/tomcat/webapps/www` 目录就像是宿主机 `/data/www` 目录的软链接一样。你在其中一个目录中执行创建、删除等操作，结果都会实时的反应在另一个中。

比如执行上面的操作后，我们在宿主的 `/data/www` 目录中添加文件：

```bash
echo "Hello Docker" >> /data/www/index.html
```

借助 `curl` 访问 `http://localhost/www/index.html` 将会返回 “Hello Docker”，因为上面创建的文件同步出现在了容器的 tomcat 静态目录下，因此可以被访问。通过执行下面的命令可以证明这一点：

```bash
$ docker exec -t web cat /usr/local/tomcat/webapps/www/index.html
Hello Docker
```

::: info
如果关闭容器，再对宿主机的的 `/data/www` 目录进行操作。当容器再次启动时，期间的改动将会同步反应在容器的目录中。
:::

在创建数据卷时，Docker 挂载数据卷的默认权限是读写，用户也可以通过 :ro 指定为只读：

```bash
docker run -d --name web -p 80:8080 -v /data/www:/usr/local/tomcat/webapps/www:ro tomcat
```

此时，若再在容器中操作 `/data/www:/usr/local/tomcat/webapps/www` 目录下的内容将会得到提示：Read only file system。当然在宿主机中仍然可以做操作。

## 通过 Dockerfile 创建

在 Dockerfile 中，通过 VOLUME 指令可以定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。格式：

```bash
VOLUME ["<路径1>", "<路径2>"...]
VOLUME <路径>
```

首先，在宿主机的 `/docker` 目录下创建一个 Dockerfile 文件，并写入下面的基础内容：

```bash
mkdir /docker && cd $_
echo 'FROM centos
VOLUME ["/tmp/dataVolume_one","/tmp/dataVolume_two"]
CMD /bin/bash' >> Dockerfile
```

接着使用 `docker build` 命令来基于 Dockerfile 创建镜像：

```bash
$ docker build -t kisstar/centos:1.0.0 .

Sending build context to Docker daemon  2.048kB
Step 1/3 : FROM centos
 ---> 831691599b88
Step 2/3 : VOLUME ["/tmp/dataVolume_one","/tmp/dataVolume_two"]
 ---> Running in e3ca9bd4014a
Removing intermediate container e3ca9bd4014a
 ---> 40202e1af100
Step 3/3 : CMD /bin/bash
 ---> Running in bf0ca092dfea
Removing intermediate container bf0ca092dfea
 ---> 133e560aaf0d
Successfully built 133e560aaf0d
Successfully tagged kisstar/centos:1.0.0
```

根据返回的镜像 ID 运行构建好的新镜像：

```bash
docker run -it 133e560aaf0d
```

在容器中可以看见对应的目录已经存在其中：

```bash
$ ls /tmp/

dataVolume_one  dataVolume_two
```

通过 `docker inspect` 查看容器信息：

```bash
docker inspect 133e560aaf0d
```

在对应的 Mounts 字段下可以看到对应的主机目录。

## 数据卷容器

数据卷容器，其实就是一个正常的容器，专门用来提供数据卷供其它容器挂载的。

也就是说，命名的容器挂载数据卷，其它容器通过挂载这个（父容器）实现数据共享，挂载数据卷的容器，称之为数据卷容器。

首先，创建一个命名的数据卷容器 `gc`：

```bash
docker run -t -d --name gc kisstar/centos:1.0.0
```

按照我们前面的设置，现在在 `gc` 容器中已经拥有了两个容器卷，通过 `docker inspect` 可以查看到它们对应的主机目录。

接着，在其他容器中使用 `--volumes-from` 来挂载 `gc` 容器中的数据卷：

```bash
docker run -t -d --volumes-from gc --name pc kisstar/centos:1.0.0
```

再次通过 `docker inspect` 查看 `pc` 容器中数据卷对应的主机目录，会发现和 `gc` 容器中两个数据卷的对应的主机目录是对应相同的。

以个人理解来讲，在使用 `--volumes-from` 来挂载 `gc` 容器中的数据卷时，其实就是将其对应的主机目录再做一次软连接到自己的数据卷。如此以来我们在其中一个地方修改数据，其它地方都可以实时的收到改变的内容。

当然，可以有多个容器挂载到同一个容器：

```bash
docker run -t -d --volumes-from gc --name pc2 kisstar/centos:1.0.0
```

另外，也可以使用多个 `--volumes-from` 参数来从多个容器挂载多个数据卷。 也可以从其他已经挂载了数据卷的容器来挂载数据卷：

```bash
docker run -t -d --volumes-from pc2 --name sc kisstar/centos:1.0.0
```

操作看起来有点像面向对象中的继承，但其实用软连接的方式来理解更为容易。通过 `docker inspect` 我们可以发现其实它们对应的宿主机目录都是相同的，容器中的数据卷相当于都是一些软连接。

这样也就好理解如果删除了挂载的容器（包括 gc、pc 和 pc2），数据卷并不会被自动删除。数据卷的生命周期会持续到没有容器使用它为止。

如果要删除一个数据卷，必须在删除最后一个还挂载着它的容器时使用 `docker rm -v` 命令来指定同时删除关联的容器。这可以让用户在容器之间升级和移动数据卷。

## 备份、恢复、迁移数据卷

通过数据卷，我们可以对其中的数据进行进行备份、恢复和迁移。

**备份**：

使用数据卷来备份数据时，通过指定本地的一个文件路径，对应到容器中的路径，然后运行 `tar` 命令将重要的文件打包备份。

```bash
docker run --name db1 --volumes-from dbdata -v $(pwd):/backup centos tar cvf /backup/backup.tar /dbdata
```

如上先使用 `--volumes-from` 标记来创建一个加载 `dbdata` 容器卷的容器，并从本地主机挂载当前到容器的 `/backup` 目录。

在容器启动后，使用了 `tar` 命令来将 `dbdata` 卷备份为本地的 `/backup/backup.tar`。

**恢复**：

恢复数据到一个容器的操作和备份很类似，首先创建一个带有数据卷的容器：

```bash
docker run -v /dbdata --name db2 centos /bin/bash
```

然后创建另一个容器，挂载 `db2` 的容器，并解压备份文件到挂载的容器卷中：

```bash
docker run --volumes-from db2 -v $(pwd):/backup busybox tar xvf /backup/backup.tar
```
