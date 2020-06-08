# 字典

字典是跟集合很相似的一种数据结构，都可以用来存储无序不重复的数据。不同的地方是集合以 `[值，值]` 的形式存储，而字典则是以 `[键，值]` 的形式存储。

字典也被称作映射（Map）。

## 字典的操作

— `set(key, value)`：向字典中添加新元素 — `delete(key)`：通过使用键值来从字典中移除键值对应的数据值 — `has(key)`：如果某个键值存在于这个字典中，则返回 `true`，反之则返回 `false` — `get(key)`：通过键值查找特定的数值并返回 — `clear()`：将这个字典中的所有元素全部删除 — `size()`：返回字典所包含元素的数量 — `keys()`：将字典所包含的所有键名以数组形式返回 — `values()`：将字典所包含的所有数值以数组形式返回

## 字典的实现

```javascript
class Dictionary {
  constructor() {
    this._obj = Object.create(null);
  }

  has(key) {
    return Reflect.has(this._obj, key);
  }

  set(key, value) {
    this._obj[key] = value;
  }

  delete(key) {
    if (this.has(key)) {
      return Reflect.deleteProperty(this._obj, key);
    }
    return false;
  }

  get(key) {
    return this._obj[key];
  }

  values() {
    return Object.values(this._obj);
  }

  clear() {
    this._obj = Object.create(null);
  }

  size() {
    return this.values().length;
  }

  keys() {
    return Object.keys(this._obj);
  }

  getItems() {
    return this._obj;
  }
}

var dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');
console.log(dictionary.has('Gandalf')); // true
console.log(dictionary.size()); // 3
console.log(dictionary.keys()); // ["Gandalf", "John", "Tyrion"]
console.log(dictionary.values()); // ["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
console.log(dictionary.get('Tyrion')); // tyrion@email.com
dictionary.delete('John');
console.log(dictionary.keys()); // ["Gandalf", "Tyrion"]
console.log(dictionary.values()); // ["gandalf@email.com", "tyrion@email.com"]
console.log(dictionary.getItems()); // Object {Gandalf: "gandalf@email.com", Tyrion: "tyrion@email.com"}
```
