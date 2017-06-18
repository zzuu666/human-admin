<template>
  <div class="message">
    <i-row>
      <i-col span="20" offset="2">
        <i-table :context="self" :columns="header" :data="messages || []"></i-table>
      </i-col>
    </i-row>
    <Modal
      v-model="modal"
      :title="title">
      <p v-text="content"></p>
      <div slot="footer">
        <Button type="text" size="small" :loading="false" @click="cancel">取消</Button>
        <Button type="primary" size="small" :loading="false" @click="reject">拒绝</Button>                
        <Button type="success" size="small" :loading="false" @click="ok">通过</Button>        
      </div>
    </Modal>
  </div>
</template>

<script>
import { Row as iRow, Col as iCol } from 'iview/src/components/grid'
import { getJWTDecode, fetch } from '@/utils'
import iTable from 'iview/src/components/table'

const TYPE_MAP = {
  'return': '物品归还',
  'leave': '请假'
}

export default {
  name: 'message',
  data () {
    return {
      modal: false,
      self: this,
      title: 'biaoti',
      content: '',
      current: 0,
      header: [
        {
          title: '发件人',
          key: 'sender'
        },
        {
          title: '日期',
          key: 'time'
        },
        {
          title: '邮件类型',
          key: 'message_type'
        },
        {
          title: '是否已读',
          align: 'center',
          key: 'status'
        },
        {
          title: '操作',
          align: 'center',
          render (row, column, index) {
            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button>`
          }
        }
      ]
    }
  },
  methods: {
    show (index) {
      let data = this.messages[index]
      this.title = data.message_type
      this.content = data.content
      this.current = index
      this.modal = true
      if (data.status !== '已读') {
        fetch(`human/message/read/${data.id}`, 'put', {}, () => {
          console.log('dddd', this)
          this.messages[index].status = '已读'
        }, () => {
          this.messages[index].status = '异常'
        })
      }
    },
    ok () {
      let data = this.messages[this.current]
      console.log(data)
      if (data.message_type === '物品归还') {
        fetch(`human/assets/return/${data.key}`, 'put', {}, (data) => {
          if (data.error) {
            this.$Message.info('操作异常')
          } else {
            this.$Message.info('操作成功')
            this.modal = false
          }
        }, () => {
          this.$Message.info('操作异常')
        })
      }
    },
    cancel () {
      this.modal = false
    },
    reject () {
      this.modal = false
    }
  },
  computed: {
    messages () {
      let arr = this.$store.getters.messageList.map((el) => {
        let obj = Object.create(null)
        for (let key in el) {
          obj[key] = el[key]
        }
        obj.message_type = TYPE_MAP[el.message_type]
        if (obj.status) {
          obj.status = '已读'
        } else {
          obj.status = '未读'
        }
        obj.sender = el.sender && el.sender.userinfo && el.sender.userinfo.name
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
    this.$store.dispatch('getMessageList', {
      id: auth.user_id
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
