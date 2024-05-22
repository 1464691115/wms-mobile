import { defHttp } from '@/api'
import { queryParamsStr } from '@/utils'
import { MoveApi } from './ApiEnum'
import { MoveSelectByStockEntryIdModel } from './model/moveModel'


export function moveDeleteApi(data = {} as any) {
    return defHttp.post<any>({
        url: MoveApi.DELETE,
        data: data
    })
}

export function moveGetByIdApi(data = {} as any) {
    return defHttp.get<any>({
        url: MoveApi.GET_BY_ID + queryParamsStr(data),
    })
}

export function moveInsertApi(data = {} as any) {
    return defHttp.post<any>({
        url: MoveApi.INSERT,
        data
    })
}

export function moveSelectByStockEntryIdApi(data = {} as any) {
    return defHttp.get<MoveSelectByStockEntryIdModel[]>({
        url: MoveApi.SELECT_BY_STOCK_ENTRY_ID + queryParamsStr(data),
    })
}

export function moveSelectByStockTransIdApi(data = {} as any) {
    return defHttp.get<any>({
        url: MoveApi.SELECT_BY_STOCK_TRANS_ID + queryParamsStr(data),
    })
}

export function moveStockInListApi(data = {} as any) {
    return defHttp.get<any>({
        url: MoveApi.STOCK_IN_LIST + queryParamsStr(data),
    })
}

export function moveStockOutListApi(data = {} as any) {
    return defHttp.get<any>({
        url: MoveApi.STOCK_OUT_LIST + queryParamsStr(data),
    })
}

export function moveTransListApi(data = {} as any) {
    return defHttp.get<any>({
        url: MoveApi.TRANS_LIST + queryParamsStr(data),
    })
}

export function moveUpdateApi(data = {} as any) {
    return defHttp.post<any>({
        url: MoveApi.UPDATE,
        data
    })
}