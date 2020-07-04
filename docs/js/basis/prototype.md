# 原型

与大部分面向对象语言不同，`JavaScript` 中并没有引入类（class）的概念，但 `JavaScript` 仍然大量地使用了对象，为了保证对象之间的联系，`JavaScript` 引入了原型与原型链的概念。

每个函数对象都有一个 `prototype` 属性，这个属性指向函数的原型对象，我们将这个属性称为显式原型。

在默认情况下，所有的原型对象都会自动获得一个 `constructor`（构造函数）属性，这个属性（是一个指针）指向 `prototype` 属性所在的函数。

<img :src="$withBase('/images/js/prototype_constructor.png')" alt="prototype_constructor">

## 原型链

每个对象都有 `__proto__` 属性，它指向构造函数的原型对象，可称之为隐式原型。

在查找一个对象的属性时，会先在自身的属性中查找。如果没有找到就沿着 `__proto__` 这条链查找，最终找到后就直接返回，没有找到则返回 `undefined`，这条查找路径就是原型链。

::: tip
`JavaScript` 中任意对象都有一个内置属性 `[[prototype]]`，在 `ES5` 之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过 `__proto__` 来访问。`ES5` 中有了对于这个内置属性标准的读取方法 `Object.getPrototypeOf()`。
:::

值得注意的两点是所有的函数都是 `Function` 的实例（包括 `Function`），而 `Object` 的原型对象是原型链的尽头，其值为 `null`。最后用一张图来表示所有的关系：

<img :src="$withBase('/images/js/prototype_chain.jpg')" alt="prototype_chain">

## Talk is cheap

```javascript
function Fn () {}
Fn.prototype.m = 1;
var fn1 = new Fn();
Fn.prototype =  {
    m: 2,
    n: 3
};
var fn2 = new Fn();

console.log(fn1.m, fn1.n, fn2.m, fn2.n); // 1 undefined 2 3
```

这里主要的问题就是，实际上 `fn1` 和 `fn2` 隐士原型指向的并不是同一个原型对象，因为后面 `Fn` 的原型对象被重写了。

```javascript
function Fn () {}
Object.prototype.m = function() {
    console.log('m in OProto');
};
Function.prototype.n = function() {
    console.log('n in FnProto');
};
var fn = new Fn();

fn.m(); // m in OProto
fn.n(); // fn.n is not a function
Fn.m(); // m in OProto
Fn.n(); // n in FnProto
```

这个相对比较简单，可以参照上面的原型图。只要沿着原型链查找，如果能找到对应的方法就可以够顺利的执行，通过打印的结果也能清楚的知道方法存在的位置。

## 参考资料

* [详解 javascrip 中的继承](https://dongwanhong.github.io/BlogV1.0.0/blog-js/2018/01/inherit.html)
* [深入理解javascript原型和闭包（完结）](http://www.cnblogs.com/wangfupeng1988/p/3977924.html))
* [深入理解javascript原型和闭包（4）——隐式原型 - 王福朋 - 博客园](https://www.cnblogs.com/wangfupeng1988/p/3979290.html)
