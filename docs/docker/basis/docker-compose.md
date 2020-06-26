# Docker Compose
<!-- markdownlint-disable MD024 -->

Dockerfile 可以让用户管理一个单独的应用容器；而 Compose 则允许用户在一个模板（YAML 格式）中定义一组相关联的应用容器（被称为一个 project，即项目）。

Compose 使用的三个步骤：

1. 使用 Dockerfile 定义应用程序的环境。
2. 使用 `docker-compose.yml` 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。
3. 最后，执行 `docker-compose up` 命令来启动并运行整个应用程序。

## 安装

Linux 上我们可以从 Github 上下载它的二进制包来使用，最新发行的版本地址：<https://github.com/docker/compose/releases>。

运行以下命令以下载 Docker Compose 的当前稳定版本：

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

要安装不同版本的 Compose，只需将 `1.26.0` 替换为要使用的 Compose 版本。

接着，将可执行权限应用于二进制文件：

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

创建软链：

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

最后，测试是否安装成功：

```bash
$ docker-compose --version
docker-compose version 1.24.1, build 4667896b
```

查看[官网说明][docker_install]，了解更多环境的按照方式。

## 指令说明

执行 `docker-compose [COMMAND] --help` 可以查看具体某个命令的使用说明。

### version

指定本 `yml` 是依从哪个版本的 `compose` 制定的。

### volumes

虽然可以作为服务声明的一部分动态声明卷，但同样允许您创建可跨多个服务重用的命名卷（不依赖卷），并且可以使用 Docker 命令行或 API 轻松检索和检查。

```yaml
version: "3.8"

services:
  db:
    image: db
    volumes:
      - data-volume:/var/lib/db
  backup:
    image: backup-service
    volumes:
      - data-volume:/var/lib/backup/data

volumes:
  data-volume:
```

顶级卷键下的条目可以为空，在这种情况下，它使用由引擎配置的默认驱动程序。

### networks

顶级 `networks` 允许您指定要创建的网络。

```yaml
networks:
  some-network:
    # Use a custom driver
    driver: custom-driver-1
  other-network:
    # Use a custom driver which takes special options
    driver: custom-driver-2
```

### services

服务配置。

## 服务配置说明

服务定义包含应用于为该服务启动的每个容器的配置，非常类似于将命令行参数传递给 `docker run`。

### build

指定为构建镜像上下文路径。

例如 `webapp` 服务，指定为从上下文路径 `./dir/Dockerfile` 所构建的镜像：

```yaml
version: "3.8"
services:
  webapp:
    build: ./dir
```

或者，作为具有在上下文指定的路径的对象，以及可选的 Dockerfile 和 `args`：

```yaml
version: "3.8"
services:
  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
```

其中；

- `context`：上下文路径。
- `dockerfile`：指定构建镜像的 Dockerfile 文件名。
- `args`：添加构建参数，这是只能在构建过程中访问的环境变量。
- `labels`：设置构建镜像的标签。
- `target`：多层构建，可以指定构建哪一层。

### image

指定容器运行的镜像。以下格式都可以：

```yaml
image: redis
image: ubuntu:14.04
image: tutum/influxdb
image: example-registry.com:4000/postgresql
image: a4bc65fd # 镜像id
```

### container_name

指定自定义容器名称，而不是生成的默认名称。

```yaml
container_name: my-web-container
```

### environment

添加环境变量。您可以使用数组或字典、任何布尔值，布尔值需要用引号引起来，以确保 YML 解析器不会将其转换为 True 或 False。

```yaml
environment:
  RACK_ENV: development
  SHOW: 'true'
```

### env_file

从文件添加环境变量。可以是单个值或列表的多个值。

```yaml
env_file: .env
```

也可以是列表格式：

```yaml
env_file:
  - ./common.env
  - ./apps/web.env
  - /opt/secrets.env
```

### volumes

将主机的数据卷或着文件挂载到容器里。

```yaml
version: "3.7"
services:
  db:
    image: postgres:latest
    volumes:
      - "/localhost/postgres.sock:/var/run/postgres/postgres.sock"
      - "/localhost/data:/var/lib/postgresql/data"
```

### networks

配置容器连接的网络，引用顶级 `networks` 下的条目。

```yaml
services:
  some-service:
    networks:
      some-network:
        aliases:
         - alias1
      other-network:
        aliases:
         - alias2
```

`aliases`：同一网络上的其他容器可以使用服务名称或此别名来连接到对应容器的服务。

### expose

暴露端口，但不映射到宿主机，只被连接的服务访问。

仅可以指定内部端口为参数：

```yaml
expose:
 - "3000"
 - "8000"
```

### command

覆盖容器启动的默认命令。

```yaml
command: ["bundle", "exec", "thin", "-p", "3000"]
```

### entrypoint

覆盖容器默认的 `entrypoint`。

```yaml
entrypoint: /code/entrypoint.sh
```

也可以是以下格式：

```yaml
entrypoint:
  - php
  - -d
  - zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20100525/xdebug.so
  - -d
  - memory_limit=-1
  - vendor/bin/phpunit
```

### depends_on

设置依赖关系。

- docker-compose up：以依赖性顺序启动服务。在以下示例中，先启动 `db` 和 `redis`，才会启动 `web`。
- docker-compose up SERVICE：自动包含 SERVICE 的依赖项。在以下示例中，`docker-compose up web` 还将创建并启动 `db` 和 `redis`。
- docker-compose stop：按依赖关系顺序停止服务。在以下示例中，`web` 在 `db` 和 `redis` 之前停止。

