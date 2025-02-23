import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.z = 4;


// const geometry = new THREE.BoxGeometry( 100, 100, 100 ); 
// const edges = new THREE.EdgesGeometry( geometry ); 
// const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
// scene.add( line );
const rocket = new THREE.Group();

// Body of the rocket (cylinder)
const bodyGeometry = new THREE.CylinderGeometry(1, 1, 5, 32);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCCCC });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
rocket.add(body);

// Nose cone of the rocket (cone)
const coneGeometry = new THREE.CylinderGeometry(0, 1, 2, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.y = 3.5; // Adjust position to connect with the body
rocket.add(cone);

// Fins of the rocket (rectangular planes)
const finGeometry = new THREE.PlaneGeometry(1, 1);
const finMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
const fin1 = new THREE.Mesh(finGeometry, finMaterial);
fin1.rotation.x = Math.PI / 2;
fin1.position.set(0, -2.5, 1); // Adjust position relative to body
rocket.add(fin1);

const fin2 = fin1.clone();
fin2.position.set(0, -2.5, -1); // Adjust position relative to body
rocket.add(fin2);

const fin3 = fin1.clone();
fin3.rotation.y = Math.PI / 2;
fin3.position.set(1, -2.5, 0); // Adjust position relative to body
rocket.add(fin3);

const fin4 = fin3.clone();
fin4.position.set(-1, -2.5, 0); // Adjust position relative to body
rocket.add(fin4);

scene.add(rocket);

const canvas = document.querySelector('canvas',);

const rendrer = new THREE.WebGLRenderer({canvas,antialias:true});
rendrer.setSize(window.innerWidth,window.innerHeight);
rendrer.render(scene,camera);

// for responsive size 
window.addEventListener('resize',()=>{
  rendrer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const controls = new OrbitControls( camera, rendrer.domElement );
controls.enableDamping = true;


let clock = new THREE.Clock();
function animate(){
  window.requestAnimationFrame(animate);
  rendrer.render(scene,camera);
  // mesh.rotation.y = clock.getElapsedTime()*1;
  controls.update();

}
animate();