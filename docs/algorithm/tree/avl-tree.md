# 自平衡树

BST 存在一个问题：取决于你添加的节点数，树的一条边可能会非常深；也就是说，树的一条分支会有很多层，而其他的分支却只有几层。

为了解决这个问题，有一种树叫作自平衡树（Adelson-Velskii-Landi 树，简称：AVL 树）。

AVL 树在添加或移除节点时，会尝试自平衡。任意一个节点（不论深度）的左子树和右子树高度最多相差 1，尽可能尝试转换为完全树。

## AVL 树的操作

在 AVL 树中插入或移除节点和 BST 完全相同。

然而，AVL 树的不同之处在于我们需要检验它的平衡因子，如果有需要，则将其逻辑应用于树的自平衡。

```javascript
function insertNode(node, element) {
  if (node === null) {
    node = new Node(element)
  } else if (element < node.key) {
    node.left = insertNode(node.left, element)
    if (node.left !== null) {
      // 确认是否需要平衡
    }
  } else if (element > node.key) {
    node.right = insertNode(node.right, element)
    if (node.right !== null) {
      // 确认是否需要平衡
    }
  }
  return node
}
```

## 平衡因子

某节点的左子树与右子树的高度(深度)差即为该节点的平衡因子（BF,Balance Factor），平衡二叉树中不存在平衡因子大于 1 的节点。

在一棵平衡二叉树中，节点的平衡因子只能取 0 、1 或者 -1 ，分别对应着左右子树等高，左子树比较高，右子树比较高。

计算节点高度：

```javascript
function heightNode(node) {
  if (null === node) {
    return -1
  } else {
    return Math.max(heightNode(node.left), heightNode(node.right)) + 1
  }
}
```

因此，向左子树插入新节点时，需要计算其高度；如果高度大于 1，就需要平衡左子树。向右子树插入新节点时，也是同样的逻辑。

## AVL 旋转

向 AVL 树插入节点时，最坏的情况会导致所有的祖先节点都失衡。父节点和非祖先节点则不可能失衡。

当节点失衡时，可以执行单旋转或双旋转两种平衡操作，分别对应四种场景：

- 右-右（RR）：向左的单旋转
- 左-左（LL）：向右的单旋转
- 左-右（LR）：向右的双旋转
- 右-左（RL）：向左的双旋转

旋转的目的就是减少高度，通过降低整棵树的高度来平衡。哪边的树高，就把那边的树向上旋转。

对于右旋操作，操作流程为：

1. 节点的左孩子代表此节点
2. 节点的左孩子的右子树变为节点的左子树
3. 将此节点作为左孩子节点的右子树

```javascript
function rotationLL(node) {
  const tmp = node.left
  node.left = tmp.right
  tmp.right = node
  return tmp
}
```

左旋操作流程为：

1. 节点的右孩子替代此节点位置
2. 右孩子的左子树变为该节点的右子树
3. 节点本身变为右孩子的左子树

```javascript
function rotationRR(node) {
  const tmp = node.right
  node.right = tmp.left
  tmp.left = node
  return tmp
}
```

双旋则是在单旋的基础上再做一次旋转。对应的操作为：

```javascript
function rotationLR(node) {
  node.left = rotationRR(node.left)
  return rotationLL(node)
}

function rotationRL(node) {
  node.right = rotationLL(node.right)
  return rotationRR(node)
}
```

## AVL 添加节点

在确认树需要平衡后，就需要对每种情况分别应用正确的旋转。

向左子树插入新节点，且节点的值小于其左子节点时，应进行 LL 旋转。否则，进行 LR 旋转。

向右子树插入新节点，且节点的值大于其右子节点时，应进行 RR 旋转。否则，进行 RL 旋转。

```javascript
function insertNode(node, element) {
  if (null === node) {
    node = new Node(element)
  } else if (element < node.key) {
    node.left = insertNode(node.left, element)
    if (null !== node.left) {
      if (heightNode(node.left) - heightNode(node.right) > 1) {
        if (element < node.left.key) {
          node = rotationLL(node)
        } else {
          node = rotationLR(node)
        }
      }
    }
  } else if (element > node.key) {
    node.right = insertNode(node.right, element)
    if (null !== node.right) {
      if (heightNode(node.right) - heightNode(node.left) > 1) {
        if (element > node.right.key) {
          node = rotationRR(node)
        } else {
          node = rotationRL(node)
        }
      }
    }
  }
  return node
}
```

## AVL 删除节点

AVL 树和二叉查找树的删除操作情况一致，都分为四种情况：

- 删除叶子节点
- 删除的节点只有左子树
- 删除的节点只有右子树
- 删除的节点既有左子树又有右子树

只不过 AVL 树在删除节点后需要重新检查平衡性并修正。

另外，删除操作与插入操作后的平衡修正区别在于，插入操作后只需要对插入栈中的弹出的第一个非平衡节点进行修正，而删除操作需要修正栈中的所有非平衡节点。

删除操作的大致步骤如下：

1. 以前三种情况为基础尝试删除节点，并将访问节点入栈
2. 如果尝试删除成功，则依次检查栈顶节点的平衡状态，遇到非平衡节点，即进行旋转平衡，直到栈空
3. 如果尝试删除失败，证明是第四种情况。这时先找到被删除节点的右子树最小节点并删除它，将访问节点继续入栈
4. 再依次检查栈顶节点的平衡状态和修正直到栈空

对于删除操作造成的非平衡状态的修正，可以这样理解：对左或者右子树的删除操作相当于对右或者左子树的插入操作，然后再对应上插入的四种情况选择相应的旋转

## 参考

- [什么是平衡二叉树（AVL） - 知乎](https://zhuanlan.zhihu.com/p/56066942)
