# 查看命令帮助

在 `Linux` 系统中，大部分命令都具有 `--help` 和 `--version` 选项，可以帮助我们快速的识别命令的功能，当然也不仅如此。

- `--help` 显示帮助信息。
- `--version` 显示版本信息。

<!-- markdownlint-disable MD024 -->

## MAN

通过 `man` 指令可以查看 `Linux` 中的指令帮助、配置文件帮助和编程帮助等信息。

`man` 就是 `manual` 的缩写，用来查看系统中自带的参考手册，手册页分为多个部分，我们可以使用 `man man` 进行查看。

1. Executable programs or shell commands（普通的命令的帮助）

2. System calls (functions provided by the kernel)（可理解为被内核调用的函数的帮助）

3. Library calls (functions within program libraries)（函数和函数库的帮助）

4. Special files (usually found in /dev)（特殊文件的帮助）

5. File formats and conventions eg /etc/passwd（配置文件的帮助）

6. Games（游戏的帮助）

7. Miscellaneous (including macro packages and conventions), e.g. man(7), groff(7)（其他）

8. System administration commands (usually only for root)（系统管理员可用命令的帮助）

9. Kernel routines [Non standard]（内核相关文件的帮助）

### 语法

```bash
man [选项] [命令]
```

### 常用选项

| 名称 | 描述                                                                             |
| :--- | :------------------------------------------------------------------------------- |
| -f   | 等价于 **`whatis`** 指令，显示给定关键字的简短描述信息，可查看在手册中的哪几个章 |
| -a   | 在所有的 `man` 帮助手册中搜索                                                    |
| -P   | 指定内容时使用分页程序                                                           |
| -M   | 指定 `man` 手册搜索的路径                                                        |
| -k   | 等价于 **`apropos`** 指令，查看在帮助文档中和给定关键字相关的所有帮助            |

### 实例

`man` 是按照手册的章节号的顺序进行搜索的，如下，只会显示 `sleep` 命令的手册。

```bash
man sleep
```

如果想查看库函数 `sleep`，就要输入:

```bash
man 3 help
```

## shell 内部命令帮助信息

对于 `shell` 内部的命令可以使用 `help` 指令来查看帮组信息。

### 语法

```bash
help <command>
```

通常，我们可以使用 `whereis <command>` 来确定命令是否为 `shell` 的内部命令，如果查找不到命令的执行文件，就是 `shell` 的内部命令。

### 实例

查看 `cd` 指令的帮助信息。

```bash
help cd
```

## INFO

`info` 指令显示的几乎总是将它们的内容组织成多个区段（称为节点），每个区段也可能包含子区段（称为子节点）。

### 语法

```bash
info [选项] [参数]
```

### 选项

| 名称 | 描述                                 |
| :--- | :----------------------------------- |
| -d   | 添加包含 `info` 格式帮助文档的目录   |
| -f   | 指定要读取的 `info` 格式的帮助文档   |
| -n   | 指定首先访问的 `info` 帮助文件的节点 |
| -o   | 输出被选择的节点内容到指定文件       |

常用快捷键：

- SPACE：向前滚动一页。
- BACKUP 或 DEL：向后滚动一页。
- Q：退出 info。
- b 或 t 或 Home：文档的开始（b 是 begining 的意思）。
- e 或 End：档的末尾（b 是 ending 的意思）。

## 参考资料

- [Linux 达人养成计划 I](https://www.imooc.com/learn/175)
- [man 命令\_Linux man 命令用法详解：查看 Linux 中的指令帮助](http://man.linuxde.net/man)
