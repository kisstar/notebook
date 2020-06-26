# 基础命令

在 Docker 客户端，可以通过命令来操控 Docker 来完成指定的任务，其格式通常为：

```bash
docker [OPTIONS] COMMAND [arg...]
```

## 帮助命令

显示 Docker 版本信息：

```bash
docker version
```

显示 Docker 系统信息，包括镜像和容器数：

```bash
docker info
```

显示命令的帮助信息：

```bash
docker [COMMAND] --help
```

## 镜像命令

**列出本地镜像**：

```bash
docker images [OPTIONS] [REPOSITORY[:TAG]]

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              bf756fb1ae65        5 months ago        13.3kB
# 镜像的仓库源      镜像的标签           镜像 ID             创建的时间          镜像大小
```

常用选项：

- -a: 列出本地所有的镜像（含中间映像层，默认情况下，过滤掉中间映像层）
- -q: 只显示镜像 ID
- --digests: 显示镜像的摘要信息
- --no-trunc: 显示完整的镜像信息
- -f: 显示满足条件的镜像

对于标签，如果不明确指定将默认为 `latest`，例如你只使用 `ubuntu`，Docker 将默认使用 `ubuntu:latest`。

**从 Docker Hub 查找镜像**：

```bash
docker search [OPTIONS] IMAGE
```

常用选项：

- -s: 列出收藏数不小于指定值的镜像
- --no-trunc: 显示完整的镜像描述
- --automated: 只列出 `automated build` 类型的镜像

**从镜像仓库中拉取或者更新指定镜像**：

```bash
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

常用选项：

- -a: 拉取所有 `tagged` 镜像
- --disable-content-trust: 忽略镜像的校验，默认开启

如拉取最新的 `centos` 镜像：

```bash
docker pull centos
```

**删除本地一个或多少镜像**：

```bash
docker rmi [OPTIONS] IMAGE [IMAGE...]
```

常用选项：

- -f: 强制删除（如：如果有容器正在使用该镜像，可以通过此强制删除）
- --no-prune: 不移除该镜像的过程镜像，默认移除

如删除全部镜像：

```bash
docker rmi -f $(docker images -aq)
```

## 容器命令

**创建一个新的容器并运行一个命令**:

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

常用选项：

- --name: 为容器指定一个名称
- -i: 以交互模式运行容器
- -t: 为容器重新分配一个伪输入终端
- -d: 后台运行容器，并返回容器 ID
- -P: 随机端口映射，容器内部端口随机映射到主机的端口
- -p: 指定端口映射，格式为：主机(宿主)端口:容器端口

根据上面拉取的 `centos` 镜像创建一个容器：

```bash
docker run -it centos
```

在容器中使用命令 `exit` 可以退出并关闭容器，如果想只退出但保持容器的运行的话，可以使用：`Ctrl + p + q`。

当然，也可以直接以后台运行的模式启动一个容器：

```bash
docker run -d centos
```

::: warning
如果直接运行上面的命令，容器启动后会自动退出，因为 Docker 容器在后台运行，就必须对应有一个前台进程。
:::

通常，后台运行一个容器时会将运行的程序以前台进程的形式运行。

```bash
docker run -d --name mycentos centos /bin/sh -c "while true; do echo Hello world; sleep 2; done"
```

**列出容器**：

```bash
docker ps [OPTIONS]

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
d3b9c4580162        centos              "/bin/bash"         2 minutes ago       Up 2 minutes                            focused_curie
# 容器 ID           使用的镜像           启动容器时运行的命令 容器的创建时间      容器状态      端口信息和使用的连接类型  容器名称
```

容器的状态包括：created（已创建）、restarting（重启中）、running（运行中）、removing（迁移中）、paused（暂停）、exited（停止）、dead（死亡）。

常用选项：

- -a: 显示所有的容器，包括未运行的
- -l: 显示最近创建的容器
- -n: 列出最近创建的 n 个容器
- -q: 静默模式，只显示容器编号
- -f: 根据条件过滤显示的内容
- --format: 指定返回值的模板文件
- --no-trunc: 不截断输出
- -s: 显示总的文件大小

**重启/停止/启动容器**：

```bash
# 重启容器
docker restart [OPTIONS] CONTAINER [CONTAINER...]

# 停止一个运行中的容器
docker stop [OPTIONS] CONTAINER [CONTAINER...]

# 启动一个或多个已经被停止的容器
docker start [OPTIONS] CONTAINER [CONTAINER...]
```

强制停止可以使用，或者说杀掉一个运行中的容器：

```bash
docker kill [OPTIONS] CONTAINER [CONTAINER...]
```

**删除一个或多个容器**：

```bash
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

常用选项：

- -f: 通过 SIGKILL 信号强制删除一个运行中的容器
- -l: 移除容器间的网络连接，而非容器本身
- -v: 删除与容器关联的卷

删除多个容器除了一个个列举外，也可以参考下面的命令：

```bash
docker rm -f $(docker ps -aq)
# 或者
docker ps -aq | xargs docker rm
```

## 其它

**获取容器的日志**：

```bash
docker logs [OPTIONS] CONTAINER
```

常用选项：

- -f: 跟踪日志输出
- -t: 显示时间戳
- --tail: 仅列出最新 N 条容器日志
- --since: 显示某个开始时间的所有日志

如查看容器 `mycentos` 从 2020 年 1 月 1 日后的最新 10 条日志：

```bash
docker logs --since="2020-01-01" --tail=10 mycentos
```

**查看容器内的进程**：

容器运行时不一定有 `/bin/bash` 终端来交互执行 `top` 命令，而且容器还不一定有 `top` 命令，因此可以使用下面的命令来查看容器中正在运行的进程：

```bash
docker top [OPTIONS] CONTAINER [ps OPTIONS]
```

**获取容器/镜像的元数据**：

```bash
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```

常用选项：

- -s: 显示总的文件大小
- -f: 指定返回值的模板文件
- --type: 为指定类型返回 JSON

**连接到正在运行中的容器**：

```bash
docker attach [OPTIONS] CONTAINER
```

使用下面的命令可以达到同样的目的：

```bash
docker exec -it mycentos /bin/bash
```

通过 `docker exec` 还可以直接在运行的容器中执行命令而不用进入容器。

```bash
docker exec -t mycentos ls
```

也就是说 `attach` 是直接进入容器启动命令的终端，不会启动新的进程；而 `exec` 是在容器中打开新的终端，并且可以启动新的进程。

**拷贝容器内的文件到主机上**：

```bash
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH
```

比如将容器 `96f7f14e99ab` 的 `/www` 目录拷贝到主机的 `/tmp` 目录中：

```bash
docker cp  96f7f14e99ab:/www /tmp/
```
