<template>
  <div class="hello">
    <Row>
      <Col span="20" offset="2">
        <Table :columns="header" :data="list"></Table>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getJWTDecode } from '@/utils'

const statusMap = ['', '出席', '缺席', '请假', '年假']

export default {
  name: 'vacationHistory',
  computed: {
    list () {
      let arr = this.$store.getters.attendanceList.map((el) => {
        let obj = Object.create(null)
        obj.date = el.date
        obj.status = statusMap[el.status]
        return obj
      })
      return arr
    }
  },
  data () {
    return {
      header: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '状态',
          key: 'status'
        }
      ]
    }
  },
  created () {
    let auth = getJWTDecode()
    this.$store.dispatch('getAttendanceList', {
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
