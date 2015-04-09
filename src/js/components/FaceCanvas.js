import textures from '../common/textures.js';

var canvas = {}, ctx = {};

var FaceCanvas = React.createClass({
    getInitialState(){
      return {points:[], mousedown:false, length: 0};
    },
    componentDidMount(){
      canvas = React.findDOMNode(this.refs.canvas),
      ctx = canvas.getContext("2d");
    },
    onMouseDown() {
      this.setState({mousedown: true});
    },
    onMouseUp() {
      this.setState({mousedown: false});
    },
    onMouseMove(e) {
      if(this.state.mousedown){
        var rect = canvas.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top,

          //描画ポイント配列がアンドゥされていたら、それ以降を消去し、新しいポイントをつなげる
          points = this.state.points.length > this.state.length ? this.state.points.slice(0, this.state.length).concat([[x, y]]) : this.state.points.concat([[x, y]]);

        this.setState({points: points,
                       mousedown: true,
                       length: this.state.length + 1
                      });//座標配列に追加してセット
      }
    },
    //clear() {
    //  this.setState({points:[], mousedown: false, length: 0});
    //},
    paint() {
      if(!("fillStyle" in ctx) | this.state.points.length < 1) {
        return false; //初期化時はpaintしない
      }
      var brush = this.props.brush,
          points = this.state.points,
          l = this.state.length;
      ctx.clearRect(0, 0, canvas.width, canvas.height);//canvasのリセットはできれば最小限にしたほうがいい
      if(brush.blur!=0){//ぼかしはradialGradientを使う
        for(var i=0; i<l; i++){
          var p = points[i],
            grad = ctx.createRadialGradient(p[0], p[1], 10, p[0], p[1], brush.size/2+brush.blur);
          ctx.fillStyle = grad;
          grad.addColorStop((brush.size-brush.blur)/(brush.size+brush.blur), "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0.1)");//積層するので0.1くらいでちょうどいい
          grad.addColorStop(1, "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0)");
          ctx.fillRect(p[0]-brush.size/2-brush.blur, p[1]-brush.size/2-brush.blur, brush.size+brush.blur*2, brush.size+brush.blur*2);
        }
      } else {
        ctx.fillStyle = "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0.1)";
        //ctx.strokeStyle = rgbToHex(brush.color.r, brush.color.g, brush.color.b);
        //ctx.lineWidth = brush.size;
        //ctx.arc(pa[0][0], pa[0][1], brush.size/2, 0, Math.PI*2, false);
        //ctx.fill();
        for(var i=1; i<l; i++){
          var p = points[i];
          //    pp = pa[i-1];
          //ctx.beginPath();
          //ctx.moveTo(pp[0], pp[1]);
          //ctx.lineTo(p[0], p[1]);
          //ctx.stroke();
          ctx.beginPath();
          ctx.arc(p[0], p[1], brush.size/2, 0, Math.PI*2, false);
          ctx.fill();
          //ctx.closePath();
        };
      }

      //テクスチャの描画
      for(var i=1; i<l; i+=15){
        var p = points[i];
        if(textures[brush.textureIndex].img){
          ctx.drawImage(textures[brush.textureIndex].img, p[0]-(brush.size+brush.blur)/2, p[1]-(brush.size+brush.blur)/2, brush.size+brush.blur, brush.size+brush.blur);
        }
      }
    },
    undoChange() {
      this.setState({length: this.refs.undo.getValue()});
    },
    render() {
      this.paint();
      return (
        <div id="face-container">
          <canvas id="face" ref="canvas" width={this.props.width} height={this.props.height}
            onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}
            style={{opacity: this.props.brush.alpha/100}}/>
          <div id="face-img"></div>
          <div className="sliders" id="sliders-undo">
            <ReactSlider ref="undo" min={0} max={this.state.points.length} defaultValue={0} value={this.state.length} onChange={this.undoChange} />
          </div>
        </div>
      );
    }
});

export default FaceCanvas;
