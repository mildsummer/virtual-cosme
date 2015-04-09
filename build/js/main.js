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
      React.createElement(ReactSlider, { ref: "slider", min: 1, max: 100, onChange: this.onChange, defaultValue: 50, value: this.props.value })
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
      React.createElement(ReactSlider, { ref: "slider", min: 0, max: Math.floor(this.props.size / 2), onChange: this.onChange, defaultValue: 0, value: this.props.value })
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
      React.createElement(ReactSlider, { ref: "slider", min: 10, max: 100, onChange: this.onChange, defaultValue: 100, value: this.props.value })
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
        background: "-webkit-gradient(linear, left top, right top, from(" + backColors[c].start + "), to(" + backColors[c].end + "))" };
    });
    return React.createElement(
      "div",
      { className: "sliders", id: "sliders-color" },
      React.createElement(
        "div",
        { id: "sliders-color-r", style: style.r },
        React.createElement(ReactSlider, { ref: "r", min: 0, max: 255, onChange: this.onChange, value: this.props.values.r })
      ),
      React.createElement(
        "div",
        { id: "sliders-color-g", style: style.g },
        React.createElement(ReactSlider, { ref: "g", min: 0, max: 255, onChange: this.onChange, value: this.props.values.g })
      ),
      React.createElement(
        "div",
        { id: "sliders-color-b", style: style.b },
        React.createElement(ReactSlider, { ref: "b", min: 0, max: 255, onChange: this.onChange, value: this.props.values.b })
      )
    );
  }
});

var Texture = React.createClass({
  displayName: "Texture",

  onClick: function onClick() {
    this.props.onClickTexture("textureIndex", this.props.texture.id);
  },
  render: function render() {
    var texture = this.props.texture;
    return React.createElement("li", { className: "texture", onClick: this.onClick, style: {
        background: texture.id > 0 ? "url(/img/texture/" + texture.id + ".png) no-repeat center center / contain, #333" : "#333"
      } });
  }
});

