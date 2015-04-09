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
        e.preventDefault();
    },
    render: function render() {
        var brush = this.props.brush;
        var clrstr = [brush.color.r, brush.color.g, brush.color.b].join(",");
        var textureStyle = brush.textureIndex > 0 ? "url(/img/texture/" + brush.textureIndex + ".png) no-repeat " + (40 - (brush.size + brush.blur) / 2) + "px center /" + (brush.size + brush.blur) + "px " + (brush.size + brush.blur) + "px, " : "";
        var imageStyle = this.state.imgUrl ? ", url(" + this.state.imgUrl + ") no-repeat center right / contain" : "";
        var style = {
            background: textureStyle + "#FFF -webkit-gradient(radial, 40 center, " + (brush.size / 2 - brush.blur - 1) //startとendが同じだと表示されない
             + ", 40 center, " + (brush.size / 2 + brush.blur) + ", from(rgba(" + clrstr + ",1)), to(rgba(" + clrstr + ",0)))" + imageStyle
        };
        return React.createElement(
            "div",
            { id: "registration-pane", onDragLeave: this.onDragLeave, onDrop: this.onDrop, onDragOver: this.onDragOver, className: this.state.isDraggingOver ? "dragging-over" : "not-dragging-over" },
            React.createElement(
                "div",
                { id: "registration-container", style: style, onDrop: this.onDropImage },
                React.createElement("input", { type: "text", ref: "cosmeName", placeholder: "商品名を入力" }),
                React.createElement("input", { type: "text", ref: "cosmeColorName", placeholder: "色名を入力" }),
                React.createElement("input", { type: "text", ref: "cosmeBland", placeholder: "ブランド名を入力" })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdXNlcjEvRGVza3RvcC92aXJ0dWFsLWNvc21lL3NyYy9qcy9tYWluLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tbW9uL3RleHR1cmVzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9BbHBoYVNsaWRlcnMuanMiLCIvVXNlcnMvdXNlcjEvRGVza3RvcC92aXJ0dWFsLWNvc21lL3NyYy9qcy9jb21wb25lbnRzL0JsdXJTbGlkZXJzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9CcnVzaC5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvQ29sb3JTbGlkZXJzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9Db3NtZS5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvQ29zbWVMaXN0LmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9GYWNlQ2FudmFzLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9SZWdpc3RyYXRpb25QYW5lLmpzIiwiL1VzZXJzL3VzZXIxL0Rlc2t0b3AvdmlydHVhbC1jb3NtZS9zcmMvanMvY29tcG9uZW50cy9TaXplU2xpZGVycy5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvVGV4dHVyZS5qcyIsIi9Vc2Vycy91c2VyMS9EZXNrdG9wL3ZpcnR1YWwtY29zbWUvc3JjL2pzL2NvbXBvbmVudHMvVGV4dHVyZUxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzJCQ0F3QiwwQkFBMEI7Ozs7MkJBQzFCLDBCQUEwQjs7Ozs0QkFDekIsMkJBQTJCOzs7OzRCQUMzQiwyQkFBMkI7Ozs7MkJBRTVCLDBCQUEwQjs7Ozt3QkFDN0IsbUJBQW1COzs7OzBCQUVqQix5QkFBeUI7Ozs7Z0NBRW5CLCtCQUErQjs7Ozt5QkFFdEMsd0JBQXdCOzs7O3FCQUU1QixvQkFBb0I7Ozs7QUFHdEMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3hCLGlCQUFlLEVBQUEsMkJBQUc7QUFDaEIsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDeEQsV0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixXQUFPO0FBQ0wsV0FBSyxFQUFFO0FBQ0wsYUFBSyxFQUFFO0FBQ0wsV0FBQyxFQUFFLENBQUM7QUFDSixXQUFDLEVBQUUsQ0FBQztBQUNKLFdBQUMsRUFBRSxDQUFDO1NBQ0w7QUFDRCxhQUFLLEVBQUUsR0FBRztBQUNWLFlBQUksRUFBRSxFQUFFO0FBQ1IsWUFBSSxFQUFFLENBQUM7QUFDUCxvQkFBWSxFQUFFLENBQUM7T0FDaEI7QUFDRCxZQUFNLEVBQUUsTUFBTTtBQUNkLG1CQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0dBQ0g7QUFDRCxhQUFXLEVBQUEscUJBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUN0QixRQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEMsU0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDekIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFL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QUMsVUFBUyxPQUFPLEVBQUU7QUFDcEQsYUFBUSw0Q0FBUyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLEVBQUUsQUFBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQUFBQyxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsRUFBRSxBQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sQUFBQyxHQUFHLENBQUU7S0FDOUksQ0FBQSxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2YsV0FDRTs7UUFBSyxFQUFFLEVBQUMsY0FBYztNQUNwQjs7O1FBQ0csSUFBSTtPQUNGO0tBQ0QsQ0FDTjtHQUNIO0NBQ0osQ0FBQyxDQUFDOztxQkFFWSxXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTaXplU2xpZGVycyBmcm9tICcuL2NvbXBvbmVudHMvU2l6ZVNsaWRlcnMnO1xuaW1wb3J0IEJsdXJTbGlkZXJzIGZyb20gJy4vY29tcG9uZW50cy9CbHVyU2xpZGVycyc7XG5pbXBvcnQgQWxwaGFTbGlkZXJzIGZyb20gJy4vY29tcG9uZW50cy9BbHBoYVNsaWRlcnMnO1xuaW1wb3J0IENvbG9yU2xpZGVycyBmcm9tICcuL2NvbXBvbmVudHMvQ29sb3JTbGlkZXJzJztcblxuaW1wb3J0IFRleHR1cmVMaXN0IGZyb20gJy4vY29tcG9uZW50cy9UZXh0dXJlTGlzdCc7XG5pbXBvcnQgdGV4dHVyZXMgZnJvbSAnLi9jb21tb24vdGV4dHVyZXMnO1xuXG5pbXBvcnQgRmFjZUNhbnZhcyBmcm9tICcuL2NvbXBvbmVudHMvRmFjZUNhbnZhcyc7XG5cbmltcG9ydCBSZWdpc3RyYXRpb25QYW5lIGZyb20gJy4vY29tcG9uZW50cy9SZWdpc3RyYXRpb25QYW5lJztcblxuaW1wb3J0IENvc21lTGlzdCBmcm9tICcuL2NvbXBvbmVudHMvQ29zbWVMaXN0JztcblxuaW1wb3J0IEJydXNoIGZyb20gJy4vY29tcG9uZW50cy9CcnVzaCc7XG5cblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICB2YXIgY29zbWVzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNvc21lc1wiKSk7XG4gICAgICBjb25zb2xlLmxvZyhjb3NtZXMpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYnJ1c2g6IHtcbiAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgcjogMCxcbiAgICAgICAgICAgIGc6IDAsXG4gICAgICAgICAgICBiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhbHBoYTogMTAwLFxuICAgICAgICAgIHNpemU6IDUwLFxuICAgICAgICAgIGJsdXI6IDAsXG4gICAgICAgICAgdGV4dHVyZUluZGV4OiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNvc21lczogY29zbWVzLFxuICAgICAgICBpc1JlZ2lzdGVyaW5nOiBmYWxzZVxuICAgICAgfTtcbiAgICB9LFxuICAgIGNoYW5nZUJydXNoKGtleSwgcGFyYW0pIHtcbiAgICAgIHZhciBzdGF0ZSA9IF8uY2xvbmUodGhpcy5zdGF0ZSwgdHJ1ZSk7XG4gICAgICBzdGF0ZS5icnVzaFtrZXldID0gcGFyYW07XG4gICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICB9LFxuICAgIHRvZ2dsZVJlZ2lzdHJhdGlvblBhbmUoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc1JlZ2lzdGVyaW5nOiAhdGhpcy5zdGF0ZS5pc1JlZ2lzdGVyaW5nfSk7XG4gICAgfSxcbiAgICByZWdpc3Rlcihjb3NtZSkge1xuICAgICAgdmFyIGNvc21lcyA9IHRoaXMuc3RhdGUuY29zbWVzID8gdGhpcy5zdGF0ZS5jb3NtZXMgOiBbXTtcbiAgICAgIGNvc21lLmJydXNoID0gdGhpcy5zdGF0ZS5icnVzaDtcbiAgICAgIGNvc21lLmlkID0gIGNvc21lcy5sZW5ndGg7XG4gICAgICBjb3NtZXMgPSBjb3NtZXMuY29uY2F0KFtjb3NtZV0pO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29zbWVzOiBjb3NtZXN9KTtcblxuICAgICAgLy/jgajjgorjgYLjgYjjgZpsb2NhbFN0cmFnZeOBq+S/neWtmFxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjb3NtZXNcIiwgSlNPTi5zdHJpbmdpZnkoY29zbWVzKSk7XG4gICAgfSxcbiAgICBzZXRDb3NtZShjb3NtZSkge1xuICAgICAgdmFyIGJydXNoID0gXy5jbG9uZShjb3NtZS5icnVzaCk7Ly/jgZ3jga7jgb7jgb5zZXRTdGF0ZeOBmeOCi+OBqOWPgueFp+OBq+OBquOCiuWkieabtOOBp+OBjeOBpuOBl+OBvuOBhlxuICAgICAgdGhpcy5zZXRTdGF0ZSh7YnJ1c2g6IGJydXNoLCB0cnVlfSk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBicnVzaCA9IHRoaXMuc3RhdGUuYnJ1c2g7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5pc1JlZ2lzdGVyaW5nID8gKDxSZWdpc3RyYXRpb25QYW5lIGJydXNoPXt0aGlzLnN0YXRlLmJydXNofSBvblN1Ym1pdD17dGhpcy5yZWdpc3Rlcn0gY2xvc2U9e3RoaXMudG9nZ2xlUmVnaXN0cmF0aW9uUGFuZX0gLz4pIDogbnVsbH1cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibGVmdFwiPlxuICAgICAgICAgICAgICAgICAgPEJydXNoIGJydXNoPXticnVzaH0gY29udGVudD17bnVsbH0gcG9zaXRpb249XCJjZW50ZXIgY2VudGVyXCIvPlxuICAgICAgICAgICAgICAgICAgPENvbG9yU2xpZGVycyBvbkNoYW5nZT17dGhpcy5jaGFuZ2VCcnVzaH0gY29sb3I9e2JydXNoLmNvbG9yfSB2YWx1ZXM9e2JydXNoLmNvbG9yfSAvPlxuICAgICAgICAgICAgICAgICAgPEFscGhhU2xpZGVycyBvbkNoYW5nZT17dGhpcy5jaGFuZ2VCcnVzaH0gdmFsdWU9e2JydXNoLmFscGhhfSAvPlxuICAgICAgICAgICAgICAgICAgPFNpemVTbGlkZXJzIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUJydXNofSB2YWx1ZT17YnJ1c2guc2l6ZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxCbHVyU2xpZGVycyBvbkNoYW5nZT17dGhpcy5jaGFuZ2VCcnVzaH0gc2l6ZT17YnJ1c2guc2l6ZX0gdmFsdWU9e2JydXNoLmJsdXJ9IC8+XG4gICAgICAgICAgICAgICAgICA8VGV4dHVyZUxpc3Qgb25DaGFuZ2U9e3RoaXMuY2hhbmdlQnJ1c2h9IHRleHR1cmVzPXt0ZXh0dXJlc30gc2VsZWN0ZWQ9e2JydXNoLnRleHR1cmVJbmRleH0gLz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZWdpc3RyYXRpb24tb3Blbi1idXR0b25cIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVJlZ2lzdHJhdGlvblBhbmV9ID7nmbvpjLLjgZnjgos8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8RmFjZUNhbnZhcyBicnVzaD17YnJ1c2h9IHdpZHRoPXs1MDB9IGhlaWdodD17NTAwfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyaWdodFwiPlxuICAgICAgICAgICAgICAgICAgPENvc21lTGlzdCBvbkNsaWNrQ29zbWU9e3RoaXMuc2V0Q29zbWV9IGNvc21lcz17dGhpcy5zdGF0ZS5jb3NtZXN9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuUmVhY3QucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmJvZHkpO1xuIiwiLy/jg4bjgq/jgrnjg4Hjg6Pjga7oqq3jgb/ovrzjgb9cbi8vMOeVquebruOBr1wi44OG44Kv44K544OB44Oj54Sh44GXXCJcbnZhciB0ZXh0dXJlcyA9IFt7aWQ6MH1dO1xuZm9yKHZhciBpPTE7IGk8NjsgaSsrKXtcbiAgdGV4dHVyZXNbaV0gPSB7aWQgOiBpfTtcbiAgdGV4dHVyZXNbaV0uaW1nID0gbmV3IEltYWdlKCk7XG4gIHRleHR1cmVzW2ldLmltZy5zcmMgPSBcImltZy90ZXh0dXJlL1wiICsgaSArIFwiLnBuZ1wiO1xuICBjb25zb2xlLmxvZyh0ZXh0dXJlc1tpXSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRleHR1cmVzO1xuIiwidmFyIEFscGhhU2xpZGVycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBvbkNoYW5nZSgpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoXCJhbHBoYVwiLCB0aGlzLnJlZnMuc2xpZGVyLmdldFZhbHVlKCkpO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlcnNcIiBpZD1cInNsaWRlcnMtYWxwaGFcIj5cbiAgICAgICAgICAgIDxSZWFjdFNsaWRlciByZWY9XCJzbGlkZXJcIiBtaW49ezEwfSBtYXg9ezEwMH0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IGRlZmF1bHRWYWx1ZT17MTAwfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQWxwaGFTbGlkZXJzO1xuIiwidmFyIEJsdXJTbGlkZXJzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG9uQ2hhbmdlKCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcImJsdXJcIiwgdGhpcy5yZWZzLnNsaWRlci5nZXRWYWx1ZSgpKTtcbiAgICB9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXJzXCIgaWQ9XCJzbGlkZXJzLWJsdXJcIj5cbiAgICAgICAgICAgIDxSZWFjdFNsaWRlciByZWY9XCJzbGlkZXJcIiBtaW49ezB9IG1heD17TWF0aC5mbG9vcih0aGlzLnByb3BzLnNpemUvMil9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBkZWZhdWx0VmFsdWU9ezB9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCbHVyU2xpZGVycztcbiIsInZhciBCcnVzaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXIoKSB7XG4gICAgICB2YXIgYnJ1c2ggPSB0aGlzLnByb3BzLmJydXNoO1xuICAgICAgdmFyIGNscnN0ciA9IFticnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKTtcbiAgICAgIHZhciB0ZXh0dXJlU3R5bGUgPSBicnVzaC50ZXh0dXJlSW5kZXggPiAwID8gJ3VybCgvaW1nL3RleHR1cmUvJyArIGJydXNoLnRleHR1cmVJbmRleFxuICAgICAgICAgICsgJy5wbmcpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIC8nXG4gICAgICAgICAgKyAoYnJ1c2guc2l6ZSArIGJydXNoLmJsdXIpICsgJ3B4ICcgKyAoYnJ1c2guc2l6ZSArIGJydXNoLmJsdXIpXG4gICAgICAgICAgKyAncHgsICcgOiBcIlwiO1xuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICAgICAgb3BhY2l0eTogYnJ1c2guYWxwaGEvMTAwLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogdGV4dHVyZVN0eWxlICsgJy13ZWJraXQtZ3JhZGllbnQocmFkaWFsLCBjZW50ZXIgY2VudGVyLCAnXG4gICAgICAgICAgICArIChicnVzaC5zaXplLzIgLSBicnVzaC5ibHVyIC0gMSApIC8vc3RhcnTjgahlbmTjgYzlkIzjgZjjgaDjgajooajnpLrjgZXjgozjgarjgYRcbiAgICAgICAgICAgICsgJywgY2VudGVyIGNlbnRlciwgJyArIChicnVzaC5zaXplLzIgKyBicnVzaC5ibHVyKVxuICAgICAgICAgICAgKyAnLCBmcm9tKHJnYmEoJyArIGNscnN0ciArICcsMSkpLCB0byhyZ2JhKCcgKyBjbHJzdHIgKyAnLDApKSknXG4gICAgICAgICAgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgaWQ9XCJicnVzaC1zYW1wbGVcIiBzdHlsZT17c3R5bGV9PjwvZGl2PlxuICAgICAgKVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBCcnVzaDtcbiIsInZhciBDb2xvclNsaWRlcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgb25DaGFuZ2UoKSB7XG4gICAgICAgIHZhciBwYXJhbSA9IHtcbiAgICAgICAgICAgIHI6IHRoaXMucmVmcy5yLmdldFZhbHVlKCksXG4gICAgICAgICAgICBnOiB0aGlzLnJlZnMuZy5nZXRWYWx1ZSgpLFxuICAgICAgICAgICAgYjogdGhpcy5yZWZzLmIuZ2V0VmFsdWUoKSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKFwiY29sb3JcIiwgcGFyYW0pO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgYmFja0NvbG9ycyA9IHtcbiAgICAgICAgICAgIHI6IHtcbiAgICAgICAgICAgICAgICBzdGFydDogcmdiVG9IZXgoMCwgdGhpcy5wcm9wcy5jb2xvci5nLCB0aGlzLnByb3BzLmNvbG9yLmIpLFxuICAgICAgICAgICAgICAgIGVuZDogcmdiVG9IZXgoMjU1LCB0aGlzLnByb3BzLmNvbG9yLmcsIHRoaXMucHJvcHMuY29sb3IuYilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHJnYlRvSGV4KHRoaXMucHJvcHMuY29sb3IuciwgMCwgdGhpcy5wcm9wcy5jb2xvci5iKSxcbiAgICAgICAgICAgICAgICBlbmQ6IHJnYlRvSGV4KHRoaXMucHJvcHMuY29sb3IuciwgMjU1LCB0aGlzLnByb3BzLmNvbG9yLmIpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiByZ2JUb0hleCh0aGlzLnByb3BzLmNvbG9yLnIsIHRoaXMucHJvcHMuY29sb3IuZywgMCksXG4gICAgICAgICAgICAgICAgZW5kOiByZ2JUb0hleCh0aGlzLnByb3BzLmNvbG9yLnIsIHRoaXMucHJvcHMuY29sb3IuZywgMjU1KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBzdHlsZSA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhiYWNrQ29sb3JzKS5mb3JFYWNoKGZ1bmN0aW9uKGMpe1xuICAgICAgICAgIHN0eWxlW2NdID0ge1xuICAgICAgICAgICAgLy9iYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KGxlZnQsICcgKyBiYWNrQ29sb3JzLnIuc3RhcnQgKyAnLCAnICsgYmFja0NvbG9ycy5yLmVuZCArICcpJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICctd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIHJpZ2h0IHRvcCwgZnJvbSgnICsgYmFja0NvbG9yc1tjXS5zdGFydCArICcpLCB0bygnICsgYmFja0NvbG9yc1tjXS5lbmQgKyAnKSknLFxuICAgICAgICAgICAgLy9iYWNrZ3JvdW5kOiAnLW1vei1saW5lYXItZ3JhZGllbnQobGVmdCwgJyArIGJhY2tDb2xvcnMuci5zdGFydCArICcsJyArIGJhY2tDb2xvcnMuci5lbmQgKyAnKSdcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXJzXCIgaWQ9XCJzbGlkZXJzLWNvbG9yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInNsaWRlcnMtY29sb3ItclwiIHN0eWxlPXtzdHlsZS5yfSA+XG4gICAgICAgICAgICAgICAgICAgIDxSZWFjdFNsaWRlciByZWY9XCJyXCIgbWluPXswfSBtYXg9ezI1NX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlcy5yfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzbGlkZXJzLWNvbG9yLWdcIiBzdHlsZT17c3R5bGUuZ30gPlxuICAgICAgICAgICAgICAgICAgICA8UmVhY3RTbGlkZXIgcmVmPVwiZ1wiIG1pbj17MH0gbWF4PXsyNTV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZXMuZ30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic2xpZGVycy1jb2xvci1iXCIgc3R5bGU9e3N0eWxlLmJ9ID5cbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0U2xpZGVyIHJlZj1cImJcIiBtaW49ezB9IG1heD17MjU1fSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0gdmFsdWU9e3RoaXMucHJvcHMudmFsdWVzLmJ9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sb3JTbGlkZXJzO1xuIiwidmFyIENvc21lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGlja0Nvc21lKHRoaXMucHJvcHMuY29zbWUpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvc21lID0gdGhpcy5wcm9wcy5jb3NtZTtcbiAgICAgICAgdmFyIGNscnN0ciA9IFtjb3NtZS5icnVzaC5jb2xvci5yLCBjb3NtZS5icnVzaC5jb2xvci5nLCBjb3NtZS5icnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKTtcbiAgICAgICAgdmFyIHRleHR1cmVTdHlsZSA9IGNvc21lLmJydXNoLnRleHR1cmVJbmRleCA+IDAgPyAndXJsKC9pbWcvdGV4dHVyZS8nICsgY29zbWUuYnJ1c2gudGV4dHVyZUluZGV4XG4gICAgICAgICAgICArICcucG5nKSBuby1yZXBlYXQgJyArICg0MCAtIChjb3NtZS5icnVzaC5zaXplICsgY29zbWUuYnJ1c2guYmx1cikvMikgKyAncHggY2VudGVyIC8nXG4gICAgICAgICAgICArIChjb3NtZS5icnVzaC5zaXplICsgY29zbWUuYnJ1c2guYmx1cikgKyAncHggJyArIChjb3NtZS5icnVzaC5zaXplICsgY29zbWUuYnJ1c2guYmx1cilcbiAgICAgICAgICAgICsgJ3B4LCAnIDogXCJcIjtcbiAgICAgICAgdmFyIGltYWdlU3R5bGUgPSBjb3NtZS5pbWdVcmwgPyAnLCB1cmwoJyArIGNvc21lLmltZ1VybCArICcpIG5vLXJlcGVhdCBjZW50ZXIgcmlnaHQgLyBjb250YWluJyA6ICcnXG4gICAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0ZXh0dXJlU3R5bGUgKyAnLXdlYmtpdC1ncmFkaWVudChyYWRpYWwsIDQwIGNlbnRlciwgJ1xuICAgICAgICAgICAgICAgICAgKyAoY29zbWUuYnJ1c2guc2l6ZS8yIC0gY29zbWUuYnJ1c2guYmx1ciAtIDEgKSAvL3N0YXJ044GoZW5k44GM5ZCM44GY44Gg44Go6KGo56S644GV44KM44Gq44GEXG4gICAgICAgICAgICAgICAgICArICcsIDQwIGNlbnRlciwgJyArIChjb3NtZS5icnVzaC5zaXplLzIgKyBjb3NtZS5icnVzaC5ibHVyKVxuICAgICAgICAgICAgICAgICAgKyAnLCBmcm9tKHJnYmEoJyArIGNscnN0ciArICcsMSkpLCB0byhyZ2JhKCcgKyBjbHJzdHIgKyAnLDApKSknICsgaW1hZ2VTdHlsZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiY29zbWVcIiBvbkNsaWNrPXt0aGlzLm9uQ2xpY2t9IHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgICA8cD57Y29zbWUubmFtZX08YnIgLz5cbiAgICAgICAgICAgIHtjb3NtZS5jb2xvck5hbWV9PGJyIC8+XG4gICAgICAgICAgICAve2Nvc21lLmJyYW5kfTwvcD5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDb3NtZTtcbiIsImltcG9ydCBDb3NtZSBmcm9tICcuL0Nvc21lJztcblxudmFyIENvc21lTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighdGhpcy5wcm9wcy5jb3NtZXMpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJvd3MgPSB0aGlzLnByb3BzLmNvc21lcy5tYXAoKGZ1bmN0aW9uKGNvc21lKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxDb3NtZSBvbkNsaWNrQ29zbWU9e3RoaXMucHJvcHMub25DbGlja0Nvc21lfSBrZXk9e2Nvc21lLmlkfSBjb3NtZT17Y29zbWV9IC8+KTtcbiAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgaWQ9XCJjb3NtZS1saXN0XCI+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29zbWVMaXN0O1xuIiwiaW1wb3J0IHRleHR1cmVzIGZyb20gJy4uL2NvbW1vbi90ZXh0dXJlcy5qcyc7XG5cbnZhciBjYW52YXMgPSB7fSwgY3R4ID0ge307XG5cbnZhciBGYWNlQ2FudmFzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZSgpe1xuICAgICAgcmV0dXJuIHtwb2ludHM6W10sIG1vdXNlZG93bjpmYWxzZSwgbGVuZ3RoOiAwfTtcbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICBjYW52YXMgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY2FudmFzKSxcbiAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfSxcbiAgICBvbk1vdXNlRG93bigpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlZG93bjogdHJ1ZX0pO1xuICAgIH0sXG4gICAgb25Nb3VzZVVwKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7bW91c2Vkb3duOiBmYWxzZX0pO1xuICAgIH0sXG4gICAgb25Nb3VzZU1vdmUoZSkge1xuICAgICAgaWYodGhpcy5zdGF0ZS5tb3VzZWRvd24pe1xuICAgICAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICB4ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgIHkgPSBlLmNsaWVudFkgLSByZWN0LnRvcCxcblxuICAgICAgICAgIC8v5o+P55S744Od44Kk44Oz44OI6YWN5YiX44GM44Ki44Oz44OJ44Kl44GV44KM44Gm44GE44Gf44KJ44CB44Gd44KM5Lul6ZmN44KS5raI5Y6744GX44CB5paw44GX44GE44Od44Kk44Oz44OI44KS44Gk44Gq44GS44KLXG4gICAgICAgICAgcG9pbnRzID0gdGhpcy5zdGF0ZS5wb2ludHMubGVuZ3RoID4gdGhpcy5zdGF0ZS5sZW5ndGggPyB0aGlzLnN0YXRlLnBvaW50cy5zbGljZSgwLCB0aGlzLnN0YXRlLmxlbmd0aCkuY29uY2F0KFtbeCwgeV1dKSA6IHRoaXMuc3RhdGUucG9pbnRzLmNvbmNhdChbW3gsIHldXSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cG9pbnRzOiBwb2ludHMsXG4gICAgICAgICAgICAgICAgICAgICAgIG1vdXNlZG93bjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiB0aGlzLnN0YXRlLmxlbmd0aCArIDFcbiAgICAgICAgICAgICAgICAgICAgICB9KTsvL+W6p+aomemFjeWIl+OBq+i/veWKoOOBl+OBpuOCu+ODg+ODiFxuICAgICAgfVxuICAgIH0sXG4gICAgLy9jbGVhcigpIHtcbiAgICAvLyAgdGhpcy5zZXRTdGF0ZSh7cG9pbnRzOltdLCBtb3VzZWRvd246IGZhbHNlLCBsZW5ndGg6IDB9KTtcbiAgICAvL30sXG4gICAgcGFpbnQoKSB7XG4gICAgICBpZighKFwiZmlsbFN0eWxlXCIgaW4gY3R4KSB8IHRoaXMuc3RhdGUucG9pbnRzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvL+WIneacn+WMluaZguOBr3BhaW5044GX44Gq44GEXG4gICAgICB9XG4gICAgICB2YXIgYnJ1c2ggPSB0aGlzLnByb3BzLmJydXNoLFxuICAgICAgICAgIHBvaW50cyA9IHRoaXMuc3RhdGUucG9pbnRzLFxuICAgICAgICAgIGwgPSB0aGlzLnN0YXRlLmxlbmd0aDtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTsvL2NhbnZhc+OBruODquOCu+ODg+ODiOOBr+OBp+OBjeOCjOOBsOacgOWwj+mZkOOBq+OBl+OBn+OBu+OBhuOBjOOBhOOBhFxuICAgICAgaWYoYnJ1c2guYmx1ciE9MCl7Ly/jgbzjgYvjgZfjga9yYWRpYWxHcmFkaWVudOOCkuS9v+OBhlxuICAgICAgICBmb3IodmFyIGk9MDsgaTxsOyBpKyspe1xuICAgICAgICAgIHZhciBwID0gcG9pbnRzW2ldLFxuICAgICAgICAgICAgZ3JhZCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChwWzBdLCBwWzFdLCAxMCwgcFswXSwgcFsxXSwgYnJ1c2guc2l6ZS8yK2JydXNoLmJsdXIpO1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkO1xuICAgICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKChicnVzaC5zaXplLWJydXNoLmJsdXIpLyhicnVzaC5zaXplK2JydXNoLmJsdXIpLCBcInJnYmEoXCIgKyBbYnJ1c2guY29sb3IuciwgYnJ1c2guY29sb3IuZywgYnJ1c2guY29sb3IuYl0uam9pbihcIixcIikgKyBcIiwgMC4xKVwiKTsvL+epjeWxpOOBmeOCi+OBruOBpzAuMeOBj+OCieOBhOOBp+OBoeOCh+OBhuOBqeOBhOOBhFxuICAgICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDEsIFwicmdiYShcIiArIFticnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKSArIFwiLCAwKVwiKTtcbiAgICAgICAgICBjdHguZmlsbFJlY3QocFswXS1icnVzaC5zaXplLzItYnJ1c2guYmx1ciwgcFsxXS1icnVzaC5zaXplLzItYnJ1c2guYmx1ciwgYnJ1c2guc2l6ZSticnVzaC5ibHVyKjIsIGJydXNoLnNpemUrYnJ1c2guYmx1cioyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYShcIiArIFticnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKSArIFwiLCAwLjEpXCI7XG4gICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gcmdiVG9IZXgoYnJ1c2guY29sb3IuciwgYnJ1c2guY29sb3IuZywgYnJ1c2guY29sb3IuYik7XG4gICAgICAgIC8vY3R4LmxpbmVXaWR0aCA9IGJydXNoLnNpemU7XG4gICAgICAgIC8vY3R4LmFyYyhwYVswXVswXSwgcGFbMF1bMV0sIGJydXNoLnNpemUvMiwgMCwgTWF0aC5QSSoyLCBmYWxzZSk7XG4gICAgICAgIC8vY3R4LmZpbGwoKTtcbiAgICAgICAgZm9yKHZhciBpPTE7IGk8bDsgaSsrKXtcbiAgICAgICAgICB2YXIgcCA9IHBvaW50c1tpXTtcbiAgICAgICAgICAvLyAgICBwcCA9IHBhW2ktMV07XG4gICAgICAgICAgLy9jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgLy9jdHgubW92ZVRvKHBwWzBdLCBwcFsxXSk7XG4gICAgICAgICAgLy9jdHgubGluZVRvKHBbMF0sIHBbMV0pO1xuICAgICAgICAgIC8vY3R4LnN0cm9rZSgpO1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHguYXJjKHBbMF0sIHBbMV0sIGJydXNoLnNpemUvMiwgMCwgTWF0aC5QSSoyLCBmYWxzZSk7XG4gICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAvL2N0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy/jg4bjgq/jgrnjg4Hjg6Pjga7mj4/nlLtcbiAgICAgIGZvcih2YXIgaT0xOyBpPGw7IGkrPTE1KXtcbiAgICAgICAgdmFyIHAgPSBwb2ludHNbaV07XG4gICAgICAgIGlmKHRleHR1cmVzW2JydXNoLnRleHR1cmVJbmRleF0uaW1nKXtcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKHRleHR1cmVzW2JydXNoLnRleHR1cmVJbmRleF0uaW1nLCBwWzBdLShicnVzaC5zaXplK2JydXNoLmJsdXIpLzIsIHBbMV0tKGJydXNoLnNpemUrYnJ1c2guYmx1cikvMiwgYnJ1c2guc2l6ZSticnVzaC5ibHVyLCBicnVzaC5zaXplK2JydXNoLmJsdXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB1bmRvQ2hhbmdlKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7bGVuZ3RoOiB0aGlzLnJlZnMudW5kby5nZXRWYWx1ZSgpfSk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICB0aGlzLnBhaW50KCk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGlkPVwiZmFjZS1jb250YWluZXJcIj5cbiAgICAgICAgICA8Y2FudmFzIGlkPVwiZmFjZVwiIHJlZj1cImNhbnZhc1wiIHdpZHRoPXt0aGlzLnByb3BzLndpZHRofSBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxuICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMub25Nb3VzZURvd259IG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlfSBvbk1vdXNlVXA9e3RoaXMub25Nb3VzZVVwfVxuICAgICAgICAgICAgc3R5bGU9e3tvcGFjaXR5OiB0aGlzLnByb3BzLmJydXNoLmFscGhhLzEwMH19Lz5cbiAgICAgICAgICA8ZGl2IGlkPVwiZmFjZS1pbWdcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlcnNcIiBpZD1cInNsaWRlcnMtdW5kb1wiPlxuICAgICAgICAgICAgPFJlYWN0U2xpZGVyIHJlZj1cInVuZG9cIiBtaW49ezB9IG1heD17dGhpcy5zdGF0ZS5wb2ludHMubGVuZ3RofSBkZWZhdWx0VmFsdWU9ezB9IHZhbHVlPXt0aGlzLnN0YXRlLmxlbmd0aH0gb25DaGFuZ2U9e3RoaXMudW5kb0NoYW5nZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBGYWNlQ2FudmFzO1xuIiwidmFyIFJlZ2lzdHJhdGlvblBhbmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNEcmFnZ2luZ092ZXI6IGZhbHNlLFxuICAgICAgICAgICAgaW1nVXJsOiBudWxsXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBoYW5kbGVTdWJtaXQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25TdWJtaXQoe1xuICAgICAgICAgICAgbmFtZTogdGhpcy5yZWZzLmNvc21lTmFtZS5nZXRET01Ob2RlKCkudmFsdWUsXG4gICAgICAgICAgICBjb2xvck5hbWU6IHRoaXMucmVmcy5jb3NtZUNvbG9yTmFtZS5nZXRET01Ob2RlKCkudmFsdWUsXG4gICAgICAgICAgICBicmFuZDogdGhpcy5yZWZzLmNvc21lQmxhbmQuZ2V0RE9NTm9kZSgpLnZhbHVlLFxuICAgICAgICAgICAgaW1nVXJsOiB0aGlzLnN0YXRlLmltZ1VybFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZSgpO1xuICAgIH0sXG4gICAgb25EcmFnT3ZlcihlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRHJhZ2dpbmdPdmVyOiB0cnVlfSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIG9uRHJhZ0xlYXZlKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNEcmFnZ2luZ092ZXI6IGZhbHNlfSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIG9uRHJvcChlKSB7XG4gICAgICAgIHZhciBpbWdVcmwgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidXJsXCIpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbWdVcmw6IGltZ1VybCwgaXNEcmFnZ2luZ092ZXI6IGZhbHNlfSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGJydXNoID0gdGhpcy5wcm9wcy5icnVzaDtcbiAgICAgICAgdmFyIGNscnN0ciA9IFticnVzaC5jb2xvci5yLCBicnVzaC5jb2xvci5nLCBicnVzaC5jb2xvci5iXS5qb2luKFwiLFwiKTtcbiAgICAgICAgdmFyIHRleHR1cmVTdHlsZSA9IGJydXNoLnRleHR1cmVJbmRleCA+IDAgPyAndXJsKC9pbWcvdGV4dHVyZS8nICsgYnJ1c2gudGV4dHVyZUluZGV4XG4gICAgICAgICAgICArICcucG5nKSBuby1yZXBlYXQgJyArICg0MCAtIChicnVzaC5zaXplICsgYnJ1c2guYmx1cikvMikgKyAncHggY2VudGVyIC8nXG4gICAgICAgICAgICArIChicnVzaC5zaXplICsgYnJ1c2guYmx1cikgKyAncHggJyArIChicnVzaC5zaXplICsgYnJ1c2guYmx1cilcbiAgICAgICAgICAgICsgJ3B4LCAnIDogXCJcIjtcbiAgICAgICAgdmFyIGltYWdlU3R5bGUgPSB0aGlzLnN0YXRlLmltZ1VybCA/ICcsIHVybCgnICsgdGhpcy5zdGF0ZS5pbWdVcmwgKyAnKSBuby1yZXBlYXQgY2VudGVyIHJpZ2h0IC8gY29udGFpbicgOiAnJ1xuICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGV4dHVyZVN0eWxlICsgJyNGRkYgLXdlYmtpdC1ncmFkaWVudChyYWRpYWwsIDQwIGNlbnRlciwgJ1xuICAgICAgICAgICAgICAgICAgKyAoYnJ1c2guc2l6ZS8yIC0gYnJ1c2guYmx1ciAtIDEgKSAvL3N0YXJ044GoZW5k44GM5ZCM44GY44Gg44Go6KGo56S644GV44KM44Gq44GEXG4gICAgICAgICAgICAgICAgICArICcsIDQwIGNlbnRlciwgJyArIChicnVzaC5zaXplLzIgKyBicnVzaC5ibHVyKVxuICAgICAgICAgICAgICAgICAgKyAnLCBmcm9tKHJnYmEoJyArIGNscnN0ciArICcsMSkpLCB0byhyZ2JhKCcgKyBjbHJzdHIgKyAnLDApKSknICsgaW1hZ2VTdHlsZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGlkPVwicmVnaXN0cmF0aW9uLXBhbmVcIiBvbkRyYWdMZWF2ZT17dGhpcy5vbkRyYWdMZWF2ZX0gb25Ecm9wPXt0aGlzLm9uRHJvcH0gb25EcmFnT3Zlcj17dGhpcy5vbkRyYWdPdmVyfSBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaXNEcmFnZ2luZ092ZXIgPyBcImRyYWdnaW5nLW92ZXJcIiA6IFwibm90LWRyYWdnaW5nLW92ZXJcIn0+XG4gICAgICAgICAgICA8ZGl2IGlkPVwicmVnaXN0cmF0aW9uLWNvbnRhaW5lclwiIHN0eWxlPXtzdHlsZX0gb25Ecm9wPXt0aGlzLm9uRHJvcEltYWdlfSA+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cImNvc21lTmFtZVwiIHBsYWNlaG9sZGVyPVwi5ZWG5ZOB5ZCN44KS5YWl5YqbXCI+PC9pbnB1dD5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPVwiY29zbWVDb2xvck5hbWVcIiBwbGFjZWhvbGRlcj1cIuiJsuWQjeOCkuWFpeWKm1wiPjwvaW5wdXQ+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cImNvc21lQmxhbmRcIiBwbGFjZWhvbGRlcj1cIuODluODqeODs+ODieWQjeOCkuWFpeWKm1wiPjwvaW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZWdpc3RyYXRpb24tb2stYnV0dG9uXCIgb25DbGljaz17dGhpcy5oYW5kbGVTdWJtaXR9Pk9LPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwicmVnaXN0cmF0aW9uLW9rLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMuY2xvc2V9PuOCreODo+ODs+OCu+ODqzwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBSZWdpc3RyYXRpb25QYW5lO1xuIiwidmFyIFNpemVTbGlkZXJzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG9uQ2hhbmdlKCkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcInNpemVcIiwgdGhpcy5yZWZzLnNsaWRlci5nZXRWYWx1ZSgpKTtcbiAgICB9LFxuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXJzXCIgaWQ9XCJzbGlkZXJzLXNpemVcIj5cbiAgICAgICAgICAgIDxSZWFjdFNsaWRlciByZWY9XCJzbGlkZXJcIiBtaW49ezF9IG1heD17MTAwfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0gZGVmYXVsdFZhbHVlPXs1MH0gdmFsdWU9e3RoaXMucHJvcHMudmFsdWV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFNpemVTbGlkZXJzO1xuIiwidmFyIFRleHR1cmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgb25DbGljaygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrVGV4dHVyZShcInRleHR1cmVJbmRleFwiLCB0aGlzLnByb3BzLnRleHR1cmUuaWQpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHR1cmUgPSB0aGlzLnByb3BzLnRleHR1cmU7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLnByb3BzLmlzU2VsZWN0ZWQgPyBcInRleHR1cmUgc2VsZWN0ZWRcIiA6IFwidGV4dHVyZVwiO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gb25DbGljaz17dGhpcy5vbkNsaWNrfSBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0ZXh0dXJlLmlkID4gMCA/ICd1cmwoL2ltZy90ZXh0dXJlLycgKyB0ZXh0dXJlLmlkICsgJy5wbmcpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIC8gY29udGFpbiwgIzMzMycgOiAnIzMzMydcbiAgICAgICAgICAgIH19PjwvbGk+XG4gICAgICAgIClcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVGV4dHVyZTtcbiIsImltcG9ydCBUZXh0dXJlIGZyb20gJy4vVGV4dHVyZSc7XG5cbnZhciBUZXh0dXJlTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJvd3MgPSB0aGlzLnByb3BzLnRleHR1cmVzLm1hcCgoZnVuY3Rpb24odGV4dHVyZSkge1xuICAgICAgICByZXR1cm4gKDxUZXh0dXJlIGlzU2VsZWN0ZWQ9e3RoaXMucHJvcHMuc2VsZWN0ZWQgPT09IHRleHR1cmUuaWR9IG9uQ2xpY2tUZXh0dXJlPXt0aGlzLnByb3BzLm9uQ2hhbmdlfSBrZXk9e3RleHR1cmUuaWR9IHRleHR1cmU9e3RleHR1cmV9IC8+KTtcbiAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBpZD1cInRleHR1cmUtbGlzdFwiPlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVGV4dHVyZUxpc3Q7XG4iXX0=
