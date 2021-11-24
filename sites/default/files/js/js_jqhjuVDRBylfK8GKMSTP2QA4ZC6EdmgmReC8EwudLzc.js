/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */
(function() {

	var bodyEl = document.body,
		docElem = window.document.documentElement,
		support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		onEndTransition = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},
	
		banner = document.getElementById("banner");
		imghero = document.querySelector('.hero__back--mover'),
		canMoveHeroImage = true,
		isFirefox = typeof InstallTrigger !== 'undefined',
		win = { width: window.innerWidth, height: window.innerHeight };

	function scrollY() { return window.pageYOffset || docElem.scrollTop; }

	// from http://www.sberry.me/articles/javascript-event-throttling-debouncing
	function throttle(fn, delay) {
		var allowSample = true;

		return function(e) {
			if (allowSample) {
				allowSample = false;
				setTimeout(function() { allowSample = true; }, delay);
				fn(e);
			}
		};
	}

	function init() {

		initEvents();
	}

	function initEvents() {


		banner.addEventListener('mousemove', throttle(function(ev) {
			if( !canMoveHeroImage ) return false;
			var xVal = -1/(win.height/2)*ev.clientY + 1,
				yVal = 1/(win.width/2)*ev.clientX - 1,
				transX = 20/(win.width)*ev.clientX - 10,
				transY = 20/(win.height)*ev.clientY - 10,
				transZ = 100/(win.height)*ev.clientY - 50;

			imghero.style.WebkitTransform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
			imghero.style.transform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
		}, 100));

		banner.addEventListener('mouseout', throttle(function(ev){
			imghero.style.WebkitTransform = 'perspective(1000px) translate3d(0px,0px,0px) rotate3d(0,0,0,0deg)';
			imghero.style.transform = 'perspective(1000px) translate3d(0px,0px,0px) rotate3d(0,0,0,0deg)';
		},300));

		// window resize
		window.addEventListener( 'resize', throttle(function(ev) {
			// recalculate window width/height
			win = { width: window.innerWidth, height: window.innerHeight };
			// reset body height if stack is opened
		}, 50));

	}

	init();

})();;
