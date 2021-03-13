# sed

Linux sed 命令是利用脚本来处理、编辑文本文件。

## 命令格式

```bash
sed [选项参数] [-e]'[pattern]script' file
# 或
sed [选项参数] -f scriptfile file
```

## 常用选项

```bash
# 直接在命令行以指定的 script 来处理输入的文本文件
-e<script> 或 --expression=<script>

# 以选项中指定的 script 文件来处理输入的文本文件
-f<script文件> 或 --file=<script文件>

# 仅显示 script 处理后的结果
-n 或 --quiet 或 --silent

# 直接修改文件内容
-i

# 支持扩展正则表达式
-r
```

## 常用操作

```bash
# 插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)
i

# 新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)
a

# 取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行
c

# 取代，可以直接进行取代，通常这个 s 的动作可以搭配正规表示法，例如 1,20s/old/new/g
s

# 删除
d

# 打印，亦即将某个选择的数据印出
p
```

## 常用匹配

| 匹配模式                     | 说明                                                 |
| :--------------------------- | :--------------------------------------------------- |
| 10command                    | 匹配到第 10 行                                       |
| 10,20command                 | 从第 10 行开始，到底 20 行结束                       |
| 10,+5command                 | 从第 10 行开始，到第 16 行结束                       |
| /pattern/                    | 匹配到匹配指定规则的行                               |
| /pattern1/,/pattern2/command | 从匹配 /pattern1/ 的行开始，到匹配 /pattern2/ 行结束 |
| 10,/pattern/command          | 从第 10 行开始，到匹配 /pattern/ 的行结束            |

## 案例

在第 5 行后增加一行内容：

```bash
$ cat test.txt
1
2
3
4
5

$ sed "5a6" test.txt
1
2
3
4
5
6
```

## 其它

由于 Mac 系统与 Linux 系统下 `sed` 用法的差异，直接在 Mac 下使用可以回报 `command a expects \ followed by text` 的错误。

可以安装 `gnu-sed` 命令，使其与 Linux 的一致：

```bash
brew install gnu-sed
alias sed=gsed
```
