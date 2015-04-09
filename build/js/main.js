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
    var state = _.clone(this.state, true);
    state.brush[key] = param;
    this.setState(state);
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
                cosme.name,
                React.createElement('br', null),
                cosme.colorName,
                React.createElement('br', null),
                '/',
                cosme.brand
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
        var textureStyle = brush.textureIndex > 0 ? "url(/img/texture/" + brush.textureIndex + ".png) no-repeat " + (70 - (brush.size + brush.blur) / 2) + "px center /" + (brush.size + brush.blur) + "px " + (brush.size + brush.blur) + "px, " : "";
        var imageStyle = this.state.imgUrl ? "url(" + this.state.imgUrl + ") no-repeat center right / contain, " : "";
        console.log(imageStyle);
        var style = {
            background: imageStyle + textureStyle + "#FFF -webkit-gradient(radial, 70 center, " + (brush.size / 2 - brush.blur - 1) //startとendが同じだと表示されない
             + ", 70 center, " + (brush.size / 2 + brush.blur) + ", from(rgba(" + clrstr + ",1)), to(rgba(" + clrstr + ",0)))"
        };
        console.log(style);
        return React.createElement(
            "div",
            { id: "registration-pane", onDragLeave: this.onDragLeave, onDrop: this.onDrop, onDragOver: this.onDragOver, className: this.state.isDraggingOver ? "dragging-over" : "not-dragging-over" },
            React.createElement(
                "div",
                { id: "registration-container", style: style, onDrop: this.onDropImage },
                React.createElement("input", { type: "text", ref: "cosmeName", placeholder: "商品名を入力" }),
                React.createElement("input", { type: "text", ref: "cosmeColorName", placeholder: "色名を入力" }),
                React.createElement("input", { type: "text", ref: "cosmeBland", placeholder: "ブランド名を入力" }),
                React.createElement(
                    "div",
                    null,
                    "商品画像をドラッグアンドドロップで設定できます"
                )
            ),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdXNlcjEvRGVza3RvcC92aXJ0dWFsLWNvc21lL3NyYy9qcy9tYWluLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tbW9uL3RleHR1cmVzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9BbHBoYVNsaWRlcnMuanMiLCIvVXNlcnMvdXNlcjEvRGVza3RvcC92aXJ0dWFsLWNvc21lL3NyYy9qcy9jb21wb25lbnRzL0JsdXJTbGlkZXJzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9CcnVzaC5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvQ29sb3JTbGlkZXJzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9Db3NtZS5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvQ29zbWVMaXN0LmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9GYWNlQ2FudmFzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9SZWdpc3RyYXRpb25QYW5lLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9TaXplU2xpZGVycy5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvVGV4dHVyZS5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvVGV4dHVyZUxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzJCQ0F3QiwwQkFBMEI7Ozs7MkJBQzFCLDBCQUEwQjs7Ozs0QkFDekIsMkJBQTJCOzs7OzRCQUMzQiwyQkFBMkI7Ozs7MkJBRTVCLDBCQUEwQjs7Ozt3QkFDN0IsbUJBQW1COzs7OzBCQUVqQix5QkFBeUI7Ozs7Z0NBRW5CLCtCQUErQjs7Ozt5QkFFdEMsd0JBQXdCOzs7O3FCQUU1QixvQkFBb0I7Ozs7QUFHdEMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3hCLGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDeEQsV0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixXQUFPO0FBQ0wsV0FBSyxFQUFFO0FBQ0wsYUFBSyxFQUFFO0FBQ0wsV0FBQyxFQUFFLENBQUM7QUFDSixXQUFDLEVBQUUsQ0FBQztBQUNKLFdBQUMsRUFBRSxDQUFDO1NBQ0w7QUFDRCxhQUFLLEVBQUUsR0FBRztBQUNWLFlBQUksRUFBRSxFQUFFO0FBQ1IsWUFBSSxFQUFFLENBQUM7QUFDUCxvQkFBWSxFQUFFLENBQUM7T0FDaEI7QUFDRCxZQUFNLEVBQUUsTUFBTTtBQUNkLG1CQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0dBQ0g7QUFDRCxhQUFXLEVBQUEscUJBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUN0QixRQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEMsU0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDekIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFL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Q2ZGLFdBQVc7Ozs7QUFFL0IsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ2hDLFFBQU0sRUFBRSxrQkFBVztBQUNqQixRQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFTLE9BQU8sRUFBRTtBQUNwRCxhQUFRLDRDQUFTLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsRUFBRSxBQUFDLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEFBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxBQUFDLEdBQUcsQ0FBRTtLQUM5SSxDQUFBLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDZixXQUNFOztRQUFLLEVBQUUsRUFBQyxjQUFjO01BQ3BCOzs7UUFDRyxJQUFJO09BQ0Y7S0FDRCxDQUNOO0dBQ0g7Q0FDSixDQUFDLENBQUM7O3FCQUVZLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFNpemVTbGlkZXJzIGZyb20gJy4vY29tcG9uZW50cy9TaXplU2xpZGVycyc7XG5pbXBvcnQgQmx1clNsaWRlcnMgZnJvbSAnLi9jb21wb25lbnRzL0JsdXJTbGlkZXJzJztcbmltcG9ydCBBbHBoYVNsaWRlcnMgZnJvbSAnLi9jb21wb25lbnRzL0FscGhhU2xpZGVycyc7XG5pbXBvcnQgQ29sb3JTbGlkZXJzIGZyb20gJy4vY29tcG9uZW50cy9Db2xvclNsaWRlcnMnO1xuXG5pbXBvcnQgVGV4dHVyZUxpc3QgZnJvbSAnLi9jb21wb25lbnRzL1RleHR1cmVMaXN0JztcbmltcG9ydCB0ZXh0dXJlcyBmcm9tICcuL2NvbW1vbi90ZXh0dXJlcyc7XG5cbmltcG9ydCBGYWNlQ2FudmFzIGZyb20gJy4vY29tcG9uZW50cy9GYWNlQ2FudmFzJztcblxuaW1wb3J0IFJlZ2lzdHJhdGlvblBhbmUgZnJvbSAnLi9jb21wb25lbnRzL1JlZ2lzdHJhdGlvblBhbmUnO1xuXG5pbXBvcnQgQ29zbWVMaXN0IGZyb20gJy4vY29tcG9uZW50cy9Db3NtZUxpc3QnO1xuXG5pbXBvcnQgQnJ1c2ggZnJvbSAnLi9jb21wb25lbnRzL0JydXNoJztcblxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgIHZhciBjb3NtZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY29zbWVzXCIpKTtcbiAgICAgIGNvbnNvbGUubG9nKGNvc21lcyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBicnVzaDoge1xuICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICByOiAwLFxuICAgICAgICAgICAgZzogMCxcbiAgICAgICAgICAgIGI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFscGhhOiAxMDAsXG4gICAgICAgICAgc2l6ZTogNTAsXG4gICAgICAgICAgYmx1cjogMCxcbiAgICAgICAgICB0ZXh0dXJlSW5kZXg6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY29zbWVzOiBjb3NtZXMsXG4gICAgICAgIGlzUmVnaXN0ZXJpbmc6IGZhbHNlXG4gICAgICB9O1xuICAgIH0sXG4gICAgY2hhbmdlQnJ1c2goa2V5LCBwYXJhbSkge1xuICAgICAgdmFyIHN0YXRlID0gXy5jbG9uZSh0aGlzLnN0YXRlLCB0cnVlKTtcbiAgICAgIHN0YXRlLmJydXNoW2tleV0gPSBwYXJhbTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICAgIH0sXG4gICAgdG9nZ2xlUmVnaXN0cmF0aW9uUGFuZSgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzUmVnaXN0ZXJpbmc6ICF0aGlzLnN0YXRlLmlzUmVnaXN0ZXJpbmd9KTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyKGNvc21lKSB7XG4gICAgICB2YXIgY29zbWVzID0gdGhpcy5zdGF0ZS5jb3NtZXMgPyB0aGlzLnN0YXRlLmNvc21lcyA6IFtdO1xuICAgICAgY29zbWUuYnJ1c2ggPSB0aGlzLnN0YXRlLmJydXNoO1xuICAgICAgY29zbWUuaWQgPSAgY29zbWVzLmxlbmd0aDtcbiAgICAgIGNvc21lcyA9IGNvc21lcy5jb25jYXQoW2Nvc21lXSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjb3NtZXM6IGNvc21lc30pO1xuXG4gICAgICAvL+OBqOOCiuOBguOBiOOBmmxvY2FsU3RyYWdl44Gr5L+d5a2YXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNvc21lc1wiLCBKU09OLnN0cmluZ2lmeShjb3NtZXMpKTtcbiAgICB9LFxuICAgIHNldENvc21lKGNvc21lKSB7XG4gICAgICB2YXIgYnJ1c2ggPSBfLmNsb25lKGNvc21lLmJydXNoKTsvL+OBneOBruOBvuOBvnNldFN0YXRl44GZ44KL44Go5Y+C54Wn44Gr44Gq44KK5aSJ5pu044Gn44GN44Gm44GX44G+44GGXG4gICAgICB0aGlzLnNldFN0YXRlKHticnVzaDogYnJ1c2gsIHRydWV9KTtcbiAgICB9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGJydXNoID0gdGhpcy5zdGF0ZS5icnVzaDtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBpZD1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmlzUmVnaXN0ZXJpbmcgPyAoPFJlZ2lzdHJhdGlvblBhbmUgYnJ1c2g9e3RoaXMuc3RhdGUuYnJ1c2h9IG9uU3VibWl0PXt0aGlzLnJlZ2lzdGVyfSBjbG9zZT17dGhpcy50b2dnbGVSZWdpc3RyYXRpb25QYW5lfSAvPikgOiBudWxsfVxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJsZWZ0XCI+XG4gICAgICAgICAgICAgICAgICA8QnJ1c2ggYnJ1c2g9e2JydXNofSBjb250ZW50PXtudWxsfSBwb3NpdGlvbj1cImNlbnRlciBjZW50ZXJcIi8+XG4gICAgICAgICAgICAgICAgICA8Q29sb3JTbGlkZXJzIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUJydXNofSBjb2xvcj17YnJ1c2guY29sb3J9IHZhbHVlcz17YnJ1c2guY29sb3J9IC8+XG4gICAgICAgICAgICAgICAgICA8QWxwaGFTbGlkZXJzIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUJydXNofSB2YWx1ZT17YnJ1c2guYWxwaGF9IC8+XG4gICAgICAgICAgICAgICAgICA8U2l6ZVNsaWRlcnMgb25DaGFuZ2U9e3RoaXMuY2hhbmdlQnJ1c2h9IHZhbHVlPXticnVzaC5zaXplfSAvPlxuICAgICAgICAgICAgICAgICAgPEJsdXJTbGlkZXJzIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUJydXNofSBzaXplPXticnVzaC5zaXplfSB2YWx1ZT17YnJ1c2guYmx1cn0gLz5cbiAgICAgICAgICAgICAgICAgIDxUZXh0dXJlTGlzdCBvbkNoYW5nZT17dGhpcy5jaGFuZ2VCcnVzaH0gdGV4dHVyZXM9e3RleHR1cmVzfSBzZWxlY3RlZD17YnJ1c2gudGV4dHVyZUluZGV4fSAvPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJlZ2lzdHJhdGlvbi1vcGVuLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlUmVnaXN0cmF0aW9uUGFuZX0gPueZu+mMsuOBmeOCizwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxGYWNlQ2FudmFzIGJydXNoPXticnVzaH0gd2lkdGg9ezUwMH0gaGVpZ2h0PXs1MDB9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICA8Q29zbWVMaXN0IG9uQ2xpY2tDb3NtZT17dGhpcy5zZXRDb3NtZX0gY29zbWVzPXt0aGlzLnN0YXRlLmNvc21lc30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5SZWFjdC5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuYm9keSk7XG4iLCIvL+ODhuOCr+OCueODgeODo+OBruiqreOBv+i+vOOBv1xuLy8w55Wq55uu44GvXCLjg4bjgq/jgrnjg4Hjg6PnhKHjgZdcIlxudmFyIHRleHR1cmVzID0gW3tpZDowfV07XG5mb3IodmFyIGk9MTsgaTw2OyBpKyspe1xuICB0ZXh0dXJlc1tpXSA9IHtpZCA6IGl9O1xuICB0ZXh0dXJlc1tpXS5pbWcgPSBuZXcgSW1hZ2UoKTtcbiAgdGV4dHVyZXNbaV0uaW1nLnNyYyA9IFwiaW1nL3RleHR1cmUvXCIgKyBpICsgXCIucG5nXCI7XG4gIGNvbnNvbGUubG9nKHRleHR1cmVzW2ldKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGV4dHVyZXM7XG4iLCJ2YXIgQWxwaGFTbGlkZXJzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG9uQ2hhbmdlKCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcImFscGhhXCIsIHRoaXMucmVmcy5zbGlkZXIuZ2V0VmFsdWUoKSk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyc1wiIGlkPVwic2xpZGVycy1hbHBoYVwiPlxuICAgICAgICAgICAgPFJlYWN0U2xpZGVyIHJlZj1cInNsaWRlclwiIG1pbj17MTB9IG1heD17MTAwfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0gZGVmYXVsdFZhbHVlPXsxMDB9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBbHBoYVNsaWRlcnM7XG4iLCJ2YXIgQmx1clNsaWRlcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgb25DaGFuZ2UoKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFwiYmx1clwiLCB0aGlzLnJlZnMuc2xpZGVyLmdldFZhbHVlKCkpO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlcnNcIiBpZD1cInNsaWRlcnMtYmx1clwiPlxuICAgICAgICAgICAgPFJlYWN0U2xpZGVyIHJlZj1cInNsaWRlclwiIG1pbj17MH0gbWF4PXtNYXRoLmZsb29yKHRoaXMucHJvcHMuc2l6ZS8yKX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IGRlZmF1bHRWYWx1ZT17MH0gdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJsdXJTbGlkZXJzO1xuIiwidmFyIEJydXNoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcigpIHtcbiAgICAgIHZhciBicnVzaCA9IHRoaXMucHJvcHMuYnJ1c2g7XG4gICAgICB2YXIgY2xyc3RyID0gW2JydXNoLmNvbG9yLnIsIGJydXNoLmNvbG9yLmcsIGJydXNoLmNvbG9yLmJdLmpvaW4oXCIsXCIpO1xuICAgICAgdmFyIHRleHR1cmVTdHlsZSA9IGJydXNoLnRleHR1cmVJbmRleCA+IDAgPyAndXJsKC9pbWcvdGV4dHVyZS8nICsgYnJ1c2gudGV4dHVyZUluZGV4XG4gICAgICAgICAgKyAnLnBuZykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgLydcbiAgICAgICAgICArIChicnVzaC5zaXplICsgYnJ1c2guYmx1cikgKyAncHggJyArIChicnVzaC5zaXplICsgYnJ1c2guYmx1cilcbiAgICAgICAgICArICdweCwgJyA6IFwiXCI7XG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICBvcGFjaXR5OiBicnVzaC5hbHBoYS8xMDAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB0ZXh0dXJlU3R5bGUgKyAnLXdlYmtpdC1ncmFkaWVudChyYWRpYWwsIGNlbnRlciBjZW50ZXIsICdcbiAgICAgICAgICAgICsgKGJydXNoLnNpemUvMiAtIGJydXNoLmJsdXIgLSAxICkgLy9zdGFydOOBqGVuZOOBjOWQjOOBmOOBoOOBqOihqOekuuOBleOCjOOBquOBhFxuICAgICAgICAgICAgKyAnLCBjZW50ZXIgY2VudGVyLCAnICsgKGJydXNoLnNpemUvMiArIGJydXNoLmJsdXIpXG4gICAgICAgICAgICArICcsIGZyb20ocmdiYSgnICsgY2xyc3RyICsgJywxKSksIHRvKHJnYmEoJyArIGNscnN0ciArICcsMCkpKSdcbiAgICAgICAgICB9O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBpZD1cImJydXNoLXNhbXBsZVwiIHN0eWxlPXtzdHlsZX0+PC9kaXY+XG4gICAgICApXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEJydXNoO1xuIiwidmFyIENvbG9yU2xpZGVycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBvbkNoYW5nZSgpIHtcbiAgICAgICAgdmFyIHBhcmFtID0ge1xuICAgICAgICAgICAgcjogdGhpcy5yZWZzLnIuZ2V0VmFsdWUoKSxcbiAgICAgICAgICAgIGc6IHRoaXMucmVmcy5nLmdldFZhbHVlKCksXG4gICAgICAgICAgICBiOiB0aGlzLnJlZnMuYi5nZXRWYWx1ZSgpLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoXCJjb2xvclwiLCBwYXJhbSk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBiYWNrQ29sb3JzID0ge1xuICAgICAgICAgICAgcjoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiByZ2JUb0hleCgwLCB0aGlzLnByb3BzLmNvbG9yLmcsIHRoaXMucHJvcHMuY29sb3IuYiksXG4gICAgICAgICAgICAgICAgZW5kOiByZ2JUb0hleCgyNTUsIHRoaXMucHJvcHMuY29sb3IuZywgdGhpcy5wcm9wcy5jb2xvci5iKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGc6IHtcbiAgICAgICAgICAgICAgICBzdGFydDogcmdiVG9IZXgodGhpcy5wcm9wcy5jb2xvci5yLCAwLCB0aGlzLnByb3BzLmNvbG9yLmIpLFxuICAgICAgICAgICAgICAgIGVuZDogcmdiVG9IZXgodGhpcy5wcm9wcy5jb2xvci5yLCAyNTUsIHRoaXMucHJvcHMuY29sb3IuYilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHJnYlRvSGV4KHRoaXMucHJvcHMuY29sb3IuciwgdGhpcy5wcm9wcy5jb2xvci5nLCAwKSxcbiAgICAgICAgICAgICAgICBlbmQ6IHJnYlRvSGV4KHRoaXMucHJvcHMuY29sb3IuciwgdGhpcy5wcm9wcy5jb2xvci5nLCAyNTUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0eWxlID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKGJhY2tDb2xvcnMpLmZvckVhY2goZnVuY3Rpb24oYyl7XG4gICAgICAgICAgc3R5bGVbY10gPSB7XG4gICAgICAgICAgICAvL2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQobGVmdCwgJyArIGJhY2tDb2xvcnMuci5zdGFydCArICcsICcgKyBiYWNrQ29sb3JzLnIuZW5kICsgJyknLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJy13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgcmlnaHQgdG9wLCBmcm9tKCcgKyBiYWNrQ29sb3JzW2NdLnN0YXJ0ICsgJyksIHRvKCcgKyBiYWNrQ29sb3JzW2NdLmVuZCArICcpKScsXG4gICAgICAgICAgICAvL2JhY2tncm91bmQ6ICctbW96LWxpbmVhci1ncmFkaWVudChsZWZ0LCAnICsgYmFja0NvbG9ycy5yLnN0YXJ0ICsgJywnICsgYmFja0NvbG9ycy5yLmVuZCArICcpJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlcnNcIiBpZD1cInNsaWRlcnMtY29sb3JcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic2xpZGVycy1jb2xvci1yXCIgc3R5bGU9e3N0eWxlLnJ9ID5cbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0U2xpZGVyIHJlZj1cInJcIiBtaW49ezB9IG1heD17MjU1fSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0gdmFsdWU9e3RoaXMucHJvcHMudmFsdWVzLnJ9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInNsaWRlcnMtY29sb3ItZ1wiIHN0eWxlPXtzdHlsZS5nfSA+XG4gICAgICAgICAgICAgICAgICAgIDxSZWFjdFNsaWRlciByZWY9XCJnXCIgbWluPXswfSBtYXg9ezI1NX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlcy5nfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzbGlkZXJzLWNvbG9yLWJcIiBzdHlsZT17c3R5bGUuYn0gPlxuICAgICAgICAgICAgICAgICAgICA8UmVhY3RTbGlkZXIgcmVmPVwiYlwiIG1pbj17MH0gbWF4PXsyNTV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZXMuYn0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDb2xvclNsaWRlcnM7XG4iLCJ2YXIgQ29zbWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgb25DbGljaygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrQ29zbWUodGhpcy5wcm9wcy5jb3NtZSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29zbWUgPSB0aGlzLnByb3BzLmNvc21lO1xuICAgICAgICB2YXIgY2xyc3RyID0gW2Nvc21lLmJydXNoLmNvbG9yLnIsIGNvc21lLmJydXNoLmNvbG9yLmcsIGNvc21lLmJydXNoLmNvbG9yLmJdLmpvaW4oXCIsXCIpO1xuICAgICAgICB2YXIgdGV4dHVyZVN0eWxlID0gY29zbWUuYnJ1c2gudGV4dHVyZUluZGV4ID4gMCA/ICd1cmwoL2ltZy90ZXh0dXJlLycgKyBjb3NtZS5icnVzaC50ZXh0dXJlSW5kZXhcbiAgICAgICAgICAgICsgJy5wbmcpIG5vLXJlcGVhdCAnICsgKDQwIC0gKGNvc21lLmJydXNoLnNpemUgKyBjb3NtZS5icnVzaC5ibHVyKS8yKSArICdweCBjZW50ZXIgLydcbiAgICAgICAgICAgICsgKGNvc21lLmJydXNoLnNpemUgKyBjb3NtZS5icnVzaC5ibHVyKSArICdweCAnICsgKGNvc21lLmJydXNoLnNpemUgKyBjb3NtZS5icnVzaC5ibHVyKVxuICAgICAgICAgICAgKyAncHgsICcgOiBcIlwiO1xuICAgICAgICB2YXIgaW1hZ2VTdHlsZSA9IGNvc21lLmltZ1VybCA/ICcsIHVybCgnICsgY29zbWUuaW1nVXJsICsgJykgbm8tcmVwZWF0IGNlbnRlciByaWdodCAvIGNvbnRhaW4nIDogJydcbiAgICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRleHR1cmVTdHlsZSArICctd2Via2l0LWdyYWRpZW50KHJhZGlhbCwgNDAgY2VudGVyLCAnXG4gICAgICAgICAgICAgICAgICArIChjb3NtZS5icnVzaC5zaXplLzIgLSBjb3NtZS5icnVzaC5ibHVyIC0gMSApIC8vc3RhcnTjgahlbmTjgYzlkIzjgZjjgaDjgajooajnpLrjgZXjgozjgarjgYRcbiAgICAgICAgICAgICAgICAgICsgJywgNDAgY2VudGVyLCAnICsgKGNvc21lLmJydXNoLnNpemUvMiArIGNvc21lLmJydXNoLmJsdXIpXG4gICAgICAgICAgICAgICAgICArICcsIGZyb20ocmdiYSgnICsgY2xyc3RyICsgJywxKSksIHRvKHJnYmEoJyArIGNscnN0ciArICcsMCkpKScgKyBpbWFnZVN0eWxlXG4gICAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJjb3NtZVwiIG9uQ2xpY2s9e3RoaXMub25DbGlja30gc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICAgIDxwPntjb3NtZS5uYW1lfTxiciAvPlxuICAgICAgICAgICAge2Nvc21lLmNvbG9yTmFtZX08YnIgLz5cbiAgICAgICAgICAgIC97Y29zbWUuYnJhbmR9PC9wPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENvc21lO1xuIiwiaW1wb3J0IENvc21lIGZyb20gJy4vQ29zbWUnO1xuXG52YXIgQ29zbWVMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLnByb3BzLmNvc21lcykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcm93cyA9IHRoaXMucHJvcHMuY29zbWVzLm1hcCgoZnVuY3Rpb24oY29zbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAoPENvc21lIG9uQ2xpY2tDb3NtZT17dGhpcy5wcm9wcy5vbkNsaWNrQ29zbWV9IGtleT17Y29zbWUuaWR9IGNvc21lPXtjb3NtZX0gLz4pO1xuICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBpZD1cImNvc21lLWxpc3RcIj5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAge3Jvd3N9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDb3NtZUxpc3Q7XG4iLCJpbXBvcnQgdGV4dHVyZXMgZnJvbSAnLi4vY29tbW9uL3RleHR1cmVzLmpzJztcblxudmFyIGNhbnZhcyA9IHt9LCBjdHggPSB7fTtcblxudmFyIEZhY2VDYW52YXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlKCl7XG4gICAgICByZXR1cm4ge3BvaW50czpbXSwgbW91c2Vkb3duOmZhbHNlLCBsZW5ndGg6IDB9O1xuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgIGNhbnZhcyA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMucmVmcy5jYW52YXMpLFxuICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB9LFxuICAgIG9uTW91c2VEb3duKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7bW91c2Vkb3duOiB0cnVlfSk7XG4gICAgfSxcbiAgICBvbk1vdXNlVXAoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHttb3VzZWRvd246IGZhbHNlfSk7XG4gICAgfSxcbiAgICBvbk1vdXNlTW92ZShlKSB7XG4gICAgICBpZih0aGlzLnN0YXRlLm1vdXNlZG93bil7XG4gICAgICAgIHZhciByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIHggPSBlLmNsaWVudFggLSByZWN0LmxlZnQsXG4gICAgICAgICAgeSA9IGUuY2xpZW50WSAtIHJlY3QudG9wLFxuXG4gICAgICAgICAgLy/mj4/nlLvjg53jgqTjg7Pjg4jphY3liJfjgYzjgqLjg7Pjg4njgqXjgZXjgozjgabjgYTjgZ/jgonjgIHjgZ3jgozku6XpmY3jgpLmtojljrvjgZfjgIHmlrDjgZfjgYTjg53jgqTjg7Pjg4jjgpLjgaTjgarjgZLjgotcbiAgICAgICAgICBwb2ludHMgPSB0aGlzLnN0YXRlLnBvaW50cy5sZW5ndGggPiB0aGlzLnN0YXRlLmxlbmd0aCA/IHRoaXMuc3RhdGUucG9pbnRzLnNsaWNlKDAsIHRoaXMuc3RhdGUubGVuZ3RoKS5jb25jYXQoW1t4LCB5XV0pIDogdGhpcy5zdGF0ZS5wb2ludHMuY29uY2F0KFtbeCwgeV1dKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtwb2ludHM6IHBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgbW91c2Vkb3duOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHRoaXMuc3RhdGUubGVuZ3RoICsgMVxuICAgICAgICAgICAgICAgICAgICAgIH0pOy8v5bqn5qiZ6YWN5YiX44Gr6L+95Yqg44GX44Gm44K744OD44OIXG4gICAgICB9XG4gICAgfSxcbiAgICAvL2NsZWFyKCkge1xuICAgIC8vICB0aGlzLnNldFN0YXRlKHtwb2ludHM6W10sIG1vdXNlZG93bjogZmFsc2UsIGxlbmd0aDogMH0pO1xuICAgIC8vfSxcbiAgICBwYWludCgpIHtcbiAgICAgIGlmKCEoXCJmaWxsU3R5bGVcIiBpbiBjdHgpIHwgdGhpcy5zdGF0ZS5wb2ludHMubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8v5Yid5pyf5YyW5pmC44GvcGFpbnTjgZfjgarjgYRcbiAgICAgIH1cbiAgICAgIHZhciBicnVzaCA9IHRoaXMucHJvcHMuYnJ1c2gsXG4gICAgICAgICAgcG9pbnRzID0gdGhpcy5zdGF0ZS5wb2ludHMsXG4gICAgICAgICAgbCA9IHRoaXMuc3RhdGUubGVuZ3RoO1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpOy8vY2FudmFz44Gu44Oq44K744OD44OI44Gv44Gn44GN44KM44Gw5pyA5bCP6ZmQ44Gr44GX44Gf44G744GG44GM44GE44GEXG4gICAgICBpZihicnVzaC5ibHVyIT0wKXsvL+OBvOOBi+OBl+OBr3JhZGlhbEdyYWRpZW5044KS5L2/44GGXG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGw7IGkrKyl7XG4gICAgICAgICAgdmFyIHAgPSBwb2ludHNbaV0sXG4gICAgICAgICAgICBncmFkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KHBbMF0sIHBbMV0sIDEwLCBwWzBdLCBwWzFdLCBicnVzaC5zaXplLzIrYnJ1c2guYmx1cik7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWQ7XG4gICAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoKGJydXNoLnNpemUtYnJ1c2guYmx1cikvKGJydXNoLnNpemUrYnJ1c2guYmx1ciksIFwicmdiYShcIiArIFticnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKSArIFwiLCAwLjEpXCIpOy8v56mN5bGk44GZ44KL44Gu44GnMC4x44GP44KJ44GE44Gn44Gh44KH44GG44Gp44GE44GEXG4gICAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMSwgXCJyZ2JhKFwiICsgW2JydXNoLmNvbG9yLnIsIGJydXNoLmNvbG9yLmcsIGJydXNoLmNvbG9yLmJdLmpvaW4oXCIsXCIpICsgXCIsIDApXCIpO1xuICAgICAgICAgIGN0eC5maWxsUmVjdChwWzBdLWJydXNoLnNpemUvMi1icnVzaC5ibHVyLCBwWzFdLWJydXNoLnNpemUvMi1icnVzaC5ibHVyLCBicnVzaC5zaXplK2JydXNoLmJsdXIqMiwgYnJ1c2guc2l6ZSticnVzaC5ibHVyKjIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKFwiICsgW2JydXNoLmNvbG9yLnIsIGJydXNoLmNvbG9yLmcsIGJydXNoLmNvbG9yLmJdLmpvaW4oXCIsXCIpICsgXCIsIDAuMSlcIjtcbiAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSByZ2JUb0hleChicnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iKTtcbiAgICAgICAgLy9jdHgubGluZVdpZHRoID0gYnJ1c2guc2l6ZTtcbiAgICAgICAgLy9jdHguYXJjKHBhWzBdWzBdLCBwYVswXVsxXSwgYnJ1c2guc2l6ZS8yLCAwLCBNYXRoLlBJKjIsIGZhbHNlKTtcbiAgICAgICAgLy9jdHguZmlsbCgpO1xuICAgICAgICBmb3IodmFyIGk9MTsgaTxsOyBpKyspe1xuICAgICAgICAgIHZhciBwID0gcG9pbnRzW2ldO1xuICAgICAgICAgIC8vICAgIHBwID0gcGFbaS0xXTtcbiAgICAgICAgICAvL2N0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAvL2N0eC5tb3ZlVG8ocHBbMF0sIHBwWzFdKTtcbiAgICAgICAgICAvL2N0eC5saW5lVG8ocFswXSwgcFsxXSk7XG4gICAgICAgICAgLy9jdHguc3Ryb2tlKCk7XG4gICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgIGN0eC5hcmMocFswXSwgcFsxXSwgYnJ1c2guc2l6ZS8yLCAwLCBNYXRoLlBJKjIsIGZhbHNlKTtcbiAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgIC8vY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvL+ODhuOCr+OCueODgeODo+OBruaPj+eUu1xuICAgICAgZm9yKHZhciBpPTE7IGk8bDsgaSs9MTUpe1xuICAgICAgICB2YXIgcCA9IHBvaW50c1tpXTtcbiAgICAgICAgaWYodGV4dHVyZXNbYnJ1c2gudGV4dHVyZUluZGV4XS5pbWcpe1xuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGV4dHVyZXNbYnJ1c2gudGV4dHVyZUluZGV4XS5pbWcsIHBbMF0tKGJydXNoLnNpemUrYnJ1c2guYmx1cikvMiwgcFsxXS0oYnJ1c2guc2l6ZSticnVzaC5ibHVyKS8yLCBicnVzaC5zaXplK2JydXNoLmJsdXIsIGJydXNoLnNpemUrYnJ1c2guYmx1cik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHVuZG9DaGFuZ2UoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtsZW5ndGg6IHRoaXMucmVmcy51bmRvLmdldFZhbHVlKCl9KTtcbiAgICB9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgIHRoaXMucGFpbnQoKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgaWQ9XCJmYWNlLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxjYW52YXMgaWQ9XCJmYWNlXCIgcmVmPVwiY2FudmFzXCIgd2lkdGg9e3RoaXMucHJvcHMud2lkdGh9IGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHR9XG4gICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5vbk1vdXNlRG93bn0gb25Nb3VzZU1vdmU9e3RoaXMub25Nb3VzZU1vdmV9IG9uTW91c2VVcD17dGhpcy5vbk1vdXNlVXB9XG4gICAgICAgICAgICBzdHlsZT17e29wYWNpdHk6IHRoaXMucHJvcHMuYnJ1c2guYWxwaGEvMTAwfX0vPlxuICAgICAgICAgIDxkaXYgaWQ9XCJmYWNlLWltZ1wiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyc1wiIGlkPVwic2xpZGVycy11bmRvXCI+XG4gICAgICAgICAgICA8UmVhY3RTbGlkZXIgcmVmPVwidW5kb1wiIG1pbj17MH0gbWF4PXt0aGlzLnN0YXRlLnBvaW50cy5sZW5ndGh9IGRlZmF1bHRWYWx1ZT17MH0gdmFsdWU9e3RoaXMuc3RhdGUubGVuZ3RofSBvbkNoYW5nZT17dGhpcy51bmRvQ2hhbmdlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEZhY2VDYW52YXM7XG4iLCJ2YXIgUmVnaXN0cmF0aW9uUGFuZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc0RyYWdnaW5nT3ZlcjogZmFsc2UsXG4gICAgICAgICAgICBpbWdVcmw6IG51bGxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGhhbmRsZVN1Ym1pdCgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblN1Ym1pdCh7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLnJlZnMuY29zbWVOYW1lLmdldERPTU5vZGUoKS52YWx1ZSxcbiAgICAgICAgICAgIGNvbG9yTmFtZTogdGhpcy5yZWZzLmNvc21lQ29sb3JOYW1lLmdldERPTU5vZGUoKS52YWx1ZSxcbiAgICAgICAgICAgIGJyYW5kOiB0aGlzLnJlZnMuY29zbWVCbGFuZC5nZXRET01Ob2RlKCkudmFsdWUsXG4gICAgICAgICAgICBpbWdVcmw6IHRoaXMuc3RhdGUuaW1nVXJsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb3BzLmNsb3NlKCk7XG4gICAgfSxcbiAgICBvbkRyYWdPdmVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNEcmFnZ2luZ092ZXI6IHRydWV9KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sXG4gICAgb25EcmFnTGVhdmUoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0RyYWdnaW5nT3ZlcjogZmFsc2V9KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sXG4gICAgb25Ecm9wKGUpIHtcbiAgICAgICAgdmFyIGltZ1VybCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ1cmxcIik7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1VybDogaW1nVXJsLCBpc0RyYWdnaW5nT3ZlcjogZmFsc2V9KTtcbiAgICAgICAgY29uc29sZS5sb2coaW1nVXJsKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgYnJ1c2ggPSB0aGlzLnByb3BzLmJydXNoO1xuICAgICAgICB2YXIgY2xyc3RyID0gW2JydXNoLmNvbG9yLnIsIGJydXNoLmNvbG9yLmcsIGJydXNoLmNvbG9yLmJdLmpvaW4oXCIsXCIpO1xuICAgICAgICB2YXIgdGV4dHVyZVN0eWxlID0gYnJ1c2gudGV4dHVyZUluZGV4ID4gMCA/ICd1cmwoL2ltZy90ZXh0dXJlLycgKyBicnVzaC50ZXh0dXJlSW5kZXhcbiAgICAgICAgICAgICsgJy5wbmcpIG5vLXJlcGVhdCAnICsgKDcwIC0gKGJydXNoLnNpemUgKyBicnVzaC5ibHVyKS8yKSArICdweCBjZW50ZXIgLydcbiAgICAgICAgICAgICsgKGJydXNoLnNpemUgKyBicnVzaC5ibHVyKSArICdweCAnICsgKGJydXNoLnNpemUgKyBicnVzaC5ibHVyKVxuICAgICAgICAgICAgKyAncHgsICcgOiBcIlwiO1xuICAgICAgICB2YXIgaW1hZ2VTdHlsZSA9IHRoaXMuc3RhdGUuaW1nVXJsID8gKCd1cmwoJyArIHRoaXMuc3RhdGUuaW1nVXJsICsgJykgbm8tcmVwZWF0IGNlbnRlciByaWdodCAvIGNvbnRhaW4sICcpIDogJyc7XG4gICAgICAgIGNvbnNvbGUubG9nKGltYWdlU3R5bGUpO1xuICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaW1hZ2VTdHlsZSArIHRleHR1cmVTdHlsZSArICcjRkZGIC13ZWJraXQtZ3JhZGllbnQocmFkaWFsLCA3MCBjZW50ZXIsICdcbiAgICAgICAgICAgICAgICAgICsgKGJydXNoLnNpemUvMiAtIGJydXNoLmJsdXIgLSAxICkgLy9zdGFydOOBqGVuZOOBjOWQjOOBmOOBoOOBqOihqOekuuOBleOCjOOBquOBhFxuICAgICAgICAgICAgICAgICAgKyAnLCA3MCBjZW50ZXIsICcgKyAoYnJ1c2guc2l6ZS8yICsgYnJ1c2guYmx1cilcbiAgICAgICAgICAgICAgICAgICsgJywgZnJvbShyZ2JhKCcgKyBjbHJzdHIgKyAnLDEpKSwgdG8ocmdiYSgnICsgY2xyc3RyICsgJywwKSkpJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coc3R5bGUpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgaWQ9XCJyZWdpc3RyYXRpb24tcGFuZVwiIG9uRHJhZ0xlYXZlPXt0aGlzLm9uRHJhZ0xlYXZlfSBvbkRyb3A9e3RoaXMub25Ecm9wfSBvbkRyYWdPdmVyPXt0aGlzLm9uRHJhZ092ZXJ9IGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5pc0RyYWdnaW5nT3ZlciA/IFwiZHJhZ2dpbmctb3ZlclwiIDogXCJub3QtZHJhZ2dpbmctb3ZlclwifT5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJyZWdpc3RyYXRpb24tY29udGFpbmVyXCIgc3R5bGU9e3N0eWxlfSBvbkRyb3A9e3RoaXMub25Ecm9wSW1hZ2V9ID5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPVwiY29zbWVOYW1lXCIgcGxhY2Vob2xkZXI9XCLllYblk4HlkI3jgpLlhaXliptcIj48L2lucHV0PlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJjb3NtZUNvbG9yTmFtZVwiIHBsYWNlaG9sZGVyPVwi6Imy5ZCN44KS5YWl5YqbXCI+PC9pbnB1dD5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPVwiY29zbWVCbGFuZFwiIHBsYWNlaG9sZGVyPVwi44OW44Op44Oz44OJ5ZCN44KS5YWl5YqbXCI+PC9pbnB1dD5cbiAgICAgICAgICAgICAgPGRpdj7llYblk4HnlLvlg4/jgpLjg4njg6njg4PjgrDjgqLjg7Pjg4njg4njg63jg4Pjg5fjgafoqK3lrprjgafjgY3jgb7jgZk8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJlZ2lzdHJhdGlvbi1vay1idXR0b25cIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVN1Ym1pdH0+T0s8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZWdpc3RyYXRpb24tb2stYnV0dG9uXCIgb25DbGljaz17dGhpcy5wcm9wcy5jbG9zZX0+44Kt44Oj44Oz44K744OrPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lzdHJhdGlvblBhbmU7XG4iLCJ2YXIgU2l6ZVNsaWRlcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgb25DaGFuZ2UoKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFwic2l6ZVwiLCB0aGlzLnJlZnMuc2xpZGVyLmdldFZhbHVlKCkpO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlcnNcIiBpZD1cInNsaWRlcnMtc2l6ZVwiPlxuICAgICAgICAgICAgPFJlYWN0U2xpZGVyIHJlZj1cInNsaWRlclwiIG1pbj17MX0gbWF4PXsxMDB9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBkZWZhdWx0VmFsdWU9ezUwfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU2l6ZVNsaWRlcnM7XG4iLCJ2YXIgVGV4dHVyZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBvbkNsaWNrKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2tUZXh0dXJlKFwidGV4dHVyZUluZGV4XCIsIHRoaXMucHJvcHMudGV4dHVyZS5pZCk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGV4dHVyZSA9IHRoaXMucHJvcHMudGV4dHVyZTtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuaXNTZWxlY3RlZCA/IFwidGV4dHVyZSBzZWxlY3RlZFwiIDogXCJ0ZXh0dXJlXCI7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBvbkNsaWNrPXt0aGlzLm9uQ2xpY2t9IHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRleHR1cmUuaWQgPiAwID8gJ3VybCgvaW1nL3RleHR1cmUvJyArIHRleHR1cmUuaWQgKyAnLnBuZykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgLyBjb250YWluLCAjMzMzJyA6ICcjMzMzJ1xuICAgICAgICAgICAgfX0+PC9saT5cbiAgICAgICAgKVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBUZXh0dXJlO1xuIiwiaW1wb3J0IFRleHR1cmUgZnJvbSAnLi9UZXh0dXJlJztcblxudmFyIFRleHR1cmVMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcm93cyA9IHRoaXMucHJvcHMudGV4dHVyZXMubWFwKChmdW5jdGlvbih0ZXh0dXJlKSB7XG4gICAgICAgIHJldHVybiAoPFRleHR1cmUgaXNTZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZCA9PT0gdGV4dHVyZS5pZH0gb25DbGlja1RleHR1cmU9e3RoaXMucHJvcHMub25DaGFuZ2V9IGtleT17dGV4dHVyZS5pZH0gdGV4dHVyZT17dGV4dHVyZX0gLz4pO1xuICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGlkPVwidGV4dHVyZS1saXN0XCI+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAge3Jvd3N9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBUZXh0dXJlTGlzdDtcbiJdfQ==
