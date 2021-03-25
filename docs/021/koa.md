# Koa

根据官网的介绍，Koa 是一个新的 Web 框架，致力于成为 Web 应用和 API 开发领域中的一个更小、更富有表现力和更健壮的基石。

通过 `async` 函数，Koa 不仅远离回调地狱，同时还有力地增强了错误处理。而且，一个关键的设计点是在其低级中间件层中提供了高级“语法糖”，这包括诸如内容协商，缓存清理，代理支持和重定向等常见任务的方法。

## 基础

实际上，我们常见的一些 Web 框架都是通过使用 Http 模块来创建了一个服务，在请求到来时通过一系列的处理后把结果返回给前台，事实上 Koa 内部大致也是如此。

通过查看源码不难发现 Koa 主要分为四个部分：应用程序、上下文、请求对象和响应对象，当我们引入 Koa 时实际上就是拿到了负责创建应用程序的这个类。

我们先来看一下一个简单的 Hello World 应用：

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000, () => console.log('The app is running on localhost:3000'))
```

运行上面的代码并访问 [http://localhost:3000/](http://localhost:3000/)，一个简单的应用就这样创建好了。

## 实现

根据上面的使用方式我们可以很容易的想到下面的实现：

```js
const http = require('http')

module.exports = class Application {
  use(fn) {
    this.middleware = fn
  }

  callback() {
    const handleRequest = (req, res) => {
      this.middleware(req, res)
    }

    return handleRequest
  }

  listen(...args) {
    const server = http.createServer(this.callback())

    return server.listen(...args)
  }
}
```

在上面的例子中，中间件得到的参数还是原生的请求和响应对象。按照 Koa 的实现，现在我们需要创建一个贯穿整个请求的上下文对象，上下文中包括了原生的和封装的请求、响应对象。

```js
// request.js
module.exports = {}

// response.js
module.exports = {}

// context.js
module.exports = {}

// application.js
const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')

module.exports = class Application {
  constructor() {
    // 确保每个实例都拥有自己的 request response context 三个对象
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.context = Object.create(context)
  }

  createContext() {
    // ...
  }

  callback() {
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)

      this.middleware(ctx)
    }

    return handleRequest
  }
}
```

在上面我们创建了三个对象并放置到了应用的实例上面，最后将创建好的上下文对象传递给中间件。在创建上下文的函数中首先要处理的就是请求、响应等几个对象之间的关系：

```js
module.exports = class Application {
  createContext(req, res) {
    const context = Object.create(this.context)
    const request = (context.request = Object.create(this.request))
    const response = (context.response = Object.create(this.response))

    context.app = request.app = response.app = this
    context.req = request.req = response.req = req
    context.res = request.res = response.res = res
    request.ctx = response.ctx = context
    request.response = response
    response.request = request

    return context
  }
}
```

其中上下文上的 `request` 和 `response` 是我们后面要进一步封装的请求和响应对象，而 `req` 和 `res` 则是原生的请求和响应对象。

## Context

如上，在每一次收到用户请求时都会创建一个 Context 对象，这个对象封装了这次用户请求的信息，并提供了许多便捷的方法来获取请求参数或者设置响应信息。

除了自行封装的一些属性和方法外，其中也有许多属性和方法都是通过代理的方式获取的请求和响应对象上的值。

```js
const delegate = require('delegates')

const context = (module.exports = {
  onerror(err) {
    const msg = err.stack || err.toString()

    console.error(msg)
  },
})

delegate(context, 'response')
  // ...
  .access('body')

delegate(context, 'request')
  .method('get')
  // ...
  .access('method')
```

这里我们看到的 [delegates](https://www.npmjs.com/package/delegates) 模块是由大名鼎鼎的 [TJ](https://github.com/tj) 所写的，利用委托模式，它使得外层暴露的对象将请求委托给内部的其他对象进行处理。

### Delegator

接下来我们来看看`delegates` 模块中的核心逻辑。

```js
function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target)

  this.proto = proto
  this.target = target
}

Delegator.prototype.method = function(name) {
  const proto = this.proto
  const target = this.target

  // 调用时这里的 this 就是上下文对象，target 则是 request 或 response
  // 所以，最终都会交给请求对象或响应对象上的方法去处理
  proto[name] = function() {
    return this[target][name].apply(this[target], arguments)
  }

  return this
}

Delegator.prototype.access = function(name) {
  return this.getter(name).setter(name)
}

