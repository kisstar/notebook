# Storybook for React

Storybook 是一个用于 UI 开发的工具，它通过隔离组件使开发变得更快更容易。

通过 Storybook 你可以自动地对组件进行可视化测试，以防止出现错误。结合插件生态系统你可以做更多的事情，比如优化响应式布局或验证可访问性。

## Install

要使用 Storybook 你可以在现有的项目下执行下面的命令：

```bash
npx sb init
```

注意：`sb init` 命令不能在空项目下运行，它需要一个由框架（Create React App，Vue CLI 或则其它 ...）创建好的项目。

执行该命令会自动安装所需要的依赖，并添加默认的配置、必要的脚本命令，以及一些基础的 Story 案例以正常启动程序。

待一切准本就绪你可以使用下面的命令来查看效果：

```bash
npm run storybook
```

它将在本地启动 Storybook 并输出地址。根据您的系统配置，它会在一个新的浏览器标签中自动打开地址。

顺利的话，你将看到下面的画面：

<img :src="$withBase('/images/react/example-welcome.png')" alt="example-welcome">

你可以通过点击上面的链接来阅读更多关于 Storybook 的知识，进一步地了解如何配置和定制选项。

## Story

Story 是一个用于捕获 UI 组件的呈现状态的函数，你为每个组件编写多个 Story，描述组件可以支持的所有状态。

在提供的案列中，每个示例组件都有一组事例，显示它所支持的状态。您可以浏览 UI 中的 Story ，并在以 `.stories.js` 或 `.stories.ts` 结尾的文件中查看它们背后的代码。

示例中的 Story 都是用 `Component Story Format` 格式编写的，CSF 是一种基于 ES6 模块的标准，用于编写组件示例。

利用 Storybook 的 [args][args] 概念（以机器可读的方式描述按钮的参数），可以动态改变和组合参数：

```js
// We create a “template” of how args map to rendering
const Template = args => <Button {...args} />

// Each story then reuses that template
export const Primary = Template.bind({})

Primary.args = {
  primary: true,
  label: 'Button',
}
```

使用 `args` 之后，按钮的相关参数可以在控件选项卡中动态的编辑。

## Browse Stories

每个以 `.stories.js` 或 `.stories.ts` 结尾的文件中定义了一个组件的所有故事。每个故事都有一个相应的侧边栏条目，当你点击一个故事，它呈现在画布上（一个独立的 iframe）。

通过在侧边栏点击故事或使用键盘快捷键可以故事之间快速跳转。

另外，Storybook 还提供了一些节省时间的工具，在工具栏中包含的工具允许您调整故事在画布中呈现的方式。

<img :src="$withBase('/images/react/tollbar.png')" alt="tollbar">

同时，与画布并列的 Docs 选项卡显示了自动生成的关于组件的文档(从源代码推断)。在与团队共享可重用组件时，使用文档非常有用。

<img :src="$withBase('/images/react/docs.png')" alt="docs">

工具栏是可定制的，可以使用全局变量快速切换主题和语言，或者从社区安装 Storybook 工具栏 Addons 来启用高级工作流。

Addons 是扩展 Storybook 核心功能的插件。你可以在 `addons` 面板中找到它们，这是 Storybook UI 在 Canvas 下一个预留的位置，每个选项卡显示插件为所选故事生成的元数据、日志或静态分析。

<img :src="$withBase('/images/react/addons.png')" alt="addons">

**Controls**：允许您与组件的参数进行动态交互。

**Actions**：帮助您验证交互是否通过回调生成正确的输出。例如，如果您查看头组件的“登录”情况，我们可以验证单击“注销”按钮是否会触发 onLogout 回调，该回调将由使用头的组件提供。

## Write Stories

为一个组件编写 Story 时，可以在同目录下创建一个同名的以 `.stories.js|ts` 结尾的文件，Story 文件仅用于开发。

在 Story 文件中默认导出的元数据将控制 Storybook 如何列出你的故事，以及提供插件使用的信息。

```js
// Button.stories.js

import React from 'react'
import { Button } from './Button'

// metadata
export default {
  title: 'Components/Button',
  component: Button,
}
```

定义组件的 Story 需要使用 CSF 文件的命名导出，您可以重命名您需要的任何特定故事。例如，给它一个更清晰的名字：

```js
// Button.stories.js

import React from 'react'
import { Button } from './Button'

export const Primary = () => <Button primary label="Button" />

// rename Primary to New Name
Primary.storyName = 'New Name'
```

你可以在文件中像导出 Primary Story 一样导出更多的 Story，但这存在一些重复的工作，为此你可以借助 `args` 通过为组件的故事定义一个主模板来优化此模式。

