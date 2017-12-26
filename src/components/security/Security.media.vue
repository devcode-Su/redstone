<template>
  <article data-layout="Route-article">
    <h1 data-page-title>
      매체접근
    </h1>
    <security-media-form :prop-data="props" @form="receive"></security-media-form>
    <security-data-table :definition="definition"></security-data-table>
  </article>
</template>
<script>
  import SecurityMediaform from "./Security.media.form";
  import SecurityDatatable from "./Security.media.datatable";

  export default {
    name: "Securitymedia",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
    },
    data() {
      return {
        props: [],
        formData: {},
        definition: {
          url: '/api/admin/volume',
          field: {
            InsertTime: "장착시간",
            UnmountTime: "탈착시간",
            nodeid: "센서 ID",
            username: "사용자명",
            userdept: "부서명",
            userip: "PC IP 주소",
            FileSystem: "종류",
            BusType: "연결방식",
            VolumePath: "경로",
            VolumeName: "장치명",
            TotalNumberOfBytes: {
              label: "크기",
              data: (data, key) => {
                let ret = data[key];
                let sizeArr = ['', 'KB', 'MB', 'GB', 'TB'];
                let idx = 0;
                while (ret >= 1024) {
                  ret /= 1024;
                  idx++;
                  if ( idx === sizeArr.length ) {
                    break;
                  }
                }
                return `${Math.floor(ret * 10) / 10}${sizeArr[idx]}`;
              },
            },
            FreeBytesAvailable: {
              label: "사용가능",
              data: (data, key) => {
                let ret = data[key];
                let sizeArr = ['', 'KB', 'MB', 'GB', 'TB'];
                let idx = 0;
                while (ret >= 1024) {
                  ret /= 1024;
                  idx++;
                  if ( idx === sizeArr.length ) {
                    break;
                  }
                }
                return `${Math.floor(ret * 10) / 10}${sizeArr[idx]}`;
              },
            },
            EventsCount: {
              label: '발생이벤트',
              data: (data, key) => {
                let dataArr = {
                  ProcessCreate : '프로세스 실행',
                  FileRead: '파일읽기',
                  FileMod: '파일수정'
                };
                let ret = '';

                for ( let key in dataArr) {
                  if ( data.hasOwnProperty(key) ) {
                    if ( data[key] > 0 ) {
                      ret += `${dataArr[key]}: ${data[key]}\n`;
                    }
                  }
                }
                return ret;
              }
            },
          },
          order: [
            {value: 'EventTime', label: '장착시각'},
            {value: 'UnmountTime', label: '탈착시각'},
            {value: 'VolumeType', label: '종류'},
            {value: 'BusType', label: '연결방식'},
            {value: 'VolumePath', label: '경로'},
          ],
        },
      };
    },
    computed: {},
    components: {
      "security-media-form": SecurityMediaform,
      "security-data-table": SecurityDatatable,
    },
    watch: {},
    methods: {
      receive(form) {
        this.$bus.$emit('security-media', form);
      },
    },
    beforeCreate() {
    },
    created() {
    },
    beforeMounted() {
    },
    mounted() {
      if (this.$route.query && Object.keys(this.$route.query).length > 0) {
        this.props = this.$route.query;
      }
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
