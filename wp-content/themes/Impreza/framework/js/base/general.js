/*!
 * imagesLoaded PACKAGED v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(this,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function c(e){this.img=e}function f(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},s.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),c.prototype=new t,c.prototype.check=function(){var e=v[this.img.src]||new f(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},c.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return f.prototype=new t,f.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},f.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},f.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},f.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},f.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},f.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

/**
 * UpSolution Theme Core JavaScript Code
 *
 * @requires jQuery
 */
if (window.$us === undefined) window.$us = {};

/**
 * Retrieve/set/erase dom modificator class <mod>_<value> for UpSolution CSS Framework
 * @param {String} mod Modificator namespace
 * @param {String} [value] Value
 * @returns {string|jQuery}
 */
jQuery.fn.usMod = function(mod, value){
	if (this.length == 0) return this;
	// Remove class modificator
	if (value === false) {
		this.get(0).className = this.get(0).className.replace(new RegExp('(^| )' + mod + '\_[a-z0-9]+( |$)'), '$2');
		return this;
	}
	var pcre = new RegExp('^.*?' + mod + '\_([a-z0-9]+).*?$'),
		arr;
	// Retrieve modificator
	if (value === undefined) {
		return (arr = pcre.exec(this.get(0).className)) ? arr[1] : false;
	}
	// Set modificator
	else {
		this.usMod(mod, false).get(0).className += ' ' + mod + '_' + value;
		return this;
	}
};

/**
 * Convert data from PHP to boolean the right way
 * @param {mixed} value
 * @returns {Boolean}
 */
$us.toBool = function(value){
	if (typeof value == 'string') return (value == 'true' || value == 'True' || value == 'TRUE' || value == '1');
	if (typeof value == 'boolean') return value;
	return !!parseInt(value);
};

$us.getScript = function(url, callback){
	if ( ! $us.ajaxLoadJs ) {
		callback();
		return false;
	}

	if ($us.loadedScripts === undefined) {
		$us.loadedScripts = {};
		$us.loadedScriptsFunct = {};
	}

	if ($us.loadedScripts[url] === 'loaded') {
		callback();
		return;
	} else if ($us.loadedScripts[url] === 'loading') {
		$us.loadedScriptsFunct[url].push(callback);
		return;
	}

	$us.loadedScripts[url] = 'loading';
	$us.loadedScriptsFunct[url] = [];
	$us.loadedScriptsFunct[url].push(callback)

	var complete = function(){
		for (var i = 0; i < $us.loadedScriptsFunct[url].length; i++){
			$us.loadedScriptsFunct[url][i]();
		}
		$us.loadedScripts[url] = 'loaded';
	};

	var options = {
		dataType: "script",
		cache: true,
		url: url,
		complete: complete
	};

	return jQuery.ajax(options);
};

// Detecting IE browser
$us.detectIE = function() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
};

// Fixing hovers for devices with both mouse and touch screen
jQuery.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
jQuery('html').toggleClass('no-touch', !jQuery.isMobile);
jQuery('html').toggleClass('ie11', $us.detectIE() == 11);

/**
 * Commonly used jQuery objects
 */
!function($){
	$us.$window = $(window);
	$us.$document = $(document);
	$us.$html = $('html');
	$us.$body = $('.l-body:first');
	$us.$htmlBody = $us.$html.add($us.$body);
	$us.$canvas = $('.l-canvas:first');
}(jQuery);

/**
 * $us.canvas
 *
 * All the needed data and functions to work with overall canvas.
 */
