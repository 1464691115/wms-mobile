import { BasicForm, ComponentOptions } from "@/components/Basic/Form/src/types";
import { getCategoryList } from "@/service/sys/category";
import { CategoryType } from "@/service/sys/model/categoryModel";

export const formSchema: BasicForm.FormSchema[] = [
    {
        label: '单据日期',
        field: 'createTime',
        component: ComponentOptions.DateTime
    },
    {
        label: '仓库',
        field: 'cangku',
        component: ComponentOptions.ApiSelect,
    },
    {
        label: '类型',
        field: 'categoryId',
        component: ComponentOptions.ApiSelect,
        componentProps: {
            api: getCategoryList.bind(null, CategoryType.入库单)
        }
    },
    {
        label: '经办人',
        field: 'updateUid',
        component: ComponentOptions.ApiSelect
    },
    {
        label: '备注',
        field: 'beizhu',
        component: ComponentOptions.Textarea
    },
]