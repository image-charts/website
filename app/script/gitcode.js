"use strict";

const $ = require("jquery");
const TWEEN = require("@tweenjs/tween.js");

module.exports = function initGitCode() {
  const $lis = $(".window--code .code").find("li");
  const $originalLis = $lis.filter(":not(.code--tobe-added)");

  let cursor = 0;
  new TWEEN.Tween({
    x: 0
  })
    .to(
      {
        x: $originalLis.length * 100
      },
      1000
    )
    .easing(TWEEN.Easing.Quartic.In)
    .onUpdate(function() {
      if (this.x > cursor * 100) {
        $originalLis.eq(cursor).addClass("code--animate");
        cursor++;
      }
    })
    .onComplete(() => {
      setTimeout(() => {
        $lis
          .filter(".code--tobe-removed")
          .find(".code--tobe-changed")
          .addClass("code--changed"); // simulate change on chart.googleapis.com

        setTimeout(() => {
          $lis.filter(".code--tobe-added").addClass("code--displayed"); // display new line

          setTimeout(() => {
            $lis
              .filter(".code--tobe-added")
              .find(".code--tobe-changed")
              .addClass("code--changed"); // simulate change on image-charts.com

            //
            setTimeout(() => {
              $lis.filter(".code--tobe-removed").addClass("code--removed");
              $lis.filter(".code--tobe-added").addClass("code--added");
            }, 1500);
          }, 1000);
        }, 1500);
      }, 1000);
    })
    .start();
};
