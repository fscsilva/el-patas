/*!
	Colorbox 1.6.4
	license: MIT
	http://www.jacklmoore.com/colorbox
  PATCHED with Aria labels
*/
!function(a,b,c){function Y(c,d,e){var g=b.createElement(c);return d&&(g.id=f+d),e&&(g.style.cssText=e),a(g)}function Z(){return c.innerHeight?c.innerHeight:a(c).height()}function $(b,c){c!==Object(c)&&(c={}),this.cache={},this.el=b,this.value=function(b){var e;return void 0===this.cache[b]&&(e=a(this.el).attr("data-cbox-"+b),void 0!==e?this.cache[b]=e:void 0!==c[b]?this.cache[b]=c[b]:void 0!==d[b]&&(this.cache[b]=d[b])),this.cache[b]},this.get=function(b){var c=this.value(b);return a.isFunction(c)?c.call(this.el,this):c}}function _(a){var b=v.length,c=(N+a)%b;return c<0?b+c:c}function aa(a,b){return Math.round((/%/.test(a)?("x"===b?w.width():Z())/100:1)*parseInt(a,10))}function ba(a,b){return a.get("photo")||a.get("photoRegex").test(b)}function ca(a,b){return a.get("retinaUrl")&&c.devicePixelRatio>1?b.replace(a.get("photoRegex"),a.get("retinaSuffix")):b}function da(a){"contains"in o[0]&&!o[0].contains(a.target)&&a.target!==n[0]&&(a.stopPropagation(),o.focus())}function ea(a){ea.str!==a&&(o.add(n).removeClass(ea.str).addClass(a),ea.str=a)}function fa(b){N=0,b&&!1!==b&&"nofollow"!==b?(v=a("."+g).filter(function(){return new $(this,a.data(this,e)).get("rel")===b}),-1===(N=v.index(I.el))&&(v=v.add(I.el),N=v.length-1)):v=a(I.el)}function ga(c){a(b).trigger(c),H.triggerHandler(c)}function ia(c){var d;if(!R){if(d=a(c).data(e),I=new $(c,d),fa(I.get("rel")),!P){P=Q=!0,ea(I.get("className")),o.css({visibility:"hidden",display:"block",opacity:""}).attr("aria-hidden","true"),x=Y(U,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),q.css({width:"",height:""}).append(x),J=r.height()+u.height()+q.outerHeight(!0)-q.height(),K=s.width()+t.width()+q.outerWidth(!0)-q.width(),L=x.outerHeight(!0),M=x.outerWidth(!0);var f=aa(I.get("initialWidth"),"x"),g=aa(I.get("initialHeight"),"y"),i=I.get("maxWidth"),j=I.get("maxHeight");I.w=Math.max((!1!==i?Math.min(f,aa(i,"x")):f)-M-K,0),I.h=Math.max((!1!==j?Math.min(g,aa(j,"y")):g)-L-J,0),x.css({width:"",height:I.h}),T.position(),ga(h),I.get("onOpen"),G.add(A).hide(),o.attr("aria-hidden","false").focus(),I.get("trapFocus")&&b.addEventListener&&(b.addEventListener("focus",da,!0),H.one(l,function(){b.removeEventListener("focus",da,!0)})),I.get("returnFocus")&&H.one(l,function(){a(I.el).focus()})}var k=parseFloat(I.get("opacity"));n.css({opacity:k===k?k:"",cursor:I.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),I.get("closeButton")?F.html(I.get("close")).attr("aria-label",I.get("close")).attr("aria-hidden","false").appendTo(q):F.appendTo("<div/>"),la()}}function ja(){o||(X=!1,w=a(c),o=Y(U).attr({id:e,class:!1===a.support.opacity?f+"IE":"",role:"dialog","aria-hidden":"true","aria-labelledby":"cboxTitle","aria-describedby":"cboxCurrent",tabindex:"-1"}).hide(),n=Y(U,"Overlay").hide(),z=a([Y(U,"LoadingOverlay")[0],Y(U,"LoadingGraphic")[0]]),p=Y(U,"Wrapper"),q=Y(U,"Content").append(A=Y(U,"Title"),B=Y(U,"Current"),E=a('<button type="button">previous</button>').attr({id:f+"Previous","aria-label":"previous","aria-hidden":"true"}),D=a('<button type="button">next</button>').attr({id:f+"Next","aria-label":"next","aria-hidden":"true"}),C=a('<button type="button">start slideshow</button>').attr({id:f+"Slideshow","aria-label":"start slideshow","aria-hidden":"true"}),z),F=a('<button type="button">close</button>').attr({id:f+"Close","aria-label":"close","aria-hidden":"true"}),p.append(Y(U).append(Y(U,"TopLeft"),r=Y(U,"TopCenter"),Y(U,"TopRight")),Y(U,!1,"clear:left").append(s=Y(U,"MiddleLeft"),q,t=Y(U,"MiddleRight")),Y(U,!1,"clear:left").append(Y(U,"BottomLeft"),u=Y(U,"BottomCenter"),Y(U,"BottomRight"))).find("div div").css({float:"left"}),y=Y(U,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),G=D.add(E).add(B).add(C)),b.body&&!o.parent().length&&a(b.body).append(n,o.append(p,y))}function ka(){function c(a){a.which>1||a.shiftKey||a.altKey||a.metaKey||a.ctrlKey||(a.preventDefault(),ia(this))}return!!o&&(X||(X=!0,D.click(function(){T.next()}),E.click(function(){T.prev()}),F.click(function(){T.close()}),n.click(function(){I.get("overlayClose")&&T.close()}),a(b).bind("keydown."+f,function(a){var b=a.keyCode;P&&I.get("escKey")&&27===b&&(a.preventDefault(),T.close()),P&&I.get("arrowKey")&&v[1]&&!a.altKey&&(37===b?(a.preventDefault(),E.click()):39===b&&(a.preventDefault(),D.click()))}),a.isFunction(a.fn.on)?a(b).on("click."+f,"."+g,c):a("."+g).live("click."+f,c)),!0)}function la(){var b,d,g,e=T.prep,h=++V;if(Q=!0,O=!1,ga(m),ga(i),I.get("onLoad"),I.h=I.get("height")?aa(I.get("height"),"y")-L-J:I.get("innerHeight")&&aa(I.get("innerHeight"),"y"),I.w=I.get("width")?aa(I.get("width"),"x")-M-K:I.get("innerWidth")&&aa(I.get("innerWidth"),"x"),I.mw=I.w,I.mh=I.h,I.get("maxWidth")&&(I.mw=aa(I.get("maxWidth"),"x")-M-K,I.mw=I.w&&I.w<I.mw?I.w:I.mw),I.get("maxHeight")&&(I.mh=aa(I.get("maxHeight"),"y")-L-J,I.mh=I.h&&I.h<I.mh?I.h:I.mh),b=I.get("href"),S=setTimeout(function(){z.show()},100),I.get("inline")){var j=a(b).eq(0);g=a("<div>").hide().insertBefore(j),H.one(m,function(){g.replaceWith(j)}),e(j)}else I.get("iframe")?e(" "):I.get("html")?e(I.get("html")):ba(I,b)?(b=ca(I,b),O=I.get("createImg"),a(O).addClass(f+"Photo").bind("error."+f,function(){e(Y(U,"Error").html(I.get("imgError")))}).one("load",function(){h===V&&setTimeout(function(){var b;I.get("retinaImage")&&c.devicePixelRatio>1&&(O.height=O.height/c.devicePixelRatio,O.width=O.width/c.devicePixelRatio),I.get("scalePhotos")&&(d=function(){O.height-=O.height*b,O.width-=O.width*b},I.mw&&O.width>I.mw&&(b=(O.width-I.mw)/O.width,d()),I.mh&&O.height>I.mh&&(b=(O.height-I.mh)/O.height,d())),I.h&&(O.style.marginTop=Math.max(I.mh-O.height,0)/2+"px"),v[1]&&(I.get("loop")||v[N+1])&&(O.style.cursor="pointer",a(O).bind("click."+f,function(){T.next()})),O.style.width=O.width+"px",O.style.height=O.height+"px",e(O)},1)}),O.src=b):b&&y.load(b,I.get("data"),function(b,c){h===V&&e("error"===c?Y(U,"Error").html(I.get("xhrError")):a(this).contents())})}var n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,I,J,K,L,M,N,O,P,Q,R,S,T,X,d={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return a(this).attr("href")},title:function(){return this.title},createImg:function(){var b=new Image,c=a(this).data("cbox-img-attrs");return"object"==typeof c&&a.each(c,function(a,c){b[a]=c}),b},createIframe:function(){var c=b.createElement("iframe"),d=a(this).data("cbox-iframe-attrs");return"object"==typeof d&&a.each(d,function(a,b){c[a]=b}),"frameBorder"in c&&(c.frameBorder=0),"allowTransparency"in c&&(c.allowTransparency="true"),c.name=(new Date).getTime(),c.allowFullscreen=!0,c}},e="colorbox",f="cbox",g=f+"Element",h=f+"_open",i=f+"_load",j=f+"_complete",k=f+"_cleanup",l=f+"_closed",m=f+"_purge",H=a("<a/>"),U="div",V=0,W={},ha=function(){function e(){clearTimeout(d)}function g(){(I.get("loop")||v[N+1])&&(e(),d=setTimeout(T.next,I.get("slideshowSpeed")))}function h(){C.html(I.get("slideshowStop")).attr("aria-lable",I.get("slideshowStop")).unbind(c).one(c,l),H.bind(j,g).bind(i,e),o.removeClass(b+"off").addClass(b+"on")}function l(){e(),H.unbind(j,g).unbind(i,e),C.html(I.get("slideshowStart")).attr("aria-lable",I.get("slideshowStart")).unbind(c).one(c,function(){T.next(),h()}),o.removeClass(b+"on").addClass(b+"off")}function m(){a=!1,C.attr("aria-hidden","true").hide(),e(),H.unbind(j,g).unbind(i,e),o.removeClass(b+"off "+b+"on")}var a,d,b=f+"Slideshow_",c="click."+f;return function(){a?I.get("slideshow")||(H.unbind(k,m),m()):I.get("slideshow")&&v[1]&&(a=!0,H.one(k,m),I.get("slideshowAuto")?h():l(),C.attr("aria-hidden","false").show())}}();a[e]||(a(ja),T=a.fn[e]=a[e]=function(b,c){var d,f=this;return b=b||{},a.isFunction(f)&&(f=a("<a/>"),b.open=!0),f[0]?(ja(),ka()&&(c&&(b.onComplete=c),f.each(function(){var c=a.data(this,e)||{};a.data(this,e,a.extend(c,b))}).addClass(g),d=new $(f[0],b),d.get("open")&&ia(f[0])),f):f},T.position=function(b,c){function k(){r[0].style.width=u[0].style.width=q[0].style.width=parseInt(o[0].style.width,10)-K+"px",q[0].style.height=s[0].style.height=t[0].style.height=parseInt(o[0].style.height,10)-J+"px"}var d,i,j,e=0,g=0,h=o.offset();if(w.unbind("resize."+f),o.css({top:-9e4,left:-9e4}),i=w.scrollTop(),j=w.scrollLeft(),I.get("fixed")?(h.top-=i,h.left-=j,o.css({position:"fixed"})):(e=i,g=j,o.css({position:"absolute"})),!1!==I.get("right")?g+=Math.max(w.width()-I.w-M-K-aa(I.get("right"),"x"),0):!1!==I.get("left")?g+=aa(I.get("left"),"x"):g+=Math.round(Math.max(w.width()-I.w-M-K,0)/2),!1!==I.get("bottom")?e+=Math.max(Z()-I.h-L-J-aa(I.get("bottom"),"y"),0):!1!==I.get("top")?e+=aa(I.get("top"),"y"):e+=Math.round(Math.max(Z()-I.h-L-J,0)/2),o.css({top:h.top,left:h.left,visibility:"visible"}).attr("aria-hidden","false"),p[0].style.width=p[0].style.height="9999px",d={width:I.w+M+K,height:I.h+L+J,top:e,left:g},b){var l=0;a.each(d,function(a){if(d[a]!==W[a])return void(l=b)}),b=l}W=d,b||o.css(d),o.dequeue().animate(d,{duration:b||0,complete:function(){k(),Q=!1,p[0].style.width=I.w+M+K+"px",p[0].style.height=I.h+L+J+"px",I.get("reposition")&&setTimeout(function(){w.bind("resize."+f,T.position)},1),a.isFunction(c)&&c()},step:k})},T.resize=function(a){var b;P&&(a=a||{},a.width&&(I.w=aa(a.width,"x")-M-K),a.innerWidth&&(I.w=aa(a.innerWidth,"x")),x.css({width:I.w}),a.height&&(I.h=aa(a.height,"y")-L-J),a.innerHeight&&(I.h=aa(a.innerHeight,"y")),a.innerHeight||a.height||(b=x.scrollTop(),x.css({height:"auto"}),I.h=x.height()),x.css({height:I.h}),b&&x.scrollTop(b),T.position("none"===I.get("transition")?0:I.get("speed")))},T.prep=function(c){function h(){return I.w=I.w||x.width(),I.w=I.mw&&I.mw<I.w?I.mw:I.w,I.w}function i(){return I.h=I.h||x.height(),I.h=I.mh&&I.mh<I.h?I.mh:I.h,I.h}if(P){var d,g="none"===I.get("transition")?0:I.get("speed");x.remove(),x=Y(U,"LoadedContent").append(c),x.hide().appendTo(y.show()).css({width:h(),overflow:I.get("scrolling")?"auto":"hidden"}).css({height:i()}).prependTo(q),y.hide(),a(O).css({float:"none"}),ea(I.get("className")),d=function(){function i(){!1===a.support.opacity&&o[0].style.removeAttribute("filter")}var d,h,c=v.length;P&&(h=function(){clearTimeout(S),z.hide(),ga(j),I.get("onComplete")},A.html(I.get("title")).show(),x.show(),c>1?("string"==typeof I.get("current")&&B.html(I.get("current").replace("{current}",N+1).replace("{total}",c)).show(),$showNext=I.get("loop")||N<c-1,D[$showNext?"show":"hide"]().html(I.get("next")).attr("aria-hidden",$showNext?"false":"true").attr("aria-label",I.get("next")),$showPrev=I.get("loop")||N,E[$showPrev?"show":"hide"]().html(I.get("previous")).attr("aria-hidden",$showPrev?"false":"true").attr("aria-label",I.get("previous")),ha(),I.get("preloading")&&a.each([_(-1),_(1)],function(){var c,d=v[this],f=new $(d,a.data(d,e)),g=f.get("href");g&&ba(f,g)&&(g=ca(f,g),c=b.createElement("img"),c.src=g)})):G.hide(),I.get("iframe")?(d=I.get("createIframe"),I.get("scrolling")||(d.scrolling="no"),a(d).attr({src:I.get("href"),class:f+"Iframe"}).one("load",h).appendTo(x),H.one(m,function(){d.src="//about:blank"}),I.get("fastIframe")&&a(d).trigger("load")):h(),"fade"===I.get("transition")?o.fadeTo(g,1,i):i())},"fade"===I.get("transition")?o.fadeTo(g,0,function(){T.position(0,d)}):T.position(g,d)}},T.next=function(){!Q&&v[1]&&(I.get("loop")||v[N+1])&&(N=_(1),ia(v[N]))},T.prev=function(){!Q&&v[1]&&(I.get("loop")||N)&&(N=_(-1),ia(v[N]))},T.close=function(){P&&!R&&(R=!0,P=!1,ga(k),I.get("onCleanup"),w.unbind("."+f),n.fadeTo(I.get("fadeOut")||0,0),o.stop().fadeTo(I.get("fadeOut")||0,0,function(){o.hide().attr("aria-hidden","true"),n.hide(),ga(m),x.remove(),setTimeout(function(){R=!1,ga(l),I.get("onClosed")},1)}))},T.remove=function(){o&&(o.stop(),a[e].close(),o.stop(!1,!0).remove(),n.remove(),R=!1,o=null,a("."+g).removeData(e).removeClass(g),a(b).unbind("click."+f).unbind("keydown."+f))},T.element=function(){return a(I.el)},T.settings=d)}(jQuery,document,window);;
/**
 * @file
 * Colorbox module init js.
 */

