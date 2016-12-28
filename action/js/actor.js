var Actor = function(x,y,z) {
    var actor = {
        root: new THREE.Scene(),
        collisionBox: new THREE.Box3(new THREE.Vector3(x-.5,y-.5,z-.5), new THREE.Vector3(x+.5,y+.5,z+.5)),
        tick: function(dt){
        },
        destroy: function(){
            scene.remove(this.root);
        }
    };

    scene.add(actor.root);
    actor.root.position.set(x,y,z);

    return actor;
}