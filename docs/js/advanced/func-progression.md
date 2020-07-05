# 函数进阶

函数实质上也是对象，所以函数名其实就是变量，相当于指向函数体的指针。当我们使用不带圆括号的函数名时是在访问函数指针，而非调用函数。

函数也可以作为值来使用，比如将函数作为参数进行传递，或者将一个函数作为另一个函数的结果返回。

## 牛刀小试

假设有一个对象数组，我们想要根据某个对象属性对数组进行排序。而传递给数组 `sort()` 方法的比较函数要接收两个参数，即要比较的值。可是，我们需要一种方式来指明按照哪个属性来排序。
要解决这个问题，可以定义一个函数，它接收一个属性名，然后根据这个属性名来创建一个比较函数，下面就是这个函数的定义：

```javascript
/**
 * @public
 *
 * @example
 * var arr = [{name: 'Anani', age: 24}, {name: 'Sharon', age: 23}];
 * arr.sort(createComparisonFunction('age'));
 *
 * @description
 * 根据某个对象属性对对象数组进行升序排序
 *
 * @param propertyName {string} 指定的排序参照的属性名
 * @returns {array} 经过排序后的数组
 */
function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}
```

## 函数内部属性

在函数内部，有两个特殊的对象：`this` 和 `arguments`。

`this` 引用的是函数据以执行的环境对象。

`arguments` 是一个类数组对象，包含着传入函数中的所有参数，这个对象还有一个名叫 `callee` 的属性，该属性是一个指针，指向拥有这个 `arguments` 对象的函数。

通过使用 `arguments` 对象的 `callee` 属性，我们可以创建消除高度耦合的递归函数。比如经典的阶乘函数：

```javascript
// 下面的做法有一个缺陷，就是这个函数的执行与函数名 factorial 紧紧耦合在了一起
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}
// 使用 `arguments` 对象的 `callee` 属性
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}
// 现在无论引用函数时使用的是什么名字，都可以保证正常完成递归调用
```

### 递归函数

函数直接或间接调用自身，称为**递归**，该函数称为**递归函数**。

函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数 `A` 的内部调用函数B，那么在 `A` 的调用帧上方，还会形成一个 `B` 的调用帧。等到 `B` 运行结束，将结果返回到 `A`，`B` 的调用帧才会消失。如果函数 `B` 内部还调用函数 `C`，那就还有一个 `C` 的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

递归非常耗费内存，因为可能需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。

比如上面的阶乘函数就是一个经典的递归函数，通过该函数我们计算 `n` 的阶乘，最多需要保存 `n` 个调用记录，复杂度 `O(n)` 。

### 尾递归

函数如果尾调用自身，就称为**尾递归**。

对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

同样以阶乘函数为例，我们对此函数进行改进：

```javascript
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120
```

现在，改写成尾递归后，始终只保留一个调用记录，复杂度 O(1) 。

### 匿名函数自调用(IIFE)

**匿名函数**（anonymous function）是一种在运行时动态声明的函数，它们无需定义标识符（函数名）。

匿名函数自调用的两种方式：

```javascript
// 调用函数，得到返回值。强制运算符使函数调用执行
(function (x, y) {
    alert(x + y);
    return x + y;
}(3, 5));
// 调用函数，得到返回值。强制函数直接量执行再返回一个引用，引用再去调用执行
(function (x, y) {
    alert(x + y);
    return x + y;
})(3, 5);
```

匿名函数的常见用法就是用来充当块级作用域，避免变量污染外部作用域。

## 函数属性

`ECMAScript` 中的函数是对象，因此函数也有属性和方法。

每个函数都包含三个属性：`caller`、`length` 和 `prototype`。

### caller 属性

`ECMAScript 5` 规范化了一个函数对象的属性：`caller`。这个属性中保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值为 `null`。

通过提及的函数内部的属性，可以在函数的内部通过 `arguments.callee.caller` 来访问相同的信息。

::: warning

* 当函数在严格模式下运行时，访问 `arguments.callee` 会导致错误。
* 当函数在严格模式下运行时，不能为函数的 `caller` 属性赋值，否则会导致错误。

:::

### length 属性

`length` 属性表示函数希望接收的命名参数的个数，比如：

```javascript
function sayHi() {
    alert("hi");
}
function sayName(name) {
    alert(name);
}

console.log(sayHi.length);  //0
console.log(sayName.length);//1
```

### prototype 属性

对于 `ECMAScript` 中的引用类型而言，`prototype` 是保存它们所有实例方法的真正所在。通常我们把它称作为函数的原型，由于它是不可枚举的，所以使用 `for-in` 语句时无法发现它的存在。

## 函数方法

每个函数都包含两个非继承而来的方法：`apply()`和`call()`。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内 `this` 对象的值。

首先，`apply()` 方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是 `Array` 的实例，也可以是 `arguments` 对象。

`call()` 方法与 `apply()` 方法的作用相同，它们的区别仅在于接收参数的方式不同。`对于 call()` 方法而言，第一个参数是 `this` 值没有变化，变化的是其余参数都直接传递给函数，也就是说传递给函数的参数必须逐个列举出来。

```javascript
function sum(num1, num2) {
    return num1 + num2;
}
function callSum1(num1, num2) {
    return sum.apply(this, arguments);   // 传入arguments 对象
}
function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]);// 传入数组
}
alert(callSum1(10, 10));  //20
alert(callSum2(10, 10));   //20
```

`call()` 方法与 `apply()` 方法真正强大的地方是能够扩充函数 赖以 运行的作用域。`ECMAScript 5` 还定义了一个方法：`bind()`。这个方法会创建一个函数的实例，其 `this` 值会被绑定到传给 `bind()` 函数的值。

## 参考资料

* [Helephant.com](http://helephant.com/2012/07/14/javascript-function-declaration-vs-expression/#function-operator-is-an-expression)
* [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/function)
* [匿名函数自调用 (IIFE)](https://juejin.im/entry/57406b0e1ea493006038c58a)
* JavaScript 高级程序设计(第3版)