(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      var mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    // Use "data-colorbox-gallery" if set otherwise use "rel".
    settings.colorbox.rel = function () {
      if ($(this).data('colorbox-gallery')) {
        return $(this).data('colorbox-gallery');
      }
      else {
        return $(this).attr('rel');
      }
    };

    $('.colorbox', context)
      .once('init-colorbox')
      .colorbox(settings.colorbox);

    $(context).bind('cbox_complete', function () {
      Drupal.attachBehaviors('#cboxLoadedContent');
    });
  }
};

})(jQuery);
;
/**
 * @file
 * Colorbox module style js.
 */

(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(context).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;
/**
 * @file
 * Colorbox module load js.
 */
(function ($) {

Drupal.behaviors.initColorboxLoad = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      var mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $.urlParams = function (url) {
      var p = {},
          e,
          a = /\+/g,  // Regex for replacing addition symbol with a space.
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
          q = url.split('?');
      while (e = r.exec(q[1])) {
        e[1] = d(e[1]);
        e[2] = d(e[2]);
        switch (e[2].toLowerCase()) {
          case 'true':
          case 'yes':
            e[2] = true;
            break;
          case 'false':
          case 'no':
            e[2] = false;
            break;
        }
        if (e[1] == 'width') { e[1] = 'innerWidth'; }
        if (e[1] == 'height') { e[1] = 'innerHeight'; }
        p[e[1]] = e[2];
      }
      return p;
    };
    $('.colorbox-load', context)
      .once('init-colorbox-load', function () {
        var params = $.urlParams($(this).attr('href'));
        $(this).colorbox($.extend({}, settings.colorbox, params));
      });
  }
};

})(jQuery);
;
/**
 * @file
 * Colorbox module inline js.
 */

