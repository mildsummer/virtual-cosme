var AlphaSliders = React.createClass({
    onChange() {
      this.props.onChange("alpha", this.refs.slider.getValue());
    },
    render() {
      return (
          <div className="sliders" id="sliders-alpha">
            <ReactSlider ref="slider" min={10} max={100} onChange={this.onChange} defaultValue={100} value={this.props.value} />
          </div>
        );
    }
});

export default AlphaSliders;
