import { useRef, useEffect, useState } from 'react'

export default function Clicker( {increment, keyName, color})
{
    const [ count, setCount ] = useState(0)
    
    const buttonRef = useRef()
    useEffect(() =>
    {
        buttonRef.current.style.backgroundColor = 'papayawhip'
        buttonRef.current.style.color = 'salmon'

        // ...
    }, [])

    useEffect(() =>
    {
        return () =>
        {
            localStorage.removeItem(keyName)
        }
    }, [])

    useEffect(() =>
        {
            localStorage.setItem(keyName, count)
        }, [ count ])

    const buttonClick = () =>
    {
        setCount(count + 1)
        increment()
    }

    useEffect(() =>
        {
            const savedCount = parseInt(localStorage.getItem('count') ?? 0)
            setCount(savedCount)
        }, [])

    return <div>
        <div style={ { color } }>Clicks count: { count }</div>
        <button ref={ buttonRef } onClick={ buttonClick }>Click me</button>
    </div>
}