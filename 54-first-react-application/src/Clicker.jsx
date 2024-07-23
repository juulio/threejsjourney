import { useEffect, useState } from 'react'

export default function Clicker (props) {
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(props.keyName) ?? 0))

    const buttonClick = () =>
    {
        setCount(count + 1)
        props.increment()
    }

    useEffect(() =>
    {
        return () =>
            {
                localStorage.removeItem(props.keyName)
            }
    }, [])
    
    useEffect(
        () => {
            localStorage.setItem(props.keyName, count) //save count to local storage
        },
        [ count ]  
    )
    
    return <div>
        <div style={ { color: props.color }}>Clicks count: { count }</div>
        <button onClick={ buttonClick   }>Click me</button>
    </div>
}