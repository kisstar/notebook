# Web 多媒体操作集

在 HTML5 标准中有许多的新特性，包括 `<video>` 和 `<audio>` 标签，以及一些 JavaScript 和 APIs 用于进行媒体相关的操作。

现在，我们就来了解一下在 Web 中的一些常见媒体处理。

## 获取媒体数据

[MediaDevices][media_devices] 接口提供访问连接媒体输入的设备，如照相机和麦克风，以及屏幕共享等。它可以使你取得任何硬件资源的媒体数据。

通过 MediaDevices 提供的 `getUserMedia()` 方法，在用户允许的情况下，可以打开系统上的相机（或屏幕共享、或麦克风），并提供包含视频轨道或音频轨道的 [MediaStream][media_stream]。

```html
<video id="video-capture" width="500" height="400" autoplay></video>

<script>
  const videoEl = document.querySelector('#video-capture')

  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: true,
    })
    .then(function(stream) {
      // see: https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/srcObject
      videoEl.srcObject = stream
    })
    .catch(console.error)
</script>
```

## 视频录制

[MediaRecorder][media_recorder] 是 MediaStream Recording API 提供的用来进行媒体轻松录制的接口, 它需要通过调用 `MediaRecorder()` 构造方法进行实例化。

```html
<video controls></video>

<script>
  const chunks = []

  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: true,
    })
    .then(function(stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      })

      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data)
      }
      mediaRecorder.onstop = () => {
        const url = URL.createObjectURL(
          // See: https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/Blob
          new Blob(chunks, { type: 'video/webm' }),
        )
        document.querySelector('video').src = url
      }

      mediaRecorder.start()
      setTimeout(() => {
        mediaRecorder.stop()
      }, 5000)
    })
</script>
```

MediaRecorder 录制的流除了来自于使用 `navigator.mediaDevices.getUserMedia()` 创建的外，还可以来自于 `<audio>`，`<video>` 以及 `<canvas>` DOM 元素。

## Canvas 播放视频

[Canvas API][canvas_api] 提供了一个通过 JavaScript 和 HTML 的 `<canvas>` 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

通过 Canvas 2D API 中的 `drawImage()` 方法，可以以多种方式在 Canvas 上绘制图像。

```html
<video id="video-capture" src="flower.webm" autoplay></video>
<canvas id="canvas-capture"></canvas>

<script>
  const videoEl = $('#video-capture')
  const canvasEl = $('#canvas-capture')
  const canvasCtx = canvasEl.getContext('2d')

  render()

  function render() {
    requestAnimationFrame(renderFrame)
  }

  function renderFrame() {
    // See: https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
    canvasCtx.drawImage(videoEl, 0, 0, 320, 180)
    render()
  }

  function $(selector) {
    return document.querySelector(selector)
  }
</script>
```

## 视频截图

调用 HTMLCanvasElement 上的 `toDataURL()` 方法会返回一个包含图片展示的 data URI。可以使用 `type` 参数指定格式，默认为 PNG 格式。

```html
<video id="video-capture" src="flower.webm" autoplay></video>
<canvas id="canvas-capture"></canvas>
<img id="img-capture" />

<script>
  const videoEl = $('#video-capture')
  const canvasEl = $('#canvas-capture')
  const imgEl = $('#img-capture')
  const canvasCtx = canvasEl.getContext('2d')

  document.addEventListener('click', takePicture)

  function takePicture() {
    canvasCtx.drawImage(videoEl, 0, 0, 320, 180)
    const data = canvasEl.toDataURL('image/png')
    // See: https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images
    imgEl.setAttribute('src', data)
  }

  function $(selector) {
    return document.querySelector(selector)
  }
</script>
```

## 保存录制或截取的内容

`URL.createObjectURL()` 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的 URL，这个新的 URL 表示指定的 File 对象或 Blob 对象。

```js
const originContent = [JSON.stringify(config, null, 2)]
const blobContent = new Blob(originContent, { type: 'application/json' })
// See: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
const url = URL.createObjectURL(blobContent)

downloadFile(url, 'test.json')

function downloadFile(url, filename) {
  const linkEl = document.createElement('a')

  linkEl.style.display = 'none'
  linkEl.download = filename
  linkEl.href = url
  document.body.appendChild(linkEl)
  linkEl.click()
  document.body.removeChild(linkEl)
}
```

## 上传录制或截取的内容

[FormData][using_formdata_objects] 对象用以将数据编译成键值对，以便用 XMLHttpRequest 来发送数据。其主要用于发送表单数据，但亦可用于发送带键数据，而独立于表单使用。

另外，还可以直接向 FormData 对象附加 File 或 Blob 类型的文件。

```html
<img src="rhino.jpg" />
<canvas></canvas>

<script>
  const imgEl = $('img')
  const canvasEl = $('canvas')
  const canvasCtx = canvasEl.getContext('2d')

  imgEl.addEventListener('load', function() {
    canvasEl.width = imgEl.width
    canvasEl.height = imgEl.height
    canvasCtx.drawImage(imgEl, 0, 0, imgEl.width, imgEl.height)

    // See: https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob
    canvasEl.toBlob(function(blob) {
      const formData = new FormData()
      const xhr = new XMLHttpRequest()

      formData.append('test', blob)
      xhr.open('post', '/upload')
      xhr.send(formData)
    }, 'image/jpg')
  })

  function $(selector) {
    return document.querySelector(selector)
  }
</script>
```

## 附录

- WebGL

Canvas API 主要聚焦于 2D 图形。而同样使用 `<canvas>` 元素的 [WebGL API][webgl_api] 则用于绘制硬件加速的 2D 和 3D 图形。

- 制作 Gif 图

通过 WebAssembly 使用 [FFmepg][ffmpeg] 可以在 Web 端做很多关于视频的操作，比如制作 Gif 动图等。

## 参考

- [使用 canvas 处理视频](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Manipulating_video_using_canvas)
- [requestAnimationFrame()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

[media_devices]: https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices
[media_stream]: https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream
[canvas_api]: https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API
[media_recorder]: https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder
[webgl_api]: https://developer.mozilla.org/zh-CN/docs/Web/API/
[using_formdata_objects]: https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
[ffmpeg]: https://github.com/FFmpeg/FFmpeg
