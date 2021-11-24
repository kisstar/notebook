/**
 * @description 在视频的右上角添加文字水印
 */

const fs = require('fs')
const path = require('path')
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg')

const ffmpeg = createFFmpeg({ log: true })
const resolve = (...args) => path.resolve(__dirname, '../../../../docs/.vuepress/public', ...args)

;(async () => {
  const inputVideo = resolve('movies', 'video/come-here.mp4')
  const outputVideo = path.resolve('tmp', 'come-here.mp4')

  await ffmpeg.load()
  ffmpeg.FS('writeFile', 'come-here.mp4', await fetchFile(inputVideo))
  await ffmpeg.run(
    '-i',
    'come-here.mp4',
    '-vf',
    "drawtext=fontsize=100:fontfile=FreeSerif.ttf:text='hello world':x=20:y=20",
    'come-here_filtered.mp4',
  )
  await fs.promises.writeFile(outputVideo, ffmpeg.FS('readFile', 'come-here_filtered.mp4'))
  ffmpeg.exit()
  process.exit(0)
})()
