# 在开发者工具中检查网络活动

通常，当需要确保资源按预期下载或上载时，请使用网络面板。网络面板最常见的使用情形有：

- 确保资源确实被上传或下载。
- 检查单个资源的属性，例如其 HTTP 标头、内容、大小等。

如果您正在寻找提高页面加载性能的方法，请不要从网络面板开始。有许多类型的负载性能问题与网络活动无关。从 Audits 面板开始，因为它提供了关于如何改进页面的有针对性的建议。

## 打开网络面板

要充分利用本教程，请打开演示并在演示页面上尝试这些功能。你可以先打开开发者工具，然后切换到网络面板中。刷新页面后，网络面板将所有网络活动记录在网络日志中。

<img :src="$withBase('/images/web/log.png')" alt="network_log">

网络日志的每一行代表一个资源。默认情况下，资源按时间顺序列出。顶层资源通常是主 HTML 文档。底层资源是最后请求的资源。

每列表示有关资源的信息，默认列中包括：

- Name：资源名称。
- Status：HTTP 响应代码。
- Type：资源类型。
- Initiator：是什么导致资源被请求。单击 `Initiator` 列中的链接可转到导致请求的源代码。
- Time：请求花了多长时间。
- Waterfall：请求的不同阶段的图形表示，通过 Hover 可以查看更多详细信息。

只要您打开了 DevTools，它就会在网络日志中记录网络活动。

## 显示更多信息

网络日志的列是可配置的。可以隐藏不使用的列。还有许多列在默认情况下是隐藏的，您可能会发现这些列很有用。

右键单击网络日志表的标题并选择域。现在显示每个资源的域。

<img :src="$withBase('/images/web/domain.png')" alt="network_domain">

## 模拟较慢的网络连接

用于构建站点的计算机的网络连接可能比用户的移动设备的网络连接更快。通过限制页面，您可以更好地了解页面加载到移动设备上需要多长时间。

单击节流下拉列表，默认设置为“online”，你可以选择预设的一些网络配置，比如 `Slow 3G`：

<img :src="$withBase('/images/web/throttling.png')" alt="network_throttling">

然后长按重新加载，选择空缓存和硬重新加载：

<img :src="$withBase('/images/web/hardreload.png')" alt="network_hardreload">

在重复访问时，浏览器通常从其缓存中提供一些文件，从而加快页面加载。空缓存和硬重新加载会强制浏览器访问网络上的所有资源。当您想了解初次访问者如何体验页面加载时，这很有帮助。

## 截图

屏幕截图可以让您看到页面在加载时的外观：点击网络面板右上角的配置按钮，然后选中 `Capture Screenshots`，通过空缓存和硬重新加载工作流重新加载页面。

<img :src="$withBase('/images/web/allscreenshots.png')" alt="network_allscreenshots">

单击第一个缩略图。DevTools 向您显示当时发生的网络活动。如果需要关闭截图面板，只需取消选中 `Capture Screenshots`，然后刷新页面。

## 检查资源的详细信息

点击一条资源，将显示“头部”标签。使用此标签检查 HTTP 头：

<img :src="$withBase('/images/web/headers.png')" alt="network_headers">

除此之外，在 Preview 标签页可以预览 HTML 的基本呈现，点击 Response 则可以看到返回的原始资源，最后 Timing 标签中显示了此资源的网络活动的详细情况。

## 搜索网络标题和响应内容

当您需要为某个字符串或正则表达式搜索所有资源的 HTTP 头和响应时，可以使用搜索窗格。

例如，假设您想检查您的资源是否使用了合理的缓存策略，你可以点击搜索图标，然后搜索面板将会显示在左侧：

<img :src="$withBase('/images/web/search.png')" alt="network_search">

在输入框中键入 Cache-Control 并按 Enter 键。搜索窗格列出它在资源标头或内容中找到的所有缓存控制实例。

单击结果以查看它。如果在头部信息中找到查询，则会打开“头部”标签。如果在内容中找到查询，则会打开“响应”标签。

## 过滤资源

DevTools 提供了大量的工作流来过滤出与当前任务无关的资源。

<img :src="$withBase('/images/web/filters.png')" alt="network_filters">

在过滤器文本框中输入 `png`，只显示包含文本 `png` 的文件。在这种情况下，唯一与过滤器匹配的文件是 PNG 图像。

过滤器文本框支持多种不同类型的过滤，包括普通字符串、正则表达式和属性。

## Block requests

当某些资源不可用时，页面的外观和行为如何？它是完全失效了，还是还是有点功能性？阻止查询请求：

1. Press Control+Shift+P or Command+Shift+P (Mac) to open the Command Menu.
2. Type block, select Show Request Blocking, and press Enter.
3. Click Add Pattern.
4. Type resource name（main.css）.
5. Click Add.
6. Reload the page.

<img :src="$withBase('/images/web/addblock.png')" alt="network_addblock">

如果要取消可以点击复选框。

## 其它

[查看原文](https://developers.google.com/web/tools/chrome-devtools/network)。
