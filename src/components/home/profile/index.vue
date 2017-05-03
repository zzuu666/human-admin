<template>
  <div class="profile">
    Profile
    <i-form label-position="left" label-width="80">
      <i-form-item label="输入框">
            <i-input placeholder="请输入"></i-input>
        </i-form-item>
    </i-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Row as iRow, Col as iCol } from 'iview/src/components/grid'
import iForm from 'iview/src/components/form'
import iInput from 'iview/src/components/input'
const iFormItem = iForm.Item

export default {
  name: 'profile',
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
    iRow,
    iCol,
    iForm,
    iFormItem,
    iInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
