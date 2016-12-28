function setActionTextureDefaults(texture, repeat) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.generateMipmaps = false;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.repeat.set(repeat,repeat);
}

// prep textures
var t_gray_checkerboard = new THREE.TextureLoader().load('img/gray_checkerboard.png');
setActionTextureDefaults(t_gray_checkerboard, 10);

var m_white = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading});
var m_red = new THREE.MeshPhongMaterial({color: 0xff0000, shading: THREE.FlatShading});
var m_yellow_unlit = new THREE.MeshBasicMaterial({color: 0xffff00});
var m_checkerboard = new THREE.MeshPhongMaterial({map: t_gray_checkerboard});

var updateMaterials = function() {

};