!function($){
	"use strict";

	function USCanvas(options){

		// Setting options
		var defaults = {
			disableEffectsWidth: 900,
			responsive: true,
			backToTopDisplay: 100
		};
		this.options = $.extend({}, defaults, options || {});

		// Commonly used dom elements
		this.$header = $us.$canvas.find('.l-header');
		this.$main = $us.$canvas.find('.l-main');
		this.$sections = $us.$canvas.find('.l-section');
		this.$firstSection = this.$sections.first();
		this.$secondSection = this.$sections.eq(1);
		this.$fullscreenSections = this.$sections.filter('.height_full');
		this.$topLink = $('.w-toplink');

		// Canvas modificators
		this.sidebar = $us.$canvas.usMod('sidebar');
		this.type = $us.$canvas.usMod('type');
		// Initial header position
		this._headerPos = this.$header.usMod('pos');
		// Current header position
		this.headerPos = this._headerPos;
		this.headerInitialPos = $us.$body.usMod('header_inpos');
		this.headerBg = this.$header.usMod('bg');
		this.rtl = $us.$body.hasClass('rtl');

		// Will be used to count fullscreen sections heights and proper scroll positions
		this.scrolledOccupiedHeight = 0;

		// Used to prevent resize events on scroll for Android browsers
		this.isScrolling = false;
		this.scrollTimeout = false;
		this.isAndroid = /Android/i.test(navigator.userAgent);

		// If in iframe...
		if ($us.$body.hasClass('us_iframe')) {
			// change links so they lead to main window
			$('a:not([target])').each(function(){ $(this).attr('target','_parent')});
			// hide preloader
			jQuery(function($){
				var $framePreloader = $('.l-popup-box-content .g-preloader', window.parent.document);
				$framePreloader.hide();
			});
		}

		// Boundable events
		this._events = {
			scroll: this.scroll.bind(this),
			resize: this.resize.bind(this)
		};

		$us.$window.on('scroll', this._events.scroll);
		$us.$window.on('resize load', this._events.resize);
		// Complex logics requires two initial renders: before inner elements render and after
		setTimeout(this._events.resize, 25);
		setTimeout(this._events.resize, 75);
	}

	USCanvas.prototype = {

		/**
		 * Scroll-driven logics
		 */
		scroll: function(){
			var scrollTop = parseInt($us.$window.scrollTop());

			// Show/hide go to top link
			this.$topLink.toggleClass('active', (scrollTop >= this.winHeight*this.options.backToTopDisplay/100));

			if (this.isAndroid) {
				this.isScrolling = true;
				if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
				this.scrollTimeout = setTimeout(function () {
					this.isScrolling = false;
				}.bind(this), 100);
			}
		},

		/**
		 * Resize-driven logics
		 */
		resize: function(){
			// Window dimensions
			this.winHeight = parseInt($us.$window.height());
			this.winWidth = parseInt($us.$window.width());

			// Disabling animation on mobile devices
			$us.$body.toggleClass('disable_effects', (this.winWidth < this.options.disableEffectsWidth));

			// Vertical centering of fullscreen sections in IE 11
			var ieVersion = $us.detectIE();
			if ((ieVersion !== false && ieVersion == 11) && (this.$fullscreenSections.length > 0 && ! this.isScrolling)) {
				var adminBar = $('#wpadminbar'),
					adminBarHeight = (adminBar.length)?adminBar.height():0;
				this.$fullscreenSections.each(function(index, section){
					var $section = $(section),
						sectionHeight = this.winHeight,
						isFirstSection = (index == 0 && $section.is(this.$firstSection));
					// First section
					if (isFirstSection) {
						sectionHeight -= $section.offset().top;
					}
					// 2+ sections
					else {
						sectionHeight -= $us.header.scrolledOccupiedHeight + adminBarHeight;
					}
					if ($section.hasClass('valign_center')) {
						var $sectionH = $section.find('.l-section-h'),
							sectionTopPadding = parseInt($section.css('padding-top')),
							contentHeight = $sectionH.outerHeight(),
							topMargin;
						$sectionH.css('margin-top', '');
						// Section was extended by extra top padding that is overlapped by fixed solid header and not visible
						var sectionOverlapped = isFirstSection && $us.header.pos == 'fixed' && $us.header.bg != 'transparent' && $us.header.orientation != 'ver';
						if (sectionOverlapped) {
							// Part of first section is overlapped by header
							topMargin = Math.max(0, (sectionHeight - sectionTopPadding - contentHeight) / 2);
						} else {
							topMargin = Math.max(0, (sectionHeight - contentHeight) / 2 - sectionTopPadding);
						}
						$sectionH.css('margin-top', topMargin || '');
					}
				}.bind(this));
				$us.$canvas.trigger('contentChange');
			}

			// If the page is loaded in iframe
			if ($us.$body.hasClass('us_iframe')) {
				var $frameContent = $('.l-popup-box-content', window.parent.document),
					outerHeight = $us.$body.outerHeight(true);
				if ( outerHeight > 0 && $(window.parent).height() > outerHeight){
					$frameContent.css('height', outerHeight);
				} else {
					$frameContent.css('height', '');
				}
			}

			// Fix scroll glitches that could occur after the resize
			this.scroll();
		}
	};

	$us.canvas = new USCanvas($us.canvasOptions || {});

}(jQuery);

/**
 * CSS-analog of jQuery slideDown/slideUp/fadeIn/fadeOut functions (for better rendering)
 */
