# Dockerfile

Dockerfile 由一行行命令语句组成：

- 每条指令保留字都必须为大写字母且后面要跟随至少一个参数
- `#` 表示注释
- 指令按照从上到下，顺序执行
- 每条指令都会创建一个新的镜像层，并对镜像进行提交

通常，Dockerfile 分为四部分：基础镜像信息、维护者信息、镜像操作指令和容器启动时执行指令。

## 指令

指令的一般格式为 `INSTRUCTION arguments`，指令包括 FROM、MAINTAINER、RUN 等。

### FROM

格式为 `FROM <image>` 或 `FROM <image>:<tag>`。

```dockerfile
FROM centos:6
```

FROM 指令会初始化一个新的构建阶段，并为后续指令设置基础镜像。

所以，一个正确的 Dockerfile 文件的第一条指令必须为 FROM 指令。如果在同一个文件中创建多个镜像时，可以使用多个 FROM 指令（每个镜像一次）。

### MAINTAINER

格式为 `MAINTAINER <name>`，指定维护者信息。

```dockerfile
MAINTAINER "Kisstar <dwh.chn@foxmail.com>"
```

根据官方文档，不推荐再使用 MAINTAINER 指令。相反，应该可以使用 LABEL 指令来定义生成的镜像的作者。

```dockerfile
LABEL maintainer="Kisstar <dwh.chn@foxmail.com>"
```

LABEL 指令更加灵活，允许设置元数据，并且可以使用 `docker inspect` 命令轻松查看。

### LABEL

LABEL 指令将元数据添加到镜像中。格式为键值对：

```dockerfile
LABEL <key>=<value> <key>=<value> ...
```

要在标签值中包含空格，请使用引号和反斜杠，就像在命令行解析中一样。一些用法示例：

```dockerfile
LABEL version="1.0"
LABEL description="This text illustrates \
that label-values can span multiple lines."
```

基镜像或父镜像（起始行中的镜像）中包含的标签会被镜像继承。如果标签已存在但具有不同的值，则最近应用的值将覆盖以前设置的任何值。

要查看镜像的 LABEL，可以使用 `docker image inspect` 命令。通过 `--format` 选项仅显示标签；

```dockerfile
docker image inspect --format='' centos
```

### RUN

容器构建时需要运行的命令。

格式为：

```dockerfile
RUN <command>
# or
RUN ["executable", "param1", "param2"]
```

前者将在 `shell` 终端中运行命令，即 `/bin/sh -c`；后者则使用 `exec` 执行。

指定使用其它终端可以通过第二种方式实现，例如：

```dockerfile
RUN ["/bin/bash", "-c", "echo hello"]
```

每条 RUN 指令将在当前镜像基础上执行指定命令，并提交为新的镜像。当命令较长时可以使用 `\` 来换行。

### EXPOSE

仅仅只是声明端口，告诉 Docker 服务端容器暴露的端口号，供互联系统使用。

格式为：

```dockerfile
EXPOSE <port> [<port>...]
```

在利用 -P 参数来启动容器时，也就是 `docker run -P` 时，主机会自动随机分配一个端口映射到 EXPOSE 的端口。

```dockerfile
EXPOSE 8080
```

### WORKDIR

格式为 `WORKDIR /path/to/workdir`。

通过该指令可以为后续的 RUN、CMD、ENTRYPOINT 指令配置工作目录。

可以使用多个 WORKDIR 指令，后续命令如果参数是相对路径，则会基于之前命令指定的路径。例如

```dockerfile
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

则最终路径为 `/a/b/c`。

用 WORKDIR 指定的工作目录，会在构建镜像的每一层中都存在。（WORKDIR 指定的工作目录，必须是提前创建好的）。

### ENV

指定一个环境变量，在后续的指令中，可以使用这个环境变量，并在容器运行时保持。

格式为 `ENV <key> <value>`。例如：

```dockerfile
ENV NODE_VERSION 7.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc"
```

示例中设置 `NODE_VERSION = 7.2.0`，在后续的指令中可以通过 $NODE_VERSION 来引用。

### ADD

ADD 指令和 COPY 的使用格式一致（同样需求下，官方推荐使用 COPY）。功能也类似，不同之处如下：

