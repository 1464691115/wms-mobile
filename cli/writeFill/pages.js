import * as packageJson from '../../package.json';
import themeConfig from '../../config/theme';
import condition from "../../config/condition";

const fs = require('fs')
const path = require('path')


const exportPagesJson = () => {
    delete require.cache[require.resolve('../../src/routes/index')];

    const pages = require('../../src/routes/index');

    // 需要将loader传入作为初始化，v0.0.6之后只需要初始化一次
    return {
        pages: pages.default,
        easycom: {
            "autoscan": true,
            "custom": { 
                "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue", 
                "^s-(.*)": "sview-ui/components/$1/s-$1.vue"
            }
        },
        globalStyle: {
            navigationBarTextStyle: "white",
            navigationBarTitleText: packageJson.description,
            navigationBarBackgroundColor: themeConfig.color,
            backgroundColor: themeConfig.backgroundColor
        },
        condition: condition
    }
}

export function writePages() {
    fs.writeFile(path.resolve('./src/pages.json'), JSON.stringify(exportPagesJson()), 'utf8', function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        return true;
    })
}