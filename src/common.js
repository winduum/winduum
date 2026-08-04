export const nextRepaint = () => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve()
      })
    })
  })
}

export const animationsFinished = async (element) => {
  const animations = element?.getAnimations?.() || []
  const results = await Promise.allSettled(animations.map(a => a.finished))

  return results.filter(r => r.status === 'fulfilled').map(r => r.value)
}
