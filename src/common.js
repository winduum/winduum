export const nextRepaint = () => {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resolve()
            })
        })
    })
}

export const animationsFinished = async element => Promise.all(element.getAnimations().map(animation => animation.finished))

export const waitFor = (timeout = 0) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), timeout)
    })
}
