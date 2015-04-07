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

export default ColorSliders;