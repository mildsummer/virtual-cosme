//React.render(
//    <h1>Hello, world!</h1>,
//    document.getElementById('example')
//);
//
//var Hello = React.createClass({
//    render() {
//        return (
//            <div className="container">Hello {this.props.name}</div>
//        );
//    }
//})
//
//React.render(<Hello name="React" />, document.getElementById("example"));
//
//var Counter = React.createClass({
//    getInitialState() {
//        return {
//            count: 0
//        };
//    },
//    onClick() {
//        this.setState({count: this.state.count + 1});
//    },
//    render() {
//        return (
//            <div>
//                <div>count:{this.state.count}</div>
//                <button onClick={this.onClick}>click!</button>
//            </div>
//        );
//    }
//});
//
//React.render(<Counter />, document.getElementById("example"));

var rgbToHex = function(r, g, b) {
  return '#' + (function(n) {
        return new Array(7 - n.length).join('0') + n;
    })((r << 16 | g << 8 | b).toString(16));
};

var SizeSliders = React.createClass({
    onChange() {
      this.props.onChange("size", this.refs.slider.getValue());
    },
    render() {
      return (
          <div className="sliders" id="sliders-size">
            <ReactSlider ref="slider" min={1} max={100} onChange={this.onChange} defaultValue={50} />
          </div>
        );
    }
});

var BlurSliders = React.createClass({
    onChange() {
      this.props.onChange("blur", this.refs.slider.getValue());
      console.log("blur-changed");
    },
    render() {
      return (
          <div className="sliders" id="sliders-blur">
            <ReactSlider ref="slider" min={0} max={Math.floor(this.props.size/2)} onAfterChange={this.onChange} defaultValue={0} />
          </div>
        );
    }
});

var AlphaSliders = React.createClass({
    onChange() {
      this.props.onChange("alpha", this.refs.slider.getValue());
    },
    render() {
      return (
          <div className="sliders" id="sliders-alpha">
            <ReactSlider ref="slider" min={10} max={100} onChange={this.onChange} defaultValue={100} />
          </div>
        );
    }
});

var ColorSliders = React.createClass({
    onChange() {
        var param = {
            r: this.refs.r.getValue(),
            g: this.refs.g.getValue(),
            b: this.refs.b.getValue(),
        }
        this.props.onChange("color", param);
    },
    render() {
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
        }
        return (
            <div className="sliders" id="sliders-color">
                <div id="sliders-color-r">
                    <ReactSlider ref="r" min={0} max={255} onChange={this.onChange} />
                    <div className="sliders-color-back" ref="r_back" style={
                        {
                          //background: 'linear-gradient(left, ' + backColors.r.start + ', ' + backColors.r.end + ')',
                          background: '-webkit-gradient(linear, left top, right top, from(' + backColors.r.start + '), to(' + backColors.r.end + '))',
                          //background: '-moz-linear-gradient(left, ' + backColors.r.start + ',' + backColors.r.end + ')'
                        }
                      }>
                    </div>
                </div>
                <div id="sliders-color-g">
                    <ReactSlider ref="g" min={0} max={255} onChange={this.onChange} />
                    <div className="sliders-color-back" ref="g_back" style={
                        {
                          //background: 'linear-gradient(left, ' + backColors.g.start + ', ' + backColors.g.end + ')',
                          background: '-webkit-gradient(linear, left top, right top, from(' + backColors.g.start + '), to(' + backColors.g.end + '))',
                          //background: '-moz-linear-gradient(left, ' + backColors.g.start + ',' + backColors.g.end + ')'
                        }
                      }>
                    </div>
                </div>
                <div id="sliders-color-b">
                    <ReactSlider ref="b" min={0} max={255} onChange={this.onChange} />
                    <div className="sliders-color-back" ref="b_back" style={
                        {
                          //background: 'linear-gradient(left, ' + backColors.b.start + ', ' + backColors.b.end + ')',
                          background: '-webkit-gradient(linear, left top, right top, from(' + backColors.b.start + '), to(' + backColors.b.end + '))',
                          //background: '-moz-linear-gradient(left, ' + backColors.b.start + ',' + backColors.b.end + ')'
                        }
                      }>
                    </div>
                </div>
            </div>
        );
    }
});


var canvas = {}, ctx = {};

