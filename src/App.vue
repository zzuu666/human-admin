<template>
  <div id="app">
    <i-menu v-if="user" mode="horizontal" theme="dark" active-name="1">
      <i-submenu name="1" class="i-menu-right">
        <template slot="title"><Icon type="person"></Icon>{{user.userinfo.name}}</template>
        <i-menu-item name="3-1">新增和启动</i-menu-item>
        <i-menu-item name="3-2">活跃分析</i-menu-item>
        <i-menu-item name="3-3">时段分析</i-menu-item>
      </i-submenu>
    </i-menu>
    <i-row>
      <i-col span="6">
        <i-menu v-if="user" theme="light" active-name="1" class="home-side">
          <i-menu-group title="基本信息">
            <i-menu-item name="1"><Icon type="document-text"></Icon>个人信息</i-menu-item>
            <i-menu-item name="2"><Icon type="chatbubbles"></Icon>工资信息</i-menu-item>
          </i-menu-group>
          <i-menu-group title="资产信息">
            <i-menu-item name="3"><Icon type="document-text"></Icon>个人资产</i-menu-item>
          </i-menu-group>
          <i-menu-group title="休假信息">
            <i-menu-item name="4"><Icon type="document-text"></Icon>申请休假</i-menu-item>
            <i-menu-item name="5"><Icon type="document-text"></Icon>休假记录</i-menu-item>
          </i-menu-group>
        </i-menu>
      </i-col>
      <i-col span="18">
        <router-view></router-view>
      </i-col>
    </i-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from 'iview/src/components/icon'
import iMenu from 'iview/src/components/menu'
import { Row as iRow, Col as iCol } from 'iview/src/components/grid'

const iMenuItem = iMenu.Item
const iMenuGroup = iMenu.Group
const iSubmenu = iMenu.Sub

export default {
  name: 'app',
  components: {
    Icon,
    iMenu,
    iMenuItem,
    iMenuGroup,
    iSubmenu,
    iRow,
    iCol
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .i-menu-right {
    float: right;
  }
}
</style>
