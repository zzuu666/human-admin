<template>
  <div class="sign-in">
    <div class="sign-in-header">员工平台登录</div>
    <i-input v-model="account"><span slot="prepend">账号</span></i-input>
    <i-input v-model="password" type="password"><span slot="prepend">密码</span></i-input>
    <i-button @click="submit" type="primary" long>登录</i-button>
  </div>
</template>

<script>
import iInput from 'iview/src/components/input'
import iButton from 'iview/src/components/button'
import { setStorage, fetch, removeAuthorization } from '@/utils'

export default {
  name: 'sign-in',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    submit () {
      removeAuthorization()
      if (!this.account || !this.password) {
        this.$Notice.error({
          title: '账户名密码不能为空'
        })
        return
      }
      fetch('human/auth', 'post', {
        username: this.account,
        password: this.password
      }, (res) => {
        setStorage('token', res.data.token)
        this.$router.push({ path: '/user' })
      }, (error) => {
        if (error.response) {
          this.$Notice.error({
            title: '账户名密码填写有误'
          })
        }
      })
    }
  },
  components: {
    iInput,
    iButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sign-in {
  position: relative;
  top: 80px;
  width: 380px;
  padding: 54px 20px 20px 20px;
  margin: 0 auto;
  border: 2px solid #dfdfdf;
  border-radius: 8px;
  overflow: hidden;
  .ivu-input-wrapper {
    margin: 12px 0;
  }
  .ivu-btn-primary {
    color: #fff;
    background-color: rgb(96, 154, 182);
    border-color: #39f;
  }
  &-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: rgb(65, 118, 144);
    margin-bottom: 40px;
    line-height: 40px;
    font-size: 16px;
    padding: 5px 16px;
    text-align: left;
    color: #fff;
  }
}

</style>
