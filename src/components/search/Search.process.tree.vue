<template>
  <section class="process-tree" data-process-tree>
    <div class="process-tree-area">
      <div class="full-screen">
        <div class="icons">
          <span @click="isTreeLocked = !isTreeLocked ">
            <i class="fa" :class="{'fa-lock': isTreeLocked, 'fa-unlock': !isTreeLocked}"></i>
          </span>
          <span>
            <i class="fa fa-undo"></i>
          </span>
        </div>
      </div>
      <div class="layer" v-if="isTreeLocked"></div>
      <svg id="process-tree" ref="svg" :width="tree.viewer.w" :height="tree.viewer.h">
        <g :transform="`translate(${tree.zoom.x},${tree.zoom.y}) scale(${tree.zoom.k})`"></g>
      </svg>
    </div>
    <div class="pc-info">
      <transition-group tag="ul" class="info-list-wrap" name="infolist">
        <li class="infolist" v-for="(list, index) in list" :key="index" ref="infoMenu"
            :class="{'on' : index === selected}">
          <template v-if="list.name === '요약 정보'">
            <span @click="infoList(index)" class="title">{{list.name}}</span>
            <div class="info-wrap-group">
              <div class="info-wrap" v-if="list.info.nodeInformation">
                <span>PC 정보</span>
                <dl>
                  <dt>
                    <md-icon class="dot">fiber_manual_record</md-icon>
                    사용자명
                  </dt>
                  <dd>{{list.info.nodeInformation.username}}/{{list.info.nodeInformation.userdept}}</dd>
                </dl>
                <dl>
                  <dt>
                    <md-icon class="dot">fiber_manual_record</md-icon>
                    사용자 IP
                  </dt>
                  <dd>{{list.info.nodeInformation.userip}}</dd>
                </dl>
              </div>
              <div class="info-wrap" v-if="list.info.processInformation">
                <span>프로세스 정보</span>
                <dl>
                  <dt>
                    <md-icon class="dot">fiber_manual_record</md-icon>
                    프로세스명
                  </dt>
                  <dd>{{list.info.processInformation.rows[0].ProcessName}}</dd>
                </dl>
                <dl v-if="list.info.processInformation.rows.IsSystem">
                  <dt>
                    <md-icon class="dot">fiber_manual_record</md-icon>
                    시스템파일
                  </dt>
                  <dd>TRUE</dd>
                </dl>
                <template v-if="list.info.fileInformation">
                  <dl>
                    <dt>
                      <md-icon class="dot">fiber_manual_record</md-icon>
                      서명
                    </dt>
                    <dd :class="{'red': list.info.fileInformation.sign_status !== 'signed'}">
                      {{list.info.fileInformation.sign_status}}
                    </dd>
                  </dl>
                  <dl v-if="list.info.fileInformation.sign_status === 'signed'">
                    <dt>
                      <md-icon class="dot">fiber_manual_record</md-icon>
                      서명자
                    </dt>
                    <dd>{{list.info.fileInformation.sign_publisher}}</dd>
                  </dl>
                  <dl v-if="list.info.fileInformation.sign_validity === 'invalid'">
                    <dt>
                      <md-icon class="dot">fiber_manual_record</md-icon>
                      검증
                    </dt>
                    <dd>{{list.info.fileInformation.sign_validity}}</dd>
                  </dl>
                  <dl>
                    <dt>
                      <md-icon class="dot">fiber_manual_record</md-icon>
                      회사명
                    </dt>
                    <dd>{{list.info.fileInformation.company_name}}</dd>
                  </dl>
                  <dl>
                    <dt>
                      <md-icon class="dot">fiber_manual_record</md-icon>
                      제품명
                    </dt>
                    <dd>{{list.info.fileInformation.product_name}}</dd>
                  </dl>
                  <dl>
                    <dt>
                      <md-icon class="dot">fiber_manual_record</md-icon>
                      설명
                    </dt>
                    <dd>{{list.info.fileInformation.description || 'N/A'}}</dd>
                  </dl>
                </template>
              </div>
              <div class="info-wrap" v-if="list.info.detectInformation">
                <span>진단 정보</span>
                <template v-for="(detect, idx) in list.info.detectInformation">
                  <template v-if="detect.Type === 'RSC'">
                    <dl>
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        진단명
                      </dt>
                      <dd>{{detect.RuleId}}</dd>
                    </dl>
                    <dl>
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        위험도
                      </dt>
                      <dd>{{detect.Score}}</dd>
                    </dl>
                    <dl v-if="detect.rule">
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        진단사유
                      </dt>
                      <dd v-html="detect.rule.reason"></dd>
                    </dl>
                  </template>
                  <template v-else-if="detect.Type === 'FILE'">
                    <dl>
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        진단명
                      </dt>
                      <dd>TI 엔진</dd>
                    </dl>
                    <dl>
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        위험도
                      </dt>
                      <dd>{{detect.Score}}</dd>
                    </dl>
                    <dl v-if="detect.malware">
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        TI 엔진 스코어
                      </dt>
                      <dd>{{detect.malware.positives}} / {{detect.malware.total}}</dd>
                    </dl>
                    <dl>
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        진단파일
                      </dt>
                      <dd>{{detect.PathInfo1}}</dd>
                    </dl>
                  </template>
                  <template v-else-if="detect.Type === 'IP'">
                    <dl>
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        진단엔진
                      </dt>
                      <dd>TI 엔진</dd>
                    </dl>
                    <dl>
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        위험도
                      </dt>
                      <dd>{{detect.Score}}</dd>
                    </dl>
                    <dl v-if="detect.malware">
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        TI 엔진 스코어
                      </dt>
                      <dd>{{detect.malware.positives}} / {{detect.malware.total}}</dd>
                    </dl>
                    <dl>
                      <dt>
                        <md-icon class="dot">fiber_manual_record</md-icon>
                        진단 IP
                      </dt>
                      <dd>{{detect.PathInfo1}}</dd>
                    </dl>
                  </template>
                </template>
              </div>
              <div class="info-wrap" v-if="list.info.inflowInformation">
                <span>유입 정보</span>
                <dl>
                  <dt>
                    <md-icon class="dot">fiber_manual_record</md-icon>
                    유입타입
                  </dt>
                  <dd>{{list.info.inflowInformation.SrcType}}</dd>
                </dl>
                <dl>
                  <dt>
                    <md-icon class="dot">fiber_manual_record</md-icon>
                    유입경로
                  </dt>
                  <dd>{{list.info.inflowInformation.SrcInfo}}</dd>
                </dl>
              </div>
            </div>
          </template>
          <template v-else>
            <span @click="infoList(index)">{{list.name}}</span>
            <div class="info-wrap">
              <dl v-for="dl in list.info" :key="dl.id">
                <dt>
                  <md-icon class="dot">fiber_manual_record</md-icon>
                  {{dl.dt}}
                </dt>
                <dd>{{dl.dd}}</dd>
              </dl>
              <template v-if="list.info.length === 0">
                {{list.name}}가 없습니다.
              </template>
            </div>
          </template>
        </li>
      </transition-group>
    </div>
  </section>
