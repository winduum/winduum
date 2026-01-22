document.documentElement.addEventListener('click', ({ target }) => {
  const closedBy = target?.getAttribute('closedby')

  if (target?.matches('dialog[open]') && !document.activeElement.matches('input,textarea') && closedBy && closedBy !== 'none') {
    target?.close()
  }
})
