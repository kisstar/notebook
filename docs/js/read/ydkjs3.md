# YDKJS-类

类(Class): 用来描述具有相同的属性和方法的对象的集合。它定义了该集合中每个对象所共有的属性和方法。

在相当长的一段时间里，JavaScript 只有一些近似类的语法元素（比如 new 和 instanceof），不过在后来的 ES6 中新增了一些元素，比如 `class` 关键字。

`class` 关键字的出现并不意味着在 JavaScript 中有类，因为 JavaScript 的机制其实和类完全不同。

事实上，在软件设计中类是一种可选的模式，你可以根据需要自己根据决定是否在 JavaScript 中使用它。

## 构造函数

类和实例的关系就好比建筑蓝图和一栋建筑，图中设计了一栋建筑应该具备的结构，建筑工人会按照蓝图建造建筑，之后建筑工人也可以到下一个地方，把所有工作都重复一遍，再创建一份副本。

具体的创造细节是由一个特殊的类方法构造的，这个方法名通常和类名相同，被称为构造函数。这个方法的任务就是初始化实例需要的所有信息（状态）。

```js
class CoolGuy {
  specialTrick = nothing

  CoolGuy(trick) {
    specialTrick = trick
  }

  showOff() {
    output("Here's my trick: ", specialTrick)
  }
}
```

我们可以调用类构造函数来生成一个 CoolGuy 实例：

```js
var Joe = new CoolGuy('jumping rope') // 实际上调用的就是构造函数 CoolGuy()，它会返回一个对象（也就是类的实例）
Joe.showOff() // 这是我的绝技：跳绳
```

类构造函数属于类，而且通常和类同名。此外，构造函数大多需要用 `new` 来调，这样语言引擎才知道你想要构造一个新的类实例。

## 继承

在面向类的语言中，你可以先定义一个类，然后定义一个继承前者的类。后者通常被称为“子类”，前者通常被称为“父类”（基类）。

定义好一个子类之后，相对于父类来说它就是一个独立并且完全不同的类。子类会包含父类行为的原始副本，但是也可以重写所有继承的行为甚至定义新行为。

```js
class Vehicle {
  engines = 1;

  ignition() {
    output("Turning on my engine.");
  }

  drive() {
    ignition();
    output("Steering and moving forward!");
  }
}

class Car inherits Vehicle {
  wheels = 4;

  drive() {
    inherited: drive();
    output("Rolling on all ", wheels, " wheels!");
  }
}

class SpeedBoat inherits Vehicle {
  engines = 2;

  ignition() {
    output("Turning on my ", engines, " engines.");
  }

  pilot() {
    inherited: drive();
    output("Speeding through the water with ease!");
  }
}
```

我们通过定义 Vehicle 类来假设一种发动机，一种点火方式，一种驾驶方法。但不可能制造一个通用的“交通工具”，因为这个类只是一个抽象的概念。

接下来我们定义了两类具体的交通工具：Car 和 SpeedBoat。它们都从 Vehicle 继承了通用的特性并根据自身类别修改了某些特性。汽车需要四个轮子，快艇需要两个动机，因此它必须启动两个发动机的点火装置。

## 多态

在上面的示例中，Car 重写了继承自父类的 `drive()` 方法，但是之后 Car 调用了 `inherited:drive()` 方法，这表明 Car 可以引用继承来的原始 `drive()` 方法。快艇的 `pilot()` 方法同样引用了原始 `drive()` 方法。

这个技术被称为多态或者虚拟多态。在本例中，更恰当的说法是相对多态：任何方法都可以引用继承层次中高层的方法（无论高层的方法名和当前方法名是否相同）。

在许多语言中可以使用 `super` 来代替本例中的 `inherited:`，它的含义是“超类”（superclass），表示当前类的父类/祖先类。

多态的另一个方面是，在继承链的不同层次中一个方法名可以被多次定义，当调用方法时会自动选择合适的定义。

