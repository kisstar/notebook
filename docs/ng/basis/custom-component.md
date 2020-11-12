# 自定义指令

对于指令，可以把它简单的理解成在特定 DOM 元素上运行的函数，指令可以扩展这个元素的功能。

也正是指令使得 AngularJS 这个框架变得强大，除了框架本身提供的内置指令之外，我们可以自己创造新的指令。

## 指令基础

AngularJS 应用的模块中有很多方法可以使用，其中 `directive()` 这个方法是用来定义指令的。

这个方法接受两个参数：

- 第一个是字符串，用来指定指令的名字。
- 第二个参数是一个函数，这个函数返回一个对象，其中定义了指令的全部行为。`$compile` 服务利用这个方法返回的对象，在 DOM 调用指令时来构造指令的行为。

我们也可以返回一个函数代替对象来定义指令，但是通过对象来定义是最佳的方式。

指令的工厂函数只会在编译器第一次匹配到这个指令时调用一次。和 `controller` 函数类似， 我们通过 `$injetor.invoke` 来调用指令的工厂函数。

现在，来看看定义一个指令时可以使用的全部设置选项：

```javascript
angular.module('App', [])
    .directive('myDirective', function () {
        return {
            restrict: String,
            priority: Number,
            terminal: Boolean,
            template:: String or Template Function: function(tElement, tAttrs) (...},
            templateUrl: String,
            replace: Boolean or String,
            scope: Boolean or Object,
            transclude: Boolean,
            controller: String or  function(scope, element, attrs, transclude, otherInjectables) { ... },
            controllerAs: String,
            require: String,
            link: function(scope, iElement, iAttrs) { ... },
            compile: // 返回一个对象或连接函数，如下所示：
            function(tElement, tAttrs, transclude) {
                return { pre: function(scope, iElement, iAttrs, controller) { ... }, post: function(scope, iElement, iAttrs, controller) { ... } }
                // 或者
                return function postLink(...) { ... }
            }
        }
    });
```

### restrict（字符串）

`restrict` 是一个可选的参数。它告诉 AngularJS 这个指令在 DOM 中可以何种形式被声明。默认 AngularJS 认为 `restrict` 的值是 A，即以属性的形式来进行声明。

```html
<!-- 可选值包括 -->
<!-- E（元素） -->
<my-directive></my-directive>
<!-- A（属性，默认值） -->
<div my-directive="expression"></div>
<!-- C（类名） -->
<div class="my-directive:expression;"></div>
<!-- M（注释） -->
<!-- directive:my-directive expression -->
```

这些选项可以单独使用，也可以混合在一起使用，即一个组件可以用多种使用方法，比如设置 `restrict: 'EA'` 则组件支持元素和属性两种用法。

属性是用来声明指令最常用的方式，因为它能在包括老版本的 IE 浏览器在内的所有浏览器中正常工作，并且不需要在文档头部注册新的标签。

推荐，如果一个组件是对既有对象的修饰和扩展那么就是用属性，若组件是一个功能独立的实现，那么就是用元素。另外，应该尽量避免用注释方式来声明属性。

### priority（数值型）

优先级参数是可选的，可以被设置为一个数值。

大多数指令会忽略这个参数，使用默认值 0，但也有些场景设置高优先级是非常重要甚至是必须的。例如，`ngRepeat` 将这个参数设置为 1000，这样就可以保证在同一元素上，它总是在其他指令之前被调用。

如果一个元素上具有两个优先级相同的指令，声明在前面的那个会被优先调用。如果其中一个的优先级更高，则不管声明的顺序如何都会被优先调用：具有更高优先级的指令总是优先运行。

::: tip

`ngRepeat` 是所有内置指令中优先级最高的，它总是在其他指令之前运行。

:::

### terminal（布尔型）

这个参数是可选的，用来告诉 AngularJS 停止运行当前元素上比本指令优先级低的指令。但同当前指令优先级相同的指令还是会被执行。

如果元素上某个指令设置了 `terminal` 参数并具有较高的优先级，就不要再用其他低优先级的指令对其进行修饰了，因为不会被调用。但是具有相同优先级的指令还是会被继续调用。

使用了 `terminal` 参数的例子是 `ngView` 和 `ngIf`。`ngIf` 的优先级略高于 `ngView`，如果 `ngIf` 的表达式值为 `true`，`ngView` 就可以被正常执行，但如果 `ngIf` 表达式的值为 `false`，由于 `ngView` 的优先级较低就不会被执行。

