a
<template>
	<section class="inner-view inner-view-box">
		<h1>상세정보</h1>
		<div class="process-info" v-if="propData.Table === 'PROCESS_CREATE_LOG'">
			<InformationProcessCreate :ProcessGuid="propData.ProcessGuid"></InformationProcessCreate>
			<InformationFileMaster :ProcessGuid="propData.ProcessGuid"></InformationFileMaster>
		</div>
		<div v-else-if="propData.Table === 'PROCESS_EXIT_LOG'">
			<InformationProcessCreate :ProcessGuid="propData.ProcessGuid"></InformationProcessCreate>
		</div>
		<div v-else-if="propData.Table === 'CHILDPROCESS_CREATE_LOG'">
			<div>
				<h2>이벤트 정보</h2>
				<div class="content-wrap">
					<dl>
						<dt>자식 프로세스 고유 ID</dt>
						<dd><a @click="selectProcess(propData.ChildProcessGuid)">{{propData.ChildProcessGuid}}</a></dd>
					</dl>
				</div>
			</div>
			<InformationProcessCreate :ProcessGuid="propData.ChildProcessGuid"></InformationProcessCreate>
			<InformationFileMaster :ProcessGuid="propData.ChildProcessGuid"></InformationFileMaster>
		</div>
		<div v-else-if="propData.Table === 'MODULE_LOAD_LOG'">
			<div>
				<h2>이벤트 정보</h2>
				<div class="content-wrap">
					<dl>
						<dt>SHA256</dt>
						<dd><a>{{propData.FileHash}}</a></dd>
					</dl>
				</div>
			</div>
			<InformationFileMaster v-if="propData.FileHash" :FileHash="propData.FileHash"></InformationFileMaster>
		</div>
		<div v-else-if="propData.Table === 'NETWORK_CONNECT_LOG'">
			<div>
				<h2>이벤트 정보</h2>
				<div class="content-wrap">
					<dl>
						<dt>LocalIP</dt>
						<dd>{{propData.LocalIp}}</dd>
					</dl>
					<dl>
						<dt>LocalPort</dt>
						<dd>{{propData.LocalPort}}</dd>
					</dl>
					<dl>
						<dd>{{propData.Direction === 'OUT' ? '▼' : '▲'}} ({{propData.Protocol}})</dd>
					</dl>
					<dl>
						<dt>RemoteIP</dt>
						<dd>
							<a>
								<template v-if="propData.Domain">
									{{propData.RemoteIp}} ({{propData.Domain}})
								</template>
								<template v-else>
									{{propData.RemoteIp}}
								</template>
							</a>
						</dd>
					</dl>
					<dl>
						<dt>RemotePort</dt>
						<dd>{{propData.RemotePort}}</dd>
					</dl>
				</div>
			</div>
		</div>
		<div v-else-if="propData.Table === 'NETWORK_DISCONNECT_LOG'">
			<!-- N/A -->
		</div>
		<div v-else-if="propData.Table === 'REGISTRY_LOG'">
			<div>
				<h2>이벤트 정보</h2>
				<div class="content-wrap">
					<dl>
						<dt>KeyPath</dt>
						<dd>{{propData.RegKeyPath}}</dd>
						;
					</dl>
					<template v-if="propData.EventType === 'RegCreateKey'">
						<!-- N/A -->
					</template>
					<template v-else-if="propData.EventType === 'RegRenameKey'">
						<dl>
							<dt>KeyPath(new)</dt>
							<dd>{{propData.RegNewKeyPath}}</dd>
						</dl>
					</template>
					<template v-else-if="propData.EventType === 'RegSetValue'">
						<dl>
							<dt>ValueName</dt>
							<dd>{{propData.RegValueName}} ({{propData.RegDataType}})</dd>
						</dl>
						<dl>
							<dt>Value</dt>
							<dd>{{propData.RegValue}} ({{propData.DataSize}})</dd>
						</dl>
					</template>
					<template v-else-if="propData.EventType === 'RegDeleteKey'">
						<!-- N/A -->
					</template>
					<template v-else-if="propData.EventType === 'RegDeleteValue'">
						<dl>
							<dt>ValueName</dt>
							<dd>{{propData.RegValueName}}</dd>
						</dl>
					</template>
				</div>
			</div>
		</div>
		<div v-else-if="propData.Table === 'FILE_LOG'">
			<div>
				<h2>이벤트 정보</h2>
				<div class="content-wrap">
					<template v-if="propData.EventType === 'FileCreate'">
						<dl>
							<dt>파일명</dt>
							<dd>{{propData.FileName1}} ({{propData.FileSize}})</dd>
						</dl>
						<dl>
							<dt>경로</dt>
							<dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
						</dl>
						<dl v-if="propData.FileType">
							<dt>FileType</dt>
							<dd>{{propData.FileType}}</dd>
						</dl>
						<dl v-if="propData.Information">
							<dt>대상 파일</dt>
							<dd>{{propData.Information}}</dd>
						</dl>
						<dl v-if="propData.FileHash">
							<dt>SHA256</dt>
							<dd>{{propData.FileHash}}</dd>
						</dl>
					</template>
					<template v-else-if="propData.EventType === 'FileMod'">
						<dl>
							<dt>파일명</dt>
							<dd>{{propData.FileName1}} ({{propData.FileSize}})</dd>
						</dl>
						<dl>
							<dt>경로</dt>
							<dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
						</dl>
						<dl>
							<dt>FileType</dt>
							<dd>{{propData.FileType}}</dd>
						</dl>
					</template>
					<template v-else-if="propData.EventType === 'FileMove'">
						<dl>
							<dt>원본경로</dt>
							<dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
						</dl>
						<dl>
							<dt>대상경로</dt>
							<dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
						</dl>
						<dl v-if="propData.Information">
							<dt>대상파일</dt>
							<dd>{{propData.Information}}</dd>
						</dl>
					</template>
					<template v-else-if="propData.EventType === 'FileDelete'">
						<dl>
							<dt>경로</dt>
							<dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
						</dl>
					</template>
					<template v-else-if="propData.EventType === 'FileSetAttr'">
						<dl>
							<dt>경로</dt>
							<dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
						</dl>
						<dl>
							<dt>속성</dt>
							<dd>{{propData.Information}}</dd>
						</dl>
					</template>
					<template v-else-if="propData.EventType === 'FileRead'">
						<dl>
							<dt>파일명</dt>
							<dd>{{propData.FileName1}} ({{propData.FileSize}})</dd>
						</dl>
						<dl>
							<dt>경로</dt>
							<dd>{{propData.FilePath1}} ({{propData.DriveType.toUpperCase()}})</dd>
						</dl>
						<dl v-if="propData.FileType">
							<dt>FileType</dt>
							<dd>{{propData.FileType}}</dd>
						</dl>
					</template>
					<template v-else-if="propData.Table === 'FilePrint'">
						<dl>
							<dt>출력 문서</dt>
							<dd>{{propData.FilePath1}}</dd>
						</dl>
					</template>
					<template v-if="propData.CreateDate || propData.ModifiedDate">
						<dl v-if="propData.CreateDate">
							<dt>파일 생성 시각</dt>
							<dd>{{propData.CreateDate}}</dd>
						</dl>
						<dl v-if="propData.ModifiedDate">
							<dt>파일 수정 시각</dt>
							<dd>{{propData.ModifiedDate}}</dd>
						</dl>
					</template>
				</div>
			</div>
			<template v-if="propData.FileHash">
				<InformationFileMaster :FileHash="propData.FileHash"></InformationFileMaster>
			</template>
		</div>
		<div v-else-if="propData.Table === 'FILE_TRANSFER_LOG'">
			<div>
				<h2>이벤트 정보</h2>
				<div class="content-wrap">
					<template v-if="propData.EventType === 'RelatedFile'">
						<dl>
							<dt>파일명</dt>
							<dd>{{propData.NameInfo1}}</dd>
						</dl>
						<dl>
							<dt>경로</dt>
							<dd>{{propData.PathInfo1}} ({{propData.DriveType1.toUpperCase()}})</dd>
						</dl>
						<dl>
							<dd>▼</dd>
						</dl>
						<dl>
							<dt>파일명</dt>
							<dd>{{propData.NameInfo2}}</dd>
						</dl>
						<dl>
							<dt>경로</dt>
							<dd>{{propData.PathInfo2}} ({{propData.DriveType2.toUpperCase()}})</dd>
						</dl>
					</template>
					<template v-else-if="propData.EventType === 'FileCopy'">
						<dl>
							<dt>파일명</dt>
							<dd>{{propData.NameInfo1}}</dd>
						</dl>
						<dl>
							<dt>경로</dt>
							<dd>{{propData.PathInfo1}} ({{propData.DriveType1.toUpperCase()}})</dd>
						</dl>
						<dl>
							<dd>▼</dd>
						</dl>
						<dl>
							<dt>파일명</dt>
							<dd>{{propData.NameInfo2}}</dd>
						</dl>
						<dl>
							<dt>경로</dt>
							<dd>{{propData.PathInfo2}} ({{propData.DriveType2.toUpperCase()}})</dd>
						</dl>
					</template>
					<template v-else-if="propData.EventType === 'HttpDownload'">
						<dl>
							<dt>파일명</dt>
							<dd>{{propData.NameInfo1}}</dd>
						</dl>
						<dl>
							<dt>경로</dt>
							<dd>
								<template v-if="propData.detect && propData.detect.malware">
									<a @href="propData.detect.malware.permalink">
										{{propData.PathInfo1}}
									</a>
								</template>
								<template v-else>
									{{propData.PathInfo1}}
								</template>
							</dd>
						</dl>
						<dl>
							<dd>▼</dd>
						</dl>
						<dl>
							<dt>파일명</dt>
							<dd>{{propData.NameInfo2}} ({{propData.FileSize}})</dd>
						</dl>
						<dl>
							<dt>경로</dt>
							<dd>{{propData.PathInfo2}} ({{propData.DriveType2.toUpperCase()}})</dd>
						</dl>
					</template>
				</div>
			</div>
		</div>
		<div v-if="propData.detect">
			<InformationDetect :data="propData.detect"></InformationDetect>
		</div>
	</section>
