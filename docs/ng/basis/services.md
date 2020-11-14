# 服务

服务提供了一种能在应用的整个生命周期内保持数据的方法，它能够在控制器之间进行通信，并且能保证数据的一致性。

服务是一个单例对象，在每个应用中只会被实例化一次（被 \$injector 实例化），并且是延迟加载的（需要时才会被创建）。服务提供了把与特定功能相关联的方法集中在一起的接口。

## 注册服务

AngularJS 提供了一些内置服务，在任何地方使用它们的方式都是统一的。而且，在 AngularJS 中创建自己的服务是非常容易的。

创建一个服务只需要注册这个服务即可。服务被注册后， AngularJS 编译器就可以引用它，并且在运行时把它当作依赖加载进来。服务名称的注册表使得在测试中伪造和剔除相互隔离的应用依赖变得非常容易。

```javascript
angular.module('myApp.services', []).factory('githubService', function() {
  var serviceInstance = {} // 我们的第一个服务
  // 修饰服务
  return serviceInstance
})
```

## 使用服务

可以在控制器、指令、过滤器或另外一个服务中通过依赖声明的方式来使用服务。AngularJS 会像平时一样在运行期自动处理实例化和依赖加载的相关事宜。

当服务成为了某个控制器的依赖，就可以在控制器中调用任何定义在这个服务对象上的方法。

```javascript
angular
  .module('myApp', ['myApp.services'])
  .controller('ServiceController', function($scope, githubService) {
    // 我们可以调用对象的事件函数
    $scope.events = githubService.events('auser')
  })
```

## 创建服务时的设置项

在 AngularJS 应用中，`factory()` 方法是用来注册服务的最常规方式，同时还有其他一些 API 可以在特定情况下帮助我们减少代码量。

### factory()

如前所见，`factory()` 方法是创建和配置服务的最快捷方式。`factory()` 函数可以接受两个参数。

- **name（字符串）**：需要注册的服务名。
- **getFn（函数）**：这个函数会在 AngularJS 创建服务实例时被调用。

因为服务是单例对象，`getFn` 在应用的生命周期内只会被调用一次。同其他 AngularJS 的服务一样，在定义服务时，`getFn` 可以接受一个包含可被注入对象的数组或函数。

`getFn` 函数可以返回简单类型、函数乃至对象等任意类型的数据。

### service()

使用 `service()` 可以注册一个支持构造函数的服务，它允许我们为服务对象注册一个构造函数。

`service()` 方法接受两个参数：

- name（字符串）：要注册的服务名称。
- constructor（函数）：构造函数，用来实例化服务对象。

```javascript
function Person($http) {
  this.name = 'Anani'
}
angular.service('personService', Person)
```

### provider()

所有服务工厂都是由 `$provide` 服务创建的，`$provide` 服务负责在运行时初始化这些提供者。

提供者是一个具有 `$get()` 方法的对象，`$injector` 通过调用 `$get` 方法创建服务实例。`$provider` 提供了数个不同的 API 用于创建服务，每个方法都有各自的特殊用途。

`$provide` 是唯一一种你可以传进 `.config()` 函数的 `service`。当你想要在 `service` 对象启用之前，先进行模块范围的配置，那就应该用 `$provide`。

`provider()` 方法为服务注册提供者。可以接受两个参数：

- name（字符串）：`name` 参数在 providerCache 中是注册的名字。而 `name+Provider` 会成为服务的提供者。 同时 `name` 也是服务实例的名字。
- `aProvider`（对象/函数/数组）：
  - 如果 `aProvider` 是函数，那么它会通过依赖注入被调用，并且负责通过 `$get` 方法返回一个对象。
  - 如果 `aProvider` 是数组，会被当做一个带有行内依赖注入声明的函数来处理。数组的最后一个元素应该是函数，可以返回一个带有 `$get` 方法的对象。
  - 如果 `aProvider` 是对象，它应该带有 `$get` 方法。

用 `provider()` 这个方法创建服务，必须返回一个定义有 `$get()` 函数的对象（否则会导致错误），最后返回一个已经注册的提供者实例。

