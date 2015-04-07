"use strict";

var AlphaSliders = React.createClass({
  displayName: "AlphaSliders",

  onChange: function onChange() {
    this.props.onChange("alpha", this.refs.slider.getValue());
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "sliders", id: "sliders-alpha" },
      React.createElement(ReactSlider, { ref: "slider", min: 10, max: 100, onChange: this.onChange, defaultValue: 100 })
    );
  }
});

module.exports = AlphaSliders;