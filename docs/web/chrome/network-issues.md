# 网络问题指南

如何在 Chrome DevTools 的网络面板中检测网络问题或优化机会。

## 排队或暂停的请求

同一时刻会有六个请求同时下载。之后，一系列的请求被排队或暂停。一旦前六个请求中的一个完成，队列中的一个请求就会启动。

<img :src="$withBase('/images/web/stalled.png')" alt="network_stalled">

这是因为当在一个域上发出的请求太多，在 HTTP/1.0 或 HTTP/1.1 连接上，Chrome 允许每个主机最多同时进行 6 个 TCP 连接。

为了避开这个问题你可以：

- 如果必须使用 HTTP/1.0 或 HTTP/1.1，请实现域分片。
- 使用 HTTP/2。请不要在 HTTP/2 中使用域分片。
- 删除或延迟不必要的请求，以便可以更早地下载关键请求。

## TTFB

请求要花很长时间等待从服务器接收第一个字节。

<img :src="$withBase('/images/web/slow-ttfb.png')" alt="network_slow-ttfb">

原因：

- 客户端和服务器之间的连接很慢。
- 服务器响应缓慢。在本地托管服务器，以确定是连接速度慢还是服务器速度慢。如果 TTFB 在本地服务仍然很慢则是服务器的问题。

解决方案：

- 如果连接速度慢，请考虑将内容托管在 CDN 上或更改托管提供商。
- 如果服务器速度慢，请考虑优化数据库查询、实现缓存或修改服务器配置。

## 缓慢的内容下载

一个请求需要花费很长时间去下载内容。

<img :src="$withBase('/images/web/slow-content-download.png')" alt="network_slow-content-download">

原因：

- 客户端和服务器之间的连接很慢。
- 正在下载大量内容。

解决方案：

- 考虑将您的内容托管在 CDN 上或更改托管提供商。
- 通过优化请求发送更少的字节。

## 其它

[查看原文](https://developers.google.com/web/tools/chrome-devtools/network/issues)。
