var Brush = React.createClass({
    render() {
      var brush = this.props.brush;
      var clrstr = [brush.color.r, brush.color.g, brush.color.b].join(",");
      var textureStyle = brush.textureIndex > 0 ? 'url(/img/texture/' + brush.textureIndex
          + '.png) no-repeat center center /'
          + (brush.size + brush.blur) + 'px ' + (brush.size + brush.blur)
          + 'px, ' : "";
      var style = {
            opacity: brush.alpha/100,
            background: textureStyle + '-webkit-gradient(radial, center center, '
            + (brush.size/2 - brush.blur - 1 ) //startとendが同じだと表示されない
            + ', center center, ' + (brush.size/2 + brush.blur)
            + ', from(rgba(' + clrstr + ',1)), to(rgba(' + clrstr + ',0)))'
          };
      return (
        <div id="brush-sample" style={style}></div>
      )
    }
});

export default Brush;
