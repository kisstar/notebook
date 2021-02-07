# 网络分析

探索分析页面加载方式的新方法。

## 记录网络请求

当打开开发者工具时默认将记录所有的网络请求。

<img :src="$withBase('/images/web/network.png')" alt="network">

除此之外：

- 如果不想记录后续的网络请求你可以点击 `Stop recording network log` 图标进行关闭。
- 单击网络面板上的 `Clear` 以清除“请求”表中的所有请求。
- 要跨页面加载保存请求，请选中网络面板上的 `Preserve log` 复选框。DevTools 保存所有请求，直到禁用保留日志。

## 重试 XHR 请求

要重试一个 XHR 请求，请右键单击请求表中的请求并选择 `Replay XHR`。

自从 Chrome67 之后，它引入了一个新特性，称为 `Copy as fetch`。

<img :src="$withBase('/images/web/copy-as-fetch.png')" alt="network_copy-as-fetch">

在这种情况下，您可以在控制台上回车进行执行。

## 更改加载行为

通常浏览器在访问某个网页后会缓存一些内容，通过选中 `Disable cache` 复选框来禁用浏览器缓存可以模拟首次访问。

要随时手动清除浏览器缓存，请在“请求”表中的任意位置单击鼠标右键，然后选择“清除浏览器缓存”。

<img :src="$withBase('/images/web/clear-browser-cache.png')" alt="network_clear-browser-cache">

## 手动清除浏览器 Cookie

要随时手动清除浏览器 Cookie，请右键单击“请求”表中的任何位置，然后选择 `Clear Browser Cookies`。

<img :src="$withBase('/images/web/clear-browser-cookies.png')" alt="network_clear-browser-cookies">

## 重写 UA

从菜单中选择用户代理选项，或在文本框中输入自定义选项。

<img :src="$withBase('/images/web/user-agent.png')" alt="network_user-agent">

## 筛选请求

通过用空格分隔每个属性，可以同时使用多个属性。例如 `mime-type:image/gif larger-than:1K` 显示所有大于 1 千字节的 GIF。这些多属性过滤器相当于和操作。或操作当前不受支持。

