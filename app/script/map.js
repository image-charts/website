"use strict";
const throttle = require("lodash.throttle");

module.exports = ($, $window) => {
  let mapHasTriggered = false;
  $window.on(
    "scroll resize",
    throttle(function() {
      if (mapHasTriggered) {
        return;
      }
      if ($(".map").hasClass("in-view")) {
        setTimeout(function() {
          countdown(490, 500, 500);
        }, 2800);
        mapHasTriggered = true;
      }
    }, 100)
  );

  let mapCount = document.querySelector(".map__popover-number");

  function countdown(i, to, MAX) {
    mapCount.innerHTML = i + "ms";
    i = i + Math.floor(Math.random() * 5) * (i > to ? -1 : 1);

    setTimeout(function() {
      countdown(
        i,
        Math.min(Math.floor(480 + Math.random() * 200 / 10), MAX),
        MAX
      );
    }, 200 + Math.random() * 500);
  }
};
