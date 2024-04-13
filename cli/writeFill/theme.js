import {
  APP_PRESET_COLOR,
  NEW_APP_PRESET_COLOR,
  APP_PRESET_SUB_COLOR,
  WINDOWS_BACKGROUND_COLOR,
} from '../../src/settings/designSetting'

const fs = require('fs')
const path = require('path')

const themeStr = `
$primary: ${APP_PRESET_COLOR};\n
$new_primary: ${NEW_APP_PRESET_COLOR};\n
$sub_primary: ${APP_PRESET_SUB_COLOR};\n
$bgColor: ${WINDOWS_BACKGROUND_COLOR};\n
$uni-color-primary: ${APP_PRESET_COLOR};\n
$u-type-primary: ${APP_PRESET_COLOR};\n
`

export function writeThemeScss() {
  fs.writeFile(
    path.resolve('./src/static/style/theme.scss'),
    themeStr,
    'utf8',
    function (error) {
      if (error) {
        console.log(error)
        return false
      }
      return true
    },
  )
}
