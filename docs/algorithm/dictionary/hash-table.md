# 散列表

散列表（HashTable）是字典类的一种散列表实现方式，散列算法的作用是尽可能快地在数据结构中找到一个值。

## 散列函数

通常，如果要在数据结构中获得一个值，需要遍历整个数据结构来找到它。

如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后返回值在表中的地址。

最常见的散列函数——“lose lose”散列函数，方法是简单地将每个键值中的每个字母的 ASCII 值相加。

为了得到比较小的数值，将使用得到的 Hash 值和一个任意数（这里取 37）相除取余。

```javascript
function loseloseHashCode(str) {
  return [...str].reduce((total, cur, index) => total + str.codePointAt(index), 0) % 37
}
```

## 散列表的操作

- `put(key,value)`：向散列表增加一个新的项（也能更新散列表）
- `remove(key)`：根据键值从散列表中移除值
- `get(key)`：返回根据键值检索到的特定的值

## 散列表的实现

```javascript
function HashTable() {
  this._table = []
}

HashTable.prototype.put = function(key, value) {
  this._table[loseloseHashCode(key)] = value
}

HashTable.prototype.get = function(key) {
  return this._table[loseloseHashCode(key)]
}
```

删除时注意不要将位置本身从数组中移除（这会改变其他元素的位置），否则，当下次需要获得或移除一个元素的时候，这个元素会不在我们用散列函数求出的位置上。

```javascript
HashTable.prototype.remove = function(key) {
  this._table[loseloseHashCode(key)] = undefined
}
```

现在有一个明显的问题：我们根据函数求得的值前后很可能会重复，所以容易对原本位置上的值进行覆盖，如果不加处理将会导致整个表遭到破坏而无法使用。

处理这种冲突的方法包括：分离链接、线性探查和双散列法。接下来我们采用线性探查的方法来解决冲突。

## 分离链接

分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的最简单的方法，但是它在 `HashTable` 实例之外还需要额外的存储空间。

为了实现一个使用了分离链接的 `HashTable` 实例，我们需要一个新的辅助类来表示将要加入 [LinkedList](../linked-list) 实例的元素。

```javascript
function ValueFactory(key, value) {
  this.key = key
  this.value = value
  this.toString = function() {
    return '[' + this.key + ' - ' + this.value + ']'
  }
}
```

同时，重写 `put`、`get` 和 `remove` 方法：

```javascript
HashTable.prototype.put = function(key, value) {
  const position = loseloseHashCode(key)
  if (undefined == table[position]) {
    table[position] = new LinkedList()
  }
  table[position].append(new ValueFactory(key, value))
}

HashTable.prototype.get = function(key) {
  const position = loseloseHashCode(key)
  if (undefined !== table[position]) {
    // 遍历链表来寻找键/值
    let current = table[position].getHead()
    while (current.next) {
      if (current.element.key === key) {
        return current.element.value
      }
      current = current.next
    }
    // 检查元素在链表第一个或最后一个节点的情况
    if (current.element.key === key) {
      return current.element.value
    }
  }
  return undefined
}

HashTable.prototype.remove = function(key) {
  const position = loseloseHashCode(key)
  if (undefined !== table[position]) {
    let current = table[position].getHead()
    while (current.next) {
      if (current.element.key === key) {
        table[position].remove(current.element)
        if (table[position].isEmpty()) {
          table[position] = undefined
        }
        return true
      }
      current = current.next
    }
    // 检查是否为第一个或最后一个元素
    if (current.element.key === key) {
      table[position].remove(current.element)
      if (table[position].isEmpty()) {
        table[position] = undefined
      }
      return true
    }
  }
  return false
}
```

## 线性探查

另一种解决冲突的方法是线性探查。

当想向表中某个位置加入一个新元素的时候，如果索引为 `index` 的位置已经被占据了，就尝试 `index+1` 的位置。如果 `index+1` 的位置也被占据了，就尝试 `index+2` 的位置，以此类推。

同样，在使用辅助类 ValueFactory 的基础下，重写 `put`、`get` 和 `remove` 方法：

```javascript
HashTable.prototype.put = function(key, value) {
  let pos = loseloseHashCode(key)
  while (this._table[pos]) {
    pos++
  }
  this._table[pos] = new ValueFactory(key, value)
}

HashTable.prototype.get = function(key) {
  let cur = null
  let pos = loseloseHashCode(key)
  const len = this._table.length
  while (pos < len) {
    cur = this._table[pos]
    if (cur && cur.key === key) {
      return this._table[pos]
    }
    pos++
  }
}

HashTable.prototype.remove = function(key) {
  let cur = null
  let pos = loseloseHashCode(key)
  const len = this._table.length
  while (pos < len) {
    cur = this._table[pos]
    if (cur && cur.key === key) {
      this._table[pos] = undefined
    }
    pos++
  }
}
```

## 总结

可见，解决冲突会带来一些复杂的工作，当数据量过大时对性能的损耗也不小，所以最好使用更加优秀的散列函数以避免冲突。下面时社区推崇的一种散列函数。

```javascript
var djb2HashCode = function(key) {
  var hash = 5381 // 初始化一个 hash 变量并赋值为一个质数
  for (var i = 0; i < key.length; i++) {
    // 迭代参数 key
    // 将 hash 与 33 相乘（用来当作一个魔力数），并和当前迭代到的字符的 ASCII 码值相加
    hash = hash * 33 + key.charCodeAt(i)
  }
  return hash % 1013 // 将相加的和与另一个随机质数（比我们认为的散列表的大小要大）相除的取余
}
```

和散列表相类似的还有散列集合的实现。

散列集合由一个集合构成，但是插入、 移除或获取元素时，使用的是散列函数。不同之处在于，不再添加键值对，而是只插入值而没有键。

分离链接方式的完整代码：

```javascript
function ValueFactory(key, value) {
  this.key = key
  this.value = value
  this.toString = function() {
    return '[' + this.key + ' - ' + this.value + ']'
  }
}

function HashTable() {
  this._table = []
}

HashTable.prototype.put = function(key, value) {
  const position = loseloseHashCode(key)
  if (undefined == table[position]) {
    table[position] = new LinkedList()
  }
  table[position].append(new ValueFactory(key, value))
}

HashTable.prototype.get = function(key) {
  const position = loseloseHashCode(key)
  if (undefined !== table[position]) {
    // 遍历链表来寻找键/值
    let current = table[position].getHead()
    while (current.next) {
      if (current.element.key === key) {
        return current.element.value
      }
      current = current.next
    }
    // 检查元素在链表第一个或最后一个节点的情况
    if (current.element.key === key) {
      return current.element.value
    }
  }
  return undefined
}

HashTable.prototype.remove = function(key) {
  const position = loseloseHashCode(key)
  if (undefined !== table[position]) {
    let current = table[position].getHead()
    while (current.next) {
      if (current.element.key === key) {
        table[position].remove(current.element)
        if (table[position].isEmpty()) {
          table[position] = undefined
        }
        return true
      }
      current = current.next
    }
    // 检查是否为第一个或最后一个元素
    if (current.element.key === key) {
      table[position].remove(current.element)
      if (table[position].isEmpty()) {
        table[position] = undefined
      }
      return true
    }
  }
  return false
}
```
