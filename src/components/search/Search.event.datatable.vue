<template>
	<section class="template-table-wrap">
		<header>
			<span>전체 : {{filteredData ? filteredData.length : '-'}}건</span>
			<div class="btn-wrap">
				<el-button size="small">
					파일로 저장
					<i class="fa fa-download" aria-hidden="true"></i>
				</el-button>
				<el-select v-model="order" placeholder="정렬" size="small" @change="reorder"
				           :disabled="(!propData || !propData.search ||  propData.search.length == 0)">
					<el-option v-for="item in orderOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<div class="view-check">
					<el-button @click="morebtn = !morebtn" size="small">
						보기
						<i class="fa fa-angle-down" :class="{ rotate : morebtn }"></i>
					</el-button>
					<el-checkbox-group v-model="view" v-if="morebtn" @change="viewCheck">
						<el-checkbox v-for="(check,i) in field" :label="check" :key="check" :ref="'checked'"
						             v-if="i !== field.length -1">{{check}}
						</el-checkbox>
					</el-checkbox-group>
				</div>
			</div>
		</header>
		<div class="template-table dynamic-row">
			<div class="table-head-wrap">
				<table>
					<thead>
					<tr>
						<th v-for="(th, i) in head" :key="th.id"
						    :class="['col'+i,{ 'col-end' : head.length-1 === i }]" :ref="'checkedTh'">{{th}}
						</th>
					</tr>
					</thead>
				</table>
			</div>
			<div class="table-body-wrap">
				<table :ref="'table'">
					<tbody :ref="'table'">
					<template v-for="(row,i) in viewData">
						<tr :ref="'trs'" :key="row.id" :id="'row' + (row.EventSeq||'0')"
						    :class="[row.detect ? row.detect.Type : '', {'founded': row.isFounded, 'selected': row.isSelected}]">
							<td class="col0">{{row.EventTime}}</td>
							<td class="col1">{{getDisplayEventType(row)}}</td>
							<td class="col2">
								<template v-if="row.Table === 'PROCESS_CREATE_LOG'">
									{{row.ProcessImagePath}} ({{row.ProcessId}})
								</template>
								<template v-else-if="row.Table === 'CHILDPROCESS_CREATE_LOG'">
									{{row.ProcessImagePath}} ({{row.ChildProcessId}})
								</template>
								<template v-else-if="row.Table === 'PROCESS_EXIT_LOG'">
									{{row.ProcessId}}
								</template>
								<template v-else-if="row.Table === 'FILE_LOG'">
									{{row.FilePath1}}
									<template v-if="row.EventType === 'FileCreate'">
										<template v-if="row.FileType">
											[{{row.FileType}}]
										</template>
										({{row.FileSize}})
									</template>
									<template v-else-if="row.EventType === 'FileMod'">
										<template v-if="row.FileType">
											[{{row.FileType}}]
										</template>
									</template>
									<template v-else-if="row.EventType === 'FileMove'">
										▶ {{row.FilePath2}}
									</template>
									<template v-else-if="row.EventType === 'FileDelete'"></template>
									<template v-else-if="row.EventType === 'FileRead'"></template>
									<template v-else-if="row.EventType === 'FileSetAttr'">
										<template v-if="row.FileType">
											[{{row.FileType}}]
										</template>
									</template>
								</template>
								<template v-else-if="row.Table === 'REGISTRY_LOG'">
									<template v-if="row.EventType === 'RegCreateKey'">
										{{row.RegKeyPath}}
									</template>
									<template v-else-if="row.EventType === 'RegRenameKey'">
										{{row.RegKeyPath}} => {{row.RegNewKeyPath}}
									</template>
									<template v-else-if="row.EventType === 'RegSetValue'">
										{{row.RegKeyPath}}
										[{{row.RegValueName}}] => [{{row.RegValue}}]
									</template>
									<template v-else-if="row.EventType === 'RegDeleteKey'">
										{{row.RegKeyPath}}
									</template>
									<template v-else-if="row.EventType === 'RegDeleteValue'">
										{{row.RegKeyPath}} [{{row.RegValueName}}]
									</template>
								</template>
								<template v-else-if="row.Table === 'NETWORK_CONNECT_LOG'">
									{{row.Direction === 'OUT' ? ' >> ' : ' << '}}{{row.Domain ? row.Domain : row.RemoteIp}}:{{row.RemotePort}}/{{row.Protocol}}
								</template>
								<template v-else-if="row.Table === 'NETWORK_DISCONNECT_LOG'">
									Sent: {{row.BytesSent}} / Received: {{row.BytesRecved}}
								</template>
								<template v-else-if="row.Table === 'MODULE_LOAD_LOG'">
									{{row.ModulePath}} {{row.IsSystem ? '[System]' : ''}}
								</template>
								<template v-else-if="row.Table === 'FILE_TRANSFER_LOG'">
									<template v-if="row.EventType === 'RelatedFile'">
										{{row.PathInfo1}} => {{row.PathInfo2}}
									</template>
									<template v-else-if="row.EventType === 'FileCopy'">
										{{row.PathInfo1}} => {{row.PathInfo2}}
									</template>
									<template v-else-if="row.EventType === 'HttpDownload'">
										{{row.PathInfo2}} from {{row.PathInfo1}}
									</template>
								</template>
							</td>
							<td class="col-btn">
								<button class="icon-btn icon-wrap" @click.stop="moreRow(row, i)" :class="{on : row === more}">
									<i class="fa fa-arrow-down" aria-hidden="true" :class="{rotate : row === more}"></i>
								</button>
							</td>
						</tr>
						<transition name="fade">
							<tr v-if="row === more" class="show-row">
								<td :colspan="collength" :key="row.id">
									<EventInnerView :propData="row"></EventInnerView>
								</td>
							</tr>
						</transition>
					</template>
					</tbody>
				</table>
			</div>
		</div>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
		               :current-page.sync="paging.currentPage" :page-sizes="paging.sizeList" :page-size="paging.size"
		               layout="sizes, prev, pager, next" :total="filteredData.length">
		</el-pagination>
	</section>
