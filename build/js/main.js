(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _SizeSliders = require('./components/SizeSliders');

var _SizeSliders2 = _interopRequireWildcard(_SizeSliders);

var _BlurSliders = require('./components/BlurSliders');

var _BlurSliders2 = _interopRequireWildcard(_BlurSliders);

var _AlphaSliders = require('./components/AlphaSliders');

var _AlphaSliders2 = _interopRequireWildcard(_AlphaSliders);

var _ColorSliders = require('./components/ColorSliders');

var _ColorSliders2 = _interopRequireWildcard(_ColorSliders);

var _TextureList = require('./components/TextureList');

var _TextureList2 = _interopRequireWildcard(_TextureList);

var _textures = require('./common/textures');

var _textures2 = _interopRequireWildcard(_textures);

var _FaceCanvas = require('./components/FaceCanvas');

var _FaceCanvas2 = _interopRequireWildcard(_FaceCanvas);

var _RegistrationPane = require('./components/RegistrationPane');

var _RegistrationPane2 = _interopRequireWildcard(_RegistrationPane);

var _CosmeList = require('./components/CosmeList');

var _CosmeList2 = _interopRequireWildcard(_CosmeList);

var _Brush = require('./components/Brush');

var _Brush2 = _interopRequireWildcard(_Brush);

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    var cosmes = JSON.parse(localStorage.getItem('cosmes'));
    console.log(cosmes);
    return {
      brush: {
        color: {
          r: 0,
          g: 0,
          b: 0
        },
        alpha: 100,
        size: 50,
        blur: 0,
        textureIndex: 0
      },
      cosmes: cosmes,
      isRegistering: false
    };
  },
  changeBrush: function changeBrush(key, param) {
    var brush = _.clone(this.state.brush, true);
    //size/2<blurにならないようにする（sizeを変更するときだけ)
    if (key == 'size' && param / 2 < brush.blur) {
      brush.blur = param / 2;
    }
    brush[key] = param;
    this.setState({ brush: brush });
  },
  toggleRegistrationPane: function toggleRegistrationPane() {
    this.setState({ isRegistering: !this.state.isRegistering });
  },
  register: function register(cosme) {
    var cosmes = this.state.cosmes ? this.state.cosmes : [];
    cosme.brush = this.state.brush;
    cosme.id = cosmes.length;
    cosmes = cosmes.concat([cosme]);
    this.setState({ cosmes: cosmes });

    //とりあえずlocalStrageに保存
    localStorage.setItem('cosmes', JSON.stringify(cosmes));
  },
  setCosme: function setCosme(cosme) {
    var brush = _.clone(cosme.brush); //そのままsetStateすると参照になり変更できてしまう
    this.setState({ brush: brush, 'true': true });
  },
  render: function render() {
    var brush = this.state.brush;
    return React.createElement(
      'div',
      { id: 'container' },
      this.state.isRegistering ? React.createElement(_RegistrationPane2['default'], { brush: this.state.brush, onSubmit: this.register, close: this.toggleRegistrationPane }) : null,
      React.createElement(
        'div',
        { id: 'left' },
        React.createElement(_Brush2['default'], { brush: brush, content: null, position: 'center center' }),
        React.createElement(_ColorSliders2['default'], { onChange: this.changeBrush, color: brush.color, values: brush.color }),
        React.createElement(_AlphaSliders2['default'], { onChange: this.changeBrush, value: brush.alpha }),
        React.createElement(_SizeSliders2['default'], { onChange: this.changeBrush, value: brush.size }),
        React.createElement(_BlurSliders2['default'], { onChange: this.changeBrush, size: brush.size, value: brush.blur }),
        React.createElement(_TextureList2['default'], { onChange: this.changeBrush, textures: _textures2['default'], selected: brush.textureIndex }),
        React.createElement(
          'button',
          { id: 'registration-open-button', onClick: this.toggleRegistrationPane },
          '登録する'
        )
      ),
      React.createElement(
        'div',
        { id: 'center' },
        React.createElement(_FaceCanvas2['default'], { brush: brush, width: 500, height: 500 })
      ),
      React.createElement(
        'div',
        { id: 'right' },
        React.createElement(_CosmeList2['default'], { onClickCosme: this.setCosme, cosmes: this.state.cosmes })
      )
    );
  }
});

React.render(React.createElement(App, null), document.body);

},{"./common/textures":2,"./components/AlphaSliders":3,"./components/BlurSliders":4,"./components/Brush":5,"./components/ColorSliders":6,"./components/CosmeList":8,"./components/FaceCanvas":9,"./components/RegistrationPane":10,"./components/SizeSliders":11,"./components/TextureList":13}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//テクスチャの読み込み
//0番目は"テクスチャ無し"
var textures = [{ id: 0 }];
for (var i = 1; i < 6; i++) {
  textures[i] = { id: i };
  textures[i].img = new Image();
  textures[i].img.src = "img/texture/" + i + ".png";
  console.log(textures[i]);
}

exports["default"] = textures;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AlphaSliders = React.createClass({
  displayName: "AlphaSliders",

  onChange: function onChange() {
    this.props.onChange("alpha", this.refs.slider.getValue());
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "sliders", id: "sliders-alpha" },
      React.createElement(ReactSlider, { ref: "slider", min: 10, max: 100, onChange: this.onChange, defaultValue: 100, value: this.props.value })
    );
  }
});

exports["default"] = AlphaSliders;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BlurSliders = React.createClass({
  displayName: "BlurSliders",

  onChange: function onChange() {
    this.props.onChange("blur", this.refs.slider.getValue());
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "sliders", id: "sliders-blur" },
      React.createElement(ReactSlider, { ref: "slider", min: 0, max: Math.floor(this.props.size / 2), onChange: this.onChange, defaultValue: 0, value: this.props.value })
    );
  }
});

exports["default"] = BlurSliders;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Brush = React.createClass({
  displayName: 'Brush',

  render: function render() {
    var brush = this.props.brush;
    var clrstr = [brush.color.r, brush.color.g, brush.color.b].join(',');
    var textureStyle = brush.textureIndex > 0 ? 'url(/img/texture/' + brush.textureIndex + '.png) no-repeat center center /' + (brush.size + brush.blur) + 'px ' + (brush.size + brush.blur) + 'px, ' : '';
    var style = {
      opacity: brush.alpha / 100,
      background: textureStyle + '-webkit-gradient(radial, center center, ' + (brush.size / 2 - brush.blur - 1) //startとendが同じだと表示されない
       + ', center center, ' + (brush.size / 2 + brush.blur) + ', from(rgba(' + clrstr + ',1)), to(rgba(' + clrstr + ',0)))'
    };
    return React.createElement('div', { id: 'brush-sample', style: style });
  }
});

exports['default'] = Brush;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var ColorSliders = React.createClass({
    displayName: 'ColorSliders',

    onChange: function onChange() {
        var param = {
            r: this.refs.r.getValue(),
            g: this.refs.g.getValue(),
            b: this.refs.b.getValue() };
        this.props.onChange('color', param);
    },
    render: function render() {
        var backColors = {
            r: {
                start: rgbToHex(0, this.props.color.g, this.props.color.b),
                end: rgbToHex(255, this.props.color.g, this.props.color.b)
            },
            g: {
                start: rgbToHex(this.props.color.r, 0, this.props.color.b),
                end: rgbToHex(this.props.color.r, 255, this.props.color.b)
            },
            b: {
                start: rgbToHex(this.props.color.r, this.props.color.g, 0),
                end: rgbToHex(this.props.color.r, this.props.color.g, 255)
            }
        };
        var style = {};
        Object.keys(backColors).forEach(function (c) {
            style[c] = {
                //background: 'linear-gradient(left, ' + backColors.r.start + ', ' + backColors.r.end + ')',
                background: '-webkit-gradient(linear, left top, right top, from(' + backColors[c].start + '), to(' + backColors[c].end + '))' };
        });
        return React.createElement(
            'div',
            { className: 'sliders', id: 'sliders-color' },
            React.createElement(
                'div',
                { id: 'sliders-color-r', style: style.r },
                React.createElement(ReactSlider, { ref: 'r', min: 0, max: 255, onChange: this.onChange, value: this.props.values.r })
            ),
            React.createElement(
                'div',
                { id: 'sliders-color-g', style: style.g },
                React.createElement(ReactSlider, { ref: 'g', min: 0, max: 255, onChange: this.onChange, value: this.props.values.g })
            ),
            React.createElement(
                'div',
                { id: 'sliders-color-b', style: style.b },
                React.createElement(ReactSlider, { ref: 'b', min: 0, max: 255, onChange: this.onChange, value: this.props.values.b })
            )
        );
    }
});

