# CPU

中央处理器（central processing unit，简称 CPU）是电子计算机的主要设备之一，电脑中的核心配件。

在计算机体系结构中，CPU 是对计算机的所有硬件资源（如存储器、输入输出单元） 进行控制调配、执行通用运算的核心硬件单元。计算机系统中所有软件层的操作，最终都将通过指令集映射为 CPU 的操作。

## CPU 架构

CPU 本身只是一个概念，每家芯片公司都有自己的具体实现。不同的 CPU 设计实现，就称为" CPU 架构"（CPU architecture）。

不同的 CPU 架构有不同的指令集，彼此不通用，这导致运行在上面的软件也不兼容，必须重新编译。如果没有做适配，一个架构下的软件就无法移植到另一个架构。

不同的 CPU 设计实现，就称为" CPU 架构"（CPU architecture）。 不同的 CPU 架构有不同的指令集，彼此不通用，这导致运行在上面的软件也不兼容，必须重新编译。如果没有做适配，一个架构下的软件就无法移植到另一个架构。

历史上，有过多种 CPU 架构。目前最常见的架构只剩下两种：x86 架构和 ARM 架构。

## x86 架构

<img :src="$withBase('/images/cp/basis/x86.jpg')" alt="x86">

x86 架构性能好，但是耗电多、电压高，主要用于桌面电脑和服务器，生产厂商为 Intel 公司和 AMD 公司。

x86 的特点是 CPU 的寄存器是 32 位的，因此也叫 32 位 CPU。基于 32 位 CPU 开发的操作系统就叫 32 位操作系统，因为目前 x86 架构在 32 位 CPU 的知名度，32 位操作系统也通常被称为 x86 系统。

X 与处理器没有任何关系，它是一个对所有 xx86 系统的简单的通配符定义，86 的也不一定为 32 位处理器，只是因为这些带 86 的 32 位处理器比较出名。

后来，AMD 领先 Intel 制造出了商用的兼容 x86 的 CPU，AMD 称之为 AMD64。

Intel 选择了设计一种不兼容 x86 的全新 64 为指令集，称之为 IA-64，最后也开始支持 AMD64 的指令集，但是换了个名字，叫 x86_64，表示是 x86 指令集的 64 扩展。

也就是说，实际上 x86_64，x64，AMD64 基本上是同一个东西，我们现在用的 intel/amd 的桌面级 CPU 基本上都是 x86_64。

## ARM 架构

<img :src="$withBase('/images/cp/basis/arm.jpg')" alt="ARM">

ARM 架构耗电小、电压低，但是单核性能不如 x86，主要用于移动设备。近几年，已经从移动设备向桌面电脑和服务器进军了。

苹果公司在 iPhone 和 iPad 上使用的芯片是 ARM 架构，而电脑的芯片主要是 x86 架构，不够现在 Mac 电脑也开始从 x86 架构改为 ARM 架构了。

## 其它架构

<img :src="$withBase('/images/cp/basis/mips.jpg')" alt="MIPS">

**MIPS** 是世界上很流行的一种 RISC 处理器。 MIPS 的意思是“无内部互锁流水级的微处理器”(Microprocessor without interlocked pipelined stages)，其机制是尽量利用软件办法避免流水线中的数据相关问题。

MIPS R 系列微处理器用于构建 SGI 的高性能工作站、服务器和超级计算机系统。在嵌入式方面，MIPS K 系列微处理器是目前仅次于 ARM 的用得最多的处理器之一（1999 年以前 MIPS 是世界上用得最多的处理器），其应用领域覆盖游戏机、路由器、激光打印机、掌上电脑等各个方面。

<img :src="$withBase('/images/cp/basis/LoongArch.png')" alt="LoongArch">

**龙芯**是中国科学院计算所自主研发的通用 CPU，采用自主 LoongISA 指令系统，兼容 MIPS 指令。

龙芯架构从整个架构的顶层规划，到各部分的功能定义，再到细节上每条指令的编码、名称、含义，在架构上进行自主重新设计，具有充分的自主性。

## 参考

- [苹果电脑为什么要换 CPU：Intel 与 ARM 的战争 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2020/06/cpu-architecture.html)
- [X86 和 X86_64 和 AMD64 的由来 - FlyWine 的 CSDN 博客](https://blog.csdn.net/wf19930209/article/details/79536506)
- [Linux 内核架构：CPU 架构详细介绍（图例解析） - 知乎](https://zhuanlan.zhihu.com/p/481536761)
