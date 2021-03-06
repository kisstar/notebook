# 查看用户登录信息

查看用户登录的相关信息。

<!-- markdownlint-disable MD024 -->

## W

`w` 命令用于显示目前登入系统的用户信息。

执行这项指令可得知目前登入系统的用户有哪些人，以及他们正在执行的程序。

### 语法

```bash
w [-fhlsuV] [用户名称]
```

### 常用选项

| 名称 | 描述                                                                          |
| :--- | :---------------------------------------------------------------------------- |
| -h   | 　不显示各栏位的标题信息列                                                    |
| -l   | 　使用详细格式列表，此为预设值                                                |
| -s   | 　使用简洁格式列表，不显示用户登入时间，终端机阶段作业和程序所耗费的 CPU 时间 |
| -f   | 　开启或关闭显示用户从何处登入系统                                            |
| -u   | 　忽略执行程序的名称，以及该程序耗费 CPU 时间的信息                           |

### 实例

显示当前用户。

```bash
$ w
16:16:20 up 12:01,  2 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
anani    tty1     -                Wed13    2days  0.22s  0.17s -bash
anani    pts/0    192.168.1.4      15:37    0.00s  0.28s  0.01s w
```

首行介绍：

`16:16:20 up 12:01, 2 users, load average: 0.00, 0.00, 0.00`

当前系统时间为 16:16:20，至今运行了 12 小时零 1 分，现登录了两个用户，在 1 分钟、5 分钟、15 分钟前的平均负载为 0.00、0.00、0.00。

标题列介绍：

| 名称   | 描述                                                   |
| :----- | :----------------------------------------------------- |
| USER   | 登陆的用户名                                           |
| TTY    | 登录终端                                               |
| FROM   | 从哪个 IP 登录                                         |
| LOGIN@ | 登录时间                                               |
| IDLE   | 用户闲置时间                                           |
| JCPU   | 该终端链接的所有进程占用的时间，不包过过去后台工作时间 |
| PCPU   | 当前进程所占用的时间                                   |
| WHAT   | 当前正在执行的命令                                     |

## WHO

`who` 命令用于显示系统中有哪些使用者正在上面，显示的资料包含了使用者 ID、使用的终端机、从哪边连上来的、上线时间、呆滞时间、CPU 使用量、动作等等。

### 语法

```bash
who - [husfV] [user]
```

### 常用选项

| 名称 | 描述 |
| :-- | :-- |
| -H 或 --heading | 显示各栏位的标题信息列 |
| -m | 此参数的效果和指定 `am i` 字符串相同 |
| -q 或--count | 只显示登入系统的帐号名称和总人数 |
| -i 或 -u 或 --idle | 显示闲置时间，若该用户在前一分钟之内有进行任何动作，将标示成 "." 号，如果该用户已超过 24 小时没有任何动作，则标示出 "old" 字符串 |
| -w 或 -T 或 --mesg 或 --message 或--writable | 显示用户的信息状态栏 |

### 实例

只显示当前用户和标题信息。

```bash
who -m -H
```

## LAST

`last` 命令用于显示用户最近登录信息，实际读取的是 `/var/log/wtmp`文件中的数据。

### 语法

```bash
last [options]
```

### 选项

| 名称     | 描述                       |
| :------- | :------------------------- |
| -R       | 省略 `hostname` 的栏位     |
| -num     | 展示前 `num` 个            |
| username | 展示 `username` 的登入讯息 |
| tty      | 限制登入讯息包含终端机代号 |

### 实例

查看用户最近登录信息。

```bash
$ last
anani    pts/0        192.168.1.4      Sat Apr 27 06:11   still logged in
anani    pts/0        192.168.1.4      Fri Apr 26 15:37 - 04:17  (12:40)
```

注释，显示的内容对应：用户名 登录终端 登录 IP 登录时间 退出时间（在线时间）

## LASTLOG

`lastlog` 命令用于显示系统中所有用户最近一次登录信息，默认读取的是 `/var/log/lastlog` 文件中的内容。

显示的内容包括用户名，登录终端，登录 IP 和最后一次登录时间。

### 语法

```bash
lastlog [选项]
```

### 选项

| 名称       | 描述                       |
| :--------- | :------------------------- |
| -b<天数>   | 显示指定天数前的登录信息   |
| -u<用户名> | 显示指定用户的最近登录信息 |
| -t<天数>   | 显示指定天数以来的登录信息 |

### 实例

显示壹天内用户的登录信息。

```bash
lastlog -t 1
```

## 参考资料

- [Linux 命令大全 | 菜鸟教程](http://www.runoob.com/linux/linux-command-manual.html)
- [Linux 达人养成计划 I](https://www.imooc.com/learn/175)
- [man 命令\_Linux man 命令用法详解：查看 Linux 中的指令帮助](http://man.linuxde.net/man)
