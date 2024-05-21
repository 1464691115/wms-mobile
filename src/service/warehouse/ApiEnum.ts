// (POST|GET)\s/move/([\w_]+)\n(.*)
// /** $3 */\n\U$2 = '/move/$2',
export enum WarehouseApi {
    /** 根据仓库id查询 */
    RES_ALL_BY_WAREHOUSE_ID = '/warehouse/res_all_by_warehouse_id',
    /** 删除库位 */
    RES_DELETE = '/warehouse/res_delete',
    /** 根据id获取库区 */
    RES_GET_BY_ID = '/warehouse/res_get_by_id',
    /** 添加库位 */
    RES_INSERT = '/warehouse/res_insert',
    /** 分页库区 */
    RES_LIST = '/warehouse/res_list',
    /** 查询所有库位 */
    RES_SELECT_ALL = '/warehouse/res_select_all',
    /** 修改库位 */
    RES_UPDATE = '/warehouse/res_update',
    /** /根据 库位 id 查询 */
    STOCK_ALL_BY_RESERVOIR_ID = '/warehouse/stock_all_by_reservoir_id',
    /** /删除货架 */
    STOCK_DELETE = '/warehouse/stock_delete',
    /** 根据id查询货架 */
    STOCK_GET_BY_ID = '/warehouse/stock_get_by_id',
    /** 新增货架 */
    STOCK_INSERT = '/warehouse/stock_insert',
    /** 分页货架列表 */
    STOCK_LIST = '/warehouse/stock_list',
    /** /查询所有货架 */
    STOCK_SELECT_ALL = '/warehouse/stock_select_all',
    /** 修改货架 */
    STOCK_UPDATE = '/warehouse/stock_update',
    /** 删除仓库 */
    WAR_DELETE = '/warehouse/war_delete',
    /** 根据id获取仓库 */
    WAR_GET_BY_ID = '/warehouse/war_get_by_id',
    /** 添加仓库 */
    WAR_INSERT = '/warehouse/war_insert',
    /** 仓库分页列表 */
    WAR_LIST = '/warehouse/war_list',
    /** 获取所有仓库 */
    WAR_SELECT_ALL = '/warehouse/war_select_all',
    /** 修改仓库 */
    WAR_UPDATE = '/warehouse/war_update',
}
