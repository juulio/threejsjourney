import './style.css'
import { Canvas } from '@react-three/fiber'
import ReactDOM from 'react-dom/client'
import Experience from './Experience'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        gl={ {
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.LinearSRGBColorSpace
        } }
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 3, 2, 6 ]
        } }
    >
        <Experience />
    </Canvas>
)