exports['default'] = ColorSliders;
module.exports = exports['default'];

//background: '-moz-linear-gradient(left, ' + backColors.r.start + ',' + backColors.r.end + ')'

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Cosme = React.createClass({
    displayName: 'Cosme',

    onClick: function onClick() {
        this.props.onClickCosme(this.props.cosme);
    },
    render: function render() {
        var cosme = this.props.cosme;
        var clrstr = [cosme.brush.color.r, cosme.brush.color.g, cosme.brush.color.b].join(',');
        var textureStyle = cosme.brush.textureIndex > 0 ? 'url(/img/texture/' + cosme.brush.textureIndex + '.png) no-repeat ' + (40 - (cosme.brush.size + cosme.brush.blur) / 2) + 'px center /' + (cosme.brush.size + cosme.brush.blur) + 'px ' + (cosme.brush.size + cosme.brush.blur) + 'px, ' : '';
        var imageStyle = cosme.imgUrl ? ', url(' + cosme.imgUrl + ') no-repeat center right / contain' : '';
        var style = {
            background: textureStyle + '-webkit-gradient(radial, 40 center, ' + (cosme.brush.size / 2 - cosme.brush.blur - 1) //startとendが同じだと表示されない
             + ', 40 center, ' + (cosme.brush.size / 2 + cosme.brush.blur) + ', from(rgba(' + clrstr + ',1)), to(rgba(' + clrstr + ',0)))' + imageStyle
        };
        return React.createElement(
            'li',
            { className: 'cosme', onClick: this.onClick, style: style },
            React.createElement(
                'p',
                null,
                React.createElement(
                    'span',
                    { className: 'cosme-name' },
                    cosme.name
                ),
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'cosme-colorname' },
                    cosme.colorName
                ),
                React.createElement('br', null),
                React.createElement(
                    'span',
                    { className: 'cosme-brand' },
                    '/',
                    cosme.brand
                )
            )
        );
    }
});

exports['default'] = Cosme;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Cosme = require("./Cosme");

var _Cosme2 = _interopRequireWildcard(_Cosme);

var CosmeList = React.createClass({
  displayName: "CosmeList",

  render: function render() {
    if (!this.props.cosmes) {
      return false;
    } else {
      var rows = this.props.cosmes.map((function (cosme) {
        return React.createElement(_Cosme2["default"], { onClickCosme: this.props.onClickCosme, key: cosme.id, cosme: cosme });
      }).bind(this));
    }
    return React.createElement(
      "div",
      { id: "cosme-list" },
      React.createElement(
        "ul",
        null,
        rows
      )
    );
  }
});

exports["default"] = CosmeList;
module.exports = exports["default"];

},{"./Cosme":7}],9:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textures = require("../common/textures.js");

var _textures2 = _interopRequireWildcard(_textures);

var canvas = {},
    ctx = {};

var FaceCanvas = React.createClass({
  displayName: "FaceCanvas",

  getInitialState: function getInitialState() {
    return { points: [], mousedown: false, length: 0 };
  },
  componentDidMount: function componentDidMount() {
    canvas = React.findDOMNode(this.refs.canvas), ctx = canvas.getContext("2d");
  },
  onMouseDown: function onMouseDown() {
    this.setState({ mousedown: true });
  },
  onMouseUp: function onMouseUp() {
    this.setState({ mousedown: false });
  },
  onMouseMove: function onMouseMove(e) {
    if (this.state.mousedown) {
      var rect = canvas.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top,

      //描画ポイント配列がアンドゥされていたら、それ以降を消去し、新しいポイントをつなげる
      points = this.state.points.length > this.state.length ? this.state.points.slice(0, this.state.length).concat([[x, y]]) : this.state.points.concat([[x, y]]);

      this.setState({ points: points,
        mousedown: true,
        length: this.state.length + 1
      }); //座標配列に追加してセット
    }
  },
  //clear() {
  //  this.setState({points:[], mousedown: false, length: 0});
  //},
  paint: function paint() {
    if (!("fillStyle" in ctx) | this.state.points.length < 1) {
      return false; //初期化時はpaintしない
    }
    var brush = this.props.brush,
        points = this.state.points,
        l = this.state.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //canvasのリセットはできれば最小限にしたほうがいい
    if (brush.blur != 0) {
      //ぼかしはradialGradientを使う
      for (var i = 0; i < l; i++) {
        var p = points[i],
            grad = ctx.createRadialGradient(p[0], p[1], 10, p[0], p[1], brush.size / 2 + brush.blur);
        ctx.fillStyle = grad;
        grad.addColorStop((brush.size - brush.blur) / (brush.size + brush.blur), "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0.1)"); //積層するので0.1くらいでちょうどいい
        grad.addColorStop(1, "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0)");
        ctx.fillRect(p[0] - brush.size / 2 - brush.blur, p[1] - brush.size / 2 - brush.blur, brush.size + brush.blur * 2, brush.size + brush.blur * 2);
      }
    } else {
      ctx.fillStyle = "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0.1)";
      //ctx.strokeStyle = rgbToHex(brush.color.r, brush.color.g, brush.color.b);
      //ctx.lineWidth = brush.size;
      //ctx.arc(pa[0][0], pa[0][1], brush.size/2, 0, Math.PI*2, false);
      //ctx.fill();
      for (var i = 1; i < l; i++) {
        var p = points[i];
        //    pp = pa[i-1];
        //ctx.beginPath();
        //ctx.moveTo(pp[0], pp[1]);
        //ctx.lineTo(p[0], p[1]);
        //ctx.stroke();
        ctx.beginPath();
        ctx.arc(p[0], p[1], brush.size / 2, 0, Math.PI * 2, false);
        ctx.fill();
        //ctx.closePath();
      };
    }

    //テクスチャの描画
    for (var i = 1; i < l; i += 15) {
      var p = points[i];
      if (_textures2["default"][brush.textureIndex].img) {
        ctx.drawImage(_textures2["default"][brush.textureIndex].img, p[0] - (brush.size + brush.blur) / 2, p[1] - (brush.size + brush.blur) / 2, brush.size + brush.blur, brush.size + brush.blur);
      }
    }
  },
  undoChange: function undoChange() {
    this.setState({ length: this.refs.undo.getValue() });
  },
  render: function render() {
    this.paint();
    return React.createElement(
      "div",
      { id: "face-container" },
      React.createElement("canvas", { id: "face", ref: "canvas", width: this.props.width, height: this.props.height,
        onMouseDown: this.onMouseDown, onMouseMove: this.onMouseMove, onMouseUp: this.onMouseUp,
        style: { opacity: this.props.brush.alpha / 100 } }),
      React.createElement("div", { id: "face-img" }),
      React.createElement(
        "div",
        { className: "sliders", id: "sliders-undo" },
        React.createElement(ReactSlider, { ref: "undo", min: 0, max: this.state.points.length, defaultValue: 0, value: this.state.length, onChange: this.undoChange })
      )
    );
  }
});

