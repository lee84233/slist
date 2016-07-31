# selectList
基于jquery的，模仿select下拉框插件

查看演示：[demo](http://www.ygz.design/lc-test/plugins/selectList/)

```html
<!-- 引入css、jquery和selectList-lc.js -->
<link rel="stylesheet" href="css/selectlist-lc.css">
<script src="js/jquery.js"></script>
<script src="js/selectlist-lc.js"></script>

<!-- html构成 -->
<div class="lc-select lc-select1" data-name="lc-select">
  <p class="lc-select-title">选择发布时间</p>
  <ul class="lc-select-ul">
    <li class="lc-select-li" data-value="0">发布时间不限</li>
    <li class="lc-select-li" data-active data-value="1">一天内发布</li>
    <li class="lc-select-li" data-value="2">三天内发布</li>
    <li class="lc-select-li" data-value="3">一周内发布</li>
    <li class="lc-select-li" data-value="4">一个月内发布</li>
    <li class="lc-select-li" data-value="5">三个月内发布</li>
    <li class="lc-select-li" data-value="6">半年内发布</li>
  </ul>
  <!-- input 用于表单提交 -->
  <input class="lc-select-input" type="hidden" name="keywords" value="" />
</div>
```

```javascript
<script>
$(document).ready(function() {

  $('.lc-select').selectList({
    //showNum:2,           //初始显示li的索引
    animated:'slide',    //动画方式
    speed:200,           //动画时长
    //选择后的回调函数, txt:文本 val:data-value和input的value值
    changeLi:function(txt,val){
      console.log(txt);
      console.log(val);
    }
  });
});
</script>
```

##可选选项(options)
- showNum：初始显示li的索引，从1开始计数，默认值:false  
  你也可以在li中添加 data-active 来达到此效果
- animated：动画方式，3个可选值  
  slide(滑动) | fade(淡入淡出) | normal(无效果,默认值)
- speed：动画速度，默认值400毫秒，单位：毫秒
- changeLi：改变后的回调函数(txt,val)  
  参数；文本和value

##API
1.destory：销毁插件
```javascript
$('.lc-select').selectList('destroy');
```
    下拉功能失效，清除selectList的options选项
2.init：初始化（已失效）
```javascript
var options = {
  showNum:3
};
$('.lc-select').selectList({'init':options});
```
    失效，可通过销毁，重新定义的方式初始化