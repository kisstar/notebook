# 调用 C++

Node.js 调用 C++ 主流的有两种方法，分别是 addons 和 ffi。前者是官方提供的 C++ 扩展实现方案，但是由于需要使用模版，并且要对 v8 引擎有一定的了解，门槛较高。

后者则可以直接调用动态链接库，相关的 node-ffi 就是一个用于使用纯 JavaScript 加载和调用动态库的 Node.js 插件。它可以用来在不编写任何 C ++ 代码的情况下创建与本地 DLL 库的绑定。

node-ffi 连接了 C 代码和 JS 代码, 通过 Buffer 类实现内存共享来完成调用, 其内部通过 ref，ref-array 和 ref-struct 来实现类型转换。

与此类似的项目是 ffi-napi，其更新维护更胜 node-ffi，接下里我们以 ffi-napi 为例来看下具体的使用方式。

## 创建动态链接库

1、创建动态库头文件：

```c
// hello.hpp
// 按照 C 语言方式编译和链接
extern "C"
{
  void sayHello();
}
```

编译后的函数名字在 C 和 C++ 中是不同的，对于 C++而言，由于拥有函数重载的特性，所以基本函数名称相同，若返回值类型或参数的个数和类型任一者不同，编译后的函数名字都不一样。

在 ffi 中，它在 dll 中查找函数名字的时候, 是用 C 风格来查找的，所以如果你的函数使用 C++编译的, ffl 在这个 dll 中就找不到这个函数：

```bash
/Users/kisstar/tmp/node_modules/ffi-napi/lib/dynamic_library.js:113
    throw new Error('Dynamic Symbol Retrieval Error: ' + this.error());
          ^

Error: Dynamic Symbol Retrieval Error: dlsym(0x7fb9e751feb0, sayHello): symbol not found
    at DynamicLibrary.get (/Users/kisstar/tmp/node_modules/ffi-napi/lib/dynamic_library.js:113:11)
    at /Users/kisstar/tmp/node_modules/ffi-napi/lib/library.js:55:21
    at Array.forEach (<anonymous>)
    at new Library (/Users/kisstar/tmp/node_modules/ffi-napi/lib/library.js:52:28)
    at file:///Users/kisstar/tmp/index.js:4:13
    at ModuleJob.run (node:internal/modules/esm/module_job:185:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:281:24)
    at async loadESM (node:internal/process/esm_loader:88:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)
```

2、创建动态库源文件：

```c
// hello.cpp
#include <iostream>
#include "hello.hpp"

using namespace std;

void sayHello()
{
  cout << "Hello world" << endl;
}
```

3、生成动态链接库：

```bash
g++ -g -o libhello.dylib -fpic -shared hello.cpp
```

## 调用动态链接库

1、安装 ffi-napi：

```bash
npm install ffi-napi
```

2、在脚本中调用：

```js
// index.mjs
import ffi from 'ffi-napi'

// ffi.Library 用于注册函数，第一个入参为 DLL 路径，最好为文件绝对路径
const dll = ffi.Library('./libhello.dylib', {
  // sayHello 是 dll 中定义的函数，两者名称需要一致
  // 格式为：[a, [b，c....]]，其中 a 是函数出参类型，[b，c] 是 dll 函数的入参类型
  sayHello: ['void', []], // 可以用文本表示类型， 更推荐用`ref.types.xx`表示类型
})

dll.sayHello()
```

3、执行脚本：

```bash
$ node index.mjs
Hello world
```

## 其它

在 Windows 中的动态库中，需要使用 `__declspec(dllexport)` 声明导出函数、类、对象等供外面调用，而 gcc（Linux 和 Mac OS X 的默认编译器）下，所有函数默认均导出。

## 参考

- [electron 教程(三): 使用 ffi-napi 引入 C++的 dll - Silenzio - 博客园](https://www.cnblogs.com/silenzio/p/11606389.html)
- [node-ffi 使用指南 - 掘金](https://juejin.cn/post/6844903645905977357)
- [MacOS 下 动态链接库 dylib 的生成 - Aditya's Blog](https://blog.adityasui.com/article/5eb3d86fa9b22753cd415a14)
- [C/C++ 静态链接库(.a) 与 动态链接库(.so) - 52php - 博客园](https://www.cnblogs.com/52php/p/5681711.html)
