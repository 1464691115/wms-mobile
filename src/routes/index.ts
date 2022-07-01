// TODO 尾部可以不删除默认导入带的.vue，使用的时候会遍历删除 (别的地方跳转用到的话最好去掉)
export const routesUrl = {
	home: '/pages/home/index',
	topScreen: '/pages/top-screen/index',
	camera: '/pages/camera/index',
	cropperImg: '/pages/cropper-img/index',
}

/** 测试使用，只在开发环境生效 */
export const testUrl = process.env.NODE_ENV === 'development' ? {} : {
	getCode: '/pages/test/getCode',
	defaultPage: '/pages/test/defaultPage'
}

/** 导航栏 灰底的页面样式 */
// @ts-ignore
const navigationBlock: navigationBlockType = (title = '') => ({
	navigationBarTitleText: title,
	navigationBarBackgroundColor: '#EEF1F4',
	navigationBarTextStyle: 'black'
})


const routes = [
	{
		path: routesUrl.topScreen,
		style: {
			navigationStyle: 'custom'
		}
	}, {
		path: routesUrl.home,
		style: navigationBlock()
	},
	{
		path: routesUrl.cropperImg,
		style: navigationBlock('裁剪图片')
	},
	{
		path: routesUrl.camera,
		style: {
			navigationStyle: 'custom',
			navigationBarTitleText: '相机',
			navigationBarBackgroundColor: '#000',
		},
	},
] as routesType
//! 上面这行不能去

export default routes.concat(Object.values(testUrl).map(el => ({ path: el }))).map(el => {
	el.path = el.path.replace(/\/pages/g, 'pages').replace(/\.vue/g, '');
	return el
})
