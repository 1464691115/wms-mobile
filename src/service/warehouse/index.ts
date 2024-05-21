import { defHttp } from '@/api'
import { queryParamsStr } from '@/utils'
import { WarehouseApi } from './ApiEnum'


// (POST|GET)\s/warehouse/([\w_]+)\n(.*)


// export function warehouse\u$2Api(data = {} as any) {
//     return defHttp.\L$1<any>({
//         url: MoveApi.\U$2 + queryParamsStr(data),
//     })
// }

// _([a-z])
// \u$1

export function warehouseResAllByWarehouseIdApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.RES_ALL_BY_WAREHOUSE_ID + queryParamsStr(data),
    })
}

export function warehouseResDeleteApi(data = {} as any) {
    return defHttp.post<any>({
        url: WarehouseApi.RES_DELETE,
        data
    })
}

export function warehouseResGetByIdApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.RES_GET_BY_ID + queryParamsStr(data),
    })
}

export function warehouseResInsertApi(data = {} as any) {
    return defHttp.post<any>({
        url: WarehouseApi.RES_INSERT,
        data
    })
}

export function warehouseResListApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.RES_LIST + queryParamsStr(data),
    })
}

export function warehouseResSelectAllApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.RES_SELECT_ALL + queryParamsStr(data),
    })
}

export function warehouseResUpdateApi(data = {} as any) {
    return defHttp.post<any>({
        url: WarehouseApi.RES_UPDATE,
        data
    })
}

export function warehouseStockAllByReservoirIdApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.STOCK_ALL_BY_RESERVOIR_ID + queryParamsStr(data),
    })
}

export function warehouseStockDeleteApi(data = {} as any) {
    return defHttp.post<any>({
        url: WarehouseApi.STOCK_DELETE,
        data
    })
}

export function warehouseStockGetByIdApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.STOCK_GET_BY_ID + queryParamsStr(data),
    })
}

export function warehouseStockInsertApi(data = {} as any) {
    return defHttp.post<any>({
        url: WarehouseApi.STOCK_INSERT,
        data
    })
}

export function warehouseStockListApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.STOCK_LIST + queryParamsStr(data),
    })
}

export function warehouseStockSelectAllApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.STOCK_SELECT_ALL + queryParamsStr(data),
    })
}

export function warehouseStockUpdateApi(data = {} as any) {
    return defHttp.post<any>({
        url: WarehouseApi.STOCK_UPDATE,
        data
    })
}

export function warehouseWarDeleteApi(data = {} as any) {
    return defHttp.post<any>({
        url: WarehouseApi.WAR_DELETE,
        data
    })
}

export function warehouseWarGetByIdApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.WAR_GET_BY_ID + queryParamsStr(data),
    })
}

export function warehouseWarInsertApi(data = {} as any) {
    return defHttp.post<any>({
        url: WarehouseApi.WAR_INSERT,
        data
    })
}

export function warehouseWarListApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.WAR_LIST + queryParamsStr(data),
    })
}

export function warehouseWarSelectAllApi(data = {} as any) {
    return defHttp.get<any>({
        url: WarehouseApi.WAR_SELECT_ALL + queryParamsStr(data),
    })
}

export function warehouseWarUpdateApi(data = {} as any) {
    return defHttp.post<any>({
        url: WarehouseApi.WAR_UPDATE,
        data
    })
}