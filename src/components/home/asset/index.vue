<template>
  <div class="asset">
    <i-row>
      <i-col span="20" offset="2">
        <i-table :context="self" :columns="header" :data="assetList"></i-table>
      </i-col>
    </i-row>
  </div>
</template>

<script>
import { Row as iRow, Col as iCol } from 'iview/src/components/grid'
import { getJWTDecode } from '@/utils'
import iTable from 'iview/src/components/table'

export default {
  name: 'asset',
  data () {
    return {
      self: this,
      header: [
        {
          title: '资产名称',
          key: 'name'
        },
        {
          title: '资产编号',
          key: 'mark'
        },
        {
          title: '购入日期',
          key: 'date'
        },
        {
          title: '领取时间',
          key: 'borrow'
        },
        {
          title: '归还时间',
          key: 'back'
        },
        {
          title: '操作',
          align: 'center',
          render (row, column, index) {
            return `<i-button type="primary" size="small" @click="show(${index})">归还</i-button>`
          }
        }
      ]
    }
  },
  components: {
    iTable,
    iRow,
    iCol
  },
  methods: {
    show (index) {
      console.log(index)
    }
  },
  computed: {
    assetList () {
      let arr = this.$store.getters.assetList && this.$store.getters.assetList.map((el) => {
        let obj = Object.create(null)
        obj.name = el.asset.name
        obj.mark = el.asset.mark
        obj.date = el.asset.purchase
        obj.borrow = el.borrow
        obj.back = el.back
        return obj
      })
      return arr
    }
  },
  created () {
    let auth = getJWTDecode()
    this.$store.dispatch('getAssetList', {
      id: auth.user_id
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
