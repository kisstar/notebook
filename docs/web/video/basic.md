# Web 视频基础

当连续的图像变化超过 24fps 时，根据视觉暂留原理，人眼无法辨别单幅的静态画面；看上去是平滑连续的视觉效果，这样连续的画面就是视频。

视频（英语：video, videogram）是泛指将一系列的静态影像以电信号方式加以捕捉、纪录、处理、存储、发送与重现的各种技术。

视频技术最早是为了电视系统而发展，但现在已经发展为各种不同的格式以利消费者将视频记录下来。网络技术的发达也促使视频的纪录片段以串流媒体的形式存在于因特网之上并可被电脑接收与播放。

## 编码

原始视频占用的空间很大，通常需要经过编码压缩，比如一个未经压缩的时长 2 小时、分辨率为 1920x1080P 的视频采用 24bpp 位深度进行存储的话需要占用：

`24 * 1920 * 1080 * 24 * 60 * 60 * 2 / 8 / 1024 / 1024 / 1024 / 1024 ≈ 1T`

这属实是太夸张了！事实上，视频数据具有极强的相关性，也就是说有大量的冗余信息：

- 空间冗余性：图像中有许多颜色相同和相近的连续像素组成的区域，像素间具有强相关性。
- 时间冗余性：相邻帧的内容极其相似，也就是相邻帧之间存在强相关性。
- 视觉冗余性：图像的某些信息超出了人眼的接受力，可以进行忽略。
- 知识冗余性：图像的结构可由我们人类的先进知识或背景知识得到。
- 结构冗余性：某些图像存在明显的分布状态。

所以视频需要进行编码，通过消除连续图像之间的冗余信息来压缩视频。如何实现压缩，就要设计各种算法，以下是视频编码发展简史：

<img :src="$withBase('/images/web/codec-history.png')" alt="编码器发展史">

可见历程中主要分为两大国际标准组织：ISO/IEC 和 ITU-T。ITU-T 制定的视频编码标准称为 H.26x 系列，包括 H.261、H.263（H.263+，H.263++）等等，主要用于基于网络传输的视频通信。ISO/IEC 的动态图像专家组（MPEG）制定 MPEG 系列，主要用于视频存储、广播电视、网络流媒体等。

后续了为了实现标准的一致性，由 ITU-T 和 MPEG 联合制作了 H.262/MPEG-2、H.264/MPEG-4 AVC、H.265/HEVC 等标准。目前 H.264 标准已经在各个领域得到了广泛的应用，而 H.265 高性能视频编码则受困于高额专利费用，于是，我们看到众多厂商选择了免费开放的 VPx 系列编码。

VPx 系列编码实际上也已经有很长的历史了，在 Google 的介入下，VP8 从原本的专有技术变成了开放技术，其采用的技术类似于 H.264，后续参考 HEVC 很快又推出了它的继任者——VP9，最终 VP9 达成的结果是提供了比 VP8 高达 50%的效率提升。

尽管如此，VPx 系列存在的一些瑕疵导致其依然无法推广开来，于是后来一些厂商决定创立一个开放联盟，推广开放、免费的媒体编码标准，这个联盟就是开放媒体联盟（Alliance forOpenMedia），而标准就是 AOMedia Video 1（简称 AV1）。

## 封装

视频文件通常还包括音频和字幕等内容，所以还需要通过容器将它们封装到一起，而不同的封装方式也就对应了我们常说的视频文件格式。

容器与编解码器之间的区别很重要，因为具有相同容器的文件可以使用不同的编解码器来编码其内容，下图说明了这种结构：

<img :src="$withBase('/images/web/media-container-onion.png')" alt="媒体文件结构">

并非所有浏览器都支持最新的容器和编解码器，但所有现代的浏览器都支持 MP4 文件，这使它们成为媒体容器的不错的常规选择。

就 MP4 文件而言，它可能使用视频编解码器包括：AV1，H.264，VP9，而 AAC 则常做为其音频编解码器。

