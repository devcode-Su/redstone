<template>
	<div>
		<h2>진단 정보</h2>
		<div class="content-wrap" v-if="data">
			<template v-if="data.Type === 'RSC'">
				<dl>
					<dt>진단명</dt>
					<dd>
						{{data.RuleId}}
						<a><i class="fa fa-exclamation-circle"></i></a>
					</dd>
				</dl>
				<dl>
					<dt>위험도</dt>
					<dd>{{data.Score}}</dd>
				</dl>
				<dl>
					<dt>검출파일</dt>
					<dd>{{data.PathInfo1}}</dd>
				</dl>
				<dl v-if="data.rule">
					<dt>세부사항</dt>
					<dd>{{data.rule.description}}</dd>
				</dl>
				<dl v-if="data.AdditionalInfo">
					<dt>추가정보</dt>
					<dd>{{data.AdditionalInfo}}</dd>
				</dl>
			</template>
			<template v-if="data.Type === 'FILE'">
				<dl>
					<dt>진단명</dt>
					<dd>
						TI 엔진
						<a v-if="data.malware" @href="detect.malware.permalink" target="_new">
							<i class="fa fa-exclamation-circle"></i>
						</a>
					</dd>
				</dl>
				<dl v-if="data.Score">
					<dt>위험도</dt>
					<dd>{{data.Score}}</dd>
				</dl>
				<dl v-if="data.malware">
					<dt>TI 엔진 스코어</dt>
					<dd>{{data.malware.positives}} / {{data.malware.total}}</dd>
				</dl>
				<dl v-if="data.PathInfo1">
					<dt>악성 파일</dt>
					<dd>{{data.PathInfo1}}</dd>
				</dl>
				<dl v-if="data.PathInfo2">
					<dt>악성 파일</dt>
					<dd>{{data.PathInfo2}}</dd>
				</dl>
			</template>
			<template v-if="data.Type === 'IP'">
				<dl>
					<dt>진단명</dt>
					<dd>
						TI 엔진
						<a v-if="data.malware" @href="detect.malware.permalink" target="_new">
							<i class="fa fa-exclamation-circle"></i>
						</a>
					</dd>
				</dl>
				<dl>
					<dt>위험도</dt>
					<dd>{{data.Score}}</dd>
				</dl>
				<dl v-if="detect.malware">
					<dt>TI 엔진 스코어</dt>
					<dd>{{data.malware.positives}} / {{data.malware.total}}</dd>
				</dl>
				<dl v-if="data.PathInfo1">
					<dt>악성 IP</dt>
					<dd>{{data.PathInfo1}}</dd>
				</dl>
				<dl v-if="data.PathInfo2">
					<dt>악성 IP</dt>
					<dd>{{data.PathInfo2}}</dd>
				</dl>
			</template>
		</div>
		<div v-else>
			진단 정보가 없습니다
		</div>
	</div>
</template>
<script>
  export default {
    name: "InformationDetect",
    props: {
      ProcessGuid: {
        type: String
      },
      data: {
        type: Object
      }
    },
    data() {
      return {
        data: {}
      };
    },
    computed: {},
    components: {
      // Component List
    },
    watch: {},
    methods: {},
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
    actvated() {
    },
    deactivated() {
    },
    beforeDestroy() {
//      this.$bus.$off('TreeProcessSelected');
    },
    destroyed() {
    },
  };
</script>
<style lang='scss' scoped>
	//noinspection CssUnknownTarget
	@import "~styles/variables";
</style>
