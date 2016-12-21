var PlayerPawn = function(x,y,z) {

    var pawn = new Actor(x,y,z);
    pawn.collisionBox.setFromCenterAndSize(new THREE.Vector3(x,y,z), new THREE.Vector3(2.5,5,2.5));

    // other properties
    pawn.moveSpeed = 30;
    pawn.cameraOffset = new THREE.Vector3(0,20,20);
    pawn.yVel = 0;

    // body meshes
    pawn.bodyRoot = new THREE.Scene();
    pawn.root.add(pawn.bodyRoot);

    pawn.bodyMesh = new THREE.Mesh(new THREE.ConeGeometry(2.5,5,4), m_red);
    pawn.bodyMesh.scale.z = .5;
    pawn.bodyMesh.rotation.x = Math.PI;
    pawn.bodyMesh.rotation.y = Math.PI/2;
    pawn.bodyRoot.add(pawn.bodyMesh);

    pawn.headMesh = new THREE.Mesh(new THREE.SphereGeometry(1.25), m_red);
    pawn.headMesh.position.y = 3.75;
    pawn.bodyRoot.add(pawn.headMesh);

    pawn.faceMesh = new THREE.Mesh(new THREE.ConeGeometry(1.25,2,4), m_red);
    pawn.faceMesh.position.x = 1.25;
    pawn.faceMesh.rotation.z = Math.PI/-2;
    pawn.headMesh.add(pawn.faceMesh);
    
    pawn.grounded = false;
    pawn.groundProbe = new THREE.Box3();
    pawn.topProbe = new THREE.Box3();
    pawn.frontProbe = new THREE.Box3();
    pawn.backProbe = new THREE.Box3();
    pawn.leftProbe = new THREE.Box3();
    pawn.rightProbe = new THREE.Box3();
    pawn.facingDirection = 0;
    pawn.shotCooldownMs = 100;
    pawn.lastShotTime = -1*pawn.shotCooldownMs;

    pawn.updateProbes = function() {
        var x = this.root.position.x;
        var y = this.root.position.y;
        var z = this.root.position.z;
        this.groundProbe.setFromCenterAndSize(new THREE.Vector3(x,y-2.5,z), new THREE.Vector3(1,1,1));
        this.topProbe.setFromCenterAndSize(new THREE.Vector3(x,y+2.5,z), new THREE.Vector3(1,1,1));
        this.frontProbe.setFromCenterAndSize(new THREE.Vector3(x,y,z-2.5), new THREE.Vector3(1,1,1));
        this.backProbe.setFromCenterAndSize(new THREE.Vector3(x,y,z+2.5), new THREE.Vector3(1,1,1));
        this.leftProbe.setFromCenterAndSize(new THREE.Vector3(x-2.5,y,z), new THREE.Vector3(1,1,1));
        this.rightProbe.setFromCenterAndSize(new THREE.Vector3(x+2.5,y,z), new THREE.Vector3(1,1,1));
    };

    pawn.handleWorldCollision = function(deltaMovement) {
        this.grounded = false;
        terrainBoxes.forEach(function(b){
            if (this.groundProbe.intersectsBox(b.collisionBox)) {
                if (deltaMovement.y <= 0) {
                    deltaMovement.y = 0;
                    this.yVel = 0;
                    this.root.position.y = b.root.position.y + b.collisionBox.getSize().y/2 + 2.5;
                    this.grounded = true;
                }
            }
            if (this.topProbe.intersectsBox(b.collisionBox)) {
                if (deltaMovement.y >= 0) {
                    deltaMovement.y = 0;
                    this.yVel = -1*this.yVel;
                    this.root.position.y = b.root.position.y - b.collisionBox.getSize().y/2 - 2.5;
                }
            }
            if (this.leftProbe.intersectsBox(b.collisionBox)) {
                if (deltaMovement.x <= 0) { 
                    deltaMovement.x = 0; 
                    this.root.position.x = b.root.position.x + b.collisionBox.getSize().x/2 + 2.5;
                }                
            }
            if (this.rightProbe.intersectsBox(b.collisionBox)) {
                if (deltaMovement.x >= 0) { 
                    deltaMovement.x = 0; 
                    this.root.position.x = b.root.position.x - b.collisionBox.getSize().x/2 - 2.5;
                }
            }
            if (this.frontProbe.intersectsBox(b.collisionBox)) {
                if (deltaMovement.z <= 0) { 
                    deltaMovement.z = 0; 
                    this.root.position.z = b.root.position.z + b.collisionBox.getSize().z/2 + 2.5;
                }
            }
            if (this.backProbe.intersectsBox(b.collisionBox)) {
                if (deltaMovement.z >= 0) { 
                    deltaMovement.z = 0; 
                    this.root.position.z = b.root.position.z - b.collisionBox.getSize().z/2 - 2.5;
                }
            }
        },this);
    };
    
    // per-frame update method
    pawn.tick = function(dt) {
        
        // Movement
        var deltaMovement = new THREE.Vector3();
        if (leftPressed) {
            deltaMovement.x -= this.moveSpeed*dt;
        } else if (rightPressed) {
            deltaMovement.x += this.moveSpeed*dt;
        }
        if (upPressed) {
            deltaMovement.z -= this.moveSpeed*dt;
        } else if (downPressed) {
            deltaMovement.z += this.moveSpeed*dt;
        }

        // Gravity
        this.yVel += world.gravity*dt;
        deltaMovement.y = this.yVel;

        this.handleWorldCollision(deltaMovement);

        // Jumping
        if (this.grounded && jumpPressed) {
            this.yVel = .75;
        }

        // Finally move and update collision probes
        this.root.position.add(deltaMovement);
        this.updateProbes();

        // Update facing direction
        if (!shootPressed && (deltaMovement.x != 0 || deltaMovement.z != 0)) {
            this.facingDirection = Math.atan2(deltaMovement.z * -1, deltaMovement.x);//+Math.PI/2;
            this.bodyRoot.rotation.y = this.facingDirection;
        }

        if (shootPressed && world.elapsedTime >= this.lastShotTime + this.shotCooldownMs) {
            playerBullets.push(new Bullet(this.root.position.x,this.root.position.y,this.root.position.z,this.facingDirection));
            this.lastShotTime = world.elapsedTime;
        }        
    }

    // attach and position camera
    pawn.root.add(camera);
    camera.position.z = 20;
    camera.position.y = 20;
    camera.rotation.x -= Math.PI/4;

    pawn.root.position.set(x,y,z);
    return pawn;
}