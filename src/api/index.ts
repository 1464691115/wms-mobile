import { ApiErrorMsg } from "./instanceof";


function getUrl() {
    //#ifdef MP-WEIXIN
    let version = __wxConfig.envVersion;
    switch (version) {
        // 开发
        case 'develop':
            return 'https://localhost:8080/';
        //  体验
        case 'trial':
            return 'https://localhost:8080/';
        //  线上
        case 'release':
            return 'https://localhost:8080/';
        default:
            return 'https://localhost:8080/';
    }
    //#endif
    return 'https://localhost:8080/'
}

function request<P = string>(url: UniApp.RequestOptions['url'], data: any = {}, method: UniApp.RequestOptions['method'] = "POST", header: UniApp.RequestOptions['header'] = {}) {
    // 定义公共的url
    return new Promise<P extends listRequestResult ? P : globalRequestResult<P>>((resolve, reject) => {

        const _data = {
            //TODO kesen: 2022-05-21  如果data 里有上面这些数据就覆盖掉
            ...data,
        }

        uni.request({
            method,
            data: _data,
            timeout: 60000,
            header: {
                // "content-type": 'application/x-www-form-urlenreturnCoded',
                ...(header || {})
            },
            url: getUrl() + url,

            success: async result => {
                // @ts-ignore
                const res = result as { data: globalRequestResult }

                //TODO kesen: 2022-05-21  后端传过来的这个 code不固定，转换一下吧
                switch (+res.data.returnCode) {
                    case 500:
                        return reject(new ApiErrorMsg(res.data.msg))
                    case 400:
                        return reject(new ApiErrorMsg(res.data.msg))
                    default:
                        break;
                }

                resolve(res.data as any);
            },
            fail: err => {
                console.log('请求失败', err);
                reject(err);
            }
        });
    });
};



export default request
