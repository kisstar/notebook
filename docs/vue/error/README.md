# Error

- 在 data 函数中获取子组件失败

在写 Vue 的 JSX 语法时，会在 data 函数中去从 props 选项上获取初始值；否者就去获取子组件中第一个组件的 key 属性，由于子组件是根据异步获取的数据来遍历进行渲染的，所以在执行 data 函数时，此时的 `$slot` 属性是一个空对象，因为数据还没拿到，子组件是空的。

## Vetur

- Single quotes are being replaced with double quotes

See: <https://github.com/vuejs/vetur/issues/986#issuecomment-441918550>
