var Bullet = function(x,y,z,facingDirection) {
    var bullet = new Actor(x,y,z);
    bullet.mesh = new THREE.Mesh(new THREE.SphereGeometry(1,3,2), m_yellow_unlit);
    bullet.root.add(bullet.mesh);
    bullet.movementSpeed = 180;
    bullet.facingDirection = facingDirection;
    bullet.timeAlive = 0;
    bullet.maxLifespan = .5;
    bullet.die = function() {
        this.destroy();
        playerBullets.slice(playerBullets.indexOf(this),1);
    }
    bullet.tick = function(dt) {
        this.timeAlive += dt;
        if (this.timeAlive > this.maxLifespan) {
            this.die();    
        }

        terrainBoxes.forEach(function(box){
            if (this.collisionBox.intersectsBox(box.collisionBox)) {
                this.die();
            }
        },this);

        var deltaMovement = new THREE.Vector3(Math.cos(this.facingDirection), 0, Math.sin(this.facingDirection)*-1);
        deltaMovement.setLength(this.movementSpeed*dt);
        this.root.position.add(deltaMovement);
        this.collisionBox.setFromCenterAndSize(this.root.position, new THREE.Vector3(1,1,1));
        this.ticksAlive++;
    }

    return bullet;
}