播放视频时则需要进行反向的解封转、解码等。

最后再将资源交由媒体播放器处理，比如以往的 Adobe Flash 和微软的 Silverlight 这样的插件。

## Flash

在 HTML5 视频标准最终被广泛支持以前，Flash 在 Web 视频播放方面有着统治地位。

Flash(Adobe Flash) 既指 Adobe Flash Professional(Adobe Animate，可创建 SWF 文件) 多媒体创作程序，也指 Adobe Flash Player（可播放 SWF 文件）。

严格来说，Adobe Flash 是创作环境而 Flash Player 是运行 Flash 文件的虚拟机。但是，通常二者均可称为 Flash，即 Flash 同时有三种含义：创作环境、播放器和程序文件。

Adobe Flash Player 最初设计目的为播放二维向量动画，但至此之后成为适合开发创造丰富性互联网应用程序、流视频音频的工具。

<img :src="$withBase('/images/web/install-flash.png')" alt="Flash">

Flash Player 使用矢量图形的技术来最小化文件的大小以及创造节省网络带宽和下载时间的文件。因此 Flash 成为嵌入网页中的小游戏、动画、广告、以及图形用户界面常用的格式。

## FLV

Flash Video（简称 FLV），是一种网络视频格式，用作流媒体格式，它的出现有效地解决了视频文件导入 Flash 后，使导出的 SWF 文件体积庞大，不能在网络上有效使用等缺点。

FLV 文件可以通过几种不同的方式传递：

- 使用 Flash 创作工具（Flash Player 6 及更高版本支持）嵌入到 SWF 文件中。必须先传输整个文件，然后才能开始播放，更改视频需要重建 SWF 文件。
- 作为独立的 FLV 文件。尽管 FLV 文件通常使用 Flash Player 进行控制，但 FLV 文件本身是完全独立的，可以从本地存储（如硬盘或 CD）播放或转换为其他格式。
- 使用 Flash 媒体服务器、VCS 或开源 Red5 服务器，通过 RTMP 流式传输到 Flash 播放器。
- 通过 HTTP 渐进式下载（Flash Player 7 及更高版本支持）。此方法使用 ActionScript 包含外部托管的 FLV 文件客户端以进行回放。

渐进式下载有几个优点，包括缓冲、使用通用的 HTTP 服务器，以及对多个 FLV 源重用单个 SWF 播放器的能力。

Flash Player 8 支持使用 HTTP 的部分下载功能在视频文件中进行随机访问，有时这被称为流式传输。然而，与使用 RTMP 的流媒体不同，HTTP“流媒体”不支持实时广播。

通过 HTTP 流需要一个自定义播放器和特定 FLV 元数据的注入，该元数据包含每个关键帧的确切起始位置（字节和时间码）。使用此特定信息，自定义 FLV 播放器可以从指定的关键帧开始请求 FLV 文件的任何部分。

因 Flash 的诸多限制和信息安全等问题，以及 HTML5、WebGL 和 WebAssembly 的兴起，各大浏览器开始弃用 Flash 预载，Flash Player 的使用率逐年下滑。Adobe 于 2017 年 7 月 25 日宣布于 2020 年 12 月 31 日停止更新和发行 Flash Player。

当前 Flash Player 已停止更新，并于 2021 年 1 月 12 日封锁 Flash 内容。而中国大陆将仍然由重橙网络科技代理，不受任何影响。

## HTML5

HTML5 通过 HTML 标签 `<video>` 在 HTML 或者 XHTML 文档中嵌入媒体播放器，用于支持文档内的视频播放。你也可以将 `<video>` 标签用于音频内容，但是 `<audio>` 元素在用户体验上更合适。

可以单独使用 `<video>` 元素，然后始终指定 `type` 属性，浏览器使用它来确定它是否可以播放提供的视频文件。如果不能，则显示随附的文本：

