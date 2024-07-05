import Clicker from "./Clicker"
import People from "./People"

import { useMemo, useState } from 'react'

export default function App( {clickersCount, children})
{
    const [ hasClicker, setHasClicker ] = useState(true)
    const [ count, setCount ] = useState(0)

    const toggleClickerClick = () =>
    {
        setHasClicker(!hasClicker)
    }

    const increment = () =>
    {
        setCount(count + 1)
    }

    const colors = useMemo(() =>
    {
        const colors = []
        for(let i = 0; i < clickersCount; i++)
            colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 75%)`)

        return colors
    }, [clickersCount])

    return <>
        <h1>My First React App</h1>
        <h2>And a fancy subtitle</h2>
        <button onClick={ toggleClickerClick }>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
        
        <div>Total count: { count }</div>

        { hasClicker && <>
            { [...Array(clickersCount)].map((value, index) =>
                <Clicker
                    key={ index }
                    increment={ increment }
                    keyName={ `count${index}` }
                    color={ colors[index] }
                />
            ) }
        </> }

        <People />
        
    </>
}