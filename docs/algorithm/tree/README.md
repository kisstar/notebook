# 树

树是一种分层数据的抽象模型。

- 树中的每个元素都叫作节点
- 位于树顶部的节点叫作根节点
- 没有子元素的节点称为外部节点或叶子节点，至少有一个子节点的节点称为内部节点
- 树中的子树由节点及其后代构成
- 节点的深度取决于它的祖先节点的数量
- 树的高度取决于所有节点深度的最大值

## 二叉搜索树

二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。

二叉搜索树（BST）是二叉树的一种。可以为空，如果不为空，需满足以下性质：

- 非空左子树的所有键值小于其根结点的键值
- 非空右子树的所有键值大于其根结点的键值
- 左、右子树本身也都是二叉搜索树

## BST 的操作

- `insert(key)`：向树中插入一个新的键
- `search(key)`：在树中查找一个键，如果结点存在，则返回 `true`；如果不存在，则返回 `false`
- `inOrderTraverse`：通过中序遍历方式遍历所有结点
- `preOrderTraverse`：通过先序遍历方式遍历所有结点
- `postOrderTraverse`：通过后序遍历方式遍历所有结点
- `min`：返回树中最小的值/键
- `max`：返回树中最大的值/键
- `remove(key)`：从树中移除某个键

## BST 的实现

创建它的基础结构：

```javascript
class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null
  }
}
```

`insert` 方法：

- 创建用来表示新节点的 Node 类实例
- 验证插入的是否为第一个节点。如果是，就将根节点指向新节点
- 否则，创建一个新的函数进行递归找到插入新节点的位置

```javascript
class BinarySearchTree {
  insert(key) {
    const node = new Node(key)
    if (null === this._root) {
      this._root = node
    } else {
      this._insertNode(this._root, node)
    }
  }

  _insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (null === node.left) {
        node.left = newNode
      } else {
        this._insertNode(node.left, newNode)
      }
    } else {
      if (null === node.right) {
        node.right = newNode
      } else {
        this._insertNode(node.right, newNode)
      }
    }
  }
}

const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)
```

`inOrderTraverse` 方法：

中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点，所以中序遍历的一种应用就是对树进行排序操作。

```javascript
class BinarySearchTree {
  inOrderTraverse(node = this._root) {
    if (null === node) return
    if (node.left) {
      this.inOrderTraverse(node.left)
    }
    console.log(node.value)
    if (node.right) {
      this.inOrderTraverse(node.right)
    }
  }
}

tree.inOrderTraverse() // 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
```

`preOrderTraverse` 方法：

先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。

```javascript
class BinarySearchTree {
  preOrderTraverse(node = this._root) {
    if (null === node) return
    console.log(node.key)
    if (node.left) {
      this.preOrderTraverse(node.left)
    }
    if (node.right) {
      this.preOrderTraverse(node.right)
    }
  }
}

tree.preOrderTraverse() // 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
```

`postOrderTraverse` 方法：

后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。

```javascript
class BinarySearchTree {
  postOrderTraverse(node = this._root) {
    if (null === node) return
    if (node.left) {
      this.postOrderTraverse(node.left)
    }
    if (node.right) {
      this.postOrderTraverse(node.right)
    }
    console.log(node.key)
  }
}

tree.postOrderTraverse() // 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
```

`min` 方法：

```javascript
class BinarySearchTree {
  min(node = this._root) {
    while (node && node.left) {
      node = node.left
    }
    return node && node.key
  }
}

tree.min() // 3
```

`max` 方法：

```javascript
class BinarySearchTree {
  max(node = this._root) {
    while (node && node.right) {
      node = node.right
    }
    return node && node.key
  }
}

tree.max() // 5
```

`search` 方法：

```javascript
class BinarySearchTree {
  search(key) {
    return this._searchNode(this._root, key)
  }

  _searchNode(node, key) {
    if (node === null) return false
    if (key < node.key) {
      return this._searchNode(node.left, key)
    } else if (key > node.key) {
      return this._searchNode(node.right, key)
    } else {
      return true
    }
  }
}

console.log(tree.search(6)) // true
console.log(tree.search(16)) // false
```