</template>
<script>
  import * as d3 from "d3";
  // import MdList from "../../../node_modules/vue-material/src/components/mdList/mdList.vue";
  // import MdIcon from "../../../node_modules/vue-material/src/components/mdIcon/mdIcon.vue";

  export default {
    name: "Processtree",
    props: {
      //알파벳 순으로 정렬할 것.
      propData: {
        ProcessGuid: {
          type: String,
        },
        nodeid: {
          type: Number,
        },
      },
    },
    data() {
      return {
        selected: 0,
        list: [
          {
            name: '요약 정보',
            info: {},
          },
          {
            name: 'PC 정보',
            info: [],
          },
          {
            name: '프로세스 정보',
            info: [],
          },
          {
            name: '파일 정보',
            info: [],
          },
          {
            name: '유입 정보',
            info: [],
          },
          {
            name: '진단 정보',
            info: [],
          },
        ],
        columns: [
          [ // Node Information
            {title: '노드 ID', valueName: 'nodeid'},
            {title: 'PC명', valueName: 'computer'},
            {title: '사용자 IP', valueName: 'userip'},
            {title: '로그인 계정', valueName: 'username'},
            {title: '부서명', valueName: 'userdept'},
            {title: '운영체제', valueName: 'os'},
          ],
          [ // Process Information
            {title: '프로세스 고유 ID', valueName: 'ProcessGuid'},
            {title: '프로세스명', valueName: 'ProcessName'},
            {title: 'SHA256', valueName: 'FileHash'},
            {title: 'MD5', valueName: 'Md5Hash'},
            {title: 'PID', valueName: 'ProcessId'},
            {title: '실행경로', valueName: 'ProcessImagePath'},
            {title: '사용자명', valueName: 'UserName'},
            {title: '세션', valueName: 'SessionId'},
            {title: 'IntegrityLevel', valueName: 'IntegrityLevel'},
            {
              title: 'GUI',
              valueName: function (data) {
                return this.hasInteractive(data) ?
                  '있음' : '없음';
              }.bind(this),
              translate: true,
            },
            {
              title: 'WindowText',
              valueName: function (data) {
                return this.hasInteractive(data) ? data.WindowText : '';
              }.bind(this),
            },
            {
              title: 'WindowClassName',
              valueName: function (data) {
                return this.hasInteractive(data) ? data.WindowClassName : '';
              }.bind(this),
            },
            {title: 'CommandLine', valueName: 'CommandLine'},
            {title: '파일 생성 시각', valueName: 'CreateDate'},
            {title: '파일 수정 시각', valueName: 'ModifiedDate'},
            {title: '속성', valueName: 'FileAttributes'},
            {title: '시작 시각', valueName: 'EventTime'},
            {title: '종료 시각', valueName: 'EventTime1'},
          ],
          [ // File Information
            {title: '전자서명', valueName: 'sign_status'},
            {title: '검증', valueName: 'sign_validity'},
            {title: '서명자', valueName: 'sign_publisher'},
            {title: '회사명', valueName: 'company_name'},
            {title: '파일종류', valueName: 'type'},
            {title: '실행파일 종류', valueName: 'exe_type'},
            {title: '버전', valueName: 'version'},
            {title: '내부명', valueName: 'internal_name'},
            {title: '실행환경', valueName: 'platform'},
            {title: '제품명', valueName: 'product_name'},
            {title: '빌드 시각', valueName: 'build_date'},
          ],
          [ // Inflow Information
            {title: '생성 프로세스', valueName: 'FirstCreatorProcessInfo'},
            {title: '유입시각', valueName: 'EventTime'},
            {title: '유입방식', valueName: 'SrcType'},
            {title: '유입경로', valueName: 'SrcInfo'},
            {title: '생성 경로', valueName: 'FirstCreatedFilePath'},
          ],
          [ // Detect Information
            {title: '발견자', valueName: 'Checker'},
            {title: '진단명', valueName: 'RuleId', click: this.selectRuleName},
            {title: '연관정보', valueName: 'PathInfo1'},
            {title: '연관정보', valueName: 'PathInfo2'},
            {title: '위험도', valueName: 'Score'},
          ],
        ],
        tree: {
          viewer: {
            w: 1170,
            h: 580,
          },
          zoom: {
            x: 0,
            y: 290,
            k: 1,
          },
          margin: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          },
          scaleFactor: 1.2,
        },
        root: null,
        data: null,
        isTreeLocked: true,
      };
    },
    components: {
      // MdIcon,
      // MdList,
      d3,
    },
    watch: {
      propData(n, o) {
        console.log('Tree new data', n, o);
        if (n.ProcessGuid !== o.ProcessGuid) {
          if (n.ProcessGuid) {
            let item = this.findNode(this.root, n.ProcessGuid);
            console.log(n.ProcessGuid, this.root, item);
            if (item) {
              this.handleSelected(item);
              this.getTreeData(this.propData);
              this.getProcessData(this.propData);
              this.getFileData(this.propData);
              this.getInflowData(this.propData);
              this.getDetectData(this.propData);
            }
          }
        }
        if (n.nodeid !== o.nodeid) {
          if (n.nodeid) {
            this.getNodeData(this.propData);
          }
        }
      },
    },
    methods: {
      getValueEx(a, b, c) {
        return this.getValue(a, b, c);
      },
      hasInteractive(data) {
        return data.InteractiveFlag === '1';
      },
      infoList(num) {
        if (this.selected !== num) {
          this.selected = num;
        }
      },
      dataToModel(data) {
        return {
          id: data.ProcessGuid,
          value: data.ProcessName,
          parent: data.ParentProcessGuid,
          children: [],
          _detected: data.IsDetected,
          FileHash: data.FileHash,
        };
      },
      dataToTree(processGuid, data) {
        let parent = data.find((item) => {
          let pparent = data.find((item2) => {
            return item.ParentProcessGuid === item2.ProcessGuid;
          });
          return !pparent
        });
        let treeParent = this.dataToModel(parent);
        treeParent.children = data.filter((item) => {
          return treeParent.id === item.ParentProcessGuid;
        }).map((item) => {
          return this.dataToModel(item);
        });

        treeParent.children.forEach((child) => {
          child.children = data.filter((item) => {
            return child.id === item.ParentProcessGuid;
          }).map((item) => {
            return this.dataToModel(item);
          });
        });

        return treeParent
      },
      initZoom() {
        const selection = d3.select(this.$refs.svg);
        selection.on('zoom', null).on('wheel.zoom', null).on('dblclick.zoom', null).on('contextmenu', null);
        const zoom = d3.zoom()
                       .scaleExtent([-Infinity, Infinity])
                       .on('zoom', () => {
                         this.tree.zoom.x = d3.event.transform.x;
                         this.tree.zoom.y = d3.event.transform.y;
                         this.tree.zoom.k = d3.event.transform.k;
                       });
        selection.call(zoom)
                 .call(zoom.transform, this.initPosition)
                 .on('wheel.zoom', () => {
                   d3.event.preventDefault();
                   this.tree.zoom.y -= d3.event.deltaY * this.tree.zoom.k;
                   selection.call(zoom.transform, d3.zoomIdentity.translate(this.tree.zoom.x, this.tree.zoom.y)
                                                    .scale(this.tree.zoom.k));
                 })
                 .on('dblclick.zoom', () => {
                   d3.event.preventDefault();
                   let currentPosition = {x: this.tree.zoom.x, y: this.tree.zoom.y, k: this.tree.zoom.k};
                   this.tree.zoom.k = this.tree.zoom.k * this.tree.scaleFactor;
                   this.tree.zoom.x = d3.event.offsetX - (d3.event.offsetX - this.tree.zoom.x) * currentPosition.k;
                   this.tree.zoom.y = d3.event.offsetY - (d3.event.offsetY - this.tree.zoom.y) * currentPosition.k;

                   selection.call(zoom.transform, d3.zoomIdentity.translate(this.tree.zoom.x, this.tree.zoom.y)
                                                    .scale(this.tree.zoom.k));
                 })
                 .on('contextmenu', () => {
                   d3.event.preventDefault();
                   let currentPosition = {x: this.tree.zoom.x, y: this.tree.zoom.y, k: this.tree.zoom.k};
                   this.tree.zoom.k = this.tree.zoom.k / this.tree.scaleFactor;
                   this.tree.zoom.x = d3.event.offsetX - (d3.event.offsetX - this.tree.zoom.x) * this.tree.zoom.k / currentPosition.k;
                   this.tree.zoom.y = d3.event.offsetY - (d3.event.offsetY - this.tree.zoom.y) * this.tree.zoom.k / currentPosition.k;

                   selection.call(zoom.transform, d3.zoomIdentity.translate(this.tree.zoom.x, this.tree.zoom.y)
                                                    .scale(this.tree.zoom.k));
                 });
      },
      initD3() {
        this.initZoom();
        this.initPosition();
      },
      initPosition() {
        this.tree.zoom.x = this.tree.margin.left;
        this.tree.zoom.y = (this.tree.viewer.h - this.tree.margin.top) / 2;
        this.tree.zoom.k = 1;
        return d3.zoomIdentity.translate(this.tree.zoom.x, this.tree.zoom.y, this.tree.zoom.k);
      },
      checkSelectedNode(processGuid, tree) {
        if (tree) {
          if (tree.id === processGuid) {
            tree._selected = true;
          }
          else if (tree.children && tree.children.length > 0) {
            for (let i = 0; i < tree.children.length; i++) {
              tree.children[i] = this.checkSelectedNode(processGuid, tree.children[i]);
            }
          }
          return tree;
        }
        return null;
      },
      findNode(obj, id) {
        let ret = null;
        if (obj) {
          if (obj.data.id === id) {
            ret = obj;
          }
          else if (obj.children && obj.children.length > 0) {
            for (let i = 0; i < obj.children.length; i++) {
              ret = this.findNode(obj.children[i], id);
              if (ret) {
                break;
              }
            }
          }
        }
        return ret;
      },
      findNodeEx(obj, id) {
        let ret = null;
        if (obj) {
          if (obj.id === id) {
            ret = obj;
          }
          else if (obj.children && obj.children.length > 0) {
            for (let i = 0; i < obj.children.length; i++) {
              ret = this.findNodeEx(obj.children[i], id);
              if (ret) {
                break;
              }
            }
          }
        }
        return ret;
      },
      eachAfter(item, callback = null) {
        if (item && callback) {
          callback(item);
          if (item.children) {
            for (let i = 0; i < item.children.length; i++) {
              this.eachAfter(item.children[i], callback);
            }
          }
        }
      },
      eachBefore(item, callback = null) {
        if (item && callback) {
          if (item.children) {
            for (let i = 0; i < item.children.length; i++) {
              this.eachBefore(item.children[i], callback);
            }
          }
          callback(item);
        }
      },
      deploy(processGuid, newData) {
        if (newData) {
          newData = this.checkSelectedNode(processGuid, newData);

          if (this.root) {
            let oldIsParent = this.findNodeEx(this.root.data, newData.id);
            let newIsParent = this.findNodeEx(newData, this.root.data.id);

            if (oldIsParent) {
              this.eachBefore(newData, (newItem) => {
                let oldItem = this.findNodeEx(this.root.data, newItem.id);
                if (oldItem) {
                  if (oldItem.children && oldItem.children.length > 0) {
                    newItem.children.forEach((newChild) => {
                      let oldChild = oldItem.children.find((oldChild) => {
                        return oldChild.id === newChild.id;
                      });
                      if (!oldChild) {
                        newChild.parent = oldItem.id;
                        oldItem.children.push(newChild);
                      }
                    });
                  }
                  else {
                    oldItem.children = newItem.children;
                    oldItem.children.forEach((item) => {
                      item.parent = oldItem.id;
                    });
                  }
                }
              });
              this.root = d3.hierarchy(this.root.data, (d) => d.children);
            }
            else if (newIsParent) {
              this.eachAfter(this.root.data, (oldItem) => {
                let newItem = this.findNodeEx(newData, oldItem.id);
                if (newItem) {
                  if (newItem.children && newItem.children.length > 0) {
                    oldItem.children.forEach((oldChild) => {
                      let newChild = newItem.children.find((newChild) => {
                        return newChild.id === oldChild.id;
                      });
                      if (!newChild) {
                        oldChild.parent = newItem.id;
                        newItem.children.push(oldChild);
                      }
                    });
                  }
                  else {
                    newItem.children = oldItem.children;
                    newItem.children.forEach((item) => {
                      item.parent = newItem.id;
                    });
                  }
                }
              });
              this.root = d3.hierarchy(newData, (d) => d.children);
            }
            else {
              this.root = d3.hierarchy(newData, (d) => d.children);
            }
          }
          else {
            this.root = d3.hierarchy(newData, (d) => d.children);
          }
          this.root.data.x0 = 0;
          this.root.data.y0 = 0;

          this.update();
        }
      },
      toggle(d) {
        if (d3.event) {
          d3.event.stopImmediatePropagation();
        }
        if (d.data.children) {
          d.data._children = d.data.children;
          d.data.children = null;
        }
        else {
          d.data.children = d.data._children;
          d.data._children = null;
        }
        this.root = d3.hierarchy(this.root.data, (d) => d.children);

        this.update();
      },
      handleSelected($event) {
        if (d3.event) {
          d3.event.stopImmediatePropagation();
        }
        let data = {
          ProcessGuid: $event.data.id,
          ParentProcessGuid: $event.data.parent,
          ProcessName: $event.data.value,
          sender: this.constructor.name,
        };

        this.root.eachAfter((item) => {
          if (item.data._selected && item.data.id !== $event.data.id) {
            item.data._selected = false;
          }
        });
        $event.data._selected = true;
        this.$bus.$emit('TreeProcessSelected', data.ProcessGuid);
      },
      getFileIconURL(name, sha256Hash) {
        return `/log/icon.php?type=file&name=${name}&resource=${sha256Hash}`;
      },
      moveToParent(e) {
        return e.attr('transform', (d) => {
          return `translate(${d.parent.data.y0},${d.parent.data.x0})`;
        });
      },
      diagonal(data) {
        let s = data.source;
        let d = data.target;
        return `M${s.y},${s.x}C${(s.y + d.y) / 2},${s.x} ${(s.y + d.y) / 2},${d.x} ${d.y},${d.x}`;
      },
      update() {
        const svg = d3.select(this.$refs.svg);
        const g = svg.select('g');
        const duration = 1500;
        let treeMap = d3.tree().nodeSize([20, this.tree.viewer.h])
                        .separation((a, b) => {
                          return a.parent === b.parent ? 1 : 1.5;
                        });
        let root = treeMap(this.root);
        let nodes = root.descendants();
        let links = root.links();

        nodes.forEach((d) => {
          d.y = d.depth *
            ((this.tree.viewer.w - (this.tree.margin.left + this.tree.margin.right)) / (this.root.height ? this.root.height : 1));
          if (!d.data.parent) {
            d.data.x0 = d.x;
            d.data.y0 = d.y;
          }
        });

        let node = g.selectAll('g.node')
                    .data(nodes, (d) => {
                      return d.data.id;
                    });

        let nodeEnter = node.enter().append('g');
        nodeEnter
          .attr('class', 'node')
          .classed('selected', (d) => {
            return d.data._selected;
          })
          .classed('warning', (d) => {
            return d.data._detected;
          })
          .classed('has-child', (d) => {
            return d._children;
          })
          .attr('transform', (d) => {
            let y = d.parent ? (d.parent.data.y0 || 0) : 0;
            let x = d.parent ? (d.parent.data.x0 || 0) : 0;
            return `translate(${y},${x})`;
          });

        nodeEnter.append('circle')
                 .attr('class', 'circle')
                 .attr('r', 4.5)
                 .attr('cursor', 'pointer')
                 .on('click', this.toggle);

        nodeEnter.append('text')
                 .attr('class', 'text')
                 .attr('dy', '.35em')
                 .attr('text-anchor', (d) => {
                   return d.parent ? 'end' : 'start';
                 })
                 .attr('x', (d) => {
                   return d.parent ? -30 : 30;
                 })
                 .attr('y', d => {
                   return -8;
                 })
                 .text((d) => {
                   return d.data.value.toString();
                 })
                 .on('click', this.handleSelected);

        nodeEnter.append('image')
                 .attr('class', 'image')
                 .attr('width', '16px')
                 .attr('height', '16px')
                 .attr('x', (d) => {
                   return d.parent ? -24 : 8;
                 })
                 .attr('y', -16)
                 .attr('xlink:href', (d) => {
                   return this.getFileIconURL(d.data.value.toString(), d.data.FileHash);
                 })
                 .on('click', this.handleSelected);


        let nodeUpdate = nodeEnter.merge(node);
        nodeUpdate
          .classed('selected', (d) => {
            return d.data._selected;
          })
          .classed('warning', (d) => {
            return d.data._detected;
          })
          .classed('has-child', (d) => {
            return d._children;
          })
          .transition()
          .duration(duration)
          .attr('transform', (d) => {
            d.data.y0 = d.y;
            d.data.x0 = d.x;
            return `translate(${d.y},${d.x})`;
          });
        nodeUpdate.select('circle')
                  .on('click', null)
                  .on('click', this.toggle);

        nodeUpdate.select('text')
                  .attr('x', (d) => {
                    return d.parent ? -30 : 30;
                  })
                  .attr('text-anchor', (d) => {
                    return d.parent ? 'end' : 'start';
                  })
                  .on('click', null)
                  .on('click', this.handleSelected);

        nodeUpdate.select('image')
                  .attr('x', (d) => {
                    return d.parent ? -24 : 8;
                  })
                  .on('click', null)
                  .on('click', this.handleSelected);

        let nodeExit = node.exit();
        this.moveToParent(nodeExit.transition().duration(duration))
            .remove();

        nodeExit.select('circle').transition().duration(duration)
                .attr('r', 1e-6)
                .remove();
        nodeExit.select('text').transition().duration(duration)
                .style('fill-opacity', 1e-6)
                .remove();
        nodeExit.select('image').transition().duration(duration)
                .attr('width', 1e-6)
                .attr('height', 1e-6)
                .remove();

        let link = g.selectAll('path.link')
                    .data(links, (d) => {
                      return `${d.source.data.id}-${d.target.data.id}`;
                    });

        // Enter any new links at the parent's previous position.
        let linkEnter = link.enter().insert('path', 'g')
                            .attr('class', 'link')
                            .attr('d', (d) => {
                              let o = {x: d.source.x, y: d.source.y};
                              return this.diagonal({source: o, target: o});
                            });

        let linkUpdate = linkEnter.merge(link);
        linkUpdate.transition()
                  .duration(duration)
                  .attr('d', this.diagonal);
        link.exit()
            .transition()
            .duration(duration)
            .attr('d', (d) => {
              let o = {x: d.source.data.x0, y: d.source.data.y0};
              return this.diagonal({source: o, target: o});
            })
            .remove();

        //        this.initZoom();
      },
      getTreeData(propData) {
        const processGuid = propData.ProcessGuid;
        const url = `/api/admin/search/process/tree/${processGuid}`;
        return this.$http.get(url)
                   .then((data) => {
                     if (data.data && data.data.rows && data.data.rows.length > 0) {
                       return this.dataToTree(processGuid, data.data.rows);
                     }
                     else {
                       throw 'No Data';
                     }
                   })
                   .then((data) => {
                     this.data = data;
                     return this.deploy(processGuid, data);
                   });
      },
      getNodeData(propData) {
        const nodeid = propData.nodeid;
        const url = `/api/admin/node/info/${nodeid}`;
        return this.$http.get(url)
                   .then((data) => {
                     if (data.data) {
                       let columns = this.columns[0];
                       this.list[1].info.length = 0;
                       columns.forEach((col) => {
                         this.list[1].info.push({
                                                  dt: col.title,
                                                  dd: this.getValue(data.data, col.valueName),
                                                });
                       });
                     }
                     return data.data;
                   })
                   .then((data) => {
                     this.list[0].info.nodeInformation = data;
                   });
      },
      getProcessData(propData) {
        const processGuid = propData.ProcessGuid;
        const url = `/api/admin/search/process/info/${processGuid}`;
        return this.$http.get(url)
                   .then((data) => {
                     if (data.data) {
                       let d = data.data.rows;
                       if (d.length > 1) {
                         d[0].EventTime1 = d[1].EventTime
                       }
                       let columns = this.columns[1];
                       this.list[2].info.length = 0;
                       columns.forEach((col) => {
                         this.list[2].info.push({
                                                  dt: col.title,
                                                  dd: this.getValue(d[0], col.valueName),
                                                });
                       });
                     }
                     return data.data;
                   })
                   .then((data) => {
                     this.list[0].info.processInformation = data;
                   });
      },
      getFileData(propData) {
        const processGuid = propData.ProcessGuid;
        const url = `/api/admin/search/file/info/master/process_guid/${processGuid}`;
        return this.$http.get(url)
                   .then((data) => {
                     if (data.data) {
                       let columns = this.columns[2];
                       this.list[3].info.length = 0;
                       columns.forEach((col) => {
                         this.list[3].info.push({
                                                  dt: col.title,
                                                  dd: this.getValue(data.data, col.valueName),
                                                });
                       });
                     }
                     return data.data;
                   })
                   .then((data) => {
                     this.list[0].info.fileInformation = data;
                   });
      },
      getInflowData(propData) {
        const processGuid = propData.ProcessGuid;
        const url = `/api/admin/search/file/inflow/process_guid/${processGuid}`;
        return this.$http.get(url)
                   .then((data) => {
                     if (data.data) {
                       let columns = this.columns[3];
                       this.list[4].info.length = 0;
                       columns.forEach((col) => {
                         this.list[4].info.push({
                                                  dt: col.title,
                                                  dd: this.getValue(data.data, col.valueName),
                                                });
                       });
                     }
                     return data.data;
                   })
                   .then((data) => {
                     this.list[0].info.inflowInformation = data;
                   });
      },
      getDetectData(propData) {
        const processGuid = propData.ProcessGuid;
        const url = `/api/admin/search/process/detect/${processGuid}`;
        return this.$http.get(url)
                   .then((data) => {
                     if (data.data) {
                       let datas = data.data;
                       datas.forEach((d) => {
                         let columns = this.columns[4];
                         this.list[5].info.length = 0;
                         columns.forEach((col) => {
                           this.list[5].info.push({
                                                    dt: col.title,
                                                    dd: this.getValue(d, col.valueName),
                                                  });
                         });
                       });
                     }
                     return data.data;
                   })
                   .then((data) => {
                     this.list[0].info.detectInformation = data;
                   });
      },
    },
    created() {
    },
    mounted() {
      this.initD3();
      if (this.propData) {
        if (this.propData.ProcessGuid) {
          this.getTreeData(this.propData);
          this.getProcessData(this.propData);
          this.getFileData(this.propData);
          this.getInflowData(this.propData);
          this.getDetectData(this.propData);
        }
        if (this.propData.nodeid) {
          this.getNodeData(this.propData);
        }
      }

    },
  };
