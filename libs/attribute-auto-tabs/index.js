'use strict';

import { ready } from "../../utils/page-ready.js";
import styles from './libs/styles.css';

function injectStyles(styles) {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

function initialize() {
   injectStyles(styles);

   $(function () {
      if ($(window).width() > 767) {

         const TAB_ITEM_ATTRIBUTE = 'sx-autotabs-item';
         const TAB_MENU_ATTRIBUTE = 'sx-autotabs-menu';
         const PROGRESS_BAR_ATTRIBUTE = 'sx-autotabs-progress-bar';
         const AUTOPLAY_ATTRIBUTE = 'sx-autotabs-function';
         const TIMING_ATTRIBUTE = 'sx-autotabs-timing';
         const START_TYPE_ATTRIBUTE = 'sx-autotabs-function-start';

         function autoplayTabs($tabsMenu) {
            const $activeTab = $tabsMenu.find(`[${TAB_ITEM_ATTRIBUTE}].cc-active`);
            let $nextTab = $activeTab.next(`[${TAB_ITEM_ATTRIBUTE}]`);
            if ($nextTab.length === 0) {
               $nextTab = $tabsMenu.find(`[${TAB_ITEM_ATTRIBUTE}]:first`);
            }
            $nextTab.trigger('click');
         }

         function startTimer($tabsMenu, timing) {
            const interval = timing;
            const timer = setInterval(function () {
               autoplayTabs($tabsMenu);
            }, interval);
            $tabsMenu.data('timer', timer);
            console.log("tabs timer started!");
         }

         function resetTimer($tabsMenu, timing) {
            const timer = $tabsMenu.data('timer');
            clearInterval(timer);
            startTimer($tabsMenu, timing);
         }

         $(`[${AUTOPLAY_ATTRIBUTE}="autoplay"]`).each(function () {
            const $tabsMenu = $(this);
            const timing = parseInt($tabsMenu.attr(TIMING_ATTRIBUTE));

            // Autoplay tab change
            $tabsMenu.find(`[${TAB_ITEM_ATTRIBUTE}]`).on('click', function () {
               $tabsMenu.find(`[${TAB_ITEM_ATTRIBUTE}]`).removeClass('cc-active');
               $(this).addClass('cc-active');
               resetTimer($tabsMenu, timing);
               $tabsMenu.find(`[${PROGRESS_BAR_ATTRIBUTE}]`).stop().css({ width: '100%' });
               $(this).find(`[${PROGRESS_BAR_ATTRIBUTE}]`).css({ width: 0 })
                  .animate({ width: '100%' }, timing);
            });

            const startType = $tabsMenu.attr(START_TYPE_ATTRIBUTE);
            if (startType === 'scroll-into-view') {
               // Check if tabs are in view and start autoplay
               const options = {
                  root: null,
                  rootMargin: '0px',
                  threshold: 0.5
               };

               const observer = new IntersectionObserver(function (entries, observer) {
                  entries.forEach(function (entry) {
                     if (entry.isIntersecting) {
                        // Start timer and play active tab animation
                        startTimer($tabsMenu, timing);
                        $tabsMenu.find(`[${TAB_ITEM_ATTRIBUTE}].cc-active`)
                           .find(`[${PROGRESS_BAR_ATTRIBUTE}]`)
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
               $tabsMenu.find(`[${TAB_ITEM_ATTRIBUTE}].cc-active`)
                  .find(`[${PROGRESS_BAR_ATTRIBUTE}]`)
                  .css({ width: 0 })
                  .animate({ width: '100%' }, timing);
            }
         });

         // Static tab change
         $(`[${AUTOPLAY_ATTRIBUTE}="static"] [${TAB_ITEM_ATTRIBUTE}]`).on('click', function () {
            const $tabsMenu = $(this).closest(`[${TAB_MENU_ATTRIBUTE}]`);
            $tabsMenu.find(`[${TAB_ITEM_ATTRIBUTE}]`).removeClass('cc-active');
            $(this).addClass('cc-active');
         });
      }
   });
}

ready(initialize);
