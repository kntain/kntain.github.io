// prep the page
var screenWidth = 496;
var screenHeight = 384;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, screenWidth / screenHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize(screenWidth, screenHeight);
document.body.appendChild(renderer.domElement);
var instructions = document.createElement('p');
instructions.innerText = "arrow keys, z, x";
document.body.appendChild(instructions);
document.body.style="margin:0;height:100%;width:100%;position:fixed;background-color:grey;font-family:monospace;";

// universal lighting
var ambientLight = new THREE.AmbientLight( 0xffffff, .2 );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( .5, .75, 1 );
scene.add( ambientLight, directionalLight );

// game world settings
var world = {
    gravity: -1.5,
    elapsedTime: 0
};


var pawn = new PlayerPawn(0,100,0);

var terrainBoxes = [];
terrainBoxes.push(new TerrainBox(0,-50,0,100,100,100, m_checkerboard));
terrainBoxes.push(new TerrainBox(0,10,0,10,20,10, m_white));
terrainBoxes.push(new TerrainBox(0,5,0,30,10,10, m_white));
terrainBoxes.push(new TerrainBox(0,5,0,10,10,30, m_white));
terrainBoxes.push(new TerrainBox(30,5,0,10,10,10, m_white));
terrainBoxes.push(new TerrainBox(30,25,0,10,10,10, m_white));

var playerBullets = [];

function tick(now) {
    var deltaTime = (now-world.elapsedTime) / 1000;
    world.elapsedTime = now;
    requestAnimationFrame(tick);
    pawn.tick(deltaTime);
    playerBullets.forEach(function(b){
        b.tick(deltaTime);
    });
    renderer.render(scene, camera);
}
tick(0);