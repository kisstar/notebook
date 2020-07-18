# 常见案例

- 获取执行脚本的路径

```bash
cwd=$(pwd)
```

脚本文件所在路径：

```bash
cwd=$(pwd)
filename=$cwd/$(dirname $0)
echo $filename
```

- 函数共享

```bash
# utils.sh
function print_info() {
  echo $*
}

# app.sh
source "./utils.sh"
print_info "Hello world"
```

- 判断文件或目录是否存在

```bash
# filename=/path/to/file
if [ -d $filename ]
then
  echo "存在该目录"
elif [ -f $filename ]
then
  echo "存在该文件"
else
  echo "指定的路径不存在?"
fi
```

- 判断是否支持某个命令

比如判断是否支持 Git 命令：

```bash
if [ `command -v git` ]
then
  echo "support"
else
  echo "Don't support"
fi
```

- 获取用户输入的值

```bash
tmp_str="1 + 1 = ? "
read -p "$tmp_str" ans
if [ "$ans" == "2" ]
then
  echo "I can't believe you got it right"
else
  echo "You need to work hard"
fi
```

- 判断数组中是否包含某个值

```bash
arr=('Apple' 'Orange')
function includes() {
  for item in ${arr[@]}
  do
    [ "$item" == "$1" ] && return 0
  done
}

tmp_str="What fruit do you like? "
read -p "$tmp_str" ans
if includes $ans
then
  echo "Me too"
else
  echo "That sounds good"
fi
```
