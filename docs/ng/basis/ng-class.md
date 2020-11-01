# ngClass 指令

`ng-class` 指令用于给 `HTML` 元素动态绑定一个或多个 `CSS` 类，指令的值可以是字符串，对象，或一个数组：

- 如果是字符串，多个类名使用空格分隔。
- 如果是对象，需要使用 key-value 对，key 是一个布尔值，value 为你想要添加的类名。只有在 key 为 true 时类才会被添加。
- 如果是数组，可以由字符串或对象组合组成，数组的元素可以是字符串或对象。

```html
<select ng-model="home">
  <option value="sky">Sky</option>
  <option value="tomato">Tomato</option>
</select>

<div ng-class="home">
  <h1>Welcome Home!</h1>
  <p>I like it!</p>
</div>
```

## 常见用法

```html
<!-- 源 -->
<div ng-class="'class1 class2'"></div>
<!-- 编译结果 -->
<div ng-class="'class1 class2'" class="class1 class2"></div>
```

```html
<!-- 源代码 -->
<div ng-class="'class1 class2'"></div>
<!-- 编译结果 -->
<div ng-class="[class1, class2]" class="class1 class2"></div>
```

```html
<!-- 源代码 -->
<div ng-class="{'class1 class2': true, 'class3': false}"></div>
<!-- 编译结果 -->
<div ng-class="{'class1 class2': true, 'class3': false}" class="class1 class2"></div>
```

```html
<!-- 源代码 -->
<div ng-class="{true: 'class1 class2', false: 'class3'}[true]"></div>
<!-- 编译结果 -->
<div ng-class="{true: 'class1 class2', false: 'class3'}[true]" class="class1 class2"></div>
```

## 使用变量

对于上述的常见用法，一些值可以用变量来代替。比如后两者的用法并可以如此：

```html
<!-- 源代码 -->
<!-- JavaScript -->
<script>
  // ...
  $scope.booleanValue = true
  // ...
</script>
<!-- HTML -->
<!-- 注意这里的类名不能使用变量 -->
<div ng-class="{'class1 class2': booleanValue, classStr: !booleanValue}"></div>

<!-- 编译结果 -->
<div
  ng-class="{'class1 class2': booleanValue, 'class3': !booleanValue}"
  class="class1 class2"
></div>
```

```html
<!-- 源代码 -->
<!-- JavaScript -->
<script>
  // ...
  $scope.booleanValue = true
  $scope.classArr = ['class1', 'class2']
  $scope.classStr = 'class3'
  // ...
</script>
<!-- HTML -->
<!-- 注意这里的 true或false 不能使用变量 -->
<div ng-class="{true: classArr, false: classStr}[booleanValue]"></div>

<!-- 编译结果 -->
<div ng-class="{true: classArr, false: classStr}[booleanValue]" class="class1 class2"></div>
```

## 参考资料

- [AngularJS API Docs](https://code.angularjs.org/1.3.15/docs/api)
- [AngularJS ng 模块的 directive 组件](http://www.angularjs.net.cn/api/ng/directive/)
- [AngularJS 参考手册](http://www.runoob.com/angularjs/angularjs-reference.html)
