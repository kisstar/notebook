# Linux 系统(Ubuntu)安装

Linux，一个基于 POSIX 和 UNIX 的多用户、多任务、支持多线程和多 CPU 的操作系统。

## 前提

借助 VMware Workstation Pro，您可以在同一台 `Windows` 或 `Linux PC` 上同时运行多个操作系统。创建真实的 `Linux` 和 `Windows` 虚拟机以及其他桌面、服务器和平板电脑环境（包括可配置的虚拟网络连接和网络条件模拟），用于代码开发、解决方案构建、应用测试、产品演示等。

前往下载 [VMware Workstation](https://www.vmware.com/products/workstation-pro/workstation-pro-evaluation.html)

Ubuntu（友帮拓、优般图、乌班图）是一个以桌面应用为主的开源 `GNU/Linux` 操作系统，基于 `Debian GNU/Linux`，支持 `x86`、`amd64`（即 x64）和 `ppc` 架构，由全球化的专业开发团队（Canonical Ltd）打造的。

前往下载 [Ubuntu](https://www.ubuntu.com/download)

## 安装 VMware

按照上面给出的连接地址下载软件的安装程序，并点击安装。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-one.png')" alt="LinuxSystemInstallation-one">

点击下一步，如果你已经安装过 `VMware` 会提示以下图片中的信息，此时我们可以选择对安装选项进行更改，当我们需要卸载 `VMware` 时，就可以通过此方法。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-one-one.png')" alt="LinuxSystemInstallation-one-one">

正常情况下，我们首次安装时，只需要如下一直点击下一步即可。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-two.png')" alt="LinuxSystemInstallation-two">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-threen.png')" alt="LinuxSystemInstallation-threen">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-four.png')" alt="LinuxSystemInstallation-four">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-five.png')" alt="LinuxSystemInstallation-five">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-six.png')" alt="LinuxSystemInstallation-six">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-seven.png')" alt="LinuxSystemInstallation-seven">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-enight.png')" alt="LinuxSystemInstallation-enight">

建议：不要把安装路径放在 C 盘。

在安装完成后我们可以点击完成，也可以直接点击许可证立即输入 [激活码](https://blog.csdn.net/felix__h/article/details/82853501)。

## 安装虚拟机

首先我们来打开上面安装好的 `VMware`，并点击创建新的虚拟机。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-1.png')" alt="LinuxSystemInstallation-1">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-2.png')" alt="LinuxSystemInstallation-2">

自定义和典型配置区别不大，所以我们这里直接选择典型，自定义的虚拟机大家以后可以一起摸索。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-3.png')" alt="LinuxSystemInstallation-3">

如果选择图中的安装程序光盘映像文件，那么将会采取最小化安装，也就是简化安装，安装过程将会进行自动化安装，不建议。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-4.png')" alt="LinuxSystemInstallation-4">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-5.png')" alt="LinuxSystemInstallation-5">

同样，安装路径不建议放在 C 盘。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-6.png')" alt="LinuxSystemInstallation-6">

分配的空间一般 20 个 G 就够了，当然没有 20 个 G 的空间直接点击下一步也没有问题，因为分配的是最大空间，并不会立即被占用，实际上需要占用多少空间就是多少，但不会超过你设置的上限。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-7.png')" alt="LinuxSystemInstallation-7">

