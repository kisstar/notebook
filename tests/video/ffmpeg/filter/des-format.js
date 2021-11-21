const fs = require('fs')
const path = require('path')
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg')

const ffmpeg = createFFmpeg({ log: true })
const resolve = (...args) => path.resolve(__dirname, '../../../../docs/.vuepress/public', ...args)

;(async () => {
  const inputVideo = resolve('movies', 'video/come-here.mp4')
  const inputImage = resolve('images', 'video/ffmpeg/duolaameng.jpg')
  const outputVideo = path.resolve('tmp', 'come-here.mp4')

  await ffmpeg.load()
  ffmpeg.FS('writeFile', 'come-here.mp4', await fetchFile(inputVideo))
  ffmpeg.FS('writeFile', 'duolaameng.jpg', await fetchFile(inputImage))
  await ffmpeg.run(
    '-i',
    'come-here.mp4',
    '-i',
    'duolaameng.jpg',
    '-filter_complex',
    '[1:v]scale=176:144[logo];[0:v][logo]overlay=x=0:y=0',
    'come-here_filtered.mp4',
  )
  await fs.promises.writeFile(outputVideo, ffmpeg.FS('readFile', 'come-here_filtered.mp4'))
  ffmpeg.exit()
  process.exit(0)
})()
