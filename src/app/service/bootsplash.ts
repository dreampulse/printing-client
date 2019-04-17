export const removeBootsplash = () => {
  const bootsplash = window.document.getElementById('bootsplash')
  // TODO: lets fade out the bootsplash, looks nicer
  if (bootsplash && bootsplash.parentNode) {
    // Otherwise hot reloading breaks
    bootsplash.parentNode.removeChild(bootsplash)
  }
}
