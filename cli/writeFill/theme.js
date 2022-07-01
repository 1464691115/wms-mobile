import theme from "../../config/theme";

const fs = require('fs')
const path = require('path')


const themeStr = `$tabbar-height: calc(${theme.tabBarHeight}px);\n
$primary: ${theme.color};\n
$bgColor: ${theme.backgroundColor};\n
$uni-color-primary: ${theme.color};\n
$u-type-primary: ${theme.color};\n
`


export function writeThemeScss() {
    fs.writeFile(path.resolve('./src/static/style/theme.scss'), themeStr, 'utf8', function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        return true;
    })
}