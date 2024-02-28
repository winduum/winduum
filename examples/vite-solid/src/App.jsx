import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import './App.css'

import UiBtn from './components/ui/Btn.jsx'

function App () {
    const [count, setCount] = createSignal(0)

    return (
        <>
            <div class="flex justify-center">
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" class="logo" alt="Vite logo" />
                </a>
                <a href="https://solidjs.com" target="_blank">
                    <img src={solidLogo} class="logo solid" alt="Solid logo" />
                </a>
            </div>
            <h1>Vite + Solid</h1>
            <div class="card">
                <UiBtn onClick={() => setCount((count) => count + 1)}>
          count is {count()}
                </UiBtn>
                <p>
          Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
            </p>
        </>
    )
}

export default App