</template>
<script>
  import EventInnerView from "./Search.event.innerview.vue";

  export class Position {
    _current;
    total;


    constructor(current = 0, total = 0) {
      this._current = current;
      this.total = total;
    }

    get current() {
      let value = this._current;
      if (value < 0) {
        value += this.total;
      }
      else if (value === 0) {
        //
      }
      else if (value >= this.total) {
        value %= this.total;
      }
      return value;
    }

    set current(value) {
      let val = 0;
      if (value < 0) {
        val = this.total + value;
      }
      else if (value >= this.total) {
        val = value % this.total;
      }
      else {
        val = value;
      }
      this._current = val;
    }
  }

  export default {
    name: "EventDataTable",
    props: {
      //알파벳 순으로 정렬할 것.
      propData: {
        type: String
      }
    },
    data() {
      return {
        head: [
          '시각', '분류', '내용', ''
        ],
        collength: 0,
        more: null,
        order: "",
        view: [],
        viewText: null,
        morebtn: false,
        orderOption: [],
        field: [],
        EventList: [],
        filteredData: [],
        viewData: [],
        findData: [],
        findDataPosition: new Position(),
        lastFilter: {selectedRadio: 'EventImportant'},
        q: '',
        paging: {
          currentPage: 1,
          sizeList: [25, 50, 100, 200, 500],
          size: 25,
        },
        innerData: {
          processData: [],
          fileData: [],
          checkData: []
        },
        tableNameMapping: {
          PROCESS_CREATE_LOG: 'ProcessStart',
          CHILDPROCESS_CREATE_LOG: 'ChildProcessCreate',
          PROCESS_EXIT_LOG: 'ProcessExit',
          MODULE_LOAD_LOG: 'ModuleLoad',
          NETWORK_CONNECT_LOG: 'NetworkConnect',
          NETWORK_DISCONNECT_LOG: 'NetworkDisconnect',
        },
        filterList: [
          {
            name: 'all',

          }
        ]
      };
    },
    computed: {},
    components: {
      EventInnerView
    },
    watch: {
      propData: function (n, o) {
        if (n !== o) {
          this.getData(n);
        }
      }
    },
    methods: {
      filterTableMapping(filterName, tableName) {
        const map = {
          process: [
            'PROCESS_CREATE_LOG',
            'PROCESS_EXIT_LOG',
            'CHILDPROCESS_CREATE_LOG'
          ],
          network: [
            'NETWORK_CONNECT_LOG',
            'NETWORK_DISCONNECT_LOG',
          ],
          registry: [
            'REGISTRY_LOG',
          ],
          files: [
            'FILE_LOG'
          ],
        };
        return (map[filterName].indexOf(tableName) > -1);
      },
      updateFilteredData(filter) {
        this.findData.forEach((item) => {
          item.isFounded = false;
          item.isSelected = false;
        });
        this.findData.length = 0;
        this.findDataPosition = new Position();
        this.q = '';


        if (filter.selectedRadio === 'EventImportant') {
          this.filteredData = this.EventList.filter((item) => {
            return item.Important;
          });
        }
        else {
          if (filter.checkAll) {
            this.filteredData = [];
            this.filteredData.push(...this.EventList);
          }
          else {
            this.filteredData = this.EventList.filter((item) => {
              let ret = false;
              for (let i = 0; i < filter.checkType.length; i++) {
                let f = filter.checkType[i];
                switch (f) {
                  case 'FILE':
                  case 'IP':
                  case 'RSC':
                    if (item.DetectedType === f) {
                      ret = true;
                    }
                    break;
                  case 'process':
                  case 'network':
                  case 'registry':
                  case 'files':
                    if (this.filterTableMapping(f, item.Table)) {
                      ret = true;
                    }
                    break;
                }

                if (ret) {
                  break;
                }
              }
              return ret;
            });
          }
        }
        this.handleCurrentChange(1);
      },
      doSearch(query) {
        if (query.q === '') {
          this.q = query.q;
          this.filteredData.forEach((item) => {
            item.isFounded = false;
            item.isSelected = false;
          });
          this.findData.length = 0;
          this.findDataPosition = new Position();
        }
        else if (query.q !== this.q) {
          this.q = query.q;
          this.filteredData.forEach((item) => {
            item.isFounded = false;
            item.isSelected = false;
          });

          let excludeColumns = [
            'EventTime',
            'EventTimeInt',
            'ExitFlag',
            'InsertTime',
            'ParentProcessEventSeq',
            'ParentProcessGuid',
            'ProcessGuid',
            'ThreadId',
            'TrunkId',
            'EventSeq',
            'ChildProcessGuid'
          ];

          this.findData = this.filteredData.filter((data) => {
            for (let key in data) {
              if (data.hasOwnProperty(key) && excludeColumns.indexOf(key) !== -1) {
                continue;
              }
              if (data.hasOwnProperty(key) && data[key]) {
                if (data[key].toString().toLowerCase().indexOf(this.q.toLowerCase()) > -1) {
                  data.isFounded = true;
                  return true;
                }
              }
            }
            return false;
          });
          this.findDataPosition = new Position();
          this.findDataPosition.total = this.findData.length;
          if (this.findData.length > 0) {
            let selectedItem = this.findData[0];
            selectedItem.isSelected = true;

          }
        }
        else {
          this.move(query.direction);
        }
      },
      move(direction) {
        if (this.findData.length > 0) {
          this.findData[this.findDataPosition.current].isSelected = false;
          if (direction) {
            this.findDataPosition.current++;
          }
          else {
            this.findDataPosition.current--;
          }
          let selectedItem = this.findData[this.findDataPosition.current];
          selectedItem.isSelected = true;
          let p = new Promise((resolve, reject) => {
            if (this.$refs.table) {
              let page = this.getItemPage(selectedItem);
              if (page !== this.paging.currentPage) {
                this.handleCurrentChange(page);
              }
              resolve();
            }
            reject('no trs');
          });
          let id = `#row${selectedItem.EventSeq || '0'}`;
          p.then(() => {
            let el = this.$refs.table;
            let selected = el.querySelector(id);
            if (selected) {
              selected.scrollIntoView(true);
            }
            else {
              setTimeout(() => {
                let selected = el.querySelector(id);
                if (selected) {
                  selected.scrollIntoView(true);
                }
              }, 0);
            }
          })
            .catch((e) => {
              console.log(e);
            })
        }
      },
      getItemPage(item) {
        let idx = this.filteredData.indexOf(item);
        return Math.floor(idx / this.paging.size) + 1;
      },
      viewCheck() {
        if (this.$refs.checkedRow !== undefined) {
          for (let j = 0; j < this.$refs.checkedRow.length; j++) {
            for (let i = 0; i < this.propData.field.length - 1; i++) {
              this.$refs.checkedTh[i].hidden = this.$refs.checked[i].isChecked;
              this.$refs.checkedRow[j].children[i].hidden = this.$refs.checked[i].isChecked;
            }
          }
        } else {
          this.view = [];
        }
      },
      moreRow(row) {
        if (this.more === row) {
          this.more = null;
        } else {
          this.more = row;
        }
      },
      reorder(val) {
        this.$emit("reorder", {
          order: val,
          form: this.propData.search,
          url: this.propData.url
        });
      },
      handleSizeChange(val) {
        this.paging.size = val;
        this.handleCurrentChange(1);
      },
      handleCurrentChange(val) {
        this.paging.currentPage = val;
        let start = (this.paging.currentPage - 1 ) * this.paging.size;
        let end = start + this.paging.size;
        this.viewData = this.filteredData.slice(start, end);

        let el = this.$refs.table;
        if (el) {
          el.scrollIntoView(true);
        }
      },
      getData(processGuid) {
        const url = `/api/admin/search/process/${processGuid}`;
        this.$http.get(url).then((data) => {
          data.data.rows = data.data.rows.sort((p, c) => {
            if (!p.hasOwnProperty('EventSeq')) {
              p.EventSeq = 0;
            }
            if (!p.hasOwnProperty('isSelected')) {
              p.isSelected = false;
            }
            if (!p.hasOwnProperty('isFounded')) {
              p.isFounded = false;
            }
            if (p.Table === 'PROCESS_CREATE_LOG') {
              // PROCESS_CREATE_LOG 의 Detect는 Parent Process의 ChildProcessCreateLog 에서 처리한다.
              p.DetectedType = false;
            }
            if (p.detect) {
              p.DetectedType = p.detect.Type
            }
            return p.EventSeq - c.EventSeq;
          });
          return data;
        }).then((data) => {
          this.EventList = data.data.rows;
          return data;
        }).then((data) => {
          this.updateFilteredData(this.lastFilter);
          return data;
        }).then((data) => {
          // TODO: EventBus를 통해 Event별 Count를 panel 로 전송
        });
      },
      getDisplayEventType(event) {
        let ret = event.EventType || event.Table;
        if (this.tableNameMapping.hasOwnProperty(ret)) {
          ret = this.tableNameMapping[ret];
        }
        return ret;
      }
    },
    beforeCreate() {
    },
    created() {
      if (this.propData) {
        this.getData(this.propData);
      }

      this.$bus.$on('EventFilter', (data) => {
        this.lastFilter = data;
        this.updateFilteredData(data);
      });
      this.$bus.$on('SearchString', this.doSearch);

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
      this.$bus.$off('EventFilter');
      this.$bus.$off('SearchString');
    },
    destroyed() {
    }
  };
</script>
<style lang='scss' scoped>
	//noinspection CssUnknownTarget
	@import "~styles/variables";

	table {
		tr {
			&.founded {
				background: rgba(255, 255, 0, 0.2) !important;
				color: #000000 !important;
			}
			&.selected {
				background: rgba(255, 255, 0, 1) !important;
				color: #000000 !important;
			}
			&.rsc, &.RSC {
				background: rgb(165, 139, 212);
				color: #FFF;
			}
			&.vt_file_hash, &.file, &.FILE {
				background: rgb(255, 0, 0);
				color: #FFF;
			}
			&.vt_ip_url, &.ip, &.IP {
				background: #ff9d00;
				color: #FFF;
			}
		}
	}

	.template-table-wrap {
		.fade-enter-active,
		.fade-leave-active {
			transition: opacity 0.3s;
		}
		.fade-enter,
		.fade-leave-to {
			opacity: 0;
		}
		.fa {
			transition: all 0.3s ease;
			&.rotate {
				transform: rotateZ(-180deg);
				transform-origin: 44% 50%;
			}
		}
		.col-end[hidden] {
			display: none;
		}
		.show-row:hover {
			background-color: transparent;
		}
		.el-pagination {
			margin-top: 5px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
</style>
