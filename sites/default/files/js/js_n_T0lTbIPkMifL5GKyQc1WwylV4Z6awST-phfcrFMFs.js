/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
;
/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
;
/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.5'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
;
/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
;
/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
;
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
;
/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
;
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
;
/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.5'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
;
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
;
/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.5'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
;
/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
;
(function ($) {

  function morphSearch($el) {
    var input = $el.find( 'input.morphsearch-input' ),
    ctrlClose = $el.find( 'span.morphsearch-close' ),
    body = $('body'),
    scrolltop = 0,
    isOpen = isAnimating = false,
    // show/hide search area
    toggleSearch = function(evt) {
      // return if open and the input gets focused
      if( evt.type.toLowerCase() === 'focus' && isOpen ) return false;

      var offsets = $el[0].getBoundingClientRect();
      if( isOpen ) {
        //Prevents search blog from animating back to the wrong place and sliding to the correct position 
        if($el.id = "morphsearch-blog"){
          $el.find('.morphsearch-scrollable').css({transition:'top 0.5s ease-in-out'})
        }
        $el.addClass('animating');
        $el.removeClass('open');
        body.removeClass('morphsearchOpen');
        $('html, body').scrollTop(scrolltop);
        // trick to hide input text once the search overlay closes
        // todo: hardcoded times, should be done after transition ends
        input.val('');
        if( input.value !== '' ) {
          setTimeout(function() {
            $el.addClass('hideInput');
            setTimeout(function() {
              $el.removeClass('hideInput');
              input.value = '';
            }, 300 );
          }, 500);
        }
        input.blur();
        setTimeout(function(){$el.removeClass('animating').find('.morphsearch-scrollable').attr('style','')},400);
      }
      else {
        //Prevents search blog from sliding icons down when opening
        if($el.id = "morphsearch-blog"){
          $el.find('.morphsearch-scrollable').css({transition:'top 0.5s ease-in-out'})
        }

        $el.addClass('open');
        $el.addClass('animating');
        scrolltop = body.scrollTop();
        body.addClass('morphsearchOpen');
        setTimeout(function(){$el.removeClass('animating').find('.morphsearch-scrollable').attr('style','')},400);
      }
      isOpen = !isOpen;
    };

    // events
    input.on( 'focus', toggleSearch );
    ctrlClose.on( 'click', toggleSearch );
    // esc key closes search overlay
    // keyboard navigation events
    $(document).on( 'keydown', function( ev ) {
      var keyCode = ev.keyCode || ev.which;
      if( keyCode === 27 && isOpen ) {
        toggleSearch(ev);
      }
    } );

    $el.find('form').submit(function(e){
      var searched = $(input).val();
      window.location = $(this).attr('action') + '?query=' + searched;
      return false;
    });

  }

  $.fn.morphSearch = function(parent) {
    return this.each(function() {
      if(!$.data(this, "plugin_morphsearch")) {
        $.data(this, "plugin_morphsearch", new morphSearch($(this)));
      }
    });
  }

  $(document).ready(function(){
    $('.morphsearch').morphSearch();
  });
})(jQuery);
;
/*! iFrame Resizer (iframeSizer.min.js ) - v3.2.0 - 2015-09-04
 *  Desc: Force cross domain iframes to size to content.
 *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
 *  Copyright: (c) 2015 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function(a){"use strict";function b(b,c,d){"addEventListener"in a?b.addEventListener(c,d,!1):"attachEvent"in a&&b.attachEvent("on"+c,d)}function c(){var b,c=["moz","webkit","o","ms"];for(b=0;b<c.length&&!K;b+=1)K=a[c[b]+"RequestAnimationFrame"];K||g("setup","RequestAnimationFrame not supported")}function d(b){var c="Host page: "+b;return a.top!==a.self&&(c=a.parentIFrame&&a.parentIFrame.getId?a.parentIFrame.getId()+": "+b:"Nested host page: "+b),c}function e(a){return H+"["+d(a)+"]"}function f(a){return M[a]?M[a].log:D}function g(a,b){j("log",a,b,f(a))}function h(a,b){j("info",a,b,f(a))}function i(a,b){j("warn",a,b,!0)}function j(b,c,d,f){!0===f&&"object"==typeof a.console&&console[b](e(c),d)}function k(b){function c(){function a(){r(N),o(P)}e("Height"),e("Width"),s(a,N,"resetPage")}function d(){var a=L.substr(I).split(":");return{iframe:M[a[0]].iframe,id:a[0],height:a[1],width:a[2],type:a[3]}}function e(a){var b=Number(M[P]["max"+a]),c=Number(M[P]["min"+a]),d=a.toLowerCase(),e=Number(N[d]);g(P,"Checking "+d+" is in range "+c+"-"+b),c>e&&(e=c,g(P,"Set "+d+" to min value")),e>b&&(e=b,g(P,"Set "+d+" to max value")),N[d]=""+e}function f(){function a(){function a(){var a=0,b=!1;for(g(P,"Checking connection is from allowed list of origins: "+d);a<d.length;a++)if(d[a]===c){b=!0;break}return b}function b(){var a=M[P].remoteHost;return g(P,"Checking connection is from: "+a),c===a}return d.constructor===Array?a():b()}var c=b.origin,d=M[P].checkOrigin;if(d&&""+c!="null"&&!a())throw new Error("Unexpected message received from: "+c+" for "+N.iframe.id+". Message was: "+b.data+". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");return!0}function j(){return H===(""+L).substr(0,I)&&L.substr(I).split(":")[0]in M}function k(){var a=N.type in{"true":1,"false":1,undefined:1};return a&&g(P,"Ignoring init message from meta parent page"),a}function v(a){return L.substr(L.indexOf(":")+G+a)}function w(a){g(P,"MessageCallback passed: {iframe: "+N.iframe.id+", message: "+a+"}"),C("messageCallback",{iframe:N.iframe,message:JSON.parse(a)}),g(P,"--")}function x(){var a=!0;return null===N.iframe&&(i(P,"IFrame ("+N.id+") not found"),a=!1),a}function y(a){var b=a.getBoundingClientRect();return n(P),{x:Math.floor(Number(b.left)+Number(J.x)),y:Math.floor(Number(b.top)+Number(J.y))}}function z(b){function c(){J=h,A(),g(P,"--")}function d(){return{x:Number(N.width)+f.x,y:Number(N.height)+f.y}}function e(){a.parentIFrame?a.parentIFrame["scrollTo"+(b?"Offset":"")](h.x,h.y):i(P,"Unable to scroll to requested position, window.parentIFrame not found")}var f=b?y(N.iframe):{x:0,y:0},h=d();g(P,"Reposition requested from iFrame (offset x:"+f.x+" y:"+f.y+")"),a.top!==a.self?e():c()}function A(){!1!==C("scrollCallback",J)?o(P):p()}function B(b){function c(){var a=y(h);g(P,"Moving to in page link (#"+e+") at x: "+a.x+" y: "+a.y),J={x:a.x,y:a.y},A(),g(P,"--")}function d(){a.parentIFrame?a.parentIFrame.moveToAnchor(e):console.log(P,"In page link #"+e+" not found and window.parentIFrame not found")}var e=b.split("#")[1]||"",f=decodeURIComponent(e),h=document.getElementById(f)||document.getElementsByName(f)[0];h?c():a.top!==a.self?d():consolelog(P,"In page link #"+e+" not found")}function C(a,b){return l(P,a,b)}function D(){switch(M[P].firstRun&&K(),N.type){case"close":m(N.iframe);break;case"message":w(v(6));break;case"scrollTo":z(!1);break;case"scrollToOffset":z(!0);break;case"inPageLink":B(v(9));break;case"reset":q(N);break;case"init":c(),C("initCallback",N.iframe),C("resizedCallback",N);break;default:c(),C("resizedCallback",N)}}function E(a){var b=!0;return M[a]||(b=!1,i(N.type+" No settings for "+a+". Message was: "+L)),b}function F(){for(var a in M)t("iFrame requested init",u(a),document.getElementById(a),a)}function K(){M[P].firstRun=!1}var L=b.data,N={},P=null;"[iFrameResizerChild]Ready"===L?F():j()?(N=d(),P=O=N.id,!k()&&E(P)&&(g(P,"Received: "+L),x()&&f()&&D())):h(P,"Ignored: "+L)}function l(a,b,c){var d=null,e=null;if(M[a]){if(d=M[a][b],"function"!=typeof d)throw new TypeError(b+" on iFrame["+a+"] is not a function");e=d(c)}return e}function m(a){var b=a.id;g(b,"Removing iFrame: "+b),a.parentNode.removeChild(a),l(b,"closedCallback",b),g(b,"--"),delete M[b]}function n(b){null===J&&(J={x:void 0!==a.pageXOffset?a.pageXOffset:document.documentElement.scrollLeft,y:void 0!==a.pageYOffset?a.pageYOffset:document.documentElement.scrollTop},g(b,"Get page position: "+J.x+","+J.y))}function o(b){null!==J&&(a.scrollTo(J.x,J.y),g(b,"Set page position: "+J.x+","+J.y),p())}function p(){J=null}function q(a){function b(){r(a),t("reset","reset",a.iframe,a.id)}g(a.id,"Size reset requested by "+("init"===a.type?"host page":"iFrame")),n(a.id),s(b,a,"reset")}function r(a){function b(b){a.iframe.style[b]=a[b]+"px",g(a.id,"IFrame ("+e+") "+b+" set to "+a[b]+"px")}function c(b){E||"0"!==a[b]||(E=!0,g(e,"Hidden iFrame detected, creating visibility listener"),y())}function d(a){b(a),c(a)}var e=a.iframe.id;M[e]&&(M[e].sizeHeight&&d("height"),M[e].sizeWidth&&d("width"))}function s(a,b,c){c!==b.type&&K?(g(b.id,"Requesting animation frame"),K(a)):a()}function t(a,b,c,d){function e(){g(d,"["+a+"] Sending msg to iframe["+d+"] ("+b+")"),c.contentWindow.postMessage(H+b,i)}function f(){h(d,"["+a+"] IFrame("+d+") not found"),M[d]&&delete M[d]}d=d||c.id;var i=M[d].targetOrigin;c&&"contentWindow"in c?e():f()}function u(a){return a+":"+M[a].bodyMarginV1+":"+M[a].sizeWidth+":"+M[a].log+":"+M[a].interval+":"+M[a].enablePublicMethods+":"+M[a].autoResize+":"+M[a].bodyMargin+":"+M[a].heightCalculationMethod+":"+M[a].bodyBackground+":"+M[a].bodyPadding+":"+M[a].tolerance+":"+M[a].inPageLinks+":"+M[a].resizeFrom+":"+M[a].widthCalculationMethod}function v(a,c){function d(){function b(b){1/0!==M[v][b]&&0!==M[v][b]&&(a.style[b]=M[v][b]+"px",g(v,"Set "+b+" = "+M[v][b]+"px"))}function c(a){if(M[v]["min"+a]>M[v]["max"+a])throw new Error("Value for min"+a+" can not be greater than max"+a)}c("Height"),c("Width"),b("maxHeight"),b("minHeight"),b("maxWidth"),b("minWidth")}function e(b){return O=b,""===b&&(a.id=b=(c.id||P.id)+C++,D=(c||{}).log,O=b,g(b,"Added missing iframe ID: "+b+" ("+a.src+")")),b}function f(){g(v,"IFrame scrolling "+(M[v].scrolling?"enabled":"disabled")+" for "+v),a.style.overflow=!1===M[v].scrolling?"hidden":"auto",a.scrolling=!1===M[v].scrolling?"no":"yes"}function h(){("number"==typeof M[v].bodyMargin||"0"===M[v].bodyMargin)&&(M[v].bodyMarginV1=M[v].bodyMargin,M[v].bodyMargin=""+M[v].bodyMargin+"px")}function j(){var b=M[v].firstRun,c=M[v].heightCalculationMethod in L;!b&&c&&q({iframe:a,height:0,width:0,type:"init"})}function k(){Function.prototype.bind&&(M[v].iframe.iFrameResizer={close:m.bind(null,M[v].iframe),resize:t.bind(null,"Window resize","resize",M[v].iframe),moveToAnchor:function(a){t("Move to anchor","inPageLink:"+a,M[v].iframe,v)},sendMessage:function(a){a=JSON.stringify(a),t("Send Message","message:"+a,M[v].iframe,v)}})}function l(c){function d(){t("iFrame.onload",c,a),j()}b(a,"load",d),t("init",c,a)}function n(a){if("object"!=typeof a)throw new TypeError("Options is not an object")}function o(a){for(var b in P)P.hasOwnProperty(b)&&(M[v][b]=a.hasOwnProperty(b)?a[b]:P[b])}function p(a){return""===a||"file://"===a?"*":a}function r(b){b=b||{},M[v]={firstRun:!0,iframe:a,remoteHost:a.src.split("/").slice(0,3).join("/")},n(b),o(b),M[v].targetOrigin=!0===M[v].checkOrigin?p(M[v].remoteHost):"*"}function s(){return v in M&&"iFrameResizer"in a}var v=e(a.id);s()?i(v,"Ignored iFrame, already setup."):(r(c),f(),d(),h(),l(u(v)),k())}function w(a,b){null===N&&(N=setTimeout(function(){N=null,a()},b))}function x(a){return null!==a.offsetParent}function y(){function b(){function a(a){function b(b){return"0px"===M[a].iframe.style[b]}x(M[a].iframe)&&(b("height")||b("width"))&&t("Visibility change","resize",M[a].iframe,a)}for(var b in M)a(b)}function c(a){g("window","Mutation observed: "+a[0].target+" "+a[0].type),w(b,16)}function d(){var a=document.querySelector("body"),b={attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0},d=new e(c);d.observe(a,b)}var e=a.MutationObserver||a.WebKitMutationObserver;e&&d()}function z(){function c(a){function b(){e("Window "+a,"resize")}g("window","Trigger event: "+a),w(b,16)}function d(){function a(){e("Tab Visable","resize")}"hidden"!==document.visibilityState&&(g("document","Trigger event: Visiblity change"),w(a,16))}function e(a,b){function c(a){return"parent"===M[a].resizeFrom&&M[a].autoResize&&!M[a].firstRun}for(var d in M)c(d)&&t(a,b,document.getElementById(d),d)}b(a,"message",k),b(a,"resize",function(){c("resize")}),b(document,"visibilitychange",d),b(document,"-webkit-visibilitychange",d),b(a,"focusin",function(){c("focus")}),b(a,"focus",function(){c("focus")})}function A(){function a(a,c){if(!c.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==c.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+c.tagName+">");v(c,a),b.push(c)}var b;return c(),z(),function(c,d){switch(b=[],typeof d){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(d||"iframe"),a.bind(void 0,c));break;case"object":a(c,d);break;default:throw new TypeError("Unexpected data type ("+typeof d+")")}return b}}function B(a){a.fn.iFrameResize=function(a){return this.filter("iframe").each(function(b,c){v(c,a)}).end()}}var C=0,D=!1,E=!1,F="message",G=F.length,H="[iFrameSizer]",I=H.length,J=null,K=a.requestAnimationFrame,L={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},M={},N=null,O="Host Page",P={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,inPageLinks:!1,enablePublicMethods:!0,heightCalculationMethod:"bodyOffset",id:"iFrameResizer",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,resizeFrom:"parent",scrolling:!1,sizeHeight:!0,sizeWidth:!1,tolerance:0,widthCalculationMethod:"scroll",closedCallback:function(){},initCallback:function(){},messageCallback:function(){i("MessageCallback function not defined")},resizedCallback:function(){},scrollCallback:function(){return!0}};a.jQuery&&B(jQuery),"function"==typeof define&&define.amd?define([],A):"object"==typeof module&&"object"==typeof module.exports?module.exports=A():a.iFrameResize=a.iFrameResize||A()}(window||{});
//# sourceMappingURL=iframeResizer.map;
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-shiv-cssclasses-prefixed-testprop-testallprops-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(prefixes.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b){for(var d in a){var e=a[d];if(!A(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}function D(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return z(b,"string")||z(b,"undefined")?B(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),C(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.csstransitions=function(){return D("transition")};for(var E in p)w(p,E)&&(u=E.toLowerCase(),e[u]=p[E](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return B([a])},e.testAllProps=D,e.prefixed=function(a,b,c){return b?D(a,b,c):D(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+s.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
//! moment.js
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Dc.apply(null,arguments)}function b(a){Dc=a}function c(a){return"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return za(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(0/0);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=j(b)),"undefined"!=typeof b._locale&&(a._locale=b._locale),Fc.length>0)for(c in Fc)d=Fc[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function n(b){m(this,b),this._d=new Date(+b._d),Gc===!1&&(Gc=!0,a.updateOffset(this),Gc=!1)}function o(a){return a instanceof n||null!=a&&null!=a._isAMomentObject}function p(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function q(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&p(a[d])!==p(b[d]))&&g++;return g+f}function r(){}function s(a){return a?a.toLowerCase().replace("_","-"):a}function t(a){for(var b,c,d,e,f=0;f<a.length;){for(e=s(a[f]).split("-"),b=e.length,c=s(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=u(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&q(e,c,!0)>=b-1)break;b--}f++}return null}function u(a){var b=null;if(!Hc[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Ec._abbr,require("./locale/"+a),v(b)}catch(c){}return Hc[a]}function v(a,b){var c;return a&&(c="undefined"==typeof b?x(a):w(a,b),c&&(Ec=c)),Ec._abbr}function w(a,b){return null!==b?(b.abbr=a,Hc[a]||(Hc[a]=new r),Hc[a].set(b),v(a),Hc[a]):(delete Hc[a],null)}function x(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Ec;if(!c(a)){if(b=u(a))return b;a=[a]}return t(a)}function y(a,b){var c=a.toLowerCase();Ic[c]=Ic[c+"s"]=Ic[b]=a}function z(a){return"string"==typeof a?Ic[a]||Ic[a.toLowerCase()]:void 0}function A(a){var b,c,d={};for(c in a)f(a,c)&&(b=z(c),b&&(d[b]=a[c]));return d}function B(b,c){return function(d){return null!=d?(D(this,b,d),a.updateOffset(this,c),this):C(this,b)}}function C(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function D(a,b,c){return a._d["set"+(a._isUTC?"UTC":"")+b](c)}function E(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=z(a),"function"==typeof this[a])return this[a](b);return this}function F(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function G(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Mc[a]=e),b&&(Mc[b[0]]=function(){return F(e.apply(this,arguments),b[1],b[2])}),c&&(Mc[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function H(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function I(a){var b,c,d=a.match(Jc);for(b=0,c=d.length;c>b;b++)Mc[d[b]]?d[b]=Mc[d[b]]:d[b]=H(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function J(a,b){return a.isValid()?(b=K(b,a.localeData()),Lc[b]||(Lc[b]=I(b)),Lc[b](a)):a.localeData().invalidDate()}function K(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Kc.lastIndex=0;d>=0&&Kc.test(a);)a=a.replace(Kc,c),Kc.lastIndex=0,d-=1;return a}function L(a,b,c){_c[a]="function"==typeof b?b:function(a){return a&&c?c:b}}function M(a,b){return f(_c,a)?_c[a](b._strict,b._locale):new RegExp(N(a))}function N(a){return a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function O(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=p(a)}),c=0;c<a.length;c++)ad[a[c]]=d}function P(a,b){O(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function Q(a,b,c){null!=b&&f(ad,a)&&ad[a](b,c._a,c,a)}function R(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function S(a){return this._months[a.month()]}function T(a){return this._monthsShort[a.month()]}function U(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function V(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),R(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function W(b){return null!=b?(V(this,b),a.updateOffset(this,!0),this):C(this,"Month")}function X(){return R(this.year(),this.month())}function Y(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[cd]<0||c[cd]>11?cd:c[dd]<1||c[dd]>R(c[bd],c[cd])?dd:c[ed]<0||c[ed]>24||24===c[ed]&&(0!==c[fd]||0!==c[gd]||0!==c[hd])?ed:c[fd]<0||c[fd]>59?fd:c[gd]<0||c[gd]>59?gd:c[hd]<0||c[hd]>999?hd:-1,j(a)._overflowDayOfYear&&(bd>b||b>dd)&&(b=dd),j(a).overflow=b),a}function Z(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function $(a,b){var c=!0,d=a+"\n"+(new Error).stack;return g(function(){return c&&(Z(d),c=!1),b.apply(this,arguments)},b)}function _(a,b){kd[a]||(Z(b),kd[a]=!0)}function aa(a){var b,c,d=a._i,e=ld.exec(d);if(e){for(j(a).iso=!0,b=0,c=md.length;c>b;b++)if(md[b][1].exec(d)){a._f=md[b][0]+(e[6]||" ");break}for(b=0,c=nd.length;c>b;b++)if(nd[b][1].exec(d)){a._f+=nd[b][0];break}d.match(Yc)&&(a._f+="Z"),ta(a)}else a._isValid=!1}function ba(b){var c=od.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(aa(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function ca(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function da(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function ea(a){return fa(a)?366:365}function fa(a){return a%4===0&&a%100!==0||a%400===0}function ga(){return fa(this.year())}function ha(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=Aa(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ia(a){return ha(a,this._week.dow,this._week.doy).week}function ja(){return this._week.dow}function ka(){return this._week.doy}function la(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function ma(a){var b=ha(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function na(a,b,c,d,e){var f,g,h=da(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:ea(a-1)+g}}function oa(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function pa(a,b,c){return null!=a?a:null!=b?b:c}function qa(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function ra(a){var b,c,d,e,f=[];if(!a._d){for(d=qa(a),a._w&&null==a._a[dd]&&null==a._a[cd]&&sa(a),a._dayOfYear&&(e=pa(a._a[bd],d[bd]),a._dayOfYear>ea(e)&&(j(a)._overflowDayOfYear=!0),c=da(e,0,a._dayOfYear),a._a[cd]=c.getUTCMonth(),a._a[dd]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[ed]&&0===a._a[fd]&&0===a._a[gd]&&0===a._a[hd]&&(a._nextDay=!0,a._a[ed]=0),a._d=(a._useUTC?da:ca).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[ed]=24)}}function sa(a){var b,c,d,e,f,g,h;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=pa(b.GG,a._a[bd],ha(Aa(),1,4).year),d=pa(b.W,1),e=pa(b.E,1)):(f=a._locale._week.dow,g=a._locale._week.doy,c=pa(b.gg,a._a[bd],ha(Aa(),f,g).year),d=pa(b.w,1),null!=b.d?(e=b.d,f>e&&++d):e=null!=b.e?b.e+f:f),h=na(c,d,e,g,f),a._a[bd]=h.year,a._dayOfYear=h.dayOfYear}function ta(b){if(b._f===a.ISO_8601)return void aa(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=K(b._f,b._locale).match(Jc)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(M(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),Mc[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),Q(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[ed]<=12&&b._a[ed]>0&&(j(b).bigHour=void 0),b._a[ed]=ua(b._locale,b._a[ed],b._meridiem),ra(b),Y(b)}function ua(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function va(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(0/0));for(e=0;e<a._f.length;e++)f=0,b=m({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],ta(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function wa(a){if(!a._d){var b=A(a._i);a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],ra(a)}}function xa(a){var b,e=a._i,f=a._f;return a._locale=a._locale||x(a._l),null===e||void 0===f&&""===e?l({nullInput:!0}):("string"==typeof e&&(a._i=e=a._locale.preparse(e)),o(e)?new n(Y(e)):(c(f)?va(a):f?ta(a):d(e)?a._d=e:ya(a),b=new n(Y(a)),b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b))}function ya(b){var f=b._i;void 0===f?b._d=new Date:d(f)?b._d=new Date(+f):"string"==typeof f?ba(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),ra(b)):"object"==typeof f?wa(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function za(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,xa(f)}function Aa(a,b,c,d){return za(a,b,c,d,!1)}function Ba(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Aa();for(d=b[0],e=1;e<b.length;++e)b[e][a](d)&&(d=b[e]);return d}function Ca(){var a=[].slice.call(arguments,0);return Ba("isBefore",a)}function Da(){var a=[].slice.call(arguments,0);return Ba("isAfter",a)}function Ea(a){var b=A(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=x(),this._bubble()}function Fa(a){return a instanceof Ea}function Ga(a,b){G(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+F(~~(a/60),2)+b+F(~~a%60,2)})}function Ha(a){var b=(a||"").match(Yc)||[],c=b[b.length-1]||[],d=(c+"").match(td)||["-",0,0],e=+(60*d[1])+p(d[2]);return"+"===d[0]?e:-e}function Ia(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(o(b)||d(b)?+b:+Aa(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Aa(b).local();return c._isUTC?Aa(b).zone(c._offset||0):Aa(b).local()}function Ja(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ka(b,c){var d,e=this._offset||0;return null!=b?("string"==typeof b&&(b=Ha(b)),Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ja(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?$a(this,Va(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ja(this)}function La(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Ma(a){return this.utcOffset(0,a)}function Na(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ja(this),"m")),this}function Oa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ha(this._i)),this}function Pa(a){return a=a?Aa(a).utcOffset():0,(this.utcOffset()-a)%60===0}function Qa(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ra(){if(this._a){var a=this._isUTC?h(this._a):Aa(this._a);return this.isValid()&&q(this._a,a.toArray())>0}return!1}function Sa(){return!this._isUTC}function Ta(){return this._isUTC}function Ua(){return this._isUTC&&0===this._offset}function Va(a,b){var c,d,e,g=a,h=null;return Fa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=ud.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:p(h[dd])*c,h:p(h[ed])*c,m:p(h[fd])*c,s:p(h[gd])*c,ms:p(h[hd])*c}):(h=vd.exec(a))?(c="-"===h[1]?-1:1,g={y:Wa(h[2],c),M:Wa(h[3],c),d:Wa(h[4],c),h:Wa(h[5],c),m:Wa(h[6],c),s:Wa(h[7],c),w:Wa(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=Ya(Aa(g.from),Aa(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Ea(g),Fa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function Wa(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function Xa(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Ya(a,b){var c;return b=Ia(b,a),a.isBefore(b)?c=Xa(a,b):(c=Xa(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function Za(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(_(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Va(c,d),$a(this,e,a),this}}function $a(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&D(b,"Date",C(b,"Date")+g*d),h&&V(b,C(b,"Month")+h*d),e&&a.updateOffset(b,g||h)}function _a(a){var b=a||Aa(),c=Ia(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,Aa(b)))}function ab(){return new n(this)}function bb(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+this>+a):(c=o(a)?+a:+Aa(a),c<+this.clone().startOf(b))}function cb(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+a>+this):(c=o(a)?+a:+Aa(a),+this.clone().endOf(b)<c)}function db(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function eb(a,b){var c;return b=z(b||"millisecond"),"millisecond"===b?(a=o(a)?a:Aa(a),+this===+a):(c=+Aa(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))}function fb(a){return 0>a?Math.ceil(a):Math.floor(a)}function gb(a,b,c){var d,e,f=Ia(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=z(b),"year"===b||"month"===b||"quarter"===b?(e=hb(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:fb(e)}function hb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function ib(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function jb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():J(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):J(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function kb(b){var c=J(this,b||a.defaultFormat);return this.localeData().postformat(c)}function lb(a,b){return this.isValid()?Va({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function mb(a){return this.from(Aa(),a)}function nb(a,b){return this.isValid()?Va({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function ob(a){return this.to(Aa(),a)}function pb(a){var b;return void 0===a?this._locale._abbr:(b=x(a),null!=b&&(this._locale=b),this)}function qb(){return this._locale}function rb(a){switch(a=z(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function sb(a){return a=z(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function tb(){return+this._d-6e4*(this._offset||0)}function ub(){return Math.floor(+this/1e3)}function vb(){return this._offset?new Date(+this):this._d}function wb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function xb(){return k(this)}function yb(){return g({},j(this))}function zb(){return j(this).overflow}function Ab(a,b){G(0,[a,a.length],0,b)}function Bb(a,b,c){return ha(Aa([a,11,31+b-c]),b,c).week}function Cb(a){var b=ha(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")}function Db(a){var b=ha(this,1,4).year;return null==a?b:this.add(a-b,"y")}function Eb(){return Bb(this.year(),1,4)}function Fb(){var a=this.localeData()._week;return Bb(this.year(),a.dow,a.doy)}function Gb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Hb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function Ib(a){return this._weekdays[a.day()]}function Jb(a){return this._weekdaysShort[a.day()]}function Kb(a){return this._weekdaysMin[a.day()]}function Lb(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=Aa([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b}function Mb(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Hb(a,this.localeData()),this.add(a-b,"d")):b}function Nb(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ob(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)}function Pb(a,b){G(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function Qb(a,b){return b._meridiemParse}function Rb(a){return"p"===(a+"").toLowerCase().charAt(0)}function Sb(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Tb(a){G(0,[a,3],0,"millisecond")}function Ub(){return this._isUTC?"UTC":""}function Vb(){return this._isUTC?"Coordinated Universal Time":""}function Wb(a){return Aa(1e3*a)}function Xb(){return Aa.apply(null,arguments).parseZone()}function Yb(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.call(b,c):d}function Zb(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b}function $b(){return this._invalidDate}function _b(a){return this._ordinal.replace("%d",a)}function ac(a){return a}function bc(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)}function cc(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)}function dc(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function ec(a,b,c,d){var e=x(),f=h().set(d,b);return e[c](f,a)}function fc(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return ec(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=ec(a,f,c,e);return g}function gc(a,b){return fc(a,b,"months",12,"month")}function hc(a,b){return fc(a,b,"monthsShort",12,"month")}function ic(a,b){return fc(a,b,"weekdays",7,"day")}function jc(a,b){return fc(a,b,"weekdaysShort",7,"day")}function kc(a,b){return fc(a,b,"weekdaysMin",7,"day")}function lc(){var a=this._data;return this._milliseconds=Rd(this._milliseconds),this._days=Rd(this._days),this._months=Rd(this._months),a.milliseconds=Rd(a.milliseconds),a.seconds=Rd(a.seconds),a.minutes=Rd(a.minutes),a.hours=Rd(a.hours),a.months=Rd(a.months),a.years=Rd(a.years),this}function mc(a,b,c,d){var e=Va(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function nc(a,b){return mc(this,a,b,1)}function oc(a,b){return mc(this,a,b,-1)}function pc(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;return g.milliseconds=d%1e3,a=fb(d/1e3),g.seconds=a%60,b=fb(a/60),g.minutes=b%60,c=fb(b/60),g.hours=c%24,e+=fb(c/24),h=fb(qc(e)),e-=fb(rc(h)),f+=fb(e/30),e%=30,h+=fb(f/12),f%=12,g.days=e,g.months=f,g.years=h,this}function qc(a){return 400*a/146097}function rc(a){return 146097*a/400}function sc(a){var b,c,d=this._milliseconds;if(a=z(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+12*qc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(rc(this._months/12)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function tc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*p(this._months/12)}function uc(a){return function(){return this.as(a)}}function vc(a){return a=z(a),this[a+"s"]()}function wc(a){return function(){return this._data[a]}}function xc(){return fb(this.days()/7)}function yc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function zc(a,b,c){var d=Va(a).abs(),e=fe(d.as("s")),f=fe(d.as("m")),g=fe(d.as("h")),h=fe(d.as("d")),i=fe(d.as("M")),j=fe(d.as("y")),k=e<ge.s&&["s",e]||1===f&&["m"]||f<ge.m&&["mm",f]||1===g&&["h"]||g<ge.h&&["hh",g]||1===h&&["d"]||h<ge.d&&["dd",h]||1===i&&["M"]||i<ge.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,yc.apply(null,k)}function Ac(a,b){return void 0===ge[a]?!1:void 0===b?ge[a]:(ge[a]=b,!0)}function Bc(a){var b=this.localeData(),c=zc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Cc(){var a=he(this.years()),b=he(this.months()),c=he(this.days()),d=he(this.hours()),e=he(this.minutes()),f=he(this.seconds()+this.milliseconds()/1e3),g=this.asSeconds();return g?(0>g?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}var Dc,Ec,Fc=a.momentProperties=[],Gc=!1,Hc={},Ic={},Jc=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Kc=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Lc={},Mc={},Nc=/\d/,Oc=/\d\d/,Pc=/\d{3}/,Qc=/\d{4}/,Rc=/[+-]?\d{6}/,Sc=/\d\d?/,Tc=/\d{1,3}/,Uc=/\d{1,4}/,Vc=/[+-]?\d{1,6}/,Wc=/\d+/,Xc=/[+-]?\d+/,Yc=/Z|[+-]\d\d:?\d\d/gi,Zc=/[+-]?\d+(\.\d{1,3})?/,$c=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,_c={},ad={},bd=0,cd=1,dd=2,ed=3,fd=4,gd=5,hd=6;G("M",["MM",2],"Mo",function(){return this.month()+1}),G("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),G("MMMM",0,0,function(a){return this.localeData().months(this,a)}),y("month","M"),L("M",Sc),L("MM",Sc,Oc),L("MMM",$c),L("MMMM",$c),O(["M","MM"],function(a,b){b[cd]=p(a)-1}),O(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[cd]=e:j(c).invalidMonth=a});var id="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),jd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),kd={};a.suppressDeprecationWarnings=!1;var ld=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,md=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],nd=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],od=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=$("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),G(0,["YY",2],0,function(){return this.year()%100}),G(0,["YYYY",4],0,"year"),G(0,["YYYYY",5],0,"year"),G(0,["YYYYYY",6,!0],0,"year"),y("year","y"),L("Y",Xc),L("YY",Sc,Oc),L("YYYY",Uc,Qc),L("YYYYY",Vc,Rc),L("YYYYYY",Vc,Rc),O(["YYYY","YYYYY","YYYYYY"],bd),O("YY",function(b,c){c[bd]=a.parseTwoDigitYear(b)}),a.parseTwoDigitYear=function(a){return p(a)+(p(a)>68?1900:2e3)};var pd=B("FullYear",!1);G("w",["ww",2],"wo","week"),G("W",["WW",2],"Wo","isoWeek"),y("week","w"),y("isoWeek","W"),L("w",Sc),L("ww",Sc,Oc),L("W",Sc),L("WW",Sc,Oc),P(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=p(a)});var qd={dow:0,doy:6};G("DDD",["DDDD",3],"DDDo","dayOfYear"),y("dayOfYear","DDD"),L("DDD",Tc),L("DDDD",Pc),O(["DDD","DDDD"],function(a,b,c){c._dayOfYear=p(a)}),a.ISO_8601=function(){};var rd=$("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return this>a?this:a}),sd=$("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return a>this?this:a});Ga("Z",":"),Ga("ZZ",""),L("Z",Yc),L("ZZ",Yc),O(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ha(a)});var td=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var ud=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,vd=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Va.fn=Ea.prototype;var wd=Za(1,"add"),xd=Za(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var yd=$("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});G(0,["gg",2],0,function(){return this.weekYear()%100}),G(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ab("gggg","weekYear"),Ab("ggggg","weekYear"),Ab("GGGG","isoWeekYear"),Ab("GGGGG","isoWeekYear"),y("weekYear","gg"),y("isoWeekYear","GG"),L("G",Xc),L("g",Xc),L("GG",Sc,Oc),L("gg",Sc,Oc),L("GGGG",Uc,Qc),L("gggg",Uc,Qc),L("GGGGG",Vc,Rc),L("ggggg",Vc,Rc),P(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=p(a)}),P(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),G("Q",0,0,"quarter"),y("quarter","Q"),L("Q",Nc),O("Q",function(a,b){b[cd]=3*(p(a)-1)}),G("D",["DD",2],"Do","date"),y("date","D"),L("D",Sc),L("DD",Sc,Oc),L("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),O(["D","DD"],dd),O("Do",function(a,b){b[dd]=p(a.match(Sc)[0],10)});var zd=B("Date",!0);G("d",0,"do","day"),G("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),G("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),G("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),G("e",0,0,"weekday"),G("E",0,0,"isoWeekday"),y("day","d"),y("weekday","e"),y("isoWeekday","E"),L("d",Sc),L("e",Sc),L("E",Sc),L("dd",$c),L("ddd",$c),L("dddd",$c),P(["dd","ddd","dddd"],function(a,b,c){var d=c._locale.weekdaysParse(a);null!=d?b.d=d:j(c).invalidWeekday=a}),P(["d","e","E"],function(a,b,c,d){b[d]=p(a)});var Ad="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Bd="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Cd="Su_Mo_Tu_We_Th_Fr_Sa".split("_");G("H",["HH",2],0,"hour"),G("h",["hh",2],0,function(){return this.hours()%12||12}),Pb("a",!0),Pb("A",!1),y("hour","h"),L("a",Qb),L("A",Qb),L("H",Sc),L("h",Sc),L("HH",Sc,Oc),L("hh",Sc,Oc),O(["H","HH"],ed),O(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),O(["h","hh"],function(a,b,c){b[ed]=p(a),j(c).bigHour=!0});var Dd=/[ap]\.?m?\.?/i,Ed=B("Hours",!0);G("m",["mm",2],0,"minute"),y("minute","m"),L("m",Sc),L("mm",Sc,Oc),O(["m","mm"],fd);var Fd=B("Minutes",!1);G("s",["ss",2],0,"second"),y("second","s"),L("s",Sc),L("ss",Sc,Oc),O(["s","ss"],gd);var Gd=B("Seconds",!1);G("S",0,0,function(){return~~(this.millisecond()/100)}),G(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),Tb("SSS"),Tb("SSSS"),y("millisecond","ms"),L("S",Tc,Nc),L("SS",Tc,Oc),L("SSS",Tc,Pc),L("SSSS",Wc),O(["S","SS","SSS","SSSS"],function(a,b){b[hd]=p(1e3*("0."+a))});var Hd=B("Milliseconds",!1);G("z",0,0,"zoneAbbr"),G("zz",0,0,"zoneName");var Id=n.prototype;Id.add=wd,Id.calendar=_a,Id.clone=ab,Id.diff=gb,Id.endOf=sb,Id.format=kb,Id.from=lb,Id.fromNow=mb,Id.to=nb,Id.toNow=ob,Id.get=E,Id.invalidAt=zb,Id.isAfter=bb,Id.isBefore=cb,Id.isBetween=db,Id.isSame=eb,Id.isValid=xb,Id.lang=yd,Id.locale=pb,Id.localeData=qb,Id.max=sd,Id.min=rd,Id.parsingFlags=yb,Id.set=E,Id.startOf=rb,Id.subtract=xd,Id.toArray=wb,Id.toDate=vb,Id.toISOString=jb,Id.toJSON=jb,Id.toString=ib,Id.unix=ub,Id.valueOf=tb,Id.year=pd,Id.isLeapYear=ga,Id.weekYear=Cb,Id.isoWeekYear=Db,Id.quarter=Id.quarters=Gb,Id.month=W,Id.daysInMonth=X,Id.week=Id.weeks=la,Id.isoWeek=Id.isoWeeks=ma,Id.weeksInYear=Fb,Id.isoWeeksInYear=Eb,Id.date=zd,Id.day=Id.days=Mb,Id.weekday=Nb,Id.isoWeekday=Ob,Id.dayOfYear=oa,Id.hour=Id.hours=Ed,Id.minute=Id.minutes=Fd,Id.second=Id.seconds=Gd,Id.millisecond=Id.milliseconds=Hd,Id.utcOffset=Ka,Id.utc=Ma,Id.local=Na,Id.parseZone=Oa,Id.hasAlignedHourOffset=Pa,Id.isDST=Qa,Id.isDSTShifted=Ra,Id.isLocal=Sa,Id.isUtcOffset=Ta,Id.isUtc=Ua,Id.isUTC=Ua,Id.zoneAbbr=Ub,Id.zoneName=Vb,Id.dates=$("dates accessor is deprecated. Use date instead.",zd),Id.months=$("months accessor is deprecated. Use month instead",W),Id.years=$("years accessor is deprecated. Use year instead",pd),Id.zone=$("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",La);var Jd=Id,Kd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Ld={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},Md="Invalid date",Nd="%d",Od=/\d{1,2}/,Pd={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",
hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Qd=r.prototype;Qd._calendar=Kd,Qd.calendar=Yb,Qd._longDateFormat=Ld,Qd.longDateFormat=Zb,Qd._invalidDate=Md,Qd.invalidDate=$b,Qd._ordinal=Nd,Qd.ordinal=_b,Qd._ordinalParse=Od,Qd.preparse=ac,Qd.postformat=ac,Qd._relativeTime=Pd,Qd.relativeTime=bc,Qd.pastFuture=cc,Qd.set=dc,Qd.months=S,Qd._months=id,Qd.monthsShort=T,Qd._monthsShort=jd,Qd.monthsParse=U,Qd.week=ia,Qd._week=qd,Qd.firstDayOfYear=ka,Qd.firstDayOfWeek=ja,Qd.weekdays=Ib,Qd._weekdays=Ad,Qd.weekdaysMin=Kb,Qd._weekdaysMin=Cd,Qd.weekdaysShort=Jb,Qd._weekdaysShort=Bd,Qd.weekdaysParse=Lb,Qd.isPM=Rb,Qd._meridiemParse=Dd,Qd.meridiem=Sb,v("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===p(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=$("moment.lang is deprecated. Use moment.locale instead.",v),a.langData=$("moment.langData is deprecated. Use moment.localeData instead.",x);var Rd=Math.abs,Sd=uc("ms"),Td=uc("s"),Ud=uc("m"),Vd=uc("h"),Wd=uc("d"),Xd=uc("w"),Yd=uc("M"),Zd=uc("y"),$d=wc("milliseconds"),_d=wc("seconds"),ae=wc("minutes"),be=wc("hours"),ce=wc("days"),de=wc("months"),ee=wc("years"),fe=Math.round,ge={s:45,m:45,h:22,d:26,M:11},he=Math.abs,ie=Ea.prototype;ie.abs=lc,ie.add=nc,ie.subtract=oc,ie.as=sc,ie.asMilliseconds=Sd,ie.asSeconds=Td,ie.asMinutes=Ud,ie.asHours=Vd,ie.asDays=Wd,ie.asWeeks=Xd,ie.asMonths=Yd,ie.asYears=Zd,ie.valueOf=tc,ie._bubble=pc,ie.get=vc,ie.milliseconds=$d,ie.seconds=_d,ie.minutes=ae,ie.hours=be,ie.days=ce,ie.weeks=xc,ie.months=de,ie.years=ee,ie.humanize=Bc,ie.toISOString=Cc,ie.toString=Cc,ie.toJSON=Cc,ie.locale=pb,ie.localeData=qb,ie.toIsoString=$("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Cc),ie.lang=yd,G("X",0,0,"unix"),G("x",0,0,"valueOf"),L("x",Xc),L("X",Zc),O("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),O("x",function(a,b,c){c._d=new Date(p(a))}),a.version="2.10.3",b(Aa),a.fn=Jd,a.min=Ca,a.max=Da,a.utc=h,a.unix=Wb,a.months=gc,a.isDate=d,a.locale=v,a.invalid=l,a.duration=Va,a.isMoment=o,a.weekdays=ic,a.parseZone=Xb,a.localeData=x,a.isDuration=Fa,a.monthsShort=hc,a.weekdaysMin=kc,a.defineLocale=w,a.weekdaysShort=jc,a.normalizeUnits=z,a.relativeTimeThreshold=Ac;var je=a;return je});
;

/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.CSSAnimate.min.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site:   http://pupunzi.com
 *  blog: http://pupunzi.open-lab.com
 *  http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 26/03/14 21.40
 *  *****************************************************************************
 */

