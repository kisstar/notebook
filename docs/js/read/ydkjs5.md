# YDKJS-委托

回顾一下 `[[Prototype]]` 机制：指对象中的一个内部链接引用另一个对象。

如果在第一个对象上没有找到需要的属性或者方法引用，引擎就会继续在 `[[Prototype]]` 关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的 `[[Prototype]]`，以此类推。这一系列对象的链接被称为“原型链”。

换句话说，JavaScript 中这个机制的本质就是对象之间的关联关系。

现在，为了更好地学习如何更直观地使用 `[[Prototype]]`，我们需要试着把思路从类和继承的设计模式转换到委托行为的设计模式。

## 理论

假设我们需要在软件中建模一些类似的任务（“XYZ”、“ABC”等）。

在委托模式中，首先你会定义一个名为 Task 的对象，它会包含所有任务都可以使用（写作使用，读作委托）的具体行为。

接着，对于每个任务（“XYZ”、“ABC”）你都会定义一个对象来存储对应的数据和行为。你会把特定的任务对象都关联到 Task 功能对象上，让它们在需要的时候可以进行委托。

基本上你可以想象成，执行任务“XYZ”需要两个兄弟对象（XYZ 和 Task）协作完成。但是我们并不需要把这些行为放在一起，通过类的复制，我们可以把它们分别放在各自独立的对象中，需要时可以允许 XYZ 对象委托给 Task。

```js
Task = {
  setID: function(ID) {
    this.id = ID
  },
  outputID: function() {
    console.log(this.id)
  },
}

// 让 XYZ 委托 Task
XYZ = Object.create(Task)

XYZ.prepareTask = function(ID, Label) {
  this.setID(ID)
  this.label = Label
}

XYZ.outputTaskDetails = function() {
  this.outputID()
  console.log(this.label)
}

// ABC = Object.create( Task );
// ABC ... = ...
```

如上，Task 和 XYZ 并不是类（或者函数），它们是对象。XYZ 通过 `Object.create(..)` 创建，它的 `[[Prototype]]` 委托了 Task 对象。

在这种模式中，通常来说，在 `[[Prototype]]` 委托中最好把状态保存在委托者（XYZ、ABC）而不是委托目标（Task）上。而且应该尽量少使用容易被重写的通用方法名，提倡使用更有描述性的方法名，尤其是要写清相应对象行为的类型。

## 比较思维模型

接下来我们看看“类”和“委托”在思维模型方面的区别，下面是典型的（“原型”）面向对象风格：

```js
function Foo(who) {
  this.me = who
}
Foo.prototype.identify = function() {
  return 'I am ' + this.me
}
function Bar(who) {
  Foo.call(this, who)
}
Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.speak = function() {
  alert('Hello, ' + this.identify() + '.')
}

var b1 = new Bar('b1')
var b2 = new Bar('b2')
b1.speak()
b2.speak()
```

下面我们看看如何使用对象关联风格来编写功能完全相同的代码：

```js
Foo = {
  init: function(who) {
    this.me = who
  },
  identify: function() {
    return 'I am ' + this.me
  },
}
Bar = Object.create(Foo)
Bar.speak = function() {
  alert('Hello, ' + this.identify() + '.')
}
var b1 = Object.create(Bar)
b1.init('b1')
var b2 = Object.create(Bar)
b2.init('b2')

b1.speak()
b2.speak()
```

这段代码简洁了许多，我们只是把对象关联起来，并不需要那些既复杂又令人困惑的模仿类的行为（构造函数、原型以及 new）。

## 控件“类”

接下来看看在真实场景中如何应用，下面这段代码展示的是如何在不使用任何“类”辅助库或者语法的情况下，使用纯 JavaScript 实现类风格的代码：

