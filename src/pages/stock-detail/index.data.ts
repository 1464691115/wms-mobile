import { BasicForm, ComponentOptions } from "@/components/Basic/Form/src/types";
import { getCategoryList } from "@/service/sys/category";
import { CategoryType } from "@/service/sys/model/categoryModel";
import useAxiosRef from "@/utils/hooks/web/useAxiosRef";


export const [categoryList] = useAxiosRef({
    api: getCategoryList.bind(null, CategoryType.入库单),
    immediate: true,
})

export const formSchema: BasicForm.FormSchema[] = [
    {
        label: '单据日期',
        field: 'createTime',
        component: ComponentOptions.DateTime
    },
    {
        label: '类型',
        field: 'categoryId',
        component: ComponentOptions.ApiSelect,
        componentProps: {
            list: categoryList,
            labelField: 'name',
            valueField: 'id'
        }
    },
    {
        label: '经办人',
        field: 'createUserName',
        component: ComponentOptions.Input,
    },
    {
        label: '备注',
        field: 'remark',
        component: ComponentOptions.Textarea,
        componentProps: {
            placeholder: '暂无备注',
            autoHeight: true
        }
    },
]