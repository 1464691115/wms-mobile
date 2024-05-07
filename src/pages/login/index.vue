<template>
  <hic-login
    logo="/static/images/logo.png"
    title="友宽云仓库"
    :props="props"
    :history="history"
    :thirdProps="thirdProps"
    wxProfile
    @login="handleLogin"
    @remove="remove"
    @third-login="thirdLogin"
    @wx-login="wxLogin"
  >
    <template #user>
      <text class="cuIcon-my form-input"></text>
    </template>
    <template #pwd>
      <text class="cuIcon-unlock form-input"></text>
    </template>
    <template #bottom>
      <!-- <view>福建海智信息技术有限公司</view>
      <view class="text-center">0591-88515005</view> -->
    </template>
  </hic-login>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import hicLogin from '@/uni_modules/hic-login/components/hic-login/hic-login.vue'
import { loginApi } from '@/service/sys/user'

export default defineComponent({
  components: { hicLogin },
  setup() {
    return {
      props: { account: 'loginName', password: 'password' },
      history: [],
      thirdProps: [
        {
          provider: 'weixin',
          text: '微信授权',
          icon: 'cuIcon-weixin',
          color: 'lines-green',
        },
      ],
    }
  },
  methods: {
    handleLogin(form) {
      // 表单验证
      console.log(form) // {loginName: '13xxx81', password: '123'}
      loginApi({ phone: form.loginName, password: form.password })
    },
    remove(item, index) {
      uni.showModal({
        title: '提示',
        content: `确定删除账号${item.loginName}？`,
        success: (res) => {
          this.history.splice(index, 1)
        },
      })
    },
    thirdLogin(res) {
      console.log(res) // {errMsg: "login:ok", code: "xxx"}
    },
    wxLogin(data) {
      console.log(data) // {code: "xxx", userInfo: {nickName: 'xx', gender: '0', avatarUrl: 'http://xxx'}}
    },
  },
})
</script>

<style lang="scss">
.form-input {
  font-size: 45rpx;
  color: #5057cb;
  margin: 0 10rpx;
}
.cuIcon-weixin:before {
  content: '\e612';
}
.text-green,
.line-green,
.lines-green {
  color: #39b54a;
}
</style>
