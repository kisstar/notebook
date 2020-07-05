# 24.链表交换相邻节点

给定一个链表，交换每两个相邻的节点并返回其头部。

不能修改列表节点中的值，只能更改节点本身。

```html
Given 1->2->3->4, you should return the list as 2->1->4->3.
```

## 思路

我们首先使用对象上的 `next` 的属性来指向第一个节点，这样相邻的两个节点就可以表示为 `obj.next` 和 `obj.next.next`，依次类推使得主体的代码可以完全复用。

在主题循环中：

1. 检查相邻的第一个节点和第二个节点是否为空。
2. 使用临时变量 a, b 分别来指向这两个节点。
3. 然后分别改变它们的后继节点：前者的后继节点执行后者的后继节点，后者的后继节点指向谴责。
4. 指定前一次交换后的后一个节点的后继节点会当前交换后的前一个节点。
5. 将下一次交换前的前一个节点设置为当前交换后的后一个节点。
6. 循环。

## JavaScript

```javascript
var swapPairs = function(head) {
  var pre = this
  this.next = head
  while (pre.next && pre.next.next) {
    a = pre.next
    b = a.next
    a.next = b.next
    b.next = a
    pre.next = b
    pre = a
  }
  return this.next
}
```

## Python

```python
def swapPairs(self, head: ListNode) -> ListNode:
    pre, pre.next = self, head
    while pre.next and pre.next.next:
        a = pre.next
        b = a.next
        b.next, a.next, pre.next = a, b.next, b
        pre = a
    return self.next
```
