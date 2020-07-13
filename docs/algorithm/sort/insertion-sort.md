# 插入排序

插入排序的原理比较简单，也是一种最简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，插入相应位置。

## 算法步骤

1. 将待排序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
2. 依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

## JavaScript

```javascript
function swap(index1, index2, arr) {
  var temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

function insertionSort(arr) {
  var i = 1,
    length = arr.length

  for (; i < length; i++) {
    j = i
    while (j > 0) {
      if (arr[j] < arr[j - 1]) {
        swap(j, j - 1, arr)
      } else {
        break
      }
      j--
    }
  }
  return arr
}
```

## Python

```python
def insertion_sort(arr):
    length = len(arr)
    for i in range(1, length):
        j = i
        while j > 0:
            if arr[j] < arr[j-1]:
                arr[j], arr[j-1] = arr[j-1], arr[j]
            else:
                break
            j -= 1
    return arr
```

## 总结

- 插入排序和冒泡排序一样，也有一种优化算法，叫做拆半插入排序。
