import { CategoryApi } from './ApiEnum'
import { defHttp } from '@/api'
import type { CategoryResultModel } from './model/categoryModel'
import { CategoryType } from './model/categoryModel'
import { queryParamsStr } from '@/utils'



export function getCategoryList(type: CategoryType) {
  return defHttp.get<CategoryResultModel>({
    url: CategoryApi.GET_CATEGORY_LIST + queryParamsStr({ type }),
  })
}
