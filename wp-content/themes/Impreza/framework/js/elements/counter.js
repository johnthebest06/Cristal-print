/**
 * UpSolution Shortcode: us_counter
 */
jQuery(function($){
	$('.w-counter').each(function(index, elm){
		var $container = $(this),
			$number = $container.find('.w-counter-number'),
			initial = ($container.data('initial') || '0') + '',
			target = ($container.data('target') || '10') + '',
			prefix = $container.data('prefix') || '',
			suffix = $container.data('suffix') || '',
			// 0 for integers, 1+ for floats (number of digits after the decimal)
			precision = 0,
			usingComma = false;
		if (target.indexOf('.') != -1) {
			precision = target.length - 1 - target.indexOf('.');
		} else if (target.indexOf(',') != -1) {
			precision = target.length - 1 - target.indexOf(',');
			usingComma = true;
			target = target.replace(',', '.');
		}
		initial = window[precision ? 'parseFloat' : 'parseInt'](initial, 10);
		target = window[precision ? 'parseFloat' : 'parseInt'](target, 10);

		if ( /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent) ) {
			if (usingComma) {
				$number.html(prefix + target.toFixed(precision).replace('\.', ',') + suffix);
			} else {
				$number.html(prefix + target.toFixed(precision) + suffix);
			}

			return;
		}

		if (usingComma) {
			$number.html(prefix + initial.toFixed(precision).replace('\.', ',') + suffix);
		} else {
			$number.html(prefix + initial.toFixed(precision) + suffix);
		}
		$us.scroll.addWaypoint(this, '15%', function(){
			var current = initial,
				step = 25,
				stepValue = (target - initial) / 25,
				interval = setInterval(function(){
					current += stepValue;
					step--;
					if (usingComma) {
						$number.html(prefix + current.toFixed(precision).replace('\.', ',') + suffix);
					} else {
						$number.html(prefix + current.toFixed(precision) + suffix);
					}
					if (step <= 0) {
						if (usingComma) {
							$number.html(prefix + target.toFixed(precision).replace('\.', ',') + suffix);
						} else {
							$number.html(prefix + target.toFixed(precision) + suffix);
						}
						window.clearInterval(interval);
					}
				}, 40);
		});
	});
});