# 继承

继承是`OO`语言中的一个最为人津津乐道的概念。许多`OO`语言都支持两种继承方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。

由于函数没有签名， 在 `ECMAScript` 中无法实现接口继承。`ECMAScript` 只支持实现继承，而且其实现继承主要是依靠原型链来实现的。

## 原型链

`ECMAScript` 中描述了原型链的概念，并将原型链作为实现继承的主要方法。基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。

假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。

```javascript
function Super () {
    this.prop = 'Super';
}
Super.prototype.logProp = function () {
    console.log(this.prop);
}

function Sub () {
    this.subProp = 'Sub';
}
Sub.prototype = new Super(); // 重写了 Sub 的原型对象
Sub.prototype.logSubProp = function () {
    console.log(this.subProp);
}

var instance = new Sub();
instance.logProp();
instance.logSubProp();
```

在上面的代码中，我们没有使用 `Sub` 默认提供的原型，而是给它换了一个新原型；这个新原型就是 `Super` 的实例。 于是，新原型不仅具有作为一个 `Super` 的实例所拥有的全部属性和方法， 而且其内部还有一个指针，指向了 `Super` 的原型。也就是说现在 `Sub` 继承了 `Super`。主要注意的是 `instance.constructor` 现在指向的是 `Super`。

::: warning
给原型添加方法的代码一定要放在替换原型的语句之后。

在通过原型链实现继承时，不能使用对象字面量创建原型方法。因为这样做就会重写原型链。
:::

## 原型链的弊端

原型链固然很强大，可以用它来实现继承，但它也存在一些问题。由于引用类型值的原型属性会被所有实例共享，通常在构造函数中，而不是在原型对象中定义属性。在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了。

```javascript
function Super () {
    this.colors = ['red', 'bule', 'yello'];
}

function Sub () {}
Sub.prototype = new Super(); // 重写了 Sub 的原型对象

var instance1 = new Sub();
var instance2 = new Sub();

instance1.colors.length = 2;
console.log(instance2.colors.join()); // red,bule
```

可见 Sub 的所有实例都会共享这一个 `colors` 属性。 所以我们对 `instance1.colors` 的修改 能够通过 `instance2.colors` 反映出来。

原型链的第二个问题是：在创建子类型的实例时，不能向超类型的构造函数（Sup）中传递参数。实际上，应该说是没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。

## 借用构造函数

为了解决原型链继承的弊端，开发人员开始使用一种叫做借用构造函数（constructor stealing）的技术（有时候也叫做伪造对象或经典继承）。这种技术的基本思想相当简单，即在子类型构造函数的内部调用超类型构造函数。

```javascript
function Sup() {
    this.colors = ["red", "blue", "yellow"];
}
function Sub() {
    //继承了 Sup
    Sup.call(this);
}

var instance1 = new Sub();
instance1.colors.length = 2;
console.log(instance1.colors.join());    // red,blue
var instance2 = new Sub();
console.log(instance2.colors.join());    // red,blue,yellow
```

通过使用 `call()` 方法（或`apply()`）在（未来将要）新创建的 `Sub` 实例的环境下调用了 `Sup` 构造函数。这样一来，就会在新 `Sub` 对象上执行 `Sup()` 函数中定义的所有对象初始化代码。最后，`Sub` 的每个实例就都会具有自己的 `colors` 属性的副本。

相对于原型链而言，借用构造函数还有一个很大的优势，即可以在子类型构造函数中向超类型构造函数传递参数。

## 借用构造函数的问题

如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题：使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍，也就是说不同实例上的同名函数是不相等的，无法实现函数复用。

而且，在超类型的原型中定义的方法，对子类型而言也是不可见的。

```javascript
function Sup() {
    this.prop = 'Sup';
}
Sup.prototype.logProp = function () {
    console.log(this.prop);
}
function Sub() {
    //继承了 Sup
    Sup.call(this);
}

var instance = new Sub();
instance.logProp(); // instance.logProp is not a function
```

## 组合继承

组合继承（combination inheritance），有时候也叫做伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。

思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。

```javascript
function Sup (name) {
    this.name = name;
    this.colors = ['red', 'bule', 'yellow'];
}
Sup.prototype.sayName = function () {
    console.log(this.name);
}
function Sub (name, age) {
    // 继承属性
    Sup.call(this, name);
    this.age = age;
}
// 继承方法
Sub.prototype = new Sup();
Sub.prototype.constructor = Sub;
Sub.prototype.sayAge = function () {
    console.log(this.age);
};

var instance1 = new Sub("Anani", 24);
instance1.colors.length = 2;
console.log(instance1.colors.join());   // red,blue
instance1.sayName();                    // Anani
instance1.sayAge();                     // 24
var instance2 = new Sub('Sharon', 23);
console.log(instance2.colors.join());   // red,blue,green
instance2.sayName();                    // Sharon
instance2.sayAge();                     // 23
```

组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为 `JavaScript` 中最常用的继 承模式。而且，`instanceof` 和 `isPrototypeOf()` 也能够用于识别基于组合继承创建的对象。

## 原型式继承

道格拉斯·克罗克福德在 2006 年提出了原型式继承，其基本思想就是借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```javascript
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
```

在 `object()` 函数内部，先创建了一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例。

`ECMAScript 5` 通过新增 `Object.create()` 方法规范化了原型式继承。这个方法接收两个参数：一 个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。在传入一个参数的情况下， `Object.create()` 与上面的 `object()` 方法的行为相同。

`Object.create()` 方法的第二个参数与 `Object.defineProperties()` 方法的第二个参数格式相同。

```javascript
var person = {
    name: "Anani",
    age: 18
};
var anotherPerson = Object.create(person, {
    name: { value: "Sharon" }
});
console.log(anotherPerson.name); // "Sharon"
```

## 寄生式继承

寄生式（parasitic）继承是与原型式继承紧密相关的一种思路，其思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

```javascript
function createAnother(ori) {
    var clone = object(ori);    //通过调用函数创建一个新对象
    clone.sayHi = function () { //以某种方式来增强这个对象
        console.log('Hello');
    };
    return clone; // 返回这个对象
}
```

现在经过包装后的对象，不仅具有基础对象的所有属性和方法，同时也具备了自己的方法。

显然，使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率，这一点与构造函数模式类似。

## 寄生组合式继承

组合继承最大的问题就是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。解决这个问题的方法就是使用寄生组合式继承。

所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。

```javascript
function inheritPrototype(sub, sup) {
    var prototype = object(sup.prototype); //创建对象
    prototype.constructor = sub;             //增强对象
    sub.prototype = prototype;               //指定对象
}
```

这个函数首先创建超类型原型的一个副本。然后是为创建的副本添加 `constructor` 属性， 从而弥补因重写原型而失去的默认的 `constructor` 属性。 最后，将新创建的对象（即副本）赋值给子类型的原型。这样，我们就可以用调用 `inherit- Prototype()` 函数的语句，去替换前面例子中为子类型原型赋值的语句了，例如：

```javascript
function Sup(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
Sup.prototype.sayName = function () {
    console.log(this.name);
};
function Sub(name, age) {
    Sup.call(this, name);
    this.age = age;
}
inheritPrototype(Sub, Sup);
Sub.prototype.sayAge = function () {
    console.log(this.age);
};

var instance = new Sub('Anani', 24);
instance.sayName(); // Anani
instance.sayAge();  // 24
```

高效率体现在它只调用了一次 `Sup` 构造函数，并且因此避免了在 `Sub`。`prototype` 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 `instanceof` 和 `isPrototypeOf()`。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

## 参考资料

* JavaScript 高级程序设计(第3版)