```html
<body>
  <script src="https://cdn.bootcss.com/angular.js/1.3.5/angular.min.js"></script>
  <div ng-app="myApp">
    <div ng-controller="MyController">
      {{name}}
    </div>
  </div>
  <script type="text/javascript">
    var app = angular.module('myApp', [])
    app.config(function(myServiceProvider) {
      myServiceProvider.name = 'Anani'
    })
    app.provider('myService', function() {
      this.$get = function() {
        var self = this
        var service = {}
        service.getName = function() {
          return self.name
        }
        return service
      }
    })
    app.controller('MyController', [
      'myService',
      '$scope',
      function(myService, $scope) {
        $scope.name = myService.getName()
      },
    ])
  </script>
</body>
```

### constant()

可以将一个已经存在的变量值注册为服务，并将其注入到应用的其他部分当中。例如，假设我们需要给后端服务一个 `token`，可以用 `constant()` 将其当作常量保存下来。

`constant()` 函数可以接受两个参数：

- name（字符串）：需要注册的常量的名字；
- value（常量）：需要注册的常量的值（值或者对象）。

`constant()` 方法返回一个注册后的服务实例。

```javascript
angular.module('myApp').constant('token', 'balabala')
angular.module('myApp').controller('MyController', function($scope, token) {
  $scope.token = token
})
```

### value()

如果服务的 `$get` 方法返回的是一个常量，那就没要必要定义一个包含复杂功能的完整服务，可以通过 `value()` 函数方便地注册服务。

`value()` 方法可以接受两个参数：

- name（字符串）：需要注册的服务名。
- value（值）：将这个值将作为可以注入的实例返回。

`value()` 方法返回以 `name` 参数的值为名称的注册后的服务实例。

```javascript
angular.module('myApp').value('token', 'balabala')
```

`value()` 方法和 `constant()` 方法之间最主要的区别是，常量可以注入到配置函数中，而值不行。通常情况下，可以通过 `value()` 来注册服务对象或函数，用 `constant()` 来配置数据。

```javascript
angular
  .module('myApp', [])
  .constant('token', 'balabala')
  .config(function(token) {
    // 在这里apiKey将被赋值为balabala
    // 就像上面设置的那样
  })
  .value('username', 'Anani')
  .config(function(username) {
    // 这将抛出一个错误，未知的provider: username
    // 因为在config函数内部无法访问这个值
  })
```

### decorator()

`$provide` 服务提供了在服务实例创建时对其进行拦截的功能，可以对服务进行扩展，或者用另外的内容完全代替它。

装饰器是非常强大的，它不仅可以应用在我们自己的服务上，也可以对 AngularJS 的核心服 务进行拦截、中断甚至替换功能的操作。事实上 AngularJS 中很多功能的测试就是借助 `$provide.decorator()` 建立的。

对服务进行装饰的场景有很多，比如对服务进行扩展，将外部数据缓存进 `localStorage` 的功能，或者对服务进行封装以便在开发中进行调试和跟踪等。

`decorator()` 函数可以接受两个参数：

- name（字符串）：将要拦截的服务名称。
- decoratorFn（函数）：在服务实例化时调用该函数，这个函数由 `injector.invoke` 调用，可以将服务注入这个函数中。

```html
<body>
  <script src="https://cdn.bootcss.com/angular.js/1.3.5/angular.min.js"></script>
  <div ng-app="myApp">
    <div ng-controller="MyController">
      {{name}}
    </div>
  </div>
  <script type="text/javascript">
    var app = angular.module('myApp', [])
    app.config(function(myServiceProvider) {
      myServiceProvider.name = 'Anani'
    })
    app.provider('myService', function() {
      this.$get = function() {
        var self = this
        var service = {}
        service.getName = function() {
          return self.name
        }
        return service
      }
    })
    app.controller('MyController', [
      'myService',
      '$scope',
      function(myService, $scope) {
        $scope.name = myService.getName()
      },
    ])
    app.config(function($provide) {
      $provide.decorator('myService', myServiceDecorator)
    })

    function myServiceDecorator($delegate, $log) {
      // $delegate => The original service instance
      return {
        getName: function() {
          console.log('我是用来修饰的内容。')
          return $delegate.getName() // 调用原本存在的方法
        },
      } // 修饰函数返回的对象会重写原本的服务
    }
  </script>
</body>
```

对比前面 `provider()` 部分的代码，查看前后的差异，理解修饰的方式。

## 参考资料

- AngularJS 权威指南
- [AngularJS：API：\$provide](https://code.angularjs.org/1.3.15/docs/api/auto/service/$provide)
