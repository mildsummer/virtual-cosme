//React.render(
//    <h1>Hello, world!</h1>,
//    document.getElementById('example')
//);
//
//var Hello = React.createClass({
//    render() {
//        return (
//            <div className="container">Hello {this.props.name}</div>
//        );
//    }
//})
//
//React.render(<Hello name="React" />, document.getElementById("example"));
//
//var Counter = React.createClass({
//    getInitialState() {
//        return {
//            count: 0
//        };
//    },
//    onClick() {
//        this.setState({count: this.state.count + 1});
//    },
//    render() {
//        return (
//            <div>
//                <div>count:{this.state.count}</div>
//                <button onClick={this.onClick}>click!</button>
//            </div>
//        );
//    }
//});
//
//React.render(<Counter />, document.getElementById("example"));

var ColorSliders = React.createClass({
    _onChange() {
        var param = {
            r: this.refs.r.getValue(),
            g: this.refs.g.getValue(),
            b: this.refs.b.getValue(),
        }
        this.props.onChange("color", param);
    },
    render() {
        return (
            <div className="sliders" id="slider-color">
                <ReactSlider ref="r" min={0} max={255} onChange={this._onChange} />
                <ReactSlider ref="g" min={0} max={255} onChange={this._onChange} />
                <ReactSlider ref="b" min={0} max={255} onChange={this._onChange} />
            </div>
        );
    }
});
        
var App = React.createClass({
    getInitialState() {
        return {
            color: {
                r: 0,
                g: 0,
                b: 0
            }
        }
    },
    onChange(key, param) {
        //間接的にstateを変更
        var state = {};
        $.extend(true, state, this.state);
        state.sliders[key] = param;
        this.setState(state);
    },
    render() {
        return(
            <div className="ui">
                <span>R:{this.state.color.r} G:{this.state.color.r} B:{this.state.color.r}</span>
                <ColorSliders sliderOnChange={this.onChange} />
            </div>
        );
    }
});

React.render(<App />, $("#container"));