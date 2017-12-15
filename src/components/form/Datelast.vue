<template>
  <div data-form-item>
    <div data-form-tag>
      <el-checkbox v-model="all" :true-label="0" :false-label="1" @change="valueChanged('all', $event)">비밀번호 미 변경자 조회
      </el-checkbox>
      <el-date-picker v-model="date" type="date" placeholder="이전 변경자" size="small"
                      @change="valueChanged('date', $event)"
      :disabled="all === 1">
      </el-date-picker>
      <el-button v-for="(setDate,i) in dateLabel" :key="setDate.id" @click="setDateLast(i)" size="small" :disabled="all === 1">
        {{setDate}}
      </el-button>
    </div>
  </div>
</template>
<script>
  import MixinsSetDatetime from "@/components/mixins/setDatetime.mixin";

  export default {
    name: "Datelast",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        dateLabel: ["1주일전", "1개월전", "3개월전", "6개월전"],
        all: 0,
        date: null,
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      valueChanged(name, value) {
        let obj = {};
        obj[name] = value;
        this.$emit('change', obj);
      },
      setDateLast(i) {
        this.setDatelast(i);
        this.$emit('change', {
          date: this.date,
        });
      },
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
    mixins: [MixinsSetDatetime],
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";

  [data-form-item] {
    label {
      width: auto;
    }
    .el-date-editor.el-input {
      width: 135px;
    }
    button {
      margin-left: 5px;
    }
  }
</style>
