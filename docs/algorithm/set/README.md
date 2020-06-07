# 集合

集合是由一组无序且唯一的项组成的。

## 集合的操作

- `add(value)`：向集合添加一个新的项
- `delete(value)`：从集合移除一个值
- `has(value)`：如果值在集合中，返回 `true`，否则返回 `false`
- `clear()`：移除集合中的所有项
- `size()`：返回集合所包含元素的数量
- `values()`：返回一个包含集合中所有值的数组

## 集合的实现

```javascript
class _Set {
  constructor() {
    this._obj = Object.create(null);
  }

  has(value) {
    return Reflect.has(this._obj, value);
  }

  add(value) {
    if (this.has(value)) {
      return false;
    }
    this._obj[value] = value;
    return true;
  }

  remove(value) {
    return Reflect.deleteProperty(this._obj, value);
  }

  clear() {
    this._obj = Object.create(null);
  }

  size() {
    return this.values().length;
  }

  values() {
    return Object.keys(this._obj);
  }
}

const set = new _Set();
set.add(1);
console.log(set.values()); // ["1"]
console.log(set.has(1)); // true
console.log(set.size()); // 1
set.add(2);
console.log(set.values()); // ["1", "2"]
console.log(set.has(2)); // true
console.log(set.size()); // 2
set.remove(1);
console.log(set.values()); // ["2"]
set.remove(2);
console.log(set.values()); // []
```

## 集合操作

**并集**：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。

```javascript
class _Set {
  // ...
  union(otherSet) {
    const unionSet = new _Set();
    this.values()
      .concat(otherSet.values())
      .forEach(item => {
        if (!unionSet.has(item)) {
          unionSet.add(item);
        }
      });
    return unionSet;
  }
}

const setA = new _Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new _Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);
const unionAB = setA.union(setB);
console.log(unionAB.values()); // [ '1', '2', '3', '4', '5', '6' ]
```

**交集**：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。

```javascript
class _Set {
  intersection(otherSet) {
    const intersectionSet = new _Set();
    this.values().forEach(item => {
      if (otherSet.has(item)) {
        intersectionSet.add(item);
      }
    });
    return intersectionSet;
  }
}

const setA = new _Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new _Set();
setB.add(2);
setB.add(3);
setB.add(4);
const intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values()); // [ '2', '3' ]
```

**差集**：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。

```javascript
class _Set {
  difference(otherSet) {
    const differenceSet = new _Set();
    this.values().forEach(item => {
      if (!otherSet.has(item)) {
        differenceSet.add(item);
      }
    });
    return differenceSet;
  }
}

const setA = new _Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new _Set();
setB.add(2);
setB.add(3);
setB.add(4);
const differenceAB = setA.difference(setB);
console.log(differenceAB.values()); // [ '1' ]
```

**子集**：验证一个给定集合是否是另一集合的子集。

```javascript
class _Set {
  subset(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }

    return this.values().every(itme => {
      if (!otherSet.has(itme)) {
        return false;
      }
      return true;
    });
  }
}

const setA = new _Set();
setA.add(1);
setA.add(2);
const setB = new _Set();
setB.add(1);
setB.add(2);
setB.add(3);
const setC = new _Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.subset(setB)); // true
console.log(setA.subset(setC)); // false
```
