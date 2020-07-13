# Linux 基本知识

`Linux` 英文解释为 `Linux is not Unix`，是一套免费使用和自由传播的类 `Unix` 操作系统。

## 启动过程

`Linux` 系统的启动过程主要包括 5 个阶段。

- 内核引导

当计算机打开电源后，首先是 BIOS 开机自检，按照 BIOS 中设置的启动设备（通常是硬盘）来启动。

操作系统接管硬件以后，首先读入 `/boot` 目录下的内核文件。

- 运行 Init

`init` 进程是系统所有进程的起点，你可以把它比拟成系统所有进程的老祖宗，没有这个进程，系统中任何进程都不会启动。

`init` 程序首先是需要读取配置文件 `/etc/inittab`。

- 系统初始化

在 `init` 的配置文件中有这么一行： `si::sysinit:/etc/rc.d/rc.sysinit`，它调用执行了 `/etc/rc.d/rc.sysinit`。

`rc.sysinit` 是每一个运行级别都要首先运行的重要 `bash shell` 的脚本，它主要是完成一些系统初始化的工作。

它主要完成的工作有：激活交换分区，检查磁盘，加载硬件模块以及其它一些需要优先执行任务。

- 建立终端

`rc` 执行完毕后，返回 `init`。这时基本系统环境已经设置好了，各种守护进程也已经启动了。

`init` 接下来会打开 6 个终端，以便用户登录系统。

- 用户登录系统

用户的登录方式通常有三种：（1）命令行登录、（2）SSH 登录、（3）图形界面登录。

## Linux 中常见目录作用

- / 根目录
- **/bin** 命令报错目录，包含命令的目录还有 `/sbin`，`/usr/bin` 和 `/usr/sbin`（其中 `/bin` 中是所有用户可以读取的命令，`/usr/bin` 是特定用户读取的命令，而`/-bin` 和 `/usr/sbin` 是管理员才能读取的命令）。
- **/boot** 启动目录，包含启动系统的相关文件。
- **/dev** 设备文件保存目录。
- **/etc** 配置文件保存目录。
- **/home** 普通用户的家目录。
- **/root** 管理员的家目录。
- **/lib** 函数库保存的目录。
- **/mnt** 挂载额外设备，例如 U 盘和移动硬盘。
- **/media** 挂载媒体设备，例如光盘。
- **/misc** 挂载 NFS 服务的共享目录。
- **/proc 和 /sys** 保存内存的过载点，其中数据直接写在内存中。
- **/tmp** 临时目录。
- **/usr** 系统软件资源目录。
- **/var** 系统相关文档内容。

## 命令

- **命令提示符**

```bash
# root: 当前登录用户，在 Linux 中，root 是管理员账号，相当于 Windows 中的 Administrator
# localhost: 主机名
# ~: 当前所在目录，在 Linux 中代表用户家目录，管理员的家目录为 /root，普通用户为 /home/<userName>
# #: 标示用户，# 表示超级用户，$ 表示普通用户
[root@localhost ~]#
```

- **命令格式**

```bash
命令 【选项】 【参数】
```

注意：（1）极少数命令不遵循此格式、（2）当有多个选项时，可以写在一起、（3）完整选项有时也具有对应的简化选项。

## 数据库的更新配置

数据库的更新是根据配置文件为 `updatedb.conf` 来进行的，下面列出的是该文件的主要内容。

```bash
PRUNE_BIND_MOUNTS="yes"

PRUNEFS="NFS nfs nfs4 rpc_pipefs afs binfmt_misc proc smbfs autofs iso9660 ncpfs coda devpts ftpfs

devfs mfs shfs sysfs cifs lustre_lite tmpfs usbfs udf"

PRUNENAMES=".git .bzr .hg .svn"

PRUNEPATHS="/tmp /var/spool /media"
```

第一行表示是否进行限制搜索，如果为 `no` 时，相当于该问价以下规则无效。

第二行是排除检索的文件系统类型, 即列出的文件系统类型不进行检索.

第三行表示对哪些后缀的文件排除检索，不同后缀之间用空格隔开。

第四行是排除检索的路径, 即列出的路径下的文件和子文件夹均跳过不进行检索。

## 参考资料

- [Linux 系统启动过程 | 菜鸟教程](http://www.runoob.com/linux/linux-system-boot.html)
- [Linux 系统目录结构 | 菜鸟教程](http://www.runoob.com/linux/linux-system-contents.html)
