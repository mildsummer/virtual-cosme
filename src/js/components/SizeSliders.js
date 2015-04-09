var SizeSliders = React.createClass({
    onChange() {
      this.props.onChange("size", this.refs.slider.getValue());
    },
    render() {
      return (
          <div className="sliders" id="sliders-size">
            <ReactSlider ref="slider" min={1} max={100} onChange={this.onChange} defaultValue={50} value={this.props.value} />
          </div>
        );
    }
});

export default SizeSliders;
