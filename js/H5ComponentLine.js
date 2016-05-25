// 折线图对象

var H5ComponentLine = function(name, cfg){
  var component = new H5ComponentBase(name, cfg);

  // 加入一个画布，用于做网格线层的背景
  var width = cfg.width;
  var height = cfg.height;
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = context.width = width;
  canvas.height = context.height = height;
  component.append(canvas);

  // 水平网格线 10份
  var step_y = 10;
  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = "#aaa";

  for (var i = 0; i < step_y+1; i++){
    var y = (height/step_y)*i;
    context.moveTo(0,y);
    context.lineTo(width,y);
  }

  // 垂直网格线 （根据项目个数分）
  var step_x = cfg.data.length+1;
  var text_w = (width/cfg.data.length)>>0;
  for(var i =0; i<step_x+1;i++){
    var x = (width/step_x)*i;
    context.moveTo(x,0);
    context.lineTo(x,height);

    // 填写项目名称
    if (cfg.data[i]){
      var text = $('<div class="text">');
      text.text(cfg.data[i][0]);
      text.css('width', text_w/2)
          .css('left', (x/2+text_w/4));
      component.append(text);
    }
  }
  context.stroke();

  // 加入画布 - 数据层
  var canvas4line = document.createElement('canvas');
  var context4line = canvas4line.getContext('2d');
  canvas4line.width = context4line.width = width;
  canvas4line.height = context4line.height = height;
  component.append(canvas4line);

  /**
   * 绘制折线以及对应的数据和阴影
   * @param {floot} 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
   */
  var draw = function(per){
    // 清空画布
    context4line.clearRect(0, 0, width, height);

    // 绘制折线数据点
    context4line.lineWidth = 3;
    context4line.strokeStyle = "#ff8878";

    var col_w = width/(cfg.data.length+1);
    for(var i in cfg.data){
      var item = cfg.data[i];
      var y = height-(item[1]*per*height);
      var x = col_w*i+col_w;
      // context4line.moveTo(x, y);
      console.log(item[1]);
      context4line.beginPath();
      context4line.arc(x,y, 5, 0, 2*Math.PI);
      context4line.stroke();
    }
    // 画线
    context4line.moveTo(col_w, height-(cfg.data[0][1]*per*height));
    for (var i in cfg.data){
      context4line.lineTo(col_w*i+col_w, height-(cfg.data[i][1]*per*height));
      context4line.stroke();
    }
    // 绘制阴影
    context4line.lineTo(col_w*i+col_w, height);
    context4line.lineTo(col_w, height);
    context4line.fillStyle= 'rgba(255, 136, 120, 0.37)';
    context4line.fill();

    // 标记数据
    for(i in cfg.data){
      var item = cfg.data[i];
      x = col_w * i + col_w;
      y = height-(item[1]*per*height);
      // 如果有定义颜色，就设置字体的颜色
      context4line.fillStyle = item[2] ? item[2]:"#595959";
      context4line.fillText((item[1]*100)+'%', x-10, y-10);
    }
  }
  // draw(.5);
  component.on('onLoad', function(){
    // 折线的增长动画
    var s = 0;
    for (var i = 0; i< 100; i++){
      setTimeout(function(){
        s+=0.01;
        draw(s);
      }, i*10);
    }
  });

  component.on('onLeave', function(){
    // 折线的退场动画
    var s = 1;
    for (var i = 0; i< 100; i++){
      setTimeout(function(){
        s-=0.01;
        draw(s);
      }, i*10);
    }
  });

  return component;
}
