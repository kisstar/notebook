# Key Map

可能是按键习惯问题，或者...，不管出于什么原因，你可能希望屏蔽一些键盘上的按键，让它们失效，或者映射为其它按键。

比如默认的大小写切换键 Caps Lock，可能是使用 MacBook Pro 的原因，通常我会把它映射为 Control 键，因为使用小拇指按下原本的 Control 键实在是有些麻烦。

## 使用注册表

在 Windows 系统中，有很多软件工具可以实现上述的目的，不过如果你不希望借助工具，并且不怕麻烦的话，可以通过注册表办到。

**First**：

在开始菜单或者运行中输入 `regedit` 打开注册表编辑器，展开到 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout`。

在 Windows 10 新版本中可以直接复制到注册表地址栏按 Enter 键定位。

右键点击 Keyboard Layout，选择“新建 -> 二进制值”，命名为 Scancode Map。

<img :src="$withBase('/images/windows/key-map-regedit.png')" alt="key-map-regedit">

**Second**：

以屏蔽 Caps Lock 键为例，可以将 Scancode Map 的数据修改为下面一串数字：

```bash
00 00 00 00 00 00 00 00 02 00 00 00 00 00 3a 00 00 00 00 00
```

前面 8 对以及结尾 4 对 0，可以认为是固定格式。

`02 00 00 00` 则是指明了有多少个映射。这里为什么是 2 个映射呢？因为结尾的 4 对 0 也算一个，所以映射的数量总是实际映射数量加壹。

另外，由于数据需要填充成 4 对的形式，所以数量为 `00 00 00 02`，然后将它倒过来输入。注意同一对内的数字不要颠倒顺序。

如果你映射数量是 10 或者更多，则不要直接写 10，在 16 进制中只有 0 到 9，a 到 f（代表 10 到 15），16 进制的 10 转化为 10 进制，是 16。

而 `00 00 3a 00` 则是让 Caps Lock 失效的关键，它们分为 2 个部分，目的是把 `3a 00`（Caps Lock 键）映射为 `00 00`（空）。

这些数字被称为扫描码，Caps Lock 键的 16 进制扫描码是 `3a`，填充成 2 对，为 `00 3a`，然后倒序输入。

**Third**：

再举个例子，就是上面说的将 Caps Lock 键映射为右 Ctrl 键。

右 Ctrl 键的 16 进制扫描码为 `e0 1d`，Caps Lock 键的扫描码为 `3a`。按照上述组织数据的方法，最终需要填入的数据为：

```bash
00 00 00 00 00 00 00 00 02 00 00 00 1d e0 3a 00 00 00 00 00
```

<img :src="$withBase('/images/windows/key-map-scancodes.png')" alt="key-map-scancodes">

**End**：

修改完成后需要重新启动才会生效。此修改会影响所有用户，若要恢复，可以将 Scancode Map 删除。

## 键盘扫描码

<table>
  <thead>
    <tr>
      <th>键位</th>
      <th>扫描码</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ESC</td>
      <td>00 01</td>
    </tr>
    <tr>
      <td>TAB</td>
      <td>00 0F</td>
    </tr>
    <tr>
      <td>CapsLock</td>
      <td>00 3A</td>
    </tr>
    <tr>
      <td>左 Shift</td>
      <td>00 2A</td>
    </tr>
    <tr>
      <td>右 Shift</td>
      <td>00 36</td>
    </tr>
    <tr>
      <td>左 Alt</td>
      <td>00 38</td>
    </tr>
    <tr>
      <td>右 Alt</td>
      <td>E0 38</td>
    </tr>
    <tr>
      <td>左 Ctrl</td>
      <td>00 1D</td>
    </tr>
    <tr>
      <td>右 Ctrl</td>
      <td>E0 1D</td>
    </tr>
    <tr>
      <td>PrintScreen</td>
      <td>E0 37</td>
    </tr>
    <tr>
      <td>上矢印</td>
      <td>E0 48</td>
    </tr>
    <tr>
      <td>下矢印</td>
      <td>E0 50</td>
    </tr>
    <tr>
      <td>右矢印</td>
      <td>E0 4D</td>
    </tr>
    <tr>
      <td>左矢印</td>
      <td>E0 4B</td>
    </tr>
    <tr>
      <td>Insert</td>
      <td>E0 52</td>
    </tr>
    <tr>
      <td>Delete</td>
      <td>E0 53</td>
    </tr>
    <tr>
      <td>Home</td>
      <td>E0 47</td>
    </tr>
    <tr>
      <td>End</td>
      <td>E0 4F</td>
    </tr>
    <tr>
      <td>PageUp</td>
      <td>E0 49</td>
    </tr>
    <tr>
      <td>PageDown</td>
      <td>E0 51</td>
    </tr>
    <tr>
      <td>左 Win key</td>
      <td>E0 5B</td>
    </tr>
    <tr>
      <td>右 Win key</td>
      <td>E0 5C</td>
    </tr>
    <tr>
      <td>application</td>
      <td>E0 5D</td>
    </tr>
    <tr>
      <td>PAUSE</td>
      <td>00 45</td>
    </tr>
    <tr>
      <td>ScrollLock</td>
      <td>00 46</td>
    </tr>
  </tbody>
</table>

## 参考

- [Windows 系统屏蔽或重新映射任意键盘按键，如 Caps Lock - 小声推](https://www.xstui.com/read/771)
- [Keyboard scancodes: Keyboard scancodes](https://www.win.tue.nl/~aeb/linux/kbd/scancodes-1.html)