function uncamel(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function setUnit(a,b){return"string"!=typeof a||a.match(/^[\-0-9\.]+jQuery/)?""+a+b:a}function setFilter(a,b,c){var d=uncamel(b),e=jQuery.browser.mozilla?"":jQuery.CSS.sfx;a[e+"filter"]=a[e+"filter"]||"",c=setUnit(c>jQuery.CSS.filters[b].max?jQuery.CSS.filters[b].max:c,jQuery.CSS.filters[b].unit),a[e+"filter"]+=d+"("+c+") ",delete a[b]}jQuery.support.CSStransition=function(){var a=document.body||document.documentElement,b=a.style;return void 0!==b.transition||void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.MsTransition||void 0!==b.OTransition}(),jQuery.CSS={name:"mb.CSSAnimate",author:"Matteo Bicocchi",version:"2.0.0",transitionEnd:"transitionEnd",sfx:"",filters:{blur:{min:0,max:100,unit:"px"},brightness:{min:0,max:400,unit:"%"},contrast:{min:0,max:400,unit:"%"},grayscale:{min:0,max:100,unit:"%"},hueRotate:{min:0,max:360,unit:"deg"},invert:{min:0,max:100,unit:"%"},saturate:{min:0,max:400,unit:"%"},sepia:{min:0,max:100,unit:"%"}},normalizeCss:function(a){var b=jQuery.extend(!0,{},a);jQuery.browser.webkit||jQuery.browser.opera?jQuery.CSS.sfx="-webkit-":jQuery.browser.mozilla?jQuery.CSS.sfx="-moz-":jQuery.browser.msie&&(jQuery.CSS.sfx="-ms-");for(var c in b){"transform"===c&&(b[jQuery.CSS.sfx+"transform"]=b[c],delete b[c]),"transform-origin"===c&&(b[jQuery.CSS.sfx+"transform-origin"]=a[c],delete b[c]),"filter"!==c||jQuery.browser.mozilla||(b[jQuery.CSS.sfx+"filter"]=a[c],delete b[c]),"blur"===c&&setFilter(b,"blur",a[c]),"brightness"===c&&setFilter(b,"brightness",a[c]),"contrast"===c&&setFilter(b,"contrast",a[c]),"grayscale"===c&&setFilter(b,"grayscale",a[c]),"hueRotate"===c&&setFilter(b,"hueRotate",a[c]),"invert"===c&&setFilter(b,"invert",a[c]),"saturate"===c&&setFilter(b,"saturate",a[c]),"sepia"===c&&setFilter(b,"sepia",a[c]);var d="";"x"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" translateX("+setUnit(a[c],"px")+")",delete b[c]),"y"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" translateY("+setUnit(a[c],"px")+")",delete b[c]),"z"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" translateZ("+setUnit(a[c],"px")+")",delete b[c]),"rotate"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotate("+setUnit(a[c],"deg")+")",delete b[c]),"rotateX"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotateX("+setUnit(a[c],"deg")+")",delete b[c]),"rotateY"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotateY("+setUnit(a[c],"deg")+")",delete b[c]),"rotateZ"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotateZ("+setUnit(a[c],"deg")+")",delete b[c]),"scale"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scale("+setUnit(a[c],"")+")",delete b[c]),"scaleX"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scaleX("+setUnit(a[c],"")+")",delete b[c]),"scaleY"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scaleY("+setUnit(a[c],"")+")",delete b[c]),"scaleZ"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scaleZ("+setUnit(a[c],"")+")",delete b[c]),"skew"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" skew("+setUnit(a[c],"deg")+")",delete b[c]),"skewX"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" skewX("+setUnit(a[c],"deg")+")",delete b[c]),"skewY"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" skewY("+setUnit(a[c],"deg")+")",delete b[c]),"perspective"===c&&(d=jQuery.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" perspective("+setUnit(a[c],"px")+")",delete b[c])}return b},getProp:function(a){var b=[];for(var c in a)b.indexOf(c)<0&&b.push(uncamel(c));return b.join(",")},animate:function(a,b,c,d,e){return this.each(function(){function o(){f.called=!0,f.CSSAIsRunning=!1,g.off(jQuery.CSS.transitionEnd+"."+f.id),clearTimeout(f.timeout),g.css(jQuery.CSS.sfx+"transition",""),"function"==typeof e&&e.apply(f),"function"==typeof f.CSSqueue&&(f.CSSqueue(),f.CSSqueue=null)}var f=this,g=jQuery(this);f.id=f.id||"CSSA_"+(new Date).getTime();var h=h||{type:"noEvent"};if(f.CSSAIsRunning&&f.eventType==h.type&&!jQuery.browser.msie&&jQuery.browser.version<=9)return f.CSSqueue=function(){g.CSSAnimate(a,b,c,d,e)},void 0;if(f.CSSqueue=null,f.eventType=h.type,0!==g.length&&a){if(a=jQuery.normalizeCss(a),f.CSSAIsRunning=!0,"function"==typeof b&&(e=b,b=jQuery.fx.speeds._default),"function"==typeof c&&(d=c,c=0),"string"==typeof c&&(e=c,c=0),"function"==typeof d&&(e=d,d="cubic-bezier(0.65,0.03,0.36,0.72)"),"string"==typeof b)for(var i in jQuery.fx.speeds){if(b==i){b=jQuery.fx.speeds[i];break}b=jQuery.fx.speeds._default}if(b||(b=jQuery.fx.speeds._default),"string"==typeof e&&(d=e,e=null),!jQuery.support.CSStransition){for(var j in a){if("transform"===j&&delete a[j],"filter"===j&&delete a[j],"transform-origin"===j&&delete a[j],"auto"===a[j]&&delete a[j],"x"===j){var k=a[j],l="left";a[l]=k,delete a[j]}if("y"===j){var k=a[j],l="top";a[l]=k,delete a[j]}("-ms-transform"===j||"-ms-filter"===j)&&delete a[j]}return g.delay(c).animate(a,b,e),void 0}var m={"default":"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};m[d]&&(d=m[d]),g.off(jQuery.CSS.transitionEnd+"."+f.id);var n=jQuery.CSS.getProp(a),p={};jQuery.extend(p,a),p[jQuery.CSS.sfx+"transition-property"]=n,p[jQuery.CSS.sfx+"transition-duration"]=b+"ms",p[jQuery.CSS.sfx+"transition-delay"]=c+"ms",p[jQuery.CSS.sfx+"transition-timing-function"]=d,setTimeout(function(){g.one(jQuery.CSS.transitionEnd+"."+f.id,o),g.css(p)},1),f.timeout=setTimeout(function(){return f.called||!e?(f.called=!1,f.CSSAIsRunning=!1,void 0):(g.css(jQuery.CSS.sfx+"transition",""),e.apply(f),f.CSSAIsRunning=!1,"function"==typeof f.CSSqueue&&(f.CSSqueue(),f.CSSqueue=null),void 0)},b+c+10)}})}},jQuery.fn.CSSAnimate=jQuery.CSS.animate,jQuery.normalizeCss=jQuery.CSS.normalizeCss,jQuery.fn.css3=function(a){return this.each(function(){var b=jQuery(this),c=jQuery.normalizeCss(a);b.css(c)})};

/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.browser.min.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site:   http://pupunzi.com
 *  blog: http://pupunzi.open-lab.com
 *  http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 26/03/14 21.43
 *  *****************************************************************************
 */

var nAgt=navigator.userAgent;if(!jQuery.browser){jQuery.browser={},jQuery.browser.mozilla=!1,jQuery.browser.webkit=!1,jQuery.browser.opera=!1,jQuery.browser.safari=!1,jQuery.browser.chrome=!1,jQuery.browser.msie=!1,jQuery.browser.ua=nAgt,jQuery.browser.name=navigator.appName,jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var nameOffset,verOffset,ix;if(-1!=(verOffset=nAgt.indexOf("Opera")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("OPR")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+4);else if(-1!=(verOffset=nAgt.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")){jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;jQuery.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Chrome"))?(jQuery.browser.webkit=!0,jQuery.browser.chrome=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(jQuery.browser.name=nAgt.substring(nameOffset,verOffset),jQuery.browser.fullVersion=nAgt.substring(verOffset+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName));-1!=(ix=jQuery.browser.fullVersion.indexOf(";"))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix)),-1!=(ix=jQuery.browser.fullVersion.indexOf(" "))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix)),jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10),isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10)),jQuery.browser.version=jQuery.browser.majorVersion}jQuery.browser.android=/Android/i.test(nAgt),jQuery.browser.blackberry=/BlackBerry|BB|PlayBook/i.test(nAgt),jQuery.browser.ios=/iPhone|iPad|iPod|webOS/i.test(nAgt),jQuery.browser.operaMobile=/Opera Mini/i.test(nAgt),jQuery.browser.windowsMobile=/IEMobile|Windows Phone/i.test(nAgt),jQuery.browser.kindle=/Kindle|Silk/i.test(nAgt),jQuery.browser.mobile=jQuery.browser.android||jQuery.browser.blackberry||jQuery.browser.ios||jQuery.browser.windowsMobile||jQuery.browser.operaMobile||jQuery.browser.kindle,jQuery.isMobile=jQuery.browser.mobile,jQuery.isTablet=jQuery.browser.mobile&&jQuery(window).width()>765,jQuery.isAndroidDefault=jQuery.browser.android&&!/chrome/i.test(nAgt);

/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.simpleSlider.min.js                                                                                                              _
 _ last modified: 16/05/15 23.45                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

!function(a){/iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase());var c="ontouchstart"in window||window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture||window.DocumentTouch&&document instanceof DocumentTouch||!1;a.simpleSlider={defaults:{initialval:0,scale:100,orientation:"h",readonly:!1,callback:!1},events:{start:c?"touchstart":"mousedown",end:c?"touchend":"mouseup",move:c?"touchmove":"mousemove"},init:function(b){return this.each(function(){var d=this,e=a(d);e.addClass("simpleSlider"),d.opt={},a.extend(d.opt,a.simpleSlider.defaults,b),a.extend(d.opt,e.data());var f="h"==d.opt.orientation?"horizontal":"vertical",g=a("<div/>").addClass("level").addClass(f);e.prepend(g),d.level=g,e.css({cursor:"default"}),"auto"==d.opt.scale&&(d.opt.scale=a(d).outerWidth()),e.updateSliderVal(),d.opt.readonly||(e.on(a.simpleSlider.events.start,function(a){c&&(a=a.changedTouches[0]),d.canSlide=!0,e.updateSliderVal(a),e.css({cursor:"col-resize"}),a.preventDefault(),a.stopPropagation()}),a(document).on(a.simpleSlider.events.move,function(b){c&&(b=b.changedTouches[0]),d.canSlide&&(a(document).css({cursor:"default"}),e.updateSliderVal(b),b.preventDefault(),b.stopPropagation())}).on(a.simpleSlider.events.end,function(){a(document).css({cursor:"auto"}),d.canSlide=!1,e.css({cursor:"auto"})}))})},updateSliderVal:function(b){function g(a,b){return Math.floor(100*a/b)}var c=this,d=c.get(0);d.opt.initialval="number"==typeof d.opt.initialval?d.opt.initialval:d.opt.initialval(d);var e=a(d).outerWidth(),f=a(d).outerHeight();d.x="object"==typeof b?b.clientX+document.body.scrollLeft-c.offset().left:"number"==typeof b?b*e/d.opt.scale:d.opt.initialval*e/d.opt.scale,d.y="object"==typeof b?b.clientY+document.body.scrollTop-c.offset().top:"number"==typeof b?(d.opt.scale-d.opt.initialval-b)*f/d.opt.scale:d.opt.initialval*f/d.opt.scale,d.y=c.outerHeight()-d.y,d.scaleX=d.x*d.opt.scale/e,d.scaleY=d.y*d.opt.scale/f,d.outOfRangeX=d.scaleX>d.opt.scale?d.scaleX-d.opt.scale:d.scaleX<0?d.scaleX:0,d.outOfRangeY=d.scaleY>d.opt.scale?d.scaleY-d.opt.scale:d.scaleY<0?d.scaleY:0,d.outOfRange="h"==d.opt.orientation?d.outOfRangeX:d.outOfRangeY,d.value="undefined"!=typeof b?"h"==d.opt.orientation?d.x>=c.outerWidth()?d.opt.scale:d.x<=0?0:d.scaleX:d.y>=c.outerHeight()?d.opt.scale:d.y<=0?0:d.scaleY:"h"==d.opt.orientation?d.scaleX:d.scaleY,"h"==d.opt.orientation?d.level.width(g(d.x,e)+"%"):d.level.height(g(d.y,f)),"function"==typeof d.opt.callback&&d.opt.callback(d)}},a.fn.simpleSlider=a.simpleSlider.init,a.fn.updateSliderVal=a.simpleSlider.updateSliderVal}(jQuery);

/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.storage.min.js                                                                                                                   _
 _ last modified: 24/05/15 16.08                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

!function(a){a.mbCookie={set:function(a,b,c,d){b=JSON.stringify(b),c||(c=7),d=d?"; domain="+d:"";var f,e=new Date;e.setTime(e.getTime()+1e3*60*60*24*c),f="; expires="+e.toGMTString(),document.cookie=a+"="+b+f+"; path=/"+d},get:function(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(b))return JSON.parse(e.substring(b.length,e.length))}return null},remove:function(b){a.mbCookie.set(b,"",-1)}},a.mbStorage={set:function(a,b){b=JSON.stringify(b),localStorage.setItem(a,b)},get:function(a){return localStorage[a]?JSON.parse(localStorage[a]):null},remove:function(a){a?localStorage.removeItem(a):localStorage.clear()}}}(jQuery);
/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.YTPlayer.src.js                                                                                                                  _
 _ last modified: 01/07/15 19.35                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/
var ytp = ytp || {};

function onYouTubeIframeAPIReady() {
    if( ytp.YTAPIReady ) return;
    ytp.YTAPIReady = true;
    jQuery( document ).trigger( "YTAPIReady" );
}

