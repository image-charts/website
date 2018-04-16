"use strict";

const $ = require("jquery");
const SuperGif = require("./vendor/supergif");

module.exports = function animatedFavicon(gif) {
  var $parent = document.createElement("div");
  var $gif = document.createElement("img");
  var $favicon = document.createElement("link");

  // Required for CORS
  $gif.crossOrigin = "anonymous";

  $gif.src = gif;

  $favicon.rel = "icon";

  window.parent.document.head.appendChild($favicon);

  $parent.appendChild($gif);

  var supergif = new SuperGif({ gif: $gif, loop_mode: false }),
    $canvas;

  supergif.load(() => {
    $canvas = supergif.get_canvas();
    updateFavicon();
  });

  function updateFavicon() {
    $favicon.href = $canvas.toDataURL();
    window.requestAnimationFrame(updateFavicon);
  }
};
