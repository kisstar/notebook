# SSH

Secure Shell（安全外壳协议，简称 SSH）是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境。

SSH 使用客户端-服务器模型，标准端口为 22，服务器端需要开启 SSH 守护进程以便接受远端的连接，而用户需要使用 SSH 客户端与其创建连接。

## 使用

SSH 以非对称加密实现身份验证，最常见的用途就是远程登录系统，人们通常利用 SSH 来传输命令行界面和远程执行命令。

在客户端来看，SSH 提供两种级别的安全验证。一种是基于密码的安全验证，另一种是基于密钥的安全验证。

### 基于密码的安全验证

基本用法：

```bash
ssh <用户名>@<主机>
```

SSH 的默认端口是 22，也就是说，你的登录请求会送进远程主机的 22 端口，你可以修改这个端口：

```bash
ssh -l <用户名> -p <端口号> <主机>
```

如果本地用户名与远程用户名一致，登录时可以省略用户名。

整个基于密码的登录过程：

- 远程主机收到用户的登录请求，把自己的公钥发给用户。
- 用户使用这个公钥，将登录密码加密后，发送过去。
- 远程主机用自己的私钥，解密登录密码，如果密码正确，就同意用户登录。

看起来整个过程似乎很安全，但事实上，可能会有别的服务器在冒充真正的服务器（用伪造的公钥，获取用户的登录密码），无法避免被“中间人”攻击。

在第一次登录主机时，系统会出现下面的提示：

```bash
$ ssh <主机>

The authenticity of host 'host (12.18.429.21)' can't be established.

RSA key fingerprint is 98:2e:d7:e0:de:9f:ac:67:28:c2:42:2d:37:16:58:4d.

Are you sure you want to continue connecting (yes/no)?
```

意思是，无法确认 HOST 主机的真实性，只知道它的公钥指纹（对公钥做了一次 MD5 后的值），是否继续连接吗？

当输入 `yes` 后，远程主机的公钥会被接受，并将其保存在文件 `$HOME/.ssh/known_hosts` 之中，而后的连接不再询问。

你可以禁用基于密码的认证：

```bash
sudo vi /etc/ssh/sshd_config # 打开配置文件
# PasswordAuthentication no # 进行配置
udo systemctl restart sshd # 修改后重启
```

### 基于密钥的安全验证

要依靠密钥，你必须为自己创建一对密钥，并把公有密钥放在需要访问的服务器上。客户端软件会向服务器发出请求，请求用你的密钥进行安全验证。

要生成密钥对，需要使用到 `ssh-keygen` 命令：

```bash
ssh-keygen [选项]
```

常用选项包括：

| 选项       | 描述                                                              |
| :--------- | :---------------------------------------------------------------- |
| -t         | 指定要创建的密钥类型                                              |
| -b bits    | 指定要创建的密钥中的位数。最小位长度为 768 位，默认长度为 2048 位 |
| -C comment | 提供新注释                                                        |
| -p         | 请求更改私钥文件的密码而非创建新私钥                              |
| -o         | 使用新的 OpenSSH 格式                                             |
| -q         | 静默的 `ssh-keygen`。在创建新密钥时，`/etc/rc` 文件会使用它       |
| -N         | 提供新的密码                                                      |
| -F（或-B） | 对于 `ssh-keygen2`，以 Bubble Babble 格式转储密钥的指纹           |

例如，以指定的邮箱为注释，生成一个 4096 位的 RSA 密钥对：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

执行后会询问密钥的存储位置（默认是 .ssh/id_rsa），然后它会要求你输入两次密钥口令。如果你不想在使用密钥时输入口令，则将其留空。

完成后我们需要在密钥的存储位置中寻找一对以 `id_rsa` 命名的文件，其中一个带有 `.pub` 扩展名。`.pub` 文件是你的公钥，另一个则是与之对应的私钥。

紧接着使用 `ssh-copy-id` 命令把公钥上传到远程主机上：

