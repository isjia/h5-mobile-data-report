// 内容管理对象
var H5 = function(){
  this.id = ('h5_'+Math.random()).replace('.', '_');
  this.el = $('<div class="h5" id="'+this.id+'">').hide();
  this.pages = [];

  $('body').append(this.el);

  /**
   * 新增一个页
   * @param {string} name 组件的名称，会加入到ClassName中
   * @param {string} text 页内的默认文本
   * @return {H5} H5 对象，可以重复使用H5对象支持的方法
   */
  this.addPage = function(name, text){
    var page = $('<div class="h5_page section">');

    if (name != undefined) {
      page.addClass('h5_page_'+name);
    }
    if (text != undefined) {
      page.text(text);
    }
    this.el.append(page);
    this.pages.push(page);
    return this;
  };

  // 新增一个组件
  this.addComponent = function(name, cfg){
    var cfg = cfg || {};
    cfg = $.extend({
      type: 'base'
    }, cfg);

    var component;
    // 获取当前页
    var currentPage = this.pages.slice(-1)[0];

    switch(cfg.type){
      case 'base':
        component = new H5ComponentBase(name, cfg);
        break;
      default:
    }
    currentPage.append(component);
    return this;
  };

  // H5 对象初始化呈现
  this.loader = function(){
    this.el.fullpage({
      onLeave:function(index, nextIndex, direction){
        $(this).find('.h5_component').trigger('onLeave');
      },
      afterLoad:function(anchorLink, index){
        $(this).find('.h5_component').trigger('onLoad');
      }
    });
    this.pages[0].find('.h5_component').trigger('onLoad');
    this.el.show();
  }
  return this;
}
