"use strict";

var SizeSliders = React.createClass({
  displayName: "SizeSliders",

  onChange: function onChange() {
    this.props.onChange("size", this.refs.slider.getValue());
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "sliders", id: "sliders-size" },
      React.createElement(ReactSlider, { ref: "slider", min: 1, max: 100, onChange: this.onChange, defaultValue: 50 })
    );
  }
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
      React.createElement(ReactSlider, { ref: "slider", min: 0, max: Math.floor(this.props.size / 2), onAfterChange: this.onChange, defaultValue: 0 })
    );
  }
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
      React.createElement(ReactSlider, { ref: "slider", min: 10, max: 100, onChange: this.onChange, defaultValue: 100 })
    );
  }
});

var ColorSliders = React.createClass({
  displayName: "ColorSliders",

  onChange: function onChange() {
    var param = {
      r: this.refs.r.getValue(),
      g: this.refs.g.getValue(),
      b: this.refs.b.getValue() };
    this.props.onChange("color", param);
  },
  render: function render() {
    var backColors = {
      r: {
        start: rgbToHex(0, this.props.color.g, this.props.color.b),
        end: rgbToHex(255, this.props.color.g, this.props.color.b)
      },
      g: {
        start: rgbToHex(this.props.color.g, 0, this.props.color.b),
        end: rgbToHex(this.props.color.g, 255, this.props.color.b)
      },
      b: {
        start: rgbToHex(this.props.color.g, this.props.color.g, 0),
        end: rgbToHex(this.props.color.g, this.props.color.g, 255)
      }
    };
    return React.createElement(
      "div",
      { className: "sliders", id: "sliders-color" },
      React.createElement(
        "div",
        { id: "sliders-color-r" },
        React.createElement(ReactSlider, { ref: "r", min: 0, max: 255, onChange: this.onChange }),
        React.createElement("div", { className: "sliders-color-back", ref: "r_back", style: {
            background: "-webkit-gradient(linear, left top, right top, from(" + backColors.r.start + "), to(" + backColors.r.end + "))" } })
      ),
      React.createElement(
        "div",
        { id: "sliders-color-g" },
        React.createElement(ReactSlider, { ref: "g", min: 0, max: 255, onChange: this.onChange }),
        React.createElement("div", { className: "sliders-color-back", ref: "g_back", style: {
            background: "-webkit-gradient(linear, left top, right top, from(" + backColors.g.start + "), to(" + backColors.g.end + "))" } })
      ),
      React.createElement(
        "div",
        { id: "sliders-color-b" },
        React.createElement(ReactSlider, { ref: "b", min: 0, max: 255, onChange: this.onChange }),
        React.createElement("div", { className: "sliders-color-back", ref: "b_back", style: {
            background: "-webkit-gradient(linear, left top, right top, from(" + backColors.b.start + "), to(" + backColors.b.end + "))" } })
      )
    );
  }
});

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
  clear: function clear() {
    this.setState({ points: [], mousedown: false, length: 0 });
  },
  paint: function paint() {
    if (!("fillStyle" in ctx)) {
      return false;
    } //初期化時はpaintしない
    var brush = this.props.brush,
        pa = this.state.points,
        l = this.state.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (brush.blur != 0) {
      //ぼかしはradialGradientを使う
      for (var i = 0; i < l; i++) {
        var p = pa[i],
            grad = ctx.createRadialGradient(p[0], p[1], 10, p[0], p[1], brush.size / 2 + brush.blur);
        ctx.fillStyle = grad;
        grad.addColorStop(0, "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0.1)");
        grad.addColorStop(1, "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0)");
        ctx.fillRect(p[0] - brush.size / 2 - brush.blur, p[1] - brush.size / 2 - brush.blur, brush.size + brush.blur * 2, brush.size + brush.blur * 2);
      }
    } else {
      ctx.fillStyle = rgbToHex(brush.color.r, brush.color.g, brush.color.b);
      //ctx.strokeStyle = rgbToHex(brush.color.r, brush.color.g, brush.color.b);
      //ctx.lineWidth = brush.size;
      //ctx.arc(pa[0][0], pa[0][1], brush.size/2, 0, Math.PI*2, false);
      //ctx.fill();
      for (var i = 1; i < l; i++) {
        var p = pa[i];
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
        "button",
        { id: "face-clear-button", onClick: this.clear },
        "Clear"
      ),
      React.createElement(
        "div",
        { className: "sliders", id: "sliders-undo" },
        React.createElement(ReactSlider, { ref: "undo", min: 0, max: this.state.points.length, defaultValue: 0, value: this.state.length, onChange: this.undoChange })
      )
    );
  }
});

