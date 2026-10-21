import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// jsdom has no matchMedia. Report nothing as matching, so every gsap.matchMedia()
// branch stays off and the page renders in its static, reduced-motion form.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

// jsdom doesn't scroll. The route scroll manager calls these.
window.scrollTo = () => {}
Element.prototype.scrollIntoView = () => {}

afterEach(cleanup)
