import { defHttp } from '@/api'
import { StockApi } from './ApiEnum'
import { StockEntryListResultModel } from './model/materialModel'
import { queryParamsStr } from '@/utils'



export function getStockEntryApiList(data) {
    return defHttp.get<ArrayRequestResult<StockEntryListResultModel>>({
        url: StockApi.GET_STOCK_ENTRY_LIST + queryParamsStr(data),
    })
}
