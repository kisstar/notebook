# 归并排序

归并排序（Merge sort）是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。

作为一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：

1. 自上而下的递归；
2. 自下而上的迭代。

## 算法步骤

1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；

2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置；

3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；

4. 重复步骤 3 直到某一指针达到序列尾；

5. 将另一序列剩下的所有元素直接复制到合并序列尾。

## JavaScript

```javascript
function mergeSort(arr) {
    const length = arr.length,
        result = []
    let leftLen = 0,
        rightLen = 0,
        leftI = 0,
        rightI = 0
    if (length < 2) {
        // 当元素少于两个时退出递归
        return arr
    }
    const mid = Math.round(length / 2),
        left = mergeSort(arr.slice(0, mid)),
        right = mergeSort(arr.slice(mid))

    leftLen = left.length
    rightLen = right.length
    while (leftI < leftLen && rightI < rightLen) {
        if (left[leftI] < right[rightI]) {
            result.push(left[leftI])
            leftI++
        } else {
            result.push(right[rightI])
            rightI++
        }
    }

    return result.concat(left.slice(leftI), right.slice(rightI))
}
```

## Python

```python
def merge_sort(arr):
    count = len(arr)
    if (count < 2):
        return arr

    mid = count // 2
    left = merge_sort(arr[0:mid])
    right = merge_sort(arr[mid:])

    result = []
    while left and right:
        if left[0] < right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))

    return (result + left + right)
```

## 总结

归并排序的性能不受输入数据的影响，但表现比选择排序好的多，而代价是需要额外的内存空间。