var getYTPVideoID = function( url ) {
    var videoID, playlistID;
    if( url.indexOf( "youtu.be" ) > 0 ) {
        videoID = url.substr( url.lastIndexOf( "/" ) + 1, url.length );
        playlistID = videoID.indexOf( "?list=" ) > 0 ? videoID.substr( videoID.lastIndexOf( "=" ), videoID.length ) : null;
        videoID = playlistID ? videoID.substr( 0, videoID.lastIndexOf( "?" ) ) : videoID;
    } else if( url.indexOf( "http" ) > -1 ) {
        videoID = url.match( /[\\?&]v=([^&#]*)/ )[ 1 ];
        playlistID = url.indexOf( "list=" ) > 0 ? url.match( /[\\?&]list=([^&#]*)/ )[ 1 ] : null;
    } else {
        videoID = url.length > 15 ? null : url;
        playlistID = videoID ? null : url;
    }
    return {
        videoID: videoID,
        playlistID: playlistID
    };
};

( function( jQuery, ytp ) {

    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "{{ version }}",
        build: "{{ build }}",
        author: "Matteo Bicocchi",
        apiKey: "",
        defaults: {
            containment: "body",
            ratio: "auto", // "auto", "16/9", "4/3"
            videoURL: null,
            playlistURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: true,
            vol: 50, // 1 to 100
            addRaster: false,
            opacity: 1,
            quality: "default", //or “small”, “medium”, “large”, “hd720”, “hd1080”, “highres”
            mute: false,
            loop: true,
            showControls: true,
            showAnnotations: false,
            showYTLogo: true,
            stopMovieOnBlur: true,
            realfullscreen: true,
            gaTrack: true,
            optimizeDisplay: true,
            onReady: function( player ) {}
        },
        /* @fontface icons */
        controls: {
            play: "P",
            pause: "p",
            mute: "M",
            unmute: "A",
            onlyYT: "O",
            showSite: "R",
            ytLogo: "Y"
        },
        locationProtocol: "https:",
        /**
         *
         * @param options
         * @returns [players]
         */
        buildPlayer: function( options ) {
            return this.each( function() {
                var YTPlayer = this;
                var $YTPlayer = jQuery( YTPlayer );
                YTPlayer.loop = 0;
                YTPlayer.opt = {};
                YTPlayer.state = {};
                YTPlayer.filtersEnabled = true;
                YTPlayer.filters = {
                    grayscale: {
                        value: 0,
                        unit: "%"
                    },
                    hue_rotate: {
                        value: 0,
                        unit: "deg"
                    },
                    invert: {
                        value: 0,
                        unit: "%"
                    },
                    opacity: {
                        value: 0,
                        unit: "%"
                    },
                    saturate: {
                        value: 0,
                        unit: "%"
                    },
                    sepia: {
                        value: 0,
                        unit: "%"
                    },
                    brightness: {
                        value: 0,
                        unit: "%"
                    },
                    contrast: {
                        value: 0,
                        unit: "%"
                    },
                    blur: {
                        value: 0,
                        unit: "px"
                    }
                };
                $YTPlayer.addClass( "mb_YTPlayer" );
                var property = $YTPlayer.data( "property" ) && typeof $YTPlayer.data( "property" ) == "string" ? eval( '(' + $YTPlayer.data( "property" ) + ')' ) : $YTPlayer.data( "property" );
                if( typeof property != "undefined" && typeof property.vol != "undefined" ) property.vol = property.vol === 0 ? property.vol = 1 : property.vol;
                jQuery.extend( YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property );
                if( !YTPlayer.hasChanged ) {
                    YTPlayer.defaultOpt = {};
                    jQuery.extend( YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options, property );
                }
                YTPlayer.isRetina = ( window.retina || window.devicePixelRatio > 1 );
                var isIframe = function() {
                    var isIfr = false;
                    try {
                        if( self.location.href != top.location.href ) isIfr = true;
                    } catch( e ) {
                        isIfr = true;
                    }
                    return isIfr;
                };
                YTPlayer.canGoFullScreen = !( jQuery.browser.msie || jQuery.browser.opera || isIframe() );
                if( !YTPlayer.canGoFullScreen ) YTPlayer.opt.realfullscreen = false;
                if( !$YTPlayer.attr( "id" ) ) $YTPlayer.attr( "id", "video_" + new Date().getTime() );
                var playerID = "mbYTP_" + YTPlayer.id;
                YTPlayer.isAlone = false;
                YTPlayer.hasFocus = true;
                var videoID = this.opt.videoURL ? getYTPVideoID( this.opt.videoURL ).videoID : $YTPlayer.attr( "href" ) ? getYTPVideoID( $YTPlayer.attr( "href" ) ).videoID : false;
                var playlistID = this.opt.videoURL ? getYTPVideoID( this.opt.videoURL ).playlistID : $YTPlayer.attr( "href" ) ? getYTPVideoID( $YTPlayer.attr( "href" ) ).playlistID : false;
                YTPlayer.videoID = videoID;
                YTPlayer.playlistID = playlistID;
                YTPlayer.opt.showAnnotations = ( YTPlayer.opt.showAnnotations ) ? '0' : '3';
                var playerVars = {
                    'autoplay': 0,
                    'modestbranding': 1,
                    'controls': 0,
                    'showinfo': 0,
                    'rel': 0,
                    'enablejsapi': 1,
                    'version': 3,
                    'playerapiid': playerID,
                    'origin': '*',
                    'allowfullscreen': true,
                    'wmode': 'transparent',
                    'iv_load_policy': YTPlayer.opt.showAnnotations
                };
                if( document.createElement( 'video' ).canPlayType ) jQuery.extend( playerVars, {
                    'html5': 1
                } );
                if( jQuery.browser.msie && jQuery.browser.version < 9 ) this.opt.opacity = 1;
                var playerBox = jQuery( "<div/>" ).attr( "id", playerID ).addClass( "playerBox" );
                var overlay = jQuery( "<div/>" ).css( {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                } ).addClass( "YTPOverlay" );
                YTPlayer.isSelf = YTPlayer.opt.containment == "self";
                YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = YTPlayer.opt.containment == "self" ? jQuery( this ) : jQuery( YTPlayer.opt.containment );
                YTPlayer.isBackground = YTPlayer.opt.containment.get( 0 ).tagName.toLowerCase() == "body";
                if( YTPlayer.isBackground && ytp.backgroundIsInited ) return;
                var isPlayer = YTPlayer.opt.containment.is( jQuery( this ) );
                YTPlayer.canPlayOnMobile = isPlayer && jQuery( this ).children().length === 0;
                if( !isPlayer ) {
                    $YTPlayer.hide();
                } else {
                    YTPlayer.isPlayer = true;
                }
                if( jQuery.browser.mobile && !YTPlayer.canPlayOnMobile ) {
                    $YTPlayer.remove();
                    return;
                }
                var wrapper = jQuery( "<div/>" ).addClass( "mbYTP_wrapper" ).attr( "id", "wrapper_" + playerID );
                wrapper.css( {
                    position: "absolute",
                    zIndex: 0,
                    minWidth: "100%",
                    minHeight: "100%",
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    opacity: 0
                } );
                playerBox.css( {
                    position: "absolute",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    overflow: "hidden"
                } );
                wrapper.append( playerBox );
                YTPlayer.opt.containment.children().not( "script, style" ).each( function() {
                    if( jQuery( this ).css( "position" ) == "static" ) jQuery( this ).css( "position", "relative" );
                } );
                if( YTPlayer.isBackground ) {
                    jQuery( "body" ).css( {
                        boxSizing: "border-box"
                    } );
                    wrapper.css( {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 0
                    } );
                    $YTPlayer.hide();
                } else if( YTPlayer.opt.containment.css( "position" ) == "static" ) YTPlayer.opt.containment.css( {
                    position: "relative"
                } );
                YTPlayer.opt.containment.prepend( wrapper );
                YTPlayer.wrapper = wrapper;
                playerBox.css( {
                    opacity: 1
                } );
                if( !jQuery.browser.mobile ) {
                    playerBox.after( overlay );
                    YTPlayer.overlay = overlay;
                }
                if( !YTPlayer.isBackground ) {
                    overlay.on( "mouseenter", function() {
                        if( YTPlayer.controlBar ) YTPlayer.controlBar.addClass( "visible" );
                    } ).on( "mouseleave", function() {
                        if( YTPlayer.controlBar ) YTPlayer.controlBar.removeClass( "visible" );
                    } )
                }
                if( !ytp.YTAPIReady ) {
                    jQuery( "#YTAPI" ).remove();
                    var tag = jQuery( "<script></script>" ).attr( {
                        "src": jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                        "id": "YTAPI"
                    } );
                    jQuery( "head" ).prepend( tag );
                } else {
                    setTimeout( function() {
                        jQuery( document ).trigger( "YTAPIReady" );
                    }, 100 )
                }
                jQuery( document ).on( "YTAPIReady", function() {
                    if( ( YTPlayer.isBackground && ytp.backgroundIsInited ) || YTPlayer.isInit ) return;
                    if( YTPlayer.isBackground ) {
                        ytp.backgroundIsInited = true;
                    }
                    YTPlayer.opt.autoPlay = typeof YTPlayer.opt.autoPlay == "undefined" ? ( YTPlayer.isBackground ? true : false ) : YTPlayer.opt.autoPlay;
                    YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100;
                    jQuery.mbYTPlayer.getDataFromAPI( YTPlayer );
                    jQuery( YTPlayer ).on( "YTPChanged", function() {
                        if( YTPlayer.isInit ) return;
                        YTPlayer.isInit = true;
                        //if is mobile && isPlayer fallback to the default YT player
                        if( jQuery.browser.mobile && YTPlayer.canPlayOnMobile ) {
                            // Try to adjust the player dimention
                            if( YTPlayer.opt.containment.outerWidth() > jQuery( window ).width() ) {
                                YTPlayer.opt.containment.css( {
                                    maxWidth: "100%"
                                } );
                                var h = YTPlayer.opt.containment.outerWidth() * .6;
                                YTPlayer.opt.containment.css( {
                                    maxHeight: h
                                } );
                            }
                            new YT.Player( playerID, {
                                videoId: YTPlayer.videoID.toString(),
                                height: '100%',
                                width: '100%',
                                events: {
                                    'onReady': function( event ) {
                                        YTPlayer.player = event.target;
                                        playerBox.css( {
                                            opacity: 1
                                        } );
                                        YTPlayer.wrapper.css( {
                                            opacity: 1
                                        } );
                                    }
                                }
                            } );
                            return;
                        }
                        new YT.Player( playerID, {
                            videoId: YTPlayer.videoID.toString(),
                            playerVars: playerVars,
                            events: {
                                'onReady': function( event ) {
                                    YTPlayer.player = event.target;
                                    if( YTPlayer.isReady ) return;
                                    YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? false : true;
                                    YTPlayer.playerEl = YTPlayer.player.getIframe();
                                    $YTPlayer.optimizeDisplay();
                                    YTPlayer.videoID = videoID;
                                    jQuery( window ).on( "resize.YTP", function() {
                                        $YTPlayer.optimizeDisplay();
                                    } );
                                    jQuery.mbYTPlayer.checkForState( YTPlayer );
                                    // Trigger state events
                                    var YTPEvent = jQuery.Event( "YTPUnstarted" );
                                    YTPEvent.time = YTPlayer.player.time;
                                    if( YTPlayer.canTrigger ) jQuery( YTPlayer ).trigger( YTPEvent );
                                },
                                /**
                                 *
                                 * @param event
                                 *
                                 * -1 (unstarted)
                                 * 0 (ended)
                                 * 1 (playing)
                                 * 2 (paused)
                                 * 3 (buffering)
                                 * 5 (video cued).
                                 *
                                 *
                                 */
                                'onStateChange': function( event ) {
                                    if( typeof event.target.getPlayerState != "function" ) return;
                                    var state = event.target.getPlayerState();
                                    if( YTPlayer.state == state ) return;
                                    YTPlayer.state = state;
                                    var eventType;
                                    switch( state ) {
                                        case -1: //------------------------------------------------ unstarted
                                            eventType = "YTPUnstarted";
                                            break;
                                        case 0: //------------------------------------------------ ended
                                            eventType = "YTPEnd";
                                            break;
                                        case 1: //------------------------------------------------ play
                                            eventType = "YTPStart";
                                            if( YTPlayer.controlBar ) YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( jQuery.mbYTPlayer.controls.pause );
                                            if( typeof _gaq != "undefined" && eval( YTPlayer.opt.gaTrack ) ) _gaq.push( [ '_trackEvent', 'YTPlayer', 'Play', ( YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString() ) ] );
                                            if( typeof ga != "undefined" && eval( YTPlayer.opt.gaTrack ) ) ga( 'send', 'event', 'YTPlayer', 'play', ( YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString() ) );
                                            break;
                                        case 2: //------------------------------------------------ pause
                                            eventType = "YTPPause";
                                            if( YTPlayer.controlBar ) YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( jQuery.mbYTPlayer.controls.play );
                                            break;
                                        case 3: //------------------------------------------------ buffer
                                            YTPlayer.player.setPlaybackQuality( YTPlayer.opt.quality );
                                            eventType = "YTPBuffering";
                                            if( YTPlayer.controlBar ) YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( jQuery.mbYTPlayer.controls.play );
                                            break;
                                        case 5: //------------------------------------------------ cued
                                            eventType = "YTPCued";
                                            break;
                                        default:
                                            break;
                                    }
                                    // Trigger state events
                                    var YTPEvent = jQuery.Event( eventType );
                                    YTPEvent.time = YTPlayer.player.time;
                                    if( YTPlayer.canTrigger ) jQuery( YTPlayer ).trigger( YTPEvent );
                                },
                                /**
                                 *
                                 * @param e
                                 */
                                'onPlaybackQualityChange': function( e ) {
                                    var quality = e.target.getPlaybackQuality();
                                    var YTPQualityChange = jQuery.Event( "YTPQualityChange" );
                                    YTPQualityChange.quality = quality;
                                    jQuery( YTPlayer ).trigger( YTPQualityChange );
                                },
                                /**
                                 *
                                 * @param err
                                 */
                                'onError': function( err ) {
                                    if( err.data == 150 ) {
                                        console.log( "Embedding this video is restricted by Youtube." );
                                        if( YTPlayer.isPlayList ) jQuery( YTPlayer ).playNext();
                                    }
                                    if( err.data == 2 && YTPlayer.isPlayList ) jQuery( YTPlayer ).playNext();
                                    if( typeof YTPlayer.opt.onError == "function" ) YTPlayer.opt.onError( $YTPlayer, err );
                                }
                            }
                        } );
                    } );
                } )
            } );
        },
        /**
         *
         * @param YTPlayer
         */
        getDataFromAPI: function( YTPlayer ) {
            YTPlayer.videoData = jQuery.mbStorage.get( "YYTPlayer_data_" + YTPlayer.videoID );
            jQuery( YTPlayer ).off( "YTPData.YTPlayer" ).on( "YTPData.YTPlayer", function() {
                if( YTPlayer.hasData ) {

                    if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
                        var bgndURL = YTPlayer.videoData.thumb_max || YTPlayer.videoData.thumb_high || YTPlayer.videoData.thumb_medium;
                        YTPlayer.opt.containment.css( {
                            background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center",
                            backgroundSize: "cover"
                        } );
                        YTPlayer.opt.backgroundUrl = bgndURL;
                    }
                }
            } );

            if( YTPlayer.videoData ) {

                setTimeout( function() {
                    YTPlayer.opt.ratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
                    YTPlayer.dataReceived = true;
                    jQuery( YTPlayer ).trigger( "YTPChanged" );
                    var YTPData = jQuery.Event( "YTPData" );
                    YTPData.prop = {};
                    for( var x in YTPlayer.videoData ) YTPData.prop[ x ] = YTPlayer.videoData[ x ];
                    jQuery( YTPlayer ).trigger( YTPData );
                }, 500 );

                YTPlayer.hasData = true;
            } else if( jQuery.mbYTPlayer.apiKey ) {
                // Get video info from API3 (needs api key)
                // snippet,player,contentDetails,statistics,status
                jQuery.getJSON( jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + YTPlayer.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function( data ) {
                    YTPlayer.dataReceived = true;
                    jQuery( YTPlayer ).trigger( "YTPChanged" );

                    function parseYTPlayer_data( data ) {
                        YTPlayer.videoData = {};
                        YTPlayer.videoData.id = YTPlayer.videoID;
                        YTPlayer.videoData.channelTitle = data.channelTitle;
                        YTPlayer.videoData.title = data.title;
                        YTPlayer.videoData.description = data.description.length < 400 ? data.description : data.description.substring( 0, 400 ) + " ...";
                        YTPlayer.videoData.aspectratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
                        YTPlayer.opt.ratio = YTPlayer.videoData.aspectratio;
                        YTPlayer.videoData.thumb_max = data.thumbnails.maxres ? data.thumbnails.maxres.url : null;
                        YTPlayer.videoData.thumb_high = data.thumbnails.high ? data.thumbnails.high.url : null;
                        YTPlayer.videoData.thumb_medium = data.thumbnails.medium ? data.thumbnails.medium.url : null;
                        jQuery.mbStorage.set( "YYTPlayer_data_" + YTPlayer.videoID, YTPlayer.videoData );
                    }
                    parseYTPlayer_data( data.items[ 0 ].snippet );
                    YTPlayer.hasData = true;
                    var YTPData = jQuery.Event( "YTPData" );
                    YTPData.prop = {};
                    for( var x in YTPlayer.videoData ) YTPData.prop[ x ] = YTPlayer.videoData[ x ];
                    jQuery( YTPlayer ).trigger( YTPData );
                } );
            } else {
                setTimeout( function() {
                    jQuery( YTPlayer ).trigger( "YTPChanged" );
                }, 50 );
                if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
                    var bgndURL = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + YTPlayer.videoID + "/hqdefault.jpg";
                    YTPlayer.opt.containment.css( {
                        background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center",
                        backgroundSize: "cover"
                    } );
                    YTPlayer.opt.backgroundUrl = bgndURL;
                }
                YTPlayer.videoData = null;
                YTPlayer.opt.ratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
            }
            if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
                YTPlayer.loading = jQuery( "<div/>" ).addClass( "loading" ).html( "Loading" ).hide();
                jQuery( YTPlayer ).append( YTPlayer.loading );
                YTPlayer.loading.fadeIn();
            }
        },
        /**
         *
         */
        removeStoredData: function() {
            jQuery.mbStorage.remove();
        },
        /**
         *
         * @returns {*|YTPlayer.videoData}
         */
        getVideoData: function() {
            var YTPlayer = this.get( 0 );
            return YTPlayer.videoData;
        },
        /**
         *
         * @returns {*|YTPlayer.videoID|boolean}
         */
        getVideoID: function() {
            var YTPlayer = this.get( 0 );
            return YTPlayer.videoID || false;
        },
        /**
         *
         * @param quality
         */
        setVideoQuality: function( quality ) {
            var YTPlayer = this.get( 0 );
            if( !jQuery.browser.chrome ) YTPlayer.player.setPlaybackQuality( quality );
        },
        /**
         * @param videos
         * @param shuffle
         * @param callback
         * @returns {jQuery.mbYTPlayer}
         */
        playlist: function( videos, shuffle, callback ) {
            var $YTPlayer = this;
            var YTPlayer = $YTPlayer.get( 0 );
            YTPlayer.isPlayList = true;
            if( shuffle ) videos = jQuery.shuffle( videos );
            if( !YTPlayer.videoID ) {
                YTPlayer.videos = videos;
                YTPlayer.videoCounter = 0;
                YTPlayer.videoLength = videos.length;
                jQuery( YTPlayer ).data( "property", videos[ 0 ] );
                jQuery( YTPlayer ).mb_YTPlayer();
            }
            if( typeof callback == "function" ) jQuery( YTPlayer ).on( "YTPChanged", function() {
                callback( YTPlayer );
            } );
            jQuery( YTPlayer ).on( "YTPEnd", function() {
                jQuery( YTPlayer ).playNext();
            } );
            return $YTPlayer;
        },
        /**
         *
         * @returns {jQuery.mbYTPlayer}
         */
        playNext: function() {
            var YTPlayer = this.get( 0 );
            YTPlayer.videoCounter++;
            if( YTPlayer.videoCounter >= YTPlayer.videoLength ) YTPlayer.videoCounter = 0;
            jQuery( YTPlayer ).changeMovie( YTPlayer.videos[ YTPlayer.videoCounter ] );
            return this;
        },
        /**
         *
         * @returns {jQuery.mbYTPlayer}
         */
        playPrev: function() {
            var YTPlayer = this.get( 0 );
            YTPlayer.videoCounter--;
            if( YTPlayer.videoCounter < 0 ) YTPlayer.videoCounter = YTPlayer.videoLength - 1;
            jQuery( YTPlayer ).changeMovie( YTPlayer.videos[ YTPlayer.videoCounter ] );
            return this;
        },
        /**
         *
         * @param opt
         */
        changeMovie: function( opt ) {
            var YTPlayer = this.get( 0 );
            YTPlayer.opt.startAt = 0;
            YTPlayer.opt.stopAt = 0;
            YTPlayer.opt.mute = true;
            YTPlayer.hasData = false;
            YTPlayer.hasChanged = true;
            if( opt ) jQuery.extend( YTPlayer.opt, YTPlayer.defaultOpt, opt );
            YTPlayer.videoID = getYTPVideoID( YTPlayer.opt.videoURL ).videoID;
            jQuery( YTPlayer.playerEl ).CSSAnimate( {
                opacity: 0
            }, 200, function() {
                jQuery( YTPlayer ).YTPGetPlayer().cueVideoByUrl( encodeURI( jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + YTPlayer.videoID ), 1, YTPlayer.opt.quality );
                jQuery.mbYTPlayer.checkForState( YTPlayer );
                jQuery( YTPlayer ).optimizeDisplay();
                jQuery.mbYTPlayer.getDataFromAPI( YTPlayer );
                return this;
            } );
        },
        /**
         *
         * @returns {player}
         */
        getPlayer: function() {
            return jQuery( this ).get( 0 ).player;
        },
        playerDestroy: function() {
            var YTPlayer = this.get( 0 );
            ytp.YTAPIReady = false;
            ytp.backgroundIsInited = false;
            YTPlayer.isInit = false;
            YTPlayer.videoID = null;
            var playerBox = YTPlayer.wrapper;
            playerBox.remove();
            jQuery( "#controlBar_" + YTPlayer.id ).remove();
            clearInterval( YTPlayer.checkForStartAt );
            clearInterval( YTPlayer.getState );
            return this;
        },
        /**
         *
         * @param real
         * @returns {jQuery.mbYTPlayer}
         */
        fullscreen: function( real ) {
            var YTPlayer = this.get( 0 );
            if( typeof real == "undefined" ) real = YTPlayer.opt.realfullscreen;
            real = eval( real );
            var controls = jQuery( "#controlBar_" + YTPlayer.id );
            var fullScreenBtn = controls.find( ".mb_OnlyYT" );
            var videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            //var videoWrapper = YTPlayer.wrapper;
            if( real ) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery( document ).off( fullscreenchange ).on( fullscreenchange, function() {
                    var isFullScreen = RunPrefixMethod( document, "IsFullScreen" ) || RunPrefixMethod( document, "FullScreen" );
                    if( !isFullScreen ) {
                        YTPlayer.isAlone = false;
                        fullScreenBtn.html( jQuery.mbYTPlayer.controls.onlyYT );
                        jQuery( YTPlayer ).YTPSetVideoQuality( YTPlayer.opt.quality );
                        videoWrapper.removeClass( "fullscreen" );
                        videoWrapper.CSSAnimate( {
                            opacity: YTPlayer.opt.opacity
                        }, 500 );
                        videoWrapper.css( {
                            zIndex: 0
                        } );
                        if( YTPlayer.isBackground ) {
                            jQuery( "body" ).after( controls );
                        } else {
                            YTPlayer.wrapper.before( controls );
                        }
                        jQuery( window ).resize();
                        jQuery( YTPlayer ).trigger( "YTPFullScreenEnd" );
                    } else {
                        jQuery( YTPlayer ).YTPSetVideoQuality( "default" );
                        jQuery( YTPlayer ).trigger( "YTPFullScreenStart" );
                    }
                } );
            }
            if( !YTPlayer.isAlone ) {
                function hideMouse() {
                    YTPlayer.overlay.css( {
                        cursor: "none"
                    } );
                }
                jQuery( document ).on( "mousemove.YTPlayer", function( e ) {
                    YTPlayer.overlay.css( {
                        cursor: "auto"
                    } );
                    clearTimeout( YTPlayer.hideCursor );
                    if( !jQuery( e.target ).parents().is( ".mb_YTPBar" ) ) YTPlayer.hideCursor = setTimeout( hideMouse, 3000 );
                } );
                hideMouse();
                if( real ) {
                    videoWrapper.css( {
                        opacity: 0
                    } );
                    videoWrapper.addClass( "fullscreen" );
                    launchFullscreen( videoWrapper.get( 0 ) );
                    setTimeout( function() {
                        videoWrapper.CSSAnimate( {
                            opacity: 1
                        }, 1000 );
                        YTPlayer.wrapper.append( controls );
                        jQuery( YTPlayer ).optimizeDisplay();
                        YTPlayer.player.seekTo( YTPlayer.player.getCurrentTime() + .1, true );
                    }, 500 )
                } else videoWrapper.css( {
                    zIndex: 10000
                } ).CSSAnimate( {
                    opacity: 1
                }, 1000 );
                fullScreenBtn.html( jQuery.mbYTPlayer.controls.showSite );
                YTPlayer.isAlone = true;
            } else {
                jQuery( document ).off( "mousemove.YTPlayer" );
                YTPlayer.overlay.css( {
                    cursor: "auto"
                } );
                if( real ) {
                    cancelFullscreen();
                } else {
                    videoWrapper.CSSAnimate( {
                        opacity: YTPlayer.opt.opacity
                    }, 500 );
                    videoWrapper.css( {
                        zIndex: 0
                    } );
                }
                fullScreenBtn.html( jQuery.mbYTPlayer.controls.onlyYT );
                YTPlayer.isAlone = false;
            }

            function RunPrefixMethod( obj, method ) {
                var pfx = [ "webkit", "moz", "ms", "o", "" ];
                var p = 0,
                    m, t;
                while( p < pfx.length && !obj[ m ] ) {
                    m = method;
                    if( pfx[ p ] == "" ) {
                        m = m.substr( 0, 1 ).toLowerCase() + m.substr( 1 );
                    }
                    m = pfx[ p ] + m;
                    t = typeof obj[ m ];
                    if( t != "undefined" ) {
                        pfx = [ pfx[ p ] ];
                        return( t == "function" ? obj[ m ]() : obj[ m ] );
                    }
                    p++;
                }
            }

            function launchFullscreen( element ) {
                RunPrefixMethod( element, "RequestFullScreen" );
            }

            function cancelFullscreen() {
                if( RunPrefixMethod( document, "FullScreen" ) || RunPrefixMethod( document, "IsFullScreen" ) ) {
                    RunPrefixMethod( document, "CancelFullScreen" );
                }
            }
            return this;
        },
        /**
         *
         * @returns {jQuery.mbYTPlayer}
         */
        toggleLoops: function() {
            var YTPlayer = this.get( 0 );
            var data = YTPlayer.opt;
            if( data.loop == 1 ) {
                data.loop = 0;
            } else {
                if( data.startAt ) {
                    YTPlayer.player.seekTo( data.startAt );
                } else {
                    YTPlayer.player.playVideo();
                }
                data.loop = 1;
            }
            return this;
        },
        /**
         *
         * @returns {jQuery.mbYTPlayer}
         */
        play: function() {
            var YTPlayer = this.get( 0 );
            if( !YTPlayer.isReady ) return;
            var controls = jQuery( "#controlBar_" + YTPlayer.id );
            var playBtn = controls.find( ".mb_YTPPlaypause" );
            playBtn.html( jQuery.mbYTPlayer.controls.pause );
            YTPlayer.player.playVideo();
            YTPlayer.wrapper.CSSAnimate( {
                opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
            }, 2000 );
            jQuery( YTPlayer.playerEl ).CSSAnimate( {
                opacity: 1
            }, 1000 );
            jQuery( YTPlayer ).css( "background-image", "none" );
            return this;
        },
        /**
         *
         * @param callback
         * @returns {jQuery.mbYTPlayer}
         */
        togglePlay: function( callback ) {
            var YTPlayer = this.get( 0 );
            if( YTPlayer.state == 1 ) this.YTPPause();
            else this.YTPPlay();
            if( typeof callback == "function" ) {
                callback( YTPlayer.state );
            }
            return this;
        },
        /**
         *
         * @returns {jQuery.mbYTPlayer}
         */
        stop: function() {
            var YTPlayer = this.get( 0 );
            var controls = jQuery( "#controlBar_" + YTPlayer.id );
            var playBtn = controls.find( ".mb_YTPPlaypause" );
            playBtn.html( jQuery.mbYTPlayer.controls.play );
            YTPlayer.player.stopVideo();
            return this;
        },
        /**
         *
         * @returns {jQuery.mbYTPlayer}
         */
        pause: function() {
            var YTPlayer = this.get( 0 );
            var controls = jQuery( "#controlBar_" + YTPlayer.id );
            var playBtn = controls.find( ".mb_YTPPlaypause" );
            playBtn.html( jQuery.mbYTPlayer.controls.play );
            YTPlayer.player.pauseVideo();
            return this;
        },
        /**
         *
         * @param val
         * @returns {jQuery.mbYTPlayer}
         */
        seekTo: function( val ) {
            var YTPlayer = this.get( 0 );
            YTPlayer.player.seekTo( val, true );
            return this;
        },
        /**
         *
         * @param val
         * @returns {jQuery.mbYTPlayer}
         */
        setVolume: function( val ) {
            var YTPlayer = this.get( 0 );
            if( !val && !YTPlayer.opt.vol && YTPlayer.player.getVolume() == 0 ) jQuery( YTPlayer ).YTPUnmute();
            else if( ( !val && YTPlayer.player.getVolume() > 0 ) || ( val && YTPlayer.opt.vol == val ) ) {
                if( !YTPlayer.isMute ) jQuery( YTPlayer ).YTPMute();
                else jQuery( YTPlayer ).YTPUnmute();
            } else {
                YTPlayer.opt.vol = val;
                YTPlayer.player.setVolume( YTPlayer.opt.vol );
                if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.updateSliderVal( val )
            }
            return this;
        },
        /**
         *
         * @returns {jQuery.mbYTPlayer}
         */
        mute: function() {
            var YTPlayer = this.get( 0 );
            if( YTPlayer.isMute ) return;
            YTPlayer.player.mute();
            YTPlayer.isMute = true;
            YTPlayer.player.setVolume( 0 );
            if( YTPlayer.volumeBar && YTPlayer.volumeBar.length && YTPlayer.volumeBar.width() > 10 ) {
                YTPlayer.volumeBar.updateSliderVal( 0 );
            }
            var controls = jQuery( "#controlBar_" + YTPlayer.id );
            var muteBtn = controls.find( ".mb_YTPMuteUnmute" );
            muteBtn.html( jQuery.mbYTPlayer.controls.unmute );
            jQuery( YTPlayer ).addClass( "isMuted" );
            if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.addClass( "muted" );
            var YTPEvent = jQuery.Event( "YTPMuted" );
            YTPEvent.time = YTPlayer.player.time;
            if( YTPlayer.canTrigger ) jQuery( YTPlayer ).trigger( YTPEvent );
            return this;
        },
        /**
         *
         * @returns {jQuery.mbYTPlayer}
         */
        unmute: function() {
            var YTPlayer = this.get( 0 );
            if( !YTPlayer.isMute ) return;
            YTPlayer.player.unMute();
            YTPlayer.isMute = false;
            YTPlayer.player.setVolume( YTPlayer.opt.vol );
            if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.updateSliderVal( YTPlayer.opt.vol > 10 ? YTPlayer.opt.vol : 10 );
            var controls = jQuery( "#controlBar_" + YTPlayer.id );
            var muteBtn = controls.find( ".mb_YTPMuteUnmute" );
            muteBtn.html( jQuery.mbYTPlayer.controls.mute );
            jQuery( YTPlayer ).removeClass( "isMuted" );
            if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.removeClass( "muted" );
            var YTPEvent = jQuery.Event( "YTPUnmuted" );
            YTPEvent.time = YTPlayer.player.time;
            if( YTPlayer.canTrigger ) jQuery( YTPlayer ).trigger( YTPEvent );
            return this;
        },
        /**
         *
         * @param filter
         * @param value
         * @returns {jQuery.mbYTPlayer}
         */
        applyFilter: function( filter, value ) {
            var YTPlayer = this.get( 0 );
            YTPlayer.filters[ filter ].value = value;
            if( YTPlayer.filtersEnabled ) this.YTPEnableFilters();
            return this;
        },
        /**
         *
         * @param filters
         * @returns {jQuery.mbYTPlayer}
         */
        applyFilters: function( filters ) {
            var YTPlayer = this.get( 0 );
            this.on( "YTPReady", function() {
                for( var key in filters ) {
                    YTPlayer.filters[ key ].value = filters[ key ];
                    jQuery( YTPlayer ).YTPApplyFilter( key, filters[ key ] );
                }
                jQuery( YTPlayer ).trigger( "YTPFiltersApplied" );
            } );
            return this;
        },
        /**
         *
         * @param filter
         * @param value
         * @returns {*}
         */
        toggleFilter: function( filter, value ) {
            return this.each( function() {
                var YTPlayer = this;
                if( !YTPlayer.filters[ filter ].value ) YTPlayer.filters[ filter ].value = value;
                else YTPlayer.filters[ filter ].value = 0;
                if( YTPlayer.filtersEnabled ) jQuery( this ).YTPEnableFilters();
            } )
            return this;
        },
        /**
         *
         * @param callback
         * @returns {*}
         */
        toggleFilters: function( callback ) {
            return this.each( function() {
                var YTPlayer = this;
                if( YTPlayer.filtersEnabled ) {
                    jQuery( YTPlayer ).trigger( "YTPDisableFilters" );
                    jQuery( YTPlayer ).YTPDisableFilters();
                } else {
                    jQuery( YTPlayer ).YTPEnableFilters();
                    jQuery( YTPlayer ).trigger( "YTPEnableFilters" );
                }
                if( typeof callback == "function" ) callback( YTPlayer.filtersEnabled );
            } )
        },
        /**
         *
         * @returns {*}
         */
        disableFilters: function() {
            return this.each( function() {
                var YTPlayer = this;
                var iframe = jQuery( YTPlayer.playerEl );
                iframe.css( "-webkit-filter", "" );
                iframe.css( "filter", "" );
                YTPlayer.filtersEnabled = false;
            } )
        },
        /**
         *
         * @returns {*}
         */
        enableFilters: function() {
            return this.each( function() {
                var YTPlayer = this;
                var iframe = jQuery( YTPlayer.playerEl );
                var filterStyle = "";
                for( var key in YTPlayer.filters ) {
                    if( YTPlayer.filters[ key ].value ) filterStyle += key.replace( "_", "-" ) + "(" + YTPlayer.filters[ key ].value + YTPlayer.filters[ key ].unit + ") ";
                }
                iframe.css( "-webkit-filter", filterStyle );
                iframe.css( "filter", filterStyle );
                YTPlayer.filtersEnabled = true;
            } )
            return this;
        },
        /**
         *
         * @param filter
         * @param callback
         * @returns {*}
         */
        removeFilter: function( filter, callback ) {
            return this.each( function() {
                if( typeof filter == "function" ) {
                    callback = filter;
                    filter = null;
                }
                var YTPlayer = this;
                if( !filter )
                    for( var key in YTPlayer.filters ) {
                        jQuery( this ).YTPApplyFilter( key, 0 );
                        if( typeof callback == "function" ) callback( key );
                    } else {
                        jQuery( this ).YTPApplyFilter( filter, 0 );
                        if( typeof callback == "function" ) callback( filter );
                    }
            } );
            return this;
        },
        /**
         *
         * @returns {{totalTime: number, currentTime: number}}
         */
        manageProgress: function() {
            var YTPlayer = this.get( 0 );
            var controls = jQuery( "#controlBar_" + YTPlayer.id );
            var progressBar = controls.find( ".mb_YTPProgress" );
            var loadedBar = controls.find( ".mb_YTPLoaded" );
            var timeBar = controls.find( ".mb_YTPseekbar" );
            var totW = progressBar.outerWidth();
            var currentTime = Math.floor( YTPlayer.player.getCurrentTime() );
            var totalTime = Math.floor( YTPlayer.player.getDuration() );
            var timeW = ( currentTime * totW ) / totalTime;
            var startLeft = 0;
            var loadedW = YTPlayer.player.getVideoLoadedFraction() * 100;
            loadedBar.css( {
                left: startLeft,
                width: loadedW + "%"
            } );
            timeBar.css( {
                left: 0,
                width: timeW
            } );
            return {
                totalTime: totalTime,
                currentTime: currentTime
            };
        },
        /**
         *
         * @param YTPlayer
         */
        buildControls: function( YTPlayer ) {
            var data = YTPlayer.opt;
            // @data.printUrl: is deprecated; use data.showYTLogo
            data.showYTLogo = data.showYTLogo || data.printUrl;
            if( jQuery( "#controlBar_" + YTPlayer.id ).length ) return;
            YTPlayer.controlBar = jQuery( "<span/>" ).attr( "id", "controlBar_" + YTPlayer.id ).addClass( "mb_YTPBar" ).css( {
                whiteSpace: "noWrap",
                position: YTPlayer.isBackground ? "fixed" : "absolute",
                zIndex: YTPlayer.isBackground ? 10000 : 1000
            } ).hide();
            var buttonBar = jQuery( "<div/>" ).addClass( "buttonBar" );
            /* play/pause button*/
            var playpause = jQuery( "<span>" + jQuery.mbYTPlayer.controls.play + "</span>" ).addClass( "mb_YTPPlaypause ytpicon" ).click( function() {
                if( YTPlayer.player.getPlayerState() == 1 ) jQuery( YTPlayer ).YTPPause();
                else jQuery( YTPlayer ).YTPPlay();
            } );
            /* mute/unmute button*/
            var MuteUnmute = jQuery( "<span>" + jQuery.mbYTPlayer.controls.mute + "</span>" ).addClass( "mb_YTPMuteUnmute ytpicon" ).click( function() {
                if( YTPlayer.player.getVolume() == 0 ) {
                    jQuery( YTPlayer ).YTPUnmute();
                } else {
                    jQuery( YTPlayer ).YTPMute();
                }
            } );
            /* volume bar*/
            var volumeBar = jQuery( "<div/>" ).addClass( "mb_YTPVolumeBar" ).css( {
                display: "inline-block"
            } );
            YTPlayer.volumeBar = volumeBar;
            /* time elapsed */
            var idx = jQuery( "<span/>" ).addClass( "mb_YTPTime" );
            var vURL = data.videoURL ? data.videoURL : "";
            if( vURL.indexOf( "http" ) < 0 ) vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL;
            var movieUrl = jQuery( "<span/>" ).html( jQuery.mbYTPlayer.controls.ytLogo ).addClass( "mb_YTPUrl ytpicon" ).attr( "title", "view on YouTube" ).on( "click", function() {
                window.open( vURL, "viewOnYT" )
            } );
            var onlyVideo = jQuery( "<span/>" ).html( jQuery.mbYTPlayer.controls.onlyYT ).addClass( "mb_OnlyYT ytpicon" ).on( "click", function() {
                jQuery( YTPlayer ).YTPFullscreen( data.realfullscreen );
            } );
            var progressBar = jQuery( "<div/>" ).addClass( "mb_YTPProgress" ).css( "position", "absolute" ).click( function( e ) {
                timeBar.css( {
                    width: ( e.clientX - timeBar.offset().left )
                } );
                YTPlayer.timeW = e.clientX - timeBar.offset().left;
                YTPlayer.controlBar.find( ".mb_YTPLoaded" ).css( {
                    width: 0
                } );
                var totalTime = Math.floor( YTPlayer.player.getDuration() );
                YTPlayer.goto = ( timeBar.outerWidth() * totalTime ) / progressBar.outerWidth();
                YTPlayer.player.seekTo( parseFloat( YTPlayer.goto ), true );
                YTPlayer.controlBar.find( ".mb_YTPLoaded" ).css( {
                    width: 0
                } );
            } );
            var loadedBar = jQuery( "<div/>" ).addClass( "mb_YTPLoaded" ).css( "position", "absolute" );
            var timeBar = jQuery( "<div/>" ).addClass( "mb_YTPseekbar" ).css( "position", "absolute" );
            progressBar.append( loadedBar ).append( timeBar );
            buttonBar.append( playpause ).append( MuteUnmute ).append( volumeBar ).append( idx );
            if( data.showYTLogo ) {
                buttonBar.append( movieUrl );
            }
            if( YTPlayer.isBackground || ( eval( YTPlayer.opt.realfullscreen ) && !YTPlayer.isBackground ) ) buttonBar.append( onlyVideo );
            YTPlayer.controlBar.append( buttonBar ).append( progressBar );
            if( !YTPlayer.isBackground ) {
                YTPlayer.controlBar.addClass( "inlinePlayer" );
                YTPlayer.wrapper.before( YTPlayer.controlBar );
            } else {
                jQuery( "body" ).after( YTPlayer.controlBar );
            }
            volumeBar.simpleSlider( {
                initialval: YTPlayer.opt.vol,
                scale: 100,
                orientation: "h",
                callback: function( el ) {
                    if( el.value == 0 ) {
                        jQuery( YTPlayer ).YTPMute();
                    } else {
                        jQuery( YTPlayer ).YTPUnmute();
                    }
                    YTPlayer.player.setVolume( el.value );
                    if( !YTPlayer.isMute ) YTPlayer.opt.vol = el.value;
                }
            } );
        },
        /**
         *
         *
         * */
        checkForState: function( YTPlayer ) {
            var interval = YTPlayer.opt.showControls ? 100 : 700;
            clearInterval( YTPlayer.getState );
            //Checking if player has been removed from scene
            if( !jQuery.contains( document, YTPlayer ) ) {
                jQuery( YTPlayer ).YTPPlayerDestroy();
                clearInterval( YTPlayer.getState );
                clearInterval( YTPlayer.checkForStartAt );
                return;
            }
            jQuery.mbYTPlayer.checkForStart( YTPlayer );
            YTPlayer.getState = setInterval( function() {
                var prog = jQuery( YTPlayer ).YTPManageProgress();
                var $YTPlayer = jQuery( YTPlayer );
                var data = YTPlayer.opt;
                var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 0;
                var stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0;
                if( YTPlayer.player.time != prog.currentTime ) {
                    var YTPEvent = jQuery.Event( "YTPTime" );
                    YTPEvent.time = YTPlayer.player.time;
                    jQuery( YTPlayer ).trigger( YTPEvent );
                }
                YTPlayer.player.time = prog.currentTime;
                if( YTPlayer.player.getVolume() == 0 ) $YTPlayer.addClass( "isMuted" );
                else $YTPlayer.removeClass( "isMuted" );
                if( YTPlayer.opt.showControls )
                    if( prog.totalTime ) {
                        YTPlayer.controlBar.find( ".mb_YTPTime" ).html( jQuery.mbYTPlayer.formatTime( prog.currentTime ) + " / " + jQuery.mbYTPlayer.formatTime( prog.totalTime ) );
                    } else {
                        YTPlayer.controlBar.find( ".mb_YTPTime" ).html( "-- : -- / -- : --" );
                    }
                if( eval( YTPlayer.opt.stopMovieOnBlur ) )
                    if( !document.hasFocus() ) {
                        if( YTPlayer.state == 1 ) {
                            YTPlayer.hasFocus = false;
                            $YTPlayer.YTPPause();
                        }
                    } else if( document.hasFocus() && !YTPlayer.hasFocus && !( YTPlayer.state == -1 || YTPlayer.state == 0 ) ) {
                    YTPlayer.hasFocus = true;
                    $YTPlayer.YTPPlay();
                }
                if( YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ) {
                    YTPlayer.controlBar.addClass( "compact" );
                    YTPlayer.isCompact = true;
                    if( !YTPlayer.isMute && YTPlayer.volumeBar ) YTPlayer.volumeBar.updateSliderVal( YTPlayer.opt.vol );
                } else if( YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact ) {
                    YTPlayer.controlBar.removeClass( "compact" );
                    YTPlayer.isCompact = false;
                    if( !YTPlayer.isMute && YTPlayer.volumeBar ) YTPlayer.volumeBar.updateSliderVal( YTPlayer.opt.vol );
                }
                if( YTPlayer.player.getPlayerState() == 1 && ( parseFloat( YTPlayer.player.getDuration() - 1.5 ) < YTPlayer.player.getCurrentTime() || ( stopAt > 0 && parseFloat( YTPlayer.player.getCurrentTime() ) > stopAt ) ) ) {
                    if( YTPlayer.isEnded ) return;
                    YTPlayer.isEnded = true;
                    setTimeout( function() {
                        YTPlayer.isEnded = false
                    }, 1000 );
                    if( YTPlayer.isPlayList ) {
                        clearInterval( YTPlayer.getState );
                        var YTPEnd = jQuery.Event( "YTPEnd" );
                        YTPEnd.time = YTPlayer.player.time;
                        jQuery( YTPlayer ).trigger( YTPEnd );
                        return;
                    } else if( !data.loop ) {
                        YTPlayer.player.pauseVideo();
                        YTPlayer.wrapper.CSSAnimate( {
                            opacity: 0
                        }, 1000, function() {
                            var YTPEnd = jQuery.Event( "YTPEnd" );
                            YTPEnd.time = YTPlayer.player.time;
                            jQuery( YTPlayer ).trigger( YTPEnd );
                            YTPlayer.player.seekTo( startAt, true );
                            if( !YTPlayer.isBackground ) {
                                YTPlayer.opt.containment.css( {
                                    background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
                                    backgroundSize: "cover"
                                } );
                            }
                        } );
                    } else {

                        startAt = startAt || 1;

                        YTPlayer.player.pauseVideo();
                        YTPlayer.player.seekTo( startAt, true );
                        $YTPlayer.YTPPlay();

                    }
                }
            }, interval );
        },
        /**
         *
         * */
        checkForStart: function( YTPlayer ) {
            var $YTPlayer = jQuery( YTPlayer );
            //Checking if player has been removed from scene
            if( !jQuery.contains( document, YTPlayer ) ) {
                jQuery( YTPlayer ).YTPPlayerDestroy();
                return
            }
            if( jQuery.browser.chrome ) YTPlayer.opt.quality = "default";
            YTPlayer.player.pauseVideo();
            jQuery( YTPlayer ).muteYTPVolume();
            jQuery( "#controlBar_" + YTPlayer.id ).remove();
            if( YTPlayer.opt.showControls ) jQuery.mbYTPlayer.buildControls( YTPlayer );
            if( YTPlayer.opt.addRaster ) {
                var classN = YTPlayer.opt.addRaster == "dot" ? "raster-dot" : "raster";
                YTPlayer.overlay.addClass( YTPlayer.isRetina ? classN + " retina" : classN );
            } else {
                YTPlayer.overlay.removeClass( function( index, classNames ) {
                    // change the list into an array
                    var current_classes = classNames.split( " " ),
                        // array of classes which are to be removed
                        classes_to_remove = [];
                    jQuery.each( current_classes, function( index, class_name ) {
                        // if the classname begins with bg add it to the classes_to_remove array
                        if( /raster.*/.test( class_name ) ) {
                            classes_to_remove.push( class_name );
                        }
                    } );
                    classes_to_remove.push( "retina" );
                    // turn the array back into a string
                    return classes_to_remove.join( " " );
                } )
            }
            YTPlayer.checkForStartAt = setInterval( function() {
                jQuery( YTPlayer ).YTPMute();
                var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
                var canPlayVideo = ( YTPlayer.player.getVideoLoadedFraction() > startAt / YTPlayer.player.getDuration() );
                if( YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= startAt && canPlayVideo ) {
                    clearInterval( YTPlayer.checkForStartAt );
                    YTPlayer.isReady = true;
                    if( typeof YTPlayer.opt.onReady == "function" ) YTPlayer.opt.onReady( YTPlayer );
                    var YTPready = jQuery.Event( "YTPReady" );
                    jQuery( YTPlayer ).trigger( YTPready );
                    YTPlayer.player.pauseVideo();
                    if( !YTPlayer.opt.mute ) jQuery( YTPlayer ).YTPUnmute();
                    YTPlayer.canTrigger = true;
                    if( YTPlayer.opt.autoPlay ) {
                        $YTPlayer.YTPPlay();
                        $YTPlayer.css( "background-image", "none" );
                        jQuery( YTPlayer.playerEl ).CSSAnimate( {
                            opacity: 1
                        }, 1000 );
                        YTPlayer.wrapper.CSSAnimate( {
                            opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
                        }, 1000 );
                    } else {
                        YTPlayer.player.pauseVideo();
                        if( !YTPlayer.isPlayer ) {
                            jQuery( YTPlayer.playerEl ).CSSAnimate( {
                                opacity: 1
                            }, 1000 );
                            YTPlayer.wrapper.CSSAnimate( {
                                opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
                            }, 1000 );
                        }
                    }
                    if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
                        YTPlayer.loading.html( "Ready" );
                        setTimeout( function() {
                            YTPlayer.loading.fadeOut();


                        }, 100 )
                    }
                    if( YTPlayer.controlBar ) YTPlayer.controlBar.slideDown( 1000 );
                } else {
                    //YTPlayer.player.playVideo();
                    if( startAt >= 0 ) YTPlayer.player.seekTo( startAt, true );
                }
            }, 1000 );
        },
        /**
         *
         * @param s
         * @returns {string}
         */
        formatTime: function( s ) {
            var min = Math.floor( s / 60 );
            var sec = Math.floor( s - ( 60 * min ) );
            return( min <= 9 ? "0" + min : min ) + " : " + ( sec <= 9 ? "0" + sec : sec );
        }
    };
    /**
     *
     * @returns {boolean}
     */
    jQuery.fn.toggleVolume = function() {
        var YTPlayer = this.get( 0 );
        if( !YTPlayer ) return;
        if( YTPlayer.player.isMuted() ) {
            jQuery( YTPlayer ).YTPUnmute();
            return true;
        } else {
            jQuery( YTPlayer ).YTPMute();
            return false;
        }
    };
    /**
     *
     */
    jQuery.fn.optimizeDisplay = function() {
        var YTPlayer = this.get( 0 );
        var data = YTPlayer.opt;
        var playerBox = jQuery( YTPlayer.playerEl );
        var win = {};
        var el = YTPlayer.wrapper;
        win.width = el.outerWidth();
        win.height = el.outerHeight();
        var margin = 24;
        var overprint = 100;
        var vid = {};
        if( data.optimizeDisplay ) {
            vid.width = win.width + ( ( win.width * margin ) / 100 );
            vid.height = data.ratio == "16/9" ? Math.ceil( ( 9 * win.width ) / 16 ) : Math.ceil( ( 3 * win.width ) / 4 );
            vid.marginTop = -( ( vid.height - win.height ) / 2 );
            vid.marginLeft = -( ( win.width * ( margin / 2 ) ) / 100 );
            if( vid.height < win.height ) {
                vid.height = win.height + ( ( win.height * margin ) / 100 );
                vid.width = data.ratio == "16/9" ? Math.floor( ( 16 * win.height ) / 9 ) : Math.floor( ( 4 * win.height ) / 3 );
                vid.marginTop = -( ( win.height * ( margin / 2 ) ) / 100 );
                vid.marginLeft = -( ( vid.width - win.width ) / 2 );
            }
            vid.width += overprint;
            vid.height += overprint;
            vid.marginTop -= overprint / 2;
            vid.marginLeft -= overprint / 2;
        } else {
            vid.width = "100%";
            vid.height = "100%";
            vid.marginTop = 0;
            vid.marginLeft = 0;
        }
        playerBox.css( {
            width: vid.width,
            height: vid.height,
            marginTop: vid.marginTop,
            marginLeft: vid.marginLeft
        } );
    };
    /**
     *
     * @param arr
     * @returns {Array|string|Blob|*}
     *
     */
    jQuery.shuffle = function( arr ) {
        var newArray = arr.slice();
        var len = newArray.length;
        var i = len;
        while( i-- ) {
            var p = parseInt( Math.random() * len );
            var t = newArray[ i ];
            newArray[ i ] = newArray[ p ];
            newArray[ p ] = t;
        }
        return newArray;
    };

    /* Exposed public method */
    jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer;
    jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer;
    jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID;
    jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie;
    jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy;

    jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play;
    jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay;
    jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop;
    jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause;
    jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo;

    jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist;
    jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext;
    jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev;

    jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute;
    jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute;
    jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume;
    jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume;

    jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData;
    jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen;
    jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops;
    jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality;
    jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress;

    jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter;
    jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters;
    jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter;
    jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters;
    jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter;
    jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters;
    jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters;


    /**
     *
     * @deprecated
     *
     **/
    jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer;
    jQuery.fn.playNext = jQuery.mbYTPlayer.playNext;
    jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev;
    jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie;
    jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID;
    jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer;
    jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy;
    jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen;
    jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls;
    jQuery.fn.playYTP = jQuery.mbYTPlayer.play;
    jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops;
    jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop;
    jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause;
    jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo;
    jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute;
    jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute;
    jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume;
    jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality;
    jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress;
    jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData;


} )( jQuery, ytp );
;
/*
 *  jQuery dotdotdot 1.7.3
 *
 *  Copyright (c) Fred Heusschen
 *  www.frebsite.nl
 *
 *  Plugin website:
 *  dotdotdot.frebsite.nl
 *
 *  Licensed under the MIT license.
 *  http://en.wikipedia.org/wiki/MIT_License
 */
