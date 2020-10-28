# Homebrew

Mac 系统常用的软件安装工具就是 Homebrew, 记住其常用的命令对于提高我们的开发工作的效率很有帮助。

安装：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## 常用命令

更新（Homebrew 本身）：

```bash
brew update
```

查看已安装的：

```bash
brew list
```

搜索：

```bash
brew search ***
```

安装：

```bash
brew install ***
```

查看是否过时（查看是否有新版本）：

```bash
brew outdated
```

查看的信息：

```bash
brew info ***
```

更新：

```bash
brew upgrade ***
```

升级所有可以升级的：

```bash
brew upgrade
```

卸载：

```bash
brew uninstall ***
```

查看某个软件的依赖：

```bash
brew deps ***
```

查看所有软件的依赖，树形展示：

```bash
rew deps --installed --tree
```

查看可清理的旧版本包：

```bash
brew cleanup -n
```

清除无用的依赖和缓存：

```bash
brew cache clean
```

清理单个已安装软件包的历史版本：

```bash
brew cleanup ***
```

清理所有已安装软件包的历史老版本：

```bash
brew cleanup
```

查看指令：

```bash
brew help
```

查看完整指令帮助：

```bash
man brew
```

以默认浏览器打开官网：

```bash
brew home
```

## 参考

- [The Missing Package Manager for macOS (or Linux) — Homebrew](https://brew.sh/)
