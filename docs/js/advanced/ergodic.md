# 普通对象的遍历

```javascript
const privateProp = Symbol('private')
const noEnumerPrivateProp = Symbol('noEnumerPrivate')
const privateProtoProp = Symbol('privateProto')
const noEnumerPrivateProtoProp = Symbol('noEnumerPrivateProto')

const sup = Object.defineProperties(
  {},
  {
    title: {
      value: '原型上的可枚举属性',
      enumerable: true,
    },
    description: {
      value: '原型上的不可枚举属性',
      enumerable: false,
    },
    [privateProtoProp]: {
      value: '原型上的可枚举私有原型属性',
      enumerable: true,
    },
    [noEnumerPrivateProtoProp]: {
      value: '原型上的不可枚举私有原型属性',
      enumerable: false,
    },
  },
)

const sub = Object.create(sup, {
  name: {
    value: '实例上的可枚举属性',
    enumerable: true,
  },
  age: {
    value: '实例上的不可枚举属性',
    enumerable: false,
  },
  [privateProp]: {
    value: '实例上的可枚举私有属性',
    enumerable: true,
  },
  [noEnumerPrivateProp]: {
    value: '实例上的不可枚举私有属性',
    enumerable: false,
  },
})

console.log(sub)
// {name: "实例上的可枚举属性", age: "实例上的不可枚举属性", Symbol(private): "实例上的可枚举私有属性", Symbol(noEnumerPrivate): "实例上的不可枚举私有属性"}
```

## in

判断属性是否存在。

如果实例对象的属性存在、或则继承自对象的原型，那么无论是否可枚举、是否是 Symbol，`in` 运算符都会返回 `true`。

```javascript
// 自身可枚举
console.log('name' in sub) // true
// 自身不可枚举
console.log('age' in sub) // true
// 原型可枚举
console.log('title' in sub) // true
// 原型不可枚举
console.log('description' in sub) // true

// 自身 Symbol 可枚举
console.log(privateProp in sub) // true
// 自身 Symbol 不可枚举
console.log(noEnumerPrivateProp in sub) // true
// 原型 Symbol 可枚举
console.log(privateProtoProp in sub) // true
// 原型 Symbol 不可枚举
console.log(noEnumerPrivateProtoProp in sub) // true
```

## for...in

以任意顺序遍历一个对象的除 `Symbol` 以外的可枚举属性，包括该对象从其构造函数原型中继承的属性。

数组索引只是具有整数名称的枚举属性，并且与通用对象属性相同。不能保证 `for...in` 将以任何特定的顺序返回索引。

在迭代过程中最好不要在对象上进行添加、修改或者删除属性的操作，除非是对当前正在被访问的属性。

如果你只要考虑对象本身的属性，而不是它的原型，那么使用 `getOwnPropertyNames()` 或执行 `hasOwnProperty()` 来确定某属性是否是对象本身的属性。

```javascript
for (const prop in sub) {
  console.log(prop, sub[prop])
}

// name 实例上的可枚举属性
// title 原型上的可枚举属性
```

## for...of

在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。

默认情况下，普通对象是不可并迭代的，所以直接遍历会报错。

```javascript
for (const prop of sub) {
  console.log(prop, sub[prop])
}
// Uncaught TypeError: sub is not iterable
```

如果你想要遍历普通对象可以先为其指定 `Symbol.iterator` 方法。

```javascript
sub[Symbol.iterator] = function() {
  return {
    i: 0,
    _keys: Object.keys(this),
    next() {
      if (this.i < this._keys.length) {
        return { value: this._keys[this.i++], done: false }
      }
      return { value: undefined, done: true }
    },
  }
}
```

## Object.keys()

返回给定对象自身的所有可枚举属性的字符串数组。

数组中属性名的排列顺序和使用 `for...in` 循环遍历该对象时返回的顺序一致。如果对象的键-值都不可枚举，那么将返回由键组成的数组。

```javascript
console.log(Object.keys(sub)) // ["title"]
```

## Object.getOwnPropertyNames()

返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

数组中枚举属性的顺序与通过 `for...in` 循环（或 Object.keys）迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。

```javascript
console.log(Object.getOwnPropertyNames(sub)) // ["title", "age"]
```

## Object.getOwnPropertySymbols()

返回一个给定对象自身的所有 `Symbol` 属性的数组。

```javascript
console.log(Object.getOwnPropertySymbols(sub)) // [Symbol(private), Symbol(noEnumerPrivate)]
```

## Reflect.ownKeys()

返回一个由目标对象自身的属性键组成的数组。

返回值等同于 `Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`。

```javascript
console.log(Reflect.ownKeys(sub)) // ["title", "other", Symbol(private), Symbol(noEnumerPrivate)]
```

## 总结

| 名称                             |    自身    | 继承 | 可枚举 | 不可枚举 | Symbol |
| :------------------------------- | :--------: | :--: | :----: | :------: | :----: |
| `in`                             |     ✅     |  ✅  |   ✅   |    ✅    |   ✅   |
| `for...in`                       |     ✅     |  ✅  |   ✅   |    ❌    |   ❌   |
| `for...of`                       |     ❌     |  ❌  |   ❌   |    ❌    |   ❌   |
| `Object.keys()`                  |     ✅     |  ❌  |   ✅   |    ❌    |   ❌   |
| `Object.getOwnPropertyNames()`   |     ✅     |  ❌  |   ✅   |    ✅    |   ❌   |
| `Object.getOwnPropertySymbols()` | ✅(Symbol) |  ❌  |   ✅   |    ✅    |   ✅   |
| `Reflect.ownKeys()`              |     ✅     |  ❌  |   ✅   |    ✅    |   ✅   |
