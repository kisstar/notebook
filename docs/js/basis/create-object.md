# 创建对象

虽然 `Object` 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。为解决这个问题，人们开始使用工厂模式的一种变体。

## 工厂模式

工厂模式，抽象了创建具体对象的过程，通俗来说就是用函数来封装以特定接口创建对象的细节。

```javascript
function createPerson(name, age) {
  var o = new Object()
  o.name = name
  o.age = age
  o.sayName = function() {
    console.log(this.name)
  }
  return o
}

var person = createPerson('Anani', 24)
console.log(person.name, person.age) // Anani 24
```

工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。

## 构造函数模式

ECMAScript 中的构造函数可用来创建特定类型的对象，除了原生的构造函数（在运行时会自动出现在执行环境中），也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
  this.sayName = function() {
    console.log(this, name)
  }
}

var person = new Person('Anani', 24)
console.log(person.name, person.age)
```

使用构造函数模式：

- 没有显式地创建对象。
- 直接将属性和方法赋给了 `this` 对象。
- 没有 `return` 语句。

按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型，而这正是构造函数模式胜过工厂模式的地方。

构造函数并不是完美的，它也存在一些缺陷：使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。也就是说，不同实例上的同名函数是不相等的。

为了解决构造函数的缺陷，通过把函数定义转移到构造函数外部来解决这个问题。但是这样会导致，在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。另外如果对象需要定义很多方法，那么就要定义很多个全局函数。

## 原型模式

每个函数都有一个 `prototype`（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

使用原型对象的好处就是可以让所有对象实例共享它所包含的属性和方法，避免上述函数无法复用等问题。

```javascript
function Person() {}
Person.prototype.name = 'Anani'
Person.prototype.age = 24
Person.prototype.sayName = function() {
  console.log(this.name)
}

var person = new Person()
person.sayName() // Anani
console.log(person.sayName === new Person().sayName) // true
```

### 关于原型

- 默认情况下，所有原型对象都会自动获得一个 `constructor`（构造函数）属性，这个属性包含一个指向 `prototype` 属性所在函数的指针。
- 当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。ECMA-262 第 5 版中管这个指针叫 `[[Prototype]]`。

虽然在所有实现中都无法访问到 `[[Prototype]]`，但可以通过 `isPrototypeOf()` 方法来确定对象之间是否存在这种关系：如果 `[[Prototype]]` 指向调用 `isPrototypeOf()` 方法的原型对象，那么这个方法就返回 `true`。

```javascript
console.log(Person.prototype.isPrototypeOf(person)) //true
```

ECMAScript 5 增加了一个新方法，叫 `Object.getPrototypeOf()`，在所有支持的实现中，这个方法返回 `[[Prototype]]` 的值。

```javascript
console.log(Object.getPrototypeOf(person) === Person.prototype) //true
```

虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性。不过，使用 `delete` 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性。

ECMAScript 5 的 `Object.getOwnPropertyDescriptor()` 方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用 `Object.getOwnPropertyDescriptor()` 方法。

### 原型与 in 操作符

有两种方式使用 `in` 操作符：单独使用和在 `for-in` 循环中使用。

单独使用时，`in` 操作符会在通过对象能够访问给定属性时返回 `true`，无论该属性存在于实例中还是原型中。

```javascript
var o = new Object()
console.log('toString' in o) // true
```

如果同时使用 `hasOwnProperty()` 方法和 `in` 操作符，就可以确定该属性到底是否存在于对象中，如果存在是存在自身，还是存在于原型中：

```javascript
/**
 * 判断属性是否存在对象的原型上面
 * @param {object}
 * @param {string}
 * @returns {boolean}
 */
function hasPrototypeProperty(object, propName) {
  return !object.hasOwnProperty(propName) && propName in object
}
```

而在使用 `for-in` 循环时，返回的是所有能够通过对象访问的、可枚举的（enumerated）属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。

```javascript
var o = {
  toString: function() {
    return 'toString in o'
  },
}
for (var prop in o) {
  if (prop == 'toString') {
    console.log('Found toString') // 在早期IE中不会显示
  }
}
```

IE 早期版本的实现中存在一个 `bug`，即屏蔽不可枚举属性的实例属性不会出现在 `for-in` 循环中。

要取得对象上所有可枚举的实例属性，可以使用 ECMAScript 5 的 `Object.keys()` 方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组（不包含原型上的）。

```javascript
function Person() {}
Person.prototype.name = 'Anani'
Person.prototype.age = 24
Person.prototype.sayName = function() {
  console.log(this.name)
}

