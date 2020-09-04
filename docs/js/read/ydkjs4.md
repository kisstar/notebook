# YDKJS-原型

JavaScript 中的对象有一个特殊的 `[[Prototype]]` 内置属性，其实就是对于其他对象的引用。几乎所有的对象在创建时 `[[Prototype]]` 属性都会被赋予一个非空的值。

对于默认的 `[[Get]]` 操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的 `[[Prototype]]` 链。

使用 `for..in` 遍历对象时原理和查找 `[[Prototype]]` 链类似，任何可以通过原型链访问到的可枚举属性都会被枚举。使用 `in` 操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链（无论属性是否可枚举）。

但是到哪里是 `[[Prototype]]` 的“尽头”呢？

所有普通的 `[[Prototype]]` 链最终都会指向内置的 `Object.prototype`。由于所有的“普通”（内置，不是特定主机的扩展）对象都“源于”这个 `Object.prototype` 对象，所以它包含 JavaScript 中许多通用的功能。

## 属性设置和屏蔽

当我们给一个对象的属性设置值时，如果这个属性不存在或则只存在目标对象上，那么赋值语句只会修改已有的属性值。当属性名既出现在目标对象中也出现在它的 `[[Prototype]]` 链上层时，就会发生屏蔽。

```js
var myObject = {}
myObject.foo = 'bar'
```

如果 `foo` 不直接存在于 `myObject` 中而是存在于原型链上层时会出现的三种情况：

1. 如果在 `[[Prototype]]` 链上层存在名为 `foo` 的普通数据访问属性并且没有被标记为只读（writable:false），那就会直接在 `myObject` 中添加一个名为 `foo` 的新属性，它是屏蔽属性。
2. 如果在 `[[Prototype]]` 链上层存在 `foo`，但是它被标记为只读（writable:false），那么无法修改已有属性或者在 `myObject` 上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。
3. 如果在 `[[Prototype]]` 链上层存在 `foo` 并且它是一个 `setter`，那就一定会调用这个 `setter`。`foo` 不会被添加到（或者说屏蔽于）`myObject`，也不会重新定义 `foo` 这个 `setter`。

如果你希望在第二种和第三种情况下也屏蔽 `foo`，那就不能使用 `=` 操作符来赋值，而是使用 `Object.defineProperty(..)` 来向 `myObject` 添加 `foo`。

## "类"函数

在 JavaScript 中，类无法描述对象的行为，（因为根本就不存在类，JavaScript 中只有对象）对象直接定义自己的行为。

但多年以来，人们一直在 JavaScript 中模仿类。源于所有的函数默认都会拥有一个名为 `prototype` 的公有并且不可枚举的属性，它会指向另一个对象（原型）：

```js
function Foo() {
  // ...
}
Foo.prototype // { }
```

这个对象到底是什么？最直接的解释就是，这个对象是在调用 `new Foo()` 时创建的，最后会被（有点武断地）关联到这个“Foo.prototype”对象上：

```js
function Foo() {
  // ...
}

var a = new Foo()
Object.getPrototypeOf(a) === Foo.prototype // true
```

调用 `new Foo()` 时会创建 `a`，其中一步就是将 `a` 内部的 `[[Prototype]]` 链接到 `Foo.prototype` 所指向的对象。

我们可以多次调用 `new Foo()` 来得到一个新的对象，这些对象不会像类的实例一样各自独立，而是由于 `[[Prototype]]` 的缘故相互关联。

## "构造函数"

看看下面的代码：

```js
function Foo() {
  // ...
}
var a = new Foo()
```

到底是什么让我们认为 Foo 是一个“类”呢？

其中一个原因是我们看到了关键字 `new`，在面向类的语言中构造类实例时也会用到它。另一个原因是，看起来我们执行了类的构造函数方法，`Foo()` 的调用方式很像初始化类时类构造函数的调用方式。

除了令人迷惑的“构造函数”语义外，在 JavaScript 中每个函数的原型对象上都会有一个 `constructor` 属性指向函数本身，而通过函数构造出的对象上也都存在该属性，并且指向构造它的函数。

实际上，Foo 和你程序中的其他函数没有任何区别。函数本身并不是构造函数。

然而，当你在普通的函数调用前面加上 `new` 关键字之后，就会把这个函数调用变成一个“构造函数调用”。实际上，`new` 会劫持所有普通函数并用构造对象的形式来调用它。

## 原型继承

以下这段代码使用的就是典型的“原型风格”：

