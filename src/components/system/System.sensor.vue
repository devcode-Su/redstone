<template>
  <article>
    <h1 class="page-title">
      센서설정
    </h1>
    <div class="internal-container template-container">
      <el-form :model="form" ref="form" :label-position="'left'" label-width="160px">
        <fieldset>
          <legend>센서 DB 사이즈 설정</legend>
          <el-form-item label="센서 DB 사이즈" prop="dbSize">
            <el-input-number size="mini" v-model="form.dbSize" controls-position="right" :min="1" :max="dbMax"></el-input-number>
            <span class="indent-txt">MB</span>
          </el-form-item>
          <el-form-item label="디스크 공간 부족시" prop="discSize">
            <el-input-number size="mini" v-model="form.discSize" controls-position="right" :min="1" :max="100"></el-input-number>
            <span class="indent-txt">%</span>
          </el-form-item>
        </fieldset>
        <fieldset>
          <legend>센서 DB 서버 전송</legend>
          <el-form-item prop="radio" class="none-label">
            <el-radio-group v-model="form.radio">
              <div class="muitl-input">
                <el-radio label="1">실시간 전송</el-radio>
              </div>
              <div class="muitl-input">
                <el-radio label="2">
                  <span class="indent-txt-reverse">주기 선택</span>
                  <el-select size="mini" :disabled="radioDidabled" v-model="form.inervalSelect">
                    <el-option label="1시간" value="1시간"></el-option>
                    <el-option label="2시간" value="2시간"></el-option>
                  </el-select>
                  <el-checkbox-group :disabled="radioDidabled" v-model="form.type">
                    <el-checkbox label="settime" name="type">
                      <span class="indent-txt-reverse">특정시간 선택</span>
                      <el-time-select :disabled="!form.type" size="mini" placeholder="Start time" v-model="form.startTime" :picker-options="{
start: '00:00',
step: '00:15',
end: '24:00'
}">

                      </el-time-select>
                      ~
                      <el-time-select :disabled="!form.type" size="mini" placeholder="End time" v-model="form.endTime" :picker-options="{
start: '00:00',
step: '00:15',
end: '24:00',
minTime: form.startTime
}">
                      </el-time-select>
                    </el-checkbox>
                  </el-checkbox-group>
                </el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
        </fieldset>
        <fieldset>
          <legend>미 접속 센서 삭제</legend>
          <el-form-item prop="checked" class="none-label">
            <el-checkbox v-model="form.checked">
              <el-select :disabled="!form.checked" size="mini" v-model="form.disableSensor">
                <el-option label="30" value="30"></el-option>
                <el-option label="60" value="60"></el-option>
                <el-option label="90" value="90"></el-option>
                <el-option label="180" value="180"></el-option>
                <el-option label="365" value="365"></el-option>
              </el-select>
            </el-checkbox>
            <span class="indent-txt">이상 미 접속시 삭제</span>
          </el-form-item>
        </fieldset>
        <el-form-item class="btn-wrap none-label">
          <el-button type="primary" @click="submitForm('form')">저장</el-button>
          <el-button @click="resetForm('form')">취소</el-button>
        </el-form-item>
      </el-form>
    </div>
  </article>
</template>
<script>
export default {
  name: "Systemsensor",
  extends: {},
  props: {
    //알파벳 순으로 정렬할 것.
  },
  data() {
    return {
      dbMax: 1026,
      form: {
        dbSize: 200,
        discSize: 2,
        radio: "",
        inervalSelect: "",
        type: "",
        startTime: "",
        endTime: "",
        checked: false,
        disableSensor: ""
      }
    };
  },
  computed: {
    radioDidabled() {
      return this.form.radio === "" || this.form.radio === "1" ? true : false;
    }
  },
  components: {},
  watch: {},
  methods: {
    submitForm(formName) {
      console.log(formName);
    },
    resetForm(formName) {
      console.log(this.form.radio);
      this.$refs[formName].resetFields();
      this.form.type = "";
      this.form.inervalSelect = "";
      this.form.startTime = "";
      this.form.endTime = "";
      this.form.disableSensor = "";
    }
  },
  beforeCreate() {},
  created() {},
  beforeMounted() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    console.log(this.radioDidabled);
  },
  actvated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>
<style lang='scss' scoped>
@import "~styles/variables";

.el-radio-group {
  width: 100%;
}
.muitl-input {
  line-height: 40px;
  .el-input {
    line-height: inherit;
  }
  .el-checkbox-group {
    display: inline-block;
    margin-left: 10px;
  }
}
.btn-wrap {
  margin-top: 30px;
  text-align: center;
}
</style>