(function ($) {

Drupal.behaviors.initColorboxInline = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      var mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $.urlParam = function(name, url){
      if (name == 'fragment') {
        var results = new RegExp('(#[^&#]*)').exec(url);
      }
      else {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
      }
      if (!results) { return ''; }
      return results[1] || '';
    };
    $('.colorbox-inline', context).once('init-colorbox-inline').colorbox({
      transition:settings.colorbox.transition,
      speed:settings.colorbox.speed,
      opacity:settings.colorbox.opacity,
      slideshow:settings.colorbox.slideshow,
      slideshowAuto:settings.colorbox.slideshowAuto,
      slideshowSpeed:settings.colorbox.slideshowSpeed,
      slideshowStart:settings.colorbox.slideshowStart,
      slideshowStop:settings.colorbox.slideshowStop,
      current:settings.colorbox.current,
      previous:settings.colorbox.previous,
      next:settings.colorbox.next,
      close:settings.colorbox.close,
      overlayClose:settings.colorbox.overlayClose,
      maxWidth:settings.colorbox.maxWidth,
      maxHeight:settings.colorbox.maxHeight,
      innerWidth:function(){
        return $.urlParam('width', $(this).attr('href'));
      },
      innerHeight:function(){
        return $.urlParam('height', $(this).attr('href'));
      },
      title:function(){
        return decodeURIComponent($.urlParam('title', $(this).attr('href')));
      },
      iframe:function(){
        return $.urlParam('iframe', $(this).attr('href'));
      },
      inline:function(){
        return $.urlParam('inline', $(this).attr('href'));
      },
      href:function(){
        return $.urlParam('fragment', $(this).attr('href'));
      }
    });
  }
};

})(jQuery);
;
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.oldWindowWidth = 0;
  Drupal.TBMegaMenu.displayedMenuMobile = false;
  Drupal.TBMegaMenu.supportedScreens = [768];
  Drupal.TBMegaMenu.menuResponsive = function () {
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    var navCollapse = $('.tb-megamenu').children('.nav-collapse');
    if (windowWidth < Drupal.TBMegaMenu.supportedScreens[0]) {
      navCollapse.addClass('collapse');
      if (Drupal.TBMegaMenu.displayedMenuMobile) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      } else {
        navCollapse.css({height: 0, overflow: 'hidden'});
      }
    } else {
      // If width of window is greater than 980 (supported screen).
      navCollapse.removeClass('collapse');
      if (navCollapse.height() <= 0) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      }
    }
  };
  
  Drupal.behaviors.tbMegaMenuAction = {
    attach: function(context) {
      $('.tb-megamenu-button', context).once('menuIstance', function () {
        var This = this;
        $(This).click(function() {
          if(parseInt($(this).parent().children('.nav-collapse').height())) {
            $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
            Drupal.TBMegaMenu.displayedMenuMobile = false;
          }
          else {
            $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
            Drupal.TBMegaMenu.displayedMenuMobile = true;
          }
        });
      });
      
      
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(!isTouch){
        $(document).ready(function($){
          var mm_duration = 0;
          $('.tb-megamenu').each (function(){
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });
          var mm_timeout = mm_duration ? 100 + mm_duration : 500;
          $('.nav > li, li.mega').hover(function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.addClass ('open')}, 100));  
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.addClass ('open')}, 100));
            }
          },
          function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', 
              setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.removeClass ('open')}, 100));
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.removeClass ('open')}, 100));
            }
          });
        });
      }
      
      $(window).resize(function() {
        var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        if(windowWidth != Drupal.TBMegaMenu.oldWindowWidth){
          Drupal.TBMegaMenu.oldWindowWidth = windowWidth;
          Drupal.TBMegaMenu.menuResponsive();
        }
      });
    },
  }
})(jQuery);