var TextureList = React.createClass({
  displayName: "TextureList",

  render: function render() {
    var rows = this.props.textures.map((function (texture) {
      return React.createElement(Texture, { onClickTexture: this.props.onChange, key: texture.id, texture: texture });
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

var canvas = {},
    ctx = {};

//テクスチャの読み込み
//0番目は"テクスチャ無し"
var textures = [{ id: 0 }];
for (var i = 1; i < 6; i++) {
  textures[i] = { id: i };
  textures[i].img = new Image();
  textures[i].img.src = "img/texture/" + i + ".png";
  console.log(textures[i]);
}

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
      if (textures[brush.textureIndex].img) {
        ctx.drawImage(textures[brush.textureIndex].img, p[0] - (brush.size + brush.blur) / 2, p[1] - (brush.size + brush.blur) / 2, brush.size + brush.blur, brush.size + brush.blur);
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

var RegistrationPane = React.createClass({
  displayName: "RegistrationPane",

  getInitialState: function getInitialState() {
    return {
      isDraggingOver: false,
      imgUrl: null
    };
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
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
    return React.createElement(
      "div",
      { id: "registration-pane", onDragLeave: this.onDragLeave, onDrop: this.onDrop, onDragOver: this.onDragOver, className: this.state.isDraggingOver ? "dragging-over" : "not-dragging-over" },
      React.createElement(
        "div",
        { id: "registration-container", onDrop: this.onDropImage },
        React.createElement(
          "form",
          { onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", ref: "cosmeName" }),
          React.createElement("input", { type: "text", ref: "cosmeColorName" }),
          React.createElement("input", { type: "text", ref: "cosmeBland" }),
          React.createElement("input", { type: "submit" })
        ),
        "imgUrl" in this.state ? React.createElement("img", { src: this.state.imgUrl }) : null,
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

  onClick: function onClick() {
    this.props.onClickCosme(this.props.cosme);
  },
  render: function render() {
    var cosme = this.props.cosme;
    var clrstr = [cosme.brush.color.r, cosme.brush.color.g, cosme.brush.color.b].join(",");
    var textureStyle = cosme.brush.textureIndex > 0 ? "url(/img/texture/" + cosme.brush.textureIndex + ".png) no-repeat " + (20 - (cosme.brush.size + cosme.brush.blur) / 2) + "px center /" + (cosme.brush.size + cosme.brush.blur) + "px " + (cosme.brush.size + cosme.brush.blur) + "px, " : "";
    var imageStyle = cosme.imgUrl ? ", url(" + cosme.imgUrl + ") no-repeat center right / contain" : "";
    var style = {
      background: textureStyle + "-webkit-gradient(radial, 20 center, " + (cosme.brush.size / 2 - cosme.brush.blur - 1) //startとendが同じだと表示されない
       + ", 20 center, " + (cosme.brush.size / 2 + cosme.brush.blur) + ", from(rgba(" + clrstr + ",1)), to(rgba(" + clrstr + ",0)))" + imageStyle
    };
    return React.createElement(
      "li",
      { className: "cosme", onClick: this.onClick, style: style },
      React.createElement(
        "p",
        null,
        cosme.name,
        React.createElement("br", null),
        cosme.colorName,
        React.createElement("br", null),
        "/",
        cosme.brand
      )
    );
  }
});

var CosmeList = React.createClass({
  displayName: "CosmeList",

  render: function render() {
    if (!this.props.cosmes) {
      return false;
    } else {
      var rows = this.props.cosmes.map((function (cosme) {
        return React.createElement(Cosme, { onClickCosme: this.props.onClickCosme, key: cosme.id, cosme: cosme });
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
  brand: "NARS",
  imgUrl: "http://www.narsjapan.com/html/color/lipstick_img/main_lipstick.jpg"
}];

var Brush = React.createClass({
  displayName: "Brush",

  render: function render() {
    var brush = this.props.brush;
    var clrstr = [brush.color.r, brush.color.g, brush.color.b].join(",");
    var textureStyle = brush.textureIndex > 0 ? "url(/img/texture/" + brush.textureIndex + ".png) no-repeat center center /" + (brush.size + brush.blur) + "px " + (brush.size + brush.blur) + "px, " : "";
    var style = {
      opacity: brush.alpha / 100,
      background: textureStyle + "-webkit-gradient(radial, center center, " + (brush.size / 2 - brush.blur - 1) //startとendが同じだと表示されない
       + ", center center, " + (brush.size / 2 + brush.blur) + ", from(rgba(" + clrstr + ",1)), to(rgba(" + clrstr + ",0)))"
    };
    return React.createElement("div", { id: "brush-sample", style: style });
  }
});

var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    var cosmes = JSON.parse(localStorage.getItem("cosmes"));
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
    localStorage.setItem("cosmes", JSON.stringify(cosmes));
  },
  setCosme: function setCosme(cosme) {
    var brush = _.clone(cosme.brush); //そのままsetStateすると参照になり変更できてしまう
    this.setState({ brush: brush, "true": true });
  },
  render: function render() {
    var brush = this.state.brush;
    return React.createElement(
      "div",
      { id: "container" },
      this.state.isRegistering ? React.createElement(RegistrationPane, { onSubmit: this.register, close: this.toggleRegistrationPane }) : null,
      React.createElement(
        "div",
        { id: "left" },
        React.createElement(Brush, { brush: brush, content: null, position: "center center" }),
        React.createElement(ColorSliders, { onChange: this.changeBrush, color: brush.color, values: brush.color }),
        React.createElement(AlphaSliders, { onChange: this.changeBrush, value: brush.alpha }),
        React.createElement(SizeSliders, { onChange: this.changeBrush, value: brush.size }),
        React.createElement(BlurSliders, { onChange: this.changeBrush, size: brush.size, value: brush.blur }),
        React.createElement(TextureList, { onChange: this.changeBrush, textures: textures }),
        React.createElement(
          "button",
          { id: "registration-open-button", onClick: this.toggleRegistrationPane },
          "登録する"
        )
      ),
      React.createElement(
        "div",
        { id: "center" },
        React.createElement(FaceCanvas, { brush: brush, width: 500, height: 500 })
      ),
      React.createElement(
        "div",
        { id: "right" },
        React.createElement(CosmeList, { onClickCosme: this.setCosme, cosmes: this.state.cosmes })
      )
    );
  }
});

React.render(React.createElement(App, null), document.body);

//background: '-moz-linear-gradient(left, ' + backColors.r.start + ',' + backColors.r.end + ')'