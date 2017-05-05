<template>
  <div class="home">
    <i-menu v-if="user" mode="horizontal" theme="dark">
      <i-submenu name="1" class="i-menu-right">
        <template slot="title"><Icon type="person"></Icon>{{user.userinfo.name}}</template>
        <i-menu-item name="1-1" >修改密码</i-menu-item>
        <i-menu-item name="1-2" @click.native="logout">退出</i-menu-item>
      </i-submenu>
      <i-menu-item name="2" class="i-menu-right">签到</i-menu-item>
    </i-menu>
    <i-row>
      <i-col span="5">
        <i-menu v-if="user" @on-select="changePage" theme="light" active-name="profile" class="home-side">
          <i-menu-group title="基本信息">
            <i-menu-item name="profile"><Icon type="document-text"></Icon>个人信息</i-menu-item>
            <i-menu-item name="salary"><Icon type="chatbubbles"></Icon>工资信息</i-menu-item>
          </i-menu-group>
          <i-menu-group title="资产信息">
            <i-menu-item name="asset"><Icon type="document-text"></Icon>个人资产</i-menu-item>
          </i-menu-group>
          <i-menu-group title="休假信息">
            <i-menu-item name="apply"><Icon type="document-text"></Icon>申请休假</i-menu-item>
            <i-menu-item name="history"><Icon type="document-text"></Icon>休假记录</i-menu-item>
          </i-menu-group>
        </i-menu>
      </i-col>
      <i-col class="home-content" span="19">
        <router-view></router-view>
      </i-col>
    </i-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getJWTDecode, removeAuthorization } from '@/utils'
import { Row as iRow, Col as iCol } from 'iview/src/components/grid'
import iMenu from 'iview/src/components/menu'
import Icon from 'iview/src/components/icon'
const iMenuItem = iMenu.Item
const iMenuGroup = iMenu.Group
const iSubmenu = iMenu.Sub

export default {
  name: 'home',
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    logout () {
      removeAuthorization()
      this.$router.push('/sign-in')
    },
    changePage (name) {
      this.$router.push(`/user/${name}`)
    }
  },
  components: {
    iRow,
    iCol,
    Icon,
    iMenu,
    iSubmenu,
    iMenuItem,
    iMenuGroup
  },
  created () {
    let auth = getJWTDecode()
    let self = this
    if (auth) {
      this.$store.dispatch('getUserDetail', {
        id: auth.user_id,
        success () {
          self.$router.push('/user/profile')
        },
        error () {
          self.$router.push('/sign-in')
        }
      })
    } else {
      this.$router.push('/sign-in')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home {
  .i-menu-right {
    float: right;
  }
  a {
    color: #657180;
  }
  .home-content {
    padding-top: 40px;
  }
}
</style>