```js
function Foo(name) {
  this.name = name
}

Foo.prototype.myName = function() {
  return this.name
}

function Bar(name, label) {
  Foo.call(this, name)
  this.label = label
}

Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.myLabel = function() {
  return this.label
}

var a = new Bar('a', 'obj a')
a.myName() // "a"
a.myLabel() // "obj a"
```

这段代码的核心部分就是语句 `Bar.prototype = Object.create( Foo.prototype )`。调用 `Object.create(..)` 会凭空创建一个“新”对象并把新对象内部的 `[[Prototype]]` 关联到你指定的对象。

ES6 添加了辅助函数 `Object.setPrototypeOf(..)`，可以用标准并且可靠的方法来修改关联：

```js
// ES6 之前需要抛弃默认的 Bar.prototype
Bar.ptototype = Object.create(Foo.prototype)
// ES6 开始可以直接修改现有的 Bar.prototype
Object.setPrototypeOf(Bar.prototype, Foo.prototype)
```

如果忽略掉 `Object.create(..)` 方法带来的轻微性能损失（抛弃的对象需要进行垃圾回收），它实际上比 ES6 及其之后的方法更短而且可读性更高。

## 检查“类”关系

检查一个实例（JavaScript 中的对象）的继承祖先（JavaScript 中的委托关联）通常被称为内省（或者反射）。

```js
function Foo() {
 // ...
}
Foo.prototype.blah = ...;

var a = new Foo();
```

我们如何通过内省找出 `a` 的“祖先”（委托关联）呢？第一种方法是站在“类”的角度来判断：

```js
a instanceof Foo // true
```

它的判断规则是看在 `a` 的整条 `[[Prototype]]` 链中是否有指向 `Foo.prototype` 的对象。如你所见，这个方法只能处理对象和函数之间的关系。

<!--

如果使用内置的 .bind(..) 函数来生成一个硬绑定函数的话，该函数是没有 .prototype 属性的，
在这样的函数上使用 instanceof 的话，目标函数的 .prototype 会代替硬绑定函数的 .prototype。

通常我们不会在“构造函数调用”中使用硬绑定函数，不过如果你这么做的话，实际上相当于直接调用目标函数。
同理，在硬绑定函数上使用 instanceof 也相当于直接在目标函数上使用 instanceof。

-->

以下是第二种判断 `[[Prototype]]` 反射的方法，它更加简洁：

```js
Foo.prototype.isPrototypeOf(a) // true
```

在这里，`isPrototypeOf(..)` 回答的问题是：在 `a` 的整条 `[[Prototype]]` 链中是否出现过 `Foo.prototype`？

## 创建关联

回到最初，`[[Prototype]]` 机制的意义是什么呢？

```js
var foo = {
  something: function() {
    console.log('Tell me something good...')
  },
}
var bar = Object.create(foo)

bar.something() // Tell me something good...
```

我们并不需要类来创建两个对象之间的关系，只需要通过委托来关联对象就足够了。而 `Object.create(..)` 不包含任何“类的诡计”，所以它可以完美地创建我们想要的关联关系。

它的 polyfill 代码很好的诠释了它的主要工作：

```js
if (!Object.create) {
  Object.create = function(o) {
    function F() {}
    F.prototype = o
    return new F()
  }
}
```

另外，`Object.create(..)` 的第二个参数还可以指定需要添加到新对象中的属性名以及这些属性的属性。

## 关联关系是备用

看起来对象之间的关联关系是处理“缺失”属性或者方法时的一种备用选项：

```js
var anotherObject = {
  cool: function() {
    console.log('cool!')
  },
}
var myObject = Object.create(anotherObject) // 让 myObject 在无法处理属性或者方法时可以使用备用的 anotherObject

myObject.cool() // "cool!"
```

但选择这样的模式可能会让项目的代码变得难以琢磨，思考下面的代码：

```js
var anotherObject = {
  cool: function() {
    console.log('cool!')
  },
}
var myObject = Object.create(anotherObject)
myObject.doCool = function() {
  this.cool() // 内部委托！
}

myObject.doCool() // "cool!"
```

这里我们调用的 `myObject.doCool()` 是实际存在于 `myObject` 中的，这可以让我们的 API 设计更加清晰。从内部来说，我们的实现遵循的是委托设计模式，通过 `[[Prototype]]` 委托到 `anotherObject.cool()`。

换句话说，内部委托比起直接委托可以让 API 接口设计更加清晰。
