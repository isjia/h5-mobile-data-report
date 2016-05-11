// 基本图文组件对象

var H5ComponentBase = function(name, cfg){
  var cfg = cfg || {}; //如果没有传入cfg，则保持一个空对象；

  // 生成一个随机唯一的id
  var id = ('h5_c_'+Math.random() ).replace('.', '_');

  // 把当前组件类型添加到样式中进行标记
  var cls = ' h5_component_name_' + name + ' h5_component_'+ cfg.type;

  var component = $('<div class="h5_component '+cls+'" id="'+id+'">');

  // 如果配置中存在text，则写入component元素中；
  cfg.text && component.text(cfg.text);
  cfg.width && component.width(cfg.width/2);
  cfg.height && component.height(cfg.height/2);

  cfg.css && component.css(cfg.css);
  cfg.bg && component.css('backgroundImage', 'url('+cfg.bg+')')

  if(cfg.center === true){
    component.css({
      marginLeft: (cfg.width/4 * -1) + 'px',
      left: '50%'
    })
  }

  // 增加component onLoad，onLeave 需要的动画样式
  var cls_prefix = 'h5_component_'+ cfg.type;

  component.on('onLoad', function(){
    component.addClass(cls_prefix+'_load').removeClass(cls_prefix+'_leave');
    cfg.animateIn && component.animate(cfg.animateIn);
    return false;
  })

  component.on('onLeave', function(){
    component.addClass(cls_prefix+'_leave').removeClass(cls_prefix+'_load');
    cfg.animateOut && component.animate(cfg.animateOut);
    return false;
  })
  return component;
}
