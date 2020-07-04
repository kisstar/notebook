# 搭建开发环境（一）

记录如何搭建基本开发环境。

## 包管理系统

现代类 `Unix` 操作系统大多都提供了一个集中的软件包管理机制，以帮助用户搜索、安装和管理软件。而软件通常以「包」的形式存储在仓库中，对软件包的使用和管理被称为包管理。而 `Linux` 包的基本组成部分通常有：共享库、应用程序、服务和文档。

如今流行的 `Linux` 发行版在包管理工具、方式和形式都大同小异，这里主要就 `Ubuntu` 做一个说明。

最近发布的 `debian` 衍生版(如Ubuntu、Raspbian等)大多数都包含了 `apt` 命令，它提供了一个简洁统一的接口，可用于通常由 `apt-get` 和 `apt-cache` 命令处理的常见操作。

这里就 `apt` 相关常用命令做了一个简单的描述：

| 选项 | 描述 |
| :-- | :-- |
| sudo apt update/apt-get update | 更新包列表 |
| sudo apt upgrade/apt-get upgrade | 更新已安装的包 |
| sudo apt full-upgrade/apt-get dist-upgrade | 可能会增加或删除包以满足新的依赖项 |
| sudo apt install `<package_string>` | 从存储库安装包 |
| sudo apt remove `<package_string>`/sudo apt-get remove `<package_string>` | 移除指定的软件包 |
| sudo apt-get autoremove | 删除不需要的包 |
| sudo apt purge `<package_string>` | 彻底删除该 `package`（包含配置文件） |
| apt search `<search_string>`/apt-cache search `<search_string>` | 搜索某个包 |
| dpkg -s `<package_string>` | 显示包的当前安装状态 |
| apt show `<package_string>`/apt-cache show `<package_string>` | 查看某个软件包的信 |

## 更换源

由于国外源太慢了，所以在我们安装完 `Ubuntu` 系统后先将 `Ubuntu 18.04` 修改默认源为国内源。

首先我们对 `/etc/apt` 下的 `sources.list` 文件进行备份，以免误操作：

```bash
cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

然后 在 `/etc/apt/sources.list` 文件前面添加如下内容：

```bash
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

在使用 `vi/vim` 编辑 `sources.list` 文件时需要 `root` 权限，通过切换到 `root` 用户或在命令前面加上 `sudo` 进行编辑。

最后使用 `sudo apt update` 和 `sudo apt upgrade` 进行更新。

## 安装 Git

Git 是一个免费的开源分布式版本控制系统，旨在快速，高效地处理从小型到大型项目的所有事务，具有廉价本地分支，便捷的临时区域和多个工作流程等功能。

由于它可以有效、高速地处理从很小到非常大的项目版本管理，这对我们开发工作的进行异常有利，所以这里我们先对它进行安装。

首先安装Git：

```bash
sudo apt-get install git
```

然后配置用户信息：

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

最后我们来生成和配置Git SSH密钥，在生成密钥之前我们先检测之前是否生成过 SSh 密钥，其原理就是检测家目录下 `.ssh` 文件是否存在，所以我们可以通过直接切换 `cd ~/.ssh` 或者查看家目录 `ls -a ~/`。

如果不存在则通过该命令生成：

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

然后你就会看到家目录下多了 `.ssh` 目录，其中包含 `id_rsa(`私钥)和 `id_rsa.pub`(公钥)两个文件，我们要做的就是对 `id_rsa.pub` 文件中的内容进行拷贝。

最后，进入自己的 Github，依次点击 “Settings->SSH and GPG keys->New SSH key”，把刚才复制的内容粘贴在 `key` 中，点击 Add SSH key 按钮添加，完成。之后，我们 `push` 就不用再输入用户和密码。

## 安装 nvm、node、npm

接下来我们需要安装 Node 和 Npm。

在这里我们需要了解一下 Nvm，Nvm 是一个可以让你在同一台机器上安装和切换不同版本 Node 的工具，为了便于对不对版本 Node 的管理，所以这里我们直接安装 Nvm。

Ubuntu 下安装：

```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

安装成功后，需要关闭终端，重新启动。Nvm 才会生效。

Node.js 是一个事件驱动 I/O 服务端 `JavaScript` 环境，基于 Google 的 V8 引擎，V8 引擎执行 `Javascript` 的速度非常快，性能非常好。

我们这里安装现在最新稳定版 `v10.14.2`：

```bash
nvm install v10.14.2
```

由于 `npm` 会跟随 `node` 一起被安装，所以我们无需单独对它进行安装。
