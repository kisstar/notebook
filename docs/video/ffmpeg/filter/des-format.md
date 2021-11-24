# 滤镜描述格式

滤镜使用时的参数排列方式：

```bash
# [输入流或标记名] 滤镜参数 [临时标记名];[输入流或标记名] 滤镜参数 [临时标记名];...
```

如将一个图片缩放为 176x144 的分辨率铺在视频的左上角：

```bash
ffmpeg -i input.mp4 -i input.png -filter_complex "[1:v]scale=176:144[logo];[0:v][logo]overlay=x=0:y=0" output.mp4
```

## 时间内置变量

在使用 Filter 时经常会根据时间轴进行操作，下面是相关的一些基本内置变量：

| 变量 | 说明                                               |
| :--- | :------------------------------------------------- |
| t    | 时间戳以秒表示，如果输入的时间戳是未知的，则是 NAN |
| n    | 输入帧的顺序编号，从 0 开始                        |
| pos  | 输入帧的位置，如果未知则是 NAN                     |
| w    | 输入视频帧的宽度                                   |
| h    | 输入视频帧的高度                                   |

## Demo

See: <https://github.com/kisstar/notebook/blob/master/tests/video/ffmpeg/filter/des-format.js>