这里我们可以选用默认的硬件配置，也可以自定义硬件配置，其中网络适配器需要设置为桥接模式，可以参考该 [视频](https://www.imooc.com/video/3242)。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-8.png')" alt="LinuxSystemInstallation-8">

现在我们的第一个虚拟机创建成功了，虽然它只是一个空壳。

值得一提的是虚拟机具有快照和克隆的功能，这也是我们初学者选择虚拟机而非双系统的原因。

**快照的含义：对某一个特定文件系统在某一个特定时间内的一个具有只读属性的镜像。**

当你需要重复的返回到某一系统状态，又不想创建多个虚拟机的时候，就可以使用快照功能。另外当我们系统崩溃时，也可以选择回到相应的快照，这对于初学者来说非常有利。

克隆和快照功能很相像，分为完整克隆和链接克隆。

**完整克隆是和原始虚拟机完全独立的一个拷贝，它不和原始虚拟机共享任何资源。 可以脱离原始虚拟机独立使用。 而链接克隆则是和原始虚拟机共享同一虚拟磁盘文件，不能脱离原始虚拟机独立运行。**

链接克隆与完整克隆相比，缩短了创建克隆虚拟机的时间，同时还节省了宝贵的物理磁盘空间。

## 安装 Ubantu

在安装 `Ubantu` 之前，我们需要了解一下系统分区的相关概念，在系统当中主分区最多只能有四个，扩展分区最多只能有一个，因为扩展分区是由主分区划分出来充当的，所以扩展分区加上主分区只能是四个。在扩展分区里我们不能存入数据，只能将其划分为逻辑分区。

为了可以写入文件系统，初始时我们是要对磁盘进行格式化的。

格式化并不是为了删除所有的数据，而是为了写入文件系统(FAT16-最大支持 2 个 G 的分区、FAT32-单个文件不能超过 4 个 G、NTFS（Linux 中为 EXT2、EXT3、EXT4）)，主要工作将空间划做一个个小块，并建立一个文件目录表，记录储存数据的 Inode(ID)、权限、修改时间、和位于哪个块。

但是为了完成上述的操作，我们需要一个干净的空间，所以在这之前我们会清空所有数据，这只是附带的，而不是我们原本的目的。

分区号 1、2、3、4 只能给主分区或扩展分区使用，即使没有分够 4 个，逻辑分区的分区号也只能从 5 开始。

在 `Windows` 中的分配盘符对应 `Linux` 中的挂载，必须挂载的包括根分区和 `swap` 分区（对于内存不大于 4G 的电脑，该分区分配为内存的两倍，否则与内存大小相同）。

推荐挂载 `/boot`（启动分区，200M），如果不挂载，当把其所处分区占满时，可能导致系统无法启动。

通过了解了上面的基本知识后我们通过点击 `VMware` 上面绿色的开启按钮开机，继续进行安装。当我们不再使用时，记得先挂起该虚拟机或挂机后再关闭 `VMware`，直接关闭会导致系统崩溃。

点击开启虚拟机后应快速点击虚拟机然后按 `F2` 键，进入 BIOS 界面来修改启动顺序，因为默认的启动顺序是硬盘位于光盘前面。另外按住 `Ctrl + alt` 可以退出虚拟机。由于虚拟机上会自动判断，所以这里我们不需要进行此操作，但在实体机上必须如此操作。

所以通过虚拟机安装，我们只需要在点击开启后进行等待，直到出现如下的图片，然后根据提示继续操作。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-9.png')" alt="LinuxSystemInstallation-9">

这里可以选择我们需要安装语言，这里我们选择英语，然后回车。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-10.png')" alt="LinuxSystemInstallation-10">

选择键盘，默认的标准美式键盘，直接回车。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-11.png')" alt="LinuxSystemInstallation-11">

在安装程序类型上，您可以选择以下内容：安装 `Ubuntu`、安装 MAAS 裸机云（区域）、安装 MAAS 裸机云（机架）。

MAAS 是 Metal As A Service，它可以让您处理物理服务器，如云中的虚拟机。MAAS 允许您将裸机服务器作为弹性云类资源进行管理，而不必单独管理每个服务器。这有几个优点，例如快速配置和销毁实例，就像在 AWS，GCE 和 Azure 等公共云中一样。

此次安装选择了直接安装 `Ubantu`。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-12.png')" alt="LinuxSystemInstallation-12">

当在电脑的网络适配器中启用 `VirtualBox Host-Only Network` 时，在这里会出现下面这样的情况。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-13.png')" alt="LinuxSystemInstallation-13">

对其禁用后重新按照之前的步骤安装系统，再次点击会进入如下所示。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-14.png')" alt="LinuxSystemInstallation-14">

配置代理服务器地址，直接下一步即可。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-15.png')" alt="LinuxSystemInstallation-15">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-16.png')" alt="LinuxSystemInstallation-16">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-17.png')" alt="LinuxSystemInstallation-17">

接下来面开始对磁盘空间进行分区。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-18.png')" alt="LinuxSystemInstallation-18">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-19.png')" alt="LinuxSystemInstallation-19">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-20.png')" alt="LinuxSystemInstallation-20">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-21.png')" alt="LinuxSystemInstallation-21">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-22.png')" alt="LinuxSystemInstallation-22">
<img :src="$withBase('/images/linux/LinuxSystemInstallation-23.png')" alt="LinuxSystemInstallation-23">

启动分区。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-24.png')" alt="LinuxSystemInstallation-24">

设置用户凭据。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-25.png')" alt="LinuxSystemInstallation-25">

选择要安装的流行 SNAPS，然后确认。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-26.png')" alt="LinuxSystemInstallation-26">

等待安装完成。

<img :src="$withBase('/images/linux/LinuxSystemInstallation-27.png')" alt="LinuxSystemInstallation-27">

到这里我们的系统就安装好啦。
