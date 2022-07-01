<template>
    <view class='camera-page'>
        <camera device-position="back" flash="off" @error="error"></camera>
        <cover-view class="flex-d-c">
            <cover-view class="title ">将报告资料放入框内，即可快速扫描</cover-view>
            <cover-view class="con-camera ">
                <cover-view class="c-wrap wh"></cover-view>
            </cover-view>
            <cover-view class="con-operate">
                <cover-view class="c-album" @click="openAlbum">
                    <cover-image src="@/static/images/components/camera-album.png" />
                    <cover-view> 相册 </cover-view>
                </cover-view>

                <cover-view class="c-action" @click="takePhoto">
                    <cover-view class="c-a-b" />
                </cover-view>

                <cover-view class="c-right">
                    <cover-view class="c-type " v-if="cameraList.length < 1">
                        <cover-view class="item " :class="{ action: index == cTypeIndex }"
                            v-for="(item, index) in cType" :key="index" @click="() => this.cTypeIndex = index">{{ item
                            }}
                        </cover-view>
                    </cover-view>
                    <block v-else>
                        <cover-view class="c-image" @click="handleCameraList">
                            <cover-view class="wrap">
                                <cover-image :src="cameraList[cameraList.length - 1]" />
                                <!-- <cover-view class="status ">已完成</cover-view> -->
                            </cover-view>
                        </cover-view>
                        <cover-view class="num ">{{ cameraList.length }}</cover-view>
                    </block>
                </cover-view>


            </cover-view>
        </cover-view>
    </view>
</template>
<script>
import { chooseImage } from "@/utils";

export default {
    data() {
        return {
            cameraList: [],
            cType: ['单拍', '多拍'],
            cTypeIndex: 0
        }
    },
    options: { styleIsolation: "shared" },
    methods: {
        takePhoto() {

            const ctx = uni.createCameraContext();
            ctx.takePhoto({
                quality: 'high',
                success: (res) => {
                    this.toCropperImg(res.tempImagePath).then(res => {
                        this.cameraList.push(res)
                        // 单拍
                        if (this.cTypeIndex == 0) {
                            this.handleCameraList()
                            return
                        }
                    })



                }
            });
        },
        handleCameraList() {
            //TODO kesen: 2022-07-01  要执行的方法
            // this.toCameraSuccess({ list: this.cameraList, status: 'pending' })
            
            this.cameraList = []
        },
        async openAlbum() {
            const res = await chooseImage({
                count: 9 - this.cameraList.length,
                sourceType: ['album'],
            })
            if (res.tempFilePaths.length == 1) {
                this.toCropperImg(res.tempFilePaths[0]).then(res => {
                    this.cameraList.push(res)
                })
            } else this.cameraList.push(...(res.tempFilePaths || []))

        },
        error(e) {
            console.log(e.detail);
        },
    },
}
</script>
<style lang='scss' scoped>
.camera-page {
    $footerHeight: 182rpx;
    @include pageWrap;

    background-color: #000000;

    camera {
        width: 100%;
        height: calc($pageHeight - $footerHeight);
    }

    &>cover-view {

        @include pageWrap;
        position: absolute;
        top: 0;
        background-color: transparent;

        .title {
            @include font(30rpx, 100rpx, #ffffff, 400);
            position: absolute;
            top: 0;
            width: 100%;
            height: 100rpx;
            text-align: center;
            z-index: 2;
        }

        .con-camera {
            height: calc($pageHeight - $footerHeight);
            border: solid rgba(#000000, .4);
            border-width: 105rpx 55rpx;

            .c-wrap {
                // TODO 真机那边出现 左右边框消失的问题
                // border: 1px solid #fff;
            }
        }

        .con-operate {
            @include wh(calc(100% - 52rpx * 2), calc($footerHeight - 1rpx));
            margin: 0 auto;
            position: relative;
            background-color: #000000;
            overflow: visible;

            .c-album {
                $albumHeight: 50rpx;

                @include wh(120rpx, $albumHeight);
                @include font(30rpx, $albumHeight, #ffffff, 400);
                @include absoluteAlgin($albumHeight);
                position: absolute;

                cover-image {
                    @include wh(50rpx, auto);
                    position: absolute;
                    margin-right: 10rpx;
                }

                cover-view {
                    float: right;
                    line-height: 50rpx;
                }
            }



            .c-action {
                $actionSize: 90rpx;
                @include absoluteAlgin($actionSize);
                @include absoluteJustify($actionSize);
                @include border(1px solid #ffffff, 51%);
                @include whSquare($actionSize);
                position: absolute;
                overflow: visible;

                .c-a-b {
                    @include whSquare($actionSize);
                    border-radius: 51%;
                    position: absolute;
                    transform: scale(.9);
                    transform-origin: center center;
                    background-color: #ffffff;
                }
            }

            .c-right {
                $cRightH: 100rpx;

                @include wh(200rpx, $cRightH);
                @include font(28rpx, 28rpx, #ffffff, 400);
                position: relative;
                float: right;
                margin-top: calc(($footerHeight - $cRightH) / 2);


                .num {
                    @include whSquare(37rpx);
                    @include font(22rpx, 22rpx, #ffffff, 400);
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: #6BCA66;
                    border-radius: 51%;
                    z-index: 2;
                    text-align: center;
                    line-height: 37rpx;
                }



                .c-type {
                    $cTypeH: 65rpx;

                    @include wh(200rpx, $cTypeH);
                    margin-top: calc(($cRightH - $cTypeH) / 2);
                    background-color: #3C5194;
                    border-radius: 6px;
                    overflow: hidden;

                    .item {
                        @include wh(50%, 100%);
                        text-align: center;
                        line-height: $cTypeH;
                        float: left;
                    }

                    .action {
                        background-color: #ffffff;
                        color: #000;
                        border-radius: 6px;
                    }
                }

                .c-image {
                    @include font(24rpx, 24rpx, #ffffff, 400);
                    @include wh(86rpx, 85rpx);
                    margin-right: 15rpx;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    overflow: visible;

                    .wrap {
                        @include wh;
                        position: relative;
                        border-radius: 6px;
                    }

                    cover-image {
                        @include wh;
                    }

                    .status {
                        @include wh(100%, 30rpx);
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        background: #6BCA66;
                        text-align: center;
                        line-height: 30rpx;
                    }
                }
            }

        }
    }
}
</style>