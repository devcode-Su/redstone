const MyPlugin = {
  install(vue, options) {
    // data binding
    vue.prototype._plunk = item => {
      if (item.hasOwnProperty('info') && Array.isArray(item.info)) {
        item.info = item.info.reduce((p, c) => {
          p[c.name] = c.value();
          return p;
        }, {});
      }
      else {
        for (let k in item) {
          if (item.hasOwnProperty(k)) {
            if (typeof item[k] === 'object') {
              this._plunk(item[k]);
            }
          }
        }
      }
      return item;
    };
    vue.prototype.plunk = options => {
      options = options.map(this._plunk);
      return options;
    };
    // ip validate
    vue.prototype.isIpValid = str => {
      return (
        str.split(".").filter(function (v) {
          return v === Number(v).toString() && Number(v) < 256;
        }).length === 4
      );
    };
    // department tree
    vue.prototype.listToTree = list => {
      var map = {}, node, roots = [], i;
      for (i = 0; i < list.length; i += 1) {
        map[list[i].dept_code] = i; // initialize the map
        list[i].children = []; // initialize the children
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.pcode !== 0) {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.pcode]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    };
  }
};

export default MyPlugin
