# 作用域

当代码在一个环境中执行时，会创建变量对象的一个作用域链。

如果一个变量或者其他表达式不在 "当前的作用域"，那么 `JavaScript` 机制会继续沿着作用域链上查找直到全局作用域（global 或浏览器中的 window）为止（如果依旧找不到，通常会导致错误）。

## Example_0

```javascript
var num1 = 6
var num2 = 9

function fn1(num, num1) {
  num = 8
  num1 = 8
  num2 = 8
  console.log(num) // 8
  console.log(num1) // 8
  console.log(num2) // 8
}

fn1(num1, num2)
console.log(num1) // 6
console.log(num2) // 8
console.log(num) // undefined
```

多数情况下，大家会对最后打印的 `num` 的值表示疑惑，因为大家第一眼都会觉得在函数 `fn1` 的内部没有通过 `var` 关键字来声明 `num` 变量，所以它是全局的，它的值应该是 88。事实上，根据作用域链的查找规则，在当前作用域下已经存在了变量（形参） `num`，所以它赋值的对象只是当前作用域下的 `num`，与全局的无关。

`num1` 和 `num` 是同样的道理，而 `num2` 则没有在形参中出现，所以对其进行操作时，就是操作的全局作用域下的 `num2`。

## Example_1

```javascript
function Person(name, age, weight) {
  this.name = name
  this.age = age
  this.weight = weight
}

function fn1(person) {
  person.name = "p2"
  person = new Person("p3", 18, 45)
}

var p = new Person("p1", 18, 45)
console.log(p.name) // p1
fn1(p)
console.log(p.name) // p2
```

**在 `ECMAscript` 中所有函数的参数都是按值传递的。**在函数 `fn1` 的内部给 `person` 赋值之前，`person` 和外部 `p` 其实指向的是内存中同一个地址，因此修改后的内容会同时反应在外部。但由于按值传递的原因，我们继续改变内容 `person` 的值（指向）后，它们就不再指向同一个地址了，后续也就再无关系。

## Example_2

```javascript
var a = 10,
  b = 11,
  c = 12

function test(a) {
  a = 1
  var b = 2
  c = 3
}

test(10)
console.log(a)
console.log(b)
console.log(c)
// 10
// 11
// 3
```

这和上面的题目很类似。

## Example_3

```javascript
function fn(ary) {
  ary[0] = 0
  ary = [0]
  ary[0] = 100
  return ary
}

var res = fn(ary)
console.log(ary) // [0, 2, 3, 4]
console.log(res) // [100]
```

注意参数的传递都是按值传递的就可以了。

## Example_4

```javascript
var a = 4

function b(x, y, a) {
  console.log(a)
  arguments[2] = 10
  console.log(a)
}

a = b(1, 2, 3)
console.log(a)
// 3
// 10
// undefined
```

[Arguments 对象 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 是一个类数组；它可以被设置，在非严格模式下与函数的实际形参之间共享（没有包含剩余参数、默认参数和解构赋值时）。

另外，参与共享的参数以实参为准，超过实参的个数无法形成共享。简而言之，这种关系在函数执行形参赋值的一瞬间建立，后续的操作将无法再建立新的联系。

## Example_5

```javascript
var foo = 'Hello';
(function (foo) {
  console.log(foo)
  var foo = foo || 'world'
  console.log(foo)
})(foo)
console.log(foo)
// 'Hello'
// 'Hello'
// 'Hello'
```

函数参数可以看作是函数作用域内的私有变量。

这里在变量提升（声明提升）前已经有这个同名（foo）变量了，所以不会再重复声明，也就是 `foo` 不存在变量提升。