`remove` 方法：

- 如果正在检测的节点是 `null`，那么说明键不存在于树中，所以返回 `null`
- 如果要找的键比当前节点的值小，就沿着树的左边找到下一个节点，返回当前节点
- 如果要找的键比当前节点的值大，那么就沿着树的右边找到下一个节点，返回当前节点
- 如果找到的键是一个叶节点，只需要将该节点赋值为 `null`，并返回 `null` 来将对应的父节点指针赋予 `null` 值
- 如果找到的键是有一个左侧或右侧子节点的节点，此时需要把对它的引用改为对子节点的引用，并返回更新后的节点

最后一种比较复杂的情况是找到的键是有两个子节点的节点，此时：

- 需找到它右边子树中最小的节点
- 然后，用它右侧子树中最小节点的键去更新这个节点的值
- 接着把右侧子树中的最小节点移除，毕竟它已经被移至要移除的节点的位置了
- 最后，向它的父节点返回更新后节点的引用

```javascript
class BinarySearchTree {
  remove(key) {
    this._root = this._removeNode(this._root, key)
  }

  _removeNode(node, key) {
    if (null === node) return node
    if (key < node.key) {
      node.left = this._removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this._removeNode(node.right, key)
      return node
    } else {
      if (null === node.left && null === node.right) {
        node = null
        return node
      } else if (null === node.left) {
        node = node.right
        return node
      } else if (null === node.right) {
        node = node.left
        return node
      } else {
        const min = this.min(node.right) // 找出该节点右侧最小的节点
        node.key = min
        this._removeNode(node.right, min)
        return node
      }
    }
  }
}
```

完整代码：

```javascript
class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null
  }

  insert(key) {
    const node = new Node(key)
    if (null === this._root) {
      this._root = node
    } else {
      this._insertNode(this._root, node)
    }
  }

  _insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (null === node.left) {
        node.left = newNode
      } else {
        this._insertNode(node.left, newNode)
      }
    } else {
      if (null === node.right) {
        node.right = newNode
      } else {
        this._insertNode(node.right, newNode)
      }
    }
  }

  preOrderTraverse(node = this._root) {
    if (null === node) return
    console.log(node.key)
    if (node.left) {
      this.preOrderTraverse(node.left)
    }
    if (node.right) {
      this.preOrderTraverse(node.right)
    }
  }

  inOrderTraverse(node = this._root) {
    if (null === node) return
    if (node.left) {
      this.inOrderTraverse(node.left)
    }
    console.log(node.key)
    if (node.right) {
      this.inOrderTraverse(node.right)
    }
  }

  postOrderTraverse(node = this._root) {
    if (null === node) return
    if (node.left) {
      this.postOrderTraverse(node.left)
    }
    if (node.right) {
      this.postOrderTraverse(node.right)
    }
    console.log(node.key)
  }

  min(node = this._root) {
    while (node && node.left) {
      node = node.left
    }
    return node && node.key
  }

  max(node = this._root) {
    while (node && node.right) {
      node = node.right
    }
    return node && node.key
  }

  search(key) {
    return this._searchNode(this._root, key)
  }

  _searchNode(node, key) {
    if (node === null) return false
    if (key < node.key) {
      return this._searchNode(node.left, key)
    } else if (key > node.key) {
      return this._searchNode(node.right, key)
    } else {
      return true
    }
  }

  remove(key) {
    this._root = this._removeNode(this._root, key)
  }

  _removeNode(node, key) {
    if (null === node) return node
    if (key < node.key) {
      node.left = this._removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this._removeNode(node.right, key)
      return node
    } else {
      if (null === node.left && null === node.right) {
        node = null
        return node
      } else if (null === node.left) {
        node = node.right
        return node
      } else if (null === node.right) {
        node = node.left
        return node
      } else {
        const min = this.min(node.right) // 找出该节点右侧最小的节点
        node.key = min
        this._removeNode(node.right, min)
        return node
      }
    }
  }
}
```
