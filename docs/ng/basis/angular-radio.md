# AngularJS 获取选中 radio 的值

AngularJS 获取 实时获取被选中的 radio 的值。

## 常规的获取方式

原生 `js` 获取 `radio` 选中的值的核心思想就是遍历所有的单选按钮，检测是否被选中，当某个单选按钮选中的时候，将它对应的值传递给我们赋值的参数，然后退出遍历循环。

```html
<label> <input type="radio" name="sex" value="male" checked="checked" />男 </label>
<label> <input type="radio" name="sex" value="female" />女 </label>
<p>
  <button onclick="logValue()">打印</button>
</p>
```

```javascript
// 核心函数
function getCheckedRadioValue(radioName) {
  let radios = document.getElementsByName(radioName)
  if (radios.length) {
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return radios[i].value
      }
    }
  } else {
    return undefined
  }
}
// 测试函数
function logValue() {
  console.log(getCheckedRadioValue('sex'))
}
```

## jQuery 的获取方式

`jQuery` 获取 `radio` 选中的值的方式有多种，比如：

```html
<label> <input type="radio" name="phone" value="huawei" checked="checked" />华> </label>
<label> <input type="radio" name="phone" value="xiaomi" />小> </label>
<p>
  <button onclick="logValue()">打印</button>
</p>
```

```javascript
function logValue() {
  console.log($('input:radio[name="phone"]:checked').val())
  console.log($('input:radio:checked').val())
  console.log($("input[type='radio']:checked").val())
  console.log($("input[name='phone']:checked").val())
}
```

另外，其中的 `.val()` 也可以换作 `.attr('value')`。

## Angular 的获取方式

第一种使用方式：使用 `ng-model` 把 `radio` 绑到一个变量上，`ng-value` 使用表达式来表示值。选中时它的值就是 `ng-value` 的值了。

```pug
// pug 文件
div(ng-app="app", ng-controller="AppCtrl")
    input(type="radio", name="fruit", value="apple", ng-model="testValue")/ apple
    input(type="radio", name="fruit", value="banana", ng-model="testValue")/ banana
    input(type="text", name="result1", ng-model="testValue")/
```

```javascript
var App = angular.module('app', [])
App.controller('AppCtrl', [
  '$scope',
  function($scope) {
    $scope.testValue = 'banana'
  },
])
```

在单选框中 `ng-model` 绑定输出的是 `value` 属性的值。

第二种使用方式：

```pug
// pug 文件
div(ng-app="app", ng-controller="AppCtrl")
    form(name="testForm")
        label(ng-repeat="fruit in fruits", for="{{fruit}}") {{fruit}}
            input(type="radio", name="fruit", ng-value="fruit", ng-model="test.testValue2", id="{{fruit}}")/
            input(type="text", name="result2", ng-model="test.testValue2")/
```

```javascript
var App = angular.module('app', [])
App.controller('AppCtrl', [
  '$scope',
  function($scope) {
    // 为何此处只能为对象？
    $scope.test = {
      testValue2: 'banana',
    }
    $scope.fruits = ['apple', 'banana']
  },
])
```

第三种使用方式：在第二种方式的基础上，我们可以在 `.pug` 中通过 `testForm.fruit.$modelValue` 或 `testForm.fruit.$viewValue` 来获取选中的值。

其中 `testForm` 为 `form` 元素的 `name` 属性的值，`fruit` 为 `input` 元素 `name` 属性的值。
