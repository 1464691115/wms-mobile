<template>
  <view class="imt-audio">
    <view class="audio-wrapper">
      <view class="audio-number">{{ format(data.current) }}</view>
      <slider
        class="audio-slider"
        :activeColor="color"
        block-size="16"
        :value="data.current"
        :max="data.duration"
        @changing="(data.seek = true), (data.current = $event.detail.value)"
        @change="data.audio.seek($event.detail.value)"
      ></slider>
      <view class="audio-number">{{ format(data.duration) }}</view>
    </view>
    <view class="audio-control-wrapper" :style="{ color }">
      <view
        class="audio-control audio-control-prev"
        v-if="control"
        :style="{ borderColor: color }"
        @click="prev"
      >
        &#xe601;
      </view>
      <view
        class="audio-control audio-control-switch"
        :class="{ audioLoading: data.loading }"
        :style="{ borderColor: color }"
        @click="data.audio.paused ? play() : pause()"
      >
        {{ data.loading ? '&#xe600;' : data.paused ? '&#xe865;' : '&#xe612;' }}
      </view>
      <view
        class="audio-control audio-control-next"
        v-if="control"
        :style="{ borderColor: color }"
        @click="next"
      >
        &#xe601;
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  src: String, //音频链接
  autoplay: Boolean, //是否自动播放
  continue: Boolean, //播放完成后是否继续播放下一首，需定义@next事件
  control: {
    type: Boolean,
    default: true,
  }, //是否需要上一曲/下一曲按钮
  color: {
    type: String,
    default: '#169af3',
  }, //主色调
})

const data = reactive({
  audio: uni.createInnerAudioContext(),
  current: 0, //当前进度(s)
  duration: 0, //总时长(s)
  paused: true, //是否处于暂停状态
  loading: false, //是否处于读取状态
  seek: false, //是否处于拖动状态
})
//返回prev事件
function prev() {
  // data.$emit('prev')
}
//返回next事件
function next() {
  // data.$emit('next')
}
//格式化时长
function format(num) {
  return (
    '0'.repeat(2 - String(Math.floor(num / 60)).length) +
    Math.floor(num / 60) +
    ':' +
    '0'.repeat(2 - String(Math.floor(num % 60)).length) +
    Math.floor(num % 60)
  )
}
//点击播放按钮
function play() {
  data.audio.play()
  data.loading = true
}

onMounted(() => {
  if (props.src) {
    data.audio.src = props.src
    props.autoplay && play()
  }
  data.audio.obeyMuteSwitch = false
  //音频进度更新事件
  data.audio.onTimeUpdate(() => {
    if (!data.seek) {
      data.current = data.audio.currentTime
    }
    if (!data.duration) {
      data.duration = data.audio.duration
    }
  })
  //音频播放事件
  data.audio.onPlay(() => {
    data.paused = false
    data.loading = false
  })
  //音频暂停事件
  data.audio.onPause(() => {
    data.paused = true
  })
  //音频结束事件
  data.audio.onEnded(() => {
    if (props.continue) {
      next()
    } else {
      data.paused = true
      data.current = 0
    }
  })
  //音频完成更改进度事件
  data.audio.onSeeked(() => {
    data.seek = false
  })
})
onUnmounted(() => {
  data.audio.destroy()
})

watch(
  () => props.src,
  (src, old) => {
    if (!src) return
    data.audio.src = src
    data.current = 0
    data.duration = 0
    if (old || props.autoplay) {
      play()
    }
  },
)
</script>

<style>
@font-face {
  font-family: 'icon';
  src: url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot');
  src:
    url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot?#iefix')
      format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff') format('woff'),
    url('//at.alicdn.com/t/font_1104838_fxzimc34xw.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1104838_fxzimc34xw.svg#iconfont') format('svg');
}

.imt-audio {
  padding: 30upx 0;
  background: #fff;
  border-radius: 20upx;
}

.audio-wrapper {
  display: flex;
  align-items: center;
}

.audio-number {
  width: 120upx;
  font-size: 24upx;
  line-height: 1;
  color: #333;
  text-align: center;
}

.audio-slider {
  flex: 1;
  margin: 0;
}

.audio-control-wrapper {
  margin-top: 20upx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'icon' !important;
}

.audio-control {
  font-size: 32upx;
  line-height: 1;
  border: 4upx solid;
  border-radius: 50%;
  padding: 16upx;
}

.audio-control-next {
  transform: rotate(180deg);
}

.audio-control-switch {
  font-size: 40upx;
  margin: 0 100upx;
}

.audioLoading {
  animation: loading 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}
</style>
