var H5ComponentPoint = function(name, cfg){
  var component = new H5ComponentBase(name, cfg);

  // 以第一个数据的比例为大小的 100%
  var base = cfg.data[0][1];

  // 输出每一个 Point
  $.each(cfg.data, function(index, item){
    var point = $('<div class="point point_'+index+'">');

    var name = $('<div class="name">'+item[0]+'</div>');
    var rate = $('<div class="per">'+item[1]*100+'%</div>');
    name.append(rate);
    point.append(name);

    var per = (item[1]/base*100)+'%';
    point.width(per).height(per);

    // 设置point的背景颜色
    if (item[2]) {
      point.css('backgroundColor', item[2]);
    }
    // 设置point的相对位置偏移
    if(item[3]!= undefined && item[4]!= undefined){
      point.css('left', item[3]);
      point.css('top', item[4]);
    }
    component.append(point);
  });
  return component;
}
