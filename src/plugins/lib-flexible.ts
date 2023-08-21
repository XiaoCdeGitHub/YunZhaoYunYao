function flexible(window: Window & typeof globalThis, document: Document) {
  const docEl = document.documentElement
  const dpr = window.devicePixelRatio || 1

  // 设置 body 默认 fontSize
  function setBodyFontSize() {
    if (document.body)
      document.body.style.fontSize = `${12 * dpr}px`

    else
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    const width = docEl.clientWidth
    if (width <= 800) {
      const rem = docEl.clientWidth / 10
      docEl.style.fontSize = `${rem}px`
    }
    else if (width >= 1340) {
      const rem = 19.2
      docEl.style.fontSize = `${rem}px`
    }
    else {
      const rem = docEl.clientWidth / 100
      docEl.style.fontSize = `${rem}px`
    }
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted)
      setRemUnit()
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    const fakeBody = document.createElement('body')
    const testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1)
      docEl.classList.add('hairlines')
    docEl.removeChild(fakeBody)
  }
}

if (!import.meta.env.SSR)
  flexible(window, document)
