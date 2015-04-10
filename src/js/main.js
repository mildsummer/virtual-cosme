import SizeSliders from './components/SizeSliders';
import BlurSliders from './components/BlurSliders';
import AlphaSliders from './components/AlphaSliders';
import ColorSliders from './components/ColorSliders';

import TextureList from './components/TextureList';
import textures from './common/textures';

import FaceCanvas from './components/FaceCanvas';

import RegistrationPane from './components/RegistrationPane';

import CosmeList from './components/CosmeList';

import Brush from './components/Brush';


var App = React.createClass({
    getInitialState() {
      var cosmes = JSON.parse(localStorage.getItem("cosmes"));
      console.log(cosmes);
      return {
        brush: {
          color: {
            r: 0,
            g: 0,
            b: 0
          },
          alpha: 100,
          size: 50,
          blur: 0,
          textureIndex: 0
        },
        cosmes: cosmes,
        isRegistering: false
      };
    },
    changeBrush(key, param) {
      var brush = _.clone(this.state.brush, true);
      //size/2<blurにならないようにする（sizeを変更するときだけ)
      if(key=="size"&&param/2<brush.blur){
        brush.blur = param/2;
      }
      brush[key] = param;
      this.setState({brush: brush});
    },
    toggleRegistrationPane() {
      this.setState({isRegistering: !this.state.isRegistering});
    },
    register(cosme) {
      var cosmes = this.state.cosmes ? this.state.cosmes : [];
      cosme.brush = this.state.brush;
      cosme.id =  cosmes.length;
      cosmes = cosmes.concat([cosme]);
      this.setState({cosmes: cosmes});

      //とりあえずlocalStrageに保存
      localStorage.setItem("cosmes", JSON.stringify(cosmes));
    },
    setCosme(cosme) {
      var brush = _.clone(cosme.brush);//そのままsetStateすると参照になり変更できてしまう
      this.setState({brush: brush, true});
    },
    render() {
        var brush = this.state.brush;
        return(
            <div id="container">
                {this.state.isRegistering ? (<RegistrationPane brush={this.state.brush} onSubmit={this.register} close={this.toggleRegistrationPane} />) : null}
                <div id="left">
                  <Brush brush={brush} content={null} position="center center"/>
                  <ColorSliders onChange={this.changeBrush} color={brush.color} values={brush.color} />
                  <AlphaSliders onChange={this.changeBrush} value={brush.alpha} />
                  <SizeSliders onChange={this.changeBrush} value={brush.size} />
                  <BlurSliders onChange={this.changeBrush} size={brush.size} value={brush.blur} />
                  <TextureList onChange={this.changeBrush} textures={textures} selected={brush.textureIndex} />
                  <button id="registration-open-button" onClick={this.toggleRegistrationPane} >登録する</button>
                </div>
                <div id="center">
                  <FaceCanvas brush={brush} width={500} height={500} />
                </div>
                <div id="right">
                  <CosmeList onClickCosme={this.setCosme} cosmes={this.state.cosmes} />
                </div>
            </div>
        );
    }
});

React.render(<App />, document.body);
