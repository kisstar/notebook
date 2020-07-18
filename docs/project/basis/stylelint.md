# stylelint

和 ESLint 类似，StyleLint 是一个基于 Javascript 的样式代码审查工具，它的目标是保证代码的一致性和避免错误。

## 基础使用

安装：

```bash
npm install --save-dev stylelint stylelint-config-standard
```

在配置文件中配置：

```json
{
  "extends": "stylelint-config-standard"
}
```

使用：

```bash
npx stylelint "**/*.css"
```

## 进阶校验（Less）

安装：

```bash
stylelint stylelint-config-css-modules stylelint-config-prettier stylelint-config-rational-order stylelint-config-standard stylelint-declaration-block-no-ignored-properties stylelint-order
```

配置：

```json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-rational-order",
    "stylelint-config-prettier"
  ],
  "plugins": ["stylelint-order", "stylelint-declaration-block-no-ignored-properties"],
  "rules": {
    "no-descending-specificity": null,
    "function-calc-no-invalid": null,
    "plugin/declaration-block-no-ignored-properties": true
  }
}
```

## 支持校验 Scss

安装：

```bash
npm install --save-dev stylelint stylelint-config-standard stylelint-config-sass-guidelines stylelint-config-rational-order stylelint-order stylelint-config-prettier stylelint-prettier
```

配置：

```json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines",
    "stylelint-config-rational-order",
    "stylelint-prettier/recommended"
  ],
  "plugins": ["stylelint-order", "stylelint-config-rational-order/plugin"],
  "rules": {
    "max-nesting-depth": null,
    "order/properties-alphabetical-order": null,
    "order/properties-order": [],
    "plugin/rational-order": [
      true,
      {
        "border-in-box-model": false,
        "empty-line-between-groups": false
      }
    ]
  }
}
```

## 参考

- [Configuration · stylelint](https://stylelint.io/user-guide/configure)
- [GitHub - stylelint/awesome-stylelint: A list of awesome stylelint plugins, configs, etc.](https://github.com/stylelint/awesome-stylelint)
