import { component$, useSignal } from '@builder.io/qwik'

import qwikLogo from './assets/qwik.svg'
import './app.css'
import Button from './components/Button.jsx'

export const App = component$(() => {
    const count = useSignal(0)

    return (
        <>
            <div class="flex justify-center">
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" class="logo" alt="Vite logo" />
                </a>
                <a href="https://qwik.builder.io" target="_blank">
                    <img src={qwikLogo} class="logo qwik" alt="Qwik logo" />
                </a>
            </div>
            <h1>Vite + Qwik</h1>
            <div class="card">
                <Button onClick$={() => count.value++}>count is {count.value}</Button>
                <p>
          Edit <code>src/app.jsx</code> and save to test HMR
                </p>
            </div>
            <p class="read-the-docs">
        Click on the Vite and Qwik logos to learn more
            </p>
        </>
    )
})
