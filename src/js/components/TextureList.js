import Texture from './Texture';

var TextureList = React.createClass({
    render: function() {
      var rows = this.props.textures.map((function(texture) {
        return (<Texture isSelected={this.props.selected === texture.id} onClickTexture={this.props.onChange} key={texture.id} texture={texture} />);
      }).bind(this));
      return (
        <div id="texture-list">
          <ul>
            {rows}
          </ul>
        </div>
      );
    }
});

export default TextureList;
