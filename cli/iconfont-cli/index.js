const path = require('path')
const fs = require('fs')
const http = require('http')
const { createInterface } = require('readline')
var request = require("request");

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

function joinHttp(str) {
  return str.replace(/([http]?s?:?\/\/)/, 'http://')
}

/**
 * 
 * @param {*} url  网络文件url地址
 * @param {*} fileName 	文件名
 * @param {*} dir 下载到的目录
 */
function getFileByUrl(url, fileName, dir) {
  console.log(`🔘 ${fileName} 文件下载中...`)
  var writeStream = fs.createWriteStream(path.join(dir, fileName));

  var readStream = request(url)
  readStream.pipe(writeStream);
  readStream.on('end', function (response) {
    console.log(`✅ ${fileName} 文件下载成功 ${path.join(dir, fileName)}`)
    writeStream.end();
  });
}

/** 设置 生成iconfont 组件 */
function setVueIconfont() {
  readline.question(`font_class_url: `, (url) => {

    url = joinHttp(url)

    http.get(url, (res) => {
      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => {
        rawData += chunk
      })

      res.on('end', () => {
        try {
          const icfsPath = path.resolve(
            __dirname,
            '../../src/components/Basic/Icon',
          )


          const templateScssPath = path.resolve(
            __dirname,
            './templates/iconfont.scss.template',
          )

          let projectId;
          rawData.replace(/Project id (\d+)/g, (_, $1) => {
            projectId = $1
          })

          fs.readFile(templateScssPath, {}, function (err, data) {
            if (err) throw err;

            let entryItem = ''

            rawData.replace(/url\('(.*)'\)\s(.*)/g, (_, $1, $2) => {
              const suffix = $1.match(/\.(\w+)\?/)[1]
              entryItem += (`\n       url('@/static/icon-font/iconfont.${suffix}') ${$2}`)

              getFileByUrl(joinHttp($1), 'iconfont.' + suffix, path.resolve(
                __dirname,
                '../../src/static/icon-font/'
              ))
            })

            let resultTxt = data.toString('utf8')
              .replace(/\#projectId\#/g, (_) => projectId)
              .replace(/\#FONT_SRC\#/g, (_) => entryItem)

            fs.writeFile(icfsPath + '/src/icon-font.scss', resultTxt, {}, function (err) {
              if (err) throw new Error('❌ icon-font.scss 文件编译失败,\n' + err.message)
              console.log('✅ icon-font.scss 文件编译完成')
            })

          })



          const templateIndexPath = path.resolve(
            __dirname,
            './templates/index.ts.template',
          )

          fs.readFile(templateIndexPath, {}, function (err, data) {
            if (err) throw err;

            let entryItem = ''

            rawData.replace(/.icon\-([\w-]+):before\s\{\n\s+content: "(.*)"/g, (_, $1, $2) => {
              entryItem += `\n  ${$1.toUpperCase().split('-').join('_')} = "&#x${$2}",`
            })

            let resultTxt = data.toString('utf8')
              .replace(/\#projectId\#/g, (_) => projectId)
              .replace(/\#ICON_UNICODE\#/g, (_) => entryItem)

            fs.writeFile(icfsPath + '/index.ts', resultTxt, {}, function (err) {
              if (err) throw new Error('❌ index.ts 文件编译失败,\n' + err.message)
              console.log('✅ index.ts 文件编译完成')
            })
          })
        } catch (e) {
          console.error(e.message)
        }
      })
    })

    readline.close()
  })
}
setVueIconfont()
