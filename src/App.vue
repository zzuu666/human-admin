<template>
  <div id="app">
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Icon from 'iview/src/components/icon'
import iMenu from 'iview/src/components/menu'
const iMenuItem = iMenu.Item

export default {
  name: 'app',
  components: {
    Icon,
    iMenu,
    iMenuItem
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
  .app-content {
    position: relative;
    width: 100%;
  }
}
</style>
