export enum MoveApi {
    /** 删除出入库信息 */
    DELETE = '/move/delete',

    /** 根据id查询 */
    GET_BY_ID = '/move/get_by_id',

    /** 新增出入库信息 */
    INSERT = '/move/insert',

    /** 根据出入库单号获取 */
    SELECT_BY_STOCK_ENTRY_ID = '/move/select_by_stock_entry_id',

    /** 根据移位单号获取 */
    SELECT_BY_STOCK_TRANS_ID = '/move/select_by_stock_trans_id',

    /** 入库记录 */
    STOCK_IN_LIST = '/move/stock_in_list',

    /** 出库记录 */
    STOCK_OUT_LIST = '/move/stock_out_list',

    /** 移位记录 */
    TRANS_LIST = '/move/trans_list',

    /** 修改出入库信息 */
    UPDATE = '/move/update'
}