```yaml
version: "3.7"
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres
```

注意：`web` 服务不会等待 `redis` 和 `db` 完全启动之后才启动。

### network_mode

设置网络模式。

```yaml
network_mode: "bridge"
network_mode: "host"
network_mode: "none"
network_mode: "service:[service name]"
network_mode: "container:[container name/id]"
```

### logging

服务的日志记录配置。

`driver`：指定服务容器的日志记录驱动程序，默认值为 `json-file`。有以下三个选项

```yaml
driver: "json-file"
driver: "syslog"
driver: "none"
```

仅在 `json-file` 驱动程序下，可以使用以下参数，限制日志得数量和大小。

```yaml
logging:
  driver: json-file
  options:
    max-size: "200k" # 单个文件大小为200k
    max-file: "10" # 最多10个文件
```

当达到文件限制上限，会自动删除旧得文件。

`syslog` 驱动程序下，可以使用 `syslog-address` 指定日志接收地址。

```yaml
logging:
  driver: syslog
  options:
    syslog-address: "tcp://192.168.0.42:123"
```

### secrets

存储敏感数据，例如密码：

```yaml
version: "3.1"
services:

mysql:
  image: mysql
  environment:
    MYSQL_ROOT_PASSWORD_FILE: /run/secrets/my_secret
  secrets:
    - my_secret

secrets:
  my_secret:
    file: ./my_secret.txt
```

### restart

- `no`：是默认的重启策略，在任何情况下都不会重启容器。
- `always`：容器总是重新启动。
- `on-failure`：在容器非正常退出时（退出状态非0），才会重启容器。
- `unless-stopped`：在容器退出时总是重启容器，但是不考虑在Docker守护进程启动时就已经停止了的容器

```yaml
restart: "no"
restart: always
restart: on-failure
restart: unless-stopped
```

注：`swarm` 集群模式，请改用 `restart_policy`。

### extra_hosts

添加主机名映射。类似 `docker client --add-host`。

```yaml
extra_hosts:
 - "somehost:162.242.195.82"
 - "otherhost:50.31.209.229"
```

以上会在此服务的内部容器中 `/etc/hosts` 创建一个具有 `ip` 地址和主机名的映射关系：

```bash
162.242.195.82  somehost
50.31.209.229   otherhost
```

### devices

指定设备映射列表。

```yaml
devices:
  - "/dev/ttyUSB0:/dev/ttyUSB0"
```

### dns

自定义 DNS 服务器，可以是单个值或列表的多个值。

```yaml
dns: 8.8.8.8

dns:
  - 8.8.8.8
  - 9.9.9.9
```

### dns_search

自定义 DNS 搜索域。可以是单个值或列表。

```yaml
dns_search: example.com

dns_search:
  - dc1.example.com
  - dc2.example.com
```

### cap_add，cap_drop

添加或删除容器拥有的宿主机的内核功能。

```yaml
cap_add:
  - ALL # 开启全部权限

cap_drop:
  - SYS_PTRACE # 关闭 ptrace权限
```

### cgroup_parent

为容器指定父 `cgroup` 组，意味着将继承该组的资源限制。

```yaml
cgroup_parent: m-executor-abcd
```

### healthcheck

用于检测 Docker 服务是否健康运行。

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"] # 设置检测程序
  interval: 1m30s # 设置检测间隔
  timeout: 10s # 设置检测超时时间
  retries: 3 # 设置重试次数
  start_period: 40s # 启动后，多少秒开始启动检测程序
```

### ulimits

覆盖容器默认的 `ulimit`。

```yaml
ulimits:
  nproc: 65535
  nofile:
    soft: 20000
    hard: 40000
```

### sysctls

设置容器中的内核参数，可以使用数组或字典格式。

```yaml
sysctls:
  net.core.somaxconn: 1024
  net.ipv4.tcp_syncookies: 0

sysctls:
  - net.core.somaxconn=1024
  - net.ipv4.tcp_syncookies=0
```

### tmpfs

在容器内安装一个临时文件系统。可以是单个值或列表的多个值。

```yaml
tmpfs: /run

tmpfs:
  - /run
  - /tmp
```

### stop_signal

设置停止容器的替代信号。默认情况下使用 SIGTERM 。

以下示例，使用 SIGUSR1 替代信号 SIGTERM 来停止容器。

```yaml
stop_signal: SIGUSR1
```

### stop_grace_period

指定在容器无法处理 SIGTERM (或者任何 stop_signal 的信号)，等待多久后发送 SIGKILL 信号关闭容器。

```yaml
stop_grace_period: 1s # 等待 1 秒
stop_grace_period: 1m30s # 等待 1 分 30 秒
```

### security_opt

修改容器默认的 `schema` 标签。

```yaml
security-opt：
  - label:user:USER   # 设置容器的用户标签
  - label:role:ROLE   # 设置容器的角色标签
  - label:type:TYPE   # 设置容器的安全策略标签
  - label:level:LEVEL  # 设置容器的安全等级标签
```

## 参考

- [Compose file version 3 reference | Docker Documentation](https://docs.docker.com/compose/compose-file/)

[docker_compose]: https://docs.docker.com/compose/
[docker_install]: https://docs.docker.com/compose/install/
