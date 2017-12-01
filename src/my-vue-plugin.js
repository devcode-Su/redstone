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
    // vue.prototype.plunk = options => {
    //   options = options.map(th_plunk);
    //   return options;
    // };
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

    /**
     *
     * @param data any
     * @param format string|Array|Object
     *    example.
     *      1. string
     *        'test' => data['test']
     *        '' => data
     *      2. Array Merge
     *        ['test1', 'test2'] => data['test1'] + separator + data['test2']
     *      3. Array
     *        [{test1: test2}, {test1: test3}] => data[0].test1.test2 + glue + data[1].test1.test3
     *        {'test': {'1': {test1: 'test2'}}} => data.test[1].test1.test2
     *      4. object
     *        {test: {test2: 'test3'}} => data['test']['test2']['test3']
     *        {test: {test2: {test3: ''}}} => data['test']['test2']['test3']
     * @param glue string
     * @returns {string}
     */

    vue.prototype.getValue = (data, format, glue = '.') => {
      let ret = '';
      if (undefined === data || null === data) {
        return ret;
      }
      if (Array.isArray(format) && Array.isArray(data)) {
        let f = format.map((item, idx) => {
          return this.getValue(data[idx], item, glue);
        }).filter((item) => {
          return item;
        });
        if (f.length > 0) {
          ret = f.join(glue);
        }
      }
      else if (Array.isArray(format)) {
        let f = format.map((item) => {
          return this.getValue(data, item, glue);
        }).filter((item) => {
          return item;
        });
        if (f.length > 0) {
          ret = f.join(glue);
        }
      }
      else if (typeof format === 'object') {
        for (let i in format) {
          if (format.hasOwnProperty(i) && data.hasOwnProperty(i)) {

            ret = this.getValue(data[i], format[i], glue);
            if (undefined !== ret && null !== ret && '' !== ret) {
              break;
            }
          }
        }
      }
      else if (typeof format === 'function') {
        ret = format(data);
      }
      else if (format === '') {
        ret = data;
      }
      else {
        if (data.hasOwnProperty(format)) {
          ret = data[format];
        }
      }
      if (typeof ret === 'string') {
        ret = ret.replace(/[\u200e-\u200f\u202a-\u202e]/g, '');
      }
      return ret;
    };

    vue.prototype.getValueEx = (data, keyList) => {
      let ret = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let newItem = {};
        for (let j = 0; j < keyList.length; j++) {
          let valueName = keyList[j];
          if (item.hasOwnProperty(valueName)) {
            newItem[valueName] = item[valueName];
          }
        }
        ret.push(newItem);
      }
      return ret;
    };

    vue.prototype.getValueToArr = (data, arr) => {
      return data.data.map((m) => {
        let ret = [];
        if (m) {
          for (let i = 0; i < arr.length; i++) {
            ret.push(m.map((item) => {
              if (item.hasOwnProperty(arr[i])) {
                return item[arr[i]];
              }
              return null;
            }));
          }
        }
        else {
          ret.push([]);
        }
        return ret;
      });
    }
  }
};

export default MyPlugin
