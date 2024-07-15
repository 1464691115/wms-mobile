export enum CategoryType {
	_,
	/** 单位类别 */
	单位类别,
	/** 物料分类 */
	物料分类,
	/** 入库单 */
	入库单,
	/** 设备分类 */
	设备分类,
	/** 设备产权 */
	设备产权,
}


export class CategoryItemInterface {
	createUid?: number;
	updateUid?: any;
	createTime?: string;
	updateTime?: any;
	createUserName?: string;
	updateUserName?: any;
	id?: number;
	type?: number;
	name?: string;
	remark?: string;
	typeName?: string;

	constructor(arg: CategoryItemInterface) {
		Object.assign(this, arg)
	}
}


export interface CategoryResultModel extends Array<CategoryItemInterface> { }
