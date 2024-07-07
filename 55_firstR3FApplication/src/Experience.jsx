import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import CustomObject from './CustomObject'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

extend({ OrbitControls: OrbitControls })

export default function Experience () {
    const { camera, gl } = useThree()

    const cubeRef = useRef()
    const groupRef = useRef()

    useFrame((state, delta) =>
    {
        cubeRef.current.rotation.y += delta
        // groupRef.current.rotation.y += delta
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)
    
    })
    
    return <>
        <orbitControls args={ [ camera, gl.domElement ] } />

        <directionalLight />
        <ambientLight intensity={ 1.5 } />

        {/* <mesh position={ [ 2, 0, 0 ] } scale={ 1.5 }> */}
        <group ref={ groupRef }>
            <mesh position-x="-3">
                <sphereGeometry />
                <meshStandardMaterial color="lightblue" />
            </mesh>
            <mesh ref={ cubeRef } position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" wireframe="true" />
            </mesh>
        </group>
        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
        <CustomObject />
    </>
}