<template>
  <div class="salary">
    
  </div>
</template>

<script>
import { getJWTDecode } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'salary',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapGetters({
      salarys: 'salaryList'
    })
  },
  created () {
    let auth = getJWTDecode()
    this.$store.dispatch('getSalaryList', {
      id: auth.user_id
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
