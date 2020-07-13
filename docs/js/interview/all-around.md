# 写出输出结果并给出分析

```javascript
function Foo() {
  getName = function() {
    console.log(1)
  }
  return this
}
Foo.getName = function() {
  console.log(2)
}
Foo.prototype.getName = function() {
  console.log(3)
}
var getName = function() {
  console.log(4)
}
function getName() {
  console.log(5)
}

// 请写出以下输出结果：
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
```

进入全局执行上下文。

执行上下文编译阶段：

1. 参数处理（无）；
2. 函数声明：`function Foo() { // ... }` 和 `function getName() { console.log(5) }`；
3. 变量声明：存在一个 `var` 声明，由于与上面已经声明的函数同名，所以会被忽略。

执行文的执行阶段：

赋值：

1. `Foo.getName = function() { console.log(2) }`；
2. `Foo.prototype.getName = function() { console.log(3) }`；
3. `getName = function() { console.log(4) }`，覆盖之前函数声明的值；

执行：

1. `Foo.getName();`，调用赋值步骤 1 得到的方法，**输出 2**；
2. `getName();`，调用赋值步骤 3 得到的函数，**输出 4**；
3. `Foo().getName();`；
   1. 直接调用 `Foo` 函数，其内 `this` 在非严格模式下指向 `window`。
   2. 内部作用域中不存在 `getName` 变量，通过原型链找到外层，也就是全局的 `getName` 函数，然后赋值进行覆盖。
   3. 返回 `this`，也就是对象 `window`。此时 `Foo().getName();` 相当于 `window.getName();`。
   4. 执行全局的 `getName` 方法，也就是 3-2 中改过后的方法，**输出 1**。
4. `getName();`，再次调用全局的 `getName` 方法，**输出 1**。
5. `new Foo.getName();`：
   1. 根据执行顺序属性的读取高于无参的 `new` 关键字，所以这里会先取得 `Foo` 上的 `getName` 方法。
   2. 通过 `new` 关键字调用得到的方法，**输出 2**。
6. `new Foo().getName();`
   1. 根据执行顺序 new(带参数列表) 的优先级高于函数调用，所以这里先执行 `new Foo()`，此时 `new Foo().getName();` 相当于 `Foo实例.getName();`。
   2. 实例上由于不存在 `getName` 方法，根据原型链将找到 `Foo.prototype.getName` 方法并执行，见赋值步骤 2，**输出 3**。
7. `new new Foo().getName();`：
   1. 同上，先执行 `new Foo()` 得到结果 `new Foo实例.getName();`；根据原型链找到赋值步骤 2 中的方法。
   2. 通过关键字 `new` 调用 `Foo` 原型上的 `getName` 方法，**输出 3**。
