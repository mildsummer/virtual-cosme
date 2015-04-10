var Cosme = React.createClass({
    onClick() {
        this.props.onClickCosme(this.props.cosme);
    },
    render: function() {
        var cosme = this.props.cosme;
        var clrstr = [cosme.brush.color.r, cosme.brush.color.g, cosme.brush.color.b].join(",");
        var textureStyle = cosme.brush.textureIndex > 0 ? 'url(/img/texture/' + cosme.brush.textureIndex
            + '.png) no-repeat ' + (40 - (cosme.brush.size + cosme.brush.blur)/2) + 'px center /'
            + (cosme.brush.size + cosme.brush.blur) + 'px ' + (cosme.brush.size + cosme.brush.blur)
            + 'px, ' : "";
        var imageStyle = cosme.imgUrl ? ', url(' + cosme.imgUrl + ') no-repeat center right / contain' : ''
        var style = {
                background: textureStyle + '-webkit-gradient(radial, 40 center, '
                  + (cosme.brush.size/2 - cosme.brush.blur - 1 ) //startとendが同じだと表示されない
                  + ', 40 center, ' + (cosme.brush.size/2 + cosme.brush.blur)
                  + ', from(rgba(' + clrstr + ',1)), to(rgba(' + clrstr + ',0)))' + imageStyle
            };
        return (
          <li className="cosme" onClick={this.onClick} style={style}>
            <p><span className="cosme-name">{cosme.name}</span><br />
            <span className="cosme-colorname">{cosme.colorName}</span><br />
            <span className="cosme-brand">/{cosme.brand}</span></p>
          </li>
        );
    }
});

export default Cosme;
