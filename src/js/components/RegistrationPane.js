var RegistrationPane = React.createClass({
    getInitialState() {
        return {
            isDraggingOver: false,
            imgUrl: null
        };
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit({
            name: this.refs.cosmeName.getDOMNode().value,
            colorName: this.refs.cosmeColorName.getDOMNode().value,
            brand: this.refs.cosmeBland.getDOMNode().value,
            imgUrl: this.state.imgUrl
        });
        this.props.close();
    },
    onDragOver(e) {
        this.setState({isDraggingOver: true});
        e.preventDefault();
    },
    onDragLeave(e) {
        this.setState({isDraggingOver: false});
        e.preventDefault();
    },
    onDrop(e) {
        var imgUrl = e.dataTransfer.getData("url");
        this.setState({imgUrl: imgUrl, isDraggingOver: false});
        e.preventDefault();
    },
    render() {
        return (
          <div id="registration-pane" onDragLeave={this.onDragLeave} onDrop={this.onDrop} onDragOver={this.onDragOver} className={this.state.isDraggingOver ? "dragging-over" : "not-dragging-over"}>
            <div id="registration-container" onDrop={this.onDropImage} >
              <form onSubmit={this.handleSubmit}>
                <input type="text" ref="cosmeName"></input>
                <input type="text" ref="cosmeColorName"></input>
                <input type="text" ref="cosmeBland"></input>
                <input type="submit"></input>
              </form>
              {("imgUrl" in this.state) ? (<img src={this.state.imgUrl} />) : null}
              <span onClick={this.props.close}>閉じる</span>
            </div>
          </div>
        );
    }
});

export default RegistrationPane;
