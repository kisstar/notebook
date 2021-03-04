# xargs

`xargs` 可以将 `stdin` 中以空格或换行符进行分隔的数据，形成以空格分隔的参数（arguments），传递给其他命令。

由于是以空格作为分隔符，所以有一些文件名或者其他意义的字符串内含有空格的时候，`xargs` 可能会误判。

## 常用选项

```bash
-a, --arg-file=FILE
  # 从指定的文件 FILE 中读取输入内容
-d, --delimiter=DEL
  # 指定 xargs 处理输入内容时的分隔符，默认是按空格和换行符作为分隔符，输出 arguments 时按空格分隔
-E EOF_STR
  # 遇到 EOF_STR 时表示输入的结束
-I REPLACE_STR
  # 将 xargs 输出的每一项参数单独赋值给后面的命令，参数需要用指定的替代字符串 REPLACE_STR 代替
  # REPLACE_STR 可以使用 {} $ @ 等符号，其主要作用是当 xargs command 后有多个参数时，调整参数位置
```

## 案例

将 `shell` 的特殊字符反引号还原成一般字符：

```bash
$ echo '`0123`4 56789' | xargs -t echo
`0123`4 56789
```

从指定的文件中读取输入内容：

```bash
$ cat test.txt
a
b
c

$ xargs -a test.txt
a b c
```

以指定字符分隔输入的内容（_分隔符必须是单个字符或转义序列_）：

```bash
$ echo a,b,c | xargs
a b c
```

设置 xargs 读入参数时的结束标识（_结束标志必须要是单独的字段，即以空格或者换行符前后分隔的字段_），以逗号结束：

```bash
$ echo 01234 , 56789 | xargs -E ","
01234
```

备份以 `txt` 为后缀的文件：

```bash
find . -name "*.txt" | xargs -I {}  cp {} /tmp/{}.bak
```
