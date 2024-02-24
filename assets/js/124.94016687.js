(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{536:function(s,e,t){"use strict";t.r(e);var a=t(62),n=Object(a.a)({},(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"permission-denied"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#permission-denied"}},[s._v("#")]),s._v(" Permission denied")]),s._v(" "),t("h2",{attrs:{id:"git-gitee-com-permission-denied-publickey"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#git-gitee-com-permission-denied-publickey"}},[s._v("#")]),s._v(" git@gitee.com: Permission denied (publickey)")]),s._v(" "),t("p",[s._v("客户端存在多个 SSH-Key，一个用于 GitHub，一个用于 gitee。")]),s._v(" "),t("p",[s._v("针对不同的服务器未设置对应使用的私钥时，执行下面的测试命令报错：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" -T git@gitee.com\ngit@gitee.com: Permission denied "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("publickey"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(".\n")])])]),t("p",[t("strong",[s._v("How to fix？")])]),s._v(" "),t("p",[s._v("根据需要生成多个 SSH-Key。")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# for github")]),s._v("\nssh-keygen -t rsa -C "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xxxxx@company.com'")]),s._v(" -f ~/.ssh/gitee_id_rsa\n")])])]),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# for gitee")]),s._v("\nssh-keygen -t rsa -C "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'xxxxx@qq.com'")]),s._v(" -f ~/.ssh/github_id_rsa\n")])])]),t("p",[s._v("将对应的公钥添加到服务器上。")]),s._v(" "),t("p",[s._v("然后，在 "),t("code",[s._v("~/.ssh")]),s._v(" 目录下的 "),t("code",[s._v("config")]),s._v(" 文件中（不存在则创建），添加如下内容：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gitee")]),s._v("\nHost gitee.com\nHostName gitee.com\nPreferredAuthentications publickey\nIdentityFile ~/.ssh/gitee_id_rsa\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# github")]),s._v("\nHost github.com\nHostName github.com\nPreferredAuthentications publickey\nIdentityFile ~/.ssh/github_id_rsa\n")])])]),t("p",[s._v("注意，指定的私钥要和上面指定的公钥相对应。")]),s._v(" "),t("h2",{attrs:{id:"you-do-not-have-permission-push-to-this-repository"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#you-do-not-have-permission-push-to-this-repository"}},[s._v("#")]),s._v(" You do not have permission push to this repository")]),s._v(" "),t("p",[s._v("在正确的设置好公钥后，可以正确的通过 "),t("code",[s._v("ssh")]),s._v(" 连接服务器，但是在推送时报错。")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push origin master\nremote: You "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v(" not have permission push to this repository\nfatal: unable to access "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'<remote-url>'")]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" The requested URL returned error: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("403")]),s._v("\n")])])]),t("p",[t("strong",[s._v("How to fix？")])]),s._v(" "),t("p",[s._v("在 Windows 中，凭据管理器可以使你能够查看和删除用于登录网站、连接的应用程序和网络的已保存凭据。")]),s._v(" "),t("p",[s._v("在任务栏上的搜索框中键入“凭据管理器”，然后选择“凭据管理器控制面板”。")]),s._v(" "),t("p",[s._v("选择“Windows 凭据”配置凭据。")]),s._v(" "),t("img",{attrs:{src:s.$withBase("/images/git/windows-accessing-credential-manager.png"),alt:"Windows accessing credential manager"}}),s._v(" "),t("p",[s._v("点击添加普通凭证，根据要求输入相应的网络地址、用户名和密码。")]),s._v(" "),t("h2",{attrs:{id:"参考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[s._v("#")]),s._v(" 参考")]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://gitee.com/help/articles/4229",target:"_blank",rel:"noopener noreferrer"}},[s._v("Git 配置多个 SSH-Key - 码云 Gitee.com"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://support.microsoft.com/zh-cn/help/4026814/windows-accessing-credential-manager",target:"_blank",rel:"noopener noreferrer"}},[s._v("访问凭据管理器"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=n.exports}}]);