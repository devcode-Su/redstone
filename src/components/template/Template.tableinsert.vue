<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <div class="table-wrap inner-table">
          <div class="table-head">
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
          </div>
          <div class="table-body">
            <table>
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table>
          <tbody>
            <td>{{ props.row.city }}</td>
            <td>{{ props.row.address }}</td>
            <td>{{ props.row.zip }}</td>
          </tbody>
        </table>
      </template>
    </el-table-column>
    <el-table-column label="Date" prop="date">
    </el-table-column>
    <el-table-column label="Name" prop="name">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "Templatedatatable",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-08",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-06",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-07",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        }
      ]
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
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
</style>
