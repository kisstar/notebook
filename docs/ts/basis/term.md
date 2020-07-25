# 知识点

通过类型注解我们可以给一个变量、函数等声明一个类型，以此具备强类型语言的一些优点。不仅如此，TypeScript 还提供了类型别名、类型推论等等功能。

## 类型别名

使用类型别名可以给一个类型起个新的名字。

```js
type Person = {
  name: string,
  age: number,
}
```

看起来和接口定义有点类似，但是通过类型别名声明的类型无法继承和实现。通常，可以用接口实现的情况应该优先使用接口而不是类型别名。

类型别名常用于联合类型。

## 联合类型

联合类型（Union Types）可以通过管道(|)将变量设置多种类型，赋值时可以根据设置的类型来赋值。

```js
type StrOrNum = string | number
```

对于联合类型上的属性，我们只能访问此联合类型的所有类型里共有的属性或方法。

```js
function getLength(something: string | number): number {
  return something.length
}
```

在上例中，由于 `length` 不是 `string` 和 `number` 的共有属性，所以会报错。

## 交叉类型

交叉类型可以将多个类型合并为一个类型。这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

比如我们在定义 `Object.assign` 这样的方法时就可以使用交叉类型：

```js
let Func: <T, U>(target: T, source: U) => T & U
```

通常，我们会在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。

```js
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}
```

## 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

```js
let str = 'seven'
str = 7

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

在上述的代码中，我们并没有声明 `str` 的类型，但是 TypeScript 根据其赋值推导出一个类型，这就是类型推论。

需要注意的是如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查。

```js
let str
str = 'seven'
str = 7
```

## 类型断言

有时候你会比 TypeScript 更了解某个值的详细信息，通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。它没有运行时的影响，只是在编译阶段起作用。TypeScript 会假设你，已经进行了必须的检查。

类型断言有两种形式。其一是“尖括号”语法：

```js
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

另一个为 `as` 语法：

```js
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

两种形式是等价的。至于使用哪个大多数情况下是凭个人喜好；然而，当你在 TypeScript 里使用 JSX 时，只有 `as` 语法断言是被允许的。

## 函数重载

函数重载是 C++、C# 和 Java 等编程语言中具有的一项特性，该特性允许创建数项名称相同但输入输出类型或个数不同的子程序，它可以简单地称为一个单独功能可以执行多项任务的能力。

在 TypeScript 中我们可以重复定义了多次同一个函数，前几次都是函数定义，最后一次是函数实现。如此编辑器的代码提示中，可以正确的看到前两个提示。

TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

```js
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  return x;
}
```
