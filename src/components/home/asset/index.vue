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
import { getJWTDecode, fetch } from '@/utils'
import { mapGetters } from 'vuex'
import iTable from 'iview/src/components/table'

const TYPE_MAP = ['', '已借', '已还', '处理中']

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
          title: '申请状态',
          align: 'center',
          key: 'status'
        },
        {
          title: '操作',
          align: 'center',
          render (row, column, index) {
            if (row.status === '已借') {
              return `<i-button type="primary" size="small" @click="show(${index})">归还</i-button>`
            } else if (row.status === '已还') {
              return `<i-button type="primary" disabled size="small">已归还</i-button>`
            } else {
              return `<i-button type="primary" disabled size="small">处理中</i-button>`
            }
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
      let auth = getJWTDecode()
      // 向部门主管提交归还申请
      fetch('human/message/send', 'post', {
        sender: this.id,
        type: 'return',
        content: `您部门员工${this.user.first_name} ${this.user.last_name}, 申请归还物品${this.assetList[index].name}, 物品编号为${this.assetList[index].mark}`,
        key: this.assetList[index].id
      }, (data) => {
        if (data.error) {
          this.$Message.warning('操作异常')
        } else {
          this.$store.dispatch('getMessageList', {
            id: auth.user_id
          })
        }
      }, () => {
        this.$Message.warning('操作异常')
      })

      // 修改物资申请状态
      fetch(`human/assets/return/${this.assetList[index].id}`, 'put', {
        type: 3
      }, (data) => {
        if (data.error) {
          this.$Message.warning('操作异常')
        } else {
          this.$Message.info('已提出归还申请')
          this.$store.dispatch('getAssetList', {
            id: auth.user_id
          })
        }
      }, () => {
        this.$Message.warning('操作异常')
      })
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
        obj.id = el.id
        obj.status = TYPE_MAP[el.status]
        return obj
      })
      return arr
    },
    ...mapGetters({
      id: 'getUserId',
      user: 'getUser'
    })
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
