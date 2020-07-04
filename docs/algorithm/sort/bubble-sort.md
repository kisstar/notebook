# 冒泡排序

冒泡排序是一种比较简单和直观的排序算法，它重复的遍历需要排序的数列，每次比较两个元素，如果他们的顺序错误就把他们交换过来。

遍历数列的工作按此重复执行，直到没有可交换的，此时整个数列的排序工作也已经完成。整个排序过程中的越小的数经由此种交换，就好像慢慢的 “浮动” 到了数列的顶端。

## 算法步骤

1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
3. 对除了最后一个元素外的所有元素重复以上的步骤，。

## JavaScript

```javascript
function bubbleSort(arr) {
  function swap(a, b, arr) {
    const temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
  }
  const count = list.length - 1
  for (let i = 0; i < count; i++) {
    for (let j = 0; j <= count - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(j, j + 1, arr)
      }
    }
  }
  return arr
}
```

## Python

```python
def bubble_sort(arr):
    count = len(arr) - 1  # 最后一个元素不需要遍历排序
    for i in range(count):
        for j in range(count - i):  # i 表示已排序的个数
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
```

## 总结

* 当输入的数据已经是正序时排序最快。
* 当输入的数据是反序时排序最慢。
* 优化：使用一个 `flag`，当在一次遍历中元素没有发生交换，则证明该序列已经有序。
