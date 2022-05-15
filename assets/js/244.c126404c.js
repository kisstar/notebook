(window.webpackJsonp=window.webpackJsonp||[]).push([[244],{597:function(t,a,s){"use strict";s.r(a);var e=s(25),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"浏览器音视频自动播放策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器音视频自动播放策略"}},[t._v("#")]),t._v(" 浏览器音视频自动播放策略")]),t._v(" "),s("p",[t._v("浏览器为了防止网页在用户非自愿的情况下主动播放声音，对网页上的自动播放（Autoplay）功能做了限制：通常，浏览器在没有用户交互操作之前不允许有声音的媒体播放。")]),t._v(" "),s("h2",{attrs:{id:"总览"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总览"}},[t._v("#")]),t._v(" 总览")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("浏览器")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("调整时间")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("版本号")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("策略概要")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("Chrome")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("2018.4")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("66")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("禁止带音频媒体自动播放")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("Safari")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("2017.9")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("11")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("禁止带音频媒体自动播放")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("Firefox")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("2079.3")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("66")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("禁止带音频媒体自动播放")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("IE")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("允许自动播放")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("Edge")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("允许自动播放，至少 44 开始已支持配置")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("QQ")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("允许自动播放，验证了 8.7")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("搜狗")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("允许自动播放，验证了 V11")])])])]),t._v(" "),s("h2",{attrs:{id:"chrome"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#chrome"}},[t._v("#")]),t._v(" Chrome")]),t._v(" "),s("p",[t._v("2018 年 4 月开始（Chrome 66），策略调整为：")]),t._v(" "),s("ul",[s("li",[t._v("始终允许静音自动播放。")]),t._v(" "),s("li",[t._v("在以下情况下，允许自动播放声音：\n"),s("ul",[s("li",[t._v("用户已与域交互（单击、点击等）。")]),t._v(" "),s("li",[t._v("在桌面上，用户的媒体参与度指数已超过阈值，这意味着用户以前播放过有声音的视频。")]),t._v(" "),s("li",[t._v("用户已将站点添加到移动设备的主屏幕或在桌面上安装了 PWA。")])])]),t._v(" "),s("li",[t._v("顶部的 frame 可以将自动播放权限委托给它们的 iframe，以允许自动播放声音。")])]),t._v(" "),s("p",[t._v("其中，MEI 衡量个人在网站上使用媒体的倾向。Chrome 当前的方法是访问量与每个来源的重要媒体播放事件的比率：")]),t._v(" "),s("ul",[s("li",[t._v("媒体（音频/视频）的消耗必须大于 7 秒。")]),t._v(" "),s("li",[t._v("音频必须存在且未静音。")]),t._v(" "),s("li",[t._v("“视频”选项卡处于活动状态。")]),t._v(" "),s("li",[t._v("视频大小（像素）必须大于 200x140。")])]),t._v(" "),s("p",[t._v("See: "),s("a",{attrs:{href:"https://developers.google.com/web/updates/2017/09/autoplay-policy-changes",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://developers.google.com/web/updates/2017/09/autoplay-policy-changes"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"自动播放检测"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自动播放检测"}},[t._v("#")]),t._v(" 自动播放检测")]),t._v(" "),s("p",[t._v("可以通过查看 play 函数的返回值，看看它是否被拒绝，如果没有则自动播放是成功的：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" promise "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("querySelector")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'video'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("play")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("promise "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  promise\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("_")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Autoplay started!")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("catch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("error")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Autoplay was prevented.")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// Show a "Play" button so that user can start playback.')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"hack"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hack"}},[t._v("#")]),t._v(" Hack")]),t._v(" "),s("p",[t._v("Chrome 浏览器对 video 标签和 audio 标签做了非常严格的限制，但对 iframe 的限制却没那么严格。所以可使用 iframe 来触发权限：")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("video")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("video")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("iframe")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("allow")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("autoplay"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token special-attr"}},[s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("style")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),s("span",{pre:!0,attrs:{class:"token value css language-css"}},[s("span",{pre:!0,attrs:{class:"token property"}},[t._v("display")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("none")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("一个空的音频文件"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("iframe")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n  ifm"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onload")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    vdo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'YOUR_VIDEO_URL'")]),t._v("\n    vdo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("oncanplay")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      vdo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("play")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("h2",{attrs:{id:"firefox"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#firefox"}},[t._v("#")]),t._v(" Firefox")]),t._v(" "),s("p",[t._v("从 2019 年 3 月 19 日（Firefox 66） 开始默认禁止网站自动播放任何媒体文件。用户可以手动设置默认阻止音/视频的播放策略，如果选择不阻止音视频自动播放，则程序的自动播放才会生效。")]),t._v(" "),s("p",[t._v("可行的方式时默认进行静音自动播发，但是需要用户后续手动开启声音。")]),t._v(" "),s("p",[t._v("如果设置一个定时器等待播放后再打开声音会导致视频暂停。")]),t._v(" "),s("p",[t._v("See: "),s("a",{attrs:{href:"https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"safari"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#safari"}},[t._v("#")]),t._v(" Safari")]),t._v(" "),s("p",[t._v("从 2017 年的 Safari 11 浏览器开始，将使用自动推理引擎来阻止绝大多数网站默认自动播放的媒体元素。")]),t._v(" "),s("p",[t._v("同时，Safari 允许用户通过「此网站的设置」选项，让用户控制哪些网站可以自动播放音视频。")]),t._v(" "),s("p",[t._v("其自动播放的检查逻辑和 Chrome 的一致。")]),t._v(" "),s("p",[t._v("See: "),s("a",{attrs:{href:"https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"ie11-edge"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ie11-edge"}},[t._v("#")]),t._v(" IE11/Edge")]),t._v(" "),s("p",[t._v("目前没有看到 IE11 对自动播放策略的明确规定，也就是说自动播放是允许的。")]),t._v(" "),s("p",[t._v("从 Windows 10 build 17704 开始，Microsoft 在 Edge 中添加了一个新设置，允许您控制站点是否可以自动播放媒体，默认允许自动播放视频。")]),t._v(" "),s("p",[t._v("在 Edge 中检查是否允许自动播放的方式和 Chrome 一致。")]),t._v(" "),s("p",[t._v("See: "),s("a",{attrs:{href:"https://docs.microsoft.com/en-us/microsoft-edge/edgehtml/dev-guide/browser-features/autoplay-policies",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://docs.microsoft.com/en-us/microsoft-edge/edgehtml/dev-guide/browser-features/autoplay-policies"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("p",[t._v("最好永远也不要相信视频会自动播放，但可以通过一些方式来提供自动播放。")]),t._v(" "),s("ul",[s("li",[t._v("可以使用静音提高自动播放的概率；")]),t._v(" "),s("li",[t._v("引导用户对浏览器设置为【允许自动播放】；")]),t._v(" "),s("li",[t._v("引导用户手动点击视频进行播放。")])]),t._v(" "),s("h2",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://videojs.com/blog/autoplay-best-practices-with-video-js/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Video.js Blog | Video.js"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=n.exports}}]);