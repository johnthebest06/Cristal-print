/**
 * UpSolution Element: w-sharing
 */
!function($){
	"use strict";

	$('.w-sharing-item').on('click', function(){
		var $this = $(this);
		var opt = {
			url: window.location,
			text: document.title,
			lang: document.documentElement.lang,
			image: $('meta[name="og:image"]').attr('content') || ''
		};
		if ($this.attr('data-sharing-url') !== undefined && $this.attr('data-sharing-url') != '') {
			opt.url = $this.attr('data-sharing-url');
		}
		if ($this.attr('data-sharing-image') !== undefined && $this.attr('data-sharing-image') != '') {
			opt.image = $this.attr('data-sharing-image');
		}
		if (opt.image == '' || opt.image === undefined) {
			var first_image_src = $('img').first().attr('src');
			if (first_image_src != undefined && first_image_src != '') {
				opt.image = first_image_src;
			}
		}
		if ($this.hasClass('facebook')) {
			window.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(opt.url) + "&t=" + encodeURIComponent(opt.text) + "", "", "toolbar=0, status=0, width=900, height=500");
		} else if ($this.hasClass('twitter')) {
			window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(opt.text) + "&url=" + encodeURIComponent(opt.url), "", "toolbar=0, status=0, width=650, height=360");
		} else if ($this.hasClass('linkedin')) {
			window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(opt.url), 'linkedin', 'toolbar=no,width=550,height=550');
		} else if ($this.hasClass('gplus')) {
			window.open("https://plus.google.com/share?hl=" + encodeURIComponent(opt.lang) + "&url=" + encodeURIComponent(opt.url), "", "toolbar=0, status=0, width=900, height=500");
		} else if ($this.hasClass('pinterest')) {
			window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(opt.url) + '&media=' + encodeURIComponent(opt.image) + '&description=' + encodeURIComponent(opt.text), 'pinterest', 'toolbar=no,width=700,height=300');
		} else if ($this.hasClass('vk')) {
			window.open('http://vk.com/share.php?url=' + encodeURIComponent(opt.url) + '&title=' + encodeURIComponent(opt.text), '&description=&image=' + encodeURIComponent(opt.image), 'toolbar=no,width=700,height=300');
		} else if ($this.hasClass('email')) {
			window.location = 'mailto:?subject=' + opt.text + '&body=' + opt.url;
		}
	});
}(jQuery);