```js
// Button.stories.js

// We create a “template” of how args map to rendering
const Template = (args) => <Button {...args} />;

// Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { background="#ff0",  label: 'Button' };

export const Secondary = Template.bind({});
Secondary.args = {  ...Primary.args,  label: 'Submit' };
```

Args 的指定也可以是组件级别的，如果你在组件级别定义 `args`，除非将其覆盖，否则此类参数将适用于组件的所有故事。

```js
// Button.stories.js

import React from 'react'
import Button from './Button'

export default {
  title: 'Button',
  component: Button,
  args: {
    // Now all Button stories will be primary.
    primary: true,
  },
}
```

### Parameters

Parameters 是 Storybook 定义 Story 的静态元数据的方法，通常用于控制 Storybook 功能和插件的行为。故事的参数可用于在一个故事或一组故事的级别为各种附加组件提供配置。

例如，我们可以使用 `parameters.backgrounds` 定义在选择故事时定义哪些背景出现在背景工具栏中：

```js
// Button.story.js

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button',
}
Primary.parameters = {
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
    ],
  },
}
```

组件级的配置方式与 Args 的配置类似，同时你还可以进行全局性的配置，这将在所有的 Story 中生效：

```js
// .storybook/preview.js

export const parameters = {
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
    ],
  },
}
```

如果同时设置了全局、组件和 Story 级别的 Parameters，那么 Story 参数会覆盖组件参数，而组件参数会覆盖全局参数。

另外需要注意的是不同级别的 Parameters 只能被覆盖而不会被丢弃，这意味着可以逐层覆盖单个特定的子参数，但仍保留全局定义的大多数参数。

### Decorators

Decorators 是一种用额外的 “rendering” 功能包装 Story 的方法。

组件创建时通常会假设它们呈现的位置，您的样式可能需要主题或布局包装，或者您的 UI 可能期望某些上下文或数据提供程序。一个简单的例子是为一个 Story 提供边距：

```js
// Button.stories.js

export const Primary = …
Primary.decorators = [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
```

Decorators 的配置也可以是组件级和全局的，要为所有的 Story 工作你可以在 `.storybook/preview.js` 文件中进行设置：

```js
import React from 'react'

export const decorators = [
  Story => (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  ),
]
```

当我们同时指定多个级别的 Decorators 时，所有装饰器将按以下顺序运行：全局 -> 组件 -> Story 装饰器。

### Naming components and hierarchy

您可以在默认导出的数据中通过指定 `title` 属性的值来控制着边栏中显示的名称。

```js
// Button.stories.js

export default {
  title: 'Button',
}
```

你还可以在可扩展界面中对相关组件进行分组，以帮助 Storybook 进行组织。为此，请使用 `/` 作为分隔符：

```js
// Button.stories.js

export default {
  title: 'Design System/Common/Button',
}
```

默认情况下，Story 按导入顺序排序。你可以通过在 `.storybook/preview.js` 文件中覆盖 Parameters 的 `options.storySort` 字段来修改这一行为：

```js
export const parameters = {
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
}
```

`options.storySort` 也可以是一个对象：

```js
// .storybook/preview.js

export const parameters = {
  options: {
    storySort: {
      method: '',
      order: [],
      locales: '',
    },
  },
}
```

| Field | Type | Description | Required | Default Value | Example |
| :-- | :-- | :-- | :-- | :-- | :-- |
| method | String | Tells Storybook in which order the stories are displayed | No | Storybook configuration | 'alphabetical' |
| order | Array | The stories to be show, ordered by supplied name | No | Empty Array [] | ['Intro', 'Components'] |
| locales | String | The locale required to be displayed | No | System locale | en-US |

要使用自定义列表对故事进行排序，可以使用 `order` 数组，与 `order` 列表中的项目不匹配的故事将出现在列表中的项目之后。

## Writing Docs

DocsPage 在 Storybook 中是零配置的默认文档，它将您的 Story，文本描述，`docgen` 注释，`args` 表和代码示例聚合到每个组件的单个页面中。

Storybook 使用 Story 文件默认导出中的 `component` 键来提取组件的属性和描述：

```js
// MyComponent.stories.js

import { MyComponent } from './MyComponent'

export default {
  title: 'MyComponent',
  component: MyComponent,
}
// your templates and stories
```

有时候一些组件是组合使用的，单独存在可能没有任何意义。此时，你可以通过 `subcomponents` 字段来指定相关的组件：

```js
// ButtonGroup.stories.js

import { Button, ButtonGroup } from '../ButtonGroup'

export default {
  title: 'Path/to/ButtonGroup',
  component: ButtonGroup,
  subcomponents: { Button },
}
```

