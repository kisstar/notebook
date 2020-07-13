# 206.反转链表

反转单向链接的列表。

```bash
# Input: 1->2->3->4->5->NULL
# Output: 5->4->3->2->1->NULL
```

## 思路

我们用 `cur` 来存储当前节点，初始时第一个节点反转后的后继节点为空，之后每个节点的后继节点为前一个节点，我们用 `prev` 来存储前一个节点。

中途我们在设置当前节点的后继节点时，需要先用 `temp` 来保存当前节点原先的后继节点。

具体的操作表现为：

1. 判断当前节点是否为空。
2. 存储当前节点原先的后继节点。
3. 设置当前节点的后继节点后，也就是原先的前一个节点。
4. 指定下一个节点的后继节点，也就是当前节点。
5. 指定下一个节点，也就是我们临时存储的当前节点原先的后继节点。
6. 循环。

## JavaScript

```javascript
var reverseList = function(head) {
  var cur = head,
    temp = null,
    prev = null
  while (cur) {
    temp = cur.next
    cur.next = prev
    prev = cur
    cur = temp
  }
  return prev
}
```

## Python

```python
def reverseList(self, head: ListNode) -> ListNode:
    cur, pre = head, None
    while cur:
        cur.next, pre, cur = pre, cur, cur.next
    return pre
```
