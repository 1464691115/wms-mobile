import theme from '@config/theme'
import TabbarMinBtn from '@/static/images/tabbar-icon/update.png'
import { ICON_UNICODE } from '@/enums'

export default {
    color: '#333',
    selectedColor: '#333',
    iconWidth: 66,
    fontSize: 28,
    height: theme.tabBarHeight,
    backgroundColor: '#FFFFFF',
    borderStyle: 'black',
    list: [
        {
            tabBarId: 0,
            text: '工具',
            iconfont: {
                text: ICON_UNICODE.TAB1,
                selectedText: ICON_UNICODE.TAB1SELECTED,
            },
        },
        {
            tabBarId: -1,
            text: '添加患者',
            size: 108,
            iconPath: TabbarMinBtn,
            iconStyle: {
                position: 'absolute',
                top: '0px',
                transform: 'translateY(-18px)',
                border: '12rpx solid #fff',
                backgroundColor: '#fff',
                borderRadius: '51%'
            }
        },
        {
            tabBarId: 1,
            text: '我的',
            iconfont: {
                text: ICON_UNICODE.TAB2,
                selectedText: ICON_UNICODE.TAB2SELECTED,
            },
        },
    ],
} as tabBarType