子组件参数表格将与主要组件一起显示在选项卡式界面中。选项卡标题将与子组件对象的键相对应。

### Replacing DocsPage

你可以通过覆盖 `docs.page` 的值在整个 Storybook 中替换默认的 DocsPage 模版，主要包括以下几种形式：

- 使用 `null` 删除文档。
- 使用 MDX 文档。
- 带有自定义组件。

覆盖的方式包括 Story 级、组件级和全局三种方式，全局覆盖你需要在 `.storybook/preview.js` 中进行修改：

```js
// .storybook/preview.js

export const parameters { docs: { page: null } });
```

### Remixing DocsPage using doc blocks

Doc blocks 是 Storybook Docs 的基础构建块，如果要对默认的 DocsPage 进行较小的自定义，但又不想编写自己的 MDX，则可以重新混合 DocsPage。

```js
// Button.stories.js

import React from 'react'

import {
  Title,
  Subtitle,
  Description,
  Primary,
  Props,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'

import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
}
```

借此您可以重新排序，添加或省略文档块，而不会失去 Storybook 的自动 `docgen` 功能。

### MDX

MDX 是一个结合了 Markdown 和 JSX 的[标准文件格式][mdx]。这意味着您可以在文档中使用 Markdown 的简洁语法，以及在文件中的任意位置自由嵌入 JSX 组件。

```js
<!--- Checkbox.stories.mdx -->

import { Meta, Story, Canvas } from '@storybook/addon-docs/blocks';
import { Checkbox } from './Checkbox';

<Meta title="MDX/Checkbox" component={Checkbox} />

# Checkbox

With `MDX` we can define a story for `Checkbox` right in the middle of our
Markdown documentation.

<!--- This is your Story template function, shown here in React -->

export const Template = (args) => <Checkbox {...args} />

<Canvas>
  <Story name="Unchecked" args={{
      label: 'Unchecked'
    }}>
    {Template.bind({})}
   </Story>
  <Story name="Checked" args={{
      label: 'Unchecked',
      checked: true
    }}>
    {Template.bind({})}
   </Story>
</Canvas>
```

通过给 Meta 组件传递 `parameters` 和 `decorators` 属性可以在 MDX 中添加装饰器和参数 P。

### Doc Blocks

Doc Blocks 是 Storybook 文档页面的基础。默认，DocsPage 使用以下块的组合自动为您的每个组件构建一个页面。

#### ArgsTable

Storybook 文档会自动为支持的框架中的组件生成组件 ArgsTable，这些表列出了参数（[args][args] 的简称），甚至与 [controls][controls] 结合允许您更改当前渲染的故事的参数。

你可以在组件中通过对属性进行注释，以此让 Storybook 提取到更多有用的信息：

```js
// Button.js

import React from 'react'
import PropTypes from 'prop-types'

export default function Button({ isDisabled, content }) {
  return (
    <button type="button" disabled={isDisabled}>
      {content}
    </button>
  )
}

Button.propTypes = {
  /**
   Checks if the button should be disabled
  */
  isDisabled: PropTypes.bool.isRequired,
  /**
  The display content of the button
  */
  content: PropTypes.string.isRequired,
}
```

同时，你也可以对 ArgsTables 进行自定义：

```js
// Button.stories.js

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    label: {
      description: 'overwritten description',
      table: {
        type: {
          summary: 'something short',
          detail: 'something really really long',
        },
      },
      control: {
        type: null,
      },
    },
  },
}
```

ArgsTable 中控件的配置方式与 [controls][controls] 插件面板非常相似，它在幕后使用相同的组件和机制。

#### Source

如果要自定义显示 Story 的源代码片段，请设置 `docs.source.code` 参数：

```js
// Button.stories.js

export const CustomSource = () => Template.bind({});

CustomSource.parameters = {
    docs: {
        source: {
            code: 'Some custom string here';
        }
    },
};
```

关于组件的说明会自动从其源代码中位于组件上方的 `docgen` 中提取。也可以通过 `docs.description` 参数设置。

## 发布

您可以像发布文档一样发布您的 Storybook，在初始化时我们已经将相关的命令作为脚本包含在了 `package.json` 文件中：

```json
{
  "scripts": {
    "build-storybook-docs": "build-storybook -s public -o ./dist"
  }
}
```

更多详细说明请阅读 [官方文档](https://storybook.js.org/)。

[args]: https://storybook.js.org/docs/react/writing-stories/args
[controls]: https://storybook.js.org/docs/react/essentials/controls
[mdx]: https://mdxjs.com/
