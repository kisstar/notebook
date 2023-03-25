# vim-surround 成对符号操作

快速给词加环绕符号，例如单引号/双引号/括号/成对标签等。

## 常见操作

在 `<motion>` 定义的文本周围添加所需的环绕效果：

```bash
# 添加(ys=you surround): ysiw"
Hello -> "Hello"

# 或者: csw"
Hello -> "Hello"

# 如果是在 visual modes: S <desired>
# 如: viwS"
Hello -> "Hello"
```

替换和删除：

```bash
# 替换: cs"'
"Hello world!" -> 'Hello world!'

# 删除: ds"
"Hello world!" -> Hello world!
```

## 标签操作

调整标签：

```bash
# 替换-标签(t=tag): cst"
<a>abc</a> -> "abc"

# cst<html>
<a>abc</a> -> <html>abc</html>
```

括号：

```bash
# 左符号/右符号 => 带不带空格
cs([
(hello) -> [ hello ]

cs(]
(hello) -> [hello]
```

## 其它操作

多个单词：

```bash
# 添加-两个词: veeS"
hello world -> "hello world"
```

针对行的操作：

```bash
# 添加-当前到行尾: ys$"
Hello world -> "Hello world"

# 添加-整行: yss"
Hello world -> "Hello world"

# ySS"
Hello world ->
"
    hello world
"
```