</script>
<style lang='scss'>
  @import "~styles/variables.scss";

  [data-process-tree] {
    #process-tree {
      max-width: none;
      .node {
        cursor: pointer;
        .circle {
          fill: #fff;
          stroke: steelblue;
          stroke-width: 1.5px;
        }
        text {
          font: 10px sans-serif;
        }

        &.warning {
          .text {
            fill: red;
          }
        }

        &.has-child {
          .circle {
            fill: steelblue;
          }
        }

        &.selected {
          .circle {
            fill: rgb(32, 32, 32);
          }
          > text {
            font-weight: bold;
          }
        }
      }

      .link {
        fill: none;
        stroke: #ccc;
        stroke-width: 1.5px;
      }
    }
  }

  .process-tree {
    display: flex;
    position: relative;

    > div {
      background-color: color(white);
      border: 1px solid color(border);
    }
    h1 {
      display: block;
      height: 42px;
      margin: 0;
      line-height: 42px;
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      color: color(white);
      background-color: #6e8d9f;
      border: 0 none;
    }
    .pc-info {
      width: 330px;
      position: relative;
      overflow: hidden;
      li {
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;
        border-top: 1px solid color(border);
        overflow: hidden;
        @include transition(all, 0.3s);
        span {
          display: block;
          border-bottom: 1px solid color(border);
        }
        &:first-child {
          height: 42px;
          line-height: 42px;
          border-top: 0 none;
          &.on {
            height: 450px;
            .info-wrap-group {
              .info-wrap {
                height: auto;
              }
            }
          }
          span {
            font-size: 18px;
            font-weight: 500;
            color: color(white);
            background-color: #4e6f82;
          }
        }
        &.on {
          height: 440px;
          span {
            font-weight: bold;
          }
        }
      }
      div {
        height: 406px;
        padding: 5px 10px;
        overflow-y: auto;
      }
      dl {
        display: flex;
        margin: 0;
        line-height: 150%;
        text-align: left;
      }
      dt,
      dd {
        padding: 5px 0;
      }
      dt {
        min-width: 120px;
        position: relative;
        .md-icon.dot {
          width: 14px;
          min-width: 14px;
          top: 20px;
          left: 0;
          font-size: 10px;
          color: #1c5bbc;
        }
      }
      dd {
        margin: 0 0 0 5px;
        word-break: break-all;
      }
    }
  }

  div.full-screen {
    z-index: 1000;
    display: block;
    position: absolute;
    font-size: 1.5em;
    > .icons {
      height: 1em;
      display: flex;
      margin: 10px;
      cursor: pointer;
      > span + span {
        margin-left: 10px;
      }
    }
  }

  .layer {
    z-index: 999;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
