// SEO-оптимизированный JavaScript для dedok.fun в стиле Telegraph.ph
document.addEventListener('DOMContentLoaded', function() {
    
    // Текущий URL и заголовок для шаринга
    const currentUrl = window.location.href || 'https://dedok.fun/';
    const pageTitle = 'Скачать Zorin OS, Linux Mint, Windows 11 LTSC, OnlyOffice и анонимные браузеры бесплатно | dedok.fun';
    const shareText = 'Каталог проверенного ПО для скачивания';
    
    // Настройка внешних ссылок
    function setupExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(function(link) {
            // Убедиться что ссылка откроется в новой вкладке
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Добавить обработку для аналитики (если нужно)
            link.addEventListener('click', function() {
                // Можно добавить отслеживание кликов здесь
                console.log('External link clicked:', this.href);
            });
        });
    }
    
    // Функция показа уведомления о копировании
    function showCopyNotification() {
        const notification = document.getElementById('copyNotification');
        if (notification) {
            notification.classList.remove('hidden');
            setTimeout(function() {
                notification.classList.add('hidden');
            }, 2000);
        }
    }
    
    // Функция копирования в буфер обмена
    async function copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                // Современный API
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return successful;
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    }
    
    // Обработка кнопок поделиться
    function setupShareButtons() {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const shareType = this.getAttribute('data-share');
                let shareUrl = '';
                
                switch(shareType) {
                    case 'telegram':
                        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
                        break;
                        
                    case 'vk':
                        shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(pageTitle)}`;
                        break;
                        
                    case 'whatsapp':
                        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
                        break;
                        
                    case 'copy':
                        copyToClipboard(currentUrl).then(function(success) {
                            if (success) {
                                showCopyNotification();
                            } else {
                                // Fallback - показываем URL в prompt
                                prompt('Скопируйте ссылку:', currentUrl);
                            }
                        });
                        return;
                }
                
                if (shareUrl) {
                    // Открываем окно шаринга
                    const popup = window.open(
                        shareUrl,
                        'share',
                        'width=600,height=400,scrollbars=yes,resizable=yes'
                    );
                    
                    // Фокус на popup окне
                    if (popup) {
                        popup.focus();
                    }
                }
            });
            
            // Добавляем keyboard navigation
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // Улучшение пользовательского опыта с ссылками
    function enhanceLinkExperience() {
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(function(link) {
            // Плавные переходы при наведении
            link.addEventListener('mouseenter', function() {
                this.style.transition = 'color 0.2s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transition = 'color 0.2s ease';
            });
            
            // Обработка клавиатурной навигации
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    // Дополнительная обработка Enter на ссылках
                    if (this.target === '_blank') {
                        e.preventDefault();
                        window.open(this.href, '_blank', 'noopener,noreferrer');
                    }
                }
            });
        });
    }
    
    // SEO и производительность
    function optimizeForSEO() {
        // Lazy loading для изображений (если будут добавлены)
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
        
        // Preload критически важных ресурсов
        const preloadLinks = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];
        
        preloadLinks.forEach(function(href) {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = href;
            document.head.appendChild(link);
        });
    }
    
    // Аналитика и отслеживание (простая)
    function setupAnalytics() {
        // Отслеживание времени на странице
        const startTime = Date.now();
        
        // Отслеживание скролла
        let maxScroll = 0;
        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            maxScroll = Math.max(maxScroll, scrollPercent);
        });
        
        // Отправка данных при уходе со страницы
        window.addEventListener('beforeunload', function() {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            console.log('Page analytics:', {
                timeSpent: timeSpent + 's',
                maxScroll: maxScroll + '%',
                timestamp: new Date().toISOString()
            });
        });
    }
    
    // Обработка ошибок
    function setupErrorHandling() {
        window.addEventListener('error', function(e) {
            if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
                console.warn('Failed to load resource:', e.target.src || e.target.href);
            }
        });
        
        // Обработка необработанных промисов
        window.addEventListener('unhandledrejection', function(e) {
            console.warn('Unhandled promise rejection:', e.reason);
        });
    }
    
    // Оптимизация для мобильных устройств
    function setupMobileOptimizations() {
        // Предотвращение двойного тапа на iOS
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Улучшение скролла на iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            document.body.style.webkitOverflowScrolling = 'touch';
        }
    }
    
    // Инициализация всех функций
    function init() {
        setupExternalLinks();
        setupShareButtons();
        enhanceLinkExperience();
        optimizeForSEO();
        setupAnalytics();
        setupErrorHandling();
        setupMobileOptimizations();
        
        console.log('dedok.fun loaded successfully - Telegraph.ph style with SEO optimization');
    }
    
    // Запуск инициализации
    init();
    
    // Переинициализация внешних ссылок через небольшой интервал
    // (на случай динамического контента)
    setTimeout(function() {
        setupExternalLinks();
    }, 100);
});

// Дополнительные утилиты для работы с производительностью
(function() {
    // Оптимизация рендеринга
    if ('requestIdleCallback' in window) {
        requestIdleCallback(function() {
            // Выполнение неприоритетных задач в свободное время браузера
            console.log('Browser idle time utilized for optimizations');
        });
    }
    
    // Service Worker для кэширования (базовая версия)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Можно зарегистрировать service worker для кэширования
            console.log('Service Worker support detected');
        });
    }
})();

// Экспорт функций для потенциального использования (если понадобится)
window.dedokFun = {
    version: '1.0.0',
    initialized: true,
    shareUrl: function(url, platform) {
        // Программный способ поделиться ссылкой
        console.log('Share function called:', platform, url);
    }
};