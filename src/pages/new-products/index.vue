<template>
    <view class="new-products new-products-wrap">
        <uni-section title="基本信息" type="line" titleFontSize="18px" />

        <view class="new-products-form">
            <BasicForm @register="register"></BasicForm>
        </view>

    </view>
</template>

<script lang='ts' setup>
import { ComponentOptions, useForm } from '@/components/Basic/Form';
import BasicForm from '@/components/Basic/Form/src/BasicForm.vue';


const [register] = useForm({
    layout: 'horizontal',
    baseColProps: {
        span: 24,
    },
    labelWidth: 200,
    colon: false,
    showActionButtonGroup: false,
    schemas: [
        {
            label: '货品名称',
            field: 'name',
            component: ComponentOptions.Input,
            required: true
        },
        {
            label: '规格型号',
            field: 'specs',
            component: ComponentOptions.Input,
        },
        {
            label: '货品编码',
            field: 'orderNo',
            component: ComponentOptions.Input,
            componentProps: {
                placeholder: '不输入则自动编码'
            }
        },
        {
            label: '条形码',
            field: 'barCode',
            component: ComponentOptions.Input,
        },
        {
            label: '货品类型',
            field: 'type',
            component: ComponentOptions.Select,
        },
        {
            label: '初始仓库',
            field: 'type',
            component: ComponentOptions.Select,
        },
        {
            label: '货品图片',
            field: 'img',
            component: ComponentOptions.Upload,
        },
        {
            label: '备注',
            field: 'descript',
            component: ComponentOptions.Textarea,
        },
    ]
})

</script>

<style lang='scss' scoped>
.new-products {

    ::v-deep .uni-section-header {
        padding-left: 28rpx;
        padding-bottom: 0;
    }


    .new-products-form {
        padding: 30rpx 0 40rpx 36rpx;
        background-color: #fff;
    }
}
</style>