# eslint

ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。与 JSLint、JSHint 不同的是：

- ESLint 使用 Espree 解析 JavaScript。
- ESLint 使用 AST 去分析代码中的模式。
- ESLint 是完全插件化的。每一个规则都是一个插件并且你可以在运行时添加更多的规则。

## 基础使用

安装：

```bashh
yarn add -D eslint
```

生成配置文件：

```bash
./node_modules/.bin/eslint --init
```

你也可以全局安装，这样可以方便使用 `eslint` 命令：

```bash
yarn global add eslint
eslint --init
```

对 `demo.js` 文件进行校验：

```bash
eslint demo.js
```

对于一个项目而言，通常会将其安装到局部（使用的任何插件或可共享配置都必须安装在本地），为了方便使用我们可以在 `package.json` 文件中配置相应的命令：

```json
{
  "script": {
    "eslint": "eslint demo.js"
  }
}
```

现在通过 `npm run eslint` 命令也可以对指定的文件进行校验。

## 配置

ESlint 被设计为完全可配置的，这意味着你可以关闭每一个规则而只运行基本语法验证，或混合和匹配 ESLint 默认绑定的规则和你的自定义规则。有两种主要的方式来配置 ESLint：

**配置注释** - 使用 JavaScript 注释将配置信息直接嵌入到文件中。譬如：

```js
// 指定环境
/* eslint-env node, mocha */

// 指定全局变量
/* global var1, var2:writable */

// 配置规则
/* eslint quotes: ["error", "double"], curly: 2, "plugin1/rule1": "error" */

// 关闭/开启 检查，支持指定特定的规则
/* eslint-disable */
// Business code...
/* eslint-enable */

// 关闭对 当前行/下一行 的检查，支持指定特定的规则
/* eslint-disable-line */
/* eslint-disable-next-line */
```

**配置文件** - 使用任一的文件（.eslintrc.js、.eslintrc.yaml、.eslintrc.yml、.eslintrc.json、.eslintrc 或在 package.json 文件中创建 eslintConfig 属性）来为全部的目录和它的子目录指定配置信息。

其实，通过命令行也可以传递一些配置项，具体的优先级唯配置注释最高，命令行参数次之，项目级配置文件紧随其后。如果你在你的主目录（通常 ~/）有一个配置文件，ESLint 只有在无法找到其他配置文件时才使用它。

## 配置项

在配置文件中有很多信息可以配置：

- Environments - 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
- Globals - 脚本在执行期间访问的额外的全局变量。
- Rules - 启用的规则及其各自的错误级别。

所有这些选项让你可以细粒度地控制 ESLint 如何对待你的代码。

### Parser

ESLint 默认使用 [Espree][espree] 作为其解析器，你可以在配置文件中指定一个不同的解析器，只要该解析器符合下列要求：

- 它必须是一个 Node 模块，可以从它出现的配置文件中加载。通常，这意味着应该使用 [npm][npm] 单独安装解析器包。
- 它必须符合 [parser interface][parser_interface]。

以下解析器与 ESLint 兼容：

- [Esprima][esprima]
- [Babel-ESLint][babel_eslint] - 一个对 Babel 解析器的包装，使其能够与 ESLint 兼容。
- [@typescript-eslint/parser][ts_eslint] - 将 TypeScript 转换成与 `estree` 兼容的形式，以便在 ESLint 中使用。

你可以在你的 `.eslintrc` 文件里通过 `parser` 选项指定要使用的解析器：

```json
{
  "parser": "babel-eslint"
}
```

### Parser Options

指定解析器参数。为了让 ESLint 在处理非 ECMAScript 5 特性时正常工作，配置属性 `parserOptions` 仍然是必须的。

```json
{
  "parserOption": {
    // 指定要使用的 ECMAScript 版本，可以使用 6、7、8、9 或 10，默认值 5
    "ecmaVersion": 5,
    // 设置为 script(默认)或 module（如果你的代码是 ECMAScript 模块)
    "sourceType": "script",
    // 指定你想使用的额外的语言特性,所有选项默认都是 false
    "ecmafeatures": {
      // 允许在全局作用域下使用 return 语句
      "globalReturn": false,
      // 启用全局 strict 模式（严格模式）
      "impliedStrict": false,
      // 启用 JSX
      "jsx": false,
      // 启用对实验性功能的支持，详细可参考官网
      "experimentalObjectRestSpread": false
    }
  }
}
```