- ADD 的优点：在执行 <源文件> 为 `tar` 压缩文件的话，压缩格式为 `gzip`, `bzip2` 以及 `xz` 的情况下，会自动复制并解压到 <目标路径>。
- ADD 的缺点：在不解压的前提下，无法复制 `tar` 压缩文件。会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。具体是否使用，可以根据是否需要自动解压来决定。

格式为：

```dockerfile
ADD <src> <dest>
```

该命令将复制指定的 `<src>` 到容器中的 `<dest>`。 其中 `<src>` 可以是 Dockerfile 所在目录的一个相对路径；也可以是一个 URL；还可以是一个 `tar` 文件（自动解压为目录）。

### COPY

复制指令，从上下文目录中复制文件或者目录到容器里指定路径。

格式为：

```dockerfile
COPY <src> <dest>
```

复制本地主机的 `<src>`（为 Dockerfile 所在目录的相对路径）到容器中的 `<dest>`。

当使用本地目录为源目录时，推荐使用 COPY。

### VOLUME

定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。它可以避免重要的数据，因容器重启而丢失，也可以避免容器不断变大：

```dockerfile
VOLUME ["<路径1>", "<路径2>"...]
VOLUME <路径>
```

在启动容器的时候，我们可以通过 `-v` 参数修改挂载点。

### CMD

为启动的容器指定默认要运行的程序，程序运行结束，容器也就结束。

类似于 RUN 指令，但 RUN 是在 `docker build` 时运行，而 CMD 在 `docker run` 时运行。

支持三种格式：

- 使用 exec 执行：`CMD ["executable","param1","param2"]`
- 在 `/bin/sh` 中执行，提供给需要交互的应用：`CMD command param1 param2`
- 提供给 ENTRYPOINT 的默认参数：`CMD ["param1","param2"]`

如果用户启动容器时候指定了运行的命令，则会覆盖掉 CMD 指定的命令。

::: waring
如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。
:::

### ENTRYPOINT

配置容器启动后执行的命令。

与 CMD 不同，它不会被 `docker run` 提供的参数覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序。

```dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
# or
ENTRYPOINT command param1 param2（shell 中执行）
```

如果运行 `docker run` 时使用了 `--entrypoint` 选项，此选项的参数可当作要运行的程序覆盖 ENTRYPOINT 指令指定的程序。

::: waring
每个 Dockerfile 中只能有一个 ENTRYPOINT，当指定多个时，只有最后一个起效。
:::

### ONBUILD

配置当所创建的镜像作为其它新创建镜像的基础镜像时，所执行的操作指令。

格式为 `ONBUILD [INSTRUCTION]`。

例如，Dockerfile 使用如下的内容创建了镜像 `image-P`：

```dockerfile
ONBUILD ADD . /app/src
```

新的 Dockerfile 中使用 `FROM image-A` 指定基础镜像时，会自动执行 ONBUILD 指令内容，等价于在后面添加了一条指令：

```dockerfile
FROM image-A
#Automatically run the following
ADD . /app/src
```

## 案例

自定义 `tomcat` 镜像：

```dockerfile
FROM centos
LABEL maintainer="Kisstar <dwh.chn@foxmail.com>"
# 添加 Java 和 tomcat 到容器
ADD jdk-8u171-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.8.tar.gz /usr/local/
# 配置 Java 和 tomcat 环境变量
ENV JAVA_HOME /usr/local/jdk1.8.0_171
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.8
ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.8
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin
ENV WD /usr/local
# 设置工作路径
WORKDIR $WD
# 安装 vim 编辑器
RUN yum -y install vim
# 容器运行时监听的端口
EXPOSE  8080
# 启动时运行tomcat
# ENTRYPOINT ["/usr/local/apache-tomcat-9.0.8/bin/startup.sh" ]
# CMD ["/usr/local/apache-tomcat-9.0.8/bin/catalina.sh","run"]
CMD /usr/local/apache-tomcat-9.0.8/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.8/bin/logs/catalina.out
```

## 参考

- [Dockerfile reference | Docker Documentation](https://docs.docker.com/engine/reference/builder/)
- [Docker Dockerfile | 菜鸟教程](https://www.runoob.com/docker/docker-dockerfile.html)
- [指令 - Docker —— 从入门到实践 - 极客学院Wiki](https://wiki.jikexueyuan.com/project/docker-technology-and-combat/instructions.html)
