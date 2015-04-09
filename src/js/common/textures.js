//テクスチャの読み込み
//0番目は"テクスチャ無し"
var textures = [{id:0}];
for(var i=1; i<6; i++){
  textures[i] = {id : i};
  textures[i].img = new Image();
  textures[i].img.src = "img/texture/" + i + ".png";
  console.log(textures[i]);
}

export default textures;
