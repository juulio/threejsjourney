import './style.css'
import { createRoot } from 'react-dom/client'
import App
 from './App'
const root = createRoot(document.querySelector('#root'))

const toto = 'tata'

root.render(
    <div>
        <App clickersCount={ 3 }>
        </App>
    </div>
)