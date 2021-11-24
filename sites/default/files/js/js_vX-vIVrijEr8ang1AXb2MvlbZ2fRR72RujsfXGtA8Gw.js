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
(function ($) {

  Drupal.behaviors.captcha = {
    attach: function (context) {

      // Turn off autocompletion for the CAPTCHA response field.
      // We do it here with JavaScript (instead of directly in the markup)
      // because this autocomplete attribute is not standard and
      // it would break (X)HTML compliance.
      $("#edit-captcha-response").attr("autocomplete", "off");

    }
  };

  Drupal.behaviors.captchaAdmin = {
    attach: function (context) {
      // Add onclick handler to checkbox for adding a CAPTCHA description
      // so that the textfields for the CAPTCHA description are hidden
      // when no description should be added.
      // @todo: div.form-item-captcha-description depends on theming, maybe
      // it's better to add our own wrapper with id (instead of a class).
      $("#edit-captcha-add-captcha-description").click(function() {
        if ($("#edit-captcha-add-captcha-description").is(":checked")) {
          // Show the CAPTCHA description textfield(s).
          $("div.form-item-captcha-description").show('slow');
        }
        else {
          // Hide the CAPTCHA description textfield(s).
          $("div.form-item-captcha-description").hide('slow');
        }
      });
      // Hide the CAPTCHA description textfields if option is disabled on page load.
      if (!$("#edit-captcha-add-captcha-description").is(":checked")) {
        $("div.form-item-captcha-description").hide();
      }
    }

  };

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
/**
 * @file select_or_other.js
 */

(function ($) {

  function select_or_other_check_and_show(ele, page_init) {
    var speed;
    if (page_init) {
      speed = 0;
    }
    else {
      speed = 200;
      ele = jQuery(ele).parents(".select-or-other")[0];
    }
    var $other_element = jQuery(ele).find(".select-or-other-other").parents("div.form-item").first();
    var $other_input = $other_element.find('input');
    if (jQuery(ele).find(".select-or-other-select option:selected[value=select_or_other], .select-or-other-select:checked[value=select_or_other]").length) {
      $.fn.prop ? $other_input.prop('required', true) : $other_input.attr('required', true)
      $other_element.show(speed, function() {
        if(!page_init) {
          $(this).find(".select-or-other-other").focus();
        }
      });
    }
    else {
      $other_element.hide(speed);
      $.fn.prop ? $other_input.prop('required', false) : $other_input.removeAttr('required');
      if (page_init)
      {
        // Special case, when the page is loaded, also apply 'display: none' in case it is
        // nested inside an element also hidden by jquery - such as a collapsed fieldset.
        jQuery(ele).find(".select-or-other-other").parents("div.form-item").first().css("display", "none");
      }
    }
  }

  /**
   * The Drupal behaviors for the Select (or other) field.
   */
  Drupal.behaviors.select_or_other = {
    attach: function(context) {
      jQuery(".select-or-other:not('.select-or-other-processed')", context)
        .addClass('select-or-other-processed')
        .each(function () {
          select_or_other_check_and_show(this, true);
        });
      jQuery(".select-or-other-select", context)
        .not("select")
        .click(function () {
          select_or_other_check_and_show(this, false);
        });
      jQuery("select.select-or-other-select", context)
        .change(function () {
          select_or_other_check_and_show(this, false);
        });
    }
  };

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
/**
 * @file
 *   Unlock protected forms by resetting the form action to the path that
 *   it should be, only if the current user is verified to be human.
 */
(function ($) {
  Drupal.antibot = {};
  
  Drupal.behaviors.antibot = {
    attach: function (context) {
      // Assume the user is not human, despite JS being enabled
      Drupal.settings.antibot.human = false;
      
      // Display the hidden forms
      $('.antibot-hidden', context).show();
      // Remove the "no javascript" messages
      $('.antibot-no-js', context).remove();
      
      // Wait for a mouse to move, indicating they are human
      $('body').mousemove(function() {
        // Unlock the forms
        Drupal.antibot.unlockForms();
      });
      
      // A tab or enter key pressed can also indicate they are human
      $('body').keydown(function(e) {
        if ((e.keyCode == 9) || (e.keyCode == 13)) {
          // Unlock the forms
          Drupal.antibot.unlockForms();
        }
      });
    }
  }
  
  /**
   * Revert the action on the protected forms to what it was originally
   * set to.
   */
  Drupal.antibot.unlockForms = function() {
    // Act only if we haven't yet verified this user as being human
    if (!Drupal.settings.antibot.human) {
      // Iterate all antibot form actions that we need to revert
      for (n in Drupal.settings.antibot.actions) {
        $('form#' + n).attr('action', Drupal.settings.antibot.actions[n]);
      }
      // Mark this user as being human
      Drupal.settings.antibot.human = true;
    }
  }
})(jQuery);
;
/**
 * @file
 * JavaScript behaviors for the front-end display of webforms.
 */

(function ($) {

  "use strict";

  Drupal.behaviors.webform = Drupal.behaviors.webform || {};

  Drupal.behaviors.webform.attach = function (context) {
    // Calendar datepicker behavior.
    Drupal.webform.datepicker(context);

    // Conditional logic.
    if (Drupal.settings.webform && Drupal.settings.webform.conditionals) {
      Drupal.webform.conditional(context);
    }
  };

  Drupal.webform = Drupal.webform || {};

  Drupal.webform.datepicker = function (context) {
    $('div.webform-datepicker').each(function () {
      var $webformDatepicker = $(this);
      var $calendar = $webformDatepicker.find('input.webform-calendar');

      // Ensure the page we're on actually contains a datepicker.
      if ($calendar.length == 0) {
        return;
      }

      var startDate = $calendar[0].className.replace(/.*webform-calendar-start-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
      var endDate = $calendar[0].className.replace(/.*webform-calendar-end-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
      var firstDay = $calendar[0].className.replace(/.*webform-calendar-day-(\d).*/, '$1');
      // Convert date strings into actual Date objects.
      startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
      endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

      // Ensure that start comes before end for datepicker.
      if (startDate > endDate) {
        var laterDate = startDate;
        startDate = endDate;
        endDate = laterDate;
      }

      var startYear = startDate.getFullYear();
      var endYear = endDate.getFullYear();

      // Set up the jQuery datepicker element.
      $calendar.datepicker({
        dateFormat: 'yy-mm-dd',
        yearRange: startYear + ':' + endYear,
        firstDay: parseInt(firstDay),
        minDate: startDate,
        maxDate: endDate,
        onSelect: function (dateText, inst) {
          var date = dateText.split('-');
          $webformDatepicker.find('select.year, input.year').val(+date[0]).trigger('change');
          $webformDatepicker.find('select.month').val(+date[1]).trigger('change');
          $webformDatepicker.find('select.day').val(+date[2]).trigger('change');
        },
        beforeShow: function (input, inst) {
          // Get the select list values.
          var year = $webformDatepicker.find('select.year, input.year').val();
          var month = $webformDatepicker.find('select.month').val();
          var day = $webformDatepicker.find('select.day').val();

          // If empty, default to the current year/month/day in the popup.
          var today = new Date();
          year = year ? year : today.getFullYear();
          month = month ? month : today.getMonth() + 1;
          day = day ? day : today.getDate();

          // Make sure that the default year fits in the available options.
          year = (year < startYear || year > endYear) ? startYear : year;

          // jQuery UI Datepicker will read the input field and base its date
          // off of that, even though in our case the input field is a button.
          $(input).val(year + '-' + month + '-' + day);
        }
      });

      // Prevent the calendar button from submitting the form.
      $calendar.click(function (event) {
        // This event is triggered also when pressing enter when the focus is on
        // previous webform components, but we only want to do something when
        // we are on the calendar component. By checking the event client x/y
        // position we known if it was the user clicking. For keyboard navigators
        // simply the focus handles the date picker so we don't have to do
        // anything special for them.
        if (event.clientX !== 0 && event.clientY !== 0) {
          // Focus is only necessary for Safari. But it has no impact on other
          // browsers.
          $(this).focus();
          event.preventDefault();
        }
      });

      // Clear date on backspace or delete.
      $calendar.keyup(function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
          $.datepicker._clearDate(this);
        }
      });
    });
  };

  Drupal.webform.conditional = function (context) {
    // Add the bindings to each webform on the page.
    $.each(Drupal.settings.webform.conditionals, function (formKey, settings) {
      var $form = $('.' + formKey + ':not(.webform-conditional-processed)');
      $form.each(function (index, currentForm) {
        var $currentForm = $(currentForm);
        $currentForm.addClass('webform-conditional-processed');
        $currentForm.bind('change', {'settings': settings}, Drupal.webform.conditionalCheck);

        // Trigger all the elements that cause conditionals on this form.
        Drupal.webform.doConditions($currentForm, settings);
      });
    });
  };

  /**
   * Event handler to respond to field changes in a form.
   *
   * This event is bound to the entire form, not individual fields.
   */
  Drupal.webform.conditionalCheck = function (e) {
    var $triggerElement = $(e.target).closest('.webform-component');
    if (!$triggerElement.length) {
      return;
    }
    var $form = $triggerElement.closest('form');
    var triggerElementKey = $triggerElement.attr('class').match(/webform-component--[^ ]+/)[0];
    var settings = e.data.settings;
    if (settings.sourceMap[triggerElementKey]) {
      Drupal.webform.doConditions($form, settings);
    }
  };

  /**
   * Processes all conditional.
   */
  Drupal.webform.doConditions = function ($form, settings) {

    var stackPointer;
    var resultStack;

    /**
     * Initializes an execution stack for a conditional group's rules.
     *
     * Also initializes sub-conditional rules.
     */
    function executionStackInitialize(andor) {
      stackPointer = -1;
      resultStack = [];
      executionStackPush(andor);
    }

    /**
     * Starts a new subconditional for the given and/or operator.
     */
    function executionStackPush(andor) {
      resultStack[++stackPointer] = {
        results: [],
        andor: andor,
      };
    }

    /**
     * Adds a rule's result to the current sub-conditional.
     */
    function executionStackAccumulate(result) {
      resultStack[stackPointer]['results'].push(result);
    }

    /**
     * Finishes a sub-conditional and adds the result to the parent stack frame.
     */
    function executionStackPop() {
      // Calculate the and/or result.
      var stackFrame = resultStack[stackPointer];
      // Pop stack and protect against stack underflow.
      stackPointer = Math.max(0, stackPointer - 1);
      var $conditionalResults = stackFrame['results'];
      var filteredResults = $.map($conditionalResults, function (val) {
        return val ? val : null;
      });
      return stackFrame['andor'] === 'or'
                ? filteredResults.length > 0
                : filteredResults.length === $conditionalResults.length;
    }

    // Track what has been set/hidden for each target component's elements.
    // Hidden elements must be disabled because if they are required and don't
    // have a value, they will prevent submission due to html5 validation.
    // Each execution of the conditionals adds a temporary class
    // webform-disabled-flag so that elements hidden or set can be disabled and
    // also be prevented from being re-enabled by another conditional (such as a
    // parent fieldset). After processing conditionals, this temporary class
    // must be removed in preparation for the next execution of the
    // conditionals.
    $.each(settings.ruleGroups, function (rgid_key, rule_group) {
      var ruleGroup = settings.ruleGroups[rgid_key];

      // Perform the comparison callback and build the results for this group.
      executionStackInitialize(ruleGroup['andor']);
      $.each(ruleGroup['rules'], function (m, rule) {
        switch (rule['source_type']) {
          case 'component':
            var elementKey = rule['source'];
            var element = $form.find('.' + elementKey)[0];
            var existingValue = settings.values[elementKey] ? settings.values[elementKey] : null;
            executionStackAccumulate(window['Drupal']['webform'][rule.callback](element, existingValue, rule['value']));
            break;

          case 'conditional_start':
            executionStackPush(rule['andor']);
            break;

          case 'conditional_end':
            executionStackAccumulate(executionStackPop());
            break;
        }
      });
      var conditionalResult = executionStackPop();

      $.each(ruleGroup['actions'], function (aid, action) {
        var $target = $form.find('.' + action['target']);
        var actionResult = action['invert'] ? !conditionalResult : conditionalResult;
        switch (action['action']) {
          case 'show':
            var changed = actionResult != Drupal.webform.isVisible($target);
            if (actionResult) {
              $target.find('.webform-conditional-disabled:not(.webform-disabled-flag)')
                .removeClass('webform-conditional-disabled')
                .webformProp('disabled', false);
              $target
                .removeClass('webform-conditional-hidden')
                .show();
              $form.find('.chosen-disabled').prev().trigger('chosen:updated.chosen');
            }
            else {
              $target
                .hide()
                .addClass('webform-conditional-hidden')
                .find(':input')
                  .addClass('webform-conditional-disabled webform-disabled-flag')
                  .webformProp('disabled', true);
            }
            if (changed && $target.is('tr')) {
              Drupal.webform.restripeTable($target.closest('table').first());
            }
            break;

          case 'require':
            var $requiredSpan = $target.find('.form-required, .form-optional').first();
            if (actionResult != $requiredSpan.hasClass('form-required')) {
              var $targetInputElements = $target.find("input:text,textarea,input[type='email'],select,input:radio,input:checkbox,input:file");
              // Rather than hide the required tag, remove it so that other
              // jQuery can respond via Drupal behaviors.
              Drupal.detachBehaviors($requiredSpan);
              $targetInputElements
                .webformProp('required', actionResult)
                .toggleClass('required', actionResult);
              if (actionResult) {
                $requiredSpan.replaceWith('<span class="form-required" title="' + Drupal.t('This field is required.') + '">*</span>');
              }
              else {
                $requiredSpan.replaceWith('<span class="form-optional"></span>');
              }
              Drupal.attachBehaviors($requiredSpan);
            }
            break;

          case 'set':
            var $texts = $target.find("input:text,textarea,input[type='email']");
            var $selects = $target.find('select,select option,input:radio,input:checkbox');
            var $markups = $target.filter('.webform-component-markup');
            if (actionResult) {
              var multiple = $.map(action['argument'].split(','), $.trim);
              $selects
                .webformVal(multiple)
                .webformProp('disabled', true)
                  .addClass('webform-disabled-flag');
              $texts
                .val([action['argument']])
                .webformProp('readonly', true)
                .addClass('webform-disabled-flag');
              // A special case is made for markup. It is sanitized with
              // filter_xss_admin on the server. otherwise text() should be used
              // to avoid an XSS vulnerability. text() however would preclude
              // the use of tags like <strong> or <a>.
              $markups.html(action['argument']);
            }
            else {
              $selects.not('.webform-disabled-flag')
                .webformProp('disabled', false);
              $texts.not('.webform-disabled-flag')
                .webformProp('readonly', false);
              // Markup not set? Then restore original markup as provided in
              // the attribute data-webform-markup.
              $markups.each(function () {
                var $this = $(this);
                var original = $this.data('webform-markup');
                if (original !== undefined) {
                  $this.html(original);
                }
              });
            }
            break;
        }
      }); // End look on each action for one conditional.
    }); // End loop on each conditional.

    $form.find('.webform-disabled-flag').removeClass('webform-disabled-flag');
  };

  /**
   * Event handler to prevent propagation of events.
   *
   * Typically click for disabling radio and checkboxes.
   */
  Drupal.webform.stopEvent = function () {
    return false;
  };

  Drupal.webform.conditionalOperatorStringEqual = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase() === ruleValue.toLowerCase()) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringNotEqual = function (element, existingValue, ruleValue) {
    var found = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase() === ruleValue.toLowerCase()) {
        found = true;
      }
    });
    return !found;
  };

  Drupal.webform.conditionalOperatorStringContains = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringDoesNotContain = function (element, existingValue, ruleValue) {
    var found = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
        found = true;
      }
    });
    return !found;
  };

  Drupal.webform.conditionalOperatorStringBeginsWith = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) === 0) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringEndsWith = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().lastIndexOf(ruleValue.toLowerCase()) === value.length - ruleValue.length) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringEmpty = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var returnValue = true;
    $.each(currentValue, function (n, value) {
      if (value !== '') {
        returnValue = false;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringNotEmpty = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorStringEmpty(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorSelectGreaterThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return Drupal.webform.compare_select(currentValue[0], ruleValue, element) > 0;
  };

  Drupal.webform.conditionalOperatorSelectGreaterThanEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var comparison = Drupal.webform.compare_select(currentValue[0], ruleValue, element);
    return comparison > 0 || comparison === 0;
  };

  Drupal.webform.conditionalOperatorSelectLessThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return Drupal.webform.compare_select(currentValue[0], ruleValue, element) < 0;
  };

  Drupal.webform.conditionalOperatorSelectLessThanEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var comparison = Drupal.webform.compare_select(currentValue[0], ruleValue, element);
    return comparison < 0 || comparison === 0;
  };

  Drupal.webform.conditionalOperatorNumericEqual = function (element, existingValue, ruleValue) {
    // See float comparison: http://php.net/manual/en/language.types.float.php
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var epsilon = 0.000001;
    // An empty string does not match any number.
    return currentValue[0] === '' ? false : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) < epsilon);
  };

  Drupal.webform.conditionalOperatorNumericNotEqual = function (element, existingValue, ruleValue) {
    // See float comparison: http://php.net/manual/en/language.types.float.php
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var epsilon = 0.000001;
    // An empty string does not match any number.
    return currentValue[0] === '' ? true : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) >= epsilon);
  };

  Drupal.webform.conditionalOperatorNumericGreaterThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return parseFloat(currentValue[0]) > parseFloat(ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericGreaterThanEqual = function (element, existingValue, ruleValue) {
    return Drupal.webform.conditionalOperatorNumericGreaterThan(element, existingValue, ruleValue) ||
           Drupal.webform.conditionalOperatorNumericEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericLessThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return parseFloat(currentValue[0]) < parseFloat(ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericLessThanEqual = function (element, existingValue, ruleValue) {
    return Drupal.webform.conditionalOperatorNumericLessThan(element, existingValue, ruleValue) ||
           Drupal.webform.conditionalOperatorNumericEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorDateEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return currentValue === ruleValue;
  };

  Drupal.webform.conditionalOperatorDateNotEqual = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorDateEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorDateBefore = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && currentValue < ruleValue;
  };

  Drupal.webform.conditionalOperatorDateBeforeEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorDateAfter = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && currentValue > ruleValue;
  };

  Drupal.webform.conditionalOperatorDateAfterEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return currentValue === ruleValue;
  };

  Drupal.webform.conditionalOperatorTimeNotEqual = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorTimeEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeBefore = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally exclusive for "before".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeBeforeEqual = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally exclusive for "before".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeAfter = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally inclusive for "after".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeAfterEqual = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally inclusive for "after".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue || currentValue === ruleValue);
  };

  /**
   * Utility function to compare values of a select component.
   *
   * @param string a
   *   First select option key to compare
   * @param string b
   *   Second select option key to compare
   * @param array options
   *   Associative array where the a and b are within the keys
   *
   * @return integer based upon position of $a and $b in $options
   *   -N if $a above (<) $b
   *   0 if $a = $b
   *   +N if $a is below (>) $b
   */
  Drupal.webform.compare_select = function (a, b, element) {
    var optionList = [];
    $('option,input:radio,input:checkbox', element).each(function () {
      optionList.push($(this).val());
    });
    var a_position = optionList.indexOf(a);
    var b_position = optionList.indexOf(b);
    return (a_position < 0 || b_position < 0) ? null : a_position - b_position;
  };

  /**
   * Utility to return current visibility.
   *
   * Uses actual visibility, except for hidden components which use the applied
   * disabled class.
   */
  Drupal.webform.isVisible = function ($element) {
    return $element.hasClass('webform-component-hidden')
              ? !$element.find('input').first().hasClass('webform-conditional-disabled')
              : $element.closest('.webform-conditional-hidden').length == 0;
  };

  /**
   * Function to get a string value from a select/radios/text/etc. field.
   */
  Drupal.webform.stringValue = function (element, existingValue) {
    var value = [];
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        // Checkboxes and radios.
        $element.find('input[type=checkbox]:checked,input[type=radio]:checked').each(function () {
          value.push(this.value);
        });
        // Select lists.
        if (!value.length) {
          var selectValue = $element.find('select').val();
          if (selectValue) {
            if ($.isArray(selectValue)) {
              value = selectValue;
            }
            else {
              value.push(selectValue);
            }
          }
        }
        // Simple text fields. This check is done last so that the select list
        // in select-or-other fields comes before the "other" text field.
        if (!value.length) {
          $element.find('input:not([type=checkbox],[type=radio]),textarea').each(function () {
            value.push(this.value);
          });
        }
      }
    }
    else {
      switch ($.type(existingValue)) {
        case 'array':
          value = existingValue;
          break;

        case 'string':
          value.push(existingValue);
          break;
      }
    }
    return value;
  };

  /**
   * Utility function to calculate a second-based timestamp from a time field.
   */
  Drupal.webform.dateValue = function (element, existingValue) {
    var value = false;
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        var day = $element.find('[name*=day]').val();
        var month = $element.find('[name*=month]').val();
        var year = $element.find('[name*=year]').val();
        // Months are 0 indexed in JavaScript.
        if (month) {
          month--;
        }
        if (year !== '' && month !== '' && day !== '') {
          value = Date.UTC(year, month, day) / 1000;
        }
      }
    }
    else {
      if ($.type(existingValue) === 'array' && existingValue.length) {
        existingValue = existingValue[0];
      }
      if ($.type(existingValue) === 'string') {
        existingValue = existingValue.split('-');
      }
      if (existingValue.length === 3) {
        value = Date.UTC(existingValue[0], existingValue[1], existingValue[2]) / 1000;
      }
    }
    return value;
  };

  /**
   * Utility function to calculate a millisecond timestamp from a time field.
   */
  Drupal.webform.timeValue = function (element, existingValue) {
    var value = false;
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        var hour = $element.find('[name*=hour]').val();
        var minute = $element.find('[name*=minute]').val();
        var ampm = $element.find('[name*=ampm]:checked').val();

        // Convert to integers if set.
        hour = (hour === '') ? hour : parseInt(hour);
        minute = (minute === '') ? minute : parseInt(minute);

        if (hour !== '') {
          hour = (hour < 12 && ampm == 'pm') ? hour + 12 : hour;
          hour = (hour === 12 && ampm == 'am') ? 0 : hour;
        }
        if (hour !== '' && minute !== '') {
          value = Date.UTC(1970, 0, 1, hour, minute) / 1000;
        }
      }
    }
    else {
      if ($.type(existingValue) === 'array' && existingValue.length) {
        existingValue = existingValue[0];
      }
      if ($.type(existingValue) === 'string') {
        existingValue = existingValue.split(':');
      }
      if (existingValue.length >= 2) {
        value = Date.UTC(1970, 0, 1, existingValue[0], existingValue[1]) / 1000;
      }
    }
    return value;
  };

  /**
   * Make a prop shim for jQuery < 1.9.
   */
  $.fn.webformProp = $.fn.webformProp || function (name, value) {
    if (value) {
      return $.fn.prop ? this.prop(name, true) : this.attr(name, true);
    }
    else {
      return $.fn.prop ? this.prop(name, false) : this.removeAttr(name);
    }
  };

  /**
   * Make a multi-valued val() function.
   *
   * This is for setting checkboxes, radios, and select elements.
   */
  $.fn.webformVal = function (values) {
    this.each(function () {
      var $this = $(this);
      var value = $this.val();
      var on = $.inArray($this.val(), values) != -1;
      if (this.nodeName == 'OPTION') {
        $this.webformProp('selected', on ? value : false);
      }
      else {
        $this.val(on ? [value] : false);
      }
    });
    return this;
  };

  /**
   * Given a table's DOM element, restripe the odd/even classes.
   */
  Drupal.webform.restripeTable = function (table) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr, > tr', table)
      .filter(':visible:odd').filter('.odd')
        .removeClass('odd').addClass('even')
      .end().end()
      .filter(':visible:even').filter('.even')
        .removeClass('even').addClass('odd');
  };

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