!function(t,e){function n(t,e,n){var r=t.children(),o=!1;t.empty();for(var a=0,d=r.length;d>a;a++){var l=r.eq(a);if(t.append(l),n&&t.append(n),i(t,e)){l.remove(),o=!0;break}n&&n.detach()}return o}function r(e,n,a,d,l){var s=!1,c="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",u="script, .dotdotdot-keep";return e.contents().detach().each(function(){var f=this,h=t(f);if("undefined"==typeof f)return!0;if(h.is(u))e.append(h);else{if(s)return!0;e.append(h),!l||h.is(d.after)||h.find(d.after).length||e[e.is(c)?"after":"append"](l),i(a,d)&&(s=3==f.nodeType?o(h,n,a,d,l):r(h,n,a,d,l),s||(h.detach(),s=!0)),s||l&&l.detach()}}),s}function o(e,n,r,o,d){var c=e[0];if(!c)return!1;var f=s(c),h=-1!==f.indexOf(" ")?" ":"　",p="letter"==o.wrap?"":h,g=f.split(p),v=-1,w=-1,b=0,y=g.length-1;for(o.fallbackToLetter&&0==b&&0==y&&(p="",g=f.split(p),y=g.length-1);y>=b&&(0!=b||0!=y);){var m=Math.floor((b+y)/2);if(m==w)break;w=m,l(c,g.slice(0,w+1).join(p)+o.ellipsis),i(r,o)?(y=w,o.fallbackToLetter&&0==b&&0==y&&(p="",g=g[0].split(p),v=-1,w=-1,b=0,y=g.length-1)):(v=w,b=w)}if(-1==v||1==g.length&&0==g[0].length){var x=e.parent();e.detach();var T=d&&d.closest(x).length?d.length:0;x.contents().length>T?c=u(x.contents().eq(-1-T),n):(c=u(x,n,!0),T||x.detach()),c&&(f=a(s(c),o),l(c,f),T&&d&&t(c).parent().append(d))}else f=a(g.slice(0,v+1).join(p),o),l(c,f);return!0}function i(t,e){return t.innerHeight()>e.maxHeight}function a(e,n){for(;t.inArray(e.slice(-1),n.lastCharacter.remove)>-1;)e=e.slice(0,-1);return t.inArray(e.slice(-1),n.lastCharacter.noEllipsis)<0&&(e+=n.ellipsis),e}function d(t){return{width:t.innerWidth(),height:t.innerHeight()}}function l(t,e){t.innerText?t.innerText=e:t.nodeValue?t.nodeValue=e:t.textContent&&(t.textContent=e)}function s(t){return t.innerText?t.innerText:t.nodeValue?t.nodeValue:t.textContent?t.textContent:""}function c(t){do t=t.previousSibling;while(t&&1!==t.nodeType&&3!==t.nodeType);return t}function u(e,n,r){var o,i=e&&e[0];if(i){if(!r){if(3===i.nodeType)return i;if(t.trim(e.text()))return u(e.contents().last(),n)}for(o=c(i);!o;){if(e=e.parent(),e.is(n)||!e.length)return!1;o=c(e[0])}if(o)return u(t(o),n)}return!1}function f(e,n){return e?"string"==typeof e?(e=t(e,n),e.length?e:!1):e.jquery?e:!1:!1}function h(t){for(var e=t.innerHeight(),n=["paddingTop","paddingBottom"],r=0,o=n.length;o>r;r++){var i=parseInt(t.css(n[r]),10);isNaN(i)&&(i=0),e-=i}return e}if(!t.fn.dotdotdot){t.fn.dotdotdot=function(e){if(0==this.length)return t.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){t(this).dotdotdot(e)});var o=this;o.data("dotdotdot")&&o.trigger("destroy.dot"),o.data("dotdotdot-style",o.attr("style")||""),o.css("word-wrap","break-word"),"nowrap"===o.css("white-space")&&o.css("white-space","normal"),o.bind_events=function(){return o.bind("update.dot",function(e,d){e.preventDefault(),e.stopPropagation(),l.maxHeight="number"==typeof l.height?l.height:h(o),l.maxHeight+=l.tolerance,"undefined"!=typeof d&&(("string"==typeof d||"nodeType"in d&&1===d.nodeType)&&(d=t("<div />").append(d).contents()),d instanceof t&&(a=d)),g=o.wrapInner('<div class="dotdotdot" />').children(),g.contents().detach().end().append(a.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var c=!1,u=!1;return s.afterElement&&(c=s.afterElement.clone(!0),c.show(),s.afterElement.detach()),i(g,l)&&(u="children"==l.wrap?n(g,l,c):r(g,o,g,l,c)),g.replaceWith(g.contents()),g=null,t.isFunction(l.callback)&&l.callback.call(o[0],u,a),s.isTruncated=u,u}).bind("isTruncated.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(o[0],s.isTruncated),s.isTruncated}).bind("originalContent.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(o[0],a),a}).bind("destroy.dot",function(t){t.preventDefault(),t.stopPropagation(),o.unwatch().unbind_events().contents().detach().end().append(a).attr("style",o.data("dotdotdot-style")||"").data("dotdotdot",!1)}),o},o.unbind_events=function(){return o.unbind(".dot"),o},o.watch=function(){if(o.unwatch(),"window"==l.watch){var e=t(window),n=e.width(),r=e.height();e.bind("resize.dot"+s.dotId,function(){n==e.width()&&r==e.height()&&l.windowResizeFix||(n=e.width(),r=e.height(),u&&clearInterval(u),u=setTimeout(function(){o.trigger("update.dot")},100))})}else c=d(o),u=setInterval(function(){if(o.is(":visible")){var t=d(o);(c.width!=t.width||c.height!=t.height)&&(o.trigger("update.dot"),c=t)}},500);return o},o.unwatch=function(){return t(window).unbind("resize.dot"+s.dotId),u&&clearInterval(u),o};var a=o.contents(),l=t.extend(!0,{},t.fn.dotdotdot.defaults,e),s={},c={},u=null,g=null;return l.lastCharacter.remove instanceof Array||(l.lastCharacter.remove=t.fn.dotdotdot.defaultArrays.lastCharacter.remove),l.lastCharacter.noEllipsis instanceof Array||(l.lastCharacter.noEllipsis=t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),s.afterElement=f(l.after,o),s.isTruncated=!1,s.dotId=p++,o.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&o.watch(),o},t.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},t.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},t.fn.dotdotdot.debug=function(){};var p=1,g=t.fn.html;t.fn.html=function(n){return n!=e&&!t.isFunction(n)&&this.data("dotdotdot")?this.trigger("update",[n]):g.apply(this,arguments)};var v=t.fn.text;t.fn.text=function(n){return n!=e&&!t.isFunction(n)&&this.data("dotdotdot")?(n=t("<div />").text(n).html(),this.trigger("update",[n])):v.apply(this,arguments)}}}(jQuery);
;
/*! skrollr 0.6.30 (2015-06-19) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function () {
!function(a,b,c){"use strict";function d(c){if(e=b.documentElement,f=b.body,T(),ha=this,c=c||{},ma=c.constants||{},c.easing)for(var d in c.easing)W[d]=c.easing[d];ta=c.edgeStrategy||"set",ka={beforerender:c.beforerender,render:c.render,keyframe:c.keyframe},la=c.forceHeight!==!1,la&&(Ka=c.scale||1),na=c.mobileDeceleration||y,pa=c.smoothScrolling!==!1,qa=c.smoothScrollingDuration||A,ra={targetTop:ha.getScrollTop()},Sa=(c.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent||navigator.vendor||a.opera)})(),Sa?(ja=b.getElementById(c.skrollrBody||z),ja&&ga(),X(),Ea(e,[s,v],[t])):Ea(e,[s,u],[t]),ha.refresh(),wa(a,"resize orientationchange",function(){var a=e.clientWidth,b=e.clientHeight;(b!==Pa||a!==Oa)&&(Pa=b,Oa=a,Qa=!0)});var g=U();return function h(){$(),va=g(h)}(),ha}var e,f,g={get:function(){return ha},init:function(a){return ha||new d(a)},VERSION:"0.6.29"},h=Object.prototype.hasOwnProperty,i=a.Math,j=a.getComputedStyle,k="touchstart",l="touchmove",m="touchcancel",n="touchend",o="skrollable",p=o+"-before",q=o+"-between",r=o+"-after",s="skrollr",t="no-"+s,u=s+"-desktop",v=s+"-mobile",w="linear",x=1e3,y=.004,z="skrollr-body",A=200,B="start",C="end",D="center",E="bottom",F="___skrollable_id",G=/^(?:input|textarea|button|select)$/i,H=/^\s+|\s+$/g,I=/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,J=/\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,K=/^(@?[a-z\-]+)\[(\w+)\]$/,L=/-([a-z0-9_])/g,M=function(a,b){return b.toUpperCase()},N=/[\-+]?[\d]*\.?[\d]+/g,O=/\{\?\}/g,P=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,Q=/[a-z\-]+-gradient/g,R="",S="",T=function(){var a=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(j){var b=j(f,null);for(var c in b)if(R=c.match(a)||+c==c&&b[c].match(a))break;if(!R)return void(R=S="");R=R[0],"-"===R.slice(0,1)?(S=R,R={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[R]):S="-"+R.toLowerCase()+"-"}},U=function(){var b=a.requestAnimationFrame||a[R.toLowerCase()+"RequestAnimationFrame"],c=Ha();return(Sa||!b)&&(b=function(b){var d=Ha()-c,e=i.max(0,1e3/60-d);return a.setTimeout(function(){c=Ha(),b()},e)}),b},V=function(){var b=a.cancelAnimationFrame||a[R.toLowerCase()+"CancelAnimationFrame"];return(Sa||!b)&&(b=function(b){return a.clearTimeout(b)}),b},W={begin:function(){return 0},end:function(){return 1},linear:function(a){return a},quadratic:function(a){return a*a},cubic:function(a){return a*a*a},swing:function(a){return-i.cos(a*i.PI)/2+.5},sqrt:function(a){return i.sqrt(a)},outCubic:function(a){return i.pow(a-1,3)+1},bounce:function(a){var b;if(.5083>=a)b=3;else if(.8489>=a)b=9;else if(.96208>=a)b=27;else{if(!(.99981>=a))return 1;b=91}return 1-i.abs(3*i.cos(a*b*1.028)/b)}};d.prototype.refresh=function(a){var d,e,f=!1;for(a===c?(f=!0,ia=[],Ra=0,a=b.getElementsByTagName("*")):a.length===c&&(a=[a]),d=0,e=a.length;e>d;d++){var g=a[d],h=g,i=[],j=pa,k=ta,l=!1;if(f&&F in g&&delete g[F],g.attributes){for(var m=0,n=g.attributes.length;n>m;m++){var p=g.attributes[m];if("data-anchor-target"!==p.name)if("data-smooth-scrolling"!==p.name)if("data-edge-strategy"!==p.name)if("data-emit-events"!==p.name){var q=p.name.match(I);if(null!==q){var r={props:p.value,element:g,eventType:p.name.replace(L,M)};i.push(r);var s=q[1];s&&(r.constant=s.substr(1));var t=q[2];/p$/.test(t)?(r.isPercentage=!0,r.offset=(0|t.slice(0,-1))/100):r.offset=0|t;var u=q[3],v=q[4]||u;u&&u!==B&&u!==C?(r.mode="relative",r.anchors=[u,v]):(r.mode="absolute",u===C?r.isEnd=!0:r.isPercentage||(r.offset=r.offset*Ka))}}else l=!0;else k=p.value;else j="off"!==p.value;else if(h=b.querySelector(p.value),null===h)throw'Unable to find anchor target "'+p.value+'"'}if(i.length){var w,x,y;!f&&F in g?(y=g[F],w=ia[y].styleAttr,x=ia[y].classAttr):(y=g[F]=Ra++,w=g.style.cssText,x=Da(g)),ia[y]={element:g,styleAttr:w,classAttr:x,anchorTarget:h,keyFrames:i,smoothScrolling:j,edgeStrategy:k,emitEvents:l,lastFrameIndex:-1},Ea(g,[o],[])}}}for(Aa(),d=0,e=a.length;e>d;d++){var z=ia[a[d][F]];z!==c&&(_(z),ba(z))}return ha},d.prototype.relativeToAbsolute=function(a,b,c){var d=e.clientHeight,f=a.getBoundingClientRect(),g=f.top,h=f.bottom-f.top;return b===E?g-=d:b===D&&(g-=d/2),c===E?g+=h:c===D&&(g+=h/2),g+=ha.getScrollTop(),g+.5|0},d.prototype.animateTo=function(a,b){b=b||{};var d=Ha(),e=ha.getScrollTop(),f=b.duration===c?x:b.duration;return oa={startTop:e,topDiff:a-e,targetTop:a,duration:f,startTime:d,endTime:d+f,easing:W[b.easing||w],done:b.done},oa.topDiff||(oa.done&&oa.done.call(ha,!1),oa=c),ha},d.prototype.stopAnimateTo=function(){oa&&oa.done&&oa.done.call(ha,!0),oa=c},d.prototype.isAnimatingTo=function(){return!!oa},d.prototype.isMobile=function(){return Sa},d.prototype.setScrollTop=function(b,c){return sa=c===!0,Sa?Ta=i.min(i.max(b,0),Ja):a.scrollTo(0,b),ha},d.prototype.getScrollTop=function(){return Sa?Ta:a.pageYOffset||e.scrollTop||f.scrollTop||0},d.prototype.getMaxScrollTop=function(){return Ja},d.prototype.on=function(a,b){return ka[a]=b,ha},d.prototype.off=function(a){return delete ka[a],ha},d.prototype.destroy=function(){var a=V();a(va),ya(),Ea(e,[t],[s,u,v]);for(var b=0,d=ia.length;d>b;b++)fa(ia[b].element);e.style.overflow=f.style.overflow="",e.style.height=f.style.height="",ja&&g.setStyle(ja,"transform","none"),ha=c,ja=c,ka=c,la=c,Ja=0,Ka=1,ma=c,na=c,La="down",Ma=-1,Oa=0,Pa=0,Qa=!1,oa=c,pa=c,qa=c,ra=c,sa=c,Ra=0,ta=c,Sa=!1,Ta=0,ua=c};var X=function(){var d,g,h,j,o,p,q,r,s,t,u,v;wa(e,[k,l,m,n].join(" "),function(a){var e=a.changedTouches[0];for(j=a.target;3===j.nodeType;)j=j.parentNode;switch(o=e.clientY,p=e.clientX,t=a.timeStamp,G.test(j.tagName)||a.preventDefault(),a.type){case k:d&&d.blur(),ha.stopAnimateTo(),d=j,g=q=o,h=p,s=t;break;case l:G.test(j.tagName)&&b.activeElement!==j&&a.preventDefault(),r=o-q,v=t-u,ha.setScrollTop(Ta-r,!0),q=o,u=t;break;default:case m:case n:var f=g-o,w=h-p,x=w*w+f*f;if(49>x){if(!G.test(d.tagName)){d.focus();var y=b.createEvent("MouseEvents");y.initMouseEvent("click",!0,!0,a.view,1,e.screenX,e.screenY,e.clientX,e.clientY,a.ctrlKey,a.altKey,a.shiftKey,a.metaKey,0,null),d.dispatchEvent(y)}return}d=c;var z=r/v;z=i.max(i.min(z,3),-3);var A=i.abs(z/na),B=z*A+.5*na*A*A,C=ha.getScrollTop()-B,D=0;C>Ja?(D=(Ja-C)/B,C=Ja):0>C&&(D=-C/B,C=0),A*=1-D,ha.animateTo(C+.5|0,{easing:"outCubic",duration:A})}}),a.scrollTo(0,0),e.style.overflow=f.style.overflow="hidden"},Y=function(){var a,b,c,d,f,g,h,j,k,l,m,n=e.clientHeight,o=Ba();for(j=0,k=ia.length;k>j;j++)for(a=ia[j],b=a.element,c=a.anchorTarget,d=a.keyFrames,f=0,g=d.length;g>f;f++)h=d[f],l=h.offset,m=o[h.constant]||0,h.frame=l,h.isPercentage&&(l*=n,h.frame=l),"relative"===h.mode&&(fa(b),h.frame=ha.relativeToAbsolute(c,h.anchors[0],h.anchors[1])-l,fa(b,!0)),h.frame+=m,la&&!h.isEnd&&h.frame>Ja&&(Ja=h.frame);for(Ja=i.max(Ja,Ca()),j=0,k=ia.length;k>j;j++){for(a=ia[j],d=a.keyFrames,f=0,g=d.length;g>f;f++)h=d[f],m=o[h.constant]||0,h.isEnd&&(h.frame=Ja-h.offset+m);a.keyFrames.sort(Ia)}},Z=function(a,b){for(var c=0,d=ia.length;d>c;c++){var e,f,i=ia[c],j=i.element,k=i.smoothScrolling?a:b,l=i.keyFrames,m=l.length,n=l[0],s=l[l.length-1],t=k<n.frame,u=k>s.frame,v=t?n:s,w=i.emitEvents,x=i.lastFrameIndex;if(t||u){if(t&&-1===i.edge||u&&1===i.edge)continue;switch(t?(Ea(j,[p],[r,q]),w&&x>-1&&(za(j,n.eventType,La),i.lastFrameIndex=-1)):(Ea(j,[r],[p,q]),w&&m>x&&(za(j,s.eventType,La),i.lastFrameIndex=m)),i.edge=t?-1:1,i.edgeStrategy){case"reset":fa(j);continue;case"ease":k=v.frame;break;default:case"set":var y=v.props;for(e in y)h.call(y,e)&&(f=ea(y[e].value),0===e.indexOf("@")?j.setAttribute(e.substr(1),f):g.setStyle(j,e,f));continue}}else 0!==i.edge&&(Ea(j,[o,q],[p,r]),i.edge=0);for(var z=0;m-1>z;z++)if(k>=l[z].frame&&k<=l[z+1].frame){var A=l[z],B=l[z+1];for(e in A.props)if(h.call(A.props,e)){var C=(k-A.frame)/(B.frame-A.frame);C=A.props[e].easing(C),f=da(A.props[e].value,B.props[e].value,C),f=ea(f),0===e.indexOf("@")?j.setAttribute(e.substr(1),f):g.setStyle(j,e,f)}w&&x!==z&&("down"===La?za(j,A.eventType,La):za(j,B.eventType,La),i.lastFrameIndex=z);break}}},$=function(){Qa&&(Qa=!1,Aa());var a,b,d=ha.getScrollTop(),e=Ha();if(oa)e>=oa.endTime?(d=oa.targetTop,a=oa.done,oa=c):(b=oa.easing((e-oa.startTime)/oa.duration),d=oa.startTop+b*oa.topDiff|0),ha.setScrollTop(d,!0);else if(!sa){var f=ra.targetTop-d;f&&(ra={startTop:Ma,topDiff:d-Ma,targetTop:d,startTime:Na,endTime:Na+qa}),e<=ra.endTime&&(b=W.sqrt((e-ra.startTime)/qa),d=ra.startTop+b*ra.topDiff|0)}if(sa||Ma!==d){La=d>Ma?"down":Ma>d?"up":La,sa=!1;var h={curTop:d,lastTop:Ma,maxTop:Ja,direction:La},i=ka.beforerender&&ka.beforerender.call(ha,h);i!==!1&&(Z(d,ha.getScrollTop()),Sa&&ja&&g.setStyle(ja,"transform","translate(0, "+-Ta+"px) "+ua),Ma=d,ka.render&&ka.render.call(ha,h)),a&&a.call(ha,!1)}Na=e},_=function(a){for(var b=0,c=a.keyFrames.length;c>b;b++){for(var d,e,f,g,h=a.keyFrames[b],i={};null!==(g=J.exec(h.props));)f=g[1],e=g[2],d=f.match(K),null!==d?(f=d[1],d=d[2]):d=w,e=e.indexOf("!")?aa(e):[e.slice(1)],i[f]={value:e,easing:W[d]};h.props=i}},aa=function(a){var b=[];return P.lastIndex=0,a=a.replace(P,function(a){return a.replace(N,function(a){return a/255*100+"%"})}),S&&(Q.lastIndex=0,a=a.replace(Q,function(a){return S+a})),a=a.replace(N,function(a){return b.push(+a),"{?}"}),b.unshift(a),b},ba=function(a){var b,c,d={};for(b=0,c=a.keyFrames.length;c>b;b++)ca(a.keyFrames[b],d);for(d={},b=a.keyFrames.length-1;b>=0;b--)ca(a.keyFrames[b],d)},ca=function(a,b){var c;for(c in b)h.call(a.props,c)||(a.props[c]=b[c]);for(c in a.props)b[c]=a.props[c]},da=function(a,b,c){var d,e=a.length;if(e!==b.length)throw"Can't interpolate between \""+a[0]+'" and "'+b[0]+'"';var f=[a[0]];for(d=1;e>d;d++)f[d]=a[d]+(b[d]-a[d])*c;return f},ea=function(a){var b=1;return O.lastIndex=0,a[0].replace(O,function(){return a[b++]})},fa=function(a,b){a=[].concat(a);for(var c,d,e=0,f=a.length;f>e;e++)d=a[e],c=ia[d[F]],c&&(b?(d.style.cssText=c.dirtyStyleAttr,Ea(d,c.dirtyClassAttr)):(c.dirtyStyleAttr=d.style.cssText,c.dirtyClassAttr=Da(d),d.style.cssText=c.styleAttr,Ea(d,c.classAttr)))},ga=function(){ua="translateZ(0)",g.setStyle(ja,"transform",ua);var a=j(ja),b=a.getPropertyValue("transform"),c=a.getPropertyValue(S+"transform"),d=b&&"none"!==b||c&&"none"!==c;d||(ua="")};g.setStyle=function(a,b,c){var d=a.style;if(b=b.replace(L,M).replace("-",""),"zIndex"===b)isNaN(c)?d[b]=c:d[b]=""+(0|c);else if("float"===b)d.styleFloat=d.cssFloat=c;else try{R&&(d[R+b.slice(0,1).toUpperCase()+b.slice(1)]=c),d[b]=c}catch(e){}};var ha,ia,ja,ka,la,ma,na,oa,pa,qa,ra,sa,ta,ua,va,wa=g.addEvent=function(b,c,d){var e=function(b){return b=b||a.event,b.target||(b.target=b.srcElement),b.preventDefault||(b.preventDefault=function(){b.returnValue=!1,b.defaultPrevented=!0}),d.call(this,b)};c=c.split(" ");for(var f,g=0,h=c.length;h>g;g++)f=c[g],b.addEventListener?b.addEventListener(f,d,!1):b.attachEvent("on"+f,e),Ua.push({element:b,name:f,listener:d})},xa=g.removeEvent=function(a,b,c){b=b.split(" ");for(var d=0,e=b.length;e>d;d++)a.removeEventListener?a.removeEventListener(b[d],c,!1):a.detachEvent("on"+b[d],c)},ya=function(){for(var a,b=0,c=Ua.length;c>b;b++)a=Ua[b],xa(a.element,a.name,a.listener);Ua=[]},za=function(a,b,c){ka.keyframe&&ka.keyframe.call(ha,a,b,c)},Aa=function(){var a=ha.getScrollTop();Ja=0,la&&!Sa&&(f.style.height=""),Y(),la&&!Sa&&(f.style.height=Ja+e.clientHeight+"px"),Sa?ha.setScrollTop(i.min(ha.getScrollTop(),Ja)):ha.setScrollTop(a,!0),sa=!0},Ba=function(){var a,b,c=e.clientHeight,d={};for(a in ma)b=ma[a],"function"==typeof b?b=b.call(ha):/p$/.test(b)&&(b=b.slice(0,-1)/100*c),d[a]=b;return d},Ca=function(){var a,b=0;return ja&&(b=i.max(ja.offsetHeight,ja.scrollHeight)),a=i.max(b,f.scrollHeight,f.offsetHeight,e.scrollHeight,e.offsetHeight,e.clientHeight),a-e.clientHeight},Da=function(b){var c="className";return a.SVGElement&&b instanceof a.SVGElement&&(b=b[c],c="baseVal"),b[c]},Ea=function(b,d,e){var f="className";if(a.SVGElement&&b instanceof a.SVGElement&&(b=b[f],f="baseVal"),e===c)return void(b[f]=d);for(var g=b[f],h=0,i=e.length;i>h;h++)g=Ga(g).replace(Ga(e[h])," ");g=Fa(g);for(var j=0,k=d.length;k>j;j++)-1===Ga(g).indexOf(Ga(d[j]))&&(g+=" "+d[j]);b[f]=Fa(g)},Fa=function(a){return a.replace(H,"")},Ga=function(a){return" "+a+" "},Ha=Date.now||function(){return+new Date},Ia=function(a,b){return a.frame-b.frame},Ja=0,Ka=1,La="down",Ma=-1,Na=Ha(),Oa=0,Pa=0,Qa=!1,Ra=0,Sa=!1,Ta=0,Ua=[];"function"==typeof define&&define.amd?define([],function(){return g}):"undefined"!=typeof module&&module.exports?module.exports=g:a.skrollr=g}(window,document);
}());
;
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(count){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + count;
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
;
(function($){

$.scrollLock = ( function scrollLockClosure() {
    'use strict';

    var $html      = $( 'html' ),
        // State: unlocked by default
        locked     = false,
        // State: scroll to revert to
        prevScroll = {
            scrollLeft : $( window ).scrollLeft(),
            scrollTop  : $( window ).scrollTop()
        },
        // State: styles to revert to
        prevStyles = {},
        lockStyles = {
            'overflow-y' : 'scroll',
            'position'   : 'fixed',
            'width'      : '100%'
        };

    // Instantiate cache in case someone tries to unlock before locking
    saveStyles();

    // Save context's inline styles in cache
    function saveStyles() {
        var styleAttr = $html.attr( 'style' ),
            styleStrs = [],
            styleHash = {};

        if( !styleAttr ){
            return;
        }

        styleStrs = styleAttr.split( /;\s/ );

        $.each( styleStrs, function serializeStyleProp( styleString ){
            if( !styleString ) {
                return;
            }

            var keyValue = styleString.split( /\s:\s/ );

            if( keyValue.length < 2 ) {
                return;
            }

            styleHash[ keyValue[ 0 ] ] = keyValue[ 1 ];
        } );

        $.extend( prevStyles, styleHash );
    }

    function lock() {
        var appliedLock = {};

        // Duplicate execution will break DOM statefulness
        if( locked ) {
            return;
        }

        // Save scroll state...
        prevScroll = {
            scrollLeft : $( window ).scrollLeft(),
            scrollTop  : $( window ).scrollTop()
        };

        // ...and styles
        saveStyles();

        // Compose our applied CSS
        $.extend( appliedLock, lockStyles, {
            // And apply scroll state as styles
            'left' : - prevScroll.scrollLeft + 'px',
            'top'  : - prevScroll.scrollTop  + 'px'
        } );

        // Then lock styles...
        $html.css( appliedLock );

        // ...and scroll state
        $( window )
            .scrollLeft( 0 )
            .scrollTop( 0 );

        locked = true;
    }

    function unlock() {
        // Duplicate execution will break DOM statefulness
        if( !locked ) {
            return;
        }

        // Revert styles
        $html.attr( 'style', $( '<x>' ).css( prevStyles ).attr( 'style' ) || '' );

        // Revert scroll values
        $( window )
            .scrollLeft( prevScroll.scrollLeft )
            .scrollTop(  prevScroll.scrollTop );

        locked = false;
    }

    return function scrollLock( on ) {
        // If an argument is passed, lock or unlock depending on truthiness
        if( arguments.length ) {
            if( on ) {
                lock();
            }
            else {
                unlock();
            }
        }
        // Otherwise, toggle
        else {
            if( locked ){
                unlock();
            }
            else {
                lock();
            }
        }
    };
}() );

})(jQuery);;
// $('.arrow').panelArrow('.parent')

;(function($){
	
	function arrow($el, $parent) {
	  var arrows = [];
	  arrows.push($el);
	  arrows.push(arrows[0].clone());
	  arrows[1].insertAfter(arrows[0]);
	  var currentArrow = 0;
	  var previousArrow = 1;

	  $el.closest($parent).mouseenter(function() {
	    nextArrow();
	    var prev = arrows[previousArrow];
	    var curr = arrows[currentArrow];
	    prev.removeClass('rollout');
	    curr.addClass('rollover');
	  }).mouseleave(function() {
	    var prev = arrows[previousArrow];
	    var curr = arrows[currentArrow];
	    arrows[0].removeClass('rollover');
	    arrows[1].removeClass('rollover');
	    curr.addClass('rollout');
	  });

	  function nextArrow() {
	    if(currentArrow === 0){
	      currentArrow = 1;
	      previousArrow = 0;
	    } else {
	      currentArrow = 0;
	      previousArrow = 1;
	    }
	  }
	};
	
	$.fn.panelArrow = function(parent) {
		return this.each(function() {
			if(!$.data(this, "plugin_panelArrow")) {
				$.data(this, "plugin_panelArrow", new arrow($(this), $(parent)));
			}
		});
	}
	
})(jQuery);
;
(function ($) {
  $(document).ready(function(){

    var navbar = $('#navbar');
    var menu = $('#tb-megamenu-main-menu');
    var bm = $('.view-menu-beer-carousel');
    var bmc = bm.find('.view-content');
    var beers = bm.find('.beer');
    var advance = true;

    // Add class to menu for darkening on active
    menu.hover(function(){
      navbar.addClass('focused');
    }, function(){
      navbar.removeClass('focused');
    });

    //Create a close button for each dropdown
    menu.find('.dropdown-menu').append('<a href="" class="close-button"><i class="icon-cancel-1"></i><span class="sr-only">Close Menu</span></a>');
    menu.find('.close-button').click(function(e){
      e.preventDefault();
      $('#navbar').removeClass('dropdown-open');
      $('.tb-megamenu-item.open').addClass('animating').removeClass('open');
    })

    // Add navigation elements to beer carousel
    var nav_back = $('<span class="beer-menu-back disabled"><i class="icon-left-open-big"></i></span>').click(function(e){
      e.preventDefault();
      advance = false;
      scrollNav();
    });
    var nav_forward = $('<span class="beer-menu-forward"><i class="icon-right-open-big"></i></span>').click(function(e){
      e.preventDefault();
      advance = true;
      scrollNav();
    });
    bm.append(nav_back, nav_forward);

    // Handle hover on beers.
    beers.mouseenter(function(){
      if (!$(this).hasClass('open')) {
        beers.removeClass('open');
        $(this).addClass('open');
      }
    });
    // Start with first beer open.
    beers.first().addClass('open');

    // Add category filter to beer carousel
    var beer_categories = {all:'Todos los lanzamientos...'};
    var beer_filter = $('<div class="beer-menu-filter-wrapper"></div>')
      .append('<div class="controls"><i class="icon-down-open"></i><i class="icon-cancel"></i>\
        <span class="filter">SHOWING: <span class="selected-filter">Todos los lanzamientos...</span></span>\
        </div>').hover(function(){ $(this).addClass('open'); }, function(){ $(this).removeClass('open'); });
    var beer_filters = $('<div class="filters"></div>');
    // Reset Filter option
    $('<a href="#">Todos los lanzamientos...</a>').click(function(e){
      e.preventDefault();
      bmc.find('.views-group').show();
      beer_filter.find('.selected-filter').text('Todos los lanzamientos...');
      beer_filter.removeClass('open');
    }).appendTo(beer_filters);
    // Add links to filters for each group.
    bmc.find('.views-group').each(function(i, e){
      var group = $(this);
      var group_title = $(this).find('.group-title').text();
      var group_id = $(this).attr('id');
      var filter = $('<a href="#">' + group_title + '</a>').click(function(e){
        e.preventDefault();
        beer_filter.find('.selected-filter').text(group_title);
        bmc.css({left: 0});
        group.show();
        bmc.find('.views-group').not(group).hide();
        beer_filter.removeClass('open');
        group.find('.beer').first().trigger('mouseenter');
      }).appendTo(beer_filters);
    });
    // Add filters to wrapper
    var beer_filter_reveal = $('<div class="reveal"></div>').append(beer_filters).append('<a href="/beers" class="overview arrow">NUESTRAS CERVEZAS<i class="icon-arrow-right"></i></a>')
    beer_filter.append(beer_filter_reveal);
    bm.append(beer_filter);

    // Move bg image on bean-link-block up to the megamenu wrapper
    $('.tb-megamenu .tb-megamenu-column.span4:first-child() .bean-link-block').each(function(i, element){
      var bean_bg = $(element).css('background-image');
      if (bean_bg.length) {
        $(element).css('background-image', '');
        $(element).parents('.tb-megamenu-column.span4').css('background-image', bean_bg);
      }
    });

    // Change bg image on bistro view
    var bg_images = [];
    $('#block-views-menu-visit-bistros-block .panel-collapse').each(function(i, elem){
      var bg_image_field = $(this).find('.views-field-field-banner-background-image').text();
      var bg_image = $('<div style="background-image: url(' + bg_image_field + ')" class="bistro-bg bistro-bg-'+ i +'" />');
      bg_images.push(bg_image);
      if (i === 0) {
        // bg_image.addClass('active');
      }
      $(this).parents('.tb-megamenu-column.span4').append(bg_image);
      $(this).on('show.bs.collapse', function (e) {
        for (var i = 0; i < bg_images.length; i++) {
          if (bg_images[i] == bg_image) {
            bg_images[i].addClass('active');
          } else {
            bg_images[i].removeClass('active');
          }
        };
      });
    });


    // Make views accordions activate on hover ans start with thier first option open.
    $('.clear-accordion .views-bootstrap-accordion-plugin-style .accordion-toggle').mouseenter(function(e){
      var thisdiv = jQuery(this).attr("href")
      if (!$(thisdiv).hasClass('in')) {
        $(this).click();
      }
    });

    //Create a link for users to click
    $('.clear-accordion .views-bootstrap-accordion-plugin-style .panel').each(function(){
      var panelLink = $(this).find('.panel-collapse .field-content a').attr('href');
      var panelHeading = $(this).find('.panel-heading h4').text();
      $('<a href="' + panelLink + '" class="link-wrapper"><span class="sr-only">' + panelHeading + '</span></a>').prependTo($(this));
    })

   // $('.clear-accordion .views-bootstrap-accordion-plugin-style .accordion-toggle:first-child').click();

    // Dates for bistros & stores
    var $hours_field = $('.tb-megamenu .views-bootstrap-accordion-plugin-style .views-field-field-hours-of-operation');
    var currentDay = moment().day();
    $hours_field.each(function(){
      var $field = $(this);
      $field.find('.oh-display').each(function(i, day){
        if (i == currentDay) {
          var times = $(day).find('.oh-display-hours').text().split('-');
          var opening = moment(times[0], "HH:mm");
          var closing = moment(times[1], "HH:mm");
          $field.find('.views-label-field-hours-of-operation')
            .append('<span class="todays-hours">' + opening.format('h:mm a') + ' - ' + closing.format('h:mm a') + '</span>')
        }
        $(day).hide();
      });
    });

    // Titles need hr on some views
    $('#block-views-menu-visit-stores-block h2.block-title, #block-views-menu-visit-stores-block--2 h2.block-title, #block-views-menu-visit-bistros-block h2.block-title').append('<hr>');


    /**
     * Functions
     */

    scrollNav = function(){
      var bmW = bm.width();
      var bmcW = 180; // 90px space on each side
      var currentOffset = bmc.offset().left;
      bmc.find('.views-group').each(function(i, e){
        bmcW += $(this).width() + 70;
      });

      // Travel half of the menu width on each click.
      var left = Math.floor(bmW / 2);

      // Check to see if distance would carry us over the beginning/end
      if (advance) {
        left = currentOffset - left;
        nav_back.removeClass('disabled');
        if (left - bmW < -bmcW) {
          left = bmW - bmcW;
          nav_forward.addClass('disabled');
        }
      } else {
        nav_forward.removeClass('disabled');
        left = left + currentOffset;
        if (left > 0) {
          nav_back.addClass('disabled');
          left = 0
        }
      }

      // Animate menu left
      bmc.stop().animate({
        left: left + 'px',
      }, 300);
    }

  });
})(jQuery);
;
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
(e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
[this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
!1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
(a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
!0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
!1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
"function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
!1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
(c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
[d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
"px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);;
/* Placeholders.js v4.0.1 */
/*!
 * The MIT License
 *
 * Copyright (c) 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
!function(a){"use strict";function b(){}function c(){try{return document.activeElement}catch(a){}}function d(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return!0;return!1}function e(a,b,c){return a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):void 0}function f(a,b){var c;a.createTextRange?(c=a.createTextRange(),c.move("character",b),c.select()):a.selectionStart&&(a.focus(),a.setSelectionRange(b,b))}function g(a,b){try{return a.type=b,!0}catch(c){return!1}}function h(a,b){if(a&&a.getAttribute(B))b(a);else for(var c,d=a?a.getElementsByTagName("input"):N,e=a?a.getElementsByTagName("textarea"):O,f=d?d.length:0,g=e?e.length:0,h=f+g,i=0;h>i;i++)c=f>i?d[i]:e[i-f],b(c)}function i(a){h(a,k)}function j(a){h(a,l)}function k(a,b){var c=!!b&&a.value!==b,d=a.value===a.getAttribute(B);if((c||d)&&"true"===a.getAttribute(C)){a.removeAttribute(C),a.value=a.value.replace(a.getAttribute(B),""),a.className=a.className.replace(A,"");var e=a.getAttribute(I);parseInt(e,10)>=0&&(a.setAttribute("maxLength",e),a.removeAttribute(I));var f=a.getAttribute(D);return f&&(a.type=f),!0}return!1}function l(a){var b=a.getAttribute(B);if(""===a.value&&b){a.setAttribute(C,"true"),a.value=b,a.className+=" "+z;var c=a.getAttribute(I);c||(a.setAttribute(I,a.maxLength),a.removeAttribute("maxLength"));var d=a.getAttribute(D);return d?a.type="text":"password"===a.type&&g(a,"text")&&a.setAttribute(D,"password"),!0}return!1}function m(a){return function(){P&&a.value===a.getAttribute(B)&&"true"===a.getAttribute(C)?f(a,0):k(a)}}function n(a){return function(){l(a)}}function o(a){return function(){i(a)}}function p(a){return function(b){return v=a.value,"true"===a.getAttribute(C)&&v===a.getAttribute(B)&&d(x,b.keyCode)?(b.preventDefault&&b.preventDefault(),!1):void 0}}function q(a){return function(){k(a,v),""===a.value&&(a.blur(),f(a,0))}}function r(a){return function(){a===c()&&a.value===a.getAttribute(B)&&"true"===a.getAttribute(C)&&f(a,0)}}function s(a){var b=a.form;b&&"string"==typeof b&&(b=document.getElementById(b),b.getAttribute(E)||(e(b,"submit",o(b)),b.setAttribute(E,"true"))),e(a,"focus",m(a)),e(a,"blur",n(a)),P&&(e(a,"keydown",p(a)),e(a,"keyup",q(a)),e(a,"click",r(a))),a.setAttribute(F,"true"),a.setAttribute(B,T),(P||a!==c())&&l(a)}var t=document.createElement("input"),u=void 0!==t.placeholder;if(a.Placeholders={nativeSupport:u,disable:u?b:i,enable:u?b:j},!u){var v,w=["text","search","url","tel","email","password","number","textarea"],x=[27,33,34,35,36,37,38,39,40,8,46],y="#ccc",z="placeholdersjs",A=new RegExp("(?:^|\\s)"+z+"(?!\\S)"),B="data-placeholder-value",C="data-placeholder-active",D="data-placeholder-type",E="data-placeholder-submit",F="data-placeholder-bound",G="data-placeholder-focus",H="data-placeholder-live",I="data-placeholder-maxlength",J=100,K=document.getElementsByTagName("head")[0],L=document.documentElement,M=a.Placeholders,N=document.getElementsByTagName("input"),O=document.getElementsByTagName("textarea"),P="false"===L.getAttribute(G),Q="false"!==L.getAttribute(H),R=document.createElement("style");R.type="text/css";var S=document.createTextNode("."+z+" {color:"+y+";}");R.styleSheet?R.styleSheet.cssText=S.nodeValue:R.appendChild(S),K.insertBefore(R,K.firstChild);for(var T,U,V=0,W=N.length+O.length;W>V;V++)U=V<N.length?N[V]:O[V-N.length],T=U.attributes.placeholder,T&&(T=T.nodeValue,T&&d(w,U.type)&&s(U));var X=setInterval(function(){for(var a=0,b=N.length+O.length;b>a;a++)U=a<N.length?N[a]:O[a-N.length],T=U.attributes.placeholder,T?(T=T.nodeValue,T&&d(w,U.type)&&(U.getAttribute(F)||s(U),(T!==U.getAttribute(B)||"password"===U.type&&!U.getAttribute(D))&&("password"===U.type&&!U.getAttribute(D)&&g(U,"text")&&U.setAttribute(D,"password"),U.value===U.getAttribute(B)&&(U.value=T),U.setAttribute(B,T)))):U.getAttribute(C)&&(k(U),U.removeAttribute(B));Q||clearInterval(X)},J);e(a,"beforeunload",function(){M.disable()})}}(this);;
/*! flipclock 2015-01-19 */
var Base=function(){};Base.extend=function(a,b){"use strict";var c=Base.prototype.extend;Base._prototyping=!0;var d=new this;c.call(d,a),d.base=function(){},delete Base._prototyping;var e=d.constructor,f=d.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==f)this._constructing=!0,e.apply(this,arguments),delete this._constructing;else if(null!==arguments[0])return(arguments[0].extend||c).call(arguments[0],d)};return f.ancestor=this,f.extend=this.extend,f.forEach=this.forEach,f.implement=this.implement,f.prototype=d,f.toString=this.toString,f.valueOf=function(a){return"object"==a?f:e.valueOf()},c.call(f,b),"function"==typeof f.init&&f.init(),f},Base.prototype={extend:function(a,b){if(arguments.length>1){var c=this[a];if(c&&"function"==typeof b&&(!c.valueOf||c.valueOf()!=b.valueOf())&&/\bbase\b/.test(b)){var d=b.valueOf();b=function(){var a=this.base||Base.prototype.base;this.base=c;var b=d.apply(this,arguments);return this.base=a,b},b.valueOf=function(a){return"object"==a?b:d},b.toString=Base.toString}this[a]=b}else if(a){var e=Base.prototype.extend;Base._prototyping||"function"==typeof this||(e=this.extend||e);for(var f={toSource:null},g=["constructor","toString","valueOf"],h=Base._prototyping?0:1;i=g[h++];)a[i]!=f[i]&&e.call(this,i,a[i]);for(var i in a)f[i]||e.call(this,i,a[i])}return this}},Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,b,c){for(var d in a)void 0===this.prototype[d]&&b.call(c,a[d],d,a)},implement:function(){for(var a=0;a<arguments.length;a++)"function"==typeof arguments[a]?arguments[a](this.prototype):this.prototype.extend(arguments[a]);return this},toString:function(){return String(this.valueOf())}});var FlipClock;!function(a){"use strict";FlipClock=function(a,b,c){return b instanceof Object&&b instanceof Date==!1&&(c=b,b=0),new FlipClock.Factory(a,b,c)},FlipClock.Lang={},FlipClock.Base=Base.extend({buildDate:"2014-12-12",version:"0.7.7",constructor:function(b,c){"object"!=typeof b&&(b={}),"object"!=typeof c&&(c={}),this.setOptions(a.extend(!0,{},b,c))},callback:function(a){if("function"==typeof a){for(var b=[],c=1;c<=arguments.length;c++)arguments[c]&&b.push(arguments[c]);a.apply(this,b)}},log:function(a){window.console&&console.log&&console.log(a)},getOption:function(a){return this[a]?this[a]:!1},getOptions:function(){return this},setOption:function(a,b){this[a]=b},setOptions:function(a){for(var b in a)"undefined"!=typeof a[b]&&this.setOption(b,a[b])}})}(jQuery),function(a){"use strict";FlipClock.Face=FlipClock.Base.extend({autoStart:!0,dividers:[],factory:!1,lists:[],constructor:function(a,b){this.dividers=[],this.lists=[],this.base(b),this.factory=a},build:function(){this.autoStart&&this.start()},createDivider:function(b,c,d){"boolean"!=typeof c&&c||(d=c,c=b);var e=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join("");d&&(e=""),b=this.factory.localize(b);var f=['<span class="'+this.factory.classes.divider+" "+(c?c:"").toLowerCase()+'">','<span class="'+this.factory.classes.label+'">'+(b?b:"")+"</span>",e,"</span>"],g=a(f.join(""));return this.dividers.push(g),g},createList:function(a,b){"object"==typeof a&&(b=a,a=0);var c=new FlipClock.List(this.factory,a,b);return this.lists.push(c),c},reset:function(){this.factory.time=new FlipClock.Time(this.factory,this.factory.original?Math.round(this.factory.original):0,{minimumDigits:this.factory.minimumDigits}),this.flip(this.factory.original,!1)},appendDigitToClock:function(a){a.$el.append(!1)},addDigit:function(a){var b=this.createList(a,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}});this.appendDigitToClock(b)},start:function(){},stop:function(){},autoIncrement:function(){this.factory.countdown?this.decrement():this.increment()},increment:function(){this.factory.time.addSecond()},decrement:function(){0==this.factory.time.getTimeSeconds()?this.factory.stop():this.factory.time.subSecond()},flip:function(b,c){var d=this;a.each(b,function(a,b){var e=d.lists[a];e?(c||b==e.digit||e.play(),e.select(b)):d.addDigit(b)})}})}(jQuery),function(a){"use strict";FlipClock.Factory=FlipClock.Base.extend({animationRate:1e3,autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:"flip-clock-active",before:"flip-clock-before",divider:"flip-clock-divider",dot:"flip-clock-dot",label:"flip-clock-label",flip:"flip",play:"play",wrapper:"flip-clock-wrapper"},clockFace:"HourlyCounter",countdown:!1,defaultClockFace:"HourlyCounter",defaultLanguage:"english",$el:!1,face:!0,lang:!1,language:"english",minimumDigits:0,original:!1,running:!1,time:!1,timer:!1,$wrapper:!1,constructor:function(b,c,d){d||(d={}),this.lists=[],this.running=!1,this.base(d),this.$el=a(b).addClass(this.classes.wrapper),this.$wrapper=this.$el,this.original=c instanceof Date?c:c?Math.round(c):0,this.time=new FlipClock.Time(this,this.original,{minimumDigits:this.minimumDigits,animationRate:this.animationRate}),this.timer=new FlipClock.Timer(this,d),this.loadLanguage(this.language),this.loadClockFace(this.clockFace,d),this.autoStart&&this.start()},loadClockFace:function(a,b){var c,d="Face",e=!1;return a=a.ucfirst()+d,this.face.stop&&(this.stop(),e=!0),this.$el.html(""),this.time.minimumDigits=this.minimumDigits,c=FlipClock[a]?new FlipClock[a](this,b):new FlipClock[this.defaultClockFace+d](this,b),c.build(),this.face=c,e&&this.start(),this.face},loadLanguage:function(a){var b;return b=FlipClock.Lang[a.ucfirst()]?FlipClock.Lang[a.ucfirst()]:FlipClock.Lang[a]?FlipClock.Lang[a]:FlipClock.Lang[this.defaultLanguage],this.lang=b},localize:function(a,b){var c=this.lang;if(!a)return null;var d=a.toLowerCase();return"object"==typeof b&&(c=b),c&&c[d]?c[d]:a},start:function(a){var b=this;b.running||b.countdown&&!(b.countdown&&b.time.time>0)?b.log("Trying to start timer when countdown already at 0"):(b.face.start(b.time),b.timer.start(function(){b.flip(),"function"==typeof a&&a()}))},stop:function(a){this.face.stop(),this.timer.stop(a);for(var b in this.lists)this.lists.hasOwnProperty(b)&&this.lists[b].stop()},reset:function(a){this.timer.reset(a),this.face.reset()},setTime:function(a){this.time.time=a,this.flip(!0)},getTime:function(){return this.time},setCountdown:function(a){var b=this.running;this.countdown=a?!0:!1,b&&(this.stop(),this.start())},flip:function(a){this.face.flip(!1,a)}})}(jQuery),function(a){"use strict";FlipClock.List=FlipClock.Base.extend({digit:0,classes:{active:"flip-clock-active",before:"flip-clock-before",flip:"flip"},factory:!1,$el:!1,$obj:!1,items:[],lastDigit:0,constructor:function(a,b){this.factory=a,this.digit=b,this.lastDigit=b,this.$el=this.createList(),this.$obj=this.$el,b>0&&this.select(b),this.factory.$el.append(this.$el)},select:function(a){if("undefined"==typeof a?a=this.digit:this.digit=a,this.digit!=this.lastDigit){var b=this.$el.find("."+this.classes.before).removeClass(this.classes.before);this.$el.find("."+this.classes.active).removeClass(this.classes.active).addClass(this.classes.before),this.appendListItem(this.classes.active,this.digit),b.remove(),this.lastDigit=this.digit}},play:function(){this.$el.addClass(this.factory.classes.play)},stop:function(){var a=this;setTimeout(function(){a.$el.removeClass(a.factory.classes.play)},this.factory.timer.interval)},createListItem:function(a,b){return['<li class="'+(a?a:"")+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>",'<div class="down">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>","</a>","</li>"].join("")},appendListItem:function(a,b){var c=this.createListItem(a,b);this.$el.append(c)},createList:function(){var b=this.getPrevDigit()?this.getPrevDigit():this.digit,c=a(['<ul class="'+this.classes.flip+" "+(this.factory.running?this.factory.classes.play:"")+'">',this.createListItem(this.classes.before,b),this.createListItem(this.classes.active,this.digit),"</ul>"].join(""));return c},getNextDigit:function(){return 9==this.digit?0:this.digit+1},getPrevDigit:function(){return 0==this.digit?9:this.digit-1}})}(jQuery),function(a){"use strict";String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)},a.fn.FlipClock=function(b,c){return new FlipClock(a(this),b,c)},a.fn.flipClock=function(b,c){return a.fn.FlipClock(b,c)}}(jQuery),function(a){"use strict";FlipClock.Time=FlipClock.Base.extend({time:0,factory:!1,minimumDigits:0,constructor:function(a,b,c){"object"!=typeof c&&(c={}),c.minimumDigits||(c.minimumDigits=a.minimumDigits),this.base(c),this.factory=a,b&&(this.time=b)},convertDigitsToArray:function(a){var b=[];a=a.toString();for(var c=0;c<a.length;c++)a[c].match(/^\d*$/g)&&b.push(a[c]);return b},digit:function(a){var b=this.toString(),c=b.length;return b[c-a]?b[c-a]:!1},digitize:function(b){var c=[];if(a.each(b,function(a,b){b=b.toString(),1==b.length&&(b="0"+b);for(var d=0;d<b.length;d++)c.push(b.charAt(d))}),c.length>this.minimumDigits&&(this.minimumDigits=c.length),this.minimumDigits>c.length)for(var d=c.length;d<this.minimumDigits;d++)c.unshift("0");return c},getDateObject:function(){return this.time instanceof Date?this.time:new Date((new Date).getTime()+1e3*this.getTimeSeconds())},getDayCounter:function(a){var b=[this.getDays(),this.getHours(!0),this.getMinutes(!0)];return a&&b.push(this.getSeconds(!0)),this.digitize(b)},getDays:function(a){var b=this.getTimeSeconds()/60/60/24;return a&&(b%=7),Math.floor(b)},getHourCounter:function(){var a=this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)]);return a},getHourly:function(){return this.getHourCounter()},getHours:function(a){var b=this.getTimeSeconds()/60/60;return a&&(b%=24),Math.floor(b)},getMilitaryTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject());var c=[a.getHours(),a.getMinutes()];return b===!0&&c.push(a.getSeconds()),this.digitize(c)},getMinutes:function(a){var b=this.getTimeSeconds()/60;return a&&(b%=60),Math.floor(b)},getMinuteCounter:function(){var a=this.digitize([this.getMinutes(),this.getSeconds(!0)]);return a},getTimeSeconds:function(a){return a||(a=new Date),this.time instanceof Date?this.factory.countdown?Math.max(this.time.getTime()/1e3-a.getTime()/1e3,0):a.getTime()/1e3-this.time.getTime()/1e3:this.time},getTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject()),console.log(a);var c=a.getHours(),d=[c>12?c-12:0===c?12:c,a.getMinutes()];return b===!0&&d.push(a.getSeconds()),this.digitize(d)},getSeconds:function(a){var b=this.getTimeSeconds();return a&&(60==b?b=0:b%=60),Math.ceil(b)},getWeeks:function(a){var b=this.getTimeSeconds()/60/60/24/7;return a&&(b%=52),Math.floor(b)},removeLeadingZeros:function(b,c){var d=0,e=[];return a.each(c,function(a){b>a?d+=parseInt(c[a],10):e.push(c[a])}),0===d?e:c},addSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()+a):this.time+=a},addSecond:function(){this.addSeconds(1)},subSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()-a):this.time-=a},subSecond:function(){this.subSeconds(1)},toString:function(){return this.getTimeSeconds().toString()}})}(jQuery),function(){"use strict";FlipClock.Timer=FlipClock.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1e3,animationRate:1e3,constructor:function(a,b){this.base(b),this.factory=a,this.callback(this.callbacks.init),this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(a){clearInterval(this.timer),this.count=0,this._setInterval(a),this.callback(this.callbacks.reset)},start:function(a){this.factory.running=!0,this._createTimer(a),this.callback(this.callbacks.start)},stop:function(a){this.factory.running=!1,this._clearInterval(a),this.callback(this.callbacks.stop),this.callback(a)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(a){this._setInterval(a)},_destroyTimer:function(a){this._clearInterval(),this.timer=!1,this.callback(a),this.callback(this.callbacks.destroy)},_interval:function(a){this.callback(this.callbacks.interval),this.callback(a),this.count++},_setInterval:function(a){var b=this;b._interval(a),b.timer=setInterval(function(){b._interval(a)},this.interval)}})}(jQuery),function(a){FlipClock.TwentyFourHourClockFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul");this.factory.time.time||(this.factory.original=new Date,this.factory.time=new FlipClock.Time(this.factory,this.factory.original));var b=b?b:this.factory.time.getMilitaryTime(!1,this.showSeconds);b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.createDivider(),this.createDivider(),a(this.dividers[0]).insertBefore(this.lists[this.lists.length-2].$el),a(this.dividers[1]).insertBefore(this.lists[this.lists.length-4].$el),this.base()},flip:function(a,b){this.autoIncrement(),a=a?a:this.factory.time.getMilitaryTime(!1,this.showSeconds),this.base(a,b)}})}(jQuery),function(a){FlipClock.CounterFace=FlipClock.Face.extend({shouldAutoIncrement:!1,constructor:function(a,b){"object"!=typeof b&&(b={}),a.autoStart=b.autoStart?!0:!1,b.autoStart&&(this.shouldAutoIncrement=!0),a.increment=function(){a.countdown=!1,a.setTime(a.getTime().getTimeSeconds()+1)},a.decrement=function(){a.countdown=!0;var b=a.getTime().getTimeSeconds();b>0&&a.setTime(b-1)},a.setValue=function(b){a.setTime(b)},a.setCounter=function(b){a.setTime(b)},this.base(a,b)},build:function(){var b=this,c=this.factory.$el.find("ul"),d=this.factory.getTime().digitize([this.factory.getTime().time]);d.length>c.length&&a.each(d,function(a,c){var d=b.createList(c);d.select(c)}),a.each(this.lists,function(a,b){b.play()}),this.base()},flip:function(a,b){this.shouldAutoIncrement&&this.autoIncrement(),a||(a=this.factory.getTime().digitize([this.factory.getTime().time])),this.base(a,b)},reset:function(){this.factory.time=new FlipClock.Time(this.factory,this.factory.original?Math.round(this.factory.original):0),this.flip()}})}(jQuery),function(a){FlipClock.DailyCounterFace=FlipClock.Face.extend({showSeconds:!0,constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul"),e=0;b=b?b:this.factory.time.getDayCounter(this.showSeconds),b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.showSeconds?a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el):e=2,a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4+e].$el),a(this.createDivider("Hours")).insertBefore(this.lists[this.lists.length-6+e].$el),a(this.createDivider("Days",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getDayCounter(this.showSeconds)),this.autoIncrement(),this.base(a,b)}})}(jQuery),function(a){FlipClock.HourlyCounterFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b,c){var d=this,e=this.factory.$el.find("ul");c=c?c:this.factory.time.getHourCounter(),c.length>e.length&&a.each(c,function(a,b){d.createList(b)}),a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el),a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4].$el),b||a(this.createDivider("Hours",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getHourCounter()),this.autoIncrement(),this.base(a,b)},appendDigitToClock:function(a){this.base(a),this.dividers[0].insertAfter(this.dividers[0].next())}})}(jQuery),function(){FlipClock.MinuteCounterFace=FlipClock.HourlyCounterFace.extend({clearExcessDigits:!1,constructor:function(a,b){this.base(a,b)},build:function(){this.base(!0,this.factory.time.getMinuteCounter())},flip:function(a,b){a||(a=this.factory.time.getMinuteCounter()),this.base(a,b)}})}(jQuery),function(a){FlipClock.TwelveHourClockFace=FlipClock.TwentyFourHourClockFace.extend({meridium:!1,meridiumText:"AM",build:function(){var b=this.factory.time.getTime(!1,this.showSeconds);this.base(b),this.meridiumText=this.getMeridium(),this.meridium=a(['<ul class="flip-clock-meridium">',"<li>",'<a href="#">'+this.meridiumText+"</a>","</li>","</ul>"].join("")),this.meridium.insertAfter(this.lists[this.lists.length-1].$el)},flip:function(a,b){this.meridiumText!=this.getMeridium()&&(this.meridiumText=this.getMeridium(),this.meridium.find("a").html(this.meridiumText)),this.base(this.factory.time.getTime(!1,this.showSeconds),b)},getMeridium:function(){return(new Date).getHours()>=12?"PM":"AM"},isPM:function(){return"PM"==this.getMeridium()?!0:!1},isAM:function(){return"AM"==this.getMeridium()?!0:!1}})}(jQuery),function(){FlipClock.Lang.Arabic={years:"سنوات",months:"شهور",days:"أيام",hours:"ساعات",minutes:"دقائق",seconds:"ثواني"},FlipClock.Lang.ar=FlipClock.Lang.Arabic,FlipClock.Lang["ar-ar"]=FlipClock.Lang.Arabic,FlipClock.Lang.arabic=FlipClock.Lang.Arabic}(jQuery),function(){FlipClock.Lang.Danish={years:"År",months:"Måneder",days:"Dage",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.da=FlipClock.Lang.Danish,FlipClock.Lang["da-dk"]=FlipClock.Lang.Danish,FlipClock.Lang.danish=FlipClock.Lang.Danish}(jQuery),function(){FlipClock.Lang.German={years:"Jahre",months:"Monate",days:"Tage",hours:"Stunden",minutes:"Minuten",seconds:"Sekunden"},FlipClock.Lang.de=FlipClock.Lang.German,FlipClock.Lang["de-de"]=FlipClock.Lang.German,FlipClock.Lang.german=FlipClock.Lang.German}(jQuery),function(){FlipClock.Lang.English={years:"Years",months:"Months",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"},FlipClock.Lang.en=FlipClock.Lang.English,FlipClock.Lang["en-us"]=FlipClock.Lang.English,FlipClock.Lang.english=FlipClock.Lang.English}(jQuery),function(){FlipClock.Lang.Spanish={years:"A&#241;os",months:"Meses",days:"D&#205;as",hours:"Horas",minutes:"Minutos",seconds:"Segundo"},FlipClock.Lang.es=FlipClock.Lang.Spanish,FlipClock.Lang["es-es"]=FlipClock.Lang.Spanish,FlipClock.Lang.spanish=FlipClock.Lang.Spanish}(jQuery),function(){FlipClock.Lang.Finnish={years:"Vuotta",months:"Kuukautta",days:"Päivää",hours:"Tuntia",minutes:"Minuuttia",seconds:"Sekuntia"},FlipClock.Lang.fi=FlipClock.Lang.Finnish,FlipClock.Lang["fi-fi"]=FlipClock.Lang.Finnish,FlipClock.Lang.finnish=FlipClock.Lang.Finnish}(jQuery),function(){FlipClock.Lang.French={years:"Ans",months:"Mois",days:"Jours",hours:"Heures",minutes:"Minutes",seconds:"Secondes"},FlipClock.Lang.fr=FlipClock.Lang.French,FlipClock.Lang["fr-ca"]=FlipClock.Lang.French,FlipClock.Lang.french=FlipClock.Lang.French}(jQuery),function(){FlipClock.Lang.Italian={years:"Anni",months:"Mesi",days:"Giorni",hours:"Ore",minutes:"Minuti",seconds:"Secondi"},FlipClock.Lang.it=FlipClock.Lang.Italian,FlipClock.Lang["it-it"]=FlipClock.Lang.Italian,FlipClock.Lang.italian=FlipClock.Lang.Italian}(jQuery),function(){FlipClock.Lang.Latvian={years:"Gadi",months:"Mēneši",days:"Dienas",hours:"Stundas",minutes:"Minūtes",seconds:"Sekundes"},FlipClock.Lang.lv=FlipClock.Lang.Latvian,FlipClock.Lang["lv-lv"]=FlipClock.Lang.Latvian,FlipClock.Lang.latvian=FlipClock.Lang.Latvian}(jQuery),function(){FlipClock.Lang.Dutch={years:"Jaren",months:"Maanden",days:"Dagen",hours:"Uren",minutes:"Minuten",seconds:"Seconden"},FlipClock.Lang.nl=FlipClock.Lang.Dutch,FlipClock.Lang["nl-be"]=FlipClock.Lang.Dutch,FlipClock.Lang.dutch=FlipClock.Lang.Dutch}(jQuery),function(){FlipClock.Lang.Norwegian={years:"År",months:"Måneder",days:"Dager",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.no=FlipClock.Lang.Norwegian,FlipClock.Lang.nb=FlipClock.Lang.Norwegian,FlipClock.Lang["no-nb"]=FlipClock.Lang.Norwegian,FlipClock.Lang.norwegian=FlipClock.Lang.Norwegian}(jQuery),function(){FlipClock.Lang.Portuguese={years:"Anos",months:"Meses",days:"Dias",hours:"Horas",minutes:"Minutos",seconds:"Segundos"},FlipClock.Lang.pt=FlipClock.Lang.Portuguese,FlipClock.Lang["pt-br"]=FlipClock.Lang.Portuguese,FlipClock.Lang.portuguese=FlipClock.Lang.Portuguese}(jQuery),function(){FlipClock.Lang.Russian={years:"лет",months:"месяцев",days:"дней",hours:"часов",minutes:"минут",seconds:"секунд"},FlipClock.Lang.ru=FlipClock.Lang.Russian,FlipClock.Lang["ru-ru"]=FlipClock.Lang.Russian,FlipClock.Lang.russian=FlipClock.Lang.Russian}(jQuery),function(){FlipClock.Lang.Swedish={years:"År",months:"Månader",days:"Dagar",hours:"Timmar",minutes:"Minuter",seconds:"Sekunder"},FlipClock.Lang.sv=FlipClock.Lang.Swedish,FlipClock.Lang["sv-se"]=FlipClock.Lang.Swedish,FlipClock.Lang.swedish=FlipClock.Lang.Swedish}(jQuery),function(){FlipClock.Lang.Chinese={years:"年",months:"月",days:"日",hours:"时",minutes:"分",seconds:"秒"},FlipClock.Lang.zh=FlipClock.Lang.Chinese,FlipClock.Lang["zh-cn"]=FlipClock.Lang.Chinese,FlipClock.Lang.chinese=FlipClock.Lang.Chinese}(jQuery);
;
(function ($) {
	$(document).ready(function(){

		// Common vars
		var $body = $('body');
		var wh = $(window).height();
		var ua = navigator.userAgent, event = (ua.match(/iPad/i)) ? "touchstart" : "click";

		// Init Skrollr
		var skrol = skrollr.init({
			forceHeight: false,
			constants: {
				wh: function(){ return $(window).height(); }
			},
			mobileCheck: function() {
				return false;
			}
		});

		//if device is having issues with scrolling banners add device to list
		//this will prevent scrolling banners
		if((/iPad/i).test(navigator.userAgent || navigator.vendor || window.opera)){
			$body.addClass('fixedBanners');
		}

		if ($(window).width() > 650) {
			$('#skrollr-body h1,#skrollr-body h2,#skrollr-body h3,#skrollr-body h4,#skrollr-body li:empty,#skrollr-body p,#skrollr-body .event-title a').each(function() {
				$(this).html($(this).html().replace(/\s((?=(([^\s<>]|<[^>]*>)+))\2)\s*$/,'&nbsp;$1'));
			});
		}
		
		//LNSU FLIP IT OVER
//		var lnsu_url= window.location.href;
//		function flipIt() {
//			$body.addClass("flip-me");
//			$('html, body').scrollTop($(document).height());
//		}
//		if ( window.location.pathname == '/' ){
//			if ($('#el-patas-age-gate').length == 0) {
//				flipIt();
//			} else if ($('#el-patas-age-gate').length > 0) {
//			// Reveal banner on age gate close
//			$(document).on('ageGateClosed', flipIt);
//			}
//		}

		if ($('body').hasClass('node-type-article')) { // for blog pages
			// Find all YouTube videos
			var $allVideos = $(".oembed-content iframe"),
				// The element that is fluid width
				$fluidEl = $("#article-content");
		} else if ($('body').hasClass('node-type-page')) { // for basic pages
			// Find all YouTube videos
			var $allVideos = $(".oembed-content iframe"),
				// The element that is fluid width
				$fluidEl = $(".field-name-field-copy-right-");
		} else if ($('body').hasClass('node-type-deluxe-page')) { // for deluxe pages
				// Find all YouTube videos
				var $allVideos = $(".oembed-content iframe"),
				// The element that is fluid width
				$fluidEl = $(".field-name-body");
		} else if ($('body').hasClass('node-type-question-answer')) { // for basic pages
			// Find all YouTube videos
			var $allVideos = $(".oembed-content iframe"),
				// The element that is fluid width
				$fluidEl = $(".field-name-field-description");
		} else if ($('body').hasClass('node-type-event')) { // for event pages
			// Find all YouTube videos
			var $allVideos = $(".oembed-content iframe"),
				// The element that is fluid width
				$fluidEl = $(".body-content");
		} else { // all others
			// Find all YouTube videos
			var $allVideos = $(".oembed-content iframe"),
				// The element that is fluid width
				$fluidEl = $("#article-content");
		}

		// Figure out and save aspect ratio for each video
		$allVideos.each(function() {
			$(this)
				.data('aspectRatio', this.height / this.width)

			// and remove the hard coded width/height
				.removeAttr('height')
				.removeAttr('width');
		});

		//init iframeresize for embedded content
		if ($('body').hasClass('node-type-page')) { // for basic pages
			$('iframe.resize').iFrameResize({});
		}

		/***************************
		*
		*   elpatas PRESS SECTION
		*
		***************************/

		if ($('body').hasClass('page-node-363046')) {
			$(".view-press-articles .news-block .press-content p").each (function () {
				if ($(this).text().length > 320)
					$(this).text($(this).text().substring(0,320) + '...');
			});
			$(".view-press-releases .news-block .press-content p").each (function () {
				if ($(this).text().length > 350)
					$(this).text($(this).text().substring(0,350) + '...');
			});
			$(".views-exposed-form #edit-combine").each (function() {
				$(this).attr("placeholder","Search");
			});
			$(document).ajaxComplete(function() {
				$(".view-press-articles .news-block .press-content p").each (function () {
				if ($(this).text().length > 320)
					$(this).text($(this).text().substring(0,320) + '...');
			});
			$(".view-press-releases .news-block .press-content p").each (function () {
				if ($(this).text().length > 350)
					$(this).text($(this).text().substring(0,350) + '...');
			});
			})
		}
		

		/***************************
		*
		*   elpatas HISTORY TIMELINE
		*
		***************************/

		if ($('body').hasClass('page-node-6476')) {
			$('body').attr("data-spy","scroll");
			$('body').scrollspy({ target: '#timeline-nav', offset: 201 });
			$('.make-me-big').click(function() {
				$(this).toggleClass("am-big");
			});
			var timelineBlocks = $('.cd-timeline-block'),
				offset = 0.8;

			//hide timeline blocks which are outside the viewport
			hideBlocks(timelineBlocks, offset);

			//on scolling, show/animate timeline blocks when enter the viewport
			$(window).on('scroll', function(){
				(!window.requestAnimationFrame)
					? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
				: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
			});
		}

		function hideBlocks(blocks, offset) {
			blocks.each(function(){
				( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.timeline-beacon, .cd-timeline-content').addClass('is-hidden');
			});
		}

		function showBlocks(blocks, offset) {
			blocks.each(function(){
				( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.timeline-beacon').hasClass('is-hidden') ) && $(this).find('.timeline-beacon, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			});
		}
		
		/***************************
		*
		*   elpatas MOBILE GROWLER FILL MENUS
		*
		***************************/
		
		if ($('body').hasClass('page-node-1057006')) {
			$('.available-fill.15061').each(function() {
				$(this).css("display","block");
			});
		}
		
		if ($('body').hasClass('page-node-1057011')) {
			$('.available-fill.15071').each(function() {
				$(this).css("display","block");
			});
		}
		
		if ($('body').hasClass('page-node-1059771')) {
			$('.available-fill.16241').each(function() {
				$(this).css("display","block");
			});
		}

		/***************************
		*
		*   elpatas BISTRO AND OUTPOST CODE
		*   Feb. 2016
		*
		***************************/

		if ($('body').hasClass('taxonomy-vocabulary-26')) {

			// disable skrolr on elpatas locations mobile
			if ($(window).width() < 767) {
				skrol.destroy();
			}

			$('.reservation-link.desktop-only.cbox').colorbox({
				iframe:true,
				width:'95%',
				height:'95%',
				maxWidth:825,
				maxHeight:600,
				fastIframe:false
			});

			$('.colorbox-inline').colorbox({
				onComplete : function() {
					$(this).colorbox.resize();
				}
			});

			// add scroll down icon
			$('.view-elpatas-location-info').append('<div class="scroll-down"><a href="#reservation"><i class="icon-down-open"><span class="sr-only">Go to content</span></i></a></div>');

			//scroll down on click
			$('.views-field-field-banner-logo img').click(function() {
				$('.scroll-down a').click();
			});

			// scroll down hover
			$('.views-field-field-banner-logo img').hover(function() {
				$('.scroll-down').addClass('hover');
			}, function() {
				$('.scroll-down').removeClass('hover');
			});

			// attach the submenu for bistro pages
			attachBistroSubmenu()

			$('.vocabulary-elpatas-locations .field-type-image .field-items').each(function(index) {
				$(this).owlCarousel({
					singleItem:true,
					autoPlay:($($(this)[0]).children().length > 1) ? true : false,
					transitionStyle : 'fade'
				});
			});

			$('.taxonomy-vocabulary-26 .view-upcoming-events-from-term .view-content').owlCarousel({
				items:4,
				scrollPerPage:true
			});

			if ($('.vocabulary-elpatas-locations .webform-component--date input').length > 0) {
				$('.vocabulary-elpatas-locations .webform-component--date input').datepicker();
				$('.taxonomy-vocabulary-26 #edit-submitted-date').after('<span class="glyphicon glyphicon-calendar"></span>');
			}
			/*
			// Show request info form on click
			$('.taxonomy-vocabulary-26 .request-info-form-toggle').click(function(e){
			e.preventDefault();
			$(this).toggleClass('toggled');
			$('#event-info-request-form').slideToggle({
			step:function(now) {
			if ($(window).width() > 768) {
			slideShowHeight()
			}
			}
			});
			});
			*/

			// Show request info form on click

			if ($(window).width() < 768) {
				$(document).ready(function(){
					$('#event-info-request-form').hide();
					$('.taxonomy-vocabulary-26 .request-info-form-toggle').toggleClass('toggled');
				});
			}
			$('.taxonomy-vocabulary-26 .request-info-form-toggle').click(function(e){
				e.preventDefault();
				$(this).toggleClass('toggled');
				$('#event-info-request-form').slideToggle({
					step:function(now) {
						if ($(window).width() > 768) {
							slideShowHeight()
						}
					}
				});
			});

			// reverse hover on bistro menu
			var bistroMenuAnchors = $('.taxonomy-vocabulary-26 #menu .view-location-menus');
			bistroMenuAnchors.find('a').hover(function(){
				bistroMenuAnchors.find('a').removeClass('dimmed').not($(this)).addClass('dimmed');
			}, function(){
				bistroMenuAnchors.find('a').removeClass('dimmed');
			});

		}


		//submenu on a bistro page
		function attachBistroSubmenu() {
			if($(window).width() > 768 && (!$("body").hasClass("logged-in"))){
				var start_open = true;
			}
			var bistro_menu = $('<div class="location-menu-navigation-wrapper ' + (start_open ? 'open' : '') + '"></div>')
			.append('<div class="controls"><span class="current">EXPLOREA</span> <i class="icon-sort"></i><i class="icon-cancel-1"></i></div>')
			.hover(function(){ $(this).addClass('open'); }, function(){ $(this).removeClass('open'); });

			// Add links for each section available.
			var bistro_menu_anchors = $('<div class="reveal"><a href="#skip-link">TOP</a></div>');

			var titles = {
				'reservation': 'Reservations / Menus',
				'bistro': 'Location Information',
				'location-events': 'Upcoming Events',
				'menu': 'Menus',
				'outpost': 'Store Information',
				'tab-current-fills': 'Growler Fills',
				'tab-upcoming-fills': 'Upcoming Fills',
				'flippy-mail-signup-form': 'Newsletter',
				'tab-private-events': 'Book An Event'
			};

			for (var id in titles) {
				if ($('#' + id).length > 0) {
					if (id == 'reservation' && $('#reservation .container').find('.reservation-empty').length == 1) {
						// don't include it
					} else if (id.indexOf("tab") >= 0) {
						$('<a href="#loc-tabs" id="anchor-' + id + '">' + titles[id] + '</a>').appendTo(bistro_menu_anchors);
					} else {
						$('<a href="#' + id + '" id="anchor-' + id + '">' + titles[id] + '</a>').appendTo(bistro_menu_anchors);
					}
				}
			}

			// Insert to dom
			bistro_menu_anchors.wrapInner('<div class="sections"></div>');
			bistro_menu.append(bistro_menu_anchors).appendTo('.breadcrumb-wrapper');

			// If we started with the local nav open, close it after a short while if not hovered.
			if (start_open) {
				setTimeout(function(e){
					if (!bistro_menu.is(':hover'))
						bistro_menu.removeClass('open');
				}, 2500);
			}

			// Reverse hover style
			bistro_menu_anchors.find('a').hover(function(){
				bistro_menu_anchors.find('a').removeClass('dimmed').not($(this)).addClass('dimmed');
			}, function(){
				bistro_menu_anchors.find('a').removeClass('dimmed');
			});
		}

		if ($('body').hasClass('node-type-bistro-menu')) {
			attachBistroMenuSubmenu();
		}

		//submenu on a bistro menu
		function attachBistroMenuSubmenu() {
			if($(window).width() > 768 && (!$("body").hasClass("logged-in"))){
				var start_open = true;
			}
			var location_menu = $('<div class="location-menu-navigation-wrapper ' + (start_open ? 'open' : '') + '"></div>')
			.append('<div class="controls"><span class="current">OTHER MENUS</span> <i class="icon-sort"></i><i class="icon-cancel-1"></i></div>')
			.hover(function(){ $(this).addClass('open'); }, function(){ $(this).removeClass('open'); });

			// Add links for each section available.
			var location_menu_anchors = $('<div class="reveal"></div>');

			var titles = $('.other-menus a');
			for (i = 0; i < titles.length; i++) {
				$(titles[i]).appendTo(location_menu_anchors);
			}
			// Insert to dom
			location_menu_anchors.wrapInner('<div class="sections"></div>');
			location_menu.append(location_menu_anchors).appendTo('.breadcrumb-wrapper');

			// If we started with the local nav open, close it after a short while if not hovered.
			if (start_open) {
				setTimeout(function(e){
					if (!location_menu.is(':hover'))
						location_menu.removeClass('open');
				}, 2500);
			}

			// Reverse hover style
			location_menu_anchors.find('a').hover(function(){
				location_menu_anchors.find('a').removeClass('dimmed').not($(this)).addClass('dimmed');
			}, function(){
				location_menu_anchors.find('a').removeClass('dimmed');
			});
		}


		// Set the height of the owl carousels on Bistro Pages
		function slideShowHeight(fixedHeight) {
			var slideShowTarget;
			if (fixedHeight) {
				$('.slideshow').each(function(index) {
					for (var i = 0; i < $(this).find('.owl-item').length; i++) {
						slideShowTarget = $($(this).find('.owl-item')[i]).children('.field-item');
						slideShowTarget.css('height', fixedHeight);
						slideShowTarget.children('.elpatas-bgimage').css('height', fixedHeight);
					}
				});
			} else {
				$('.slideshow').each(function(index) {
					var target;
					if ($(this).hasClass('slideshow-left')) {
						target = $(this).next('.col-md-6');
					} else {
						target = $(this).prev('.col-md-6');
					}
					var topPadding = parseInt(target.css('padding-top'));
					var bottomPadding = parseInt(target.css('padding-bottom'));
					for (var i = 0; i < $(this).find('.owl-item').length; i++) {
						slideShowTarget = $($(this).find('.owl-item')[i]).children('.field-item');
						slideShowTarget.css('height', target.height() + topPadding + bottomPadding);
						slideShowTarget.children('.elpatas-bgimage').css('height', target.height() + topPadding + bottomPadding);
					}
				});
			}
		}

		/* SMOOTH SCROLL FOR BISTRO MENUS */
		var contentSections = $('.cd-section'),
			navigationItems = $('#cd-vertical-nav a');

		updateNavigation();
		$(window).on('scroll', function() {
			updateNavigation();
		});

		//smooth scroll to the section
		navigationItems.on('click', function(event) {
			event.preventDefault();
			smoothScroll($(this.hash));
		});
		//smooth scroll to second section
		$('.cd-scroll-down').on('click', function(event) {
			event.preventDefault();
			smoothScroll($(this.hash));
		});

		//open-close navigation on touch devices
		$('.touch .cd-nav-trigger').on('click', function() {
			$('.touch #cd-vertical-nav').toggleClass('open');

		});
		//close navigation on touch devices when selectin an elemnt from the list
		$('.touch #cd-vertical-nav a').on('click', function() {
			$('.touch #cd-vertical-nav').removeClass('open');
		});

		function updateNavigation() {
			contentSections.each(function() {
				$this = $(this);
				var activeSection = $('#cd-vertical-nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;
				if (($this.offset().top - $(window).height() / 2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height() / 2 > $(window).scrollTop())) {
					navigationItems.eq(activeSection).addClass('is-selected');
				} else {
					navigationItems.eq(activeSection).removeClass('is-selected');
				}
			});
		}

		function smoothScroll(target) {
			$('body,html').animate({
				'scrollTop': target.offset().top
			},600);
		}
		/* END SMOOTH SCROLL FOR BISTRO MENUS */
		/***************************
		*
		*   elpatas BISTRO AND OUTPOST CODE END
		*
		***************************/

		// Init Fitvids
		$('.fitvid').fitVids();

		// Modalify messages
		$('.modal.messages').modal();

		// Reveal Banner if no age gate
		if ($('#el-patas-age-gate').length == 0) {
			revealRevealBanner();
		} else {
			// Reveal banner on age gate close
			$(document).on('ageGateClosed', revealRevealBanner);
		}

		// Homepage Panels Arrows
		$('.view-home-page-panels footer .arrow').panelArrow('.panel');
		$('.view-home-page-panels .panel-content .arrow').panelArrow('.panel');

		// Homepage Panels Clickable Area
		if($(window).width() > 768){
			$('.view-home-page-panels .views-row:contains("a")').addClass('clickable').not('a').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				window.location = $(this).find('a').first().attr('href');
			});
		}else{
			$('.view-home-page-panels .views-row .panel-content:contains("a")').addClass('clickable').not('a').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				window.location = $(this).find('a').first().attr('href');
			});
		}

		$('.view-home-page-panels .panel .panel-background').click(function(e){
			if(!$(this).hasClass('focus')){
				$(this).closest('.panel').addClass('focus').attr("tabindex",-1).focus();
			}
		});

		$('.view-home-page-panels .panel .close-panel').click(function(e){
			e.preventDefault();
			$(this).removeClass('focus');
			$(this).closest('.panel').removeClass('focus').blur();
		})

		// Event Item Arrows
		$('.page-events .col-sm-12 .arrow').panelArrow('.owl-item');
		$('.taxonomy-vocabulary-26 .col-sm-12 .arrow').panelArrow('.views-row a');
		$('.view-events-term-page-content .arrow').panelArrow('.views-row a');
		$('.view-bistros-overview .views-row .arrow').panelArrow('.views-row');

		// Blog Overview Arrows
		$('.view.blog-grid .reveal .arrow').panelArrow('.node-article.node-teaser');

		// search column overlay arrows
		$('.morphsearch .view-beers-for-search .views-row .arrow').panelArrow('.view-beers-for-search .views-row');
		$('.morphsearch .view-menu-featured-events .views-row .arrow').panelArrow('.view-menu-featured-events .views-row');
		$('.morphsearch .view-elpatas-blog-teaser-list .views-row .arrow').panelArrow('.view-elpatas-blog-teaser-list .views-row');

		// Override TBMegaMenu hambuger with our mobile menu functionality
		$('.navigation-toggle, #mobile-menu-overlay').click(function(e){
			e.preventDefault();
			$body.toggleClass('revealMobileMenu');
			$.scrollLock();
			return false;
		});

		// Close Mobile Menu on overlay click
		$('#mobile-menu-overlay, .revealMobileMenu .navigation-toggle').click(function(e){
			e.preventDefault();
			$body.removeClass('revealMobileMenu');
			/*  document.addEventListener('touchmove', function(e) {
e.preventDefault();
}, false); */
			$("html").removeAttr('style');

		});

		// Second level nav for reponsive mobile menu
		$('#mobile-menu-drawer li:has(ul) > a').append('<i class="icon-right-open"></i>');
		var childCount = 0;
		var menuX = 0;
		$('#mobile-menu-drawer').on('click', 'li:has(ul) > a', function(e){
			e.preventDefault();
			menuX -= 20;
			$('#mobile-menu-drawer .mobile-wrapper').css({transform:'translateX(' + menuX  +'%)'})

			// Grab UL for submenu items
			var submenu = $(this).next().clone();
			// Create back button and attach click event functionality
			var submenuBack = $('<a href="#" class="submenu-back"><i class="icon-left-open"></i> BACK</a>').click(function(e){
				e.preventDefault();
				var thisSubmenu = $(this).parents('.mobile-menu-secondary');
				menuX += 20;
				$('#mobile-menu-drawer .mobile-wrapper').css({transform:'translateX(' + menuX +'%)'})
				setTimeout(function(){thisSubmenu.removeClass('active')},750);

				childCount -= 1;
				return false;
			});
			// Append back and UL to container and insert into DOM.
			var submenuContainer = $('<div class="mobile-menu-secondary"></div>').append(submenuBack).append(submenu).wrapInner('<div class="mobile-menu-inner"></div>');
			submenuContainer.addClass('child-' + childCount).innerWidth(mobileDrawWidth);
			$('#mobile-menu-drawer .mobile-wrapper').append(submenuContainer);
			childCount += 1;
			// Add the class after the menu has been inserted into DOM for animations.
			setTimeout(function(){
				submenuContainer.addClass('active');
			}, 50);
		});

		$('#navbar .tb-megamenu-nav').hover(function(){
			$('#navbar').addClass('dropdown-open')
		},function(){
			$('#navbar').removeClass('dropdown-open');
		})

		$('#tb-megamenu-main-menu .dropdown .dropdown-toggle').on('touchstart',function(e){
			$(this).closest('.dropdown').addClass('open');
		});


		// Footer Sitemap
		$('#sitemap .sitemap-toggle').click(function(e){
			e.preventDefault();
			$body.toggleClass('revealSitemap');
			$('.footer').toggleClass('footer-zindex');
		});

		//look for class .arrow-right in dropdown and add arrow
		$('.bean-link-block .arrow-right').append('<i class="icon-arrow-right"></i>');

		//Prevent navbar links from going to link
		$('#navbar a.dropdown-toggle').click(function(e){
			e.preventDefault();
		});

		//Deluxe Pages
		var deluxe_node = $('.page-node.node-type-deluxe-page .node-deluxe-page');
		if (deluxe_node.length) {
			var primary_color = $('.color-primary.beer-title').css("color");
			var secondary_color = $('.icon-down-open.color-secondary').css('color');
			$('.beer-banner', deluxe_node).height(wh/1.7);
			$('#toplinks', deluxe_node).css({'marginTop':(wh/1.7) + 80 + 'px'});
			$("#desktop-distribution .field-carousel").owlCarousel({
				singleItem: true,
			});

			$('#beer-tabs a:first').tab('show') // Select first tab
		}
		
		//LNSU Page
		var lnsu_node = $('.page-node.node-type-deluxe-page #node-1062226');
		if (lnsu_node.length) {
			var primary_color = $('.color-primary.beer-title').css("color");
			var secondary_color = $('.icon-down-open.color-secondary').css('color');
			$('.beer-banner', deluxe_node).height(2 * wh);
			$('#toplinks', deluxe_node).css({'marginTop':(2 * wh) + 80 + 'px'});
			$("#desktop-distribution .field-carousel").owlCarousel({
				singleItem: true,
			});

			$('#beer-tabs a:first').tab('show') // Select first tab
		}

		// Beer pages
		var beer_node = $('.page-node.node-type-beer .node-beer');
		if (beer_node.length) {
			var primary_color = $('.color-primary.beer-title').css("color");
			var secondary_color = $('.icon-down-open.color-secondary').css('color');
			$('.beer-banner', beer_node).height(wh);
			$('.beer-overview', beer_node).css({'marginTop':wh + 80 + 'px'});
			$("#desktop-distribution .field-carousel").owlCarousel({
				singleItem: true,
			});

			//Skrol refresh only when device supports skrollr
			if(skrol){
				skrol.refresh();
			}

			$('#beer-tabs a:first').tab('show') // Select first tab

			$('.node-beer .slideshow .field-type-image .field-items').each(function(index) {
				$(this).owlCarousel({
					singleItem:true,
					autoPlay:($($(this)[0]).children().length > 1) ? true : false,
					transitionStyle : 'fade'
				});
			});

			// Set the height of the owl carousels on beer Pages
			function slideShowHeight(fixedHeight) {
				var slideShowTarget;
				if (fixedHeight) {
					$('.slideshow').each(function(index) {
						for (var i = 0; i < $(this).find('.owl-item').length; i++) {
							slideShowTarget = $($(this).find('.owl-item')[i]).children('.field-item');
							slideShowTarget.css('height', fixedHeight);
							slideShowTarget.children('.elpatas-bgimage').css('height', fixedHeight);
						}
					});
				} else {
					$('.slideshow').each(function(index) {
						var target;
						if ($(this).hasClass('slideshow-left')) {
							target = $(this).next('.col-md-6');
						} else {
							target = $(this).prev('.col-md-6');
						}
						var topPadding = parseInt(target.css('padding-top'));
						var bottomPadding = parseInt(target.css('padding-bottom'));
						for (var i = 0; i < $(this).find('.owl-item').length; i++) {
							slideShowTarget = $($(this).find('.owl-item')[i]).children('.field-item');
							slideShowTarget.css('height', target.height() + topPadding + bottomPadding);
							slideShowTarget.children('.elpatas-bgimage').css('height', target.height() + topPadding + bottomPadding);
						}
					});
				}
			}

			// Set the slideshow heights on location pages

			/*
			$('.beer-notes-read-more').on('click',function(e){
			e.preventDefault();
			var tasteHeight = $('#notes .col-sm-6').height();
			$(this).closest('.beer-notes').addClass('revealed');
			$('.node-beer section.beer-notes .container').css('max-height', tasteHeight + 100);
			})
			*/

			$('.node-beer .overview-video .colorbox').addClass('icon-play-circled2 color-secondary')

			$('.node-beer section.beer-banner.logo .field-name-field-banner-logo, .node-beer section.beer-banner .text-only').hover(
				function(){ $('.hero, .scroll-down').addClass('hover') },
				function(){ $('.hero, .scroll-down').removeClass('hover') }
			);

			$('.node-beer .owl-page span').css('background-color', primary_color );

			/* $('.node-beer section.related-beers .views-row a').css('color', secondary_color ); */

			// Countdown Flipclock
			var $flipClock = $('#flipclock-container');
			if ($flipClock.length) {
				var beer_countdown = $flipClock.FlipClock($flipClock.data('expires'), {
					clockFace: 'DailyCounter',
					countdown: true,
				});
			}

			beerLocalNav();

			// Switch Tabs Distribution Info
			var $distInfo = $('#dist_info');
			$distInfo.click(function(){
				$('[id^="tab-"]').removeClass("active in");
				$('#tab-availability').addClass("active in");
				$('a[href^="#tab"]').attr("aria-expanded","false");
				$('a[href^="#tab"]').parent().removeClass("active");
				$('a[href="#tab-availability"]').attr("aria-expanded","true");
				$('a[href="#tab-availability"]').parent().addClass("active");
			});

			function goToMyTab(myId) {
				$('[id^="tab-"]').removeClass("active in");
				$(myId).addClass("active in");
				$('a[href^="#tab"]').attr("aria-expanded","false");
				$('a[href^="#tab"]').parent().removeClass("active");
				$('a[href="'+myId+'"]').attr("aria-expanded","true");
				$('a[href="'+myId+'"]').parent().addClass("active");
			}

			$('a[href^="#tab"]').click(function(){
				if ($(this).parent().hasClass("sections")){
					var thisId = $(this).attr('href');
					goToMyTab(thisId);
				}
			});

		}
		
		// Countdown Initializer
		

			function getTimeRemaining(endtime){
				var t = Date.parse(endtime) - Date.parse(new Date());
				if (t > 0) {
					var seconds = Math.floor( (t/1000) % 60 );
					var minutes = Math.floor( (t/1000/60) % 60 );
					var hours = Math.floor( (t/(1000*60*60)) % 24 );
					var days = Math.floor( t/(1000*60*60*24) );
					return {
						'total': t,
						'days': days,
						'hours': hours,
						'minutes': minutes,
						'seconds': seconds
					};
				}
				else {
					var seconds = Math.ceil( (t/1000) % 60 );
					var minutes = Math.ceil( (t/1000/60) % 60 );
					var hours = Math.ceil( (t/(1000*60*60)) % 24 );
					var days = Math.ceil( t/(1000*60*60*24) );
					return {
						'total': t,
						'days': days,
						'hours': hours,
						'minutes': minutes,
						'seconds': seconds
					};
				}
			}

			function initializeClock(id, endtime){
				var clock = document.getElementById(id);
				function updateClock(){
					var t = getTimeRemaining(endtime);
					var daysSpan = document.getElementById('days');
					var hoursSpan = document.getElementById('hours');
					var minutesSpan = document.getElementById('minutes');
					var secondsSpan = document.getElementById('secs');
					daysSpan.innerHTML = t.days;
					hoursSpan.innerHTML = t.hours;
					minutesSpan.innerHTML = t.minutes;
					secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
					if(t.total<=0){
						$ = jQuery;
						$('#clockdiv').remove();
					}

				}

				updateClock(); // run function once at first to avoid delay
				var timeinterval = setInterval(updateClock,1000);
			}
		
		if ($('#deadline').length && $('#clockdiv').length) {
			var deadline = $('#deadline').html();
			console.log(deadline);
			initializeClock('#clockdiv', deadline);
		}
		

		// Beer Family Pages
		if ($('body').hasClass('taxonomy-vocabulary-11')) {

			resizeBeerSocial();

			// Randomly give the hover style to social posts
			$('#beer-family-social-posts .social-post').each(function(i, e){
				if (Math.random() > 0.66) {
					$(e).addClass('hovered');
				}
			});

			// Add sneak peek link to upcoming releases if we are past thier view full
			// info date
			$('.view-beer-category-upcoming-releases .upcoming').each(function(i, e){
				var YMD = $(e).data('showinfo').substring(0,10);
				if (moment(YMD).isBefore(moment())) {
					$(e).append('<a href="' + $(e).data('path') + '" class="sneak-peek">View Sneak Peek</a>');
				}
			});

			// Flipclock counter for social posts
			var $flipClock = $('#flipclock-counter');
			if ($flipClock.length) {
				var social_counter = $flipClock.FlipClock($flipClock.data('count'), {
					clockFace: 'Counter',
				});
				setTimeout(function() {
					setInterval(function() {
						social_counter.increment();
					}, 20500);
				});
			}
		}

		// Allows horiz navigation on beer family social sections.
		function resizeBeerSocial() {
			var container = $('#beer-family-social-posts');
			if (!container.length) return;

			var wrapper = container.children('.social-post-wrapper');

			container.find('.pan').remove();

			var left = $('<span class="pan-left pan"><i class="icon-left-open-big"></i><span>').appendTo(container);
			var right = $('<span class="pan-right pan" ><i class="icon-right-open-big"></i><span>').appendTo(container);

			var posts = wrapper.find('.social-post');
			var posts_visible = Math.floor(container.width() / 300) * 300;
			var wwidth = posts.length * 300 / 2 + 300;
			var page = 1;
			var pages = Math.ceil(wwidth / posts_visible);

			// reset container
			container.removeClass('end').addClass('begin');

			// reset wrapper
			wrapper.width(wwidth).css('transform', 'translateX(0px)');

			left.click(function(e){
				e.preventDefault();
				if (page > 1) {
					container.removeClass('end');
					page--;
					wrapper.css('transform', 'translateX(-' + ((page -1) * posts_visible) + 'px' + ')');
					if (page <= 1) {
						container.addClass('begin');
					}
				}
			});
			right.click(function(e){
				e.preventDefault();
				if (page < pages) {
					container.removeClass('begin');
					wrapper.css('transform', 'translateX(-' + (page * posts_visible) + 'px' + ')');
					page++;
					if (page >= pages) {
						container.addClass('end');
					}
				}
			});

			// Some people get kinda long winded. Truncate long posts.
			container.find('.social-post .post-content').dotdotdot({wrap:'letter',});
		}

		// Blog Articles
		$('.node-type-article .interior-banner .banner-copy').hover(
			function(){$('.interior-banner .banner').addClass('hover')},
			function(){$('.interior-banner .banner').removeClass('hover')}
		)
		// General breadcrumb dropdown
		$('.breadcrumb-dropdown').hover(
			function() { $(this).addClass('open'); },
			function() { $(this).removeClass('open'); }
		);

		// Close menu elment when X is clicked
		$('.breadcrumb-wrapper .breadcrumb-dropdown i.icon-cancel-1').click(function(){
			$('.breadcrumb-wrapper .breadcrumb-dropdown').removeClass('open');
		});

		$('.breadcrumb-wrapper .breadcrumb-dropdown .filter-label,.breadcrumb-wrapper .breadcrumb-dropdown i.icon-filter').click(function(){
			$('.breadcrumb-wrapper .breadcrumb-dropdown').addClass('open');
		})

		var scrollPosition = $(window).scrollTop();
		$(window).scroll(function(){
			var scrolled = $(window).scrollTop();
			toggleNav(scrolled);
			homeMenu();
		});

		//Get url parameter from url
		var getUrlParameter = function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		};
		//Add margin to content on pages with basic banner
		if($('.bean-basic-banner').length != 0){
			$('.main-container .row .col-sm-12').css('margin-top', '320px');
		}

		//Find the current day of the week and add class
		var todayDay = new Date().getDay();
		$('.all-hours .oh-wrapper, .hours-all .oh-wrapper').each(function(i, element){
			$(this).find('span.oh-display').eq(todayDay).children().addClass('today');
		});


		// Bistro Overview pages
		if ($('.page-locations').length || $('.page-visit') || $('.page-shop').length) {

			//Hide Bistro Hours if they don't exist
			$('.view-bistros-overview .views-row .location-info-wrap .bistro-hours .hours').each(function() {
				if ($(this).find('.oh-display-hours').html() == '<br>') {
					$(this).parent().parent().hide();
				}
			});
			//Hide Outpost Hours if they don't exist
			$('.view-bistros-overview .views-row .location-info-wrap .outpost-hours .hours').each(function() {
				if ($(this).find('.oh-display-hours').html() == '<br>') {
					$(this).find('.oh-display').html('<span style="text-align:center">Closed Today</span>');
				}
			});

			//Expand and collapse hours on location overview pages
			$('.hours .all-hours .show-all').on('click', function (e) {
				$(this).parent().find("div.field-type-office-hours").toggleClass("reveal");
				//$('.hours .all-hours .show-all').next().toggleClass("reveal");
			});

			//Add break after "El Patas" on location overview pages for bistros
			$('.view-bistros-overview.view-display-id-page h1').html(function(){
				return $(this).html().replace('El Patas','El Patas<br/>');
			});
			locationLocalNav();
		}

		$('#loc-tabs a:first').tab('show') // Select first tab

		// Explore menu tab navigation
		$('#anchor-tab-upcoming-fills').on('click', function() {
			$('#loc-tabs a[href="#tab-upcoming-fills"]').tab('show');
		});
		$('#anchor-tab-current-fills').on('click', function() {
			$('#loc-tabs a[href="#tab-current-fills"]').tab('show');
		});
		$('#anchor-tab-private-events').on('click', function() {
			$('#loc-tabs a[href="#tab-private-events"]').tab('show');
		});

		//Homepage nav hide bg umtil scrolled
		function homeMenu(){
			if($('body').hasClass('front')){
				if($( window ).scrollTop() > $('.view-home-page-panels').offset().top - 100){
					$('#navbar').removeClass('home-top');
				}
				else{
					$("#navbar").addClass('home-top');
				}
			}
		}
		homeMenu();


		$(window).load(function() {
			// Events breadcrumb downpdown filters
			var events_by_date = $('.page-events #events-events-by-date');
			var events_by_categories = $('.page-events #events-events-by-category').hide();
			var events_by_location = $('.page-events #events-events-by-location').hide();
			$('.filters #filter-date').addClass('active');
			$('.filters #filter-category').click(function(e){
				e.preventDefault();
				//$(this).parents('.breadcrumb-dropdown').removeClass('open');
				$(this).siblings('a').removeClass('active');
				$(this).addClass('active');
				events_by_categories.fadeIn(600);
				events_by_location.fadeOut(600);
				events_by_date.fadeOut(600);
				$('html,body').animate({
					//scrollTop: events_by_date.offset().top - 40
				}, {
					duration: 1000,
				});
				setTimeout(function(){setTheHeight();}, 500);
			});
			$('.filters #filter-location').click(function(e){
				e.preventDefault();
				$(this).siblings('a').removeClass('active');
				$(this).addClass('active');
				//$(this).parents('.breadcrumb-dropdown').removeClass('open');
				events_by_categories.fadeOut(600);
				events_by_location.fadeIn(600);
				events_by_date.fadeOut(600);
				$('html,body').animate({
					//scrollTop: events_by_date.offset().top - 40
				}, {
					duration: 1000,
				});
			});
			$('.filters #filter-date').click(function(e){
				e.preventDefault();
				$(this).siblings('a').removeClass('active');
				$(this).addClass('active');
				//$(this).parents('.breadcrumb-dropdown').removeClass('open');
				events_by_categories.fadeOut(600);
				events_by_location.fadeOut(600);
				events_by_date.fadeIn(600);
				$('html,body').animate({
					//scrollTop: events_by_date.offset().top - 40
				}, {
					duration: 1000,
				});
			});

			//reset height of Events categories overview views
			// setTheHeight();

			//Remove view more on beer page if column is short
			/*
			if($('#notes .col-sm-6').height() < 550){
			$('.text-center.expander').css('display', 'none');
			};
			*/

			// Check if there are other breadcrumb dropdowns other than breadcrumbs
			// Add hide class for mobile if true
			if($('.breadcrumb-wrapper').find('div').length == 0){
				$('.breadcrumb-wrapper').addClass('mobile-empty');
			}

			// Reveal Banner if no age gate for users logged out
			// Add delay for javascript to add classes to #el-patas-age-gate before checking
			setTimeout(function(){
				if (!$('#el-patas-age-gate').hasClass('visible') && $('#el-patas-age-gate').length == 1){
					revealRevealBanner();
				}
			},250);

			// Set the slideshow heights on location & beer pages
			if ($(window).width() > 768) {
				slideShowHeight();
			} else {
				slideShowHeight(425);
			}
		});

		//elpatas Proper Names Page
		var now=$.now() - 31540000000 + 2628000000 + 2628000000 + 2628000000;
		$(".view-proper-names-beer-pics").find(".field-content").each(function() {
			var theClass= $(this).attr('class').match(/date[\w-]*\b/);
			theClass = theClass + "000";
			var theDate = parseInt(theClass.slice(4));
			if (theDate < now && theDate != 0 && theDate != null) {
				$(this).css({'display':'none'});
			}
		});
		$(this).find(".view-proper-names-beer-pics").each(function() {
			var i = 5;
			$(this).find(".field-content").each(function() {
				if (i > 0) {
					$(this).css({'display':'inline'});
				} 
				if (i < -2) {
					$(this).css({'display':'none'});
				}
				i--;
			});
		});
		$(".view-proper-names-all-beers").find(".views-field-view-1").addClass("col-sm-6");
		$(".view-proper-names-all-beers").find(".views-field-view").addClass("col-sm-6");



		// Smooth scroll anchors
		$('a[href*=#]:not([href=#])').not('.collapse, .accordion-toggle, .tab-anchor').click(function(e) {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					var offset = 40;
					if ($('body').hasClass('front') && $('body').hasClass('has-reveal-banner')) {
						offset = 0;
					}
					$('html,body').animate({
						scrollTop: target.offset().top - offset
					}, {
						duration: 1000,
					});
					e.preventDefault();
				}
			}
		});


		// Signup form stay flipped
		$('.block.block-elpatas-blocks:has(".signup-form-wrapper") input.signup, .block.block-elpatas-blocks:has(".signup-form-wrapper") .signup-flip.copy').click(function(e){
			$(this).closest('.block.block-elpatas-blocks').addClass('focused');
		});

		$('.block.block-elpatas-blocks:has(".signup-form-wrapper") input.signup').focusout(function(e){
			$(this).closest('.block.block-elpatas-blocks').removeClass('focused');
		})

		// sign up email validate
		//  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
		var testEmail =    /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
		$('input.signup').bind('input propertychange', function() {
			if (testEmail.test($(this).val()))
			{
				$('input.subscribe, form .icon-arrow-right').css({ 'color':'#20af50'});
				$('input.subscribe').prop("disabled",false);
			} else
			{
				$('input.subscribe, form .icon-arrow-right').css({ 'color':'#888'});
				$('input.subscribe').prop("disabled",true);
			}
		});

		// Make entire blog teaser clickable
		$('.node-article.node-teaser').not('a').click(function(e){
			e.preventDefault();
			window.location = $(this).find('.reveal a').attr('href');
		});

		// Make views brews archive bean clickable when used in link block
		$('.view-archived-beers-link-block .bean-basic-banner h2').wrapInner('<a href="/beer/archive"></a>');
		$('.view-archived-beers-link-block .bean-basic-banner p').wrapInner('<a href="/beer/archive"></a>');

		// Set all dot dot prior to window resize
		if($(window).width() > 768){
			$('.view-home-page-panels .panel .panel-content').dotdotdot({wrap:'letter',});
		}else{
			$('.view-home-page-panels .panel .panel-content .content').dotdotdot({wrap:'letter',});
		}

		$('.view-home-page-panels .panel footer .panel-front').dotdotdot({wrap:'letter',});
		// 'Resize' event titles via dotdotdot
		// $('.page-events .owl-item .views-field-title, .view-events-term-page-content .views-row .views-field-title, .view-upcoming-events-from-term .views-field-title').dotdotdot({wrap:'letter',});
		$('.view.blog-grid .views-row h2.title').dotdotdot({wrap:'letter'});
		// Blog Pager
		$('.flippy li .title').dotdotdot({wrap:'letter'});
		// Brews Overview w/h ratio
		$('.view-brews-overview .category-info .category.description').dotdotdot({wrap:'letter'});
		$('.view .node-beer.node-teaser, .view .category-info').height($('.view .node-beer.node-teaser').first().width() * 1.6);


		// Add classes to panel-headings on open/hide accordions
		$('.panel-collapse').on('show.bs.collapse', function (e) {
			$(e.target).parents('.panel').addClass('panel-active');
		});
		$('.panel-collapse').on('hide.bs.collapse', function (e) {
			$(e.target).parents('.panel').removeClass('panel-active');
		});

		// Add datepicker functionality to webform elements with class 'use-datepicker'
		if ($('.node-webform input.use-datepicker').length) {
			$('.node-webform input.use-datepicker').datepicker();
			$('.node-webform input.use-datepicker').closest('.form-item')
				.addClass('has-datepicker-icon').append('<span class="glyphicon glyphicon-calendar"></span>');
		}

		// Brews overview alternate category layout
		$('.view-brews-overview-category-link .view-content, .view-brews-overview-category-link-recent .view-content, .view-brews-overview-category-link-present .view-content, .view-archived-beers-link-block .view-content').owlCarousel({
			itemsScaleUp:false,
			itemsCustom: [[0, 2], [344, 3], [430, 4], [516, 5], [602, 5], [688, 5], [860, 6], [946, 7], [1032, 8], [1118, 9], [1204, 9], [1290, 10], [1376, 11], [1462, 12], [1548, 13], [1634, 14], [1720, 15]],
			afterAction: owlCenterItems,
			responsiveBaseWidth: $('.view-brews-overview-category-link, .view-brews-overview-category-link-recent, .view-brews-overview-category-link-present'),
			afterInit : function(elem){
				var that = this
				that.owlControls.prependTo(elem)
			}
		});

		//Brews overview toggle beer display
		
		if ($("body").hasClass("page-beer")) {
			$(".view-brews-overview-category-link-present").each(function() {
				var here = $(this).first().parents().eq(2);
				if (!$.trim( $(this).html() ).length) {
					here.find('.views-field-view .view-brews-overview-category-link-recent').each(function() {
						$(this).css("display","block");
					});
				}
			});
		}

		// Handle all window resize
		windowResize();
		$(window).resize(function(){
			windowResize();
			// Hide Mobile menu on window resize
			if($(window).width() > 768){
				if($('body').hasClass('revealMobileMenu')){
					$body.removeClass('revealMobileMenu');
					$("html").removeAttr('style');
				}
			}
		});

		// Dim search icon when hovering over main menu items
		$('#navbar .tb-megamenu-nav .level-1 > a, .tb-megamenu-submenu').hover(function() {
			$('nav.row .morphsearch-scrollable').css('color', '#565656');
		}, function() {
			// on mouseout, reset the background colour
			$('nav.row .morphsearch-scrollable').css('color', '#e8e8e8');
		});

		$('nav.row .morphsearch-scrollable').hover(function() {
			$('#navbar .tb-megamenu-nav .level-1 > a').css('color', '#565656');
		}, function() {
			// on mouseout, reset the background colour
			$('#navbar .tb-megamenu-nav .level-1 > a').css('color', '');
		});



		//On Views Accordion, scroll to active panel when clicked
		$('.view-q-a-accordion .views-bootstrap-accordion-plugin-style').on('shown.bs.collapse', function (e) {
			var offset = $(this).find('.collapse.in').prev('.panel-heading');
			if(offset) {
				$('html,body').animate({
					scrollTop: $(offset).offset().top - 80
				}, 500);
			}
		});

		function windowResize(){
			wh = $(window).height();

			if ($(window).width() > 768) {

			} else {

			}

			//Mobile Menu
			mobileDrawWidth = $('#mobile-menu-drawer').width();
			$('#mobile-menu-drawer .mobile-wrapper > div').innerWidth(mobileDrawWidth);

			// Resize hompeage panels
			var panelHeight = Math.round($('.view-home-page-panels .views-row-2').width() * 1.115);
			$('.view-home-page-panels .panel:not(:first)').height(panelHeight);
			$('.view-home-page-panels .panel:first').height(panelHeight*2);

			// 'Resize' panel content via dotdotdot
			if($(window).width() > 768){
				$('.view-home-page-panels .panel .panel-content').dotdotdot({wrap:'letter',});
				//slide show on bistro & beer pages
				slideShowHeight();
			}else{
				$('.view-home-page-panels .panel .panel-content .content').dotdotdot({wrap:'letter',});
				//slide show on bistro & beer pages
				slideShowHeight(425);
			}
			$('.view-home-page-panels .panel footer .category').dotdotdot({wrap:'letter',});
			// 'Resize' event titles via dotdotdot
			// $('.page-events .owl-item .views-field-title, .view-events-term-page-content .views-row .views-field-title, .view-upcoming-events-from-term .views-field-title').dotdotdot({wrap:'letter',});
			$('.view.blog-grid .views-row h2.title').dotdotdot({wrap:'letter'});
			// Brews Overview w/h ratio
			$('.view-brews-overview .category-info .category.description').dotdotdot({wrap:'letter'});
			$('.view .node-beer.node-teaser, .view .category-info').height($('.view .node-beer.node-teaser').first().width() * 1.6);
			// Blog Pager
			$('.flippy li .title').dotdotdot({wrap:'letter'});
			// Blog views sizing
			var viewBlogHeight = Math.floor($('.view.blog-grid').width() / 4);
			if (viewBlogHeight > 260) {
				// Four column
				$('.view.blog-grid .views-row').height(viewBlogHeight).width(viewBlogHeight);
				$('.view.blog-grid .views-row:first-child').height(viewBlogHeight * 2).width(viewBlogHeight * 2);
				$('.view.blog-grid .views-row:nth-child(2)').width(viewBlogHeight * 2);
			} else if (viewBlogHeight > 160) {
				// Two column
				$('.view.blog-grid .views-row').height(viewBlogHeight * 2).width(viewBlogHeight * 2);
				$('.view.blog-grid .views-row:first-child').width(viewBlogHeight * 4);
			} else {
				// One column
				$('.view.blog-grid .views-row').height(viewBlogHeight * 4).width(viewBlogHeight * 4);
			}

			// Beer family social-posts
			$('#beer-family-social-posts .social-post .post-content').dotdotdot({wrap:'letter',});


			// Article Detail Page Banner
			$('.node-type-article .banner').height(wh);
			$('.node-type-article .node-article > .content').css({'margin-top':wh});

			//reset height of Events categories overview views
			setTheHeight();

			//reset height of beer banner
			$('.beer-banner', beer_node).height(wh);
			$('.beer-overview', beer_node).css({'marginTop':wh + 80 + 'px'});

			var newWidth = $fluidEl.width();

			// Resize all videos according to their own aspect ratio
			$allVideos.each(function() {

				var $el = $(this);
				$el
					.width(newWidth)
					.height(newWidth * $el.data('aspectRatio'));

			});

			// Beer family social content
			resizeBeerSocial();
		}

		//Toggle Navigation from hiding/showing
		function toggleNav(scrolled){
			var triggerStart = 25;
			if($('body').hasClass('taxonomy-vocabulary-26')){
				triggerStart = 201;
			}
			if($('body').hasClass('has-reveal-banner')){
				triggerStart = wh;
			}

			if(scrollPosition - scrolled > 0 || scrolled < triggerStart || $('#navbar').hasClass('focused')){
				$('body').removeClass('showFixedFooter');
				$('#navbar').removeClass('navHide');
				$('.navigation-toggle').removeClass('butHide');
			}else{
				$('body').addClass('showFixedFooter');
				$('#navbar').addClass('navHide');
				$('.navigation-toggle').addClass('butHide');
			}
			scrollPosition = scrolled;

			// Uncomment to theme dropdown menus
			// 2506 = BEER, 2511 = VISIT, 2516 = EVENTS, 2521 = SHOP, 2526 = ABOUT
			// $('li[data-id="2511"]').addClass('open');
		}

		function revealRevealBanner() {
			var $reveal_banner = $('.region-reveal-banner');
			if ($reveal_banner.length && $(window).width() > 768) {
				// Let things settle
					if (!skrol.isMobile()) {
						$('.view-home-page-panels .blackout').css({'z-index':50});
					}
					// Start background videos
					$(".YTPlayerBG").YTPlayer();

					// Show banner
					var wh = $(window).height() - 80;
					$reveal_banner.slideDown(0);

					skrol.refresh();

					$body.addClass('revealRevealBanner');


					// When banner is used Force full scroll down on non-mobiles
					if (!skrol.isMobile()) {
						var isAnimating = false;
						var lastScrollTop = 0;
						$(window).on('scroll touchmove mousewheel', function(e){
							var st = $(this).scrollTop();
							if (st < 25){
								$('#reveal-banner').addClass('revealed');
							}else{
								$('#reveal-banner').removeClass('revealed');
							}
							lastScrollTop = st;
						});
					}
			}
		}

		//Match height of views row
		function setTheHeight() {
			if( $('.view-events-by-categories .views-field-view, .view-events-term-page-content .views-row').length ) {
				//Reset height
				$('.view-events-by-categories .views-field-view, .view-events-term-page-content .views-row').height('auto');
				//Get value of highest element
				var maxHeight = Math.max.apply(Math, $('.view-events-by-categories .views-field-view, .view-events-term-page-content .views-row').map (
					function() {
						return $(this).height();
					}
				));
				if($(window).width() < 768){
					// $('#block-bean-main-events-banner .bean-events-banner').height(wh);
				}else{
					// $('#block-bean-main-events-banner .bean-events-banner').height('');
				}
				$('.view-events-by-categories .views-field-view, .view-events-term-page-content .views-row').height(maxHeight);
			}
		}

		// Builds beer local nav dropdown menu
		function beerLocalNav() {
			var page_content = $('.node-beer > .content');
			if (page_content.length) {
				var titles = {
					'intro':'BEER OVERVIEW',
					'video':'VIDEO',
					'delicious-certs':'GLUTEN LEVEL LAB RESULTS',
					// 'extra':'EXTRA INFORMATION',
					'tab-notes':'TASTING & PAIRING NOTES',
					'tab-moreinfo':'MORE INFORMATION',
					'tab-availability':'DISTRIBUTION',
					'tab-parallax':'EXTRA INFORMATION',
					//'finder':'elpatas BEER FINDER',
					'beer-social':'SOCIAL / SHARE',
				};

				// Create Menu Element
				if($(window).width() > 768 && (!$("body").hasClass("logged-in"))){
					var start_open = true;
				}
				var beer_menu = $('<div class="beer-menu-navigation-wrapper ' + (start_open ? 'open' : '') + '"></div>')
				.append('<div class="controls"><span class="current">EXPLORA</span> <i class="icon-sort"></i><i class="icon-cancel-1"></i>\
</div>').hover(function(){ $(this).addClass('open'); }, function(){ $(this).removeClass('open'); });
				// Add links for each section available.
				var beer_menu_anchors = $('<div class="reveal"><a href="#skip-link">TOP</a></div>');
				page_content.children('section').each(function(i, e){
					var id = $(this).attr('id');
					if (title = titles[id]) {
						$('<a href="#' + id + '">' + title + '</a>').appendTo(beer_menu_anchors);
					}
				});
				$('div[role="tabpanel"]').each(function(i, e){
					var id = $(this).attr('id');
					if (title = titles[id]) {
						$('<a href="#' + id + '">' + title + '</a>').appendTo(beer_menu_anchors);
					}
				});

				// Insert to dom
				beer_menu_anchors.wrapInner('<div class="sections"></div>');
				beer_menu.append(beer_menu_anchors).appendTo('.breadcrumb-wrapper');

				// If we started with the local nav open, close it after a short while if not hovered.
				if (start_open) {
					setTimeout(function(e){
						if (!beer_menu.is(':hover'))
							beer_menu.removeClass('open');
					}, 2500);
				}

				// Reverse hover style
				beer_menu_anchors.find('a').hover(function(){
					beer_menu_anchors.find('a').removeClass('dimmed').not($(this)).addClass('dimmed');
				}, function(){
					beer_menu_anchors.find('a').removeClass('dimmed');
				});

				// Update title on debounced scroll
				var beerscroll;
				$(window).scroll(function(){
					clearTimeout(beerscroll);
					beerscroll = setTimeout(function(){
						var scrolled = $(window).scrollTop() + 120;
						var closest = null;;
						var closestSection;
						if (scrolled > $(window).height() - 120) {
							page_content.children('section').not('#banner').each(function(i, e){
								var st = $(this).offset().top;
								if (closest == null || Math.abs(st - scrolled) < Math.abs(closest - scrolled)) {
									closest = st;
									closestSection = $(this);
								}
							});
							if (scrolled - closest > 0) {
								$('.beer-menu-navigation-wrapper .current').text(titles[closestSection.attr('id')]);
							}
						} else {
							$('.beer-menu-navigation-wrapper .current').text('EXPLORA');
						}
					}, 300);
				});
			}
		}

		// Builds location local nav dropdown menu
		function locationLocalNav() {
			var page_content = $('.page-visit .view-bistros-overview');
			if (page_content.length) {
				var titles = new Array({locID:'block-block-66',title:'El Patas'});
				page_content.find('.view-content .views-row').each(function(i){
					var locID = 'location-' + (i + 1);
					$(this).attr({'id':locID, 'data-block':i+1});
					var locTitle = $(this).find('h1').html();
					titles[i+1] = {id: locID,title:locTitle}
				})

				// Create Menu Element
				if($(window).width() > 768 && (!$("body").hasClass("logged-in"))){
					var start_open = true;
				}
				var location_menu = $('<div class="location-menu-navigation-wrapper ' + (start_open ? 'open' : '') + '"></div>')
				.append('<div class="controls"><span class="current">EXPLORA LUGARES</span> <i class="icon-sort"></i><i class="icon-cancel-1"></i>\
</div>').hover(function(){ $(this).addClass('open'); }, function(){ $(this).removeClass('open'); });

				// Add links for each section available.
				var location_menu_anchors = $('<div class="reveal"><a href="#skip-link">TOP</a></div>');
				for(i=0; i < titles.length;i++){
					var id = titles[i]['id'];
					$('<a href="#' + id + '">' + titles[i]['title'] + '</a>').appendTo(location_menu_anchors);
				}

				// Insert to dom
				location_menu_anchors.wrapInner('<div class="sections"></div>');
				location_menu.append(location_menu_anchors).appendTo('.breadcrumb-wrapper');

				// If we started with the local nav open, close it after a short while if not hovered.
				if (start_open) {
					setTimeout(function(e){
						if (!location_menu.is(':hover'))
							location_menu.removeClass('open');
					}, 2500);
				}

				// Reverse hover style
				location_menu_anchors.find('a').hover(function(){
					location_menu_anchors.find('a').removeClass('dimmed').not($(this)).addClass('dimmed');
				}, function(){
					location_menu_anchors.find('a').removeClass('dimmed');
				});

				// Update title on debounced scroll
				var locationscroll;
				$(window).scroll(function(){
					clearTimeout(locationscroll);
					locationscroll = setTimeout(function(){
						var scrolled = $(window).scrollTop() + 200;
						var closest = null;;
						var closestSection;
						if (scrolled > $(window).height() - 600) {
							page_content.find('div.views-row').each(function(i, e){
								var st = $(this).offset().top;
								if (closest == null || Math.abs(st - scrolled) < Math.abs(closest - scrolled)) {
									closest = st;
									closestSection = $(this);
								}
							});
							if (scrolled - closest > 0) {
								var titleStr = titles[closestSection.attr('data-block')]['title'];
								$('.location-menu-navigation-wrapper .current').html(titleStr);
							}
						} else {
							$('.location-menu-navigation-wrapper .current').text('EXPLORA LUGARES');
						}
					}, 300);
				});
			}
		}

		// Close menu elment when X is clicked
		$('[class*="menu-navigation-wrapper"] i.icon-cancel-1').click(function(){
			$('[class*="menu-navigation-wrapper"]').removeClass('open');
		});

		$('[class*="menu-navigation-wrapper"] .current,[class*="menu-navigation-wrapper"] i.icon-sort').click(function(){
			$('[class*="menu-navigation-wrapper"]').addClass('open');
		});


		///////////////////////////////////
		// Confirm unpublish of available fill
		///////////////////////////////////

		$('.unpublish-fill').click(function() {
			if (!confirm('Are you sure you want to remove ' + $(this).data('title') + '?')) {
				return false;
			}
		});

	});
	// Add title attribute to iframes on load
	$(window).on("load", function() {
		// Check if iframe doesn't have title attribute
		if (!$('iframe').prop('title')){
			// Get page title
			var title = $(document).find("title").text();
			// Create title attribute and set value as page title and append the word Video
			$('iframe').prop('title', title += ' Video'); 
		}
 	});
})(jQuery);

function owlCenterItems() {
	$ = jQuery;
	var items = this.owl.owlItems.length;
	var slots = this.owl.visibleItems.length;
	if (items < slots) {
		var padding = (slots - items) * this.itemWidth / 2;
		$(this.$elem).find('.owl-wrapper-outer').css('left', padding + 'px');
	} else {
		var padding = 0;
		$(this.$elem).find('.owl-wrapper-outer').css('left', padding + 'px');
	}
}

function log(message) {
	console.log(message);
};
(function ($) {
  $(document).ready(function(){

    $('#location-form').on('submit', function() {
      dataLayer.push({
        event: 'search',
        eventCategory: 'finder',
        location: $(this).find('input[name="l"]').val(),
      });
    });

  });
})(jQuery);


;
