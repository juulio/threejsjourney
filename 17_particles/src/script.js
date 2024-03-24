import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
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
const count = 400
// const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)
const positions = []

for(let i=0;i<count*3;i++){
    // positions[i] = (Math.random()-0.5)*4
    colors[i] = Math.random() * 5
}

// particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true, 
    // color: '#ff88cc',
    transparent: true,
    alphaMap: particleTexture,
    // alphaTest: 0.001,
    // depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})

const radius = 3;
const t = clock.getElapsedTime();
let theta = 0, phi = 0;

for (let i = 0; i < count*3; i++) {
    const t = clock.getDelta() * .00001;
    theta += 2 * Math.PI * t;
    phi += Math.acos(2 * Math.random() - 1);
    const x = radius * Math.cos(theta) * Math.sin(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(phi)

    positions.push(x, y, z)
}

particlesGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );


const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

// scene.add(new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: '#fff'})))
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
const ps = particlesGeometry.attributes.position.array;
const updateParticles = () => {
    // const positions = particles.geometry.attributes.position.array;
    for (let x = 0; x < count; x+=3) {
        const t = clock.getElapsedTime() * .001;

        theta = Math.PI*2*THREE.MathUtils.randFloatSpread(360)
        phi =Math.PI*2*THREE.MathUtils.randFloatSpread(360)
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
    // Update particles
    // for(let i=0;i<count;i++){
    //     const i3 = i*3

    //     //const x = particlesGeometry.attributes.position.array[i3]
    //     // particlesGeometry.attributes.position.array[i3+1] = Math.cos(elapsedTime + x)
    //     // particlesGeometry.attributes.position.array[i3+1] = Math.sin(elapsedTime * x * 12)
    // }

    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()