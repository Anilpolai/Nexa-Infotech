(function ($) {
	"use strict";

	$(window).on('load', function () {
		preloader();
		wowAnimation();
	});

	
	//------------------------------------------
	// = preloader
	//-------------------------------------------
	function preloader() {
		$('#preloader').fadeOut('slow',function(){
			$(this).remove();
		});
	}

	
	/*------------------------------------------
	= back to top
	-------------------------------------------*/
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.xb-backtotop').addClass('active');
		} else {
			$('.xb-backtotop').removeClass('active');
		}
	});
	$(function () {
		$(".scroll").on('click', function () {
			$("html,body").animate({ scrollTop: 0 }, "slow");
			return false
		});
	});


	// Off Canvas - Start
	// --------------------------------------------------
	$(document).ready(function () {
		$('.cart_close_btn, .body-overlay').on('click', function () {
		$('.cart_sidebar').removeClass('active');
		$('.body-overlay').removeClass('active');
		});

		$('.cart_btn').on('click', function () {
		$('.cart_sidebar').addClass('active');
		$('.body-overlay').addClass('active');
		});
	});

	/*------------------------------------------
	= sticky header
	-------------------------------------------*/
	function stickyHeader() {
		var scrollDirection = "";
		var lastScrollPosition = 0;

		// Clone and make header sticky if the element with class 'xb-header' exists
		if ($('.xb-header').length) {
			$('.xb-header').addClass('original').clone(true).insertAfter('.xb-header').addClass('xb-header-area-sticky xb-sticky-stt').removeClass('original');
		}

		// Handle scroll events
		$(window).on("scroll", function () {
			var currentScrollPosition = $(window).scrollTop();

			// Determine scroll direction
			scrollDirection = currentScrollPosition < lastScrollPosition ? "up" : "down";
			lastScrollPosition = currentScrollPosition;

			// Check if element with ID 'xb-header-area' has class 'is-sticky'
			if ($("#xb-header-area").hasClass("is-sticky")) {
				// Add or remove classes based on scroll position for sticky header and mobile header
				if (lastScrollPosition > 100) {
					$(".xb-header-area-sticky.xb-sticky-stb").addClass("xb-header-fixed");
				} else {
					$(".xb-header-area-sticky.xb-sticky-stb").removeClass("xb-header-fixed");
				}

				// Add or remove classes for sticky header based on scroll direction
				if (scrollDirection === "up" && lastScrollPosition > 100) {
					$(".xb-header-area-sticky.xb-sticky-stt").addClass("xb-header-fixed");
				} else {
					$(".xb-header-area-sticky.xb-sticky-stt").removeClass("xb-header-fixed");
				}
			}
		});
	}
	stickyHeader();

	  /**
   * Ukiyo.js
   */
	  const parallax = new Ukiyo('.ukiyo', {
		externalRAF: true,
		scale: 1.1,
	  });

	  	/**
	   * smooth scroll
	   */
		const lenis = new Lenis({
			duration: .8,
			smoothWheel: true,
			});
		
			/**
			 * animate
			 */
			function raf(time) {
			parallax.animate();
		
			lenis.raf(time);
			requestAnimationFrame(raf);
			}
			requestAnimationFrame(raf);

	  /**
	 * Progress bar Active
	 */
	if ($(".progress-bar").length) {
		var $progress_bar = $('.progress-bar');
		$progress_bar.appear();
		$(document.body).on('appear', '.progress-bar', function() {
			var current_item = $(this);
			if (!current_item.hasClass('appeared')) {
				var percent = current_item.data('percent');
				current_item.css('width', percent + '%').addClass('appeared').parent().append('<span>' + percent + '%' + '</span>');
			}
			
		});
	};

	/*------------------------------------------
	= sidebar
	-------------------------------------------*/
	$('.sidebar-menu-close, .body-overlay').on('click', function () {
		$('.offcanvas-sidebar').removeClass('active');
		$('.body-overlay').removeClass('active');
	});

	$('.offcanvas-sidebar-btn').on('click', function () {
		$('.offcanvas-sidebar').addClass('active');
		$('.body-overlay').addClass('active');
	});
	$('.body-overlay').on('click', function () {
		$(this).removeClass('active');
		$(".header-search-form-wrapper").removeClass("open");
	});

	/*------------------------------------------
	= mobile menu
	-------------------------------------------*/
	$('.xb-nav-hidden li.menu-item-has-children > a').append('<span class="xb-menu-toggle"></span>');
	$('.xb-header-menu li.menu-item-has-children, .xb-menu-primary li.menu-item-has-children').append('<span class="xb-menu-toggle"></span>');
	$('.xb-menu-toggle').on('click', function () {
		if (!$(this).hasClass('active')) {
			$(this).closest('ul').find('.xb-menu-toggle.active').toggleClass('active');
			$(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
		}
		$(this).toggleClass('active');
		$(this).closest('.menu-item').find('> .sub-menu').toggleClass('active');
		$(this).closest('.menu-item').find('> .sub-menu').slideToggle();
	});

	$('.xb-nav-hidden li.menu-item-has-children > a').click(function (e) {
		var target = $(e.target);
		if ($(this).attr('href') === '#' && !(target.is('.xb-menu-toggle'))) {
			e.stopPropagation();
			if (!$(this).find('.xb-menu-toggle').hasClass('active')) {
				$(this).closest('ul').find('.xb-menu-toggle.active').toggleClass('active');
				$(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
			}
			$(this).find('.xb-menu-toggle').toggleClass('active');
			$(this).closest('.menu-item').find('> .sub-menu').toggleClass('active');
			$(this).closest('.menu-item').find('> .sub-menu').slideToggle();
		}
	});
	$(".xb-nav-mobile").on('click', function () {
		$(this).toggleClass('active');
		$('.xb-header-menu').toggleClass('active');
		$('body').toggleClass('body-overflow');
	});

	$(".xb-menu-close, .xb-header-menu-backdrop").on('click', function () {
		$(this).removeClass('active');
		$('.xb-header-menu').removeClass('active');
		$('body').removeClass('body-overflow');
	});

	
	/*------------------------------------------
	= data background and bg color
	-------------------------------------------*/
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ") ")
	})
	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));

	});

	/*------------------------------------------
	= wow animation
	-------------------------------------------*/
	function wowAnimation() {
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true
		});
		wow.init();
	}

	/*------------------------------------------
	= counter
	-------------------------------------------*/
	if ($(".xbo").length) {
		$('.xbo').appear();
		$(document.body).on('appear', '.xbo', function (e) {
			var odo = $(".xbo");
			odo.each(function () {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
			window.xboOptions = {
				format: 'd',
			};
		});
	}

	if ($(".xbo_trigger").length) {
		var odo = $(".xbo_trigger");
		odo.each(function () {
			var countNumber = $(this).attr("data-count");
			var odometerInstance = new Odometer({
				el: this,
				value: 0,
				format: 'd',
			});
			odometerInstance.render();
			odometerInstance.update(countNumber);
		});

		$('.xbo_trigger').appear();
		$(document.body).on('appear', '.xboh', function (e) {
			// This event handler can be empty or used for additional functionality if needed
		});
	}

	/*------------------------------------------
	= nice select
	-------------------------------------------*/
	$('.nice-select').niceSelect();

	/*------------------------------------------
	= click button active
	-------------------------------------------*/
	$(function () {
		$('.stock-btn-action li').on('click', function () {
			var active = $('.stock-btn-action li.active');
			active.removeClass('active');
			$(this).addClass('active');
		});
	});

	/*------------------------------------------
	= click button active
	-------------------------------------------*/
	$(function () {
		$('.stock-btn-action-two li').on('click', function () {
			var active = $('.stock-btn-action-two li.active');
			active.removeClass('active');
			$(this).addClass('active');
		});
	});


	/*------------------------------------------
	= portfolio slider
	-------------------------------------------*/
	var slider = new Swiper(".xb-protfolio-slider", {
		loop: true,
		spaceBetween: 80,
		speed: 400,
		slidesPerView: 4,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		pagination: {
			el: ".swiper-pagination",
		},
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			'992': {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			'768': {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= gallery slider
	-------------------------------------------*/
	var slider = new Swiper(".gallery-slider", {
		loop: true,
		spaceBetween: 100,
		speed: 400,
		slidesPerView: 3,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
				spaceBetween: 80,
			},
			'992': {
				slidesPerView: 3,
				spaceBetween: 50,
			},
			'768': {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			'576': {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= gallery slider
	-------------------------------------------*/
	var slider = new Swiper(".career-gallery-slider", {
		loop: true,
		spaceBetween: 80,
		speed: 400,
		slidesPerView: 4,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 4,
				spaceBetween: 60,
			},
			'992': {
				slidesPerView: 3,
				spaceBetween: 50,
			},
			'768': {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			'576': {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= portfolio gallery slider
	-------------------------------------------*/
	var slider = new Swiper(".portfolio-gallery-slider", {
		loop: true,
		spaceBetween: 60,
		speed: 400,
		slidesPerView: 3,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
				spaceBetween: 50,
			},
			'992': {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			'768': {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			'576': {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			'0': {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
	});
	/*------------------------------------------
	= post gallery slider
	-------------------------------------------*/
	var slider = new Swiper('.post-gallery-slider', {
		spaceBetween: 0,
		slidesPerView: 1,
		centeredSlides: true,
		roundLengths: true,
		loop: true,
		loopAdditionalSlides: 30,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: ".post-gallery-button-next",
			prevEl: ".post-gallery-button-prev",
		},
		speed: 400,
	});


	/*------------------------------------------
	= testimonial slider
	-------------------------------------------*/
	var slider = new Swiper(".xb-testimonial-slider", {
		loop: true,
		spaceBetween: 0,
		speed: 400,
		slidesPerView: 1,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		pagination: {
			el: ".swiper-pagination",
		},
		breakpoints: {
			'1600': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	
	/*------------------------------------------
	= testimonial slider
	-------------------------------------------*/
	var slider = new Swiper(".slider", {
		loop: true,
		spaceBetween: 100,
		speed: 400,
		slidesPerView: 2,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: ".testimonial-button-next",
			prevEl: ".testimonial-button-prev",
		},
		breakpoints: {
			'1600': {
				slidesPerView: 2,
			},
			'1200': {
				slidesPerView: 2,
				spaceBetween: 50,
			},
			'992': {
				slidesPerView: 2,
				spaceBetween: 40,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	/*------------------------------------------
	= brand slider
	-------------------------------------------*/
	var slider = new Swiper(".brand-slider", {
		loop: true,
		spaceBetween: 250,
		speed: 400,
		slidesPerView: 6,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 6,
			},
			'1200': {
				slidesPerView: 5,
				spaceBetween: 100,
			},
			'992': {
				slidesPerView: 2,
				spaceBetween: 100,
			},
			'768': {
				slidesPerView: 3,
				spaceBetween: 50,
			},
			'576': {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= inhover active
	-------------------------------------------*/
	$(".xb-mouseenter").on('mouseenter', function () {
		$(".xb-mouseenter").removeClass("active");
		$(this).addClass("active");
	});
	$(".xb-mouseenter2").on('mouseenter', function () {
		$(".xb-mouseenter2").removeClass("active");
		$(this).addClass("active");
	});

	/*------------------------------------------
	= magnificPopup
	-------------------------------------------*/
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	$('.popup-video').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-zoom-in',
	});

	/*------------------------------------------
	= Accordion Box
	-------------------------------------------*/
	if ($(".accordion_box").length) {
		$(".accordion_box").on("click", ".acc-btn", function () {
			var outerBox = $(this).parents(".accordion_box");
			var target = $(this).parents(".accordion");

			if ($(this).next(".acc_body").is(":visible")) {
				$(this).removeClass("active");
				$(this).next(".acc_body").slideUp(300);
				$(outerBox).children(".accordion").removeClass("active-block");
			} else {
				$(outerBox).find(".accordion .acc-btn").removeClass("active");
				$(this).addClass("active");
				$(outerBox).children(".accordion").removeClass("active-block");
				$(outerBox).find(".accordion").children(".acc_body").slideUp(300);
				target.addClass("active-block");
				$(this).next(".acc_body").slideDown(300);
			}
		});
	}

	/*------------------------------------------
	= marquee
	-------------------------------------------*/
	$('.marquee-left').marquee({
		speed: 50,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});	
	$('.marquee-right').marquee({
		speed: 30,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});

	$('.hero-marquee-left').marquee({
		speed: 30,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});

	$('.featured-brand-marquee').marquee({
		speed: 550,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});

	$('.marq-strok-left').marquee({
		speed: 30,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});

	
	/*------------------------------------------
	= element parallax
	-------------------------------------------*/
	$('.xb-element-parallax').each(function () {
        var $this = $(this);
        var dampingFactor = 0.5;

        function handleMouseMove(e) {
            var offset = $this.offset();
            var mouseX = e.pageX - offset.left;
            var mouseY = e.pageY - offset.top;
            var translateX = (mouseX - $this.width() / 2) * dampingFactor;
            var translateY = (mouseY - $this.height() / 2) * dampingFactor;

            var translateTransform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
            $this.css({
                'transform': translateTransform,
                'transition': 'transform 0.1s ease-out'  // Adjust the duration and easing as needed
            });
        }

        function resetTransform() {
            $this.css({
                'transform': 'none',
                'transition': 'transform 0.3s ease-out'  // Adjust the duration and easing as needed
            });
        }

        if ($this.closest('.xb-parent-element-parallax').length) {
            var pare2 = $this.closest('.xb-parent-element-parallax');
            pare2.mousemove(function (e) {
                handleMouseMove(e);
            });
            pare2.mouseleave(resetTransform);
        } else {
            $this.mousemove(handleMouseMove);
            $this.mouseleave(resetTransform);
        }
    });

	  

	
	


})(jQuery);



