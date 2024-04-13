import debounce from '../src/utils/lib/debounce'

const { writeThemeScss } = require('./writeFill/theme')

const fs = require('fs')
const path = require('path')
const params = process.argv.slice(2)
//TODO kesen: 2022-04-22  打开微信开发工具
if (process.env.Path && params[0] !== 'off') {
  let e = ''
  process.env.Path.split(';').every((el) =>
    el.includes('微信web开发者工具') ? (e = el) : true,
  )

  e = e.replace(/(([A-Z]|[a-z])\:.*微信web开发者工具).*/g, '$1')
  const weixin = '/d' + e
  const { exec } = require('child_process')

  startWxIDE()
  let time

  function startWxIDE() {
    console.log('如无反应请检查开发工具安全->服务端口是否开启')

    exec(
      `cd ${weixin} && cli open --project ${path.resolve(
        __dirname,
        '../dist/dev/mp-weixin',
      )}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log('启动失败，正在重新启动...', e)
          console.error(err)
          time = setTimeout(startWxIDE, 10000)

          return
        }
        console.log(`微信开发者工具启动成功!`, e)
        clearInterval(time)
      },
    )
  }
}

const args = require('minimist')(process.argv.slice(2))

const opt = {
  persistent: true, // persistent <boolean> 指示如果文件已正被监视，进程是否应继续运行。默认值: true。
  recursive: false, // recursive <boolean> 指示应该监视所有子目录，还是仅监视当前目录。 这适用于监视目录时，并且仅适用于受支持的平台（参见注意事项）。默认值: false。
}
const watchFile = 'src/routes'

writeFile(watchFile)(false, `init src/pages.json`)
writeThemeScss()

if (args.watch) {
  fs.watch(watchFile, opt, debounce(writeFile(watchFile), 1000))
  fs.watch('cli/writeFill', opt, debounce(writeFile('cli/writeFill'), 1000))
}

function writeFile(filesName = '') {
  return function (type, filePath = '') {
    if (!!type)
      console.log(`${new Date()}: ${filesName}/${filePath} to updated`)
    else console.log(`${new Date()}: ${filePath}`)

    fs.readFile(path.resolve('./src/routes/index.ts'), 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }

      delete require.cache[require.resolve('./writeFill/pages.js')]
      delete require.cache[require.resolve('./writeFill/pages.js')]

      const { writePages } = require('./writeFill/pages.js')
      writePages()
    })
  }
}
