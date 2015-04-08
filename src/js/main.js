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
    },
    render() {
      return (
          <div className="sliders" id="sliders-blur">
            <ReactSlider ref="slider" min={0} max={Math.floor(this.props.size/2)} onChange={this.onChange} defaultValue={0} />
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
    clear() {
      this.setState({points:[], mousedown: false, length: 0});
    },
    paint() {
      if(!("fillStyle" in ctx)) return false; //初期化時はpaintしない
      var brush = this.props.brush,
          pa = this.state.points,
          l = this.state.length;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if(brush.blur!=0){//ぼかしはradialGradientを使う
        for(var i=0; i<l; i++){
          var p = pa[i],
            grad = ctx.createRadialGradient(p[0], p[1], 10, p[0], p[1], brush.size/2+brush.blur);
          ctx.fillStyle = grad;
          grad.addColorStop(0, "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0.1)");
          grad.addColorStop(1, "rgba(" + [brush.color.r, brush.color.g, brush.color.b].join(",") + ", 0)");
          ctx.fillRect(p[0]-brush.size/2-brush.blur, p[1]-brush.size/2-brush.blur, brush.size+brush.blur*2, brush.size+brush.blur*2);
        }
      } else {
        ctx.fillStyle = rgbToHex(brush.color.r, brush.color.g, brush.color.b);
        //ctx.strokeStyle = rgbToHex(brush.color.r, brush.color.g, brush.color.b);
        //ctx.lineWidth = brush.size;
        //ctx.arc(pa[0][0], pa[0][1], brush.size/2, 0, Math.PI*2, false);
        //ctx.fill();
        for(var i=1; i<l; i++){
          var p = pa[i];
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
          <button id="face-clear-button" onClick={this.clear}>Clear</button>
          <div className="sliders" id="sliders-undo">
            <ReactSlider ref="undo" min={0} max={this.state.points.length} defaultValue={0} value={this.state.length} onChange={this.undoChange} />
          </div>
        </div>
      );
    }
});

var RegistrationPane = React.createClass({
    getInitialState() {
        return {
            isDraggingOver: false,
            imgUrl: null
        };
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit({
            name: this.refs.cosmeName.getDOMNode().value,
            colorName: this.refs.cosmeColorName.getDOMNode().value,
            brand: this.refs.cosmeBland.getDOMNode().value,
            imgUrl: this.state.imgUrl
        });
        this.props.close();
    },
    onDragOver(e) {
        this.setState({isDraggingOver: true});
        e.preventDefault();
    },
    onDragLeave(e) {
        this.setState({isDraggingOver: false});
        e.preventDefault();
    },
    onDrop(e) {
        var imgUrl = e.dataTransfer.getData("url");
        this.setState({imgUrl: imgUrl, isDraggingOver: false});
        e.preventDefault();
    },
    render() {
        return (
          <div id="registration-pane" onDragLeave={this.onDragLeave} onDrop={this.onDrop} onDragOver={this.onDragOver} className={this.state.isDraggingOver ? "dragging-over" : "not-dragging-over"}>
            <div id="registration-container" onDrop={this.onDropImage} >
              <form onSubmit={this.handleSubmit}>
                <input type="text" ref="cosmeName"></input>
                <input type="text" ref="cosmeColorName"></input>
                <input type="text" ref="cosmeBland"></input>
                <input type="submit"></input>
              </form>
              {("imgUrl" in this.state) ? (<img src={this.state.imgUrl} />) : null}
              <span onClick={this.props.close}>閉じる</span>
            </div>
          </div>        
        );
    }
});

var Cosme = React.createClass({
    onClick() {
        this.props.onClickCosme(this.props.cosme);
    },
    render: function() {
        var cosme = this.props.cosme;
        var clrstr = [cosme.brush.color.r, cosme.brush.color.g, cosme.brush.color.b].join(",");
        return (
          <li className="cosme" onClick={this.onClick} style={{
            background: '-webkit-gradient(radial, 20 center, '
            + (cosme.brush.size/2 - cosme.brush.blur - 1 ) //startとendが同じだと表示されない
            + ', 20 center, ' + (cosme.brush.size/2 + cosme.brush.blur)
            + ', from(rgba(' + clrstr + ',' + cosme.brush.alpha/100
            + ')), to(rgba(' + clrstr + ',0)))' + (cosme.imgUrl ? ', url(' + cosme.imgUrl + ')' : ''),
            backgroundPosition: 'center center, right center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto, contain'}}>
            <p>{cosme.name}<br />
            {cosme.colorName}<br />
            /{cosme.brand}</p> 
          </li>
        );
    }
});

var CosmeList = React.createClass({
    render: function() {
        if(!this.props.cosmes) {
          return false;
        } else {
          var rows = this.props.cosmes.map((function(cosme) {
            return (<Cosme onClickCosme={this.props.onClickCosme} key={cosme.id} cosme={cosme} />);
          }).bind(this));
        }
        return (
          <div id="cosme-list">
            <ul>
              {rows}
            </ul>
          </div>
        );
    }
});

//サンプルデータ
var cosmes = [
    {
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
    }
];

var Brush = React.createClass({
    render() {
      var brush = this.props.brush;
      var clrstr = [brush.color.r, brush.color.g, brush.color.b].join(",");
      return (
        <div className="brush" style={
          {
            //width: brush.size+brush.blur*2,
            //height: brush.size+brush.blur*2,
            //top: 150-brush.size/2-brush.blur,
            //left: 150-brush.size/2-brush.blur,
            //borderRadius: brush.size/2+brush.blur,
            //backgroundColor: rgbToHex(brush.color.r, brush.color.g, brush.color.b),
            background: '-webkit-gradient(radial, center center, '
            + (brush.size/2 - brush.blur - 1 ) //startとendが同じだと表示されない
            + ', center center, ' + (brush.size/2 + brush.blur)
            + ', from(rgba(' + clrstr + ',' + brush.alpha/100
            + ')), to(rgba(' + clrstr + ',0)))',
          }
        }></div>
      )
    }
});

var App = React.createClass({
    getInitialState() {
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
          blur: 0
        },
        cosmes: cosmes,
        isRegistering: false
      };
    },
    changeBrush(key, param) {
      var state = _.clone(this.state, true);
      state.brush[key] = param;
      this.setState(state);
    },
    toggleRegistrationPane() {
      this.setState({isRegistering: !this.state.isRegistering});
    },
    register(cosme) {
      var cosmes = this.state.cosmes ? this.state.cosmes : [];
      cosme.brush = this.state.brush;
      cosme.id =  cosmes.length;
      cosmes = cosmes.concat([cosme]);
      this.setState({cosmes: cosmes});
      
      //とりあえずlocalStrageに保存
      localStorage.setItem("cosmes", JSON.stringify(cosmes));
    },
    setCosme(cosme) {
      this.setState({brush: _.clone(cosme.brush, true)});
    },
    render() {
        var brush = this.state.brush;
        return(
            <div id="ui">
                {this.state.isRegistering ? (<RegistrationPane onSubmit={this.register} close={this.toggleRegistrationPane} />) : null}
                <div id="brush-container" ref="brush-container">
                  <Brush brush={brush} content={null} position="center center"/>
                </div>
                <span>R:{brush.color.r} G:{brush.color.g} B:{brush.color.b} Alpha:{brush.alpha} Size:{brush.size} Blur:{brush.blur}</span>
                <ColorSliders onChange={this.changeBrush} color={brush.color} />
                <AlphaSliders onChange={this.changeBrush} />
                <SizeSliders onChange={this.changeBrush} />
                <BlurSliders onChange={this.changeBrush} size={brush.size} />
                <FaceCanvas brush={brush} width={500} height={500} />
                <button id="registration-open-button" onClick={this.toggleRegistrationPane} >登録する</button>
                <CosmeList onClickCosme={this.setCosme} cosmes={this.state.cosmes} />
            </div>
        );
    }
});

React.render(<App />, document.getElementById("container"));
