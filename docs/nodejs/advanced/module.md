# 模块机制

在 Node.js 诞生之初 JavaScript 缺乏标准的模块机制，为了弥补这一缺陷社区陆续提出了一些规范，其中 CommonJS 规范并是 Node.js 采用的模块机制。

<img :src="$withBase('/images/nodejs/advanced/commonjs-js.png')" alt="CommonJS">

## CommonJS 的模块规范

CommonJS 对模块的定义十分简单，主要分为模块定义、模块引用和模块标识 3 个部分。

- 模块定义

在模块中，上下文提供了 `module` 对象，它上面的的 `exports` 属性也是一个对象，用于导出当前模块的方法或者变量，并且它是唯一导出的出口。

在 Node 中，一个文件就是一个模块，将方法挂载在 `exports` 对象上作为属性即可定义导出的方式：

```js
// math.js
exports.add = function (num1, num2) {
  return num1 + num2
}
```

- 模块引用

在 CommonJS 规范中，模块上下文同时提供了 `require()` 方法，这个方法接受模块标识，以此引入一个模块的 API 到当前上下文中。

```js
var math = require('math') // 可以省略 .js 后缀
```

- 模块标识

模块标识其实就是传递给 `require()` 方法的参数，它必须是符合小驼峰命名的字符串，或者以 `.` 或 `..` 开头的相对路径，或者绝对路径。

## Node 的模块实现

Node 模块主要分为 2 类：

- Node 提供的核心模块（在 Node 源代码编译时编译进了二进制执行文件，当 Node 启动时核心模块被直接加载到内存中）；
- 用户编写的文件模块。

在的模块实现上对规范有一定的取舍和扩展，在引入模块时通常需要经历 3 个步骤：

- 路径分析；
- 路径定位；
- 编译执行。

定位到具体的文件后，Node 会新建一个模块对象，然后根据路径载入并编译。对于不同的文件扩展名，其载入方法也有所不同：

- .js 文件。通过 fs 模块同步读取文件后编译执行；
- .node 文件。这是用 C/C++编写的扩展文件，通过 `dlopen()` 方法加载最后编译生成的文件；
- .json 文件。通过 fs 模块同步读取文件后，用 `JSON.parse()` 解析返回结果；
- 其余扩展名文件。它们都被当做.js 文件载入。

## 核心模块

核心模块分为 C/C++ 编写和 JavaScript 编写的 2 部分，其中 C/C++存放在 Node 项目的 src 目录下，JavaScript 文件存放在 lib 目录下。

### JavaScript 核心模块的编译

在编译所有 C/C++ 文件之前，编译程序需要将所有的 JavaScript 模块文件编译为 C/C++ 代码。

Node 采用了 V8 附带的 js2v.py 工具，将所有内置的 JavaScript 代码（`src/node.js` 和 `lib/*.js`）转换成 C++里的数组，生成 node_natives.h 头文件。

此时 JavaScript 代码以字符串的形式存储在 node 命名空间中，是不可执行的。在启动 Node 进程时，JavaScript 代码直接加载到内存中。

这些模块也没有定义 require、module、exports 这些变量。在引入 JavaScript 核心模块的过程中，也经历了头尾包装的过程，然后才执行和导出了 exports 对象。

JavaScript 核心模块的定义如下面的代码所示，源文件通过 `process.binding('natives')` 取出，编译成功的模块缓存到 `NativeModule._cache` 对象上，文件模块则缓存到 `Module._cache` 对象上：

```js
function NativeModule(id) {
  this.filename = id + '.js'
  this.id = id
  this.exports = {}
  this.loaded = false
}

NativeModule._source = process.binding('natives')
NativeModule._cache = {}
```

### C/C++ 核心模块的编译

核心模块中有的模块部分由 C/C++ 编写，有的模块全由 C/C++ 编写，这种全由 C/C++ 编写的模块称为内建模块。

内建模块通常不被用户直接调用，像 Node 的 buffer、crypto、evals、fs、os 等模块都是部分通过 C/C++编写的。

在 Node 中，内建模块的内部结构定义如下：

```c
struct node_module_struct {
 int version;
 void *dso_handle;
 const char *filename;
 void (*register_func) (v8::Handle<v8::Object> target);
 const char *modname;
};
```

每一个内建模块在定义之后，都通过 NODE_MODULE 宏将模块定义到 node 命名空间中，模块的具体初始化方法挂载为结构的 register_func 成员：

```c
#define NODE_MODULE(modname, regfunc)
 extern "C" {
  NODE_MODULE_EXPORT node::node_module_struct modname ## _module =
  {
    NODE_STANDARD_MODULE_STUFF,
    regfunc,
    NODE_STRINGIFY(modname)
  };
 }
```

node_extensions.h 文件将这些散列的内建模块统一放进了一个叫 node_module_list 的数组中，Node 提供了 `get_builtin_module()` 方法从 node_module_list 数组中取出这些模块。

#### 内建模块的导出

在 Node 的所有模块类型中，文件模块可能会依赖核心模块，核心模块可能会依赖内建模块。

<img height="200" :src="$withBase('/images/nodejs/advanced/module-order.png')" alt="Module Order">

Node 在启动时，会生成一个全局变量 process，并提供 `Binding()` 方法来协助加载内建模块。`Binding()` 的实现代码在 `src/node.cc` 中。

