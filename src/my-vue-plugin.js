const MyPlugin = {
  install(vue, options){
    vue._plunk = function(item) {
      if (item.hasOwnProperty('info') && Array.isArray(item.info)) {
        item.info = item.info.reduce((p, c) => {
          p[c.name] = c.value();
          return p;
        }, {});
      }
      else {
        for ( let k in item ) {
          if ( item.hasOwnProperty(k) ) {
            if ( typeof item[k] === 'object' ) {
              this._plunk(item[k]);
            }
          }
        }
      }
      return item;
    };
    vue.prototype.plunk = function(options) {
      options = options.map(this._plunk);
      return options;
    }
  }
};

export default MyPlugin
