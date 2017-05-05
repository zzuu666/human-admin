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
                <Date-picker type="date" placeholder="开始日期"></Date-picker>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <Date-picker type="date" placeholder="结束日期"></Date-picker>
              </Col>
            </Row>
          </Form-item>
          <Form-item>
            <Button type="primary">提交</Button>
          </Form-item>
        </Form>
      </Col>
    </Row>
    
  </div>
</template>

<script>
export default {
  name: 'vacationApply',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
