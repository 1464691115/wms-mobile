import * as packageJson from '../../package.json'
import {
  NAVIGATION_BAR_BACKGROUND_COLOR,
  WINDOWS_BACKGROUND_COLOR,
  darkMode,
  NEW_APP_PRESET_COLOR,
} from '../../src/settings/designSetting'
import condition from './condition'
import { custom } from './custom'

const fs = require('fs')
const path = require('path')

const exportPagesJson = () => {
  delete require.cache[require.resolve('../../src/routes/index')]

  const pages = require('../../src/routes/index')

  // 需要将loader传入作为初始化，v0.0.6之后只需要初始化一次
  return {
    pages: pages.default,
    easycom: {
      autoscan: false,
      custom,
    },
    tabBar: pages.tabBarList?.length
      ? {
          color: '#9CA4AB',
          selectedColor: NEW_APP_PRESET_COLOR,
          list: pages.tabBarList,
        }
      : undefined,
    globalStyle: {
      navigationBarTextStyle: darkMode,
      navigationBarTitleText: packageJson.description,
      navigationBarBackgroundColor: NAVIGATION_BAR_BACKGROUND_COLOR,
      backgroundColor: WINDOWS_BACKGROUND_COLOR,
    },
    condition: condition,
  }
}

export function writePages() {
  fs.writeFile(
    path.resolve('./src/pages.json'),
    JSON.stringify(exportPagesJson()),
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