一句话，如果该参数为 `true`，该元素上优先级低于该指令的指令无效。

### template（字符串或函数）

`template` 参数是可选的，如果存在则必须被设置为以下两种形式之一：

- 一段 HTML 文本。
- 一个可以接受两个参数的函数，参数为 `tElement` 和 `tAttrs`，并返回一个代表模板的字符串。`tElement` 和 `tAttrs` 中的 `t` 代表 `template`，是相对于 `instance` 的。

AngularJS 会同处理 HTML 一样处理模板字符串。所以我们可以就像是使用普通的 HTML 一样，比如模板中可以通过大括号标记来访问作用域，例如 `{{ expression }}`。

需要注意的是，如果模板字符串中含有多个 DOM 元素，或者只由一个单独的文本节点构成，那它必须被包含在一个父元素内。换句话说，必须存在一个根 DOM 元素。

另外，对于换行的模版字符串需要在每一行末尾的添加反斜线，这样 AngularJS 才能正确解析多行字符串。

```javascript
template: '\
    <div>\
        <p>Hello world!</P>\
        <p>I like AngularJS!</P>\
    </div>\'
```

### templateUrl（字符串或函数）

`templateUrl` 是可选的参数，可以是以下类型：

- 一个代表外部 HTML 文件路径的字符串。
- 一个可以接受两个参数的函数，参数为 `tElement` 和 `tAttrs`，并返回一个外部 HTML 文件路径的字符串。

无论哪种方式，模板的 URL 都将通过 AngularJS 内置的安全层，特别是 `$getTrusted ResourceUrl`，这样可以保护模板不会被不信任的源加载。

默认情况下，调用指令时会在后台通过 `Ajax` 来请求 HTML 模板文件。所以需要清楚的是，模板加载是异步的，意味着编译和链接要暂停，等待模板加载完成。为了避免延迟，可以在部署应用之前对 HTML 模板进行缓存。模板加载后，AngularJS 会将它默认缓存到 `$templateCache` 服务中。

### replace（布尔型）

`replace` 是一个可选参数，如果设置了这个参数，值必须为 `true`，因为默认值为 `false`。

默认值意味着模板会被当作子元素插入到调用此指令的元素内部。

### 指令作用域

`$rootScope` 这个特殊的对象会在 DOM 中声明 `ng-app` 时被创建。之后，DOM 中每个指令调用时都可能会：

- 直接调用相同的作用域对象；
- 从当前作用域对象继承一个新的作用域对象；
- 创建一个同当前作用域相隔离的作用域对象。

指令嵌套并不一定意味着需要改变它的作用域。默认情况下，子指令会被付予访问父 DOM 元素对应的作用域的能力，这样做的原因可以通过介绍指令的 `scope` 参数来理解。

#### scope（布尔型或对象）

`scope` 参数是可选的，可以被设置为 `true` 或一个对象，默认是 `false`。

如果将 `scope` 的属性值设置为 `false`，那么创建的指令继承了父作用域的一切属性和方法，这也使得在指令的模板中我们可以使用这些属性和方法。

当把 `scope` 属性值设置为 `true` 时，这表明我们创建的指令要创建一个新的作用域，这个作用域继承自我们的父作用域。同样说是继承，那么两者之间有什么区别呢？个人的理解就是当把 `scope` 属性值设置为 `true` 时，相当于深拷贝，相反则类似浅拷贝。

#### 绑定策略

如果我们将 `scope` 属性值设置为一个空对象 `{}` 时，就创建了隔离作用域，这样，指令的模板就无法访问外部作用域了。

具有隔离作用域的指令最主要的使用场景是创建可复用的组件，组件可以在未知上下文中使用，并且可以避免污染所处的外部作用域或不经意地污染内部作用域。

使用无数据的隔离作用域并不常见。AngularJS 提供了几种方法能够将指令内部的隔离作用域，同指令外部的作用域进行数据绑定。

```javascript
scope: {
    innerVar0: '@', // '@attr'  单项绑定
    innerVar1: '=', // '=attr'  双向绑定   使用组件时，如果不传值，在组件中对该值进行操作时报错，而且不能给配置对应的属性赋值时使用 {% raw %}{{}}{% endraw %}
    innerVar2: '&'  // '&attr'  绑定函数
    innerVar3: '=?', // '=attr'  双向绑定  使用组件时，如果不传值，在组件中对该值进行操作时不会报错
}
```

### transclude（布尔型）

