import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.resetModules()
  document.head.innerHTML = ''
})

afterEach(() => {
  document.head.innerHTML = ''
})

describe('load-styles', () => {
  it('injects the stylesheet link once', async () => {
    await import('./load-styles')

    const links = document.head.querySelectorAll('link#tvmaze-ui-styles')
    expect(links).toHaveLength(1)
    expect(links[0].getAttribute('rel')).toBe('stylesheet')
    expect(links[0].hasAttribute('href')).toBe(true)
  })

  it('does not add a second link when re-imported', async () => {
    await import('./load-styles')
    vi.resetModules()
    await import('./load-styles')

    expect(document.head.querySelectorAll('link#tvmaze-ui-styles')).toHaveLength(1)
  })
})

describe('theme', () => {
  it('imports the token stylesheet without throwing', async () => {
    await expect(import('./theme')).resolves.toBeDefined()
  })
})
