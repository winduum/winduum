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

export const setElementsClassList = (elements, classes = [], remove) => {
    elements.forEach(target => target.classList[!remove ? 'add' : 'remove'](...classes))
}

export const setElementClassList = (element, classes = [], remove) => {
    element.classList[!remove ? 'add' : 'remove'](...classes)
}
