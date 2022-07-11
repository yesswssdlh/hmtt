<template>
  <div>
    <van-nav-bar title="黑马头条-登录" />
    <div>
      <!-- van-form整体表单组件
        @submit 自定义事件
        van-field 输入框
        label 输入框左边的文本
        rules 表单校验的规则 -->
      <van-form @submit="onSubmit">
        <van-field
          v-model="formLogin.mobile"
          type="tel"
          label="手机号"
          placeholder="请输入11位手机号"
          required
          :rules="[
            {
              required: true,
              message: '请输入11位手机号',
              trigger: 'onChange',
              pattern: /^1[3456789]\d{9}$/,
            },
          ]"
        />
        <van-field
          v-model="formLogin.code"
          type="password"
          label="密码"
          placeholder="请输入6位密码"
          required
          :rules="[
            {
              required: true,
              message: '请输入6位密码',
              trigger: 'onChange',
              pattern: /^\d{6}$/,
            },
          ]"
        />
        <div style="margin: 16px">
          <van-button
          block
          :disabled='isLoading'
          :loading='isLoading'
          type="info"
          loading-text="加载中..."
          native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant'
import { loginAPI } from '@/api/index'
import { setToken } from '@/utils/token'
export default {
  name: 'LoginView',
  data () {
    return {
      formLogin: {
        mobile: '13888888888',
        code: '246810' // 默认只能用246810后台规定了
      },
      isLoading: false
    }
  },
  methods: {
    // 提交表单发送请求
    async onSubmit () {
      this.isLoading = true
      try {
        const res = await loginAPI({
          mobile: this.formLogin.mobile,
          code: this.formLogin.code
        })
        // token存储到本地localStorage
        setToken(res.data.data.token)
        Notify({ type: 'success', message: '登录成功了' })
        // 跳转到Layout页面
        this.$router.replace({
          path: '/layout'
        })
      } catch (error) {
        Notify({ type: 'danger', message: `${error}` })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background: #007bff;
}
/* ::deep 就是把data-v-hash值选择器写到类名的前面 */
::deep .van-nav-bar__title {
  color: white;
}
</style>