var person = new Person()
person.name = 'Sharon'
person.age = 23
console.log(Object.keys(Person.prototype).join()) // name,age,sayName
console.log(Object.keys(person).join()) // name,age
```

如果想要得到所有实例属性，无论它是否可枚举，可以使用 `Object.getOwnPropertyNames()` 方法。

```javascript
function fn() {}
console.log(Object.getOwnPropertyNames({}.prototype).join()) // constructor
```

简单的总结一下就是：

- 单独使用时 `in` 操作符会在通过对象能够访问给定属性时返回 `true`，无论该属性存在于实例中还是原型中。
- `for-in` 循环返回的是所有能够通过对象访问的、可枚举的属性，包括存在于实例中的属性，也包括存在于原型中的属性。
- `hasOwnProperty()` 只在属性存在于实例中时才返回 `true`。
- `Object.keys()` 返回对象上可枚举的实例属性。
- `Object.getOwnPropertyNames()` 方法返回所有实例属性，无论它是否可枚举。

### 更简单的原型语法

在操作一个原型对象时，我们可以直接使用对象字面量来重写整个原型对象。

每创建一个函数，就会同时创建它的 `prototype` 对象，这个对象也会自动获得 `constructor` 属性指向函数本身。如果我们用对象字面量的形式重写原型对象，那么该原型对象的 `constructor` 属性也就变成了新对象的 `constructor` 属性（指向 Object 构造函数）。

此时， 尽管 `instanceof` 操作符还能返回正确的结果，但通过 `constructor` 已经无法确定对象的类型，因此我们需要将它设置回适当的值。

```javascript
function fn() {}
fn.prototype = {
  name: 'Anani',
  age: 24,
  sayName: function() {
    console.log(this.name)
  },
  constructor: fn,
}
```

需要注意，以这种方式重设 `constructor` 属性会导致它的 `[[Enumerable]]` 特性被设置为 `true`。不过我们可以使用 `Object.defineProperty()` 方法来修复这点。

```javascript
function fn() {}
fn.prototype = {
  name: 'Anani',
  age: 24,
  sayName: function() {
    console.log(this.name)
  },
}
Object.defineProperty(fn.prototype, 'constructor', {
  enumerable: false,
  value: fn,
})
```

### 原型的动态性

对原型对象所做的任何修改都能够立即从实例上 反映出来——即使是先创建了实例后修改原型也照样如此。但如果是重写整个原型对象，那么情况就不一样了。

```javascript
function Fn() {}
var fn = new Fn()
Fn.prototype = {
  name: 'Anani',
  age: 24,
  sayName: function() {
    console.log(this.name)
  },
}

fn.sayName() // fn.sayName is not a function
```

调用构造函数时会为实例添加一个指向最初原型的 `[[Prototype]]` 指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。也就是说 `fn` 引用的仍然是最初的原型。

### 原型对象的问题

原型对象省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。

原型中所有属性是被很多实例共享的，这种共享对于函数非常合适。对于那些包含基本值的属性倒也还好，因为通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，对于包含引用类型值的属性来说，问题就比较突出。

```javascript
function Fn() {}
Fn.prototype.colors = ['red', 'bule', 'yellow']

var instance1 = new Fn()
instance1.colors.length = 2
var instance2 = new Fn()
console.log(instance2.colors.join()) // red,bule
```

## 组合使用构造函数模式和原型模式

创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。

构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数。

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
  this.firends = ['Sophie', 'Hans', 'Naoko', 'Change-woo', 'Luming', 'Xiaohui']
}
Person.prototype.sayName = function() {
  console.log(this.name)
}

var person1 = new Person('Anani', 24)
person1.firends.push('Sharon')
console.log(person1.firends.join()) // Sophie,Hans,Naoko,Change-woo,Luming,Xiaohui,Sharon
var person2 = new Person('Sharon', 23)
person2.firends.unshift('Anani')
console.log(person2.firends.join()) // Anani,Sophie,Hans,Naoko,Change-woo,Luming,Xiaohui
```

构造函数与原型混成的模式，是目前在 ECMAScript 中使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。

## 动态原型模式

动态原型模式是致力于解决独立的构造函数和原型的一个方案，它把所有信息都封装在了构造函数中，通过在构造函数中初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的优点。

换句话说，可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}
if ('functon' !== typeof Person.sayName) {
  Person.prototype.sayName = function() {
    console.log(this.name)
  }
}

var person = new Person('Anani', 24)
person.sayName() // Anani
```

向原型添加方法的这段代码只会在初次调用构造函数时才会执行，对于采用这种模式创建的对象，还可以使 用 `instanceof` 操作符确定它的类型。

## 寄生构造函数模式

寄生构造函数模式的基本思想就是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象。

除了使用 `new` 操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象实例。

```javascript
function Person(name, age) {
  var o = new Object()
  o.name = name
  o.age = age
  o.sayName = function() {
    console.log(this.name)
  }
  return o
}

var person = new Person('Anani', 24)
person.sayName() // Anani
```

这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊数组。由于不能直接修改 Array 构造函数（可能会导致命名冲突。而且，这样做也可能会意外地重写原生方法），因此可以使用这个模式。

```javascript
function SpecialArr() {
  var arr = []
  arr.push.apply(arr, arguments)
  arr.toPipedString = function() {
    return this.join('|')
  }
  return arr
}

var arr = new SpecialArr('red', 'bule', 'yellow')
arr.toPipedString() // "red|bule|yellow"
```

寄生构造函数模式返回的对象与构造函数或者与构造函数的原型属性之间没有关系，也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此，能依赖 `instanceof` 操作符来确定对象类型。因此，不推荐使用该模式。

## 稳妥构造函数模式

道格拉斯·克罗克福德发明了 JavaScript 中的稳妥对象（durable objects）这 个概念。所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 `this` 的对象。

稳妥对象最适合在 一些安全的环境中（这些环境中会禁止使用 this 和 new），或者在防止数据被其他应用程序（如 Mashup 程序）改动时使用。

稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：

- 一是新创建对象的 实例方法不引用 `this`。
- 二是不使用 `new` 操作符调用构造函数。

```javascript
function Person(name) {
  var o = new Object()
  o.name = 'Anani'
  o.sayName = function() {
    console.log(name)
  }
  return o
}
```

在以这种模式创建的对象中，除了使用 `sayName()` 方法之外，没有其他办法访问 `name` 的值。 可以像下面使用稳妥的 `Person` 构造函数。

```javascript
var person = new Person(name)
person.sayName() // Anani
```

这样，变量 `person` 中保存的是一个稳妥对象，而除了调用 `sayName()` 方法外，没有别的方式可以访问其数据成员。即使有其他代码会给这个对象添加方法或数据成员，但也不可能有别的办法访问传入到构造函数中的原始数据。稳妥构造函数模式提供的这种安全性，使得它非常适合在某些安全执行环境。

## 参考资料

- JavaScript 高级程序设计(第 3 版)
