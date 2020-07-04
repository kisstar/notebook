# Bat 基础

批处理文件是无格式的文本文件，它包含一条或多条命令。它的文件扩展名为 `.bat` 或 `.cmd`。

## %cd% 和 %~dp0 的区别

`%cd%`：脚本执行的当前目录（全路径）。
`%~dp0%`：脚本文件所在的目录（全路径），并且带结尾的 `\`。

```shell
@echo off

set path_cd=%cd%
set path_dp0=%~dp0
echo Value of cd: %path_cd%
echo Value of dp0: %path_dp0%
pause
```

## SETLOCAL

在执行 SETLOCAL 之后所做的环境改动只限于批处理文件。

要还原原先的设置，必须执行 ENDLOCAL。

达到批处理文件结尾时，对于该批处理文件的每个尚未执行的 SETLOCAL 命令，都会有一个隐含的 ENDLOCAL 被执行。

## replace

替换的命令格式为：`%variable:oldStr=newStr%`，及匹配变量 `varibale` 中的 `oldstr` 变替换为 `newStr` 后输出。

例如在 NPM 自动生成的模块命令行脚本中有下面一行命令：

```shell
# 将 PATHEXT 当中的 ;.JS; 替换为 ;，避免搜索 JavaScript 文件
# https://stackoverflow.com/questions/28602962/why-to-exclude-js-from-pathext-for-global-node-js-commands-on-windows
@SET PATHEXT=%PATHEXT:;.JS;=;%
```

## ubstring

提取子串 `%variable:~m[,n]%`，其中 `m` 是跳过的字符长度，`n` 是保留的字符长度（可省略），并且两者都可以是负数，表示从后往前数。

```shell
@echo off

set str=abcdefg

echo %str:~1,2%
bc

echo %str:~-1%
g
```

## command line arguments

`%n`: 第 `n` 个参数，`n` 从 1 到 9。

`%*`: 所有的参数（最多 255 个）。