你可以在[这里](https://developers.google.com/web/tools/chrome-devtools/network/reference?hl=zh_cn#filter-by-property)看到支持的列表。

除了属性之外，你还可以通过类型进行筛选。要同时启用多个类型筛选器，请按住 Command（Mac）或 Control（Windows、Linux），然后再点击类型。

<img :src="$withBase('/images/web/multi-type-filter.png')" alt="network_multi-type-filter">

在 Overview 窗格上单击并向左或向右拖动，以仅显示在此时间范围内处于活动状态的请求。过滤器是包含的。将显示在突出显示的时间内处于活动状态的任何请求。

<img :src="$withBase('/images/web/overview-filter.png')" alt="network_overview-filter">

Data URLs 是嵌入到文档中的小文件。您在 Requests 表中看到的以 `data:` 开头的任何请求都是一个数据 URL。点击 `Hide data URLs` 复选框可以隐藏这些请求。

## 对请求进行排序

默认情况下，请求表中的请求按启动时间排序，但您可以使用其他条件对表进行排序。

单击请求中任何列的标题可按该列对请求进行排序。

<img :src="$withBase('/images/web/waterfall-total-duration.png')" alt="network_waterfall-total-duration">

## 分析请求

只要 DevTools 处于打开状态，它就会在网络面板中记录所有请求。使用网络面板分析请求。

## 查看请求日志

使用 Requests 表可以查看 DevTools 打开时发出的所有请求的日志。单击或将鼠标悬停在请求上会显示有关请求的更多信息。

要向请求表添加自定义列，请右键单击请求表的标题，然后选择 `Response Headers` > `Manage Header Columns`。

<img :src="$withBase('/images/web/custom-column.png')" alt="network_custom-column">

## 分析 WebSocket 连接的帧

在 Requests 列表的 Name 列下单击 WebSocket 连接的 URL。单击 Frames 标签，其中显示了最后 100 帧。

<img :src="$withBase('/images/web/frames.svg')" alt="network_frames">

可见显示的内容包含三列：

- 数据：消息有效负载。如果消息是纯文本，则显示在此处。对于二进制操作码，此列显示操作码的名称和代码。支持以下操作码：Continuation Frame、Binary Frame、Connection Close Frame、Ping Frame、Pong Frame。
- 长度：消息有效负载的长度，以字节为单位。
- 时间：接收或发送消息的时间。

消息根据其类型进行颜色编码：

- 发出的信息是浅绿色的。
- 收到的信息是白色的。
- 浅黄色的 WebSocket 代码。
- 错误为浅红色。

## 查看请求信息

点击请求列表中的每一条请求，可以查看返回体、请求头、返回头、请求参数、Cookies 等信息。值得一提的是你还可以查看请求的时间详细情况。

<img :src="$withBase('/images/web/timing.png')" alt="network_timing">

Queueing：浏览器在以下情况下对请求进行排队：有更高优先级的请求；已经有 6 个 TCP 连接打开；浏览器正在磁盘缓存中短暂地分配空间。 Stalled：请求可能因排队中描述的任何原因而暂停。 DNS Lookup：浏览器正在解析请求的 IP 地址。 Initial connection：浏览器正在建立连接，包括 TCP 握手/重试和协商 SSL。 Proxy negotiation：浏览器正在与代理服务器协商请求。 Request sent：正在发送请求。 ServiceWorker Preparation：浏览器正在启动服务工作者。 Request to ServiceWorker：请求正在发送到服务工作者。 Waiting (TTFB)：浏览器正在等待响应的第一个字节。 Content Download：浏览器正在接收响应。 Receiving Push：浏览器正在通过 HTTP/2 服务器推送接收此响应的数据。 Reading Push：浏览器正在读取以前接收到的本地数据。

## 查看启动器和依赖项

要查看请求的发起方和依赖项，请按住 Shift 键并将鼠标悬停在请求表中的请求上。DevTools 将启动器设置为绿色，将依赖项设置为红色。

<img :src="$withBase('/images/web/initiators-dependencies.png')" alt="network_initiators-dependencies">

当 Requests 表按时间顺序排序时，悬停在请求上方的第一个绿色请求是依赖关系的发起方。如果上面还有另一个绿色请求，那么更高的请求就是发起方的发起方。等等。

## 查看加载事件

DevTools 在网络面板的多个位置显示 DOMContentLoaded 和 load 事件的时间。DOMContentLoaded 事件为蓝色，load 事件为红色。

<img :src="$withBase('/images/web/load-events.png')" alt="network_load-events">

## 查看请求总数

请求总数列在“网络”面板底部的摘要窗格中（这个数字只跟踪自 DevTools 打开以来记录的请求。如果在打开 DevTools 之前发生了其他请求，这些请求不会被计算在内）。

<img :src="$withBase('/images/web/total-requests.svg')" alt="network_total-requests">

在其旁边你还可以查看总下载大小。

## 查看导致请求的堆栈跟踪

当 JavaScript 语句导致资源被请求时，将鼠标悬停在 Initiator 列上以查看导致请求的堆栈跟踪。

<img :src="$withBase('/images/web/initiator-stack.png')" alt="network_initiator-stack">

## 查看资源的未压缩大小

单击 `Use Large Request Rows`，然后查看 `Size` 列的底部值。

<img :src="$withBase('/images/web/large-request-rows.png')" alt="network_large-request-rows">

可见 jQuery 的压缩大小 `jquery-bundle.js` 通过网络发送的文件是 30.9KB，而未压缩的大小是 86.3KB。

## 保存所有请求信息

右击请求列表然后选择 `Save as HAR with Content`，DevTools 保存自您将 DevTools 打开到 HAR 文件以来发生的所有请求。没有办法过滤请求，或者只保存一个请求。

<img :src="$withBase('/images/web/save-as-har.png')" alt="network_save-as-har">

当得到 HAR 文件，就可以将其导入 DevTools 进行分析。只需将 HAR 文件拖放到 Requests 表中，另请参见 [HAR 分析器](https://toolbox.googleapps.com/apps/har_analyzer/)。

## 其它

[查看原文](https://developers.google.com/web/tools/chrome-devtools/network/reference)。
