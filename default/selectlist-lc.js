(function($){
  "use strict";
  // 定义插件
  $.fn.selectList = function(options){
    var selectListObj = new selectListFunc(this);

    if(options==='destory'){  // 销毁
      selectListObj.destory();
    }else if(options!=='destory' && typeof(options)==='object' ){  // run
      selectListObj.run(options);
    }else{
      console.error('selectList：错误，请查看参数是否正确');
    }
  };

  // 定义构造函数
  var selectListFunc = function(ele){
    // 定义dom
    this.domTree = {
      ele:ele
    };
    this.domTree.title = this.domTree.ele.children('.lc-select-title');
    this.domTree.cnt = this.domTree.ele.children('.lc-select-ul');
    this.domTree.list = this.domTree.cnt.children();
    this.domTree.listActive = this.domTree.cnt.children('[data-active]').eq(0);
    this.domTree.data = this.domTree.ele.children('.lc-select-input');
    // 默认参数
    this.defaults = {
      speed:'normal',// 动画速度
      animated:'normal',// 动画方式
      maxNum:5,// 最大显示条数
      showNum:false,// 默认显示li的索引
    };

    // console.dir(this.opts);

    // start
    this.run = function(options){
      var _this = this;
      // 参数
      this.opts = $.extend({}, this.defaults, options);
      // console.dir(this.opts);

      // 点击title
      this.domTree.title.on('click',function(event){
        _this.changeCnt();
      });

      // 点击li
      this.domTree.list.on('click',function(){
        _this.changeList( $(this) );
      });

      // 默认显示li data-active
      if(this.domTree.listActive.length>0)
        this.changeList( this.domTree.listActive );

      // 默认显示li showNum
      if(this.opts.showNum)
        this.changeList( this.domTree.list.eq(this.opts.showNum-1) );

      // 盒子最大高度
      this.listMaxNums();

    }

    // ul显隐
    this.changeCnt = function(){
      // 清除
      $('[data-name="lc-select"]').not(this.domTree.ele).children('.lc-select-ul').hide();
      $('[data-name="lc-select"]').not(this.domTree.ele).children('.lc-select-title').removeClass('active');

      // 显隐
      if( this.domTree.cnt.is(':hidden') ){  // ul隐藏
        this.showFunc(this.domTree.cnt,'show',this.opts.animated);
      }else{
        this.showFunc(this.domTree.cnt,'hide',this.opts.animated);
      }
    };

    // 显示动画
    this.showFunc = function(dom,result,animated){
      // 滑动动画
      if( animated=='slide' ){
        if( result=='show' ){
          dom.slideDown(this.opts.speed);
          this.domTree.title.addClass('active');
        }else if( result=='hide' ){
          dom.slideUp(this.opts.speed);
          this.domTree.title.removeClass('active');
        }else{
          console.log('我不清楚你是要显示还是隐藏');
        }
      }else if( animated=='fade' ){  // 渐变动画
        if( result=='show' ){
          dom.fadeIn(this.opts.speed);
        }else if( result=='hide' ){
          dom.fadeOut(this.opts.speed);
        }else{
          console.log('我不清楚你是要显示还是隐藏');
        }
      }else if( animated=='normal' ){
        this.showFunc.defaultAnimated(dom,result);
      }else{
        this.showFunc.defaultAnimated(dom,result);
        console.error('我不知道这动画是什么鬼，我会按默认动画处理，以至正常使用');
      }
    };
    this.showFunc.defaultAnimated = function(dom,result){
      if( result=='show' ){
        dom.show();
      }else if( result=='hide' ){
        dom.hide();
      }else{
        console.log('我不清楚你是要显示还是隐藏');
      }
    }

    // 点击li
    this.changeList = function(dom){
      var valTxt = dom.attr('data-value'),
          txt = dom.text();
      this.domTree.title.text( txt );
      this.domTree.data.val( valTxt );
      this.showFunc(this.domTree.cnt,'hide',this.opts.animated);
      if( typeof(this.opts.changeLi)==='function' )this.opts.changeLi(txt,valTxt);
    };

    // li显示个数
    this.listMaxNums = function(){
      var h = this.domTree.list.outerHeight();
      var maxHeight = h * this.opts.maxNum;
      this.domTree.cnt.css('maxHeight',maxHeight+'px');
    }

  }

  // 销毁
  selectListFunc.prototype.destory = function(){
    this.opts = null;
    this.domTree.title.off();
    this.domTree.list.off();
  };

})(jQuery);