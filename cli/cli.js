
const args = process.argv.slice(2)
const fs = require('fs')
const path = require('path')



/** @type {import('ora').Ora} */
let spinner = null
import('ora').then((oraD) => {
    const ora = oraD.default
    const name = args[1]

    spinner = ora('开始创建...')
    spinner.start();

    switch (args[0]) {
        case 'page':
            createPage(name)
            break;

        case 'icon':
            createIcon(name)
            break;

        default:
            break;
    }

})


/** 创建 页面 */
function createPage(name) {
    const _path = './src/pages'
    const _routes = './src/routes/index.ts'
    const _to_fun = './src/utils/global/toPage.ts'

    const upName = name.replace(/(\w?)|\-(\w)/, (_, $1) => $1.toUpperCase())


    const exitsCom = fs.existsSync(`${_path}/${name}`)
    if (exitsCom) {
        spinner.fail('页面已存在，请比对删除后重试。')
        return false
    }


    spinner.text = '生成目录中...'
    mkdirsSync(path.resolve(`${_path}/${name}`))
    spinner.succeed(`页面目录生成完毕！`)


    const inquirer = require('inquirer')
    let options = [
        // 配置项
        {
            type: 'input',
            name: 'productName',
            message: '页面标题?',
        },
        {
            type: 'confirm',
            name: 'isDefinedNavigation',
            message: '需要灰度导航栏?',
        },
        {
            type: 'confirm',
            name: 'isInjectRoute',
            message: '是否注入到routes路由中?',
            default: true
        },
        {
            type: 'confirm',
            name: 'isToFun',
            message: '是否增加跳转到该页面的函数?',
            default: true
        },
    ]
    inquirer.prompt(options).then(res => {
        const { productName, isDefinedNavigation, isInjectRoute, isToFun } = res
        if (isInjectRoute === false) return

        const vuePath = `${_path}/${name}/index.vue`
        fs.writeFileSync(path.resolve(vuePath), '<template>\n</template>', 'utf8')

        const routesPath = path.resolve(_routes)
        const routesFile = fs.readFileSync(routesPath, 'utf8')

        const reulstName = name.replace(/\-(\w)/, (_, $1) => $1.toUpperCase())
        const routesTem = routesFile.replace(/(routesUrl \= .*)/g, (res) => `${res}\n\t${productName ? `/** ${productName} */` : ''}\n${reulstName}: '/pages/${name}/index',`).replace(/(\] as routesType)/g, (res) => `\t{\n\t\tpath: routesUrl.${reulstName}${isDefinedNavigation ? `,\n\t\tstyle: navigationBlock('${productName}')` : ''}\n\t},\n${res}`)

        fs.writeFileSync(routesPath, routesTem, 'utf8')

        if (isToFun) {
            const toFnPath = path.resolve(_to_fun)
            const toFnFile = fs.readFileSync(toFnPath, 'utf8')
            const toFnTem = toFnFile + `\n\n${productName ? `/** 跳转到${productName} */` : ''}\nexport function to${upName}(){\n\tuni.navigateTo({\n\t\turl: routesUrl.${reulstName}\n\t})\n}`

            fs.writeFileSync(toFnPath, toFnTem, 'utf8')
        }


    }).catch(err => {
        console.log(err);
    }).finally(() => {
        setTimeout(() => spinner.succeed(`${args[1]} 页面创建成功！`), 1000)
    })
}

/** 创建 图标 */
function createIcon() {
    const _path = './src/enums/index.ts'
    const inquirer = require('inquirer')
    let options = [
        // 配置项
        {
            type: 'input',
            name: 'key',
            message: '组件键为（自定义）：',
            default: 'test'
        },
        {
            type: 'input',
            name: 'value',
            message: '组件值为（为固定的 Unicode）：',
            default: 'test'
        },
    ]
    spinner.succeed('')

    inquirer.prompt(options).then(res => {
        const { key, value } = res


        const iconPath = path.resolve(_path)
        const iconFile = fs.readFileSync(iconPath, 'utf8')
        const iconTem = iconFile.replace(/(export enum ICON_UNICODE \{)/g, (res) => `${res}\n\t${key} = '${value}',`)

        fs.writeFileSync(iconPath, iconTem, 'utf8')

    }).catch(err => {
        console.log(err);
    }).finally(() => {
        setTimeout(() => spinner.succeed(`图标创建成功！`), 1000)
    })
}

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
