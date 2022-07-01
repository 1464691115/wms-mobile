
declare type globalRequestResult<T = string> = {
    returnCode: '200' | '400' | '404' | '401' | '500',
    msg: T
}


/** 列表请求参数 */
declare interface listRequestParam<T extends Record<string, any>> extends T, Omit<listRequestResult['msg'], 'list'> {
}

/** 列表接口 */
declare type listRequestResult<T = any> = globalRequestResult<{
    /** 每页数量 */
    count?: number
    list: T[]
    /** 当前页 */
    page: number
    /** 总条数 */
    total_count?: number
    /** 总页数 */
    total_page?: number
}>


declare type globalRequestType = globalRequestResult | listRequestResult



declare type returnPromise<T extends Promise<any>> = Parameters<Parameters<T['then']>['0']>['0']

