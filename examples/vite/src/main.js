// to adding support for :has selector for unsupported browsers
!CSS.supports('selector(:has(*))') && (async() => (await import('css-has-pseudo/browser')).default(document))()

export function setupCounter(element) {
    let counter = 0
    const setCounter = (count) => {
        counter = count
        element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
}

setupCounter(document.querySelector('#counter'))
