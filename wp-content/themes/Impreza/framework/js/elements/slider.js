/**
 * UpSolution Shortcode: us_slider
 */
(function($){
	$.fn.wSlider = function(){
		return this.each(function(){
			$us.getScript($us.templateDirectoryUri+'/framework/js/vendor/royalslider.js', function(){
				var $this = $(this),
					$frame = $this.find('.w-slider-h'),
					$slider = $this.find('.royalSlider'),
					$options = $this.find('.w-slider-json'),
					options = $options[0].onclick() || {};
				$options.remove();
				if (!$.fn.royalSlider) {
					return;
				}
				// Always apply certain fit options for blog listing slider
				if ($this.parent().hasClass('w-blogpost-preview')) {
					options['imageScaleMode'] = 'fill';
				}
				// Always apply certain fit option for grid listing slider
				if ($this.parent().hasClass('w-grid-item-elm')) {
					options['imageScaleMode'] = 'fill';
				}
				$slider.royalSlider(options);
				var slider = $slider.data('royalSlider');
				if (options.fullscreen && options.fullscreen.enabled) {
					// Moving royal slider to the very end of body element to allow a proper fullscreen
					var rsEnterFullscreen = function(){
						$slider.appendTo($('body'));
						slider.ev.off('rsEnterFullscreen', rsEnterFullscreen);
						slider.ev.on('rsExitFullscreen', rsExitFullscreen);
					};
					slider.ev.on('rsEnterFullscreen', rsEnterFullscreen);
					var rsExitFullscreen = function(){
						$slider.prependTo($frame);
						slider.ev.off('rsExitFullscreen', rsExitFullscreen);
						slider.ev.on('rsEnterFullscreen', rsEnterFullscreen);
					};
				}
				$us.$canvas.on('contentChange', function(){
					$slider.parent().imagesLoaded(function(){
						slider.updateSliderSize();
					});
				});
			}.bind(this));


		});
	};
	$(function(){
		jQuery('.w-slider').wSlider();
	});
})(jQuery);