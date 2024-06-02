(window.webpackJsonp=window.webpackJsonp||[]).push([[305],{720:function(t,e,a){"use strict";a.r(e);var s=a(62),l=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"滤镜描述格式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#滤镜描述格式"}},[t._v("#")]),t._v(" 滤镜描述格式")]),t._v(" "),a("p",[t._v("滤镜使用时的参数排列方式：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# [输入流或标记名] 滤镜参数 [临时标记名];[输入流或标记名] 滤镜参数 [临时标记名];...")]),t._v("\n")])])]),a("p",[t._v("如将一个图片缩放为 176x144 的分辨率铺在视频的左上角：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("ffmpeg -i input.mp4 -i input.png -filter_complex "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"[1:v]scale=176:144[logo];[0:v][logo]overlay=x=0:y=0"')]),t._v(" output.mp4\n")])])]),a("h2",{attrs:{id:"时间内置变量"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#时间内置变量"}},[t._v("#")]),t._v(" 时间内置变量")]),t._v(" "),a("p",[t._v("在使用 Filter 时经常会根据时间轴进行操作，下面是相关的一些基本内置变量：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("变量")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("t")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("时间戳以秒表示，如果输入的时间戳是未知的，则是 NAN")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("n")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("输入帧的顺序编号，从 0 开始")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("pos")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("输入帧的位置，如果未知则是 NAN")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("w")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("输入视频帧的宽度")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("h")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("输入视频帧的高度")])])])]),t._v(" "),a("h2",{attrs:{id:"demo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[t._v("#")]),t._v(" Demo")]),t._v(" "),a("p",[t._v("See: "),a("a",{attrs:{href:"https://github.com/kisstar/notebook/blob/master/tests/video/ffmpeg/filter/des-format.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/kisstar/notebook/blob/master/tests/video/ffmpeg/filter/des-format.js"),a("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=l.exports}}]);