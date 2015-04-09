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
                start: rgbToHex(this.props.color.r, 0, this.props.color.b),
                end: rgbToHex(this.props.color.r, 255, this.props.color.b)
            },
            b: {
                start: rgbToHex(this.props.color.r, this.props.color.g, 0),
                end: rgbToHex(this.props.color.r, this.props.color.g, 255)
            }
        }
        var style = {};
        Object.keys(backColors).forEach(function(c){
          style[c] = {
            //background: 'linear-gradient(left, ' + backColors.r.start + ', ' + backColors.r.end + ')',
            background: '-webkit-gradient(linear, left top, right top, from(' + backColors[c].start + '), to(' + backColors[c].end + '))',
            //background: '-moz-linear-gradient(left, ' + backColors.r.start + ',' + backColors.r.end + ')'
          }
        });
        return (
            <div className="sliders" id="sliders-color">
                <div id="sliders-color-r" style={style.r} >
                    <ReactSlider ref="r" min={0} max={255} onChange={this.onChange} value={this.props.values.r} />
                </div>
                <div id="sliders-color-g" style={style.g} >
                    <ReactSlider ref="g" min={0} max={255} onChange={this.onChange} value={this.props.values.g} />
                </div>
                <div id="sliders-color-b" style={style.b} >
                    <ReactSlider ref="b" min={0} max={255} onChange={this.onChange} value={this.props.values.b} />
                </div>
            </div>
        );
    }
});

export default ColorSliders;
