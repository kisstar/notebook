# 基础语法

AngularJS 是一个 JavaScript 框架。

## 安装

AngularJS 是以一个 JavaScript 文件形式发布的，可通过 `script` 标签添加到网页中：

```html
<script src="https://cdn.staticfile.org/angular.js/1.4.6/angular.min.js"></script>
```

你可以在这里下载更多您需要的版本的 [AngularJS](https://github.com/angular/angular.js/releases)。

## 表达式

AngularJS 表达式写在双大括号内，它把数据绑定到 HTML，这与 `ng-bind` 指令有异曲同工之妙。

表达式很像 JavaScript 表达式：它们可以包含文字、运算符和变量。

与 JavaScript 表达式不同的是 AngularJS 表达式可以写在 HTML 中，支持过滤器但不支持循环和异常。

## 指令

AngularJS 通过被称为指令的新属性来扩展 HTML，并内置了一些指令来为应用添加功能，当然您也可以自定义指令。

常见的指令包括：

- **ng-app** 指令初始化一个 AngularJS 应用程序，告诉 AngularJS `div` 元素是 AngularJS 应用程序的"所有者"。
- **ng-init** 指令初始化应用程序数据。
- **ng-model** 指令把元素值（比如输入域的值）绑定到应用程序。
- **ng-repeat** 指令对于集合中（数组中）的每个项会克隆一次 HTML 元素。

### 创建自定义的指令

您可以使用 `.directive` 函数来添加自定义的指令，使用驼峰法来命名一个指令，`helloWorld`, 但在使用它时需要以 - 分割：

```html
<body ng-app="app">
  <hello-world></hello-world>

  <script>
    var app = angular.module('app', [])
    app.directive('helloWorld', function() {
      return {
        template: '<h1>Hello world!</h1>',
      }
    })
  </script>
</body>
```

## 控制器

**ng-controller** 指令定义了应用程序控制器，控制器本质就是一个对象，由标准的 JavaScript 对象的构造函数创建。

::: tip 在普通的 HTML 属性中使用变量时需要加上双重花括号，而在 AngularJS 指令中使用变量时直接写变量即可。 :::