exports["default"] = FaceCanvas;
module.exports = exports["default"];

},{"../common/textures.js":2}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var RegistrationPane = React.createClass({
    displayName: "RegistrationPane",

    getInitialState: function getInitialState() {
        return {
            isDraggingOver: false,
            imgUrl: null
        };
    },
    handleSubmit: function handleSubmit() {
        this.props.onSubmit({
            name: this.refs.cosmeName.getDOMNode().value,
            colorName: this.refs.cosmeColorName.getDOMNode().value,
            brand: this.refs.cosmeBland.getDOMNode().value,
            imgUrl: this.state.imgUrl
        });
        this.props.close();
    },
    onDragOver: function onDragOver(e) {
        this.setState({ isDraggingOver: true });
        e.preventDefault();
    },
    onDragLeave: function onDragLeave(e) {
        this.setState({ isDraggingOver: false });
        e.preventDefault();
    },
    onDrop: function onDrop(e) {
        var imgUrl = e.dataTransfer.getData("url");
        this.setState({ imgUrl: imgUrl, isDraggingOver: false });
        console.log(imgUrl);
        e.preventDefault();
    },
    render: function render() {
        var brush = this.props.brush;
        var clrstr = [brush.color.r, brush.color.g, brush.color.b].join(",");
        var textureStyle = brush.textureIndex > 0 ? "url(/img/texture/" + brush.textureIndex + ".png) no-repeat " + (80 - (brush.size + brush.blur) / 2) + "px center /" + (brush.size + brush.blur) + "px " + (brush.size + brush.blur) + "px, " : "";
        var imageStyle = this.state.imgUrl ? "url(" + this.state.imgUrl + ") no-repeat center right / contain, " : "";
        console.log(imageStyle);
        var style = {
            background: imageStyle + textureStyle + "#FFF -webkit-gradient(radial, 80 center, " + (brush.size / 2 - brush.blur - 1) //startとendが同じだと表示されない
             + ", 80 center, " + (brush.size / 2 + brush.blur) + ", from(rgba(" + clrstr + ",1)), to(rgba(" + clrstr + ",0)))"
        };
        console.log(style);
        return React.createElement(
            "div",
            { id: "registration-pane", onDragLeave: this.onDragLeave, onDrop: this.onDrop, onDragOver: this.onDragOver, className: this.state.isDraggingOver ? "dragging-over" : "not-dragging-over" },
            React.createElement(
                "div",
                { id: "registration-container" },
                React.createElement(
                    "div",
                    { id: "registration-input", style: style },
                    React.createElement("input", { type: "text", ref: "cosmeName", placeholder: "商品名を入力" }),
                    React.createElement("input", { type: "text", ref: "cosmeColorName", placeholder: "色名を入力" }),
                    React.createElement("input", { type: "text", ref: "cosmeBland", placeholder: "ブランド名を入力" }),
                    React.createElement(
                        "p",
                        null,
                        "商品画像をここにドラッグアンドドロップして設定できます"
                    )
                ),
                React.createElement(
                    "div",
                    { id: "registration-button" },
                    React.createElement(
                        "button",
                        { id: "registration-ok-button", onClick: this.handleSubmit },
                        "OK"
                    ),
                    React.createElement(
                        "button",
                        { id: "registration-ok-button", onClick: this.props.close },
                        "キャンセル"
                    )
                )
            )
        );
    }
});

exports["default"] = RegistrationPane;
module.exports = exports["default"];

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SizeSliders = React.createClass({
  displayName: "SizeSliders",

  onChange: function onChange() {
    this.props.onChange("size", this.refs.slider.getValue());
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "sliders", id: "sliders-size" },
      React.createElement(ReactSlider, { ref: "slider", min: 1, max: 100, onChange: this.onChange, defaultValue: 50, value: this.props.value })
    );
  }
});

exports["default"] = SizeSliders;
module.exports = exports["default"];

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Texture = React.createClass({
    displayName: "Texture",

    onClick: function onClick() {
        this.props.onClickTexture("textureIndex", this.props.texture.id);
    },
    render: function render() {
        var texture = this.props.texture;
        var className = this.props.isSelected ? "texture selected" : "texture";
        return React.createElement("li", { className: className, onClick: this.onClick, style: {
                background: texture.id > 0 ? "url(/img/texture/" + texture.id + ".png) no-repeat center center / contain, #333" : "#333"
            } });
    }
});

exports["default"] = Texture;
module.exports = exports["default"];

},{}],13:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Texture = require("./Texture");

var _Texture2 = _interopRequireWildcard(_Texture);

var TextureList = React.createClass({
  displayName: "TextureList",

  render: function render() {
    var rows = this.props.textures.map((function (texture) {
      return React.createElement(_Texture2["default"], { isSelected: this.props.selected === texture.id, onClickTexture: this.props.onChange, key: texture.id, texture: texture });
    }).bind(this));
    return React.createElement(
      "div",
      { id: "texture-list" },
      React.createElement(
        "ul",
        null,
        rows
      )
    );
  }
});

