document.documentElement.addEventListener('click', ({ target }) => {
  const closedBy = target?.getAttribute('closedby')

  if (target?.matches('dialog[open]') && !document.activeElement.matches('input,textarea') && closedBy && closedBy !== 'none') {
    target?.close()
  }
})

new ResizeObserver(() => {
  document.documentElement.style.setProperty('--default-scrollbar-width', `${Math.max(0, window.innerWidth - document.body.clientWidth)}px`)
}).observe(document.body)
