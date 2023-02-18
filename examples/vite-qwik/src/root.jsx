import './global.css'
import qwikLogo from './assets/qwik.svg'
import { Counter } from './components/counter/counter.jsx';

// to adding support for :has selector for unsupported browsers
!CSS.supports('selector(:has(*))') && (async() => (await import('css-has-pseudo/browser')).default(document))()

export default () => {
    return (
        <>
            <head>
                <meta charSet="utf-8" />
                <title>Qwik Blank App</title>
            </head>
            <body>
                <div className="App">
                    <div className="flex justify-center gap-6 mb-2">
                        <a href="https://vitejs.dev" target="_blank">
                            <img src="/vite.svg" className="logo" alt="Vite logo" />
                        </a>
                        <a href="https://qwik.builder.io/" target="_blank">
                            <img src={qwikLogo} className="logo qwik" alt="Qwik logo" />
                        </a>
                    </div>
                    <h1>Vite + Qwik</h1>
                    <div>
                        <Counter />
                        <p>
                            Edit <code>src/root.jsx</code> and save to test HMR
                        </p>
                    </div>
                    <p className="read-the-docs">
                        Click on the Vite and Qwik logos to learn more
                    </p>
                </div>
            </body>
        </>
    );
};
