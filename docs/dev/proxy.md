# 代理

代理（Proxy）也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。

## Mac 系统级翻墙

系统偏好设置 → 网络 → 选择已链接网络 → 高级：

<img :src="$withBase('/images/other/dev/mac-proxy-1.png')" alt="mac_proxy">

选择代理 Tab，勾选需要代理的方式，比如选中自动代理然后在 URL 处填写对应的 PAC 地址：

<img :src="$withBase('/images/other/dev/mac-proxy-2.png')" alt="mac_proxy">

## 配置 Git 代理

Github 的直连速度一直不理想，最好的解决办法就是挂代理：

```bash
git config --global http.proxy http://www.example.com:PORT
git config --global https.proxy https://www.example.com:PORT
```

取消代理：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 终端代理

配置终端代理可以让 `curl` 和 `wget` 等命令也能使用代理：

```bash
export http_proxy=http://www.example.com:PORT
export https_proxy=https://www.example.com:PORT
```

如此只在本次生效，如果需要每次生效可以将其写入 `.bashrc` 或`.bash_profile` 文件中。
