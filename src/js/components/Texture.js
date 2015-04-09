var Texture = React.createClass({
    onClick() {
        this.props.onClickTexture("textureIndex", this.props.texture.id);
    },
    render: function() {
        var texture = this.props.texture;
        var className = this.props.isSelected ? "texture selected" : "texture";
        return (
          <li className={className} onClick={this.onClick} style={{
              background: texture.id > 0 ? 'url(/img/texture/' + texture.id + '.png) no-repeat center center / contain, #333' : '#333'
            }}></li>
        )
    }
});

export default Texture;
