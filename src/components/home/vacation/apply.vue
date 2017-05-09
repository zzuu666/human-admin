<template>
  <div class="apply">
    <Row>
      <Col class="apply-header" span="14" offset="5">
        您的年假剩余 {{vacation}} 天
      </Col>
      <Col span="14" offset="5">
        <Form :label-width="80">
          <Form-item label="选择日期">
            <Row>
              <Col span="11">
                <Date-picker :options="disable" @on-change="selectStartDay" type="date" placeholder="开始日期"></Date-picker>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <Date-picker :options="disable" @on-change="selectEndDay" type="date" placeholder="结束日期"></Date-picker>
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="submit">提交</Button>
          </Form-item>
        </Form>
      </Col>
    </Row>
    
  </div>
</template>

<script>
import { fetch } from '../../../utils'

export default {
  name: 'vacationApply',
  data () {
    return {
      disable: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      start: '',
      end: ''
    }
  },
  methods: {
    selectStartDay (value) {
      this.start = value
    },
    selectEndDay (value) {
      this.end = value
    },
    submit () {
      fetch('human/vacation', 'post', {
        user: this.$store.getters.getUserId,
        start: this.start,
        end: this.end
      }, (res) => {
        if (res.error) {
          this.$Message.error('提交失败')
        } else {
          this.$Message.success('提交成功')
        }
      }, () => {
        this.$Message.error('提交失败')
      })
    }
  },
  computed: {
    vacation () {
      return this.$store.getters.getUserVacation
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.apply {
  .apply-header {
    margin-bottom: 20px;    
    font-size: 18px;
  }
}
</style>
