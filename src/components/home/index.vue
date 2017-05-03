<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getJWTDecode } from '@/utils'
import iMenu from 'iview/src/components/menu'
import Icon from 'iview/src/components/icon'
const iMenuItem = iMenu.Item
const iMenuGroup = iMenu.Group

export default {
  name: 'home',
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Icon,
    iMenu,
    iMenuItem,
    iMenuGroup
  },
  created () {
    let auth = getJWTDecode()
    let self = this
    if (auth) {
      this.$store.dispatch('getUserDetail', {
        id: auth.user_id,
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
<style scoped>

</style>
