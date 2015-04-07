"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FaceCanvas = React.createClass({
  displayName: "FaceCanvas",

  getInitialState: function getInitialState() {
    return { points: [], mousedown: false, length: 0 };
  },
  componentDidMount: function componentDidMount() {
    canvas = exports.canvas = React.findDOMNode(this.refs.canvas), ctx = exports.ctx = canvas.getContext("2d");
  },
  onMouseDown: function onMouseDown() {
    this.setState({ points: this.state.points, mousedown: true, length: this.state.length });
  },
  onMouseUp: function onMouseUp() {
    this.setState({ points: this.state.points, mousedown: false, length: this.state.length });
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
    this.setState({ points: this.state.points, mousedown: this.state.mousedown, length: this.refs.undo.getValue() });
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

exports["default"] = FaceCanvas;
var canvas = {},
    ctx = {};
exports.canvas = canvas;
exports.ctx = ctx;