`transclude` 是一个可选的参数。如果设置了，其值必须为 `true`，它的默认值是 `false`。

嵌入通常用来创建可复用的组件，我们可以将整个模板，包括其中的指令通过嵌入全部传入一个指令中。这样做可以将任意内容和作用域传递给指令。指令的内部可以访问外部指令的作用域，并且模板也可以访问外部的作用域对象。

为了将作用域传递进去，`scope` 参数的值必须通过{}或 true 设置成隔离作用域。如果没有设置 `scope` 参数，那么指令内部的作用域将被设置为传入模板的作用域。

如果指令使用了 `transclude` 参数，那么在控制器中就无法正常监听数据模型的变化了。这就是最佳实践总是建议在链接函数里使用 `$watch` 服务的原因。

### controller（字符串或函数）

`controller` 参数是可选的，可以是一个字符串或一个函数。当设置为字符串时，会以字符串的值为名字，来查找注册在应用中的控制器的构造函数。

```javascript
// 在指令内部使用字符串时
controller: 'SomeController';
// 需要同时通过 controller() 创建同名的构造函数，可以在是同一个文件或被 index.html 包含的另一个文件
angular.module('myApp').controller('SomeController', function ($scope, $element, $attrs, $transclude) {
    // 控制器逻辑放在这里
});

// 或在指令内部通过匿名构造函数的方式来定义一个内联的控制器
controller: function ($scope, $element, $attrs, $transclude /* 需要的其它服务 */) {
    // 控制器逻辑放在这里
};
```

其中的 `$transclude` 参数数是实际被执行用来克隆元素和操作 DOM 的函数。在控制器内部操作 DOM 是和 AngularJS 风格相悖的做法，但通过链接函数就可以实现这个需求。仅在 `compile` 参数中使用 `transcludeFn` 是推荐的做法。

`link` 函数可以将指令互相隔离开来，而 `controller` 则定义可复用的行为。由于指令可以 `require` 其他指令所使用的控制器，因此控制器常被用来放置在多个指令间共享的动作。

所以我们希望将当前指令的 API 暴露给其他指令使用，可以使用 `controller` 参数，否则可以使用 `link` 来构造当前指令元素的功能性。如果我们使用了 `scope.$watch()` 或者想要与 DOM 元素做实时的交互，使用链接会是更好的选择。

### controllerAs（字符串）

`controllerAs` 参数是可选的，用来设置控制器的别名，可以以此为名来发布控制器，并且作用域可以访问 `controllerAs`。这样就可以在视图中引用控制器，甚至无需注入 `$scope`。

这个参数看起来好像没什么大用，但它给了我们可以在路由和指令中创建匿名控制器的能力。这种能力可以将动态的对象创建成为控制器，并且这个对象是隔离的、易于测试的。

```javascript
angular.module('myApp').directive('myDirective', function() {
  return {
    restrict: 'A',
    template: '<h4>{{ myController.msg }}</h4>',
    controllerAs: 'myController',
    controller: function() {
      this.msg = 'Hello World'
    },
  }
})
```

其实控制器的别名就可以认为是控制器的实例，所以在 HTML 模版中可以使用别名来代替 \$scope，让数据的来源更加清晰。

`controller as` 有哪些应用方式？

- 在 `view` 视图中通过 `ng-controller` 定义；
- 在路由配置中通过 `controllerAs` 定义；
- 在指令中通过 `controllerAs` 定义。

**`angular` 只是以其 `as` 指定的别名在 `$scope` 上创建了一个新的对象属性，属性的值就是 `controller` 这个函数的实例。**

### require（字符串或数组）

`require` 参数可以被设置为字符串或数组（字符串或数组元素的值是会在当前指令的作用域中使用的指令名称。），字符串代表另外一个指令的名字。`require` 会将控制器注入到其值所指定的指令中，并作为当前指令的链接函数的第四个参数。

在任何情况下，AngularJS 编译器在查找子控制器时都会参考当前指令的模板。`require` 参数的值可以用下面的前缀进行修饰，这会改变查找控制器时的行为：

- **?** ：如果在当前指令中没有找到所需要的控制器，会将 `null` 作为传给 `link` 函数的第四个参数。
- **^** ：指令会在上游的指令链中查找 `require` 参数所指定的控制器。
- **?^** ：将前面两个选项的行为组合起来，我们可选择地加载需要的指令并在父指令链中进行查找。
- **没有前缀** ：如果没有前缀，指令将会在自身所提供的控制器中进行查找，如果没有找到任何控制器（或具有指定名字的指令）就抛出一个错误。