其中在加载内建模块时，会先创建一个 exports 空对象，然后调用 `get_builtin_module()` 方法取出内建模块对象，通过执行 `register_func()` 填充 exports 对象，最后将 exports 对象按模块名缓存，并返回给调用方完成导出。

所以从 JavaScript 到 C/C++ 的过程是相当复杂的，需要经历 C/C++ 层面的内建模块定义、（JavaScript）核心模块的定义和引入以及（JavaScript）文件模块层面的引入：

<img height="320" :src="$withBase('/images/nodejs/advanced/native-module.png')" alt="Native Module">

#### 编写核心模块

编写内建模块通常分两步完成：编写头文件和编写 C/C++ 文件。

以实现下面 JavaScript 代码所示的简单功能为例：

```js
exports.sayHello = function () {
  return 'Hello world!'
}
```

(1) 将以下代码保存为 node_hello.h，存放到 Node 的 src 目录下：

```c
#ifndef NODE_HELLO_H_
#define NODE_HELLO_H_
#include <v8.h>
namespace node {
 // 预定义方法
 v8::Handle<v8::Value> SayHello(const v8::Arguments& args);
}
#endif
```

(2) 编写 node_hello.cc，并存储到 src 目录下：

```c
#include <node.h>
#include <node_hello.h>
#include <v8.h>
namespace node {
using namespace v8;
// 实现预定义的方法
Handle<Value> SayHello(const Arguments& args) {
 HandleScope scope;
 return scope.Close(String::New("Hello world!"));
}
// 给传入的目标对象添加sayHello方法
void Init_Hello(Handle<Object> target) {
 target->Set(String::NewSymbol("sayHello"), FunctionTemplate::New(SayHello)->GetFunction());
}
}
// 调用NODE_MODULE()将注册方法定义到内存中
NODE_MODULE(node_hello, node::Init_Hello)
```

以上两步完成了内建模块的编写，还需要更改 `src/node_extensions.h` 让 Node 认为它是内建模块，在 NODE_EXT_LIST_END 前添加 NODE_EXT_LIST_ITEM(node_hello) ，以将 node_hello 模块添加进 node_module_list 数组中。

其次，还需要让编写的两份代码编译进执行文件，同时需要更改 Node 的项目生成文件 node.gyp，并在 `'target_name': 'node'` 节点的 sources 中添加上新编写的两个文件。然后编译整个 Node 项目。

## C/C++扩展模块

C/C++ 扩展模块属于文件模块中的一类，它通过预先编译为 .node 文件，然后调用 `process.dlopen()` 方法加载执行。

Node 的原生模块一定程度上是可以跨平台的，这是因为在编译时根据系统的差异会被编译成不同的文件，在 Windows 下它是一个 .dll 文件，在 `*nix` 下则是一个 .so 文件。

<img height="410" :src="$withBase('/images/nodejs/advanced/point-node.png')" alt="Point Node">

### C/C++ 扩展模块的编写

普通的扩展模块与内建模块的区别在于无须将源代码编译进 Node，而是通过 `dlopen()` 方法动态加载。

同样是前面内建模块的例子，首先新建 hello 目录作为自己的项目位置，编写 hello.cc 并将其存储到 src 目录下，相关代码如下：

```c
#include <node.h>
#include <v8.h>
using namespace v8;
// 实现预定义的方法
Handle<Value> SayHello(const Arguments& args) {
 HandleScope scope;
 return scope.Close(String::New("Hello world!"));
}
// 给传入的目标对象添加sayHello()方法
void Init_Hello(Handle<Object> target) {
 target->Set(String::NewSymbol("sayHello"), FunctionTemplate::New(SayHello)->GetFunction());
}
// 调用NODE_MODULE()方法将注册方法定义到内存中
NODE_MODULE(hello, Init_Hello)
```

### C/C++ 扩展模块的编译

在 GYP 工具的帮助下，C/C++ 扩展模块的编译是一件省心的事情，无须为每个平台编写不同的项目编译文件。

写好 .gyp 项目文件是除编码外的头等大事，node-gyp 约定 .gyp 文件为 binding.gyp，其内容如下所示：

```gyp
{
  'targets': [
    {
      'target_name': 'hello',
      'sources': ['src/hello.cc'],
      'conditions': [
        [
          'OS == 'win',
          {
            'libraries': ['-lnode.lib']
          }
        ]
      ]
    }
  ]
}
```

然后调用：

```bash
node-gyp configure && node-gyp build
```

在当前目录中创建 build 目录，并生成系统相关的项目文件。后者则会进行编译，编译完成后，hello.node 文件会生成在 `build/Release` 目录下。

## 总结

C/C++ 内建模块属于最底层的模块，它属于核心模块，主要提供 API 给 JavaScript 核心模块和第三方 JavaScript 文件模块调用。

JavaScript 核心模块主要扮演的职责有两类：一类是作为 C/C++ 内建模块的封装层和桥接层，供文件模块调用；一类是纯粹的功能模块。

文件模块通常由第三方编写，包括普通 JavaScript 模块和 C/C++ 扩展模块，主要调用方向为普通 JavaScript 模块调用扩展模块。

## 参考

- [C++ addons | Node.js v16.17.1 Documentation](https://nodejs.org/dist/latest-v16.x/docs/api/addons.html)
