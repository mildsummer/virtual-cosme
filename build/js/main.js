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

"use strict";

React.render(React.createElement(ReactSlider, { dafaultValue: 50 }), document.body);