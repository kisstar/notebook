# C

C 语言是一个有结构化程序设计、具有变量作用域（variable scope 页面存档备份，存于互联网档案馆）以及递归功能的过程式语言。

## 编译

编写一个函数：

```c
// test.c
int sum(int a, int b)
{
  return (a + b);
}
```

编译：

```bash
clang -g -c test.c
```

生成静态库：

```bash
libtool -static -o libtestlib.a test.o
```

编写头文件：

```c
// test.h
int sum(int a, int b);
```

编写调用的函数：

```c
// sum.c
#include <stdio.h>
#include "test.h"

int main(int argc, char *argv[])
{
  int ret = sum(3, 5);

  printf("ret: %d", ret);

  return 0;
}
```

编译：

```bash
clang -g -O2 -o sum sum.c -I . -L . -l testlib
```

- -g: 输出文件中的调试信息，没有则无法调试
- -O: 对输出文件做指令优化
- -o: 输出文件
- -I: 指定头文件
- -L: 指定库文件地址
- -l: 指定使用哪个库

执行：

```bash
./sum
```

## 调试

| 命令     | gdb(Linux) | lldb(Mac) |
| :------- | :--------- | :-------- |
| 设置断点 | b          | b         |
| 运行程序 | r          | r         |
| 单步执行 | n          | n         |
| 跳入函数 | s          | s         |
| 跳出函数 | finish     | finish    |
| 打印内容 | p          | p         |