;
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.createTouchMenu = function(items) {
      items.children('a').each( function() {
	var $item = $(this);
        var tbitem = $(this).parent();
        $item.click( function(event){
          if ($item.hasClass('tb-megamenu-clicked')) {
            var $uri = $item.attr('href');
            window.location.href = $uri;
          }
          else {
            event.preventDefault();
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
            }
          }
        }).closest('li').mouseleave( function(){
          $item.removeClass('tb-megamenu-clicked');
          tbitem.removeClass('open');
        });
     });
     /*
     items.children('a').children('span.caret').each( function() {
	var $item = $(this).parent();
        $item.click(function(event){
          tbitem = $item.parent();
          if ($item.hasClass('tb-megamenu-clicked')) {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            if(tbitem.hasClass('open')){	
              tbitem.removeClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
          else {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
        });
     });
     */
  }
  
  Drupal.TBMegaMenu.eventStopPropagation = function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    else if (window.event) {
      window.event.cancelBubble = true;
    }
  }  
  Drupal.behaviors.tbMegaMenuTouchAction = {
    attach: function(context) {
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(isTouch){
        $('html').addClass('touch');
        Drupal.TBMegaMenu.createTouchMenu($('.tb-megamenu ul.nav li.mega').has('.dropdown-menu'));
      }
    }
  }
})(jQuery);
;
(function($){
/**
 * To make a form auto submit, all you have to do is 3 things:
 *
 * ctools_add_js('auto-submit');
 *
 * On gadgets you want to auto-submit when changed, add the ctools-auto-submit
 * class. With FAPI, add:
 * @code
 *  '#attributes' => array('class' => array('ctools-auto-submit')),
 * @endcode
 *
 * If you want to have auto-submit for every form element,
 * add the ctools-auto-submit-full-form to the form. With FAPI, add:
 * @code
 *   '#attributes' => array('class' => array('ctools-auto-submit-full-form')),
 * @endcode
 *
 * If you want to exclude a field from the ctool-auto-submit-full-form auto submission,
 * add the class ctools-auto-submit-exclude to the form element. With FAPI, add:
 * @code
 *   '#attributes' => array('class' => array('ctools-auto-submit-exclude')),
 * @endcode
 *
 * Finally, you have to identify which button you want clicked for autosubmit.
 * The behavior of this button will be honored if it's ajaxy or not:
 * @code
 *  '#attributes' => array('class' => array('ctools-use-ajax', 'ctools-auto-submit-click')),
 * @endcode
 *
 * Currently only 'select', 'radio', 'checkbox' and 'textfield' types are supported. We probably
 * could use additional support for HTML5 input types.
 */

Drupal.behaviors.CToolsAutoSubmit = {
  attach: function(context) {
    // 'this' references the form element
    function triggerSubmit (e) {
      if ($.contains(document.body, this)) {
        var $this = $(this);
        if (!$this.hasClass('ctools-ajaxing')) {
          $this.find('.ctools-auto-submit-click').click();
        }
      }
    }

    // the change event bubbles so we only need to bind it to the outer form
    $('form.ctools-auto-submit-full-form', context)
      .add('.ctools-auto-submit', context)
      .filter('form, select, input:not(:text, :submit)')
      .once('ctools-auto-submit')
      .change(function (e) {
        // don't trigger on text change for full-form
        if ($(e.target).is(':not(:text, :submit, .ctools-auto-submit-exclude)')) {
          triggerSubmit.call(e.target.form);
        }
      });

    // e.keyCode: key
    var discardKeyCode = [
      16, // shift
      17, // ctrl
      18, // alt
      20, // caps lock
      33, // page up
      34, // page down
      35, // end
      36, // home
      37, // left arrow
      38, // up arrow
      39, // right arrow
      40, // down arrow
       9, // tab
      13, // enter
      27  // esc
    ];
    // Don't wait for change event on textfields
    $('.ctools-auto-submit-full-form input:text, input:text.ctools-auto-submit', context)
      .filter(':not(.ctools-auto-submit-exclude)')
      .once('ctools-auto-submit', function () {
        // each textinput element has his own timeout
        var timeoutID = 0;
        $(this)
          .bind('keydown keyup', function (e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID && clearTimeout(timeoutID);
            }
          })
          .keyup(function(e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID = setTimeout($.proxy(triggerSubmit, this.form), 500);
            }
          })
          .bind('change', function (e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID = setTimeout($.proxy(triggerSubmit, this.form), 500);
            }
          });
      });
  }
}
})(jQuery);
;
(function ($) {
	$(document).ready(function(){

		// Check for hash.  Allows age gate to stay passed on browser back button.
		if ($.cookie('Drupal.visitor.age_gate_passed_ccpa') || window.location.hash == '#ageGatePassed') {
			return;
		}

		// Fade in age gate. Add class when shown for css transitions.
		$('#el-patas-age-gate').delay(100).fadeIn(900, function(){
			$(this).addClass('visible');
		});
		// Disable body scrolling while age gate open
		$('body').css('overflow', 'hidden');

		//Safari Fix - Doesn't apply focus on button when clicked
		$('#el-patas-age-gate form .mobile').click(function(){
			$(this).focus();
		})

		// Handle age gate form submission & validaton
		$('#el-patas-age-gate form').submit(function(e){
			var clicked_btn = $(this).find("input[type=submit]:focus").val();
			var remember = $(this).find('input#remember_me').is(':checked');
			var errors = [];
			var errors_container = $('#el-patas-age-gate .errors-container').empty();

			// Mobile users only have to click yes.
			if (clicked_btn == 'yes') {
				close_age_gate(remember);
			}

			if (clicked_btn == 'no') {
				errors.push('El Patas te ha negado el acceso, debes ser mayor de edad para acceder a este sitio.');
			}

			if (errors.length) {
				for (var i = 0; i < errors.length; i++) {
					errors_container.append('<p>'+ errors[i] +'</p>');
				};
			} else {
				close_age_gate(remember);
			}

			// prevent normal form submission
			e.preventDefault();
			return false;
		});


		// Toggle class for mobile slide out copy
		$('.age-gate-link-toggle').click(function(e){
			e.preventDefault();
			$('#el-patas-age-gate').toggleClass('slideRight');
		})

		function close_age_gate(remember) {
			window.location.hash = 'ageGatePassed';
			if (remember) {
				$.cookie('Drupal.visitor.age_gate_passed_ccpa', 1, {expires: 30, path: '/'});
			} else {
				$.cookie('Drupal.visitor.age_gate_passed_ccpa', 1, {path: '/'});
			}

			$.event.trigger({type: 'ageGateClosing'});
			$('#el-patas-age-gate').addClass('hiding').delay(600).fadeOut(600, function(){
				$.event.trigger({type: 'ageGateClosed'});
			});
			$('body').css('overflow', 'auto');
			$('html, body').scrollTop(0);
		}

		function isNumeric(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}


	});
})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

  Drupal.Views = {};

  /**
   * JQuery UI tabs, Views integration component.
   */
  Drupal.behaviors.viewsTabs = {
    attach: function (context) {
      if ($.viewsUi && $.viewsUi.tabs) {
        $('#views-tabset').once('views-processed').viewsTabs({
          selectedClass: 'active'
        });
      }

      $('a.views-remove-link').once('views-processed').click(function(event) {
        var id = $(this).attr('id').replace('views-remove-link-', '');
        $('#views-row-' + id).hide();
        $('#views-removed-' + id).attr('checked', true);
        event.preventDefault();
      });
      /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row).
    */
      $('a.display-remove-link')
        .addClass('display-processed')
        .click(function() {
          var id = $(this).attr('id').replace('display-remove-link-', '');
          $('#display-row-' + id).hide();
          $('#display-removed-' + id).attr('checked', true);
          return false;
        });
    }
  };

  /**
 * Helper function to parse a querystring.
 */
  Drupal.Views.parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf('?');
    if (pos != -1) {
      query = query.substring(pos + 1);
    }
    var pairs = query.split('&');
    for (var i in pairs) {
      if (typeof(pairs[i]) == 'string') {
        var pair = pairs[i].split('=');
        // Ignore the 'q' path argument, if present.
        if (pair[0] != 'q' && pair[1]) {
          args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
      }
    }
    return args;
  };

  /**
 * Helper function to return a view's arguments based on a path.
 */
  Drupal.Views.parseViewArgs = function (href, viewPath) {

    // Provide language prefix.
    if (Drupal.settings.pathPrefix) {
      var viewPath = Drupal.settings.pathPrefix + viewPath;
    }
    var returnObj = {};
    var path = Drupal.Views.getPath(href);
    // Ensure we have a correct path.
    if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
      var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
      returnObj.view_args = args;
      returnObj.view_path = path;
    }
    return returnObj;
  };

  /**
 * Strip off the protocol plus domain from an href.
 */
  Drupal.Views.pathPortion = function (href) {
    // Remove e.g. http://example.com if present.
    var protocol = window.location.protocol;
    if (href.substring(0, protocol.length) == protocol) {
      // 2 is the length of the '//' that normally follows the protocol.
      href = href.substring(href.indexOf('/', protocol.length + 2));
    }
    return href;
  };

  /**
 * Return the Drupal path portion of an href.
 */
  Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(Drupal.settings.basePath.length, href.length);
    // 3 is the length of the '?q=' added to the url without clean urls.
    if (href.substring(0, 3) == '?q=') {
      href = href.substring(3, href.length);
    }
    var chars = ['#', '?', '&'];
    for (var i in chars) {
      if (href.indexOf(chars[i]) > -1) {
        href = href.substr(0, href.indexOf(chars[i]));
      }
    }
    return href;
  };

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress-wrapper" aria-live="polite"></div>');
  this.element.html('<div id ="' + id + '" class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
                    '<div class="percentage sr-only"></div>' +
                    '</div></div>' +
                    '</div><div class="percentage pull-right"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.progress-bar', this.element).css('width', percentage + '%');
    $('div.progress-bar', this.element).attr('aria-valuenow', percentage);
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="alert alert-block alert-error"><a class="close" data-dismiss="alert" href="#">&times;</a><h4>Error message</h4></div>').append(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

  /**
   * Attaches the AJAX behavior to exposed filter forms and key views links.
   */
  Drupal.behaviors.ViewsAjaxView = {};
  Drupal.behaviors.ViewsAjaxView.attach = function() {
    if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
      $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
      });
    }
  };

  Drupal.views = {};
  Drupal.views.instances = {};

  /**
   * Javascript object for a certain view.
   */
  Drupal.views.ajaxView = function(settings) {
    var selector = '.view-dom-id-' + settings.view_dom_id;
    this.$view = $(selector);

    // Retrieve the path to use for views' ajax.
    var ajax_path = Drupal.settings.views.ajax_path;

    // If there are multiple views this might've ended up showing up multiple
    // times.
    if (ajax_path.constructor.toString().indexOf("Array") != -1) {
      ajax_path = ajax_path[0];
    }

    // Check if there are any GET parameters to send to views.
    var queryString = window.location.search || '';
    if (queryString !== '') {
      // Remove the question mark and Drupal path component if any.
      var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
      if (queryString !== '') {
        // If there is a '?' in ajax_path, clean url are on and & should be
        // used to add parameters.
        queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
      }
    }

    this.element_settings = {
      url: ajax_path + queryString,
      submit: settings,
      setClick: true,
      event: 'click',
      selector: selector,
      progress: {
        type: 'throbber'
      }
    };

    this.settings = settings;

    // Add the ajax to exposed forms.
    this.$exposed_form = $('#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
    this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

    // Store Drupal.ajax objects here for all pager links.
    this.links = [];

    // Add the ajax to pagers.
    this.$view
    // Don't attach to nested views. Doing so would attach multiple behaviors
    // to a given element.
      .filter(jQuery.proxy(this.filterNestedViews, this))
      .once(jQuery.proxy(this.attachPagerAjax, this));

    // Add a trigger to update this view specifically. In order to trigger a
    // refresh use the following code.
    //
    // @code
    // jQuery('.view-name').trigger('RefreshView');
    // @endcode
    // Add a trigger to update this view specifically.
    var self_settings = this.element_settings;
    self_settings.event = 'RefreshView';
    this.refreshViewAjax = new Drupal.ajax(this.selector, this.$view, self_settings);
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
    var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
    button = button[0];

    // Call the autocomplete submit before doing AJAX.
    $(button).click(function () {
      if (Drupal.autocompleteSubmit) {
        Drupal.autocompleteSubmit();
      }
    });

    this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
  };

  Drupal.views.ajaxView.prototype.filterNestedViews = function() {
    // If there is at least one parent with a view class, this view
    // is nested (e.g., an attachment). Bail.
    return !this.$view.parents('.view').length;
  };

  /**
   * Attach the ajax behavior to each link.
   */
  Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
    this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
      .each(jQuery.proxy(this.attachPagerLinkAjax, this));
  };

  /**
   * Attach the ajax behavior to a singe link.
   */
  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr('href');
    // Construct an object using the settings defaults and then overriding
    // with data specific to the link.
    $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
    );

    // For anchor tags, these will go to the target of the anchor rather
    // than the usual location.
    $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

    this.element_settings.submit = viewData;
    this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
    this.links.push(this.pagerAjax);
  };

  Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
    // Scroll to the top of the view. This will allow users
    // to browse newly loaded content after e.g. clicking a pager
    // link.
    var offset = $(response.selector).offset();
    // We can't guarantee that the scrollable object should be
    // the body, as the view could be embedded in something
    // more complex such as a modal popup. Recurse up the DOM
    // and scroll the first element that has a non-zero top.
    var scrollTarget = response.selector;
    while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }
    // Only scroll upward.
    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
    }
  };

})(jQuery);
;
