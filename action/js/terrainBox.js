var TerrainBox = function(x,y,z,w,h,d,material) {
    box = new Actor(x,y,z);
    box.collisionBox = new THREE.Box3(new THREE.Vector3(x-w*.5,y-h*.5,z-d*.5), new THREE.Vector3(x+w*.5,y+h*.5,z+d*.5));
    box.mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material);
    box.root.add(box.mesh);
    return box;
}