# React Hooks

Hook 是 React 16.8 的新增特性。它可以让你在不编写 `class` 的情况下使用 `state` 以及其他的 React 特性。

## 解决的问题

- 在组件之间复用状态逻辑很难

以前，想要在组件之间复用状态逻辑，一般都会使用 `render props` 和 高阶组件。但是这类方案需要重新组织组件的结构，使得代码难以理解。

**通过 Hook 则可以在无需修改组件结构的情况下复用状态逻辑。**

- 复杂组件变得难以理解

当我们在使用 `class` 组件时，每个生命周期常常会包含一些不相关的逻辑。

比如在 `componentDidMount` 中获取数据、设置事件监听和定时器，然后又会在 `componentWillUnmount` 中清除。

显然，一些相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。

**通过 Hook 则可以将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）。**

- 难以理解的 CLASS

要真正的运用好 `class` 组件，必须理解 JavaScript 中 `this` 的工作方式。

**通过 Hook 则可以在非 `class` 的情况下可以使用更多的 React 特性。**

## useState

`useState` 接受一个唯一的参数作为初始的 `state`，最后返回一个数组。

数组中第一项是 `state`，React 会在重复渲染时保留这个 `state`。第二项则是更新状态的函数。

现在，通过在函数组件里调用它来给组件添加一些内部 `state`。

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
    </>
  );
}
```

**初始 `state` 只在第一次渲染时会被用到，如果初始 `state` 需要通过复杂计算获得，也可以传入一个函数，同样此函数只在初始渲染时被调用。**

```javascript
const initSate = () => {
  console.log('初始化 state');
  return 0; // 返回初始 satte
};

function Counter() {
  const [count, setCount] = useState(initSate);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
    </>
  );
}
```

多次点击按钮，初始化的的提示消息只会出现一次。

**更新状态的函数类似 `class` 组件的 `this.setState`，但是它不会把新的 `state` 和旧的 `state` 进行合并。**

```javascript
function Counter() {
  const [counter, setCounter] = useState({ name: '计数器：', count: 0 });

  return (
    <>
      <p>{counter.name}</p>
      <p>You clicked {counter.count} times</p>
      <button onClick={() => setCounter({ count: counter.count + 1 })}>
        Add count
      </button>
    </>
  );
}
```

点击按钮后，`counter.name` 将会丢失，你可以使用展开运算符来达到合并更新对象的效果，比如：`setCounter({ ...counter, count: counter.count + 1 })`。

**每一次渲染都有它自己的 `props` 和 `state`。**

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  const logCount = () => setTimeout(() => console.log(count), 3000);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <button onClick={logCount}>Log count</button>
    </>
  );
}
```

运行上面的例子，然后先点击第二个按钮，再点击第一个按钮。

结果是无论 `count` 增加到多少，控制台始终打印的是零，或者说每次打印的都是触发定时器时 `count` 的值。

**如果你想要获取到最新的 `state` 进行处理，可以采用函数式更新。**

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  const lazyAdd = () => setTimeout(() => setCount((state) => state + 2), 3000);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <button onClick={lazyAdd}>Lazy add</button>
    </>
  );
}
```

这和在 `class` 组件中的使用基本一致。

**调用 State Hook 的更新函数并传入当前的 state 时（内部使用 Object.is 进行比较），React 将跳过子组件的渲染及 effect 的执行。**

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  console.log('render');

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count)}>Add count</button>
    </>
  );
}
```

多次点击按钮，只会打印一次 `render`（首次渲染）。

## useCallback

`useCallback` 接受一个回调函数和一个依赖项数组作为参数，它将返回该回调函数的 `memoized` 版本，新的回调函数仅在某个依赖项改变时才会更新。

```javascript
let prevFn = null;
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('计数器：');

  const updateName = () => setName(`新的${name}`);
  console.log(prevFn === updateName);
  prevFn = updateName;

  return (
    <>
      <p>{name}</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <button onClick={updateName}>Change name</button>
    </>
  );
}
```

在没有使用 `useCallback` 时，每当我们点击第一个按钮，控制台总会打印 `false`，这表面每一次渲染都会创建一个新的 `updateName` 函数。

显然，如果 `name` 的值没有发生改变时，这是没有必要的。而且，如果我们将 `updateName` 函数传递给一个子组件的话，可能会导致子组件产生一些没有意义的重复渲染。

