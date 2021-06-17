# 浏览器音视频自动播放策略

浏览器为了防止网页在用户非自愿的情况下主动播放声音，对网页上的自动播放（Autoplay）功能做了限制：通常，浏览器在没有用户交互操作之前不允许有声音的媒体播放。

## 总览

| 浏览器  | 调整时间 | 版本号 | 策略概要                             |
| :------ | :------- | :----- | :----------------------------------- |
| Chrome  | 2018.4   | 66     | 禁止带音频媒体自动播放               |
| Safari  | 2017.9   | 11     | 禁止带音频媒体自动播放               |
| Firefox | 2079.3   | 66     | 禁止带音频媒体自动播放               |
| IE      | -        | -      | 允许自动播放                         |
| Edge    | -        | -      | 允许自动播放，至少 44 开始已支持配置 |
| QQ      | -        | -      | 允许自动播放，验证了 8.7             |
| 搜狗    | -        | -      | 允许自动播放，验证了 V11             |

## Chrome

2018 年 4 月开始（Chrome 66），策略调整为：

- 始终允许静音自动播放。
- 在以下情况下，允许自动播放声音：
  - 用户已与域交互（单击、点击等）。
  - 在桌面上，用户的媒体参与度指数已超过阈值，这意味着用户以前播放过有声音的视频。
  - 用户已将站点添加到移动设备的主屏幕或在桌面上安装了 PWA。
- 顶部的 frame 可以将自动播放权限委托给它们的 iframe，以允许自动播放声音。

其中，MEI 衡量个人在网站上使用媒体的倾向。Chrome 当前的方法是访问量与每个来源的重要媒体播放事件的比率：

- 媒体（音频/视频）的消耗必须大于 7 秒。
- 音频必须存在且未静音。
- “视频”选项卡处于活动状态。
- 视频大小（像素）必须大于 200x140。

See: [https://developers.google.com/web/updates/2017/09/autoplay-policy-changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)

### 自动播放检测

可以通过查看 play 函数的返回值，看看它是否被拒绝，如果没有则自动播放是成功的：

```javascript
var promise = document.querySelector('video').play()

if (promise !== undefined) {
  promise
    .then(_ => {
      // Autoplay started!
    })
    .catch(error => {
      // Autoplay was prevented.
      // Show a "Play" button so that user can start playback.
    })
}
```

### Hack

Chrome 浏览器对 video 标签和 audio 标签做了非常严格的限制，但对 iframe 的限制却没那么严格。所以可使用 iframe 来触发权限：

```html
<video></video>
<iframe allow="autoplay" style="display:none" src="一个空的音频文件"></iframe>

<script>
  ifm.onload = function() {
    vdo.src = 'YOUR_VIDEO_URL'
    vdo.oncanplay = function() {
      vdo.play()
    }
  }
</script>
```

## Firefox

从 2019 年 3 月 19 日（Firefox 66） 开始默认禁止网站自动播放任何媒体文件。用户可以手动设置默认阻止音/视频的播放策略，如果选择不阻止音视频自动播放，则程序的自动播放才会生效。

可行的方式时默认进行静音自动播发，但是需要用户后续手动开启声音。

如果设置一个定时器等待播放后再打开声音会导致视频暂停。

See: [https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/](https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/)

## Safari

从 2017 年的 Safari 11 浏览器开始，将使用自动推理引擎来阻止绝大多数网站默认自动播放的媒体元素。

同时，Safari 允许用户通过「此网站的设置」选项，让用户控制哪些网站可以自动播放音视频。

其自动播放的检查逻辑和 Chrome 的一致。

See: [https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/)

## IE11/Edge

目前没有看到 IE11 对自动播放策略的明确规定，也就是说自动播放是允许的。

从 Windows 10 build 17704 开始，Microsoft 在 Edge 中添加了一个新设置，允许您控制站点是否可以自动播放媒体，默认允许自动播放视频。

在 Edge 中检查是否允许自动播放的方式和 Chrome 一致。

See: [https://docs.microsoft.com/en-us/microsoft-edge/edgehtml/dev-guide/browser-features/autoplay-policies](https://docs.microsoft.com/en-us/microsoft-edge/edgehtml/dev-guide/browser-features/autoplay-policies)

## 总结

最好永远也不要相信视频会自动播放，但可以通过一些方式来提供自动播放。

- 可以使用静音提高自动播放的概率；
- 引导用户对浏览器设置为【允许自动播放】；
- 引导用户手动点击视频进行播放。

## 参考

- [Video.js Blog | Video.js](https://videojs.com/blog/autoplay-best-practices-with-video-js/)
