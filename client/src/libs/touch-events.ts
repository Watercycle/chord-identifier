// Translates touches into mouse clicks since the default synthetic mouse
// click doesn't support multitouch while on hybrid devices that have
// both a mouse and touchscreen.

function click(x: number, y: number) {
  const event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true,
    'screenX': x,
    'screenY': y
  })

  const element = document.elementFromPoint(x, y)
  if (element) { element.dispatchEvent(event) }

  // MouseEvent doesn't trigger the context menu to close when you select
  // something other than the context menu. So... that's what this addresses.
  window.getSelection().removeAllRanges()
}

function simulateClickFromTouch(e: TouchEvent) {
  const touch = e.changedTouches[0]
  click(touch.pageX, touch.pageY)
}

function disableDefaultSyntheticClick(e: TouchEvent) {
  if (e.cancelable) {
    e.preventDefault()
  }
}

export function setupMultitouchSupport() {
  document.addEventListener('touchstart', simulateClickFromTouch)
  document.addEventListener('touchend', disableDefaultSyntheticClick)
}

export function disableContextMenuBySelector(selector: string) {
  const element = document.querySelectorAll(selector)[0]
  if (element == null) { throw "Failed to find element" } 

  element.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
}