```js
function Widget(width, height) {
  this.width = width || 50
  this.height = height || 50
  this.$elem = null
}

Widget.prototype.render = function($where) {
  if (this.$elem) {
    this.$elem
      .css({
        width: this.width + 'px',
        height: this.height + 'px',
      })
      .appendTo($where)
  }
}

// 子类
function Button(width, height, label) {
  // 调用“super”构造函数
  Widget.call(this, width, height)
  this.label = label || 'Default'
  this.$elem = $('<button>').text(this.label)
}

// 让 Button“继承”Widget
Button.prototype = Object.create(Widget.prototype)
// 重写 render(..)
Button.prototype.render = function($where) {
  // “super”调用
  Widget.prototype.render.call(this, $where)
  this.$elem.click(this.onClick.bind(this))
}
Button.prototype.onClick = function(evt) {
  console.log("Button '" + this.label + "' clicked!")
}

$(document).ready(function() {
  var $body = $(document.body)
  var btn1 = new Button(125, 30, 'Hello')
  var btn2 = new Button(150, 40, 'World')
  btn1.render($body)
  btn2.render($body)
})
```

使用 ES6 的 `class` 语法糖来实现相同的功能：

```js
class Widget {
  constructor(width, height) {
    this.width = width || 50
    this.height = height || 50
    this.$elem = null
  }

  render($where) {
    if (this.$elem) {
      this.$elem
        .css({
          width: this.width + 'px',
          height: this.height + 'px',
        })
        .appendTo($where)
    }
  }
}

class Button extends Widget {
  constructor(width, height, label) {
    super(width, height)
    this.label = label || 'Default'
    this.$elem = $('<button>').text(this.label)
  }

  render($where) {
    super.render($where)
    this.$elem.click(this.onClick.bind(this))
  }

  onClick(evt) {
    console.log("Button '" + this.label + "' clicked!")
  }
}

$(document).ready(function() {
  var $body = $(document.body)
  var btn1 = new Button(125, 30, 'Hello')
  var btn2 = new Button(150, 40, 'World')
  btn1.render($body)
  btn2.render($body)
})
```

下面的例子使用对象关联风格委托来更简单地实现 Widget/Button：

```js
var Widget = {
  init: function(width, height) {
    this.width = width || 50
    this.height = height || 50
    this.$elem = null
  },

  insert: function($where) {
    if (this.$elem) {
      this.$elem
        .css({
          width: this.width + 'px',
          height: this.height + 'px',
        })
        .appendTo($where)
    }
  },
}

var Button = Object.create(Widget)
Button.setup = function(width, height, label) {
  // 委托调用
  this.init(width, height)
  this.label = label || 'Default'
  this.$elem = $('<button>').text(this.label)
}
Button.build = function($where) {
  // 委托调用
  this.insert($where)
  this.$elem.click(this.onClick.bind(this))
}
Button.onClick = function(evt) {
  console.log("Button '" + this.label + "' clicked!")
}

$(document).ready(function() {
  var $body = $(document.body)
  var btn1 = Object.create(Button)
  btn1.setup(125, 30, 'Hello')
  var btn2 = Object.create(Button)
  btn2.setup(150, 40, 'World')
  btn1.build($body)
  btn2.build($body)
})
```

使用对象关联风格来编写代码时不需要把 Widget 和 Button 当作父类和子类。相反，Widget 只是一个对象，包含一组通用的函数，任何类型的控件都可以委托，Button 同样只是一个对象。

## 内省

内省就是检查实例的类型。类实例的内省主要目的是通过创建方式来判断对象的结构和功能。

使用 `instanceof` 可以在一些情况下解决问题，但是会产生语义困惑而且非常不直观。

另外，如果你想检查一个对象和另一个对象的关系，那必须使用另一个引用该对象的函数才行——你不能直接判断两个对象是否关联。

还有一种常见但是可能更加脆弱的内省模式，许多开发者认为它比 `instanceof` 更好。这种模式被称为“鸭子类型”。这个术语源自这句格言“如果看起来像鸭子，叫起来像鸭子，那就一定是鸭子。”

ES6 的 Promise 就是典型的“鸭子类型”，出于各种各样的原因，我们需要判断一个对象引用是否是 Promise，但是判断的方法是检查对象是否有 `then()` 方法。

使用对象关联时，所有的对象都是通过 `[[Prototype]]` 委托互相关联，下面是内省的方法，非常简单：

```js
// 让 Foo 和 Bar 互相关联
Foo.isPrototypeOf(Bar) // true
Object.getPrototypeOf(Bar) === Foo // true
// 让 b1 关联到 Foo 和 Bar
Foo.isPrototypeOf(b1) // true
Bar.isPrototypeOf(b1) // true
Object.getPrototypeOf(b1) === Bar // true
```

显然，这种方法显然更加简洁并且清晰。
