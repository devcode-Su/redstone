<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      사용자 계정
    </h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="계정비밀번호" name="account">
        <security-passwordform @submit="receive"></security-passwordform>
        <security-password-datatable :form-data="account.formData" :definition="account.definition"></security-password-datatable>
      </el-tab-pane>
      <el-tab-pane label="화면보호기" name="1">
        <security-screenform @submit="receive"></security-screenform>
        <security-screen-datatable :form-data="screen.formData" :definition="screen.definition"></security-screen-datatable>
      </el-tab-pane>
    </el-tabs>
  </article>
</template>
<script>
  import SecurityPasswordform from "./Security.password.form";
  import SecurityScreenform from "./Security.screen.form";
  import SecurityPasswordDatatable from "./Security.account.datatable";
  import SecurityScreenDatatable from "./Security.screen.datatable";

  export default {
    name: "Securitymedia",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        activeName: "account",
        account: {
          formData : {},
          definition:{
            url: '/api/admin/account/password/expired',
            fields: {
              nodeid: '센서ID',
              deptName: {
                label: '부서명',
                data: (data, key) => {
                  return data.dept ? data.dept.name : "";
                },
              },
              username: {
                label: '사용자명',
                data: (data, key) => {
                  return data.info.username;
                },
              },
              ip: {
                label: 'IP 주소',
                data: (data, key) => {
                  return data.info.ip;
                },
              },
              userid: {
                label: '윈도우 계정',
                data: (data, key) => {
                  return data[key] || '(unknown)';
                }
              },
              passwd_changed_date: {
                label: '최종 변경일시',
                data: (data, key) => {
                  return data[key] || '(unknown)';
                }
              },
            },
            order: [
              {value: 'nodeid', label: '센서ID'},
              {value: 'userid', label: '윈도우 계정'},
              {value: 'passwd_changed_date', label: '최종 변경일시'},
            ],
          }
        },
        screen: {
          formData : {},
          definition : {
            url: '/api/admin/account/screen-saver',
            field: {
              nodeid: '센서ID',
              deptName: {
                label: '부서명',
                data: (data, key) => {
                  return data.dept.name;
                }
              },
              username: {
                label: '사용자명',
                data: (data, key) => {
                  return data.info.username;
                }
              },
              ip: {
                label: 'PC IP 주소',
                data: (data, key) => {
                  return data.info.ip;
                }
              },
              userid: '윈도우 계정',
              screen_saver: {
                label: '화면보호기 적용',
                data: (data, key) => {
                  if ( null === data[key] ) {
                    return '(unknown)';
                  }
                  else {
                    if ( data[key] ) {
                      return `대기 ${data['screen_saver_time']}초`;
                    }
                    else {
                      return '미적용';
                    }
                  }
                }
              },
              passwd: {
                label: '비밀번호 적용',
                data: (data, key) => {
                  if ( null === data[key] ) {
                    return '(unknown)';
                  }
                  else {
                    if ( data[key] ) {
                      return `적용`;
                    }
                    else {
                      return '미적용';
                    }
                  }
                }
              },
            },
            order: [],
          }
        },
      };
    },
    computed: {},
    components: {
      "security-passwordform": SecurityPasswordform,
      "security-password-datatable": SecurityPasswordDatatable,
      "security-screenform": SecurityScreenform,
      "security-screen-datatable" : SecurityScreenDatatable
    },
    watch: {},
    methods: {
      receive(form) {
        if(this.activeName === "account"){
          console.log(form);
          this.account.formData = form;
        }else if(this.activeName === "account"){
          this.screen.formData = form;
        }
        this.$bus.$emit('security-account', form);
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
  };
</script>
<style lang='scss' scoped>
  //noinspection CssUnknownTarget
  @import "~styles/variables";
</style>