注意：使用 `{ "parserOptions": { "ecmaVersion": 6 } }` 会开启对 ES6 语法的支持，但是对于并不意味着同时支持新的 ES6 全局变量或类型。

### Processor

处理器可以从另一种文件中提取 JavaScript 代码，然后让 ESLint 检测 JavaScript 代码。或者处理器可以在预处理中转换 JavaScript 代码。

若要在配置文件中指定处理器，请使用 `processor` 键，并使用由插件名和处理器名组成的串接字符串加上斜杠。例如，下面的选项启用插件 `a-plugin` 提供的处理器 `a-processor`：

```json
{
  "plugins": ["a-plugin"],
  "processor": "a-plugin/a-processor"
}
```

要为特定类型的文件指定处理器，可以用 `overrides` 键和 `processor` 键的组合。例如，下面对 `*.md` 文件使用处理器 `a-plugin/markdown`：

```json
{
  "plugins": ["a-plugin"],
  "overrides": [
    {
      "files": ["*.md"],
      "processor": "a-plugin/markdown"
    }
  ]
}
```

处理器可以生成命名的代码块，如 `0.js` 和 `1.js`。ESLint 将这样的命名代码块作为原始文件的子文件处理。你可以在配置的 `overrides` 部分为已命名的代码块指定附加配置。

例如，下面的命令对以 `.js` 结尾的 `markdown` 文件中的已命名代码块禁用 `strict` 规则：

```json
{
  "plugins": ["a-plugin"],
  "overrides": [
    {
      "files": ["*.md"],
      "processor": "a-plugin/markdown"
    },
    {
      "files": ["**/*.md/*.js"],
      "rules": {
        "strict": "off"
      }
    }
  ]
}
```

ESLint 检查指定代码块的文件扩展名，如果 `--ext` CLI option 不包含文件扩展名，则忽略这些扩展名。如果您想要删除除 `*.js` 之外的已命名代码块，请确保指定 `--ext` 选项。

### Environments

每个环境定义了一组预定义的全局变量。可用的环境包括但不仅是：

- `browser` - 浏览器环境中的全局变量。
- `node` - Node.js 全局变量和 Node.js 作用域。
- `commonjs` - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
- `shared-node-browser` - Node.js 和 Browser 通用全局变量。
- `es6` - 启用除了 `modules` 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
- `jquery` - jQuery 全局变量。
- `jest` - Jest 全局变量。
- `amd` - 将 `require()` 和 `define()` 定义为像 [amd][amd] 一样的全局变量。
- `mocha` - 添加所有的 Mocha 测试全局变量。

各个环境之间并不是互斥的，所以你可以同时定义多个：

```json
{
  "env": {
    "browser": true,
    "node": true
  }
}
```

如果你想在一个特定的插件中使用一种环境，确保提前在 `plugins` 数组里指定了插件名，然后在 `env` 配置中不带前缀的插件名后跟一个 `/`，紧随着环境名。例如：

```json
{
  "plugins": ["example"],
  "env": {
    "example/custom": true
  }
}
```

### Globals

当访问当前源文件内未定义的变量时，`no-undef` 规则将发出警告。如果你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。

要在配置文件中配置全局变量，需要把 `globals` 设置为一个对象，该对象包含以你希望使用的每个全局变量。对于每个全局变量键，将对应的值设置为 "writable" 以允许重写变量，或 "readonly" 不允许重写变量。例如：

```json
{
  "globals": {
    "var1": "writable",
    "var2": "readonly"
  }
}
```

可以使用字符串 "off" 禁用全局变量。例如，在大多数 ES2015 全局变量可用但 Promise 不可用的环境中，你可以使用以下配置:

```json
{
  "env": {
    "es6": true
  },
  "globals": {
    "Promise": "off"
  }
}
```

### Rules

在配置文件中，我们可以通过 `rules` 字段来配置特定的规则，该字段的值是一个对象，每个 `key` 都是一个规则的名称，对应的 `value` 则是一个数组。

数组中的第一个值是错误级别，它可以是：

- `"off"` or 0 - 关闭规则
- `"warn"` or 1 - 将规则视为一个警告（不会影响退出码）
- `"error"` or 2 - 将规则视为一个错误 (当被触发的时候，程序会以 1 为错误码退出)

同时，针对某些可配置的规则，你可以通过数组的第二项来传递一些选项。

