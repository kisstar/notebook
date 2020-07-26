# 基础

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举等类型方便我们使用。

## 基础类型

- Null 和 Undefined

```js
// Not much else we can assign to these variables!
let u: undefined = undefined
let n: null = null
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。就是说你可以将其赋值给任何其它类型。

- 布尔值

可以赋值为 `true/false` 值。

```js
let isDone: boolean = false
```

- 数字

除了支持十进制和十六进制字面量，二进制和八进制字面量也同样支持。

```js
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744
```

- 字符串

```js
let name: string = `Gene`
let age: number = 37
let sentence: string = `Hello, my name is ${name}. I'll be ${age + 1} years old next month.`
```

- Symbols

ECMAScript 2015 开始 `symbol` 成为了一种新的原生类型，由 Symbol 构造函数创建。

```js
let sym: symbol = Symbol('key')
```

- 数组

```js
let list: number[] = [1, 2, 3]
```

除了上面的申明方式外，还可以使用泛型来指定。

- 元组

元祖就像是固定长度和每一项类型的数组。

```js
let x: [string, number] = ['hello', 10]
```

当访问一个已知索引的元素，会得到正确的类型，而访问一个越界的元素则会报错。

- 枚举

使用枚举类型可以为一组数值赋予友好的名字，默认情况下，从 0 开始为元素编号。你也可以手动的指定成员的数值。

```js
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

- Any

```js
let notSure: any = 4
notSure.ifItExists() // okay, ifItExists might exist at runtime
```

使用 `any` 类型相当于放弃了类型检查，也得不到任何代码提示，所以并不建议使用此类型。不过，针对来自用户输入或第三方代码库这会比较有用。

- 空值

通常，用 `void` 表示没有任何返回值的函数。

```js
function alertName(): void {
  alert('My name is Tom')
}
```

申明为 `void` 后只能赋值为 `undefined` 和 `null`。

- Never

此类型表示的是那些永不存在的值的类型，比如那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

```js
// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}
```

`never` 类型是任何类型的子类型，也可以赋值给任何类型，反之不成立。

- Object

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 API。

```js
declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK
create(42) // Error
```

## 字面量类型

在 TypeScript 中具有字符串字面量类型和数字字面量类型。

字符串字面量类型允许你指定字符串必须的固定值。在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。

```js
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ...
    } else if (easing === 'ease-out') {
    } else if (easing === 'ease-in-out') {
    } else {
      // error! should not pass null or undefined.
    }
  }
}

const button = new UIElement()
button.animate(0, 0, 'ease-in')
```

数字字面量类型与字符串字面量类型类似。

## 函数

在 TypeScript 中可以对函数的输入和输出都进行约束。

```js
function sum(x: number, y: number): number {
  return x + y
}
```

根据指定的函数类型，输入多余的（或者少于要求的）参数，都是不被允许的，如果想要指定可选参数可以通过 `?` 进行指定。

```js
function sum(x: number, y: number, z?: number): number {
  return z ? x + y + z : z + y
}
```

需要注意的是，可选参数后面不允许再出现必需的参数。当然指定参数的默认值也是可以的，有默认值的参数就不可以用 `?` 进行修饰了。

```js
function sum(x: number, y: number, z: number = 9): number {
  return x + y + z
}
```

另外，ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数），此时 `rest` 其实是一个数组，所以可以用数组的类型来定义它。

## 接口

在 TypeScript 中，我们可以使用接口（Interfaces）来定义对象的类型。类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

```js
interface Person {
  name: string;
  age: number;
}
```

接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在，这时候可以用可选属性：

```js
interface Person {
  name: string;
  age: number;
  profession: string;
}
```

另外，一些对象属性只能在对象刚刚创建的时候修改其值。你可以在属性名前用 `readonly` 来指定只读属性:

```js
interface Person {
  readonly name: string;
  age: number;
  profession: string;
}
```
