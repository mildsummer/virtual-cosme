"use strict";

var rgbToHex = function rgbToHex(r, g, b) {
  return "#" + (function (n) {
    return new Array(7 - n.length).join("0") + n;
  })((r << 16 | g << 8 | b).toString(16));
};