## AngularJS 的生命周期

在 AngularJS 应用起动前，它们以 HTML 文本的形式保存在文本编辑器中。应用启动后会进行编译和链接，作用域会同 HTML 进行绑定，应用可以对用户在 HTML 中进行的操作进行实时响应。这个神奇的效果是如何发生的？创建高效率的应用需要了解什么？

### 编译阶段

在编译阶段，AngularJS 会遍历整个 HTML 文档并根据 `JavaScript` 中的指令定义来处理页面上声明的指令。

每一个指令的模板中都可能含有另外一个指令，另外一个指令也可能会有自己的模板。当 AngularJS 调用 HTML 文档根部的指令时，会遍历其中所有的模板，模板中也可能包含带有模板的指令，若有则继续遍历。

尽管元素可以被多个指令所支持或修饰，这些指令本身的模板中也可以包含其他指令，但只有属于最高优先级指令的模板会被解析并添加到模板树中。

建议将包含模板的指令和添加行为的指令分离开来。如果一个元素已经有一个含有模板的指令了，永远不要对其用另一个指令进行修饰。只有具有最高优先级的指令中的模板会被编译。

对指令和其中的子模板进行遍历或编译，编译后的模板会返回一个叫做模板函数的函数。我们有机会在指令的模板函数被返回前，对编译后的 DOM 树进行修改。

在这个时间点 DOM 树还没有进行数据绑定，意味着如果此时对 DOM 树进行操作只会有很少的性能开销。基于此点，`ng-repeat` 和 `ng-transclude` 等内置指令会在这个时候，也就是还未与任何作用域数据进行绑定时对 DOM 进行操作。

最后，模板函数被传递给编译后的 DOM 树中每个指令定义规则中指定的链接函数。

### compile（对象或函数）

compile 选项可以返回一个对象或函数。

`compile` 选项本身并不会被频繁使用，但是 `link` 函数则会被经常使用。**当我们设置 `link` 选项， 实际上是创建了一个 `postLink()` 链接函数**，以便 `compile()` 函数可以定义链接函数。

```javascript
compile: function(tEle, tAttrs, transcludeFn) {
    var tplEl = angular.element('<div>' + '<h2></h2>' + '</div>');
    var h2 = tplEl.find('h2');
    h2.attr('type', tAttrs.type);
    h2.attr('ng-model', tAttrs.ngModel);
    h2.val("hello");
    tEle.replaceWith(tplEl);
    return function (scope, ele, attrs) {
        // 连接函数
    };
}
```

通常情况下，如果设置了 `compile` 函数，说明我们希望在指令和实时数据被放到 DOM 中之前进行 DOM 操作，在这个函数中进行诸如添加和删除节点等 DOM 操作是安全的。

> [!NOTE|label:Note] > `compile` 和 `link` 选项是互斥的。如果同时设置了这两个选项，那么会把 `compile` 所返回的函数当作链接函数，而 `link` 选项本身则会被忽略。编译函数负责对模板 DOM 进行转换。链接函数负责将作用域和 DOM 进行链接。

### link 函数

链接函数是可选的。如果定义了编译函数，它会返回链接函数，因此当两个函数都定义了时，编译函数会重载链接函数。

当定义了编译函数来取代链接函数时，`postLink` 函数是我们能提供给返回对象的第二个方法。

链接函数的作用。它会在模板编译并同作用域进行链接后被调用，因此它负责设置事件监听器，监视数据变化和实时的操作 DOM。

```javascript
angular.module('myApp', []).directive('myDirective', function() {
  return {
    link: function(scope, ele, attrs) {
      return {
        pre: function(tElement, tAttrs, transclude) {
          // 在子元素被链接之前执行
          // 在这里进行Don转换不安全
          // 之后调用'lihk'h函数将无法定位要链接的元素
        },
        post: function(scope, iElement, iAttrs, controller) {
          // 在子元素被链接之后执行
          // 如果在这里省略掉编译选项
          // 在这里执行DOM转换和链接函数一样安全吗
        },
      }
    },
  }
})
```

指令初始化 -> 外部控制器 -> 内部控制器 -> Compile 函数 -> Link 函数。

## 参考资料

- AngularJS 权威指南
- [一招制敌 - 玩转 AngularJS 指令的 Scope (作用域)](https://segmentfault.com/a/1190000002773689)
- [[angular]指令之 3transclude](https://blog.csdn.net/liyanq528/article/details/53782279)
