

export interface StockItemInterface {
    createUid: number;
    updateUid: number;
    createTime: string;
    updateTime: string;
    createUserName: string;
    updateUserName: string;
    startTime?: any;
    endTime?: any;
    id: number;
    number: string;
    orderNumber: string;
    categoryId: number;
    companyId: number;
    status: number;
    type: number;
    remark: string;
    approveUid: number;
    approveTime: string;
    approveUserName: string;
    rejectRemark: string;
    deliveryId: number;
    moveCount: number;
    categoryName: string;
    companyName: string;
    companyCode: string;
}




export interface StockEntryListResultModel extends StockItemInterface { }
