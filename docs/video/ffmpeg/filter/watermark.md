# 添加水印

水印可以是图片也可以是文字，主要用来标记视频所属标记。

## 文字水印

添加文字水印需要有文字字库处理的相关文件：在编译 FFmpeg 时需要支持 FreeType、FontConfig 和 iconv，系统中要有相关的字库。

你可以通过 brew 命令来查看当前 FFmpeg 的支持情况，其中打勾的表示已经支持：

```bash
$ brew info ffmpeg
==> Dependencies
Build: nasm ✘, pkg-config ✔
Required: aom ✔, dav1d ✔, fontconfig ✔, freetype ✔, frei0r ✔, gnutls ✔, lame ✔, libass ✔, libbluray ✔, libsoxr ✔, libvidstab ✔, libvorbis ✔, libvpx ✔, opencore-amr ✔, openjpeg ✔, opus ✔, rav1e ✔, rtmpdump ✔, rubberband ✔, sdl2 ✔, snappy ✔, speex ✔, srt ✔, tesseract ✔, theora ✔, webp ✔, x264 ✔, x265 ✔, xvid ✔, xz ✔
```

增加纯字母水印可以使用 drawtext 滤镜进行支持，下面是该滤镜相关的参数：

| 变量      | 类型   | 说明                       |
| :-------- | :----- | :------------------------- |
| fontfile  | 字符串 | 字体文件                   |
| text      | 字符串 | 文字                       |
| textfile  | 字符串 | 文字文件                   |
| fontcolor | 色彩   | 字体颜色                   |
| box       | 布尔   | 文字区域背景框             |
| boxcolor  | 色彩   | 字体颜色                   |
| fontsize  | 整数   | 显示字体的大小             |
| font      | 字符串 | 字体名称，默认为 Sans 字体 |
| x         | 整数   | 文字显示的 x 坐标          |
| y         | 整数   | 文字显示的 y 坐标          |

例如，在视频的右上角添加文字水印：

```bash
ffmpeg -i input.mp4 -vf "drawtext=fontsize=100:fontfile=FreeSerif.ttf:text='hello world':x=20:y=20" output.mp4
```

如果需要指定中文水印，则在系统中需要包含中文字库与中文编码支持才行：

```bash
ffmpeg -re -i input.mp4 -vf "drawtext=fontsize=100:fontfile=/Library/Fonts/Songti.ttc:text='你好，世界':x=20:y=20" output.mp4
```

另外，以本地时间作为水印内容也可以通过特殊用法来实现，甚至可以指定定时显示和定时不显示（通过 enable 配合）：

```bash
ffmpeg -i input.mp4 -vf "drawtext=fontsize=100:fontfile=FreeSerif.ttf:text='%{localtime\:%Y\-%m\-%d %H-%M-%S}':x=20:y=20:enable=lt(mod(t\,3)\,1)" output.mp4
```

执行上面的命令将会以本地时间作为水印，同时没三秒钟闪现一下水印的内容。

## 图片水印

除了添加简单的文字水印外，还可以添加图片水印、视频跑马灯等，主要使用的是 movie 滤镜，其相关参数如下：

| 变量          | 类型     | 说明                                 |
| :------------ | :------- | :----------------------------------- |
| filename      | 字符串   | 输入的文件名，可以是文件、协议、设备 |
| format_name,f | 字符串   | 输入的封装格式                       |
| stream_index  | 整数     | 输入的流索引编号                     |
| seek_point,sp | 浮点数   | Seek 输入流的时间位置                |
| stream,s      | 字符串   | 输入的多个流的流信息                 |
| loop          | 整数     | 循环次数                             |
| discontinuity | 时间差值 | 支持跳动的时间戳差值                 |

通过 filter 读取输入文件的流可以指定为水印，这里主要说的是通过 movie 指定水印的方式：

```bash
ffmpeg -i input.mp4 -vf "movie=input.png[wm]; [in][wm]overlay=30:10[out]" ouput.mp4
```

执行上面的命令将会将图片添加视频中，其中 `30:10` 表示起始位置的横纵坐标。

通过与 colorkey 滤镜配合可以呈现出半透明的效果：

```bash
ffmpeg -i input.mp4 -vf "movie=input.png,colorkey=black:1.0:1.0[wm]; [in][wm]overlay=30:10[out]" ouput.mp4
```

最终将会根据 colokey 设置的颜色值、相似度、混合度与原片混合为半透明水印。

## 画中画

通过 overlay 可以将多个视频流、多个视频文件、多个多媒体采集设备合并到一个界面中，生成画中画的效果，下面是其相关的一些参数：

| 变量 | 类型 | 说明 |
| :-- | :-- | :-- |
| x | 字符串 | x 坐标 |
| y | 字符串 | y 坐标 |
| eof_action | 整数 | 遇到 eof 标志时的处理方式，默认为重复。<ul><li>repeat（值为 0）：重复前一帧</li><li>endall（值为 1）：停止所有的流</li><li>pass（值为 2）：保留主图层</li></ul> |
| shortest | 布尔 | 终止最短的视频时全部终止（默认关闭） |
| format | 整数 | 设置 output 的像素格式，默认为 yuv420。<ul><li>yuv420（值为 0）</li><li>yuv422（值为 1）</li><li>yuv444（值为 2）</li><li>rgb（值为 3）</li></ul> |

在滤镜的使用中还有很多组合的参数可以使用，可以使用一些内部变量，例如 overlay 图层的宽、高、坐标等。

```bash
ffmpeg -re -i input.mp4 -vf "movie=sub.mp4,scale=480x320[test]; [in][test]overlay [out]" -vcodec libx264 ouput.flv
```

如果需要指定子视频的显示位置则需要用到 overlay 中的 x 坐标和 y 坐标的内部变量，如设置 `overlay=x=main_w-480:y=main_h-320`，子视频会定位在主画面最右边减去视频的宽度，最小边减去视频的高度的位置，也就是右下角。

除了静态位置处理外，还可以使用 overlay 配合正则表达式进行跑马灯式画中画处理，即动态改变子画面的横纵坐标：

```bash
ffmpeg -re -i input.mp4 -vf "movie=sub.mp4,scale=480x320[test]; [in][test]overlay=x='if(gte(t,2), -w+(t-2)*20, NAN):y=0' [out]" -vcodec libx264 ouput.flv
```

## Demo

文字水印: <https://github.com/kisstar/notebook/blob/master/tests/video/ffmpeg/filter/watermark.js>