```javascript
const Child = memo(function ChildComponent(props) {
  console.log('render child');

  return (
    <>
      <p>{props.name}</p>
      <button onClick={props.updateName}>Change name</button>
    </>
  );
});

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('计数器：');
  const updateName = () => setName(`新的${name}`);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <Child name={name} updateName={updateName} />
    </>
  );
}
```

目前，我们每次增加 `count` 的值，也会导致子组件重新渲染，因为父级传递的 `updateName` 函数总是不同的，导致子组件的 `props` 也总不相同的。

使用 `useCallback` 函数则可以避免这一点。

```javascript
const Child = memo(function ChildComponent(props) {
  console.log('render child');

  return (
    <>
      <p>{props.name}</p>
      <button onClick={props.updateName}>Change name</button>
    </>
  );
});

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('计数器：');
  const updateName = useCallback(() => setName(`新的${name}`), [name]);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <Child name={name} updateName={updateName} />
    </>
  );
}
```

现在，只有 `name` 发生改变时，子组件才会重新渲染。

## useMemo

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 `memoized` 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

假如，在上面的例子中，我们传递给子组件的数据要进行一层处理，比如在当前的名称前面加上“新的”前缀。

```javascript
const Child = memo(function ChildComponent(props) {
  console.log('render child');

  return (
    <>
      <p>{props.computedName.name}</p>
      <button onClick={props.updateName}>Change name</button>
    </>
  );
});

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('计数器：');
  const updateName = useCallback(() => setName(`新的${name}`), [name]);
  const computedName = { name: `新的${name}：` };

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <Child computedName={computedName} updateName={updateName} />
    </>
  );
}
```

看起来似乎很好。问题是，当我们点击添加按钮时，`Counter` 组件将会重新渲染，`computedName` 也随之被重新创建。如此一来，每次又会得到全新的 `computedName` 对象，导致子组件进行无意义的更新。

现在，其中只是包含了一个简单的字符串拼接，要是为了得到 `computedName` 需要进行大量的计算工作的话，这将会造成一系列的性能损失。

为了解决这个问题，我们可以将计算步骤都包含在一个函数中，然后传递给 `useMemo`，并正确的添加依赖项。之后，只当相关的依赖项发生改变时这个函数才会被重新执行。这看起确实很像是 `Vue` 中的计算属性，只是还不够智能。

```javascript
const Child = memo(function ChildComponent(props) {
  console.log('render child');

  return (
    <>
      <p>{props.computedName.name}</p>
      <button onClick={props.updateName}>Change name</button>
    </>
  );
});

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('计数器：');
  const updateName = useCallback(() => setName(`新的${name}`), [name]);
  const computedName = useMemo(() => ({ name: `新的${name}：` }), [name]);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <Child computedName={computedName} updateName={updateName} />
    </>
  );
}
```

注意：`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

## useReducer

`useReducer` 接收一个形如 `(state, action) => newState` 的 `reducer`、一个 初始 `state` 和一个可选的来协助完成惰性初始化 `state` 的函数，并返回当前的 `state` 以及与其配套的 `dispatch` 方法。

在某些场景下，`useReducer` 会比 `useState` 更适用，例如 `state` 逻辑较复杂且包含多个子值，或者下一个 `state` 依赖于之前的 `state` 等。

```javascript
const initialState = 0;
const init = (initialCount) => ({ count: initialCount });

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

当传递第三个参数时，第二个参数将作为参数传递给初始化函数（第三个参数）。这么做可以将用于计算 `state` 的逻辑提取到 `reducer` 外部。

事实上，`useState` 就是基于 `useReducer` 实现的，相当于一个语法糖。

```javascript
function useState(initialState) {
  const reducer = (state, action) => action.payload;
  const [state, dispatch] = useReducer(reducer, initialState);
  const setState = (newState) => dispatch({ payload: newState });

  return [state, setState];
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

通过自定义钩子，我们可以很快的实现 `useState` 的基本功能。

## useContext

`useContext` 接收一个 `context` 对象（React.createContext 的返回值）并返回该 `context` 的当前值。当前的 `context` 值由上层组件中距离当前组件最近的 `<Provider>` 的 `value` 属性决定。

创建和使用的方式和之前几乎完全一致。

```javascript
const TestContext = React.createContext('test');
```

只是，之前我们获取值时是通过 `Consumer` 组件来实现的。

```javascript
<TestContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</TestContext.Consumer>
```

而使用 `useContext` 后显得更加方便。

```javascript
const value = useContext(TestContext);
```

当组件上层最近的 `<Provider>` 更新时，该 Hook 会使用最新传递给 `<Provider>` 的 `value` 值触发重渲染，即使祖先使用 `React.memo` 或 `shouldComponentUpdate`，也会在组件本身使用 `useContext` 时重新渲染。

## useEffect

在 React 组件中执行数据获取、订阅或者手动修改 DOM 的操作，我们统一把这些称为“副作用”。

对应的 `useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 `class` 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途。

