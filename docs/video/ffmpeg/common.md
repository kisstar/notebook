# 常见操作集

## 截图

```bash
ffmpeg -i input.mp4 -ss 00:00:03 -frames:v 1 -f image2 output.jpg
```

- -ss: 开始截图的时间点
- `-frames:v`: 截取多少张
- -f: 图片格式

## 调整视频分辨率

```bash
ffmpeg -i input.mp4 -s 1920x1080 output.mp4
```

- -s: 分辨率

## 去除图片水印

```bash
ffmpeg -i input.jpg -filter_complex "delogo=x=1610:y=34:w=288:h=68" output.jpg
```

## 去除视频水印

```bash
ffmpeg -i input.mp4 -filter_complex "delogo=x=1610:y=34:w=288:h=68" output.mp4
```

- x 和 y 是以左上角为原点的坐标
- w 和 h 是水印的矩形区域的宽度和高度

## 参考

- [使用 FFMPeg 快速生成视频截图 - 简书](https://www.jianshu.com/p/160069493da3)
- [FFMPeg 实例，分辨率相关的操作 - 张雨的博客 - CSDN 博客](https://blog.csdn.net/yu540135101/article/details/84346505)
- [BiliBili 视频爬取与水印去除 - SailLiao - CSDN 博客](https://blog.csdn.net/Lzlovez/article/details/103081353)
- [去除水印 · 强大的音视频处理工具：FFmpeg](https://crifan.github.io/media_process_ffmpeg/website/video_process/watermark/remove_watermark.html)