```bash
ssh-copy-id <用户名>@<主机>
```

::: waring 默认服务器上的 `$HOME/.ssh/authorized_keys` 文件存储着合法客户机的公钥，如果客户机的私钥泄漏，应该在该文件里删除私钥泄漏的客户机公钥。 :::

从此登录就不需要输入密码了，如果还是不行，就打开远程主机的 `/etc/ssh/sshd_config` 这个文件，检查下面几行前面 "#" 注释是否去掉。

```bash
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

整个基于密钥的登录连接过程：

- 请求使用密钥进行安全认证，并发送客户端的公钥信息到服务端。
- 服务器收到请求之后，先在你在该服务器的用户根目录下寻找你的公有密钥，然后把它和你发送过来的公有密钥进行比较。如果两个密钥一致，服务器就用公有密钥加密“质询”并把它发送给客户端软件。
- 客户端在接收到“质询”之后，使用本机的私钥进行解密，再把解密结果，通过服务端的公钥进行加密，然后发送给服务端。
- 服务端接收到客户端发送的结果之后，服务端使用本机私钥进行解密，验证质询，如果验证通过，建立连接。

可见，此等方式避免了被“中间人”攻击。

## 配置

在使用 SSH 连接远程服务器时，通常都要指定用户名和主机，这在使用多个 SSH 账号时极为不便，为此我们通过配置来解决这个问题。

SSH 在运行时，通常会从三个方面获取参数：

- 命令行参数，其优先级最高。
- 用户级别的配置文件：`~/.ssh/config`，若不存在可手动创建（Linux 上似乎会要求该文件权限为 600）。
- 系统级别的配置文件：`/etc/ssh/ssh_config`，其优先级最低。

以配置文件为例，常用配置项包括：

| 字段 | 说明 | 备注 |
| :-- | :-- | :-- |
| Host | 别名 | 标识了一个配置区段 |
| HostName | 主机名 | 通常是 IP 地址 |
| Port | 端口 | 默认端口号为 22 |
| User | 用户名 |  |
| IdentityFile | 密钥文件的路径 | 默认位置是 `~/.ssh/id_rsa,` `~/ssh/id_dsa` 等 |
| IdentitiesOnly | 只能使用配置文件指定的 `identity` 和 `certificate` 文件或通过 `ssh` 命令行通过身份验证 | 值为 `yes`/`no` |

基本配置规则：

- 以 `#` 开头的是注释，会被忽略
- 参数名不区分大小写，而参数值区分大小写
- 同一个 Host 的配置内部，`参数名 参数值` 和 `参数值=参数名` 配置格式皆可

在 SSH 配置项参数值可以使用通配符：

```bash
* # 代表 0～n 个非空白字符。
? # 代表一个非空白字符。
! # 表示例外通配。
```

以上列举了常用的配置项，更多可以使用命令 `man ssh_config` 进行查看。

### 配置案例

有时候需要在同一台电脑上使用多个 SSH KEYS (GITHUB OR GITLAB)，比如针对公司的 GitLab 和个人开发时使用的 GitHub。为了你需要通过 `ssh-keygen` 生成两对密钥。

假设生成的两对密钥的名称分别为 `id_rsa_home` 和 `id_rsa_company`，你需要在配置文件中写入以下配置：

```bash
# GITLAB
Host gitlab.<company>.com
    HostName gitlab.<company>.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_company

# GITHUB
Host github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_home
```

配置完成后，你可以使用 `ssh -T` 命令进行测试。

## 参考

- [Secure Shell - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Secure_Shell)
- [SSH 原理与运用（一）：远程登录 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)
- [ssh-keygen - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Ssh-keygen)
- [SSH Config 那些你所知道和不知道的事 | Deepzz's Blog](https://deepzz.com/post/how-to-setup-ssh-config.html)
- [在同一台电脑上使用多个 SSH KEYS (GITHUB OR GITLAB) - 掘金](https://juejin.im/post/5a33620af265da431440c003)