在之前的代码中就有两个这样的例子：`drive()` 被定义在 Vehicle 和 Car 中，`ignition()` 被定义在 Vehicle 和 SpeedBoat 中。

多态并不表示子类和父类有关联，子类得到的只是父类的一份副本。类的继承其实就是复制。

## 混入

在继承或者实例化时，JavaScript 的对象机制并不会自动执行复制行为。简单来说，JavaScript 中只有对象，并不存在可以被实例化的“类”。一个对象并不会被复制到其他对象，它们会被关联起来

由于在其他语言中类表现出来的都是复制行为，因此 JavaScript 开发者也想出了一个方法来模拟类的复制行为，这个方法就是混入。接下来我们会看到两种类型的混入：显式和隐式。

### 显式混入

非常简单的 `mixin(..)` 例子 :

```js
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    // 只会在不存在的情况下复制
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key]
    }
  }

  return targetObj
}
```

回顾一下之前提到的 Vehicle 和 Car。由于 JavaScript 不会自动实现 Vehicle 到 Car 的复制行为，所以我们需要手动实现复制功能：

```js
var Vehicle = {
  engines: 1,

  ignition: function() {
    console.log('Turning on my engine.')
  },

  drive: function() {
    this.ignition()
    console.log('Steering and moving forward!')
  },
}

var Car = mixin(Vehicle, {
  wheels: 4,

  drive: function() {
    Vehicle.drive.call(this)
    console.log('Rolling on all ' + this.wheels + ' wheels!')
  },
})
```

现在 Car 中就有了一份 Vehicle 属性和函数的副本了（从技术角度来说，函数实际上没有被复制，复制的是函数引用）。

在支持相对多态的面向类的语言中，Car 和 Vehicle 之间的联系只在类定义的开头被创建，从而只需要在这一个地方维护两个类的联系。这里的显式伪多态可以模拟多重继承，所以它会进一步增加代码的复杂度和维护难度，因此应当尽量避免使用显式伪多态。

显式混入模式的一种变体被称为“寄生继承”，它既是显式的又是隐式的：

```js
function Vehicle() {
  this.engines = 1
}

Vehicle.prototype.ignition = function() {
  console.log('Turning on my engine.')
}

Vehicle.prototype.drive = function() {
  this.ignition()
  console.log('Steering and moving forward!')
}

function Car() {
  // car 是一个 Vehicle 的实例
  var car = new Vehicle()
  // 接着我们对 car 进行定制
  car.wheels = 4
  // 保存到 Vehicle::drive() 的特殊引用
  var vehDrive = car.drive
  // 重写 Vehicle::drive()
  car.drive = function() {
    vehDrive.call(this)
    console.log('Rolling on all ' + this.wheels + ' wheels!')
  }
  return car
}

var myCar = new Car()
myCar.drive()
```

如你所见，首先我们复制一份 Vehicle 父类（对象）的定义，然后混入子类（对象）的定义（如果需要的话保留到父类的特殊引用），然后用这个复合对象构建实例。

### 隐式混入

隐式混入和之前提到的显式伪多态很像，因此也具备同样的问题：

```js
var Something = {
  cool: function() {
    this.greeting = 'Hello World'
    this.count = this.count ? this.count + 1 : 1
  },
}

Something.cool()
Something.greeting // "Hello World"
Something.count // 1

var Another = {
  cool: function() {
    // 隐式把 Something 混入 Another
    Something.cool.call(this)
  },
}

Another.cool()
Another.greeting // "Hello World"
Another.count // 1 （count 不是共享状态）
```

通过在构造函数调用或者方法调用中使用 `Something.cool.call( this )`，我们实际上“借用”了函数 `Something.cool()` 并在 Another 的上下文中调用了它。

最终的结果是 `Something.cool()` 中的赋值操作都会应用在 Another 对象上而不是 Something 对象上。因此，我们把 Something 的行为“混入”到了 Another 中。
