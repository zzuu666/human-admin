<template>
  <div class="sign-in">
    <i-input v-model="account"><span slot="prepend">账号</span></i-input>
    <i-input v-model="password" type="password"><span slot="prepend">密码</span></i-input>
    <i-button @click="submit" type="primary">登录</i-button>
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
      fetch('human/auth', 'post', {
        username: this.account,
        password: this.password
      }, (res) => {
        setStorage('token', res.data.token)
        console.log('login success')
        this.$router.push({ path: '/' })
      }, (error) => {
        if (error.response) {
          console.log(error.response.data)
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
  margin-top: 30%;
  width: 240px;
  margin: 0 auto;
  .ivu-input-wrapper {
    margin: 8px 0;
  }
}

</style>
