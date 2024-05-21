<template>
  <view class="stock-detail">
    <view class="stock-detail_title">
      <uni-section
        :title="`单号 ${stockDetailInfo?.orderNumber || ''}`"
        :sub-title="
          [
            stockDetailInfo?.createUserName,
            stockDetailInfo?.createTime,
            '创建',
          ].join(' ')
        "
        type="line"
      >
        <template #right>
          <view class="flex-col align-center">
            <Icon :icon="ICON_UNICODE.PRINT" color="#348BF4" :size="50" />
          </view>
        </template>
      </uni-section>
    </view>
    <view class="stock-detail_content">
      <BasicForm v-if="isEdit" @register="register" />

      <view
        v-else
        v-for="item in formSchema"
        :key="item.field"
        class="txt-cell flex justify-between"
      >
        <view style="color: #656565">{{ item.label }}</view>
        <view style="color: #313131">
          {{
            item.field == 'categoryId'
              ? categoryList?.find(
                  (el) => el.id == stockDetailInfo?.[item.field],
                )?.name
              : stockDetailInfo?.[item.field]
          }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useForm } from '@/components/Basic/Form'
import BasicForm from '@/components/Basic/Form/src/BasicForm.vue'
import Icon from '@/components/Basic/Icon/src/Icon.vue'
import { getStockEntryInfo } from '@/service/stock'
import useAxiosRef from '@/utils/hooks/web/useAxiosRef'
import { ref, watch } from 'vue'
import { categoryList, formSchema } from '../index.data'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})

const props = defineProps({
  sid: String,
})

const [stockDetailInfo, reload] = useAxiosRef({
  api: getStockEntryInfo,
  immediate: false,
})

const [register, { setFieldsValue }] = useForm({
  schemas: formSchema,
  layout: 'horizontal',
  labelWidth: 160,
  labelAlign: 'end',
  baseColProps: {
    span: 23,
  },
  showActionButtonGroup: false,
})

const isEdit = ref(false)

watch(
  () => props.sid,
  (val) => {
    if (!val) return

    reload({ id: val }).then(() => {
      setFieldsValue(stockDetailInfo.value)
    })
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.stock-detail {
  background-color: #fff;
  padding: 0 0 10rpx;

  &_title {
    padding: 0 30rpx;

    ::v-deep .uni-section {
      &-header {
        padding: 18rpx 0;
        align-items: flex-start;
        &__decoration {
          margin-top: 8rpx;
        }
      }
    }
  }

  ::v-deep &_content {
    margin-top: 10rpx;
    padding: 0 20rpx 0 30rpx;

    .txt-cell {
      margin-bottom: 20rpx;
    }

    .form-item {
      margin-bottom: 0 !important;
    }

    .is-disabled,
    .is-disabled .basic-input_inner,
    .is-disabled .input-padding,
    .is-disabled .basic-input_group-content,
    .uni-date-editor--x__disabled {
      padding-left: 0;
      border-color: transparent !important;
      background-color: transparent !important;
      opacity: 1;
    }

    .is-disabled .uni-easyinput__content-textarea {
      margin: 0;
    }

    .uni-date-x,
    .uni-date__x-input,
    .select-picker-txt,
    .basic-input_inner,
    .uni-input-input,
    .uni-textarea-textarea {
      color: #333 !important;
      font-size: 14px !important;
    }
  }

}
</style>
