# FFmpeg 基础

FFmpeg 是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。它提供了录制、转换以及流化音视频的完整解决方案。

## 命令分类

| 类别              |
| :---------------- |
| 基本信息查询命令  |
| 录制命令          |
| 分解/复用命令     |
| 处理原始数据命令  |
| 裁剪与合并命令    |
| 图片/视频互转命令 |
| 直播相关命令      |
| 各种滤镜命令      |

## 查询

| 参数      | 说明                | 参数         | 说明               |
| :-------- | :------------------ | :----------- | :----------------- |
| -version  | 显示版本            | -formats     | 显示可用的格式     |
| -demuxers | 显示可用的 demuxers | -protocols   | 显示可用的协议     |
| -muxers   | 显示可用的 muxers   | -fileters    | 显示可用的过滤器   |
| -devices  | 显示可用的设备      | -pix_fmts    | 显示可用的像素格式 |
| -codes    | 显示所用编解码器    | -sample_fmts | 显示可用的采样格式 |
| -decoders | 显示所有的编辑器    | -layouts     | 显示 channel 名称  |
| -encoders | 显示所有的编码器    | -colors      | 显示识别的颜色名称 |
| -bsfs     | 显示比特流          |              |                    |

比如查看可用的设备列表：

```bash
ffmpeg -devices # 在 Mac 中的输出中会包含 avfoundation 数据输入设备

```

## 录制

屏幕画面录制：

```bash
ffmpeg -f avfoundation -i 1 -r 30 out.yuv
```

- -f: 指定使用 avfoundation 采集数据
- -i: 指定输入来源，1 表示屏幕
- -r: 指定帧率
- out.yuv: 输出文件名称

播放录制结果：

```bash
ffplay -s 2880x1800 -pix_fmt uyvy422 out.yuv
```

- -s: 指定分辨率
- -pix-fmt: 解码的格式，默认为 yuv420p
- out.yuv: 指定播放文件名称

那么上面的指定屏幕从何而来呢？我们可以通过下面的命令查看 AVFoundation 所支持的设备列表：

```bash
ffmpeg -f avfoundation -list_devices true -i ""

# 以下是截取的部分输出，可见包括视频设备和音频设备，前者索引为 1 所指的就是录屏
# [AVFoundation indev @ 0x7fb1a5522180] AVFoundation video devices:
# [AVFoundation indev @ 0x7fb1a5522180] [0] FaceTime高清摄像头（内建）
# [AVFoundation indev @ 0x7fb1a5522180] [1] Capture screen 0
# [AVFoundation indev @ 0x7fb1a5522180] AVFoundation audio devices:
# [AVFoundation indev @ 0x7fb1a5522180] [0] MacBook Pro麦克风
```

音频录制：

```bash
ffmpeg -f avfoundation -i :0 out.wav
```

- -f: 指定使用 avfoundation 采集数据
- -i: 指定输入来源，:0 表示音频中的索引为 0 的设备，冒号可以和视频设备区别开
- out.wav: 输出文件名称

播放音频：

```bash
ffplay out.wav
```

## 分解和复用

多媒体格式转换：

```bash
ffmpeg -i input.mp4 -vcodec copy -acodec copy out.flv
```

- -i: 指定输入文件
- -vcodec: 视频编码处理方式，copy 表示直接复用，之前是什么编码就是什么
- -acodec: 音频编码处理方式
- out.flv: 输出文件

抽取视频：

```bash
ffmpeg -i input.mp4 -an -vcodec copy out.h264
```

- -an: 表示 audio not，即输出不包含音频
- out.h264: 输出视频文件，后缀为视频的编码

抽取音频：

```bash
ffmpeg -i input.mp4 -vn -acodec copy out.aac
```

- -vn: 表示 vedio not，即输出不包含视频
- out.aac: 输出的音频文件，后缀为音频的编码

## 处理原始数据

原始数据对于视频而言就是 YUV 数据，而音频则是 PCM 数据，它们没有经过任何编码。

提取 YUV 数据：

```bash
ffmpeg -i input.mp4 -an -c:v rawvideo -pix_fmt yuv420p out.yuv
```

- -c:v: 指定 rawvideo 为视频的编码方式
- -pix_fmt: 指定编码时的像素格式

提取 PCM 数据：

```bash
ffmpeg -i input.mp4 -vn -ar 44100 -ac 2 -f s16le out.pcm
```

- -ar: 表示 audio rate，音频的采样率
- -ac: 表示 audio channel，音频轨道
- -f: 数据存储格式为 s16le (signed 16 bits little endian, 有符号 16 位小端)

对原始音频进行播放：

```bash
# 和播放 YUV 数据一样，播放 PCM 也需要指定一些参数值
ffplay -ac 2 -ar 44100 -f s16le out.pcm
```

## 裁剪与合并

裁剪：

```bash
# 从第 10 秒开始截取 10 秒的视频分段
ffmpeg -i input.mp4 -ss 00:00:10 -t 10 fegment.ts
```

- -ss: 从什么时间点开始裁剪
- -t: 裁剪多久的时间

合并：

```bash
# 当期目录下包含 1.ts 和 2.ts 两个文件
# 在 inputs.txt 文件指定文件列表和就可以进行合并操作

$ cat inputs.txt
file '1.ts'
file '2.ts'

$ ffmpeg -f concat -i inputs.txt out.mp4
```

- -f concat: 表示对后面的文件进行合并
- -i inputs.txt: 指定了要拼接的内容，包含格式为 `file '<filename>'` 的文件列表

## 图片和视频互转

视频转图片：

```bash
ffmpeg -i input.mp4 -r 1 -f image2 image-%3d.jpeg
```

- -r: 指定转换图片的帧率，为 1 表示每秒转出一张图片
- -f: 指定转出图片的格式
- image-%3d.jpeg: 输出文件的名称，%3d 表示 3 位数字

图片转视频：

```bash
ffmpeg -i image-%3d.jpeg out.mp4
```

## 推流和拉流

直播推流：

```bash
ffmpeg -re -i input.mp4 -c copy -f flv rtmp://server/live/streamName
```

- -re: 减慢帧率速度，保证和真实的帧率一致
- -c: 指定音视频的编解码，单独指定音频使用 -a，使用 -v 则可以单独为视频指定
- -f: 指定推出流的格式
- rtmp://server/live/streamName: 指定 rtmp 服务器的地址

直播拉流：

```bash
ffmpeg -i rtmp://server/live/streamName -c copy dump.flv
```

当然也可以对 HTTP 协议直播源进行处理，比如：

```bash
ffmpeg -i http://server/live/streamName -c copy dump.m3u8
```

对于 RTMP、RTSP、HTTP 视频协议直播流地址都可以使用 FFplay 直接进行播放。

## 滤镜命令

```bash
ffmpeg -i input.mp4 -vf crop=in_w-200:in_h-200 -c:v libx264 -c:a copy out.mp4
```

- -vf: 表示 video filter，指定 crop 作为视频的滤镜，同时指定一些参数（in_w-200: 宽度减去 200，in_h-200: 高度减去 200）
- -c:a: 指定音频的编码

滤镜 `crop` 的参数后面还可以指定起始的位置，格式为：`out_w:out_h:x:y`，上面 `in_w` 表示视频的宽度，`in_h` 表示视频的高度。
