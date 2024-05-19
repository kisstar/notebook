(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{474:function(v,_,a){"use strict";a.r(_);var t=a(62),s=Object(t.a)({},(function(){var v=this,_=v.$createElement,a=v._self._c||_;return a("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[a("h1",{attrs:{id:"面向对象设计"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#面向对象设计"}},[v._v("#")]),v._v(" 面向对象设计")]),v._v(" "),a("p",[v._v("变化是复用的天敌，面向对象设计最大的优势在于：抵御变化！")]),v._v(" "),a("h2",{attrs:{id:"为什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么"}},[v._v("#")]),v._v(" 为什么？")]),v._v(" "),a("p",[v._v("重新认识面向对象：")]),v._v(" "),a("ul",[a("li",[v._v("理解隔离变化：从宏观层面来看，面向对象的构建方式更能适应软件的变化，能将变化所带来的的影响减为最小")]),v._v(" "),a("li",[v._v("各司其职\n"),a("ul",[a("li",[v._v("从微观层面来看，面向对象的方式更强调各个类的“责任”")]),v._v(" "),a("li",[v._v("由于需求变化导致的新增类型不应该影响原来类型的实现-是所谓各负其责")])])]),v._v(" "),a("li",[v._v("对象是什么？\n"),a("ul",[a("li",[v._v("从语言层面来看，对象封装了代码和数据")]),v._v(" "),a("li",[v._v("从规格面讲，对象是一系列可被使用的公共接口")]),v._v(" "),a("li",[v._v("从概念层面讲，对象是某种拥有责任的抽象")])])])]),v._v(" "),a("h2",{attrs:{id:"原则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#原则"}},[v._v("#")]),v._v(" 原则")]),v._v(" "),a("h3",{attrs:{id:"依赖倒置原则-dip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#依赖倒置原则-dip"}},[v._v("#")]),v._v(" 依赖倒置原则（DIP）")]),v._v(" "),a("ul",[a("li",[v._v("高层模块（稳定）不应该依赖于底层模块（变化），二则都应该依赖于抽象")]),v._v(" "),a("li",[v._v("抽象（稳定）不应该依赖于实现细节（变化），实现细节应该依赖于抽象（稳定）")])]),v._v(" "),a("p",[v._v("白话：稳定可依赖稳定，变化可依赖稳定")]),v._v(" "),a("h3",{attrs:{id:"开放封闭原则-ocp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#开放封闭原则-ocp"}},[v._v("#")]),v._v(" 开放封闭原则（OCP）")]),v._v(" "),a("ul",[a("li",[v._v("对扩展开放，对更改封闭")]),v._v(" "),a("li",[v._v("类模块应该是可扩展的，但是不可修改")])]),v._v(" "),a("h3",{attrs:{id:"单一职责原则-srp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#单一职责原则-srp"}},[v._v("#")]),v._v(" 单一职责原则（SRP）")]),v._v(" "),a("ul",[a("li",[v._v("一个类应该仅有一个引起它变化的原因")]),v._v(" "),a("li",[v._v("变化的方向隐含着类的责任")])]),v._v(" "),a("h3",{attrs:{id:"liskov-替换原则-lsp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#liskov-替换原则-lsp"}},[v._v("#")]),v._v(" Liskov 替换原则（LSP）")]),v._v(" "),a("ul",[a("li",[v._v("子类必须能够替换它们的基类")]),v._v(" "),a("li",[v._v("继承表达类型抽象")])]),v._v(" "),a("h3",{attrs:{id:"接口隔离原则-isp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#接口隔离原则-isp"}},[v._v("#")]),v._v(" 接口隔离原则（ISP）")]),v._v(" "),a("ul",[a("li",[v._v("不应该强迫客户程序依赖它们不用的方法")]),v._v(" "),a("li",[v._v("接口应该小而完备")])]),v._v(" "),a("h3",{attrs:{id:"优先使用对象组合-而不是类继承"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优先使用对象组合-而不是类继承"}},[v._v("#")]),v._v(" 优先使用对象组合，而不是类继承")]),v._v(" "),a("ul",[a("li",[v._v("类继承通常为“白箱复用”，对象组合通常为“黑箱复用”")]),v._v(" "),a("li",[v._v("继承在某种程度上破坏了封装性，子类父类耦合度高")]),v._v(" "),a("li",[v._v("而对象组合只要求被组合的对象具有良好定义的接口，耦合度低")])]),v._v(" "),a("h3",{attrs:{id:"封装变化点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#封装变化点"}},[v._v("#")]),v._v(" 封装变化点")]),v._v(" "),a("ul",[a("li",[v._v("使用封装来创建对象之间的分界层，让设计者可以在分界层的一侧进行修改，而不会对另一侧产生不良的影响，从而实现层次间的松耦合")])]),v._v(" "),a("h3",{attrs:{id:"针对接口编程-而不是针对实现编程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#针对接口编程-而不是针对实现编程"}},[v._v("#")]),v._v(" 针对接口编程，而不是针对实现编程")]),v._v(" "),a("ul",[a("li",[v._v("不将变量类型声明为某个特定的具体类，而是声明为某个接口")]),v._v(" "),a("li",[v._v("客户程序无需获知对象的具体类型，只需要知道对象所具有的接口")]),v._v(" "),a("li",[v._v("减少系统中各部分的依赖关系，从而实现，“高内聚，松耦合”的类型设计方案")])]),v._v(" "),a("h2",{attrs:{id:"将设计原则提升为设计经验"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#将设计原则提升为设计经验"}},[v._v("#")]),v._v(" 将设计原则提升为设计经验")]),v._v(" "),a("ul",[a("li",[v._v("设计习语：描述与特定编程语言相关的底层模式、技巧和惯用法")]),v._v(" "),a("li",[v._v("设计模式：描述类与相互通信的对象之间的组织关系，包括它们的角色、职责和协作方式等方面")]),v._v(" "),a("li",[v._v("架构模式：描述系统中与基本组织关系密切的高层模式，包括子系统划分、职责，以及如何组织它们之间关系的规则")])])])}),[],!1,null,null,null);_.default=s.exports}}]);