```html
<video src="example.webm" type="video/webm">
  <!-- <video> 标签不被支持时可以使用 Flash 播放 Flash 格式的影像 -->
  <object data="flvplayer.swf" type="application/x-shockwave-flash">
    <param value="flvplayer.swf" name="movie" />
  </object>
</video>
```

由于专利等问题，不同的浏览器对视频格式的支持情况是不同的，所以你得使用几个不同格式的文件来兼容不同的浏览器：

```html
<video controls>
  <source src="/example.webm" type="video/webm" />
  <source src="/example.mp4" type="video/mp4" />
  <p>Your browser cannot play the provided video file.</p>
</video>
```

尽管 `type` 属性对于 `<source>` 来说是可选的，但您应该始终将其添加到标签上。这样可以确保浏览器仅下载能够播放的文件。

当然，现在在网页上看到的大多数视频并非像上面说的的这么简单，所有这些网站虽然使用的是 `<video>` 标签，但是它们并不都是在 `src` 属性中直接指定视频地址，而是使用功能更强大的 MSE（Media Source Extensions）。

## MSE

媒体源扩展 API（MSE） 提供了实现无插件且基于 Web 的流媒体的功能。使用 MSE，媒体串流能够通过 JavaScript 创建，并且能通过使用 `<audio>` 和 `<video>` 元素进行播放。

正如上面所言，流媒体直到现在还在使用 Flash 进行服务，以及通过 RTMP 协议进行视频串流的 Flash 媒体服务器。

媒体源扩展（MSE）实现后，MSE 使我们可以把通常的单个媒体文件的 `src` 值替换成引用 MediaSource 对象，以及引用多个 SourceBuffer 对象（代表多个组成整个串流的不同媒体块）的元素。

```js
var video = document.querySelector('video')
var assetURL = '../video/flower.mp4' // fragmented
var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'

if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
  var mediaSource = new MediaSource()

  video.src = URL.createObjectURL(mediaSource)
  mediaSource.addEventListener('sourceopen', sourceOpen)
} else {
  console.error('Unsupported MIME type or codec: ', mimeCodec)
}

function sourceOpen() {
  var mediaSource = this
  var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)

  fetchAB(assetURL, function(buf) {
    sourceBuffer.addEventListener('updateend', function() {
      mediaSource.endOfStream()
      video.play()
    })
    sourceBuffer.appendBuffer(buf)
  })
}

function fetchAB(url, cb) {
  var xhr = new XMLHttpRequest()

  xhr.open('get', url)
  xhr.responseType = 'arraybuffer'
  xhr.onload = function() {
    cb(xhr.response)
  }
  xhr.send()
}
```

MSE 让我们能够根据内容获取的大小和频率，或是内存占用详情（例如什么时候缓存被回收），进行更加精准地控制。 它是基于它可扩展的 API 建立自适应比特率流客户端（例如 DASH 或 HLS 的客户端）的基础。

## HLS

虽然 MP4 文件在各个浏览器中的支持较好，但是其头文件较大。由于初始播放需要下载完整的头文件并进行解析，之后再下载一定长度的可播视频片段才能进行播放，这导致初始播放的时间变得很长，用户体验很差。

HTTP Live Streaming，缩写为 HLS，是由苹果公司提出基于 HTTP 的流媒体网络传输协议，可以用于解决上述问题。

HLS 的工作原理是把整个流分成一个个小的基于 HTTP 的文件来下载，每次只下载一些。当媒体流正在播放时，客户端可以选择从许多不同的备用源中以不同的速率下载同样的资源，允许流媒体会话适应不同的数据速率。

在开始一个流媒体会话时，客户端会下载一个包含元数据的扩展 M3U (m3u8) 播放列表文件，用于寻找可用的媒体流。

<img :src="$withBase('/images/web/HLS.png')" alt="HLS">

HLS 具有以下优点：

