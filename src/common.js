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
