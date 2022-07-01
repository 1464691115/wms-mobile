<template>
    <view>
        <image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel" :isAvatar="isAvatar" :cropFixed="cropFixed"/>
    </view>
</template>

<script>
import ImageCropper from "@/components/invinbg-image-cropper/invinbg-image-cropper.vue";
import { EMIT_ON_KEY } from "@/enums";

export default {
    data() {
        return {
            tempFilePath: '',
            isAvatar: false,
            cropFixed: false
        }
    },
    components: { ImageCropper },
    onLoad(options) {
        this.tempFilePath = options.url
        this.isAvatar = !!options.isAvatar
        this.cropFixed = !!options.cropFixed
    },
    methods: {
        async confirm(e) {
            uni.$emit(EMIT_ON_KEY.SET_FILE_PATH, e.detail.tempFilePath)
            //TODO kesen: 2022-06-11  返回头像是空白是微信基础版本库的原因 2.23.4 没有问题
            this.tempFilePath = e.detail.tempFilePath
            uni.navigateBack({})
        },
        cancel() {
            uni.navigateBack({})
        }
    },
}
</script>