```json
{
  "rules": {
    "eqeqeq": "off",
    "curly": 2,
    "quotes": ["error", "double"],
    "plugin1/rule1": "error"
  }
}
```

在这些配置文件中，规则 `plugin1/rule1` 表示来自插件 `plugin1` 的 `rule1` 规则。

注意：当指定来自插件的规则时，确保删除 `eslint-plugin-` 前缀。ESLint 在内部只使用没有前缀的名称去定位规则。

### Plugins

ESLint 支持使用第三方插件。在使用插件之前，你必须使用 [npm][npm] 安装它。

插件除了可以有 Processor 外，还主要用于提供了除预设之外的自定义规则，当你在 ESLint 的规则里找不到你需要的时就可以借用插件来实现。

在配置文件里配置插件时，可以使用 `plugins` 关键字来存放插件名字的列表。插件名称可以省略 `eslint-plugin-` 前缀。

```json
{
  "plugins": ["plugin1", "eslint-plugin-plugin2"]
}
```

注意：插件是相对于 ESLint 进程的当前工作目录解析的。换句话说，ESLint 将加载与用户通过从项目 Node 交互解释器运行 `('eslint-plugin-pluginname')` 获得的相同的插件。

### Overrides

若要禁用一组文件的配置文件中的规则，请使用 `overrides` 和 `files`。例如:

```json
{
  "rules": {},
  "overrides": [
    {
      "files": ["*-test.js", "*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```

### Shared Settings

ESLint 支持在配置文件添加共享设置。你可以添加 `settings` 对象到配置文件，它将提供给每一个将被执行的规则。如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将会很有用，并且很容易配置。

在 JSON 中：

```json
{
  "settings": {
    "sharedData": "Hello"
  }
}
```

### Extends

每个配置文件可以被基础配置中的已启用的规则继承，其关键的 `extends` 字段可以是：

- 指定配置的字符串(配置文件的路径、可共享配置的名称、eslint:recommended 或 eslint:all)。
- 字符串数组：每个配置继承它前面的配置。

ESLint 递归地扩展配置，因此基本配置也可以具有 `extends` 属性。`extends` 属性中的相对路径和可共享配置名从配置文件中出现的位置解析。

`rules` 属性可以做下面的任何事情以扩展（或覆盖）规则：

- 启用额外的规则。
- 改变继承的规则级别而不改变它的选项：
  - 基础配置：`"eqeqeq": ["error", "allow-null"]`；
  - 派生的配置：`"eqeqeq": "warn"`；
  - 最后生成的配置：`"eqeqeq": ["warn", "allow-null"]`。
- 覆盖基础配置中的规则的选项：
  - 基础配置：`"quotes": ["error", "single", "avoid-escape"]`；
  - 派生的配置：`"quotes": ["error", "single"]`；
  - 最后生成的配置：`"quotes": ["error", "single"]`。

通常会使用 `extends` 继承[共享的配置][shareable_configs]和插件提供的配置[configs_in_plugins]。

### 其它

设置配置文件：

你可以通过命令行提供的 `-c` 选项来指定使用哪个配置文件。

层叠配置：

默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。

层叠配置意味着当你在多层目录中都拥有配置文件时，ESLint 将会使用离要检测的文件最近的 `.eslintrc` 文件作为最高优先级（是覆盖，而不是直接代替），然后才是父目录里的配置文件，等等。

ESLint 一旦发现配置文件中有 `"root": true`，它就会停止在父级目录中寻找。

在 ESLint 中还支持一些基于 [Glob Pattern][glob_patterns] 的配置，以便于做一些要更精细的配置。

## 忽略文件或目录

有时候，你并不想对项目下的所有文件做校验，尤其是像 `node_modules` 这样的目录。此时，你可以通过在项目根目录创建一个 `.eslintignore` 文件告诉 ESLint 去忽略特定的文件和目录。

`.eslintignore` 文件是一个纯文本文件，其中的每一行都是一个 `glob` 模式表明哪些路径应该忽略检测。Globs 匹配使用 node-ignore，所以大量可用的特性有：

- 以 `#` 开头的行被当作注释，不影响忽略模式。
- 路径是相对于 `.eslintignore` 的位置或当前工作目录。
- 忽略模式同 `.gitignore` 规范
- 以 `!` 开头的行是否定模式，它将会重新包含一个之前被忽略的模式。
- 忽略模式依照 `.gitignore` 规范.

