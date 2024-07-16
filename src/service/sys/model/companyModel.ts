export enum CompanyCategoryType {
	_,
	/** 供应商 */
	供应商,
	/** 客户 */
	客户,
	/** 承运商 */
	承运商
}


export class CompanyItemInterface {
	createUid?: number;
	updateUid?: any;
	createTime?: string;
	updateTime?: any;
	createUserName?: string;
	updateUserName?: any;
	id?: number;
	category?: CompanyCategoryType;
	categoryName?: string;
	code?: string;
	address?: string;
	contactName?: string;
	phone?: string;
	mobile?: string;
	email?: string;
	remark?: string;

	constructor(arg: CompanyItemInterface) {
		Object.assign(this, arg)
	}
}


export interface CompanyResultModel extends Array<CompanyItemInterface> { }
