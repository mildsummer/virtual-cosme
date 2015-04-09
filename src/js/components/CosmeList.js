import Cosme from './Cosme';

var CosmeList = React.createClass({
    render: function() {
        if(!this.props.cosmes) {
          return false;
        } else {
          var rows = this.props.cosmes.map((function(cosme) {
            return (<Cosme onClickCosme={this.props.onClickCosme} key={cosme.id} cosme={cosme} />);
          }).bind(this));
        }
        return (
          <div id="cosme-list">
            <ul>
              {rows}
            </ul>
          </div>
        );
    }
});

export default CosmeList;
