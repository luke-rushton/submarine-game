import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x00ffff);
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();
let hasLoaded = false;
let test;
scene.add(new THREE.GridHelper(20, 20)); //this puts a grid to see whats going on
loader.load( '/immortalized_legend_ahri.glb', function ( gltf ) {
    test = gltf.scene;
	scene.add(  test );
    hasLoaded = true;

}, undefined, function ( error ) {

	console.error( error );

} );
//generate borders
let pillarGeometry = new THREE.BoxGeometry(20,500,40);
const pillarMat = new THREE.MeshBasicMaterial( { color: 0x000000} );
const borderPillar = new THREE.Mesh(pillarGeometry, pillarMat);
borderPillar.position.x=0;
borderPillar.position.y = 250;
borderPillar.position.z = 10;
scene.add(borderPillar);
const borderPillarRight = new THREE.Mesh(pillarGeometry, pillarMat);
borderPillarRight.position.x=1000;
borderPillarRight.position.y = 250;
borderPillarRight.position.z = 10;
scene.add(borderPillarRight);
let roofGeometry = new THREE.BoxGeometry(1000,20,40);
const roof = new THREE.Mesh(roofGeometry, pillarMat);
roof.position.x=500;
roof.position.y = 500;
roof.position.z = 10;
scene.add(roof);


//generating cubes
const geometry = new THREE.BoxGeometry( 20, 20, 20 );
const material = new THREE.MeshBasicMaterial();
//loading a matcap for baked in shadows
const matCapMaterial = new THREE.MeshMatcapMaterial();
const matcapTexture = new THREE.TextureLoader().load('/matcap.png');
const texture = new THREE.TextureLoader().load( "/earth-texture.png" );
matCapMaterial.map = texture;
matCapMaterial.matcap = matcapTexture
//adding the cube
//scene.add( cube );
const terrainArray = [];
for(let i = 0; i < 50; i++){
    const terrainCube = new THREE.Mesh(geometry, matCapMaterial);
    terrainCube.position.x = i*20;
    terrainCube.position.y = i*10;
    scene.add( terrainCube );
    terrainArray.push(terrainCube);
}


camera.position.z = 400;
camera.position.y = 250;
camera.position.x = 500;
camera.lookAt( 500, 250, 0 );

const clock=new THREE.Clock();

var target={x:2,y:2,z:2};
var camera_offset={x:10,y:10,z:10};
var camera_speed=1;
var time=0;

function animate() {
    clock.getDelta();
    time=clock.elapsedTime.toFixed(2);
    //camera.position.x=target.x+camera_offset.x*(Math.sin(time*camera_speed));
    //camera.position.z=target.z+camera_offset.z*(Math.cos(time*camera_speed));
    terrainArray.forEach((cube) =>{
    cube.position.x -= 2;
    if(cube.position.x < 0){
        cube.position.x = 1000;
    }
    });
	renderer.render( scene, camera );

}
renderer.setAnimationLoop( animate );