!function(){

	/**
	 * Remove the passed inline CSS attributes.
	 *
	 * Usage: $elm.resetInlineCSS('height', 'width');
	 */
	jQuery.fn.resetInlineCSS = function(){
		for (var index = 0; index < arguments.length; index++) {
			this.css(arguments[index], '');
		}
		return this;
	};

	jQuery.fn.clearPreviousTransitions = function(){
		// Stopping previous events, if there were any
		var prevTimers = (this.data('animation-timers') || '').split(',');
		if (prevTimers.length >= 2) {
			this.resetInlineCSS('transition');
			prevTimers.map(clearTimeout);
			this.removeData('animation-timers');
		}
		return this;
	};
	/**
	 *
	 * @param {Object} css key-value pairs of animated css
	 * @param {Number} duration in milliseconds
	 * @param {Function} onFinish
	 * @param {String} easing CSS easing name
	 * @param {Number} delay in milliseconds
	 */
	jQuery.fn.performCSSTransition = function(css, duration, onFinish, easing, delay){
		duration = duration || 250;
		delay = delay || 25;
		easing = easing || 'ease';
		var $this = this,
			transition = [];

		this.clearPreviousTransitions();

		for (var attr in css) {
			if (!css.hasOwnProperty(attr)) continue;
			transition.push(attr + ' ' + (duration / 1000) + 's ' + easing);
		}
		transition = transition.join(', ');
		$this.css({
			transition: transition
		});

		// Starting the transition with a slight delay for the proper application of CSS transition properties
		var timer1 = setTimeout(function(){
			$this.css(css);
		}, delay);

		var timer2 = setTimeout(function(){
			$this.resetInlineCSS('transition');
			if (typeof onFinish == 'function') onFinish();
		}, duration + delay);

		this.data('animation-timers', timer1 + ',' + timer2);
	};

	// Height animations
	jQuery.fn.slideDownCSS = function(duration, onFinish, easing, delay){
		if (this.length == 0) return;
		var $this = this;
		this.clearPreviousTransitions();
		// Grabbing paddings
		this.resetInlineCSS('padding-top', 'padding-bottom');
		var timer1 = setTimeout(function(){
			var paddingTop = parseInt($this.css('padding-top')),
				paddingBottom = parseInt($this.css('padding-bottom'));
			// Grabbing the "auto" height in px
			$this.css({
				visibility: 'hidden',
				position: 'absolute',
				height: 'auto',
				'padding-top': 0,
				'padding-bottom': 0,
				display: 'block'
			});
			var height = $this.height();
			$this.css({
				overflow: 'hidden',
				height: '0px',
				opacity: 0,
				visibility: '',
				position: ''
			});
			$this.performCSSTransition({
				opacity: 1,
				height: height + paddingTop + paddingBottom,
				'padding-top': paddingTop,
				'padding-bottom': paddingBottom
			}, duration, function(){
				$this.resetInlineCSS('overflow').css('height', 'auto');
				if (typeof onFinish == 'function') onFinish();
			}, easing, delay);
		}, 25);
		this.data('animation-timers', timer1 + ',null');
	};
	jQuery.fn.slideUpCSS = function(duration, onFinish, easing, delay){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		this.css({
			height: this.outerHeight(),
			overflow: 'hidden',
			'padding-top': this.css('padding-top'),
			'padding-bottom': this.css('padding-bottom')
		});
		var $this = this;
		this.performCSSTransition({
			height: 0,
			opacity: 0,
			'padding-top': 0,
			'padding-bottom': 0
		}, duration, function(){
			$this.resetInlineCSS('overflow', 'padding-top', 'padding-bottom').css({
				display: 'none'
			});
			if (typeof onFinish == 'function') onFinish();
		}, easing, delay);
	};

	// Opacity animations
	jQuery.fn.fadeInCSS = function(duration, onFinish, easing, delay){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		this.css({
			opacity: 0,
			display: 'block'
		});
		this.performCSSTransition({
			opacity: 1
		}, duration, onFinish, easing, delay);
	};
	jQuery.fn.fadeOutCSS = function(duration, onFinish, easing, delay){
		if (this.length == 0) return;
		var $this = this;
		this.performCSSTransition({
			opacity: 0
		}, duration, function(){
			$this.css('display', 'none');
			if (typeof onFinish == 'function') onFinish();
		}, easing, delay);
	};
}();

jQuery(function($){
	"use strict";

	// Force popup opening on links with ref
	if ($('a[ref=magnificPopup][class!=direct-link]').length != 0) {
		$us.getScript($us.templateDirectoryUri+'/framework/js/vendor/magnific-popup.js', function(){
			$('a[ref=magnificPopup][class!=direct-link]').magnificPopup({
				type: 'image',
				removalDelay: 300,
				mainClass: 'mfp-fade',
				fixedContentPos: true
			});
		});
	}

	// Hide background images until are loaded
	jQuery('.l-section-img').each(function(){
		var $this = $(this),
			img = new Image();

		img.onload = function(){
			if (!$this.hasClass('loaded')) {
				$this.addClass('loaded')
			}
		};

		img.src = ($this.css('background-image') || '').replace(/url\(['"]*(.*?)['"]*\)/g, '$1');
	});

	/* YouTube background */
	$(window).on('resize load', function(){
		var $container = $('.with_youtube');

		if ( ! $container.length) return;

		$container.each(function(){
			this.$container = $(this);

			var $frame = this.$container.find('iframe'),
				cHeight = this.$container.innerHeight(),
				cWidth =  this.$container.innerWidth(),
				fWidth = '',
				fHeight = '';

			if (cWidth/cHeight < 16/9) {
				fWidth = cHeight * (16/9);
				fHeight = cHeight;
			} else {
				fWidth = cWidth;
				fHeight =fWidth * (9/16);
			}

			$frame.css({
				'width': Math.round(fWidth),
				'height': Math.round(fHeight),
			});
		});
	});

});
