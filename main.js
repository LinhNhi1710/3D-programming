/*
	Install Node.js.
	npm install --save three
	npm install --save-dev vite
	Run server local : npx vite : http://localhost:5173
*/


import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
	50,
    window.innerWidth / window.innerHeight,
    1,
    10000
	);
camera.position.z = 5;

// Must have light, without scene is black
const light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x111100);
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader();
const fbxLoader = new FBXLoader();

scene.background = textureLoader.load( 'img/bg.jpg' );

var tree, ngtuyet

const treeDiffuse = textureLoader.load( "/textures/tree_diff.png");
fbxLoader.load(
    'models/SM_tree1.FBX',
    (object) => {
    	tree = object;
    	object.traverse( function ( child ) 
    	{
			if ( child.isMesh ) 
			{
				child.material.map = treeDiffuse;
			}
		});
		object.scale.set(THREE.MathUtils.randFloat(1,1.25), 2, THREE.MathUtils.randFloat(3, 2.25));
	    object.position.set( 2.5,  -1.8, -3 );
		scene.add( object );
	  
    },
)


fbxLoader.load(
    'models/ng_tuyet.FBX',
    (object) => {
    	ngtuyet = object;
    	object.traverse( function ( child ) 
    	{
			if ( child.isMesh ) 
			{
				child.material.map =  textureLoader.load( "/textures/ngtuyet_diff.png");
				child.material.bumpMap =  textureLoader.load( "/textures/ngtuyet_h.png");
			}
		});
		object.scale.set(THREE.MathUtils.randFloat(0.025,0.025), 0.025, 0.015);
	    object.position.set( -2, -1.5, -0.1 );
	    scene.add( object );

    },
)




function animate() {
	if (tree) tree.rotation.y = Date.now()*.0003;
	if (ngtuyet) ngtuyet.rotation.y = Date.now()*.0003;

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
