# awk

AWK 是一种处理文本文件的语言，是一个强大的文本分析工具。

之所以叫 AWK 是因为其取了三位创始人 Alfred Aho，Peter Weinberger, 和 Brian Kernighan 的 Family Name 的首字符。

## 命令格式

```bash
awk [选项参数] 'script' var=value file(s)
# 或
awk [选项参数] -f scriptfile var=value file(s)
```

默认情况下会遍历每一行进行处理，也可以通过加入匹配规则来对指定的数据进行处理。

```bash
# BEGIN 后面大括号中的指令会在正式处理文本之前执行，对应 END 后面括号中的指令会在文本处理完之后执行
# patter 就是指定的匹配规则，默认是每一行，匹配之后会使用其后指定的 commands 去处理
# 在括号中，多个命令可以使用分号进行分割
awk 'BEGIN{}patter{commands}END{}' file_name
```

## 内置变量

Awk 是一种便于使用且表达能力强的程序设计语言，可应用于各种计算和数据处理任务，其中内置了一些变量。

| 变量     | 含义                                              |
| :------- | :------------------------------------------------ |
| \$0      | 整行内容                                          |
| NF       | 当前行的经分隔符分割后的字段个数，也就是有多少列  |
| $1-$n    | 当前行的第 1-n 个字段                             |
| NR       | 当前行的行号，从 1 开始计数，多文件时会累加       |
| FNR      | 多文件处理时，每个文件行号单独计数，都是从 0 开始 |
| FS       | 输入分割字段符，默认以空格或 Tab 键分割           |
| RS       | 输入行分隔符，默认回车换行                        |
| OFS      | 输出字段分隔符                                    |
| ORS      | 输出行分隔符                                      |
| FILENAME | 当前输入文件的名字                                |
| ARGC     | 命令行参数个数                                    |
| AGRV     | 命令行参数数组                                    |

```bash
$ cat test.txt
1
2
3

$ awk '{print $0}' test.txt
1
2
3
```

## 内置函数

Awk 除了内置了一些变量之外，内置了一些常用的函数。

| 函数             | 功能                                           |
| :--------------- | :--------------------------------------------- |
| rand()           | 返回任意数字 n，其中 0 <= n < 1                |
| length[(String)] | 返回 String 参数指定的字符串的长度（字符形式） |

```bash
$ cat test.txt
1
2
3

$ awk '{print rand()}' test.txt
0.840188
0.394383
0.783099
```

## 格式化输出

打印输出时，`printf` 包括一个加引号的控制串，控制串中可能嵌有若干格式说明和修饰符。

| 格式符 | 用途                     |
| :----- | :----------------------- |
| %s     | 打印字符串               |
| %d     | 打印十进制数             |
| %f     | 打印一个浮点数           |
| %x     | 打印十六进制数           |
| %o     | 打印八进制数             |
| %e     | 打印数字的科学计数法形式 |
| %c     | 打印单个字符的 ASCII 码  |
| -      | 打左对齐                 |
| +      | 右对齐                   |
| #      | 显示进制前缀             |

```bash
$ cat test.txt
1
2
3

$ awk '{printf $0}' test.txt
123

$ awk '{printf "%+9s\n",$0}' test.txt
        1
        2
        3
```

## 常用选项

```bash
# 指定输入文件折分隔符(相当于内置变量 FS)，fs 是一个字符串或者是一个正则表达式，如 -F:
-F fs or --field-separator fs

# 从脚本文件中读取命令
-f scripfile or --file scriptfile

# 定义一个 awk 变量并赋值，可以将外部变量传递给 awk
-v, --assign VAR=VAL
```

## 匹配模式

匹配模式主要包含正则匹配和关系运算匹配两种。

```bash
# 匹配 /etc/passwd 文件中以 root 开头的行
awk '/^root/{print $0}' /etc/passwd
```

常见的运算符包括：

| 符号 | 说明                 |
| :--- | :------------------- |
| >    | 大于                 |
| <    | 小于                 |
| ==   | 等于                 |
| ~    | 匹配指定的正则表达式 |
| \|   | 或                   |
| &    | 与                   |
| !    | 非                   |

```bash
# 以冒号为字段分隔符，匹配 /etc/passwd 文件中第 3 个字段大于 50 的行
awk 'BEGIN{FS=":"}$3>50{print $0}' /etc/passwd

# 以冒号为字段分隔符，匹配 /etc/passwd 文件中第 3 个字段包含 3 个以上数字的行
awk 'BEGIN{FS=":"}$3~/\d{3,}/{print $0}' /etc/passwd
```

## 案例

求给定数据每行的平均值。

```bash
$ cat score.txt
Marry   2143 78 84 77
Jack    2321 66 78 45
Tom     2122 48 77 71
Mike    2537 87 97 95
Bob     2415 40 57 62

$ cat cal.awk
# 运行前
BEGIN {
    math = 0
    english = 0
    computer = 0

    printf "NAME    NO.   MATH  ENGLISH  COMPUTER   TOTAL\n"
    printf "---------------------------------------------\n"
}
# 运行中
{
    math+=$3
    english+=$4
    computer+=$5
    printf "%-6s %-6s %4d %8d %8d %8d\n", $1, $2, $3,$4,$5, $3+$4+$5
}
# 运行后
END {
    printf "---------------------------------------------\n"
    printf "AVERAGE:%10.2f %8.2f %8.2f\n", math/NR, english/NR, computer/NR
}

$ awk -f cal.awk score.txt
NAME    NO.   MATH  ENGLISH  COMPUTER   TOTAL
---------------------------------------------
Marry  2143     78       84       77      239
Jack   2321     66       78       45      189
Tom    2122     48       77       71      196
Mike   2537     87       97       95      279
Bob    2415     40       57       62      159
---------------------------------------------
AVERAGE:     63.80    78.60    70.00
```
