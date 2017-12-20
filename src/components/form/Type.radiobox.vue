<template>
  <el-form-item class="multiline" label="검색 항목" size="small">
    <template v-for="(list, i) in listList">
      <el-form-item :label="label[i].label" :label-width="label[i].width">
        <el-radio-group v-model="selected[i]" @change="change(label[i].name, $event)">
          <el-radio v-for="item in list" :name="item.name" :key="item.value" :label="item.value">
            {{item.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
  </el-form-item>
</template>
<script>
  export default {
    name: "TypeRadioBox",
    extends: {},
    props: {
      listList: {
        type: Array,
        required: true,
        default: () => {
          return [];
        }
      },
      label: {
        type: Array,
        required: true,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        selected: []
      };
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      change(name, value) {
        //console.log(name, value);
        let ret = {};
        ret[name] = value;
        this.$emit('change', ret);
      }
    },
    beforeCreate() {
    },
    created() {
      if (this.listList.length !== this.label.length) {
        this.listList.length = this.label.length = 0;
      }
      if (this.listList.length > 0) {
        this.selected = this.listList.map((list) => {
          return list[0].value;
        });
      }
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
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
