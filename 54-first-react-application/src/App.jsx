import Clicker from "./Clicker"
import { useState } from 'react'

export default function App({ clickersCount, children })
{
    const [ hasClicker, setHasClicker ] = useState(true)
    const [ count, setCount ] = useState(0)

    const toggleClickerClick = () => {
        setHasClicker(!hasClicker)
    }

    const increment = () =>
    {
        setCount(count + 1)
    }
    
    const tempArray = [...Array(clickersCount)]
    tempArray.map((value, index) =>
    {
        console.log(value, index)
    })

    return <>
        { children }
        
        <button onClick={ toggleClickerClick }> { hasClicker ? 'Hide' : 'Show' } Clicker</button>

        <div>Total count: { count }</div>

        { hasClicker && <>
            { [...Array(clickersCount)].map((value, index) =>
                <Clicker
                    key={ index }
                    increment={ increment }
                    keyName={ `count${index}` }
                    color={ `hsl(${ Math.random() * 360 }deg, 100%, 75%)` }
                />
            ) }
        </> }
    </>
}