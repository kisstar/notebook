(window.webpackJsonp=window.webpackJsonp||[]).push([[140],{554:function(a,s,e){"use strict";e.r(s);var t=e(62),r=Object(t.a)({},(function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"merge-和-rebase-的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#merge-和-rebase-的区别"}},[a._v("#")]),a._v(" Merge 和 Rebase 的区别")]),a._v(" "),e("p",[a._v("在 Git 中，分支实质上仅是包含所指对象校验和（长度为 40 的 SHA-1 值字符串）的文件，所以它的创建和销毁都异常高效，也因此基于分支的开发模式也十分流行。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("     D---E dev\n    /\nA---B master\n")])])]),e("h2",{attrs:{id:"merge"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#merge"}},[a._v("#")]),a._v(" Merge")]),a._v(" "),e("p",[a._v("当团队中的各个开发人员在不同的分支完成各自的开发任务后，就需要把修改合并到主干分支（master），我们可以 "),e("code",[a._v("git merge")]),a._v(" 命令来完成该目的：")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# on master")]),a._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" merge dev\n")])])]),e("p",[a._v("当试图合并两个分支时， 如果顺着一个分支走下去能够到达另一个分支，那么 Git 在合并两者的时候，只会简单的将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分歧——这就叫做 “快进（fast-forward）”。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("A---B---D---E master\n")])])]),e("p",[a._v("如果 master 分支所在提交并不是开发分支（dev）所在提交的直接祖先，Git 会使用两个分支的末端所指的快照（C4 和 C5）以及这两个分支的公共祖先（C2），做一个简单的三方合并。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("     D---E "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v("\n    /\nA---B---C---F master\n")])])]),e("p",[a._v("此次再合并和之前将分支指针向前推进所不同的是，Git 将此次三方合并的结果做了一个新的快照并且自动创建一个新的提交指向它。 这个被称作一次合并提交，它的特别之处在于他有不止一个父提交。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("     D--------E "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v("\n    /          "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\nA---B---C---F---G master\n")])])]),e("p",[a._v("注意：分支合入后，在 master 分支上 commit 将会按照时间先后的关系进行排列。")]),a._v(" "),e("h2",{attrs:{id:"rebase"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rebase"}},[a._v("#")]),a._v(" Rebase")]),a._v(" "),e("p",[a._v("除了使用 "),e("code",[a._v("git merge")]),a._v(" 命令外，还可以使用 "),e("code",[a._v("git rebase")]),a._v(" 命令将提交到某一分支上的所有修改都移至另一分支上：")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# on dev")]),a._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" rebase master\n")])])]),e("p",[a._v("变基时 Git 先找到这两个分支的共同祖先，然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件，再将当前分支指向目标基底 B, 最后以此将之前另存为临时文件的修改依序应用：")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("            master\nA---B---C---F---D"),e("span",{pre:!0,attrs:{class:"token string"}},[a._v("'---E'")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v("\n")])])]),e("p",[a._v("最后，再将变基后的 dev 分支合并到主干分支：")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# on master")]),a._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" merge dev\n")])])]),e("p",[a._v("此时，将会进行一次快进：")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("                        "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v("\nA---B---C---F---D"),e("span",{pre:!0,attrs:{class:"token string"}},[a._v("'---E'")]),a._v(" master\n")])])]),e("p",[a._v("注意：如果提交存在于你的仓库之外，而别人可能基于这些提交进行开发，那么不要执行变基。")]),a._v(" "),e("h2",{attrs:{id:"merge-vs-rebase"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#merge-vs-rebase"}},[a._v("#")]),a._v(" Merge vs Rebase")]),a._v(" "),e("p",[a._v("从上面的例子中可以看到 Merge 操作可能会生成一个新的节点，之前的提交也可能会分开显示。而 Rebase 操作不会生成新的节点，是将两个分支融合成一个线性的操作。")]),a._v(" "),e("p",[a._v("另外还有一种 Squash + Merge 的模式，它的工作方式类似于 Merge：")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# on master")]),a._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" merge --squash dev\n")])])]),e("p",[a._v("它并不会替你产生提交，只是把所有的改动合并，然后放在本地文件，需要你再次手动执行 "),e("code",[a._v("git commit")]),a._v(" 命令，所以内容的提交者也将会改为执行合并操作的人。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("A---B---C---F---G master\n")])])]),e("p",[a._v("由于 Rebase 保留了线性提交历史，并且不会改变提交者的信息，所以在回滚和定位问题时会显得比较方便。")]),a._v(" "),e("h2",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),e("p",[a._v("有一种观点认为，仓库的提交历史是记录实际发生过什么。它是针对历史的文档，本身就有价值，不能乱改。")]),a._v(" "),e("p",[a._v("另一种观点则正好相反，他们认为提交历史是项目过程中发生的事，应该使用 rebase 及 filter-branch 等工具来编写历史，怎么方便后来的读者就怎么写。")]),a._v(" "),e("p",[a._v("总的原则是，只对尚未推送或分享给别人的本地修改执行变基操作清理历史，从不对已推送至别处的提交执行变基操作。")])])}),[],!1,null,null,null);s.default=r.exports}}]);