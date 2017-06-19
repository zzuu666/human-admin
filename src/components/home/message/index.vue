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
        <Button type="text" size="small" :loading="false" @click="cancel">关闭</Button>
        <Button type="primary" v-if="!result" size="small" :loading="false" @click="reject">拒绝</Button>                
        <Button type="success" v-if="!result" size="small" :loading="false" @click="ok">通过</Button>        
      </div>
    </Modal>
  </div>
</template>

<script>
import { Row as iRow, Col as iCol } from 'iview/src/components/grid'
import { getJWTDecode, fetch, messageOptions, messageSend } from '@/utils'
import iTable from 'iview/src/components/table'

const TYPE_MAP = {
  'return': '物品归还',
  'leave': '请假',
  'read': '通知消息'
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
      result: false,
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
          title: '已读?',
          align: 'center',
          key: 'status',
          width: 80,
          render (row, column, index) {
            if (!row.status) {
              return `<Icon type="close-round"></Icon>`
            } else {
              return `<Icon type="checkmark-round"></Icon>`
            }
          }
        },
        {
          title: '处理?',
          align: 'center',
          key: 'result',
          width: 80,
          render (row, column, index) {
            if (row.message_type === '通知消息') {
              return ``
            }
            if (!row.result) {
              return `<Icon type="close-round"></Icon>`
            } else {
              return `<Icon type="checkmark-round"></Icon>`
            }
          }
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
      let message = this.messages[index]
      this.title = message.message_type
      this.content = message.content
      this.current = index
      this.result = message.result
      this.modal = true
      if (!message.status) {
        messageOptions(message.id, 'read', this)
      }
    },
    ok () {
      let message = this.messages[this.current]
      if (message.message_type === '物品归还') {
        fetch(`human/assets/return/${message.key}`, 'put', {
          type: 2
        }, (data) => {
          if (data.error) {
            this.$Message.info('操作异常')
          } else {
            this.$Message.info('操作成功')
            messageSend({
              sender: message.to,
              to: message.senderId,
              type: 'read',
              content: '回复: ' + message.content + ' 审批通过',
              key: message.key
            }, this)
            messageOptions(message.id, 'result', this)
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
      let message = this.messages[this.current]
      if (message.message_type === '物品归还') {
        fetch(`human/assets/return/${message.key}`, 'put', {
          type: 1
        }, (data) => {
          if (data.error) {
            this.$Message.info('操作异常')
          } else {
            this.$Message.info('操作成功')
            messageSend({
              sender: message.to,
              to: message.senderId,
              type: 'read',
              content: '回复: ' + message.content + '审批未通过',
              key: message.key
            }, this)
            messageOptions(message.id, 'result', this)
            this.modal = false
          }
        }, () => {
          this.$Message.info('操作异常')
        })
      }
    }
  },
  computed: {
    messages () {
      let arr = this.$store.getters.messageList.map((el) => {
        let obj = Object.create(null)
        for (let key in el) {
          obj[key] = el[key]
        }
        obj.senderId = el.sender && el.sender.id
        obj.message_type = TYPE_MAP[el.message_type]
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
