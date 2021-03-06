# 数据类型和内存

ECMAScript 变量可能包含两种不同数据类型的值：基本类型值和引用类型值。

在将一个值赋给变量时，解析器必须确定这个值是基本类型值还是引用类型值，以此来决定如何分配内存空间。

与其他语言不同，JavaScript 并不允许直接访问内存中的位置， 也就是说不能直接操作对象的内存空间，而常常提及的内存空间就是栈内存和堆内存。

## 栈内存和堆内存

栈的优势就是存取速度比堆要快，仅次于直接位于 CPU 中的寄存器，但缺点是，存在栈中的数据大小与生存期必须是确定的，缺乏灵活性。

堆的优势是可以动态地分配内存大小，生存期也不必事先告诉编译器，垃圾收集器会自动地收走这些不再使用的数据，但是缺点是由于在运行时动态分配内存，所以存取速度较慢。

相对于简单数据类型而言，他们占用内存比较小，如果放在堆中，查找会浪费很多时间，而把堆中的数据放入栈中也会影响栈的效率。

在 JavaScript 中基本类型值是存储在栈中的简单数据段，也就是说，他们的值直接存储在变量访问的位置。而像对象和数组这样可以无限拓展的，正好放在可以动态分配大小的堆中。最后指向对象的变量，实际保存的是指向堆内存保存对象的地址值。因此在操作对象时，实际上是在操作对象的引用而不是实际的对象。 所以，引用类型的值是按引用访问的。

## 复制变量值

如果从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上。

<img :src="$withBase('/images/js/SimpleDataTypes.png')" alt="SimpleDataTypes">

当从一个变量向另一个变量复制引用类型的值时， 同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中。不同的是，这个值的副本实际上是一个指针（内存地址值），而这个指针指向存储在堆中的一个对象。复制操作结束后，两个变量实际上将引用同一个对象。因此，改变其中一个变量，就会影响另一个变量。

<img :src="$withBase('/images/js/ComplexDataTypes.png')" alt="ComplexDataTypes">

## 参数传递

ECMAScript 中所有函数的参数都是按值传递的。也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。基本类型值的传递如同基本类型变量的复制一样，而引用类型值的传递，则如同引用类型变量的复制一样。

有时候人们在局部作用域中修改的对象会在全局作用域中反映出来，就觉得参数是按引用传递的，究其根本原理来说，这样的理解是错误的。

参数实际上是函数的局部变量，在向参数传递基本类型的值时，被传递的值会被复制给一个参数。在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反映在函数的外部。

## Show me the code

```javascript
// 第一种方式
var num = 1
function fn() {
  num += 1
}
fn()
console.log(num) // 2

// 第二种方式
var num = 1
function fn(num) {
  num += 1
}
fn(num)
console.log(num) // 1
```

第一种方式，由于并没有给函数传值，所以其实函数操作的是全局的变量，因此打印了我们通常想要的结果。

第二种方式中给函数传递了函数，按照上面所说的把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样，所以全局作用域中的的变量 `num` 把值赋值给内部的变量 `num` 后，内外的 `num` 就没什么关系了，打印时打印的是全局的变量 `num`，而内部的 `num` 值在函数结束后就被销毁了。

```javascript
// 第一种方式
var obj = {
  name: 'Anani',
  age: 24,
}
function fn(obj) {
  ;(obj.name = 'Sharon'), (obj.age = 23)
}

fn(obj)
console.log(obj.name, obj.age) // Sharon 23

// 第二种方式
var obj = {
  name: 'Anani',
  age: 24,
}
function fn(obj) {
  obj = {
    name: 'Sharon',
    age: 23,
  }
}

fn(obj)
console.log(obj.name, obj.age) // Anani 24
```

同理第一种方式中，外部变量把值赋值给了内部的变量，不同的是，这个值是一个指针（地址值），它们指向的是内存中的同一个变量，所以内部的改变会同时体现在外部的变量上面。

第二种方式中，很大的区别是，它不是对内存中的对象进行操作，而是在外部变量将值赋值给内部的变量后，又创建了一个对象，并把这个对象的引用给了内部的值，和基本数据类型一样，它并不会影响外部的变量的值，而内部的这个变量同样在函数结束后被销毁。

## 参考资料

- JavaScript 高级程序设计(第 3 版)
