export default function Placeholder(props)
{
    // return <mesh position-y={ 0.5 } scale={ [ 2, 3, 2 ] }>
    return <mesh { ...props } >
        <boxGeometry args={ [ 1, 1, 1, 2, 2, 2 ] } />
        <meshBasicMaterial wireframe color="red" />
    </mesh>
}