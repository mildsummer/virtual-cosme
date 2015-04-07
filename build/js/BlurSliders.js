"use strict";

var BlurSliders = React.createClass({
  displayName: "BlurSliders",

  onChange: function onChange() {
    this.props.onChange("blur", this.refs.slider.getValue());
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "sliders", id: "sliders-blur" },
      React.createElement(ReactSlider, { ref: "slider", min: 0, max: Math.floor(this.props.size / 2), onAfterChange: this.onChange, defaultValue: 0 })
    );
  }
});

module.exports = BlurSliders;