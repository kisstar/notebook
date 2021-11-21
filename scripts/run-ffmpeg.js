/* eslint-disable no-console */

const path = require('path')
const minimist = require('minimist')
const shell = require('shelljs')

const argv = process.argv.slice(2)
const argObj = minimist(argv)

const { file } = argObj

if (!file) {
  console.error('请指定需要运行的文件。')
  process.exit(1)
}

const target = path.resolve(__dirname, '../tests/video/ffmpeg', file)
const command = `node --experimental-wasm-threads --experimental-wasm-bulk-memory ${target}`

shell.exec(command)
