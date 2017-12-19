<template>
  <section data-window>
    <h1>
      진단 룰 정보
    </h1>
    <div data-window-content>
      <div data-table="table">
        <div data-tbody="tbody">
          <table>
            <tbody>
            <tr data-row>
              <th>진단명</th>
              <td>내용</td>
            </tr>
            <tr data-row>
              <th>설명</th>
              <td>내용</td>
            </tr>
            <tr>
              <th>진단기준</th>
              <td>내용</td>
            </tr>
            <tr>
              <th>오진</th>
              <td>내용</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div data-close>
        <el-button size="small" @click.stop="handler">
          닫기
        </el-button>
      </div>
    </div>
  </section>
</template>
<script>

  export default {
    name: "Datetime",
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
      };
    },
    computed: {
    },
    components: {},
    watch: {
    },
    methods: {

    },
    beforeCreate() {
    },
    created() {
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  [data-window]{
    h1{
      margin:0;
      height:60px;
      padding: 0 20px;
      line-height:60px;
    }
  }
  [data-window-content]{
    display:flex;
    flex-direction: column;
    flex:1;
  }
  [data-close]{
    text-align:center;
  }
  [data-table="table"] {
    padding: 0 20px;
    th{
      width:200px;
      border-right:1px solid
    }
  }
  [data-tbody="tbody"]{
    height:360px;
    margin-bottom:20px;
    border-top:1px solid color(default);
    tr{
      border-bottom:1px solid #999;
    }
    th{
      background-color: color(border)
    }
    th,td{
      height:auto;
      padding:10px;
      line-height:normal
    }
  }
</style>
