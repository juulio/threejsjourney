import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


// Debug
const gui = new GUI()
const clock = new THREE.Clock()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('./textures/particles/2.png')

/**
 * Particles
 */
const particlesGeometry = new THREE.BufferGeometry()
const count = 100
const colors = new Float32Array(count * 3)
const positions = new Float32Array(count * 3)

for(let i=0;i<count*3;i++){
    colors[i + 0] = Math.random() * 0.5
    colors[i + 1] = Math.random() * 0.5
    colors[i + 2] = Math.random() * 0.5
}

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true, 
    color: '#ff88cc',
    transparent: true,
    alphaMap: particleTexture,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
})

const radius = 1;
let theta = 0, phi = 0;

particlesGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Update Particles to move and create a sphere
 */
const updateParticles = () => {
    const ps = particlesGeometry.attributes.position.array;
    for (let x = 0; x < count * 3; x+=3) {
        theta = Math.PI*2*Math.random()
        phi =Math.PI*2*Math.random()
        ps[x] = (radius) * Math.cos(theta) * Math.sin(phi)
        ps[x + 1] = (radius) * Math.sin(theta) * Math.sin(phi)
        ps[x + 2] = (radius) * Math.cos(phi)
    }
    particlesGeometry.attributes.position.needsUpdate = true;
}

/**
 * Animate
 */
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    updateParticles()

    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()