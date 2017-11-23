<template>
  <div class="template-table dynamic-row">
    <div class="table-head-wrap">
      <table>
        <thead>
        <tr>
          <th v-for="(th, i) in field" :key="th.id" :class="'col'+i">{{th}}</th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="table-body-wrap">
      <table>
        <tbody>
        <template v-for="row in tableData" >
          <tr>
            <td v-for="(col, key, idx) in row" :class="['col'+idx,{ 'col-end' : field.length-1 === idx }]">
              {{col}}
              <button class="icon-btn icon-wrap" v-if="field.length-1 === idx" @click="moreRow(row)" :class="{on : row === more}">
                <i class="fa fa-arrow-down" aria-hidden="true" :class="{rotate : row === more}"></i>
              </button>
            </td>
          </tr>
          <transition name="fade" >
            <tr v-if="row === more">
              <td :colspan="7" :key="row.id">12343455647</td>
            </tr>
          </transition>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Datatableinfourl",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      field:Array,
      tableData:{
        type: Array | Object
      }
    },
    data() {
      return {
        more : null
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      moreRow(row){
        if(this.more === row){
          this.more = null
        }else{
          this.more = row
        }
      }
    },
    beforeCreate() {},
    created() {},
    beforeMounted() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    actvated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0
  }
  .fa{
    transition:all 0.3s ease;
    &.rotate{
      transform: rotateZ(540deg);
      transform-origin: 44% 50%;
    }
  }
</style>