var RegistrationPane = React.createClass({
  displayName: "RegistrationPane",

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      name: this.refs.cosmeName.getDOMNode().value,
      colorName: this.refs.cosmeColorName.getDOMNode().value,
      brand: this.refs.cosmeBland.getDOMNode().value
    });
    this.props.close();
  },
  render: function render() {
    return React.createElement(
      "div",
      { id: "registration-pane" },
      React.createElement(
        "div",
        { id: "registration-container" },
        React.createElement(
          "form",
          { onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", ref: "cosmeName" }),
          React.createElement("input", { type: "text", ref: "cosmeColorName" }),
          React.createElement("input", { type: "text", ref: "cosmeBland" }),
          React.createElement("input", { type: "submit" })
        ),
        React.createElement(
          "span",
          { onClick: this.props.close },
          "閉じる"
        )
      )
    );
  }
});

var Cosme = React.createClass({
  displayName: "Cosme",

  render: function render() {
    var cosme = this.props.cosme;
    var content = function content() {
      return React.createElement(
        "p",
        null,
        cosme.name,
        React.createElement("br", null),
        cosme.colorName,
        React.createElement("br", null),
        "/",
        cosme.brand
      );
    };
    return React.createElement(
      "li",
      { className: "cosme" },
      React.createElement(Brush, { brush: cosme.brush, content: content(), position: "20 center" })
    );
  }
});

var CosmeList = React.createClass({
  displayName: "CosmeList",

  render: function render() {
    var rows = this.props.cosmes.map(function (cosme) {
      return React.createElement(Cosme, { key: cosme.id, cosme: cosme });
    });
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

//サンプルデータ
var cosmes = [{
  id: 0,
  brush: {
    color: {
      r: 255,
      g: 50,
      b: 100
    },
    alpha: 100,
    size: 50,
    blur: 0
  },
  name: "リップスティック",
  colorName: "1023",
  brand: "NARS"
}];

var Brush = React.createClass({
  displayName: "Brush",

  render: function render() {
    var brush = this.props.brush;
    console.log(this.props);
    var clrstr = [brush.color.r, brush.color.g, brush.color.b].join(",");
    return React.createElement(
      "div",
      { className: "brush", style: {
          //width: brush.size+brush.blur*2,
          //height: brush.size+brush.blur*2,
          //top: 150-brush.size/2-brush.blur,
          //left: 150-brush.size/2-brush.blur,
          //borderRadius: brush.size/2+brush.blur,
          //backgroundColor: rgbToHex(brush.color.r, brush.color.g, brush.color.b),
          background: "-webkit-gradient(radial, " + this.props.position + ", " + (brush.size / 2 - brush.blur - 1) //startとendが同じだと表示されない
           + ", " + this.props.position + ", " + (brush.size / 2 + brush.blur) + ", from(rgba(" + clrstr + "," + brush.alpha / 100 + ")), to(rgba(" + clrstr + ",0)))" } },
      this.props.content
    );
  }
});

var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    return {
      brush: {
        color: {
          r: 0,
          g: 0,
          b: 0
        },
        alpha: 100,
        size: 50,
        blur: 0
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
    cosme.brush = this.state.brush;
    cosme.id = this.state.cosmes.length;
    this.setState({ cosmes: this.state.cosmes.concat([cosme]) });
  },
  render: function render() {
    var brush = this.state.brush;
    return React.createElement(
      "div",
      { id: "ui" },
      this.state.isRegistering ? React.createElement(RegistrationPane, { onSubmit: this.register, close: this.toggleRegistrationPane }) : null,
      React.createElement(
        "div",
        { id: "brush-container", ref: "brush-container" },
        React.createElement(Brush, { brush: brush, content: null, position: "center center" })
      ),
      React.createElement(
        "span",
        null,
        "R:",
        brush.color.r,
        " G:",
        brush.color.g,
        " B:",
        brush.color.b,
        " Alpha:",
        brush.alpha,
        " Size:",
        brush.size,
        " Blur:",
        brush.blur
      ),
      React.createElement(ColorSliders, { onChange: this.changeBrush, color: brush.color }),
      React.createElement(AlphaSliders, { onChange: this.changeBrush }),
      React.createElement(SizeSliders, { onChange: this.changeBrush }),
      React.createElement(BlurSliders, { onChange: this.changeBrush, size: brush.size }),
      React.createElement(FaceCanvas, { brush: brush, width: 500, height: 500 }),
      React.createElement(
        "button",
        { id: "registration-open-button", onClick: this.toggleRegistrationPane },
        "登録する"
      ),
      React.createElement(CosmeList, { cosmes: this.state.cosmes })
    );
  }
});

React.render(React.createElement(App, null), document.getElementById("container"));

//background: 'linear-gradient(left, ' + backColors.r.start + ', ' + backColors.r.end + ')',

//background: '-moz-linear-gradient(left, ' + backColors.r.start + ',' + backColors.r.end + ')'

//background: 'linear-gradient(left, ' + backColors.g.start + ', ' + backColors.g.end + ')',

//background: '-moz-linear-gradient(left, ' + backColors.g.start + ',' + backColors.g.end + ')'

//background: 'linear-gradient(left, ' + backColors.b.start + ', ' + backColors.b.end + ')',

//background: '-moz-linear-gradient(left, ' + backColors.b.start + ',' + backColors.b.end + ')'