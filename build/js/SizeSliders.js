"use strict";

var SizeSliders = React.createClass({
  displayName: "SizeSliders",

  onChange: function onChange() {
    this.props.onChange("size", this.refs.slider.getValue());
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "sliders", id: "sliders-size" },
      React.createElement(ReactSlider, { ref: "slider", min: 1, max: 100, onChange: this.onChange, defaultValue: 50 })
    );
  }
});

module.exports = SizeSliders;