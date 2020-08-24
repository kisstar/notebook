# 前端模块化历程

在 ES6 之前，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。

那么什么是模块化呢？模块就是实现特定功能的相互独立的一组方法，块内的数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信。

所以模块化的存在可以让我们对代码进行高度复用，提高代码的可维护性、减少全局污染，同时能更好的管理网页的业务逻辑。

## Object Literal pattern

JavaScript 开发人员针对模块化提出了一系列的解决方案，比如对内置的对象进行封装：

```js
// person.js
var person = {
  name: 'Kisstar',
}

// hello.js
person.sayHello = function() {
  console.log('Hello ' + this.name)
}
```

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="person.js"></script>
    <script src="hello.js"></script>
  </head>
  <body>
    <script>
      person.sayHello()
    </script>
  </body>
  <script>
    // destroy internal data
    person.name = 'xxx'
    // shared scope means other code can inadvertently destroy ours
    var person = 'all gone!'
  </script>
</html>
```

利用对象我们可以很方便的实现一个模块，但显然模块内的数据很不安全，外部可以进行任意的修改。

同时，我们依赖了一个全局变量（person），如果其它的 JavaScript 代码也使用了这个变量，我们很可能会失去的原本需要的功能。

## IIFE

通过立即调用函数表达式，我们可以将数据和行为封装到一个函数内部, 通过给指定的对象（比如：全局对象）添加属性来向外暴露接口。

```js
// person.js
var person = (function(name) {
  var insertName = name || 'Kisstar'

  return {
    getName: function() {
      return insertName
    },
  }
})(outerName)

// hello.js
;(function(module) {
  module.sayHello = function() {
    console.log('Hello ' + this.getName())
  }
})(person)
```

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      // set init values
      var outerName = 'Sharon'
    </script>
    <script src="person.js"></script>
    <script src="author.js"></script>
  </head>
  <body>
    <script>
      person.sayHello()
    </script>
  </body>
  <script>
    // shared scope means other code can inadvertently destroy ours
    var person = 'all gone!'
  </script>
</html>
```

使用 IIFE 之后我们将一些数据进行了私有化（name），外部将不能对其进行直接修改，而且 `hello.js` 的代码也可以得到复用，如果我们传入不用的模块，他们都会得到一个 `sayHello` 的方法。

遗憾的是，这种方式依然依赖全局变量，而且实现上并不优雅。

## CommonJS

随着 Node.js 项目的诞生，JavaScript 语言被带到了服务器。为了应对复杂的服务端开发，Node.js 参照 CommonJS 规范实现了自己的模块化系统。

根据 CommonJS 规范，一个单独的文件就是一个模块。加载模块使用 `require` 方法，该方法读取一个文件并执行，最后返回文件内部的 `exports` 对象。

```js
// person.js
module.exports = function(name) {
  var insertName = name || 'Kisstar'

  return {
    getName: function() {
      return insertName
    },
  }
}

// hello.js
module.exports = function(module) {
  module.sayHello = function() {
    console.log('Hello ' + this.getName())
  }
}

// app.js
var person = require('./person')('Sharon')
var withHello = require('./hello')

withHello(person)
person.sayHello()
```

通过一些编译工具，我们也可以让复合 CommonJS 规范的代码运行在浏览器上，比如使用 Browserify：

```bash
npx browserify app.js -o dist/bundle.js
```

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="dist/bundle.js"></script>
  </head>
  <body></body>
</html>
```

现在模块的代码都运行在自己的作用域内，不会污染全局作用域，整个语法看起来也更加整洁和明朗。

缺点是，CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。这对于浏览器环境来说很不友好，可能导致很糟糕的用户体验。

## AMD

AMD 规范通过一个 `define` 方法来定义模块，它可以接受三个参数（只有函数是必须的）：

- 模块名；
- 第二个参数是一个数组，指明了此模块的依赖；
- 模块的具体实现。

当我们需要使用一个模块时，可以使用配对的 require 方法，它可以接受两个参数：

- 第一个参数是一个数组，表示所依赖的模块；
- 第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

```js
// person.js
define('person', [], function(name) {
  var insertName = name || 'Kisstar'

  return {
    getName: function() {
      return insertName
    },
  }
})

// hello.js
define(function() {
  return function(module) {
    module.sayHello = function() {
      console.log('Hello ' + this.getName())
    }
  }
})
```

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.min.js"></script>
  </head>
  <body>
    <script>
      require(['person', 'hello'], function(person, withHello) {
        withHello(person)
        person.sayHello()
      })
    </script>
  </body>
</html>
```

目前，AMD 规范运行的很好，但严重依赖于一个较为丑陋的语法格式，并且由于浏览器所要求的异步特性导致它不能被静态分析。

## UMD

UMD 试图将 AMD 和 CJS 结合在一起，下面是一个简单的例子（[了解更多](https://github.com/umdjs/umd)）：

```js
// if the module has no dependencies, the above pattern can be simplified to
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.returnExports = factory()
  }
})(typeof self !== 'undefined' ? self : this, function() {
  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {}
})
```

所以，UMD 具备两者的优点，同时也包含两者的缺点，不过它确实朝着同构 JavaScript 的方向迈出了第一步，它可以在服务器和客户端上运行。

## ES6 modules

ES6 在语言标准的层面上，实现了模块功能，其设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

除了静态加载带来的各种好处，ES6 模块还有以下好处：

- 不再需要 UMD 模块，将来服务器和浏览器都会支持 ES6 模块格式。
- 不再需要将对象作为命名空间（比如 Math 对象），未来这些功能可以通过模块提供。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者 `navigator` 对象的属性。

```js
// person.js
export default function(name) {
  var insertName = name || 'Kisstar'

  return {
    getName: function() {
      return insertName
    },
  }
}

// hello.js
export default function(module) {
  module.sayHello = function() {
    console.log('Hello ' + this.getName())
  }
}
```

```html
<!DOCTYPE html>
<html>
  <body>
    <script type="module">
      import getPerson from './person.js'
      import withHello from './hello.js'

      var person = getPerson('Sharon')
      withHello(person)
      person.sayHello()
    </script>
  </body>
</html>
```

查看更多关于 ES6 modules 的信息，请点击查看 [Module 的语法 - ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/module)。

## 常见问题

- CommonJS 规法和 ES Module 规范的区别？

## 参考

- [Module 的语法 - ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/module)
- [五分钟带你回顾前端模块化发展史 - 前端食堂 - SegmentFault 思否](https://segmentfault.com/a/1190000021952509)
- [浅谈前端模块化 - 腾讯 Web 前端 IMWeb 团队社区 | blog | 团队博客](https://imweb.io/topic/55994b358555272639cb031b)
- [前端模块化详解(完整版) - 掘金](https://juejin.im/post/6844903744518389768)
- [Understanding ES6 Modules via Their History - SitePoint](https://www.sitepoint.com/understanding-es6-modules-via-their-history/)
