<template>
  <section data-table-wrap>
    <header data-table="header">
      <div data-table-option>
        <el-button size="small">
          파일로 저장
          <i class="fa fa-download" aria-hidden="true"></i>
        </el-button>
        <!--<el-select v-model="form.order"  placeholder="정렬" size="small" :disabled="stateReorder" @change="reorder">-->
          <!--<el-option v-for="(option, k, i) in definition.order" :key="k" :label="option" :value="k"></el-option>-->
        <!--</el-select>-->
        <div class="view-check">
          <el-button @click="moreBtn = !moreBtn" size="small">
            보기
            <i class="fa fa-angle-down" :class="{ rotate : moreBtn }"></i>
          </el-button>
          <el-checkbox-group v-model="viewChecked" v-if="moreBtn" @change="colView">
            <el-checkbox v-for="(check,k,i) in fields" :label="k" :key="k" :disabled="i < 2">{{check}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </header>
    <div data-table="table">
      <span data-table="total">전체 : {{total}} 건</span>
      <div data-thead="thead">
        <table>
          <thead>
          <tr>
            <th v-for="(th,k) in fields" :key="k" :class="'col-'+k" :ref="k">{{th}}</th>
            <th class="col-moreBtn"><span>더보기</span></th>
          </tr>
          </thead>
        </table>
      </div>
      <div data-tbody="tbody" class="screen">
        <table>
          <tbody>
          <tr v-if="stateReorder">
            <td data-none-data="screen">검색된 데이터가 없습니다.</td>
          </tr>
          <template v-else v-for="(row, i) in tableData" >
            <tr data-tbody="row"  :key="row.id" @click="rowRoute(row)">
              <!--<td v-for="(td,k) in definition.fields" :key="td.id"  :class="'col-'+k" :ref="k">{{row[k]}}</td>-->
              <td class="col-EventTime">{{row.EventTime}}</td>
              <td class="col-Table">{{row.ProcessName}}</td>
              <td class="col-content">
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
              <td class="col-moreBtn">
                <button data-icon @click.stop="moreRow(i)" :class="{on : i === more}">
                  <i class="fa fa-arrow-down" aria-hidden="true" :class="{rotate : i === more}"></i>
                </button>
              </td>
            </tr>
            <transition name="fade">
              <tr data-tboy="hide-row" v-if="i === more">
                <td :colspan="Object.keys(fields).length +1">
                  <event-inner :propData="row"></event-inner>
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
  import { mapGetters } from "vuex";
  //import ProcessInner from "./process.inner";
  import EventInner from "./Search.event.inner";
  import Paginations from "../template/Template.paginations";

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
    name: "EventDatatable",
    extends: {},
    props: {
      //알파벳 순으로 정렬할 것.
      propData: {
        type: String
      },
    },
    data() {
      return {
        more: null,
        moreBtn : false,
        responseData : [],
        total : "-",
        tableData: [],
        processGuid : "",
        pagingData:[],
        EventList: [],
        filteredData: [],
        findData: [],
        findDataPosition: new Position(),
        lastFilter: {selectedRadio: 'EventImportant'},
        q: '',
        fields : {
          EventTime : "시각",
          Table : "분류",
          content : "내용"
        },
        viewChecked: "",
        form: {},
        paging: {
          currentPage: 1,
          sizeList: [25, 50, 100, 200, 500],
          size: 25,
        },
      };
    },
    computed: {
      stateReorder(){
        return !this.tableData.length;
      },
      ...mapGetters({
        selectData : "dashboardData"
      })
    },
    components: {
      "event-inner" : EventInner,
      "paginations" :Paginations
    },
    watch: {
      propData: function (n, o) {
        if (n !== o) {
          this.getData(n);
        }
      }
    },
    methods: {
      colView(val){
        const checkArr = Object.keys(this.fields);
        for(var i=0; i < checkArr.length; i++){
          let f = val.indexOf(checkArr[i]);
          if(f === -1){
            let j = this.$refs[checkArr[i]].length;
            while(j--){
              this.$refs[checkArr[i]][j].hidden = true;
            }
          }
          else {
            this.$refs[checkArr[i]].forEach((item) => {
              item.hidden = false;
            });
          }
        }
      },
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
          this.findDataPosition.current = this.findDataPosition.total - 1;
          if (this.findData.length > 0) {
            let selectedItem = this.findData[this.findData.length - 1];
            selectedItem.isSelected = true;
            this.move(true);
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
      handleSizeChange(val) {
        this.paging.size = val;
        this.handleCurrentChange(1);
      },
      handleCurrentChange(val) {
        this.paging.currentPage = val;
        let start = (this.paging.currentPage - 1 ) * this.paging.size;
        let end = start + this.paging.size;
        this.tableData = this.filteredData.slice(start, end);
//        let el = this.$refs.table;
//        if (el) {
//          el.scrollIntoView(true);
//        }
      },
      getItemPage(item) {
        let idx = this.filteredData.indexOf(item);
        return Math.floor(idx / this.paging.size) + 1;
      },
      getData(processGuid) {
        const url = `/api/admin/search/process/${processGuid}`;
        this.$http.get(url).then((data) => {
          console.log(data)
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
        console.log(event)
        let ret = event.EventType || event.Table;
        if (this.tableNameMapping.hasOwnProperty(ret)) {
          ret = this.tableNameMapping[ret];
        }
        return ret;
      },
      rowRoute(val) {
        //this.$router.push({path: "Search-analysis", query: {ProcessGuid: val.ProcessGuid, nodeid: val.nodeid}});
      },
      moreRow(num){
        if(this.more === num){
          this.more = null;
        }else{
          this.more = num;
        }
      },
      pageLength(p){
        //console.log(p)
        this.form.length = p.length ? p.length : this.form.length ;
        this.form.page = p.current_page ? p.current_page : this.form.page;
        this.receiveSearch();
      }
    },
    beforeCreate() {
    },
    created() {
      if (this.propData) {
        this.getData(this.propData);
      }
      if (this.head) {
        this.colLength = this.head.length;
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
      //this.rowSearch(this.selectData.rowNum);
    },
    beforeUpdate() {
    },
    updated() {
      //this.rowSearch(this.selectData.rowNum);
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
      this.$bus.$off('process-search-data')
    },
    destroyed() {
    }
  };
</script>
<style lang='scss' scoped>
  @import "~styles/variables";
</style>
