var BlurSliders = React.createClass({
    onChange() {
      this.props.onChange("blur", this.refs.slider.getValue());
    },
    render() {
      return (
          <div className="sliders" id="sliders-blur">
            <ReactSlider ref="slider" min={0} max={Math.floor(this.props.size/2)} onChange={this.onChange} defaultValue={0} value={this.props.value} />
          </div>
        );
    }
});

export default BlurSliders;
