'use strict';

window.jQuery = window.$ = require('jquery');
require('jquery-ui');
require('jquery-ui/ui/version');
require('jquery-ui/ui/plugin');
require('jquery-ui/ui/scroll-parent');
require('jquery-ui/ui/safe-active-element');
require('jquery-ui/ui/widgets/mouse');
require('jquery-ui/ui/widgets/draggable');
require('./vendor/jquery-ui-touch-punch');

module.exports = function draggable(cursor, container) {
  let cursorScrollWidth =
    cursor.get(0).parentElement.clientWidth / 2 - cursor.get(0).offsetWidth;
  let containerScrollWidth =
    container.get(0).scrollWidth - container.get(0).clientWidth;

  window.addEventListener('resize', function() {
    cursorScrollWidth =
      cursor.get(0).parentElement.clientWidth / 2 - cursor.get(0).offsetWidth;
    containerScrollWidth =
      container.get(0).scrollWidth - container.get(0).clientWidth;
    hideCursor();
  });

  cursor.draggable({
    axis: 'x',
    containment: 'parent',
    start: function() {
      $(this).css({ width: '' });
    },
    stop: function(event, ui) {
      $(this).css({ width: '' });
      $(this).removeClass('is-dragging');

      if (ui.position.left < 0) {
        $(this).animate(
          {
            left: 0,
          },
          500
        );
        container.animate(
          {
            left: 0,
          },
          500
        );
      }
    },
    drag: function(event, ui) {
      $(this).addClass('is-dragging');
      if (ui.position.left > cursorScrollWidth) {
        ui.position.left = cursorScrollWidth;
      } else if (
        parseInt(container.css('left').replace('px', '')) > 100 &&
        ui.position.left < 0
      ) {
        ui.position.left =
          -cursorScrollWidth *
          (parseInt(container.css('left').replace('px', '')) /
            containerScrollWidth);
      } else {
        container.css(
          'left',
          -containerScrollWidth * (ui.position.left / cursorScrollWidth)
        );
      }
      hideIndicator();
    },
  });
  cursor.mousedown(function() {
    $(this).addClass('is-dragging'); // Because drag/start event doesnt trigger onclick
  });
  cursor.mouseup(function() {
    $(this).removeClass('is-dragging');
  });

  container.draggable({
    axis: 'x',
    revert: function(event, ui) {
      if ($(this).hasClass('revert-left')) {
        cursor.animate(
          {
            left: 0,
          },
          500
        );

        $(this).data('uiDraggable').originalPosition = {
          left: 0,
        };
        return !event;
      } else if ($(this).hasClass('revert-right')) {
        $(this).data('uiDraggable').originalPosition = {
          left: -containerScrollWidth,
        };
        return !event;
      } else {
        return false;
      }
    },
    stop: function() {
      $(this).css({ width: '' });
      cursor.removeClass('is-dragging');
    },
    drag: function(event, ui) {
      cursor.addClass('is-dragging');
      if (ui.position.left > 0) {
        $(this).removeClass('revert-right');
        $(this).addClass('revert-left');
        cursor.css(
          'left',
          -cursorScrollWidth * (ui.position.left / containerScrollWidth)
        );
        if (ui.position.left > 100) {
          ui.position.left = 100;
          cursor.css(
            'left',
            -cursorScrollWidth * (ui.position.left / containerScrollWidth)
          );
        }
      } else if (ui.position.left < -containerScrollWidth) {
        $(this).removeClass('revert-left');
        $(this).addClass('revert-right');
        if (ui.position.left < -containerScrollWidth - 100) {
          ui.position.left = -containerScrollWidth - 100;
        }
      } else {
        $(this).removeClass('revert-left');
        $(this).removeClass('revert-right');
        cursor.css(
          'left',
          -cursorScrollWidth * (ui.position.left / containerScrollWidth)
        );
      }
      hideIndicator();
    },
  });

  // Hide arrow indicator when the cursor is on the left of the screen
  function hideIndicator() {
    if (
      parseInt(cursor.css('left').replace('px', '')) >
      cursorScrollWidth - 100
    ) {
      cursor.addClass('draggable__indicator--hide');
    } else {
      cursor.removeClass('draggable__indicator--hide');
    }
  }

  //Hide cursor when no need
  function hideCursor() {
    if (containerScrollWidth == 0) {
      cursor.css('display', 'none');
      container.css('left', '0');
      container.css('justify-content', 'center');
      container.draggable('disable');
    } else {
      cursor.css('display', 'block');
      container.css('justify-content', 'flex-start');
      container.draggable('enable');
    }
  }

  hideCursor();
};
