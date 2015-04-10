var RegistrationPane = React.createClass({
    getInitialState() {
        return {
            isDraggingOver: false,
            imgUrl: null
        };
    },
    handleSubmit() {
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
        console.log(imgUrl);
        e.preventDefault();
    },
    render() {
        var brush = this.props.brush;
        var clrstr = [brush.color.r, brush.color.g, brush.color.b].join(",");
        var textureStyle = brush.textureIndex > 0 ? 'url(/img/texture/' + brush.textureIndex
            + '.png) no-repeat ' + (80 - (brush.size + brush.blur)/2) + 'px center /'
            + (brush.size + brush.blur) + 'px ' + (brush.size + brush.blur)
            + 'px, ' : "";
        var imageStyle = this.state.imgUrl ? ('url(' + this.state.imgUrl + ') no-repeat center right / contain, ') : '';
        console.log(imageStyle);
        var style = {
                background: imageStyle + textureStyle + '#FFF -webkit-gradient(radial, 80 center, '
                  + (brush.size/2 - brush.blur - 1 ) //startとendが同じだと表示されない
                  + ', 80 center, ' + (brush.size/2 + brush.blur)
                  + ', from(rgba(' + clrstr + ',1)), to(rgba(' + clrstr + ',0)))'
            };
        console.log(style);
        return (
          <div id="registration-pane" onDragLeave={this.onDragLeave} onDrop={this.onDrop} onDragOver={this.onDragOver} className={this.state.isDraggingOver ? "dragging-over" : "not-dragging-over"}>
            <div id="registration-container" >
              <div id="registration-input" style={style} >
                <input type="text" ref="cosmeName" placeholder="商品名を入力"></input>
                <input type="text" ref="cosmeColorName" placeholder="色名を入力"></input>
                <input type="text" ref="cosmeBland" placeholder="ブランド名を入力"></input>
                <p>商品画像をここにドラッグアンドドロップして設定できます</p>
              </div>
              <div id="registration-button" >
                <button id="registration-ok-button" onClick={this.handleSubmit}>OK</button>
                <button id="registration-ok-button" onClick={this.props.close}>キャンセル</button>
              </div>
            </div>
          </div>
        );
    }
});

export default RegistrationPane;
