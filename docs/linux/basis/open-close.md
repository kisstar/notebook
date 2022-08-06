# 开关机命令

系统关机或重启的控制命令。

<!-- markdownlint-disable MD024 -->

## SHUTDOWN

用来进行关机程序，并且在关机以前传送讯息给所有使用者正在执行的程序，`shutdown` 也可以用来重开机。

使用权限：系统管理者。

### 语法

```bash
shutdown [-t seconds] [-rkhncfF] time [message]
```

### 常用选项

| 名称       | 描述                                                             |
| :--------- | :--------------------------------------------------------------- |
| -h         | 关机后停机                                                       |
| -r         | 关机后重新开机                                                   |
| time       | 设定关机的时间                                                   |
| message    | 传送给所有使用者的警告讯息                                       |
| -c         | 取消目前已经进行中的关机动作                                     |
| -t seconds | 设定在几秒钟之后进行关机程序                                     |
| -k         | 并不会真的关机，只是将警告讯息传送给所有使用者                   |
| -n         | 不采用正常程序来关机，用强迫的方式杀掉所有执行中的程序后自行关机 |
| -f         | 关机时，不做 `fcsk` 动作(检查 Linux 档系统)                      |
| -F         | 关机时，强迫进行 `fsck` 动作                                     |

### 实例

立即关机。

```bash
shutdown -h now
```

指定 5 分钟后关机，并提示相关信息。

```bash
shutdown +5 “System will shutdown after 5 minutes”
```

指定在 00:00 时重启。

```bash
shutdown -r 00:00
```

其它命令：

关机：`halt`、`poweroff`、`init 0`等。重启：`reboot`、`init 6`等。

## INIT

`init` 命令是 `Linux` 下的进程初始化工具，`init` 进程是内核引导运行的，是系统中的第一个进程，为所有 `Linux` 进程的父进程，它的进程号为 1。

### 语法

```bash
init [选项] [参数]
```

### 常用选项

| 名称 | 描述                               |
| :--- | :--------------------------------- |
| -b   | 不执行相关脚本而直接进入单用户模式 |
| -s   | 切换到单用户模式                   |

### 参数

运行等级：指定 `Linux` 系统要切换到的运行等级。

通过 `runlevel` 可以查看系统当前运行的级别，显示的结果包括之前的运行级别和当前运行级别。

到底什么是运行级呢？

简单的说，运行级就是操作系统当前正在运行的功能级别，你可以查看 `init` 的配置文件 `/etc/inittab`，其中内容包括以下部分。

```bash
#0  停机（千万不能把 initdefault 设置为 0）
#1  单用户模式
#2  多用户，没有 NFS(和级别 3 相似，会停止部分服务)
#3  完全多用户模式
#4  未分配
#5  x11(Xwindow)
#6  重新启动（千万不要把 initdefault 设置为 6）
```

## LOGOUT

`logout` 指令让用户退出系统，其功能和 `login` 指令相互对应。

### 语法

```bash
logout
```

### 实例

退出系统。

```bash
logout
```

## LOGIN

`login` 指令用于让用户登入系统，您亦可通过它的功能随时更换登入身份。

### 语法

```bash
login
```

### 实例

使用新的身份登录系统。

```bash
login
```