- 基于 HTTP 可以穿过任何允许 HTTP 数据通过的防火墙或者代理服务器。它也很容易使用内容分发网络来传输媒体流。
- 通过使用短时长的分片文件来进行播放，客户端可以平滑的切换码率，以适应不同带宽环境。
- HLS 是苹果推出的流媒体协议，在 IOS 平台上可以获得天然的支持。

当然，HLS 同样也存在一些缺点，比如其分段策略通常推荐是 10 秒一个分片，可见其在直播方面的延迟是相当高的，对于像视频会议这样的实时项目来说是难以接受的。

## DASH

DASH（Dynamic Adaptive Streaming over HTTP ）是一个规范了自适应内容应当如何被获取的协议。它实际上是建立在 MSE 顶部的一个层，用来构建自适应比特率串流客户端。相比 HLS 而言，DASH 具有最好的跨平台兼容性。

DASH 将大量逻辑从网络协议中移出到客户端应用程序逻辑中，使用更简单的 HTTP 协议获取文件。 这样就可以用一个简单的静态文件服务器来支持 DASH，这对 CDN 也很友好。这与之前的流传输解决方案形成鲜明对比，那些流解决方案需要昂贵的许可证来获得非标准的客户端/服务器协议才能实现。

DASH 的两个最常见的用例涉及“点播”或“直播”观看内容。点播功能让开发者有时间把媒体文件转码出多种不同的分辨率质量。

实时处理内容会引入由转码和播发带来的延迟。因此 DASH 并不适用于类似 WebRTC 的即时通讯。但它可以支持比 WebRTC 更多的客户端连接。

有非常多的自由开源的工具，能实现转码内容，并将其改造，以适应 DASH、DASH 文件服务器和用 JavaScript 编写的 DASH 客户端库。

## H5 player

当视频通过流媒体传输协议（比如：MPEG-DASH 和 Apple 的 HLS）从服务器端分发给客户端，媒体内容进一步被包含在一层传输协议中，如此一来 `<video>` 就无法识别了。

另外，虽然目前主流浏览器都支持的 `video` 标签，但是各个浏览器的视频播放器 UI 也各不相同，甚至同一个浏览器在不同的版本中也可能大相径庭，因此我们需要做些事情来抹平这些差异。

幸运的是目前社区中已经存在了不少这样的方案了，比如支持 HLS 的 [hls.js](https://github.com/video-dev/hls.js)，以及支持 FLV 的 [flv.js](https://github.com/Bilibili/flv.js) 等。

现在比较著名的当属 [Video.js](https://videojs.com/)，它是一款为 HTML5 从头构建的网络视频播放器，支持 HTML5 视频和媒体源扩展，可以在台式机和移动设备上播放视频。

Video.js 早在 2010 年中期就已开始启动，目前该播放器在超过 50000 个网站上使用，所以还是可信赖的，使用起来也非常方便：

```html
<link href="//vjs.zencdn.net/7.8.2/video-js.min.css" rel="stylesheet">
<script src="//vjs.zencdn.net/7.8.2/video.min.js"></script>

<video id="my-player" class="video-js" controls preload="auto" poster="//vjs.zencdn.net/v/oceans.png" data-setup='{}'>
  <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
</video>
```

业界中也包含了其它很多优秀的 H5 视频播放器，可以根据自己的需要和爱好去选择使用，或是研究。

## 最后

刚开始接触到音视频这块的内容，感觉还是蛮有意思的，文中的大部分内容都来自网络，主要是梳理一下自己最近看到的一些东西，算是一个小的总结。

路漫漫其修远兮，后续还需要慢慢的深入了解相关的知识，进行整理，如果文中有什么不妥，欢迎大家指正，一起交流学习。

## 参考

- [视频和音频内容 - 学习 Web 开发 | MDN](https://developer.cdn.mozilla.net/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
- [Media Source Extensions API - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API)
- [Video.js - Make your player yours | Video.js](https://videojs.com/)
