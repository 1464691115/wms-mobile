import { defHttp } from '@/api'
import { materialApi } from './ApiEnum'
import { MaterialResultModel } from './model/materialModel'



export function getMaterialList(data) {
    return defHttp.post<MaterialResultModel>({
        url: materialApi.GET_MATERIAL_LIST,
        data
    })
}


export function addMaterialList(data: MaterialResultModel) {
    return defHttp.post<MaterialResultModel>({
        url: materialApi.ADD_MATERIAL,
        data
    })
}