除了 `.eslintignore` 文件中的模式，ESLint 总是忽略 /`node_modules/*` 和 `/bower_components/*` 中的文件。

你也可以使用命令行 `--ignore-path` 选项来指定忽略规则文件所在位置。

## 配置案例

接下来我们使用 [Airbnb][airbnb] 提供的校验规则为例，列举几种配置情况。

### 基础的 JavaScript 校验

主要由 `eslint-config-airbnb-base` 包来进行校验，通过下面的命令查看此包的依赖并进行安装：

```bash
npm info "eslint-config-airbnb-base@latest" peerDependencies
```

然后在配置文件中进行继承：

```json
{
  "extends": "airbnb-base/legacy"
}
```

### 校验 React 项目

主要由 `eslint-config-airbnb` 包来进行校验，通过下面的命令查看此包的依赖并进行安装：

```bash
npm info "eslint-config-airbnb@latest" peerDependencies
```

然后在配置文件中进行继承：

```json
{
  "extends": "airbnb"
}
```

### 基础的 TypeScript 校验

安装依赖：

```bash
yarn add -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

配置：

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
}
```

在进行校验时不要忘了使用 --ext 选项来指定校验文件的扩展名：

```bash
yarn eslint . --ext .js,.jsx,.ts,.tsx
```

更多使用方式可以点击[查看更多][ts_lint_getting_started]。

## 参考

- [Configuring ESLint - ESLint 中文](https://cn.eslint.org/docs/user-guide/configuring)
- [最全的 Eslint 配置模板，从此统一团队的编程习惯 - 掘金](5cf5dfe2f265da1bd522baaa)
- [AlloyTeam ESLint 配置指南 | AlloyTeam][13065]
- [typescript-eslint/README.md at master · typescript-eslint/typescript-eslint · GitHub][ts_lint_getting_started]
- [GitHub - iamturns/eslint-config-airbnb-typescript: Airbnb's ESLint config with TypeScript support][eslint_config_airbnb_typescript]
- [webpack + typescript + react + prettier + eslint + airbnb - Qiita][c31784c950561521d035]

[espree]: https://github.com/eslint/espree
[parser_interface]: https://cn.eslint.org/docs/developer-guide/working-with-plugins#working-with-custom-parsers
[npm]: https://www.npmjs.com/
[esprima]: https://www.npmjs.com/package/esprima
[babel_eslint]: https://www.npmjs.com/package/babel-eslint
[ts_eslint]: https://www.npmjs.com/package/@typescript-eslint/parser
[parser]: https://cn.eslint.org/docs/user-guide/configuring#specifying-parser
[parser_options]: https://cn.eslint.org/docs/user-guide/configuring#specifying-parser-options
[processor]: https://cn.eslint.org/docs/user-guide/configuring#specifying-processor
[pecifying_environments]: https://cn.eslint.org/docs/user-guide/configuring#specifying-environments
[amd]: https://github.com/amdjs/amdjs-api/wiki/AMD
[globals]: https://cn.eslint.org/docs/user-guide/configuring#specifying-globals
[rules]: https://cn.eslint.org/docs/user-guide/configuring#configuring-rules
[plugins]: https://cn.eslint.org/docs/user-guide/configuring#configuring-plugins
[overrides]: https://cn.eslint.org/docs/user-guide/configuring#disabling-rules-only-for-a-group-of-files
[shared_settings]: https://cn.eslint.org/docs/user-guide/configuring#disabling-rules-only-for-a-group-of-files
[extends]: https://cn.eslint.org/docs/user-guide/configuring#extending-configuration-files
[shareable_configs]: https://cn.eslint.org/docs/developer-guide/shareable-configs
[configs_in_plugins]: https://cn.eslint.org/docs/developer-guide/working-with-plugins#configs-in-plugins
[glob_patterns]: https://cn.eslint.org/docs/user-guide/configuring#configuration-based-on-glob-patterns
[node_ignore]: https://github.com/kaelzhang/node-ignore
[5cf5dfe2f265da1bd522baaa]: https://juejin.im/post/5cf5dfe2f265da1bd522baaa
[airbnb]: https://github.com/airbnb/javascript
[13065]: http://www.alloyteam.com/2017/08/13065/
[ts_lint_getting_started]: https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
[eslint_config_airbnb_typescript]: https://github.com/iamturns/eslint-config-airbnb-typescript
[c31784c950561521d035]: https://qiita.com/park-jh/items/c31784c950561521d035
