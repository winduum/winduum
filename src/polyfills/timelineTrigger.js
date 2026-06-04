const selector = '[class*="timeline-trigger-"]'

const getThreshold = (style, property, fallback) => {
  const value = parseFloat(style.getPropertyValue(property))

  return Number.isNaN(value) ? fallback : value / 100
}

const observeElement = (element) => {
  if (element._timelineTriggerObserver) return

  const style = getComputedStyle(element)
  const enter = getThreshold(style, '--tw-timeline-trigger-entry', 0.2)
  const exit = getThreshold(style, '--tw-timeline-trigger-exit', 0)

  element._timelineTriggerObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && entry.intersectionRatio >= enter) {
      element.setAttribute('data-enter', '')
    }
    else if (entry.intersectionRatio <= exit) {
      element.removeAttribute('data-enter')
    }
  }, { threshold: [exit, enter] })

  element._timelineTriggerObserver.observe(element)
}

const unobserveElement = (element) => {
  element._timelineTriggerObserver?.disconnect()
  delete element._timelineTriggerObserver
}

const observe = (node) => {
  if (node.nodeType !== 1) return

  if (node.matches(selector)) observeElement(node)

  node.querySelectorAll(selector).forEach(observeElement)
}

const unobserve = (node) => {
  if (node.nodeType !== 1) return

  if (node.matches(selector)) unobserveElement(node)

  node.querySelectorAll(selector).forEach(unobserveElement)
}

document.querySelectorAll(selector).forEach(observeElement)

new MutationObserver(mutations => mutations.forEach(({ addedNodes, removedNodes }) => {
  addedNodes.forEach(observe)
  removedNodes.forEach(unobserve)
})).observe(document.documentElement, { childList: true, subtree: true })
