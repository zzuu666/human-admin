<template>
  <div class="salary">
    <i-row>
      <i-col span="20" offset="2">
        <i-table :columns="header" :data="salarys || []"></i-table>
      </i-col>
    </i-row>
  </div>
</template>

<script>
import { Row as iRow, Col as iCol } from 'iview/src/components/grid'
import { getJWTDecode } from '@/utils'
import iTable from 'iview/src/components/table'

export default {
  name: 'salary',
  data () {
    return {
      header: [
        {
          title: '发薪日期',
          key: 'date'
        },
        {
          title: '税前薪资',
          key: 'salary'
        },
        {
          title: '养老保险',
          key: 'pension'
        },
        {
          title: '医疗保险',
          key: 'medical'
        },
        {
          title: '失业险',
          key: 'unemployment'
        },
        {
          title: '公积金',
          key: 'housing'
        },
        {
          title: '法定税',
          key: 'tax'
        },
        {
          title: '小计',
          key: 'remain'
        }
      ]
    }
  },
  computed: {
    salarys () {
      let arr = this.$store.getters.salaryList.map((el) => {
        let obj = Object.create(null)
        for (let key in el) {
          obj[key] = el[key]
        }
        obj.remain = obj.salary - obj.pension - obj.medical - obj.unemployment - obj.housing - obj.tax
        return obj
      })
      return arr
    }
  },
  components: {
    iTable,
    iRow,
    iCol
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