var FaceCanvas = React.createClass({
    getInitialState(){
      return {points:[]};
    },
    componentDidMount(){
      canvas = React.findDOMNode(this.refs.canvas),
      ctx = canvas.getContext("2d");
      //state = {
      //  ctx: ctx
      //}
      //this.setState(state);

      //painting
      var mousedown = false,
        that = this;
      $(canvas).mousedown(function(){
        mousedown = true;
      });
      $(canvas).mouseup(function(){
        mousedown = false;
      });
      //$(canvas).mouseout(function(){
      //  mousedown = false;
      //});
      $(canvas).mousemove(function(e){
        if(!mousedown) return false;
        var rect = canvas.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;
        that.setState({points: that.state.points.concat([[x, y]])});//座標配列に追加してセット
      });
    },
    paint() {
      if(!("fillStyle" in ctx)) return false; //初期化時はpaintしない
      var brush = this.props.brush;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = rgbToHex(brush.color.r, brush.color.g, brush.color.b);
      console.log(brush.size/2-brush.blur);
      //if(brush.blur!=0){//ぼかしはradialGradientを使う
      //  this.state.points.forEach(function(p){
      //    var grad = ctx.createRadialGradient(p[0], p[1], 10, p[0], p[1], brush.size/2+brush.blur);
      //    ctx.fillStyle = grad;
      //    grad.addColorStop(0, "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 1)");
      //    grad.addColorStop(1, "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0)");
      //    ctx.fillRect(p[0]-brush.size/2-brush.blur, p[1]-brush.size/2-brush.blur, brush.size+brush.blur*2, p[1], brush.size+brush.blur*2);
      //  });
      //} else {
        this.state.points.forEach(function(p){
          ctx.beginPath();
          ctx.arc(p[0], p[1], brush.size/2, 0, Math.PI*2, false);
          ctx.fill();
        });
      //}
    },
    clear() {
      this.setState({points:[]});
    },
    render() {
      this.paint();
      return (
        <div id="face-container">
          <canvas id="face" ref="canvas" width={this.props.width} height={this.props.height}
            style={{opacity: this.props.brush.alpha/100, webkitFilter: 'blur('+ this.props.brush.blur +'px)'}}/>
          <button id="face-clear-button" onClick={this.clear}>Clear</button>
        </div>
      );
    }
});

var App = React.createClass({
    getInitialState() {
        return {
            color: {
                r: 0,
                g: 0,
                b: 0
            },
            alpha: 100,
            size: 50,
            blur: 0
        };
    },
    onChange(key, param) {
        //間接的にstateを変更
        var state = {};
        $.extend(true, state, this.state);
        state[key] = param;
        this.setState(state);
    },
    render() {
      var clrstr = [this.state.color.r, this.state.color.g, this.state.color.b].join(",");
        return(
            <div className="ui">
                <div id="brush-container" ref="brush-container">
                  <div id="brush" style={
                    {
                      width: this.state.size+this.state.blur*2,
                      height: this.state.size+this.state.blur*2,
                      top: 150-this.state.size/2-this.state.blur,
                      left: 150-this.state.size/2-this.state.blur,
                      borderRadius: this.state.size/2+this.state.blur,
                      //backgroundColor: rgbToHex(this.state.color.r, this.state.color.g, this.state.color.b),
                      background: '-webkit-gradient(radial, center center, '
                        + (this.state.size/2 - this.state.blur - 1 ) //startとendが同じだと表示されない
                        + ', center center, ' + (this.state.size/2 + this.state.blur)
                        + ', from(rgba(' + clrstr + ',' + this.state.alpha/100
                        + ')), to(rgba(' + clrstr + ',0)))',
                    }
                  }></div>
                </div>
                <span>R:{this.state.color.r} G:{this.state.color.g} B:{this.state.color.b} Alpha:{this.state.alpha} Size:{this.state.size} Blur:{this.state.blur}</span>
                <ColorSliders onChange={this.onChange} color={this.state.color} />
                <AlphaSliders onChange={this.onChange} />
                <SizeSliders onChange={this.onChange} />
                <BlurSliders onChange={this.onChange} size={this.state.size} />
                <FaceCanvas brush={this.state} width={500} height={500} />
            </div>
        );
    }
});

React.render(<App />, $("#container").get(0));
