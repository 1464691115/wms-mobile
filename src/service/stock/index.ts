import { defHttp } from '@/api'
import { StockApi } from './ApiEnum'
import { StockEntryListResultModel } from './model/stockModel'
import { queryParamsStr } from '@/utils'



export function getStockEntryApiList(data) {
    return defHttp.get<ArrayRequestResult<StockEntryListResultModel>>({
        url: StockApi.GET_STOCK_ENTRY_LIST + queryParamsStr(data),
    })
}

export function getStockOutApiList(data = {} as any) {
    data.type = 2
    return defHttp.get<ArrayRequestResult<StockEntryListResultModel>>({
        url: StockApi.GET_STOCK_ENTRY_LIST + queryParamsStr(data),
    })
}





export function getStockEntryInfo(data) {
    return defHttp.get<StockEntryListResultModel>({
        url: StockApi.GET_STOCK_ENTRY_INFO + queryParamsStr(data),
    })
}
