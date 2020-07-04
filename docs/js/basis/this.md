# This

函数其实也是一个值（引用类型），因此它可以被赋值给不同的变量，也可以在不同的环境（上下文）执行。那么在不同的环境运行，怎么访问运行时的当前环境的其它变量呢？

这时候就需要使用 `this` 关键字了，因为它引用的是函数据以执行的环境对象。

## 抛砖引玉

通常在面试的时候，会遇到这样类似的问题，下面两种写法，结果一样吗？

```javascript
var obj = {
    name: 'Anani',
    fn: function () {
        console.log(this.name)
    }
};

var Fn = obj.fn;
var name = 'Sharon';

obj.fn(); // ???
Fn();     // ???
```

当然结果是不一样的，原因就是方法中使用了 `this` 关键字。在绝大多数情况下，函数的调用方式决定了 `this` 的值。

## 全局环境

无论是否在严格模式下，在全局执行环境中（在任何函数体外部）`this` 都指向全局对象。

```javascript
// 在浏览器中, window 对象同时也是全局对象：
console.log(this === window); // true
```

## 函数（运行内）环境

在函数内部，`this` 的值取决于函数被调用的方式。

### 简单调用

非严格模式下，且 `this` 的值不是由该调用设置的，所以 `this` 的值默认指向全局对象。

```javascript
function fn() {
    return this;
}
// 在浏览器中：
fn() === window; // true
```

在严格模式下，`this` 将保持他进入执行环境时的值，所以下面的 `this` 将会默认为 `undefined`。

```javascript
function fn() {
    'use strict';
    return this;
}
// 在浏览器中：
fn() === window; // true
```

### 作为对象的方法

当函数作为对象里的方法被调用时，它们的 `this` 是调用该函数的对象。

请注意，这样的行为，根本不受函数定义方式或位置的影响。我们不必在声明对象时就直接指定它拥有的方法，我们完全可以先定义函数，然后再将其附属到对象上。

```javascript
function fn() {
    console.log(this.name);
}
var obj = {
    name: 'Anani',
    fn: fn
};
obj.fn(); // Anani
```

#### 原型链中的 this

如果某方法存在于一个对象的原型链上，那么 `this` 指向的是调用这个方法的对象，就像该方法在对象上一样。

```javascript
var obj = {
    name: 'Anani',
    fn: function () {
        console.log(this.name);
    }
};
var othObj = Object.create(obj);
othObj.name = 'Sharon';

console.log(othObj.fn()); // Sharon
```

#### getter 与 setter 中的 this

用作 `getter` 或 `setter` 的函数都会把 `this` 绑定到设置或获取属性的对象。

```javascript
var obj = {
    name: 'Anani',
    get upperCaseName() {
        return this.name.toUpperCase();
    }
};

console.log(obj.upperCaseName); // ANANI
```

### 作为构造函数

当一个函数用作构造函数时（使用 new 关键字），它的 `this` 被绑定到正在构造的新对象。

```javascript
/**
     * 构造函数这样工作:
     * function Constructor(){
     *   // 函数实体写在这里
     *   // 根据需要在 this 上创建属性，然后赋值给它们
     *   // 如果函数具有返回对象的 return语句，
     *   // 则该对象将是 new 表达式的结果。
     *   // 否则，表达式的结果是当前绑定到 this 的对象。
     * }
     *
     * 其实质就是：
     * 1.声明一个中间对象
     * 2.将该中间对象的隐式原型指向构造函数的显式原型
     * 3.将构造函数的 this 通过 apply 指向中间对象
     * 4.返回该中间对象,也就是返回了实例对象
     */

function Constructor() {
    this.num = 3; // "僵尸"代码：执行了，但无意义。因为手动的设置了返回对象，与 this 绑定的默认对象被丢弃了
    return {
        num: 5
    };
}

obj = new Constructor();
console.log(obj.num); // 5
```

### 作为一个DOM事件处理函数

当函数被用作事件处理函数时，它的 `this` 指向触发事件的元素（一些浏览器在使用非 `addEventListener` 的函数动态添加监听函数时不遵守这个约定）。

```javascript
// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*');

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', bluify, false);
}


function bluify(e) {
    // 总是 true
    console.log(this === e.currentTarget);

    // 当 currentTarget 和 target 是同一个对象时为 true
    console.log(this === e.target);

    // 将关联的元素变成蓝色
    this.style.backgroundColor = '#A5D9F3';
}
```

### 作为一个内联事件处理函数

当代码被内联 `on-event` 处理函数调用时，它的 `this` 指向监听器所在的 DOM 元素：

```html
<!-- 点击时，下面打印button -->
<button onclick="console.log(this.tagName.toLowerCase());">
  Show this
</button>
```

注意只有外层代码中的 `this` 是这样设置的，比如下面这段代码：

```html
<button onclick="console.log((function(){return this})());">
  Show inner this
</button>
```

由于内部函数的 `this` 值未进行指定，所以非严格模式下，它指向 `global/window` 对象。

## 最后

现在来解答我们最初的问题就很简单了，显然 `obj.fn` 是属于调用对象上的方法，其 `this` 值指向的就是调用方法的对象 `obj`，所以会打印 “Anani”。而 `Fn` 属于简单调用，在非严格模式下，它的 `this` 指向的是全局对象，所以最终打印的是 “Sharon”。

- `this` 不能在执行期间被赋值，并且在每次函数被调用时 `this` 的值也可能会不同。
- `ES5` 引入了 `bind` 方法来设置函数的 `this` 值，而不用考虑函数如何被调用的。
- 匿名函数的执行环境具有全局性，因此其 `this` 对象通常指向 `window`。

## 参考资料

- [JavaScript 的 this 原理 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)
- [this - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