</template>
<script>
  import InformationProcessCreate from "./Information.ProcessCreate.vue";
  import InformationFileMaster from "./Information.FileMaster.vue";
  import InformationDetect from './Information.Detect.vue';

  export default {
    name: "EventInnerView",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      propData: {
        type: Array | Object
      }
    },
    data() {
      return {
        more: null
      };
    },
    computed: {
      tableData() {
        return this.getValueEx(this.propData.data, this.propData.rowKey);
      }
    },
    components: {
      InformationProcessCreate,
      InformationFileMaster,
      InformationDetect
    },
    watch: {},
    methods: {
      selectProcess(processGuid) {
        this.$bus.$emit('TreeProcessSelected', processGuid);
      }
    },
    beforeCreate() {
    },
    created() {
      console.log(this.propData);
    },
    beforeMounted() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
      console.log(this.propData);
    },
    actvated() {
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
	//noinspection CssUnknownTarget
	@import "~styles/variables";

	tr {
		cursor: pointer;
	}

	.inner-view-box {
		margin: 10px 0;
		border: 1px solid color(default);
		h1 {
			margin-bottom: 0;
			padding: 0 20px;
			font-size: 16px;
			color: #fff;
			background-color: color(default);
		}
		.process-info {
			padding: 15px 20px;
		}
		h2 {
			margin-bottom: 0;
			font-size: 14px;
			color: color(default);
		}
		.content-wrap {
			margin-bottom: 30px;
			padding-left: 30px;
			dl {
				display: flex;
				margin: 0;
			}
			dt {
				width: 130px;
				font-size: 14px;
				font-weight: bold;
				color: color(default);
				&:before {
					content: "";
					display: inline-block;
					width: 3px;
					height: 3px;
					margin-right: 5px;
					vertical-align: 3px;
					background-color: color(default);
				}
			}
			dd {
				flex: 1;
				margin-left: 0;
				color: #5d5d5d;
			}
			dt,
			dd {
				line-height: 24px !important;
			}
		}
	}
</style>
