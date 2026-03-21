/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


// Принудительная инициализация header как на главной
$(document).ready(function() {
    // Убеждаемся что header имеет класс alt
    $('#header').addClass('alt');
    
    // Инициализируем scrollex для баннера
    if ($('#banner').length > 0) {
        $('#banner').scrollex({
            bottom: $('#header').outerHeight() + 1,
            terminate: function() { 
                $('#header').removeClass('alt'); 
            },
            enter: function() { 
                $('#header').addClass('alt'); 
            },
            leave: function() { 
                $('#header').removeClass('alt'); 
            }
        });
    }
});


(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (typeof browser !== 'undefined' && browser.mobile)
			$body.addClass('is-mobile');
		else {
			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});
		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

			// Добавляем обработку свайпа для открытия меню
(function() {
	var startX, startY, startTime;
	var minSwipeDistance = 50; // Минимальное расстояние свайпа
	var maxSwipeTime = 500; // Максимальное время свайпа (мс)
	
	// Находим кнопку бургер-меню по вашему HTML
	var $menuToggle = $('.nav__toggle');
	
	console.log('Кнопка меню найдена:', $menuToggle.length > 0);
	
	function handleTouchStart(e) {
		var touch = e.touches[0];
		startX = touch.clientX;
		startY = touch.clientY;
		startTime = Date.now();
	}
	
	function handleTouchEnd(e) {
		// Проверяем, что это мобильное устройство
		if (window.innerWidth > 980) {
			return;
		}
		
		// Если нет начальных координат, игнорируем
		if (startX === undefined || startY === undefined) return;
		
		var touch = e.changedTouches[0];
		var endX = touch.clientX;
		var endY = touch.clientY;
		var endTime = Date.now();
		
		// Вычисляем дистанцию и время
		var deltaX = endX - startX;
		var deltaY = endY - startY;
		var deltaTime = endTime - startTime;
		
		// Проверяем условия свайпа
		var isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 2;
		var isLongEnough = Math.abs(deltaX) > minSwipeDistance;
		var isFastEnough = deltaTime < maxSwipeTime;
		
		if (isHorizontal && isLongEnough && isFastEnough) {
			// Свайп справа налево (открываем меню)
			if (deltaX < -minSwipeDistance) {
				e.preventDefault();
				
				if (!$body.hasClass('is-menu-visible')) {
					console.log('Открываем меню');
					// Эмулируем клик по кнопке меню
					$menuToggle.trigger('click');
				}
			}
			
			// Свайп слева направо (закрываем меню)
			if (deltaX > minSwipeDistance) {
				e.preventDefault();
				
				if ($body.hasClass('is-menu-visible')) {
					console.log('Закрываем меню');
					// Эмулируем клик по кнопке закрытия
					$('.close').trigger('click');
				}
			}
		}
		
		// Сбрасываем значения
		startX = undefined;
		startY = undefined;
	}
	
	// Добавляем обработчики
	document.addEventListener('touchstart', handleTouchStart);
	document.addEventListener('touchend', handleTouchEnd);
	
})();

	// Header - УБРАЛ ПРОВЕРКУ $header.hasClass('alt')
	if ($banner.length > 0) { // Убрал проверку на класс 'alt'
		
		// Проверяем ширину экрана
		function isDesktop() {
			return window.innerWidth > 980; // Ширина больше планшета
		}
		
		// Инициализируем только на десктопе
		if (isDesktop()) {
			$window.on('resize', function() { 
				$window.trigger('scroll'); 
			});

			$banner.scrollex({
				bottom: $header.outerHeight() + 1,
				terminate: function() { 
					if (isDesktop()) $header.removeClass('alt'); 
				},
				enter: function() { 
					if (isDesktop()) $header.addClass('alt'); 
				},
				leave: function() { 
					if (isDesktop()) $header.removeClass('alt'); 
				}
			});
		} else {
			// На мобильных - всегда показываем header
			$header.removeClass('alt');
		}
		
		// При изменении размера окна
		$window.on('resize', function() {
			if (!isDesktop()) {
				// На мобильных - убираем класс alt
				$header.removeClass('alt');
			} else {
				// На десктопе - переинициализируем scrollex
				$window.trigger('scroll');
			}
		});
		
		// Инициализация при загрузке
		$window.trigger('scroll');
	}


	

})(jQuery);