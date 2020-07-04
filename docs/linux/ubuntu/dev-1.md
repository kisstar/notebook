# 搭建开发环境（二）

记录如何搭建基本开发环境。

## 设置淘宝镜像

在使用 Nvm 安装时，我们可以通过淘宝镜像进行安装，只需要执行：

```bash
NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node nvm install <v4.5.0>
```

当然，这样每次安装都需要输入这么唱的命令比较麻烦，因此我们对此进行设置，因为系统每次启动系统的时候会去执行 `nvm.sh` 文件，所以我们在 `~/.bashrc` 文件的最后加上上面语句中的内容并重启终端：

```bash
export NVM_DIR="/root/.nvm"
# 下面是新加的内容
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
```

另外我们也可以通过安装 `nrm` 来对 `npm` 源进行有效的管理，这里我们可以 直接通过 `npm` 来进行安装：

```bash
npm install nrm -g
```

也许我们在通过 `npm` 安装 `nrm` 时反应就比较慢，甚至无反应，此时我们可以直接通过以下命令来直接设置为淘宝源：

```bash
npm config set registry https://registry.npm.taobao.org
```

## 安装 Google

将下载源加入到系统的源列表：

```bash
sudo wget http://www.linuxidc.com/files/repo/google-chrome.list -P /etc/apt/sources.list.d/
```

导入谷歌软件的公钥，用于下面步骤中对下载软件进行验证：

```bash
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub  | sudo apt-key add -
```

对当前系统的可用更新列表进行更新：

```bash
sudo apt-get update
```

执行对谷歌 Chrome 浏览器（稳定版)的安装：

```bash
sudo apt-get install google-chrome-stable
```

启动谷歌 Chrome 浏览器（固定：在 Launcher 上的图标上右键——“添加到收藏夹”）：

```bash
/usr/bin/google-chrome-stable
```

## 安装中文输入法

由于搜狗输入法依赖 `fcitx`，所以首先对其进行安装：

```bash
sudo apt install fcitx-bin
```

接下来直接安装输入法：

```bash
sudo apt install fcitx-table
```

安装完成之后我们需要进行相应的设置，在设置之前先重启一下，然后在系统设置里将键盘输入法系统改为 `fcitx`，并在 `fcitx` 设置中选择需要的输入法。

输入法的安装由于是第一次安装，所以相关的操作比较混乱，介绍比较模糊，具体的安装步骤可以参考 [Ubuntu 18.04 添加中文输入法](https://blog.csdn.net/rznice/article/details/79841790) 和 [解决Ubuntu 18.04中文输入法的问题，安装搜狗拼音](https://blog.csdn.net/fx_yzjy101/article/details/80243710)。

由于我在安装 `Ubuntu` 系统时选择的是中文，所以中文输入法的使用只需要通过右上角来切换并可以直接使用。

## 安装 Vim

```bash
sudo apt-get install vim
```

## 安装 yarn

前面我们已经安装过了 `Npm`，为什么这里还要安装 `Yarn` 呢？

首先 `Yarn` 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。

其次在执行代码之前，`Yarn` 会通过算法校验每个安装包的完整性，所以更加安全。

最后，使用详细、简洁的锁文件格式和明确的安装算法，`Yarn` 能够保证在不同系统上无差异的工作，所以更加可靠。

参见官方介绍的安装方法我们需要依次执行以下几条步骤：

安装 `curl`，一个利用 URL 语法在命令行下工作的文件传输工具：

```bash
kbd apt install curl
```

在 `Debian` 或 `Ubuntu` 上，需要用我们的 `Debian` 包仓库来安装 `Yarn`。 首先需要配置仓库：

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

最后，更新数据库列表并安装 yarn：

```bash
sudo apt update && sudo apt install yarn
```

安装完成后我们可以通过运行命令来测试 `Yarn` 是否安装：

```bash
yarn --version
```

之前我们在安装 `npm` 后为其安装了 `nrm`(一个 NPM 源管理器，允许你快速地在如下 NPM 源间切换)，对应的 `yarn` 也拥有与之对应的源管理工具 `yrm`。

现在我们就来对它也进行安装：

```bash
npm install -g yrm
```

当然，两个分别拥有自己的源管理工具，大家可能会觉得麻烦，这里推荐另外一个双源管理工具 `cgr`，其安装命令也特别简单：

```bash
npm install -g cgr
```

几个源管理工具的使用方法都很类似，使用起来非常方便。需要哪个，全凭个人啦。

## buntu Dock

开启 `Ubuntu Dock`（位于屏幕左侧的任务栏）点击切换最大和最小化，在终端允许：

```bash
gsettings set org.gnome.shell.extensions.dash-to-dock click-action 'minimize'
```

## 安装 VSCode

首先需要去 官网 下载对应的 `.deb` 文件。然后执行命令：

```bash
sudo apt install ./<file>.deb
```

需要注意的是执行命令时，对刚刚下载好的文件的使用需要改为你当前位置的相对路径或它的绝对路径。

等到 VSCode 安装完成后我们可以到应用程序中找到它来使用，或者直接使用命令 `code` 来执行。

## sublime text 3

首先安装 GPG 密钥，等待返回 `ok`：

```bash
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
```

确保 `apt` 已设置为使用 `https` 源：

```bash
sudo apt-get install apt-transport-https
```

选择安装稳定版：

```bash
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
```

更新仓库列表：

```bash
sudo apt-get update
```

安装 Sublime Text：

```bash
sudo apt-get install sublime-text
```

等到 `sublime-text` 安装完成后我们可以到应用程序中找到它来使用，或者直接使用命令 `subl` 来执行。

### 配置 sublime text 3 配合 React 进行开发

安装 `babel-sublime` 译支持 `ES6`， `React.js`, `jsx` 代码高亮。

* `ctrl+shift+p` 打开命令输入框，输入 `install`
* 选择 `install package` 输入 `babel` 进行安装
* 安装完成后打开 `.js`或`.jsx` 后缀的文件
* 然后打开菜单`view`， Syntax -> Open all with current extension as... -> Babel -> JavaScript (Babel)
* 选择 `babel` 为默认 `javascript` 打开 `syntax`，这样就实现了对 `jsx` 语法的支持。

安装 `sublimeLinter-jsxhint` 实现 `JSX` 代码审查，实时提示语法错误.

* 按照上面同样的步骤安装 `sublimeLinter-jsx`，然后我们还需要通过 `npm` 来全局安装 `jsxhint` 这个包。

安装 `JsFormat` 格式化 `js` 代码，以同样的步骤安装 `JsFormat`，安装完成后对其进行简单的配置：

* 打开 preferences -> Package Settings -> JsFormat -> Setting - Users，输入以下代码：

```json
{
    "e4x": true, // 支持 jsx
    // jsformat options
    "format_on_save": true // 保存时自动格式化
}
```

解决 `Ubuntu下Sublime Text 3` 无法输入中文，点击 [查看](https://github.com/lyfeyaj/sublime-text-imfix) 根据提示进行安装即可。

到这里开发环境的基本搭建就算结束了，如果有时间和新的发现，我会继续在这里更新，以记录和分享开发的点滴。
