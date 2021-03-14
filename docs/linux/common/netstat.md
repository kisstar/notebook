# netstat

Netstat 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。

## 语法

```bash
netstat [-acCeFghilMnNoprstuvVwx][-A<网络类型>][--ip]
```

## 常见选项

```bash
# 显示所有连线中的 Socket，默认不显示 LISTEN 相关
a 或--all

# 显示监控中的服务器的 Socket
-l 或 --listening

# 直接使用 IP 地址，而不通过域名服务器
-n 或--numeric

# 显示正在使用 Socket 的程序识别码和程序名称
-p 或--programs

# 显示 TCP 传输协议的连线状况
-t 或--tcp

# 显示 UDP 传输协议的连线状况
-u 或--udp

# 显示路由信息，路由表
-r 或 --route

# 显示网卡列表
-i

# 按各个协议显示网络统计信息
-s
```

## 案列

找出程序运行的端口：

```bash
netstat -ap | grep ssh
```

找出运行在指定端口的进程：

```bash
netstat -an | grep "80"
```

显示 UDP 端口号的使用情况：

```bash
netstat -apu
```
