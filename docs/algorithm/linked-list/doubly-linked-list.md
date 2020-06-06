# 双向链表

双向链表和单链表的区别在于，后者的一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的：一个链向下一个元素， 另一个链向前一个元素。

```javascript
class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(element) {
    const node = new Node(element);
    let current = this.head;

    if (0 === this.length) {
      this.head = node;
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      node.prev = current;
    }

    this.tail = node;
    this.length++;
  }

  forwardString() {
    this.toString();
  }

  reverseString() {
    let str = '';
    let current = this.tail;

    while (current) {
      str = str ? `${str} -> ${current.element}` : `${current.element}`;
      current = current.prev;
    }

    return str;
  }
}

const ll = new DoublyLinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.print(); // 1 -> 2 -> 3 -> 4
console.log(ll.reverseString()); // 4 -> 3 -> 2 -> 1
```

`insert` 方法：

```javascript
class DoublyLinkedList extends LinkedList {
  insert(position, element) {
    if (0 > position || position > this.length) {
      return;
    }

    const node = new Node(element);
    let index = 0,
      current = this.head;
    if (0 === position) {
      node.next = this.head;
      if (this.head) {
        this.head.prev = node;
      }
      this.head = node;
    } else {
      while (++index < position) {
        current = current.next;
      }
      node.next = current.next;
      if (current.next) {
        current.next.prev = node;
      }
      current.next = node;
      node.prev = current;
    }

    if (this.length === position) {
      this.tail = node;
    }
    this.length++;
  }
}

const ll = new DoublyLinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.insert(0, 0);
ll.insert(4, 4);
ll.print(); // 0 -> 1 -> 2 -> 3 -> 4
console.log(ll.reverseString()); // 4 -> 3 -> 2 -> 1 -> 0
```

`removeAt` 方法：

```javascript
class DoublyLinkedList extends LinkedList {
  removeAt(position) {
    if (this.length === 0) return null;
    if (0 > position || position >= this.length) return null;

    let current = this.head,
      index = 0;
    if (0 === position) {
      if (current.next) {
        current.next.prev = null;
      }
      if (position === this.length - 1) {
        this.tail = current.next;
      }
      this.head = current.next;
    } else {
      while (++index < position) {
        current = current.next;
      }
      if (current.next.next) {
        current.next.next.prev = current;
      }
      if (position === this.length - 1) {
        this.tail = current.next.next;
      }
      current = current.next;
      current.prev.next = current.next;
    }

    this.length--;
    return current.element;
  }
}

const ll = new DoublyLinkedList();
ll.append(0);
ll.append(1);
ll.append(2);
ll.append(3);
console.log('remove: ', ll.removeAt(1));
ll.print();
console.log(ll.reverseString());
// remove:  1
// 0 -> 2 -> 3
// 3 -> 2 -> 0
```

`remove` 方法：

```javascript
class DoublyLinkedList extends LinkedList {
  remove(element) {
    if (0 === this.length) return null;

    let current = this.head,
      previous = null,
      index = 0;
    if (current.element === element) {
      this.head = current.next;
    } else {
      while (index++ < this.length) {
        previous = current;
        current = current.next;
        if (current.element === element) {
          break;
        }
      }
      previous.next = current.next;
    }
    if (current.next) {
      current.next.prev = previous;
    } else {
      this.tail = previous;
    }
    this.length--;
    return current.element;
  }
}

const ll = new DoublyLinkedList();
ll.append(0);
ll.append(1);
ll.append(2);
ll.append(3);
console.log('remove: ', ll.remove(2));
ll.print();
console.log(ll.reverseString());
// remove:  2
// 0 -> 1 -> 3
// 3 -> 1 -> 0
```

其它方法和[单链表](./index.html)一致，通过继承已经具备了。

完整代码：

```javascript
class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(element) {
    const node = new Node(element);
    let current = this.head;

    if (0 === this.length) {
      this.head = node;
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      node.prev = current;
    }

    this.tail = node;
    this.length++;
  }

  forwardString() {
    this.toString();
  }

  reverseString() {
    let str = '';
    let current = this.tail;

    while (current) {
      str = str ? `${str} -> ${current.element}` : `${current.element}`;
      current = current.prev;
    }

    return str;
  }

  insert(position, element) {
    if (0 > position || position > this.length) {
      return;
    }

    const node = new Node(element);
    let index = 0,
      current = this.head;
    if (0 === position) {
      node.next = this.head;
      if (this.head) {
        this.head.prev = node;
      }
      this.head = node;
    } else {
      while (++index < position) {
        current = current.next;
      }
      node.next = current.next;
      if (current.next) {
        current.next.prev = node;
      }
      current.next = node;
      node.prev = current;
    }

    if (this.length === position) {
      this.tail = node;
    }
    this.length++;
  }

  removeAt(position) {
    if (0 === this.length) return null;
    if (0 > position || position >= this.length) return null;

    let current = this.head,
      index = 0;
    if (0 === position) {
      if (current.next) {
        current.next.prev = null;
      }
      if (position === this.length - 1) {
        this.tail = current.next;
      }
      this.head = current.next;
    } else {
      while (++index < position) {
        current = current.next;
      }
      if (current.next.next) {
        current.next.next.prev = current;
      }
      if (position === this.length - 1) {
        this.tail = current.next.next;
      }
      current = current.next;
      current.prev.next = current.next;
    }

    this.length--;
    return current.element;
  }

  remove(element) {
    if (0 === this.length) return null;

    let current = this.head,
      previous = null,
      index = 0;
    if (current.element === element) {
      this.head = current.next;
    } else {
      while (index++ < this.length) {
        previous = current;
        current = current.next;
        if (current.element === element) {
          break;
        }
      }
      previous.next = current.next;
    }
    if (current.next) {
      current.next.prev = previous;
    } else {
      this.tail = previous;
    }
    this.length--;
    return current.element;
  }
}
```
