# 类型保护

类型保护允许你使用更小范围下的对象类型。

## typeof

如果你在一个条件块中使用 `typeof` 和 `instanceof`，TypeScript 将会推导出在条件块中的的变量类型。

```js
function getLen(x: number | string) {
  if (typeof x === 'string') {
    // 使用 typeof 后 TypeScript 可以 get 到具体的类型 `string`
    return x.length
  }

  return x.toString().length
}
```

## instanceof

和 `typeof` 类似，`instanceof` 也可以具备同样的效果。

```js
class Foo {
  foo = 123
}

class Bar {
  bar = 123
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo) // ok
    console.log(arg.bar) // Error
  } else {
    // 在这个块中，一定是 'Bar'
    console.log(arg.foo) // Error
    console.log(arg.bar) // ok
  }
}
```

## in

`in` 操作符可以安全的检查一个对象上是否存在一个属性，它通常也被作为类型保护使用。

```js
interface A {
  x: number;
}

interface B {
  y: string;
}

function doStuff(q: A | B) {
  if ('x' in q) {
    // q: A
  } else {
    // q: B
  }
}
```

## 字面量类型保护

当你在联合类型里使用字面量类型时，你可以检查它们是否有区别。

```js
type Dog = {
  favorite: 'bone',
  run: string,
}

type Cat = {
  favorite: 'fish',
  swim: string,
}

function move(animal: Dog | Cat) {
  if (animal.favorite === 'bone') {
    console.log(animal.run) // Ok
    console.log(animal.swim) // Error
  } else {
    console.log(animal.swim) // Ok
    console.log(animal.run) // Error
  }
}
```

## 使用定义的类型保护

你可以创建用户自定义的类型保护函数，这仅仅是一个返回值为类似于 “someArgumentName is SomeType” 的函数。

```js
type Dog = {
  favorite: "bone";
  run: string;
};

type Cat = {
  favorite: "fish";
  swim: string;
};

// 自定义的类型保护
function isDog(arg: Dog | Cat): arg is Dog {
  return (arg as Dog).favorite === "bone";
}

function move(animal: Dog | Cat) {
  if (isDog(animal)) {
    console.log(animal.run); // Ok
    console.log(animal.swim); // Error
  } else {
    console.log(animal.swim); // Ok
    console.log(animal.run); // Error
  }
}
```
