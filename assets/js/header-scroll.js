// ============================================
// Управление появлением header при прокрутке (Desktop + Mobile)
// ============================================
(function() {
    'use strict';
    
    // Ждем полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderControl);
    } else {
        initHeaderControl();
    }
    
    function initHeaderControl() {
        var header = document.querySelector('.header');
        
        // Если header не найден, выходим
        if (!header) {
            console.error('Header не найден на странице');
            return;
        }
        
        // Проверяем мобильное устройство
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // НА МОБИЛЬНЫХ - ПОКАЗЫВАЕМ HEADER СРАЗУ И ВЫХОДИМ
        if (isMobile) {
            // Убираем скрывающие классы
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            // Убираем inline стили, если есть
            header.style.transform = '';
            header.style.opacity = '';
            console.log('Мобильный режим: header всегда виден');
            return; // Выходим, не добавляя обработчики скролла
        }
        
        // ДАЛЕЕ ТОЛЬКО ДЛЯ ДЕСКТОПА
        // Убеждаемся, что header имеет правильные начальные классы
        header.classList.remove('header-visible');
        header.classList.add('header-hidden');
        
        // Флаги для отслеживания состояния
        var isHeaderVisible = false;
        var scrollTimeout = null;
        
        // Порог прокрутки для показа header
        var SCROLL_THRESHOLD = 100;
        
        // Функция показа header
        function showHeader() {
            if (isHeaderVisible) return;
            
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            isHeaderVisible = true;
            
            console.log('Header показан');
        }
        
        // Функция скрытия header
        function hideHeader() {
            if (!isHeaderVisible) return;
            
            header.classList.remove('header-visible');
            header.classList.add('header-hidden');
            isHeaderVisible = false;
            
            console.log('Header скрыт');
        }
        
        // Проверка позиции прокрутки
        function checkScrollPosition() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > SCROLL_THRESHOLD) {
                showHeader();
            } else if (scrollTop <= SCROLL_THRESHOLD) {
                hideHeader();
            }
        }
        
        // Оптимизированный обработчик прокрутки
        function onScroll() {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = requestAnimationFrame(function() {
                checkScrollPosition();
                scrollTimeout = null;
            });
        }
        
        // Добавляем обработчик прокрутки только для десктопа
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Проверяем начальную позицию
        checkScrollPosition();
        
        console.log('Десктоп режим: header скрыт до прокрутки. Порог:', SCROLL_THRESHOLD + 'px');
    }
})();