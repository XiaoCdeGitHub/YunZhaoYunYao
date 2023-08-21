/* eslint-disable no-console */
interface Options {
  observerTargetId: string
  targetId: string
  rootMargin?: string
  handleIntersect: (entries: IntersectionObserverEntry[], targetElement: HTMLElement) => void
}

export function createIntersectionObserver(options: Options) {
  const observerTargetElement = options?.observerTargetId && document.querySelector(options.observerTargetId) as HTMLElement
  const targetElement = options?.targetId && document.querySelector(options.targetId) as HTMLElement
  if (!observerTargetElement || !targetElement)
    return

  const observerOptions = {
    root: null,
    rootMargin: options?.rootMargin ?? '0px',
    threshold: buildThresholdList(),
  }

  if (typeof window.IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(entries => options.handleIntersect(entries, targetElement as HTMLElement), observerOptions)
    observer.observe(observerTargetElement)
  }
  else {
    function update() {
      const rect = observerTargetElement && observerTargetElement.getBoundingClientRect()
      const bottom = (rect && rect?.bottom) || 0
      const height = (rect && rect?.height) || 0
      const intersectionRatio = bottom <= 0 ? 0 : bottom / height
      options.handleIntersect([{ intersectionRatio, boundingClientRect: rect }] as IntersectionObserverEntry[], targetElement as HTMLElement)
    }
    document.addEventListener('scroll', update)
    update()
  }
}

function buildThresholdList() {
  const thresholds = []
  const numSteps = 20

  for (let i = 1.0; i <= numSteps; i++) {
    const ratio = i / numSteps
    thresholds.push(ratio)
  }

  thresholds.push(0)
  return thresholds
}