exports["default"] = TextureList;
module.exports = exports["default"];

},{"./Texture":12}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdXNlcjEvRGVza3RvcC92aXJ0dWFsLWNvc21lL3NyYy9qcy9tYWluLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tbW9uL3RleHR1cmVzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9BbHBoYVNsaWRlcnMuanMiLCIvVXNlcnMvdXNlcjEvRGVza3RvcC92aXJ0dWFsLWNvc21lL3NyYy9qcy9jb21wb25lbnRzL0JsdXJTbGlkZXJzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9CcnVzaC5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvQ29sb3JTbGlkZXJzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9Db3NtZS5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvQ29zbWVMaXN0LmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9GYWNlQ2FudmFzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9SZWdpc3RyYXRpb25QYW5lLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9TaXplU2xpZGVycy5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvVGV4dHVyZS5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvVGV4dHVyZUxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzJCQ0F3QiwwQkFBMEI7Ozs7MkJBQzFCLDBCQUEwQjs7Ozs0QkFDekIsMkJBQTJCOzs7OzRCQUMzQiwyQkFBMkI7Ozs7MkJBRTVCLDBCQUEwQjs7Ozt3QkFDN0IsbUJBQW1COzs7OzBCQUVqQix5QkFBeUI7Ozs7Z0NBRW5CLCtCQUErQjs7Ozt5QkFFdEMsd0JBQXdCOzs7O3FCQUU1QixvQkFBb0I7Ozs7QUFHdEMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3hCLGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDeEQsV0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixXQUFPO0FBQ0wsV0FBSyxFQUFFO0FBQ0wsYUFBSyxFQUFFO0FBQ0wsV0FBQyxFQUFFLENBQUM7QUFDSixXQUFDLEVBQUUsQ0FBQztBQUNKLFdBQUMsRUFBRSxDQUFDO1NBQ0w7QUFDRCxhQUFLLEVBQUUsR0FBRztBQUNWLFlBQUksRUFBRSxFQUFFO0FBQ1IsWUFBSSxFQUFFLENBQUM7QUFDUCxvQkFBWSxFQUFFLENBQUM7T0FDaEI7QUFDRCxZQUFNLEVBQUUsTUFBTTtBQUNkLG1CQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0dBQ0g7QUFDRCxhQUFXLEVBQUEscUJBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUN0QixRQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUU1QyxRQUFHLEdBQUcsSUFBRSxNQUFNLElBQUUsS0FBSyxHQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsSUFBSSxFQUFD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QUMsQ0FBQztBQUN2RixXQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUNyQixZQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBLElBQUcsS0FBSyxDQUFDLElBQUksR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBLEFBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztBQUNqSixZQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUNqRyxXQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsSUFBSSxHQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsSUFBSSxHQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBQyxLQUFLLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxDQUFDO09BQzVIO0tBQ0YsTUFBTTtBQUNMLFNBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDOzs7OztBQUs3RixXQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQ3BCLFlBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0FBTWxCLFdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNoQixXQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZELFdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7T0FFWixDQUFDO0tBQ0g7OztBQUdELFNBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsRUFBQztBQUN0QixVQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsVUFBRyxzQkFBUyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFDO0FBQ2xDLFdBQUcsQ0FBQyxTQUFTLENBQUMsc0JBQVMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQyxJQUFJLENBQUEsR0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBLEdBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMs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S0FBSyxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7QUFDdkUsZUFDRSw0QkFBSSxTQUFTLEVBQUUsU0FBUyxBQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEFBQUMsRUFBQyxLQUFLLEVBQUU7QUFDcEQsMEJBQVUsRUFBRSxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsRUFBRSxHQUFHLCtDQUErQyxHQUFHLE1BQU07YUFDekgsQUFBQyxHQUFNLENBQ1g7S0FDSjtDQUNKLENBQUMsQ0FBQzs7cUJBRVksT0FBTzs7Ozs7Ozs7Ozs7O3VCQ2ZGLFdBQVc7Ozs7QUFFL0IsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ2hDLFFBQU0sRUFBRSxrQkFBVztBQUNqQixRQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFTLE9BQU8sRUFBRTtBQUNwRCxhQUFRLDRDQUFTLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsRUFBRSxBQUFDLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEFBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxBQUFDLEdBQUcsQ0FBRTtLQUM5SSxDQUFBLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDZixXQUNFOztRQUFLLEVBQUUsRUFBQyxjQUFjO01BQ3BCOzs7UUFDRyxJQUFJO09BQ0Y7S0FDRCxDQUNOO0dBQ0g7Q0FDSixDQUFDLENBQUM7O3FCQUVZLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFNpemVTbGlkZXJzIGZyb20gJy4vY29tcG9uZW50cy9TaXplU2xpZGVycyc7XG5pbXBvcnQgQmx1clNsaWRlcnMgZnJvbSAnLi9jb21wb25lbnRzL0JsdXJTbGlkZXJzJztcbmltcG9ydCBBbHBoYVNsaWRlcnMgZnJvbSAnLi9jb21wb25lbnRzL0FscGhhU2xpZGVycyc7XG5pbXBvcnQgQ29sb3JTbGlkZXJzIGZyb20gJy4vY29tcG9uZW50cy9Db2xvclNsaWRlcnMnO1xuXG5pbXBvcnQgVGV4dHVyZUxpc3QgZnJvbSAnLi9jb21wb25lbnRzL1RleHR1cmVMaXN0JztcbmltcG9ydCB0ZXh0dXJlcyBmcm9tICcuL2NvbW1vbi90ZXh0dXJlcyc7XG5cbmltcG9ydCBGYWNlQ2FudmFzIGZyb20gJy4vY29tcG9uZW50cy9GYWNlQ2FudmFzJztcblxuaW1wb3J0IFJlZ2lzdHJhdGlvblBhbmUgZnJvbSAnLi9jb21wb25lbnRzL1JlZ2lzdHJhdGlvblBhbmUnO1xuXG5pbXBvcnQgQ29zbWVMaXN0IGZyb20gJy4vY29tcG9uZW50cy9Db3NtZUxpc3QnO1xuXG5pbXBvcnQgQnJ1c2ggZnJvbSAnLi9jb21wb25lbnRzL0JydXNoJztcblxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgIHZhciBjb3NtZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY29zbWVzXCIpKTtcbiAgICAgIGNvbnNvbGUubG9nKGNvc21lcyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBicnVzaDoge1xuICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICByOiAwLFxuICAgICAgICAgICAgZzogMCxcbiAgICAgICAgICAgIGI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFscGhhOiAxMDAsXG4gICAgICAgICAgc2l6ZTogNTAsXG4gICAgICAgICAgYmx1cjogMCxcbiAgICAgICAgICB0ZXh0dXJlSW5kZXg6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY29zbWVzOiBjb3NtZXMsXG4gICAgICAgIGlzUmVnaXN0ZXJpbmc6IGZhbHNlXG4gICAgICB9O1xuICAgIH0sXG4gICAgY2hhbmdlQnJ1c2goa2V5LCBwYXJhbSkge1xuICAgICAgdmFyIGJydXNoID0gXy5jbG9uZSh0aGlzLnN0YXRlLmJydXNoLCB0cnVlKTtcbiAgICAgIC8vc2l6ZS8yPGJsdXLjgavjgarjgonjgarjgYTjgojjgYbjgavjgZnjgovvvIhzaXpl44KS5aSJ5pu044GZ44KL44Go44GN44Gg44GRKVxuICAgICAgaWYoa2V5PT1cInNpemVcIiYmcGFyYW0vMjxicnVzaC5ibHVyKXtcbiAgICAgICAgYnJ1c2guYmx1ciA9IHBhcmFtLzI7XG4gICAgICB9XG4gICAgICBicnVzaFtrZXldID0gcGFyYW07XG4gICAgICB0aGlzLnNldFN0YXRlKHticnVzaDogYnJ1c2h9KTtcbiAgICB9LFxuICAgIHRvZ2dsZVJlZ2lzdHJhdGlvblBhbmUoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc1JlZ2lzdGVyaW5nOiAhdGhpcy5zdGF0ZS5pc1JlZ2lzdGVyaW5nfSk7XG4gICAgfSxcbiAgICByZWdpc3Rlcihjb3NtZSkge1xuICAgICAgdmFyIGNvc21lcyA9IHRoaXMuc3RhdGUuY29zbWVzID8gdGhpcy5zdGF0ZS5jb3NtZXMgOiBbXTtcbiAgICAgIGNvc21lLmJydXNoID0gdGhpcy5zdGF0ZS5icnVzaDtcbiAgICAgIGNvc21lLmlkID0gIGNvc21lcy5sZW5ndGg7XG4gICAgICBjb3NtZXMgPSBjb3NtZXMuY29uY2F0KFtjb3NtZV0pO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29zbWVzOiBjb3NtZXN9KTtcblxuICAgICAgLy/jgajjgorjgYLjgYjjgZpsb2NhbFN0cmFnZeOBq+S/neWtmFxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjb3NtZXNcIiwgSlNPTi5zdHJpbmdpZnkoY29zbWVzKSk7XG4gICAgfSxcbiAgICBzZXRDb3NtZShjb3NtZSkge1xuICAgICAgdmFyIGJydXNoID0gXy5jbG9uZShjb3NtZS5icnVzaCk7Ly/jgZ3jga7jgb7jgb5zZXRTdGF0ZeOBmeOCi+OBqOWPgueFp+OBq+OBquOCiuWkieabtOOBp+OBjeOBpuOBl+OBvuOBhlxuICAgICAgdGhpcy5zZXRTdGF0ZSh7YnJ1c2g6IGJydXNoLCB0cnVlfSk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBicnVzaCA9IHRoaXMuc3RhdGUuYnJ1c2g7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5pc1JlZ2lzdGVyaW5nID8gKDxSZWdpc3RyYXRpb25QYW5lIGJydXNoPXt0aGlzLnN0YXRlLmJydXNofSBvblN1Ym1pdD17dGhpcy5yZWdpc3Rlcn0gY2xvc2U9e3RoaXMudG9nZ2xlUmVnaXN0cmF0aW9uUGFuZX0gLz4pIDogbnVsbH1cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibGVmdFwiPlxuICAgICAgICAgICAgICAgICAgPEJydXNoIGJydXNoPXticnVzaH0gY29udGVudD17bnVsbH0gcG9zaXRpb249XCJjZW50ZXIgY2VudGVyXCIvPlxuICAgICAgICAgICAgICAgICAgPENvbG9yU2xpZGVycyBvbkNoYW5nZT17dGhpcy5jaGFuZ2VCcnVzaH0gY29sb3I9e2JydXNoLmNvbG9yfSB2YWx1ZXM9e2JydXNoLmNvbG9yfSAvPlxuICAgICAgICAgICAgICAgICAgPEFscGhhU2xpZGVycyBvbkNoYW5nZT17dGhpcy5jaGFuZ2VCcnVzaH0gdmFsdWU9e2JydXNoLmFscGhhfSAvPlxuICAgICAgICAgICAgICAgICAgPFNpemVTbGlkZXJzIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUJydXNofSB2YWx1ZT17YnJ1c2guc2l6ZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxCbHVyU2xpZGVycyBvbkNoYW5nZT17dGhpcy5jaGFuZ2VCcnVzaH0gc2l6ZT17YnJ1c2guc2l6ZX0gdmFsdWU9e2JydXNoLmJsdXJ9IC8+XG4gICAgICAgICAgICAgICAgICA8VGV4dHVyZUxpc3Qgb25DaGFuZ2U9e3RoaXMuY2hhbmdlQnJ1c2h9IHRleHR1cmVzPXt0ZXh0dXJlc30gc2VsZWN0ZWQ9e2JydXNoLnRleHR1cmVJbmRleH0gLz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZWdpc3RyYXRpb24tb3Blbi1idXR0b25cIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVJlZ2lzdHJhdGlvblBhbmV9ID7nmbvpjLLjgZnjgos8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8RmFjZUNhbnZhcyBicnVzaD17YnJ1c2h9IHdpZHRoPXs1MDB9IGhlaWdodD17NTAwfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyaWdodFwiPlxuICAgICAgICAgICAgICAgICAgPENvc21lTGlzdCBvbkNsaWNrQ29zbWU9e3RoaXMuc2V0Q29zbWV9IGNvc21lcz17dGhpcy5zdGF0ZS5jb3NtZXN9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuUmVhY3QucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmJvZHkpO1xuIiwiLy/jg4bjgq/jgrnjg4Hjg6Pjga7oqq3jgb/ovrzjgb9cbi8vMOeVquebruOBr1wi44OG44Kv44K544OB44Oj54Sh44GXXCJcbnZhciB0ZXh0dXJlcyA9IFt7aWQ6MH1dO1xuZm9yKHZhciBpPTE7IGk8NjsgaSsrKXtcbiAgdGV4dHVyZXNbaV0gPSB7aWQgOiBpfTtcbiAgdGV4dHVyZXNbaV0uaW1nID0gbmV3IEltYWdlKCk7XG4gIHRleHR1cmVzW2ldLmltZy5zcmMgPSBcImltZy90ZXh0dXJlL1wiICsgaSArIFwiLnBuZ1wiO1xuICBjb25zb2xlLmxvZyh0ZXh0dXJlc1tpXSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRleHR1cmVzO1xuIiwidmFyIEFscGhhU2xpZGVycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBvbkNoYW5nZSgpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoXCJhbHBoYVwiLCB0aGlzLnJlZnMuc2xpZGVyLmdldFZhbHVlKCkpO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlcnNcIiBpZD1cInNsaWRlcnMtYWxwaGFcIj5cbiAgICAgICAgICAgIDxSZWFjdFNsaWRlciByZWY9XCJzbGlkZXJcIiBtaW49ezEwfSBtYXg9ezEwMH0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IGRlZmF1bHRWYWx1ZT17MTAwfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQWxwaGFTbGlkZXJzO1xuIiwidmFyIEJsdXJTbGlkZXJzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG9uQ2hhbmdlKCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcImJsdXJcIiwgdGhpcy5yZWZzLnNsaWRlci5nZXRWYWx1ZSgpKTtcbiAgICB9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXJzXCIgaWQ9XCJzbGlkZXJzLWJsdXJcIj5cbiAgICAgICAgICAgIDxSZWFjdFNsaWRlciByZWY9XCJzbGlkZXJcIiBtaW49ezB9IG1heD17TWF0aC5mbG9vcih0aGlzLnByb3BzLnNpemUvMil9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBkZWZhdWx0VmFsdWU9ezB9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCbHVyU2xpZGVycztcbiIsInZhciBCcnVzaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXIoKSB7XG4gICAgICB2YXIgYnJ1c2ggPSB0aGlzLnByb3BzLmJydXNoO1xuICAgICAgdmFyIGNscnN0ciA9IFticnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKTtcbiAgICAgIHZhciB0ZXh0dXJlU3R5bGUgPSBicnVzaC50ZXh0dXJlSW5kZXggPiAwID8gJ3VybCgvaW1nL3RleHR1cmUvJyArIGJydXNoLnRleHR1cmVJbmRleFxuICAgICAgICAgICsgJy5wbmcpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIC8nXG4gICAgICAgICAgKyAoYnJ1c2guc2l6ZSArIGJydXNoLmJsdXIpICsgJ3B4ICcgKyAoYnJ1c2guc2l6ZSArIGJydXNoLmJsdXIpXG4gICAgICAgICAgKyAncHgsICcgOiBcIlwiO1xuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgb3BhY2l0eTogYnJ1c2guYWxwaGEvMTAwLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogdGV4dHVyZVN0eWxlICsgJy13ZWJraXQtZ3JhZGllbnQocmFkaWFsLCBjZW50ZXIgY2VudGVyLCAnXG4gICAgICAgICAgICArIChicnVzaC5zaXplLzIgLSBicnVzaC5ibHVyIC0gMSApIC8vc3RhcnTjgahlbmTjgYzlkIzjgZjjgaDjgajooajnpLrjgZXjgozjgarjgYRcbiAgICAgICAgICAgICsgJywgY2VudGVyIGNlbnRlciwgJyArIChicnVzaC5zaXplLzIgKyBicnVzaC5ibHVyKVxuICAgICAgICAgICAgKyAnLCBmcm9tKHJnYmEoJyArIGNscnN0ciArICcsMSkpLCB0byhyZ2JhKCcgKyBjbHJzdHIgKyAnLDApKSknXG4gICAgICAgICAgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgaWQ9XCJicnVzaC1zYW1wbGVcIiBzdHlsZT17c3R5bGV9PjwvZGl2PlxuICAgICAgKVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCcnVzaDtcbiIsInZhciBDb2xvclNsaWRlcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgb25DaGFuZ2UoKSB7XG4gICAgICAgIHZhciBwYXJhbSA9IHtcbiAgICAgICAgICAgIHI6IHRoaXMucmVmcy5yLmdldFZhbHVlKCksXG4gICAgICAgICAgICBnOiB0aGlzLnJlZnMuZy5nZXRWYWx1ZSgpLFxuICAgICAgICAgICAgYjogdGhpcy5yZWZzLmIuZ2V0VmFsdWUoKSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFwiY29sb3JcIiwgcGFyYW0pO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgYmFja0NvbG9ycyA9IHtcbiAgICAgICAgICAgIHI6IHtcbiAgICAgICAgICAgICAgICBzdGFydDogcmdiVG9IZXgoMCwgdGhpcy5wcm9wcy5jb2xvci5nLCB0aGlzLnByb3BzLmNvbG9yLmIpLFxuICAgICAgICAgICAgICAgIGVuZDogcmdiVG9IZXgoMjU1LCB0aGlzLnByb3BzLmNvbG9yLmcsIHRoaXMucHJvcHMuY29sb3IuYilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHJnYlRvSGV4KHRoaXMucHJvcHMuY29sb3IuciwgMCwgdGhpcy5wcm9wcy5jb2xvci5iKSxcbiAgICAgICAgICAgICAgICBlbmQ6IHJnYlRvSGV4KHRoaXMucHJvcHMuY29sb3IuciwgMjU1LCB0aGlzLnByb3BzLmNvbG9yLmIpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiByZ2JUb0hleCh0aGlzLnByb3BzLmNvbG9yLnIsIHRoaXMucHJvcHMuY29sb3IuZywgMCksXG4gICAgICAgICAgICAgICAgZW5kOiByZ2JUb0hleCh0aGlzLnByb3BzLmNvbG9yLnIsIHRoaXMucHJvcHMuY29sb3IuZywgMjU1KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBzdHlsZSA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhiYWNrQ29sb3JzKS5mb3JFYWNoKGZ1bmN0aW9uKGMpe1xuICAgICAgICAgIHN0eWxlW2NdID0ge1xuICAgICAgICAgICAgLy9iYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KGxlZnQsICcgKyBiYWNrQ29sb3JzLnIuc3RhcnQgKyAnLCAnICsgYmFja0NvbG9ycy5yLmVuZCArICcpJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICctd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIHJpZ2h0IHRvcCwgZnJvbSgnICsgYmFja0NvbG9yc1tjXS5zdGFydCArICcpLCB0bygnICsgYmFja0NvbG9yc1tjXS5lbmQgKyAnKSknLFxuICAgICAgICAgICAgLy9iYWNrZ3JvdW5kOiAnLW1vei1saW5lYXItZ3JhZGllbnQobGVmdCwgJyArIGJhY2tDb2xvcnMuci5zdGFydCArICcsJyArIGJhY2tDb2xvcnMuci5lbmQgKyAnKSdcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXJzXCIgaWQ9XCJzbGlkZXJzLWNvbG9yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInNsaWRlcnMtY29sb3ItclwiIHN0eWxlPXtzdHlsZS5yfSA+XG4gICAgICAgICAgICAgICAgICAgIDxSZWFjdFNsaWRlciByZWY9XCJyXCIgbWluPXswfSBtYXg9ezI1NX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlcy5yfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzbGlkZXJzLWNvbG9yLWdcIiBzdHlsZT17c3R5bGUuZ30gPlxuICAgICAgICAgICAgICAgICAgICA8UmVhY3RTbGlkZXIgcmVmPVwiZ1wiIG1pbj17MH0gbWF4PXsyNTV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZXMuZ30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic2xpZGVycy1jb2xvci1iXCIgc3R5bGU9e3N0eWxlLmJ9ID5cbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0U2xpZGVyIHJlZj1cImJcIiBtaW49ezB9IG1heD17MjU1fSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0gdmFsdWU9e3RoaXMucHJvcHMudmFsdWVzLmJ9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sb3JTbGlkZXJzO1xuIiwidmFyIENvc21lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGlja0Nvc21lKHRoaXMucHJvcHMuY29zbWUpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvc21lID0gdGhpcy5wcm9wcy5jb3NtZTtcbiAgICAgICAgdmFyIGNscnN0ciA9IFtjb3NtZS5icnVzaC5jb2xvci5yLCBjb3NtZS5icnVzaC5jb2xvci5nLCBjb3NtZS5icnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKTtcbiAgICAgICAgdmFyIHRleHR1cmVTdHlsZSA9IGNvc21lLmJydXNoLnRleHR1cmVJbmRleCA+IDAgPyAndXJsKC9pbWcvdGV4dHVyZS8nICsgY29zbWUuYnJ1c2gudGV4dHVyZUluZGV4XG4gICAgICAgICAgICArICcucG5nKSBuby1yZXBlYXQgJyArICg0MCAtIChjb3NtZS5icnVzaC5zaXplICsgY29zbWUuYnJ1c2guYmx1cikvMikgKyAncHggY2VudGVyIC8nXG4gICAgICAgICAgICArIChjb3NtZS5icnVzaC5zaXplICsgY29zbWUuYnJ1c2guYmx1cikgKyAncHggJyArIChjb3NtZS5icnVzaC5zaXplICsgY29zbWUuYnJ1c2guYmx1cilcbiAgICAgICAgICAgICsgJ3B4LCAnIDogXCJcIjtcbiAgICAgICAgdmFyIGltYWdlU3R5bGUgPSBjb3NtZS5pbWdVcmwgPyAnLCB1cmwoJyArIGNvc21lLmltZ1VybCArICcpIG5vLXJlcGVhdCBjZW50ZXIgcmlnaHQgLyBjb250YWluJyA6ICcnXG4gICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0ZXh0dXJlU3R5bGUgKyAnLXdlYmtpdC1ncmFkaWVudChyYWRpYWwsIDQwIGNlbnRlciwgJ1xuICAgICAgICAgICAgICAgICAgKyAoY29zbWUuYnJ1c2guc2l6ZS8yIC0gY29zbWUuYnJ1c2guYmx1ciAtIDEgKSAvL3N0YXJ044GoZW5k44GM5ZCM44GY44Gg44Go6KGo56S644GV44KM44Gq44GEXG4gICAgICAgICAgICAgICAgICArICcsIDQwIGNlbnRlciwgJyArIChjb3NtZS5icnVzaC5zaXplLzIgKyBjb3NtZS5icnVzaC5ibHVyKVxuICAgICAgICAgICAgICAgICAgKyAnLCBmcm9tKHJnYmEoJyArIGNscnN0ciArICcsMSkpLCB0byhyZ2JhKCcgKyBjbHJzdHIgKyAnLDApKSknICsgaW1hZ2VTdHlsZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiY29zbWVcIiBvbkNsaWNrPXt0aGlzLm9uQ2xpY2t9IHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgICA8cD48c3BhbiBjbGFzc05hbWU9XCJjb3NtZS1uYW1lXCI+e2Nvc21lLm5hbWV9PC9zcGFuPjxiciAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY29zbWUtY29sb3JuYW1lXCI+e2Nvc21lLmNvbG9yTmFtZX08L3NwYW4+PGJyIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb3NtZS1icmFuZFwiPi97Y29zbWUuYnJhbmR9PC9zcGFuPjwvcD5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDb3NtZTtcbiIsImltcG9ydCBDb3NtZSBmcm9tICcuL0Nvc21lJztcblxudmFyIENvc21lTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighdGhpcy5wcm9wcy5jb3NtZXMpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJvd3MgPSB0aGlzLnByb3BzLmNvc21lcy5tYXAoKGZ1bmN0aW9uKGNvc21lKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxDb3NtZSBvbkNsaWNrQ29zbWU9e3RoaXMucHJvcHMub25DbGlja0Nvc21lfSBrZXk9e2Nvc21lLmlkfSBjb3NtZT17Y29zbWV9IC8+KTtcbiAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgaWQ9XCJjb3NtZS1saXN0XCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29zbWVMaXN0O1xuIiwiaW1wb3J0IHRleHR1cmVzIGZyb20gJy4uL2NvbW1vbi90ZXh0dXJlcy5qcyc7XG5cbnZhciBjYW52YXMgPSB7fSwgY3R4ID0ge307XG5cbnZhciBGYWNlQ2FudmFzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZSgpe1xuICAgICAgcmV0dXJuIHtwb2ludHM6W10sIG1vdXNlZG93bjpmYWxzZSwgbGVuZ3RoOiAwfTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICBjYW52YXMgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY2FudmFzKSxcbiAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfSxcbiAgICBvbk1vdXNlRG93bigpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlZG93bjogdHJ1ZX0pO1xuICAgIH0sXG4gICAgb25Nb3VzZVVwKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7bW91c2Vkb3duOiBmYWxzZX0pO1xuICAgIH0sXG4gICAgb25Nb3VzZU1vdmUoZSkge1xuICAgICAgaWYodGhpcy5zdGF0ZS5tb3VzZWRvd24pe1xuICAgICAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICB4ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgIHkgPSBlLmNsaWVudFkgLSByZWN0LnRvcCxcblxuICAgICAgICAgIC8v5o+P55S744Od44Kk44Oz44OI6YWN5YiX44GM44Ki44Oz44OJ44Kl44GV44KM44Gm44GE44Gf44KJ44CB44Gd44KM5Lul6ZmN44KS5raI5Y6744GX44CB5paw44GX44GE44Od44Kk44Oz44OI44KS44Gk44Gq44GS44KLXG4gICAgICAgICAgcG9pbnRzID0gdGhpcy5zdGF0ZS5wb2ludHMubGVuZ3RoID4gdGhpcy5zdGF0ZS5sZW5ndGggPyB0aGlzLnN0YXRlLnBvaW50cy5zbGljZSgwLCB0aGlzLnN0YXRlLmxlbmd0aCkuY29uY2F0KFtbeCwgeV1dKSA6IHRoaXMuc3RhdGUucG9pbnRzLmNvbmNhdChbW3gsIHldXSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cG9pbnRzOiBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgICAgIG1vdXNlZG93bjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLnN0YXRlLmxlbmd0aCArIDFcbiAgICAgICAgICAgICAgICAgICAgICB9KTsvL+W6p+aomemFjeWIl+OBq+i/veWKoOOBl+OBpuOCu+ODg+ODiFxuICAgICAgfVxuICAgIH0sXG4gICAgLy9jbGVhcigpIHtcbiAgICAvLyAgdGhpcy5zZXRTdGF0ZSh7cG9pbnRzOltdLCBtb3VzZWRvd246IGZhbHNlLCBsZW5ndGg6IDB9KTtcbiAgICAvL30sXG4gICAgcGFpbnQoKSB7XG4gICAgICBpZighKFwiZmlsbFN0eWxlXCIgaW4gY3R4KSB8IHRoaXMuc3RhdGUucG9pbnRzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvL+WIneacn+WMluaZguOBr3BhaW5044GX44Gq44GEXG4gICAgICB9XG4gICAgICB2YXIgYnJ1c2ggPSB0aGlzLnByb3BzLmJydXNoLFxuICAgICAgICAgIHBvaW50cyA9IHRoaXMuc3RhdGUucG9pbnRzLFxuICAgICAgICAgIGwgPSB0aGlzLnN0YXRlLmxlbmd0aDtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTsvL2NhbnZhc+OBruODquOCu+ODg+ODiOOBr+OBp+OBjeOCjOOBsOacgOWwj+mZkOOBq+OBl+OBn+OBu+OBhuOBjOOBhOOBhFxuICAgICAgaWYoYnJ1c2guYmx1ciE9MCl7Ly/jgbzjgYvjgZfjga9yYWRpYWxHcmFkaWVudOOCkuS9v+OBhlxuICAgICAgICBmb3IodmFyIGk9MDsgaTxsOyBpKyspe1xuICAgICAgICAgIHZhciBwID0gcG9pbnRzW2ldLFxuICAgICAgICAgICAgZ3JhZCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChwWzBdLCBwWzFdLCAxMCwgcFswXSwgcFsxXSwgYnJ1c2guc2l6ZS8yK2JydXNoLmJsdXIpO1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkO1xuICAgICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKChicnVzaC5zaXplLWJydXNoLmJsdXIpLyhicnVzaC5zaXplK2JydXNoLmJsdXIpLCBcInJnYmEoXCIgKyBbYnJ1c2guY29sb3IuciwgYnJ1c2guY29sb3IuZywgYnJ1c2guY29sb3IuYl0uam9pbihcIixcIikgKyBcIiwgMC4xKVwiKTsvL+epjeWxpOOBmeOCi+OBruOBpzAuMeOBj+OCieOBhOOBp+OBoeOCh+OBhuOBqeOBhOOBhFxuICAgICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDEsIFwicmdiYShcIiArIFticnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKSArIFwiLCAwKVwiKTtcbiAgICAgICAgICBjdHguZmlsbFJlY3QocFswXS1icnVzaC5zaXplLzItYnJ1c2guYmx1ciwgcFsxXS1icnVzaC5zaXplLzItYnJ1c2guYmx1ciwgYnJ1c2guc2l6ZSticnVzaC5ibHVyKjIsIGJydXNoLnNpemUrYnJ1c2guYmx1cioyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYShcIiArIFticnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKSArIFwiLCAwLjEpXCI7XG4gICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gcmdiVG9IZXgoYnJ1c2guY29sb3IuciwgYnJ1c2guY29sb3IuZywgYnJ1c2guY29sb3IuYik7XG4gICAgICAgIC8vY3R4LmxpbmVXaWR0aCA9IGJydXNoLnNpemU7XG4gICAgICAgIC8vY3R4LmFyYyhwYVswXVswXSwgcGFbMF1bMV0sIGJydXNoLnNpemUvMiwgMCwgTWF0aC5QSSoyLCBmYWxzZSk7XG4gICAgICAgIC8vY3R4LmZpbGwoKTtcbiAgICAgICAgZm9yKHZhciBpPTE7IGk8bDsgaSsrKXtcbiAgICAgICAgICB2YXIgcCA9IHBvaW50c1tpXTtcbiAgICAgICAgICAvLyAgICBwcCA9IHBhW2ktMV07XG4gICAgICAgICAgLy9jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgLy9jdHgubW92ZVRvKHBwWzBdLCBwcFsxXSk7XG4gICAgICAgICAgLy9jdHgubGluZVRvKHBbMF0sIHBbMV0pO1xuICAgICAgICAgIC8vY3R4LnN0cm9rZSgpO1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHguYXJjKHBbMF0sIHBbMV0sIGJydXNoLnNpemUvMiwgMCwgTWF0aC5QSSoyLCBmYWxzZSk7XG4gICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAvL2N0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy/jg4bjgq/jgrnjg4Hjg6Pjga7mj4/nlLtcbiAgICAgIGZvcih2YXIgaT0xOyBpPGw7IGkrPTE1KXtcbiAgICAgICAgdmFyIHAgPSBwb2ludHNbaV07XG4gICAgICAgIGlmKHRleHR1cmVzW2JydXNoLnRleHR1cmVJbmRleF0uaW1nKXtcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKHRleHR1cmVzW2JydXNoLnRleHR1cmVJbmRleF0uaW1nLCBwWzBdLShicnVzaC5zaXplK2JydXNoLmJsdXIpLzIsIHBbMV0tKGJydXNoLnNpemUrYnJ1c2guYmx1cikvMiwgYnJ1c2guc2l6ZSticnVzaC5ibHVyLCBicnVzaC5zaXplK2JydXNoLmJsdXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB1bmRvQ2hhbmdlKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7bGVuZ3RoOiB0aGlzLnJlZnMudW5kby5nZXRWYWx1ZSgpfSk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICB0aGlzLnBhaW50KCk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGlkPVwiZmFjZS1jb250YWluZXJcIj5cbiAgICAgICAgICA8Y2FudmFzIGlkPVwiZmFjZVwiIHJlZj1cImNhbnZhc1wiIHdpZHRoPXt0aGlzLnByb3BzLndpZHRofSBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxuICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMub25Nb3VzZURvd259IG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlfSBvbk1vdXNlVXA9e3RoaXMub25Nb3VzZVVwfVxuICAgICAgICAgICAgc3R5bGU9e3tvcGFjaXR5OiB0aGlzLnByb3BzLmJydXNoLmFscGhhLzEwMH19Lz5cbiAgICAgICAgICA8ZGl2IGlkPVwiZmFjZS1pbWdcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlcnNcIiBpZD1cInNsaWRlcnMtdW5kb1wiPlxuICAgICAgICAgICAgPFJlYWN0U2xpZGVyIHJlZj1cInVuZG9cIiBtaW49ezB9IG1heD17dGhpcy5zdGF0ZS5wb2ludHMubGVuZ3RofSBkZWZhdWx0VmFsdWU9ezB9IHZhbHVlPXt0aGlzLnN0YXRlLmxlbmd0aH0gb25DaGFuZ2U9e3RoaXMudW5kb0NoYW5nZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBGYWNlQ2FudmFzO1xuIiwidmFyIFJlZ2lzdHJhdGlvblBhbmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNEcmFnZ2luZ092ZXI6IGZhbHNlLFxuICAgICAgICAgICAgaW1nVXJsOiBudWxsXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBoYW5kbGVTdWJtaXQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgbmFtZTogdGhpcy5yZWZzLmNvc21lTmFtZS5nZXRET01Ob2RlKCkudmFsdWUsXG4gICAgICAgICAgICBjb2xvck5hbWU6IHRoaXMucmVmcy5jb3NtZUNvbG9yTmFtZS5nZXRET01Ob2RlKCkudmFsdWUsXG4gICAgICAgICAgICBicmFuZDogdGhpcy5yZWZzLmNvc21lQmxhbmQuZ2V0RE9NTm9kZSgpLnZhbHVlLFxuICAgICAgICAgICAgaW1nVXJsOiB0aGlzLnN0YXRlLmltZ1VybFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZSgpO1xuICAgIH0sXG4gICAgb25EcmFnT3ZlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRHJhZ2dpbmdPdmVyOiB0cnVlfSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIG9uRHJhZ0xlYXZlKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNEcmFnZ2luZ092ZXI6IGZhbHNlfSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIG9uRHJvcChlKSB7XG4gICAgICAgIHZhciBpbWdVcmwgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidXJsXCIpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbWdVcmw6IGltZ1VybCwgaXNEcmFnZ2luZ092ZXI6IGZhbHNlfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGltZ1VybCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGJydXNoID0gdGhpcy5wcm9wcy5icnVzaDtcbiAgICAgICAgdmFyIGNscnN0ciA9IFticnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKTtcbiAgICAgICAgdmFyIHRleHR1cmVTdHlsZSA9IGJydXNoLnRleHR1cmVJbmRleCA+IDAgPyAndXJsKC9pbWcvdGV4dHVyZS8nICsgYnJ1c2gudGV4dHVyZUluZGV4XG4gICAgICAgICAgICArICcucG5nKSBuby1yZXBlYXQgJyArICg4MCAtIChicnVzaC5zaXplICsgYnJ1c2guYmx1cikvMikgKyAncHggY2VudGVyIC8nXG4gICAgICAgICAgICArIChicnVzaC5zaXplICsgYnJ1c2guYmx1cikgKyAncHggJyArIChicnVzaC5zaXplICsgYnJ1c2guYmx1cilcbiAgICAgICAgICAgICsgJ3B4LCAnIDogXCJcIjtcbiAgICAgICAgdmFyIGltYWdlU3R5bGUgPSB0aGlzLnN0YXRlLmltZ1VybCA/ICgndXJsKCcgKyB0aGlzLnN0YXRlLmltZ1VybCArICcpIG5vLXJlcGVhdCBjZW50ZXIgcmlnaHQgLyBjb250YWluLCAnKSA6ICcnO1xuICAgICAgICBjb25zb2xlLmxvZyhpbWFnZVN0eWxlKTtcbiAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGltYWdlU3R5bGUgKyB0ZXh0dXJlU3R5bGUgKyAnI0ZGRiAtd2Via2l0LWdyYWRpZW50KHJhZGlhbCwgODAgY2VudGVyLCAnXG4gICAgICAgICAgICAgICAgICArIChicnVzaC5zaXplLzIgLSBicnVzaC5ibHVyIC0gMSApIC8vc3RhcnTjgahlbmTjgYzlkIzjgZjjgaDjgajooajnpLrjgZXjgozjgarjgYRcbiAgICAgICAgICAgICAgICAgICsgJywgODAgY2VudGVyLCAnICsgKGJydXNoLnNpemUvMiArIGJydXNoLmJsdXIpXG4gICAgICAgICAgICAgICAgICArICcsIGZyb20ocmdiYSgnICsgY2xyc3RyICsgJywxKSksIHRvKHJnYmEoJyArIGNscnN0ciArICcsMCkpKSdcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKHN0eWxlKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGlkPVwicmVnaXN0cmF0aW9uLXBhbmVcIiBvbkRyYWdMZWF2ZT17dGhpcy5vbkRyYWdMZWF2ZX0gb25Ecm9wPXt0aGlzLm9uRHJvcH0gb25EcmFnT3Zlcj17dGhpcy5vbkRyYWdPdmVyfSBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaXNEcmFnZ2luZ092ZXIgPyBcImRyYWdnaW5nLW92ZXJcIiA6IFwibm90LWRyYWdnaW5nLW92ZXJcIn0+XG4gICAgICAgICAgICA8ZGl2IGlkPVwicmVnaXN0cmF0aW9uLWNvbnRhaW5lclwiID5cbiAgICAgICAgICAgICAgPGRpdiBpZD1cInJlZ2lzdHJhdGlvbi1pbnB1dFwiIHN0eWxlPXtzdHlsZX0gPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cImNvc21lTmFtZVwiIHBsYWNlaG9sZGVyPVwi5ZWG5ZOB5ZCN44KS5YWl5YqbXCI+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJjb3NtZUNvbG9yTmFtZVwiIHBsYWNlaG9sZGVyPVwi6Imy5ZCN44KS5YWl5YqbXCI+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJjb3NtZUJsYW5kXCIgcGxhY2Vob2xkZXI9XCLjg5bjg6njg7Pjg4nlkI3jgpLlhaXliptcIj48L2lucHV0PlxuICAgICAgICAgICAgICAgIDxwPuWVhuWTgeeUu+WDj+OCkuOBk+OBk+OBq+ODieODqeODg+OCsOOCouODs+ODieODieODreODg+ODl+OBl+OBpuioreWumuOBp+OBjeOBvuOBmTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9XCJyZWdpc3RyYXRpb24tYnV0dG9uXCIgPlxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZWdpc3RyYXRpb24tb2stYnV0dG9uXCIgb25DbGljaz17dGhpcy5oYW5kbGVTdWJtaXR9Pk9LPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJlZ2lzdHJhdGlvbi1vay1idXR0b25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLmNsb3NlfT7jgq3jg6Pjg7Pjgrvjg6s8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0cmF0aW9uUGFuZTtcbiIsInZhciBTaXplU2xpZGVycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBvbkNoYW5nZSgpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoXCJzaXplXCIsIHRoaXMucmVmcy5zbGlkZXIuZ2V0VmFsdWUoKSk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyc1wiIGlkPVwic2xpZGVycy1zaXplXCI+XG4gICAgICAgICAgICA8UmVhY3RTbGlkZXIgcmVmPVwic2xpZGVyXCIgbWluPXsxfSBtYXg9ezEwMH0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IGRlZmF1bHRWYWx1ZT17NTB9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBTaXplU2xpZGVycztcbiIsInZhciBUZXh0dXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGlja1RleHR1cmUoXCJ0ZXh0dXJlSW5kZXhcIiwgdGhpcy5wcm9wcy50ZXh0dXJlLmlkKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0dXJlID0gdGhpcy5wcm9wcy50ZXh0dXJlO1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5pc1NlbGVjdGVkID8gXCJ0ZXh0dXJlIHNlbGVjdGVkXCIgOiBcInRleHR1cmVcIjtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtjbGFzc05hbWV9IG9uQ2xpY2s9e3RoaXMub25DbGlja30gc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGV4dHVyZS5pZCA+IDAgPyAndXJsKC9pbWcvdGV4dHVyZS8nICsgdGV4dHVyZS5pZCArICcucG5nKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciAvIGNvbnRhaW4sICMzMzMnIDogJyMzMzMnXG4gICAgICAgICAgICB9fT48L2xpPlxuICAgICAgICApXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRleHR1cmU7XG4iLCJpbXBvcnQgVGV4dHVyZSBmcm9tICcuL1RleHR1cmUnO1xuXG52YXIgVGV4dHVyZUxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByb3dzID0gdGhpcy5wcm9wcy50ZXh0dXJlcy5tYXAoKGZ1bmN0aW9uKHRleHR1cmUpIHtcbiAgICAgICAgcmV0dXJuICg8VGV4dHVyZSBpc1NlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkID09PSB0ZXh0dXJlLmlkfSBvbkNsaWNrVGV4dHVyZT17dGhpcy5wcm9wcy5vbkNoYW5nZX0ga2V5PXt0ZXh0dXJlLmlkfSB0ZXh0dXJlPXt0ZXh0dXJlfSAvPik7XG4gICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgaWQ9XCJ0ZXh0dXJlLWxpc3RcIj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICB7cm93c31cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFRleHR1cmVMaXN0O1xuIl19
