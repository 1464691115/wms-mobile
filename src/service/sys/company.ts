import { CompanyApi } from './ApiEnum'
import { defHttp } from '@/api'
import { queryParamsStr } from '@/utils'
import { CompanyCategoryType, CompanyResultModel } from './model/companyModel'



export function getCompanyList(category: CompanyCategoryType) {
  return defHttp.get<CompanyResultModel>({
    url: CompanyApi.GET_COMPANY_LIST + queryParamsStr({ category }),
  })
}