当你调用 `useEffect` 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。

默认情况下，React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => setCount(count + 1), 1000);
  }, [count]);

  return <p>{count}</p>;
}
```

示例代码看起来还不错。然而，事实上这会导致开启越来越多的定时器，而其中大部分是毫无意义得，甚至可能会导致错误。

由于，我们把 `count` 添加作为依赖项，所以每当 `count` 的值改变时该 Hook 就会重新执行，也就会重新开启一个定时器。

解决这个问题的方法，就是在每次执行完成后清除上一次的定时器。刚好，在副作用函数中，可以通过返回一个函数来指定如何“清除”副作用。

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCount(count + 1), 1000);

    return () => clearInterval(timer);
  }, [count]);

  return <p>{count}</p>;
}
```

注意，与 `componentDidMount`、`componentDidUpdate` 不同的是，在浏览器完成布局与绘制之后，传给 `useEffect` 的函数会延迟调用。

虽然 `useEffect` 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 `effect`。

## useLayoutEffect

其函数签名与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 `effect`。

通常，可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。

```javascript
function LayoutEffect() {
  const [color, setColor] = useState('red');
  useLayoutEffect(() => {
    alert();
    setColor('blue');
  }, [color]);

  return (
    <>
      <p style={{ background: color }}>Hello world!</p>
      <button onClick={() => setColor('yellow')}>yellow</button>
    </>
  );
}
```

点击按钮，整个变化过程中不会出现黄色。可见 `useLayoutEffect` 的执行时机是在回流过程中，而 `useEffect` 则是在重绘完成后。

建议，尽可能使用标准的 `useEffect` 以避免阻塞视觉更新。

## useRef

`useRef` 返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的参数（initialValue）。

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type='text' />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

返回的 `ref` 对象在组件的整个生命周期内保持不变。

```javascript
let prevRef = null;
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };

  console.log(prevRef === inputEl);
  prevRef = inputEl;

  return (
    <>
      <p>
        <input ref={inputEl} type='text' />
      </p>
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <TextInputWithFocusButton />
    </>
  );
}
```

上面的例子中，点击添加按钮，除第一次外，将始终打印 `true`。

将 `useRef` 直接替换为 `createRef`，也可以顺利运行，但是控制台中将始终打印 `false`。因此，如果传递给子组件将可能引发无意义的渲染。

## useImperativeHandle

`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。

我们知道通过 `React.forwardRef` 可以创建一个新的 `React` 组件，这个组件能够将其接受的 `ref` 属性转发到其组件树下的另一个组件中。

```javascript
function TextInputWithFocusButton(props, ref) {
  return (
    <p>
      <input ref={ref} type='text' />
    </p>
  );
}

const Child = React.forwardRef(TextInputWithFocusButton);

function Parent() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <Child ref={inputEl} />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

然而，这里直接将子级元素的引用暴露给父级后，父级可以通过 `inputEl` 对其做任何操作。这可能会导致一些问题，比如让代码变得难以维护，一旦出现问题，难以定位。

因此，我们需要自定义返回给父级的内容。

```javascript
function TextInputWithFocusButton(props, ref) {
  const inputEl = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputEl.current.focus(),
  }));

  return (
    <p>
      <input ref={inputEl} type='text' />
    </p>
  );
}

const Child = React.forwardRef(TextInputWithFocusButton);

function Parent() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.focus();
  };

  return (
    <>
      <Child ref={inputEl} />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

现在，父级拿到的只是子级暴露出来的一个方法。整个过程可能显得更加繁琐，但也会使得错误更容易被捕捉。

## 其它事项

- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- `useDebugValue` 可用于在 React 开发者工具中显示自定义 Hook 的标签。
- 事实上 Hook 的每次调用都有一个完全独立的 `state` —— 因此你可以在单个组件中多次调用同一个自定义 Hook。
- 如果函数的名字以 “use” 开头并调用其他 Hook，我们就说这是一个自定义 Hook。

## 参考

- [Hook API 索引 – React](https://zh-hans.reactjs.org/docs/hooks-reference.html)
- [useEffect 完整指南 — Overreacted](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
