

export interface MaterialItemInterface {
    createUid: number;
    updateUid?: any;
    createTime: string;
    updateTime?: any;
    createUserName: string;
    updateUserName?: any;
    id: number;
    code: string;
    name: string;
    type: number;
    categoryId: number;
    unitId: number;
    safeNum: number;
    validDay: number;
    remark: string;
    categoryName: string;
    unitName: string;
    typeName: string;
}




export interface MaterialResultModel extends Array<MaterialItemInterface> { }
