# 基础使用指南

Visual Studio Code 采用经典的 VS 的 UI 布局，功能强大，扩展性也很强。

## 安装

你可以前往[官方下载地址][visualstudio_download]根据自己的平台下载相应的包，然后进行安装。

## Shell command

为了方便使用，你可以将 VS Code 提供的 `code` 命令添加到系统的环境变量 PATH 中，之后就可以在终端通过 `code` 命令来打开相应的目录或文件。

添加的方式很简单，只需要按下快捷键 `Ctrl + shift + p`，输入“Shell Command”，然后执行列表中的“Install 'code' command in PATH”。

```bash
# 打开当前目录
code .
# 打开 index.html 文件，不存在则自动创建
code index.html # 可以通过空格来同时打开多个文件
```

[visualstudio_download]: https://code.visualstudio.com/
