'use strict';
const $ = require('jquery');
window.$ = $;

$(function() {
  // Pricing
  require('./pricing');

  if ($('body').hasClass('js-home')) {
    const TWEEN = require('@tweenjs/tween.js');
    const throttle = require('lodash.throttle');
    const gitCodeAnimation = require('./gitcode');

    //Header
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const siteContent = document.querySelector('.js-site-content');

    setTimeout(function() {
      header.className += ' js-start-animate';
      setTimeout(function() {
        headerAnimation();
      }, 500);
    }, 2000);

    // Draggable customer
    const dragTestimonials = require('./draggable');
    dragTestimonials($('.draggable'), $('.customer__wrapper'));

    // Replace 100vh on mobile
    if (window.matchMedia('(max-width: 768px)').matches) {
      $('.header__content').css('min-height', window.innerHeight);
    }

    //Add class when user's view is on the element
    let $window = $(window);
    let $animation_elements = $('.js-animate');

    $window.on('scroll resize', check_if_in_view);

    function check_if_in_view() {
      let window_height = $window.height();
      let window_top_position = $window.scrollTop();
      let window_bottom_position = window_top_position + window_height;

      $.each($animation_elements, function() {
        let $element = $(this);
        let element_height = $element.outerHeight();
        let element_top_position = $element.offset().top;
        let element_bottom_position = element_top_position + element_height;

        if (
          element_bottom_position >= window_top_position &&
          element_top_position <= window_bottom_position
        ) {
          $element.addClass('in-view');
        }
      });
    }

    //chat
    let chatHasTriggered = false;
    let chatMessage = '/bot display cpu server-1';
    let chatContent = document.querySelector('.chat__content');

    let gitDiffTriggered = false;
    $window.on(
      'scroll resize',
      throttle(function() {
        if ($('.js-window--chat').hasClass('in-view') && !chatHasTriggered) {
          setTimeout(function() {
            chatAnimation(chatMessage);
          }, 800);
          chatHasTriggered = true;
        }

        if ($('.window--code').hasClass('in-view') && !gitDiffTriggered) {
          gitDiffTriggered = true;
          gitCodeAnimation();
        }
      }, 300)
    );

    animate();

    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }

    function chatAnimation(text) {
      const CHART_URL =
        'https://image-charts.com/chart?cht=bvg&chd=t:10,15,25,30,40,80&chs=736x500&chxt=x,y&chxl=0:%7CMarch%20%2718%7CApril%20%2718%7CMay%20%2718%7CJune%20%2718%7CJuly%20%2718%7CAugust%20%2718%7C&chdl=Visitors%20(in%20thousands%29&chf=b0,lg,90,05B142,1,0CE858,0.2&chxs=1N**K&chtt=Visitors%20report&chma=0,0,10,10&chl=%7C%7C%7C%7C%2033%25%20!%7Cx2%20!&chan=1600,easeOutBack&icac=fgribreau&ichm=e54deaff95a684371e50f24282e0cd5157d216b46f19d48ec3efa4e8f12ed1d3';
      typeWriter(chatMessage, '.chat__message', 0, function() {
        chatContent.innerHTML +=
          '<div class="chat__anwser chat__anwser--reverse">' +
          chatMessage +
          '</div>';
        document.querySelector('.chat__message').innerHTML =
          '<span class="chat__cursor" aria-hidden="true"></span>Type a message...';

        setTimeout(function() {
          chatContent.innerHTML +=
            '<div class="chat__anwser chat__anwser--respond"><img src="' +
            CHART_URL +
            '" /></div>';
        }, 750);
      });
    }

    function typeWriter(text, target, i = 0, f) {
      if (i <= text.length) {
        document.querySelector(target).innerHTML =
          text.substring(0, i + 1) +
          '<span class="chat__cursor" aria-hidden="true"></span>';
        setTimeout(function() {
          typeWriter(text, target, i + 1, f);
        }, 60);
      } else {
        f();
      }
    }

    //map popover
    require('./map')($, $window);
    // Header animation window
    const windowAnim = $('.js-window');

    function headerAnimation() {
      setTimeout(() => {
        const chartUrl =
          'https://image-charts.com/chart?chd=t:7,14,25,51,36,49,61,74,78,89&chs=320x200&cht=bvs&chxt=y';
        typeWriter(chartUrl, '.window__url--ic', 0, () => {
          windowAnim
            .children('.window__content')
            .append("<img src='" + chartUrl + "'>");
          $('.reverse-ellipsis').addClass('reset');

          setTimeout(() => {
            var imgHeader1 = new Image();
            imgHeader1.src =
              'https://image-charts.com/chart?chd=t:7,14,25,51,36,49,61,74,78,89&chs=320x200&cht=bvs&chxt=y';
            imgHeader1.onload = function() {
              $('.window__url--ic')
                .empty()
                .append(
                  '<span class="window__overline--copied">https://image-charts.com/chart?chd=t:<span class="window__url--ic-update">7,14,25,51</span>,36,49,61,74,78,89&chs=320x200&cht=bvs&chxt=y</span>'
                );
              windowAnim
                .children('.window__header')
                .children('.window__url')
                .addClass('zoom');

              setTimeout(() => {
                $('.window__url--ic-update').addClass('start');

                setTimeout(() => {
                  $('.window__url--ic-update').removeClass('start');
                  typeWriter(
                    '58,42,31,25',
                    '.window__url--ic-update',
                    0,
                    () => {
                      windowAnim
                        .children('.window__header')
                        .children('.window__url')
                        .removeClass('zoom');

                      var imgHeader2 = new Image();
                      imgHeader2.src =
                        'https://image-charts.com/chart?chd=t:58,42,31,25,36,49,61,74,78,89&chs=320x200&cht=bvs&chxt=y';
                      imgHeader2.onload = function() {
                        windowAnim
                          .children('.window__content')
                          .empty()
                          .append(
                            "<img src='https://image-charts.com/chart?chd=t:58,42,31,25,36,49,61,74,78,89&chs=320x200&cht=bvs&chxt=y'>"
                          );
                        $('.window__url--ic-update')
                          .children('.chat__cursor')
                          .remove();

                        setTimeout(function() {
                          $('.window__overline--copied').addClass('start');
                          setTimeout(() => {
                            $('.window__url-copy').removeClass('hide');

                            setTimeout(() => {
                              windowAnim.addClass('leave-left');

                              setTimeout(() => {
                                windowAnim.addClass('hide');
                                headerAnimation2();
                              }, 500);
                            }, 1000);
                          }, 500);
                        }, 750);
                      };
                    }
                  );
                }, 750);
              }, 750);
            };
          }, 750);
        });
      }, 500);
    }

    const flip = $('.js-flip');
    const $lisHeader = $('.window--code-header .code').find('li');

    function headerAnimation2() {
      flip.removeClass('hide');
      setTimeout(function() {
        flip.addClass('come-top');

        setTimeout(function() {
          let cursor2 = 0;
          new TWEEN.Tween({
            x: 0,
          })
            .to(
              {
                x: $lisHeader.length * 100,
              },
              1000
            )
            .easing(TWEEN.Easing.Quartic.In)
            .onUpdate(function() {
              if (this.x > cursor2 * 100) {
                $lisHeader.eq(cursor2).addClass('code--animate');
                cursor2++;
              }
            })
            .onComplete(() => {
              setTimeout(function() {
                $('#cursor--first').remove();
                $('.js-code--header li:nth-child(3)').after(
                  '<li class="code--animate"><span class="code"><span class="v"><span class="chat__cursor code--img" aria-hidden="true"></span></span></span></li>'
                );

                setTimeout(function() {
                  typeWriter('img', '.code--img', 0, function() {
                    $('.code--img')
                      .empty()
                      .append(
                        '&lt;img src="<span class="chat__cursor code--img" aria-hidden="true"></span>" /&gt'
                      )
                      .removeClass('chat__cursor');

                    setTimeout(function() {
                      $('.code--img')
                        .empty()
                        .append(
                          '&lt;img src="https://image-charts.com/chart?chd=t:_,30,-30,50,80,200&chs=320x200&cht=bvs&chxt=y" /&gt'
                        );
                      setTimeout(function() {
                        flip.addClass('flip--flipped');

                        setTimeout(function() {
                          $('.js-mail').addClass('start');
                        }, 350);
                      }, 750);
                    }, 1000);
                  });
                }, 750);
              }, 750);
            })
            .start();
        }, 500);
      }, 750);
    }

    // Gif features
    const gifWindow = $('.js-window--gif');
    const dropGif = $('.js-mail__gif');

    var imgGif = new Image();
    imgGif.src =
      'https://image-charts.com/chart?cht=bvs&chs=700x480&chd=t%3A10%2C40%2C60%2C80%2C90%2C110&chco=03A9F4&chxt=x%2Cy&chxl=0%3A%7CJanuary%7CFrebruary%7CMarch%7CApril%7CMay%7CJune%7CJuly&chtt=Monthly%20Recurring%20Revenue%20in%20thousands%20of%20%24&chan=1200&chts=000000%2C25&icac=fgribreau&ichm=7c9abf650d2a961a2ad5c50439354a607e85e06c7efbf02a15cacc4754f0d48b';
    imgGif.onload = function() {
      $('#js-gmail__open-button').click(function() {
        $('#js-gmail__open-button').addClass('hide');
        $('.gmail__mail--gif').removeClass('h-invisible');
        dropGif.append(imgGif);
        $('.window__veil--gif').addClass('hidden');
        setTimeout(function() {
          $('.window__veil--gif').addClass('hide');
        }, 300);
      });
    };

    $window.trigger('scroll');
  }

  // Modal
  require('./modal');

  //Smooth scroll
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate(
            {
              scrollTop: target.offset().top,
            },
            500
          );
          return false;
        }
      }
    });
  });

  //favicon
  const animatedGif = require('./faviconGif');

  animatedGif(
    'https://image-charts.com/chart?chd=t:10,40&chs=64x64&cht=bvg&chan=1000&chf=b0,lg,90,03a9f4,0,3f51b5,1&icac=fgribreau&ichm=a7ba2aafd1b176a153cf9949c71234e179f3e0d70c5abdee885cba8e30a5c677'
  );
});
