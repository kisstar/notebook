# 对象的遍历

```javascript
const privateProp = Symbol('private')

const sup = {
    title: '标题',
    description: '描述' // 将被继承的属性
}

const sub = Object.create(sup, {
    title: {
        value: '子标题', // 重写继承的 title 属性
        enumerable: true // 设置为可枚举，默认为 false
    },
    other: {
        value: '其它' // 添加新的属性
    },
    [privateProp]: {
        value: '私有属性'
    }
})

console.log(sub) // {title: "子标题", other: "其它"}
```

## in（原型，包括可枚举、不可枚举以及 Symbol）

判断属性是否存在。

如果实例对象的属性存在、或则继承自对象的原型，`in` 运算符都会返回 `true`。

```javascript
// 检验自身属性
console.log('title' in sub) // true
// 检验原型属性
console.log('description' in sub) // true
// 检验不可枚举
console.log('other' in sub) // true
// 检验 Symbol
console.log(privateProp in sub) // true
```

## for...in（原型、可枚举）

以任意顺序遍历一个对象的除 `Symbol` 以外的可枚举属性，包括该对象从其构造函数原型中继承的属性。

数组索引只是具有整数名称的枚举属性，并且与通用对象属性相同。不能保证 `for ... in` 将以任何特定的顺序返回索引。

在迭代过程中最好不要在对象上进行添加、修改或者删除属性的操作，除非是对当前正在被访问的属性。

如果你只要考虑对象本身的属性，而不是它的原型，那么使用 `getOwnPropertyNames()` 或执行 `hasOwnProperty()` 来确定某属性是否是对象本身的属性。

```javascript
for (const prop in sub) {
    console.log(prop, sub[prop])
}
// title 子标题
// description 描述
```

## for...of

在可迭代对象上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。

```javascript
for (const prop of sub) {
    console.log(prop, sub[prop])
}
// Uncaught TypeError: sub is not iterable
```

## Object.keys() 可枚举

返回给定对象自身的所有可枚举属性的字符串数组。

数组中属性名的排列顺序和使用 `for...in` 循环遍历该对象时返回的顺序一致。如果对象的键-值都不可枚举，那么将返回由键组成的数组。

```javascript
console.log(Object.keys(sub)) // ["title"]
```

## Object.getOwnPropertyNames() 可枚举、不可枚举

返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

数组中枚举属性的顺序与通过 `for...in` 循环（或 Object.keys）迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。

```javascript
console.log(Object.getOwnPropertyNames(sub)) // ["title", "other"]
```

## Object.getOwnPropertySymbols() Symbol

返回一个给定对象自身的所有 `Symbol` 属性的数组。

```javascript
console.log(Object.getOwnPropertySymbols(sub)) // [Symbol(private)]
```

## Reflect.ownKeys()

返回一个由目标对象自身的属性键组成的数组。

返回值等同于 `Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`。

```javascript
console.log(Reflect.ownKeys(sub)) // ["title", "other", Symbol(private)]
```