Delegator.prototype.getter = function(name) {
  const proto = this.proto
  const target = this.target

  // __defineGetter__ 方法可以为一个已经存在的对象设置（新建或修改）访问器属性
  proto.__defineGetter__(name, function() {
    return this[target][name]
  })

  return this
}

Delegator.prototype.setter = function(name) {
  const proto = this.proto
  const target = this.target

  // __defineSetter__ 方法可以将一个函数绑定在当前对象的指定属性上，当那个属性被赋值时，绑定的函数就会被调用
  proto.__defineSetter__(name, function(val) {
    return (this[target][name] = val)
  })

  return this
}

module.exports = Delegator
```

通过 `method` 方法在上下文上创建指定的函数，调用时会对应调用请求对象或响应对象上的方法进行处理，而对于一些普通属性的读写则直接通过`__defineGetter__` 和 `__defineSetter__` 方法来进行代理。

## Request

Request 是一个请求级别的对象，封装了 Node.js 原生的 HTTP Request 对象，提供了一系列辅助方法获取 HTTP 请求常用参数。

```js
module.exports = {
  get method() {
    // 直接获取原生请求对象上对应的属性
    return this.req.method
  },

  set method(val) {
    this.req.method = val
  },
}
```

和请求上下文对象类似，请求对象上除了会封装一些常见的属性和方法外，也会去直接读取并返回一些原生请求对象上对应属性的值。

## Response

Response 是一个请求级别的对象，封装了 Node.js 原生的 HTTP Response 对象，提供了一系列辅助方法设置 HTTP 响应。

```js
module.exports = {
  get body() {
    return this._body
  },

  set body(val) {
    // 省略了详细的处理逻辑
    this._body = val
  },
}
```

其中的处理方式和请求对象的处理类似。

## 中间件

和 Express 不同，Koa 的中间件选择了洋葱圈模型，所有的请求经过一个中间件的时候都会执行两次，这样可以非常方便的实现后置处理逻辑。

```js
function compose(middlewares) {
  return function(ctx) {
    const dispatch = (i = 0) => {
      const middleware = middlewares[i]

      if (i === middlewares.length) {
        return Promise.resolve()
      }

      return Promise.resolve(middleware(ctx, () => dispatch(i + 1)))
    }

    return dispatch()
  }
}

module.exports = compose
```

Koa 的中间件处理被单独的放在了 `koa-compose` 模块中，上面是插件处理的主要逻辑，核心思想就是将调用下一个插件的函数通过回调的方式交给当前正在执行的中间件。

存在的一个问题是，开发者可能会多次调用执行下个中间件的函数（next），为此我们可以添加一个标识：

```js
function compose(middlewares) {
  return function(ctx) {
    let index = -1

    const dispatch = (i = 0) => {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'))
      }

      index = i

      const middleware = middlewares[i]

      if (i === middlewares.length) {
        return Promise.resolve()
      }

      return Promise.resolve(middleware(ctx, () => dispatch(i + 1)))
    }

    return dispatch()
  }
}

module.exports = compose
```

由于在每一个 `dispatch` 函数（也就是中间件中的 next 函数）中 `i` 的值是固定的，在调用一次后它的值就和 `index` 的值相等了，再次调用就会报错。

## Application

Application 是全局应用对象，在一个应用中，只会实例化一个，在它上面我们建立了几个对象之间的关系，同时还会负责组织上面提到的插件。

另外，之前我们的 `use` 方法直接将指定的插件赋值给了 `middleware`，可是这样只能有一个插件，因此我们需要改变一下，维护一个数组。

```js
const compose = require('../koa-compose')

module.exports = class Application {
  constructor() {
    // ...
    this.middleware = []
  }

  use(fn) {
    this.middleware.push(fn)
  }

  callback() {
    const fn = compose(this.middleware)
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)

      fn(ctx)
    }

    return handleRequest
  }
}
```

目前为止，我们基本已经完成了本次请求的处理，但并没有完成响应，我们还需要在最后返回 `ctx.body` 上的数据。

```js
module.exports = class Application {
  callback() {
    const fn = compose(this.middleware)
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)

      this.handleRequest(ctx, fn)
    }

    return handleRequest
  }

  handleRequest(ctx, fnMiddleware) {
    const onerror = err => ctx.onerror(err)
    const handleResponse = () => respond(ctx)

    return fnMiddleware(ctx)
      .then(handleResponse)
      .catch(onerror)
  }
}

function respond(ctx) {
  ctx.res.end(ctx.body)
}
```

现在一个基础的 Koa 就算实现了。
