/**
 * UpSolution Shortcode: us_logos
 */
!function($){
	"use strict";

	$us.Wlogos = function(container, options){
		this.init(container, options);
	};

	$us.Wlogos.prototype = {
		init: function(container, options){
			this.$container = $(container);
			this.$list = this.$container.find('.w-logos-list');
			this.$jsonContainer = this.$container.find('.w-logos-json');
			this.jsonData = this.$jsonContainer[0].onclick() || {};
			this.$jsonContainer.remove();
			this.breakpoints = this.jsonData.carousel_breakpoints || {};
			this.carouselSettings = this.jsonData.carousel_settings || {};

			$us.getScript($us.templateDirectoryUri+'/framework/js/vendor/owl.carousel.js', function() {
				this.carouselOptions = {
					mouseDrag: ! jQuery.isMobile,
					items: parseInt(this.carouselSettings.items),
					loop: true,
					rtl: $('.l-body').hasClass('rtl'),
					nav: this.carouselSettings.nav,
					dots: this.carouselSettings.dots,
					center: this.carouselSettings.center,
					autoplay: this.carouselSettings.autoplay,
					autoplayTimeout: this.carouselSettings.timeout,
					autoplayHoverPause: true,
					slideBy: this.carouselSettings.slideby,
					responsive: this.breakpoints,
				};

				if (this.carouselSettings.smooth_play == 1) {
					this.carouselOptions.slideTransition = 'linear';
					this.carouselOptions.autoplaySpeed = this.carouselSettings.timeout;
					this.carouselOptions.slideBy = 1;
				}

				this.$list.owlCarousel(this.carouselOptions);
			}.bind(this));
		},
	};

	$.fn.Wlogos = function(options){
		return this.each(function(){
			$(this).data('Wlogos', new $us.Wlogos(this, options));
		});
	};

	$(function(){
		$('.w-logos.type_carousel').Wlogos();
	});
}(jQuery);