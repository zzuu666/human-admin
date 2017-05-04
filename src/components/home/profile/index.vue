<template>
  <div class="profile">
    <i-row class="form-header">
      <i-col span="5" offset="5">
        <h3>个人基本信息</h3>
      </i-col>
      <i-col class="form-switch" span="5" offset="4">
        <i-switch v-model="canEdit"></i-switch>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="14" offset="5">
        <i-form label-position="left" :label-width="80">
          <i-row>
            <i-col span="10">
              <i-form-item label="姓">
                <i-input
                  :disabled="!canEdit"
                  :value="user && user.first_name"
                  @input="updateUser($event, 'first_name')"
                  placeholder="请输入"></i-input>
              </i-form-item>    
            </i-col>
            <i-col span="12" offset="2">
              <i-form-item label="名">
                <i-input
                  :disabled="!canEdit"
                  :value="user && user.last_name"
                  @input="updateUser($event, 'last_name')"
                  placeholder="请输入"></i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-form-item label="出生日期"><i-date-picker :value="user && user.userinfo && user.userinfo.birth " @on-change="updateUserInfo($event, 'birth')" :disabled="!canEdit" type="date" placeholder="选择日期" ></i-date-picker></i-form-item>
          <i-form-item label="电子邮箱"><i-input :value="user && user.email" :disabled="!canEdit" placeholder="请输入"></i-input></i-form-item>
          <i-alert type="success" v-show="success">修改成功</i-alert>
          <i-alert type="error" v-show="error">修改失败</i-alert>
          <i-button type="primary" v-show="canEdit" @click="submit" :loading="loading">
            <span v-if="!loading">确认修改</span>
            <span v-else>Loading...</span>
          </i-button>
        </i-form>
      </i-col>
    </i-row>
    <i-row class="form-header">
      <i-col span="5" offset="5">
        <h3>个人职位信息</h3>
      </i-col>
    </i-row>
    <i-row class="form-header">
      <i-col span="14" offset="5">
        <p>所在部门: {{user && user.userinfo && user.userinfo.dep && user.userinfo.dep.name}}</p>
        <p>职称评定: {{user && user.userinfo && user.userinfo.arms}}{{user && user.userinfo && user.userinfo.level}}</p>
      </i-col>
    </i-row>
  </div>
</template>

<script>
import { fetch } from '@/utils'
import { mapGetters } from 'vuex'
import { Row as iRow, Col as iCol } from 'iview/src/components/grid'
import iAlert from 'iview/src/components/alert'
import iForm from 'iview/src/components/form'
import iButton from 'iview/src/components/button'
import iInput from 'iview/src/components/input'
import iSwitch from 'iview/src/components/switch'
import iDatePicker from 'iview/src/components/date-picker'
const iFormItem = iForm.Item

export default {
  name: 'profile',
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    updateUser (value, key) {
      this.$store.commit('updateUserKey', {
        key,
        value
      })
    },
    updateUserInfo (value, key) {
      this.$store.commit('updateUserInfoKey', {
        key,
        value
      })
    },
    submit () {
      this.loading = true
      fetch(`human/users/${this.user.id}`, 'put', this.user, (res) => {
        this.$store.commit('saveUserDetail', res.data)
        this.success = true
        setTimeout(() => {
          this.success = false
        }, 1000)
        this.loading = false
      }, (err) => {
        if (err.response) {
          this.loading = false
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 1000)
        }
      })
    }
  },
  data () {
    return {
      canEdit: false,
      loading: false,
      success: false,
      error: false
    }
  },
  components: {
    iRow,
    iCol,
    iForm,
    iFormItem,
    iDatePicker,
    iInput,
    iSwitch,
    iButton,
    iAlert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.profile {
  .form-header {
    text-align: left;
    padding: 10px 0;
    h3 {
      font-size: 20px;
      font-weight: 100;
    }
    .form-switch {
      text-align: right;
    }
  }
}
.window-alert {
  position: fixed;
  top: 20px;
}
</style>
