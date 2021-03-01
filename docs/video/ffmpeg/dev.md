# 基础开发

FFmpeg 是一款知名的开源音视频处理软件，它提供了丰富而友好的接口支持开发者进行二次开发。

## 代码结构

| 目录          | 说明                                   |
| :------------ | :------------------------------------- |
| libavcodec    | 提供了一系列编码器的实现               |
| libavformat   | 实现在流协议，容器格式及其基本 IO 访问 |
| libavutil     | 包括了 Hash 器，解码器和各种工具函数   |
| libavfilter   | 提供了各种音视频过滤器                 |
| libavdevice   | 提供了访问捕获设备和回放设备的接口     |
| libswresample | 实现了混音和重采样                     |
| libswscale    | 实现了色彩转换和缩放功能               |

## 日志系统

通过三步就能输出日志：

- 引入头文件: `include <libavutil/log.h>`
- 设置日志级别: `av_log_set_level(AV_LOG_DEBUG)`
- 打印日志: `av_log(NULL, AV_LOG_INFO, " ...%s\n", op)`

常用的日志级别：

- AV_LOG_ERROR
- AV_LOG_WARNING
- AV_LOG_DEBUG
- AV_LOG_INFO

```c
#include <libavutil/log.h>

int main(int argc, char* argv[])
{
  av_log_set_level(AV_LOG_DEBUG);
  av_log(NULL, AV_LOG_DEBUG, "hello world");

  return 0;
}
```

## 文件操作

删除文件：

```c
#include <libavformat/avformat.h>

int main(int argc, char* argv[])
{
  int ret;

  ret = avpriv_io_delete("./test.txt");

  if (ret < 0) {
    av_log(NULL, AV_LOG_ERROR, "Delete failed");

    return -1;
  }

  return 0;
}
```

移动文件则可以 `avpriv_io_move` 函数。

## 目录操作

和文件操作比较类似，操作目录需要先打开目录，然后读取目录中的每一项（AVIODirEntry）进行操作，最后使用完之后要进行关闭，整个过程通过 AVIODirContext 串联起来。

```c
#include <libavutil/avutil.h>
#include <libavformat/avformat.h>

int main(int argc, char *argv[])
{
  int ret;
  AVIODirContext *ctx = NULL;
  AVIODirEntry *entry = NULL;

  av_log_set_level(AV_LOG_INFO);
  ret = avio_open_dir(&ctx, "./", NULL); // 打开

  if (ret < 0)
  {
    av_log(NULL, AV_LOG_ERROR, "Can not open dir: %s\n", av_err2str(ret));
  }

  while (1)
  {
    ret = avio_read_dir(ctx, &entry); // 读取

    if (ret < 0)
    {
      av_log(NULL, AV_LOG_ERROR, "Can not open dir: %s\n", av_err2str(ret));

      goto __fail;
    }

    if (!entry)
    {
      break;
    }

    av_log(NULL, AV_LOG_INFO, "%12" PRId64 " %s \n", entry->size, entry->name);
    avio_free_directory_entry(&entry);
  }

__fail:
  avio_close_dir(&ctx); // 关闭

  return 0;
}
```

## 多媒体文件信息

多媒体文件其实是个容器，在容器里有许多的流（Stream/Track），从流中读取的数据成为包，在一个包中包含着一个或多个帧。

所以 FFmpeg 在操作数据时会首先对多媒体文件进行解复用拿到流，然后读取其中的数据包，对数据包解码后就可以进行各种操作，最后释放相关的资源。

在整个过程中我们需要使用到 AVFormatContext 来串联整个过程，期间可以使用 AVStream 来读取其中的流，然后截取流得到一个个包，也就是 AVPacket。

接下来我们尝试打印音视频信息，其中涉及到以下的几个函数：

- av_register_all(): 注册所有的编解码器、复用/解复用组件等
- avformat_open_input()/avformat_close_input(): 打开/关闭多媒体数据并且获得一些相关的信息
- av_dump_format(): 打印关于输入或输出格式的详细信息

```c
#include <libavutil/log.h>
#include <libavformat/avformat.h>

int main(int argc, char *argv[])
{
  int ret;
  AVFormatContext *fmt_ctx = NULL;

  av_log_set_level(AV_LOG_INFO);
  // av_register_all(); // 新版中已经不需要

  // 打开多媒体的第三个参数为媒体文件格式，默认根据扩展名决定，最后一个参数为额外的配置信息
  ret = avformat_open_input(&fmt_ctx, "./input.mp4", NULL, NULL);

  if (ret < 0)
  {
    av_log(NULL, AV_LOG_ERROR, "Can not open file: %s\n", av_err2str(ret));

    return -1;
  }

  // 此处的第二个参数为流的索引，第四个参数为 0 表示上下文是输入（将打印输入流），为 1 则表示输出（将打印输出流）
  av_dump_format(fmt_ctx, 0, "./input.mp4", 0);
  avformat_close_input(&fmt_ctx);

  return 0;
}
```
