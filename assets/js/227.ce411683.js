(window.webpackJsonp=window.webpackJsonp||[]).push([[227],{580:function(e,t,a){"use strict";a.r(t);var r=a(25),v=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"web-h-265-播放器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#web-h-265-播放器"}},[e._v("#")]),e._v(" Web H.265 播放器")]),e._v(" "),a("img",{attrs:{src:e.$withBase("/images/video/advanced/h265-hevc.jpg"),alt:"H265"}}),e._v(" "),a("p",[e._v("随着互联网的快速发展和 5G 的到来，人们对音视频内容的需求也开始飞速增长，追求的质量也越来越高，导致视频在网络上的传输量也越来越大。因此，在提高视频质量的同时，我们还需要考虑随之而来的带宽成本。")]),e._v(" "),a("p",[e._v("同样质量的视频想要拥有更小的体积就需要拥有更高效的编码算法，H.265 正是这样一种高效的视频编码标准。")]),e._v(" "),a("h2",{attrs:{id:"h-265"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#h-265"}},[e._v("#")]),e._v(" H.265")]),e._v(" "),a("p",[e._v("当下 H.264 还是使用最为广泛的视频编码格式，HEVC/H.265 作为新一代的视频编码标准，它的核心目标在 H264/AVC High Profile 的基础上，将编码效率提高一倍，即在保证相同编码质量的前提下，视频码率减少 50%，可支持 4K 清晰度甚至到超高清电视。")]),e._v(" "),a("table",{attrs:{cellpadding:"1",cellspacing:"1"}},[a("caption",[e._v("\n  主观视频性能比较\n ")]),e._v(" "),a("tbody",[a("tr",[a("th",{attrs:{rowspan:"2"}},[e._v("视频编码标准")]),e._v(" "),a("th",{attrs:{colspan:"5"}},[e._v("较之H.264/MPEG-4 AVC HP减少码率的比例")])]),e._v(" "),a("tr",[a("th",[e._v("480p")]),e._v(" "),a("th",[e._v("720p")]),e._v(" "),a("th",[e._v("1080p")]),e._v(" "),a("th",[e._v("4K UHD")])]),e._v(" "),a("tr",[a("th",[e._v("HEVC")]),e._v(" "),a("td",[e._v("52%")]),e._v(" "),a("td",[e._v("56%")]),e._v(" "),a("td",[e._v("62%")]),e._v(" "),a("td",[e._v("64%")])])])]),e._v(" "),a("p",[e._v("可惜的是由于专利等原因，H.265 编码直到现在在浏览器中的硬件解码支持情况并不理想。")]),e._v(" "),a("img",{attrs:{src:e.$withBase("/images/video/advanced/caniuseh265.png"),alt:"caniuseh265"}}),e._v(" "),a("p",[e._v("所以，当下想要在浏览器端直接使用原生的 "),a("code",[e._v("<video />")]),e._v(" 标签播放 H.265 视频是行不通的，我们需要采取一些方式来实现软解。")]),e._v(" "),a("h2",{attrs:{id:"ffmpeg"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ffmpeg"}},[e._v("#")]),e._v(" FFmpeg")]),e._v(" "),a("p",[e._v("说到视频编解码，不得不提一个音视频处理程序 - FFmpeg。FFmpeg 可以运行音频和视频多种格式的录影、转换、流功能。其中 "),a("code",[e._v("libavcodec")]),e._v("——就是被用于多个项目中音频和视频的编解码库。")]),e._v(" "),a("img",{attrs:{src:e.$withBase("/images/video/advanced/ffmpeg-process.png"),alt:"ffmpeg-process"}}),e._v(" "),a("p",[e._v("FFmpeg 源码采用 C 语言书写，提供了丰富而友好的接口支持开发者进行二次开发。作为一个开源的自由软件，它的源码托管在 GitHub 上，现在已经拥有了超过 24k 的 Star。")]),e._v(" "),a("p",[e._v("如此，我们完全可以借助 FFmpeg 来支持对 H.265 视频的解码工作。但是，如何让 C 语言在 Web 端正常运行呢？")]),e._v(" "),a("h2",{attrs:{id:"webassembly"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webassembly"}},[e._v("#")]),e._v(" WebAssembly")]),e._v(" "),a("p",[e._v("WebAssembly 是一种运行在现代网络浏览器中的新型代码，并且提供新的性能特性和效果。它设计的目的不是为了手写代码，而是为诸如 C、C++ 和 Rust 等低级源语言提供一个高效的编译目标。")]),e._v(" "),a("img",{attrs:{src:e.$withBase("/images/video/advanced/caniusewebassembly.webp"),alt:"WebAssembly"}}),e._v(" "),a("p",[e._v("通过 Emscripten 工具能够将一段 C/C++ 代码，编译出：")]),e._v(" "),a("ul",[a("li",[e._v("一个 "),a("code",[e._v(".wasm")]),e._v(" 模块；")]),e._v(" "),a("li",[e._v("JavaScript ”胶水“代码；")]),e._v(" "),a("li",[e._v("一个用来展示代码运行结果的 HTML 文档；")])]),e._v(" "),a("img",{attrs:{src:e.$withBase("/images/video/advanced/wasm-process.webp"),alt:"wasm-process"}}),e._v(" "),a("p",[e._v("其中，胶水代码包括了调用 WebAssembly 的 JavaScript API 来获取、加载和运行 "),a("code",[e._v(".wasm")]),e._v(" 文件的逻辑，借助我们就可以在 Web 端使用 FFmpeg 来处理音视频内容。")]),e._v(" "),a("h2",{attrs:{id:"基础架构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础架构"}},[e._v("#")]),e._v(" 基础架构")]),e._v(" "),a("p",[e._v("Web 视频播放器的整个流程主要包括获取流媒体数据、解封转和解码，最后对数据进行渲染四个步骤，所以整体也可以大致分为四层。")]),e._v(" "),a("img",{attrs:{src:e.$withBase("/images/video/advanced/layer.png"),alt:"Web Player"}}),e._v(" "),a("p",[e._v("对于 H.265 播放而言整体结构与此类似，只不过将流媒体数据的处理工作（包括解封转和编解码）交给了 FFmpeg 来处理。")]),e._v(" "),a("img",{attrs:{src:e.$withBase("/images/video/advanced/process.png"),alt:"process"}}),e._v(" "),a("p",[e._v("其中核心包括三个步骤：")]),e._v(" "),a("ol",[a("li",[e._v("通过 Media Loader 加载媒体数据；")]),e._v(" "),a("li",[e._v("将媒体数据发送给 Web Worker 的 WASM 包进行处理；")]),e._v(" "),a("li",[e._v("WASM 通过 JavaScript API 传回处理后的数据给 Web Worker，Web Worker 再把数据传给主线程的 Canvas 和 Web audio。")])]),e._v(" "),a("h2",{attrs:{id:"开源方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#开源方案"}},[e._v("#")]),e._v(" 开源方案")]),e._v(" "),a("p",[e._v("目前，H.265 播放器已经在许多业务中落地了，业界中也不乏有一些开源的实现。")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[e._v("播放器")]),e._v(" "),a("th",{staticStyle:{"text-align":"left"}},[e._v("说明")]),e._v(" "),a("th",{staticStyle:{"text-align":"left"}},[e._v("GitHub")])])]),e._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("h265player")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("完整的 Web 版 H.265 播放器解决方案")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("a",{attrs:{href:"https://github.com/goldvideo/h265player",target:"_blank",rel:"noopener noreferrer"}},[e._v("查看"),a("OutboundLink")],1)])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("easyplayer")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("同时支持多协议、多编码格式的 H5 播放器")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("a",{attrs:{href:"https://github.com/tsingsee/EasyPlayer.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("查看"),a("OutboundLink")],1)])]),e._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[e._v("h265web")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("H.265/Hevc Web 端播放器")]),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("a",{attrs:{href:"https://github.com/numberwolf/h265web.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("查看"),a("OutboundLink")],1)])])])]),e._v(" "),a("p",[e._v("此处仅列举了几个试用过的播放器，感兴趣的同学也可以参照官方文档去尝试。")]),e._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),a("p",[e._v("现在浏览器对 H.265 视频的原生支持还不够友好，如果想要播放 H.265 视频可以采用 WebAssembly 技术，将 FFmpeg 编译为 wasm，在收到 H.265 码流时，调用 FFmpeg 进行解码，然后通过 Canvas 来显示视频画面。")]),e._v(" "),a("p",[e._v("其中，从码流中分离出来的音频数据则可以交由 "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",target:"_blank",rel:"noopener noreferrer"}},[e._v("Web Audio API"),a("OutboundLink")],1),e._v(" 进行处理，对于主流的音频编码格式各浏览器支持都还不错。")]),e._v(" "),a("p",[e._v("本文主要是针对 Web 端 H.265 视频播放器的实现方式做了一个简单的介绍。目前，H.265 播放器已经在许多业务中落地了，业界中也不乏有一些开源的实现，后续我们也将逐步去了解其中奥妙，奥利给。")]),e._v(" "),a("h2",{attrs:{id:"附录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#附录"}},[e._v("#")]),e._v(" 附录")]),e._v(" "),a("p",[e._v("视频编码：指连续图像的编码，与静态图像编码着眼于消除图像内的冗余信息相对，视频编码主要通过消除连续图像之间的时域冗余信息来压缩视频。")]),e._v(" "),a("p",[e._v("码率：数据传输时单位时间传送的数据位数，一般我们用的单位是 "),a("code",[e._v("kbps")]),e._v(" 即千位每秒。通俗一点的理解就是取样率，单位时间内取样率越大，精度就越高，处理出来的文件就越接近原始文件。")]),e._v(" "),a("h2",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[e._v("#")]),e._v(" 参考")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/FFmpeg/FFmpeg",target:"_blank",rel:"noopener noreferrer"}},[e._v("FFmpeg"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://webassembly.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("WebAssembly"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/WebAssembly",target:"_blank",rel:"noopener noreferrer"}},[e._v("WebAssembly | MDN"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://emscripten.org/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Emscripten"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",target:"_blank",rel:"noopener noreferrer"}},[e._v("Web Audio API - Web APIs | MDN"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=v.exports}}]);