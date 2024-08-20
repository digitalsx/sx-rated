$(function () {
  if ($(window).width() > 767) {

    function autoplayTabs($tabsMenu) {
      var $activeTab = $tabsMenu.find('.big-tabs_menu-item.cc-active');
      var $nextTab = $activeTab.next('.big-tabs_menu-item');
      if ($nextTab.length === 0) {
        $nextTab = $tabsMenu.find('.big-tabs_menu-item:first');
      }
      $nextTab.trigger('click');
    }

    function startTimer($tabsMenu, timing) {
      var interval = timing;
      var timer = setInterval(function () {
        autoplayTabs($tabsMenu);
      }, interval);
      $tabsMenu.data('timer', timer);
      console.log("tabs timer started!");
    }

    function resetTimer($tabsMenu, timing) {
      var timer = $tabsMenu.data('timer');
      clearInterval(timer);
      startTimer($tabsMenu, timing);
    }

    $('[tab-function="autoplay"]').each(function () {
      var $tabsMenu = $(this);
      var timing = parseInt($tabsMenu.attr('tab-timing'));

      // Autoplay tab change
      $tabsMenu.find('.big-tabs_menu-item').on('click', function () {
        $tabsMenu.find('.big-tabs_menu-item').removeClass('cc-active');
        $(this).addClass('cc-active');
        resetTimer($tabsMenu, timing);
        $tabsMenu.find('.big-tabs_progress-bar').stop().css({ width: '100%' });
        $(this).find('.big-tabs_progress-bar').css({ width: 0 })
          .animate({ width: '100%' }, timing);
      });

      var startType = $tabsMenu.attr('tab-function-start');
      if (startType === 'scroll-into-view') {
        // Check if tabs are in view and start autoplay
        var options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.5
        };

        var observer = new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              // Start timer and play active tab animation
              startTimer($tabsMenu, timing);
              $tabsMenu.find('.big-tabs_menu-item.cc-active').find(
                  '.big-tabs_progress-bar')
                .css({ width: 0 })
                .animate({ width: '100%' }, timing);

              observer.unobserve(entry.target);
            }
          });
        }, options);

        observer.observe(this);
      } else {
        // Start autoplay on page load
        startTimer($tabsMenu, timing);
        $tabsMenu.find('.big-tabs_menu-item.cc-active').find('.big-tabs_progress-bar')
          .css({ width: 0 })
          .animate({ width: '100%' }, timing);
      }
    });

    // Static tab change
    $('[tab-function="static"] .big-tabs_menu-item').on('click', function () {
      var $tabsMenu = $(this).closest('.big-tabs_menu');
      $tabsMenu.find('.big-tabs_menu-item').removeClass('cc-active');
      $(this).addClass('cc-active');
    });
  }
});