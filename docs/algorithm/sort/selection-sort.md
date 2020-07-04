# 选择排序

选择排序是一种简单直观的排序算法，它首先在排序序列中找到最小（大）的元素，存放到起始位置；然后，再从剩下的队列中继续查找最小（大）的元素，然后放在已排序队列的末尾。依次类推，直到所有的元素排序完毕。

在选择排序中，如果某个元素已经位于正确的位置上，那么它不会被移动。而且每次执行交换时，参与交换的两个元素中至少有一个被移动到最终位置上，因此对 `n` 个元素进行排序时总共需要进行 `n-1` 次交换。

## 算法步骤

1. 在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
2. 从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
3. 重复第二步，直到所有元素均排序完毕。

## JavaScript

```javascript
function bubbleSort(arr) {
  function swap(a, b, arr) {
    const temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
  }
  const count = list.length - 1
  let min_index
  for (let i = 0; i < count; i++) {
    min_index = i
    for (let j = i + 1; j <= count; j++) {
      if (arr[min_index] > arr[j]) {
        min_index = j
      }
    }
    swap(min_index, i, arr)
  }
  return arr
}
```

## Python

```python
def bubble_sort(arr):
    count = len(arr)
    for i in range(count - 1):
        min_index = i
        for j in range(i + 1, count):
            if arr[min_index] > arr[j]:
                min_index = j
        arr[min_index], arr[i] = arr[i], arr[min_index]
    return arr
```

## 总结

* 无论什么数据进去都是 `O(n²)` 的时间复杂度。
* 它是稳定的。
