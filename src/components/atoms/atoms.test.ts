import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SkipLink from './SkipLink.vue'
import Button from './Button.vue'
import RatingBadge from './RatingBadge.vue'
import LoadingState from './LoadingState.vue'

describe('SkipLink', () => {
  it('renders the default target and label', () => {
    const wrapper = mount(SkipLink)
    const link = wrapper.get('[data-testid="skip-link"]')

    expect(link.attributes('href')).toBe('#main')
    expect(link.text()).toBe('Skip to content')
  })

  it('accepts a custom target and label', () => {
    const wrapper = mount(SkipLink, { props: { href: '#content', label: 'Jump' } })
    const link = wrapper.get('[data-testid="skip-link"]')

    expect(link.attributes('href')).toBe('#content')
    expect(link.text()).toBe('Jump')
  })

  it('focuses the target without navigating', async () => {
    const main = document.createElement('main')
    main.id = 'main'
    main.scrollIntoView = vi.fn()
    document.body.appendChild(main)

    const wrapper = mount(SkipLink, { attachTo: document.body })
    const before = window.location.href
    await wrapper.get('[data-testid="skip-link"]').trigger('click')

    // Under hash routing a real #main jump would be parsed as the route /main.
    expect(window.location.href).toBe(before)
    expect(main.getAttribute('tabindex')).toBe('-1')
    expect(document.activeElement).toBe(main)
    expect(main.scrollIntoView).toHaveBeenCalled()

    wrapper.unmount()
    main.remove()
  })

  it('keeps an existing tabindex on the target', async () => {
    const main = document.createElement('main')
    main.id = 'main'
    main.setAttribute('tabindex', '0')
    main.scrollIntoView = vi.fn()
    document.body.appendChild(main)

    const wrapper = mount(SkipLink, { attachTo: document.body })
    await wrapper.get('[data-testid="skip-link"]').trigger('click')

    expect(main.getAttribute('tabindex')).toBe('0')

    wrapper.unmount()
    main.remove()
  })

  it('does nothing when the target is missing', async () => {
    const wrapper = mount(SkipLink, { props: { href: '#nowhere' } })
    await expect(wrapper.get('[data-testid="skip-link"]').trigger('click')).resolves.not.toThrow()
  })
})

describe('Button', () => {
  it('defaults to a primary button', () => {
    const wrapper = mount(Button, { slots: { default: 'Go' } })
    const button = wrapper.get('[data-testid="ui-button"]')

    expect(button.attributes('type')).toBe('button')
    expect(button.text()).toBe('Go')
    expect(button.classes()).toContain('bg-[var(--tv-accent)]')
  })

  it.each([
    ['secondary', 'bg-[var(--tv-surface)]'],
    ['ghost', 'text-[var(--tv-accent-2)]'],
    ['cta', 'bg-[var(--tv-cta)]'],
    ['danger', 'bg-[var(--tv-danger)]'],
  ])('styles the %s variant', (variant, expectedClass) => {
    const wrapper = mount(Button, { props: { variant: variant as 'secondary' } })
    expect(wrapper.get('[data-testid="ui-button"]').classes()).toContain(expectedClass)
  })

  it('supports a submit type and the disabled state', () => {
    const wrapper = mount(Button, { props: { type: 'submit', disabled: true } })
    const button = wrapper.get<HTMLButtonElement>('[data-testid="ui-button"]')

    expect(button.attributes('type')).toBe('submit')
    expect(button.element.disabled).toBe(true)
  })
})

describe('RatingBadge', () => {
  it('formats a rating to one decimal', () => {
    expect(mount(RatingBadge, { props: { value: 6.5 } }).text()).toBe('★ 6.5')
    expect(mount(RatingBadge, { props: { value: 9 } }).text()).toBe('★ 9.0')
  })

  it('labels a missing rating as unrated', () => {
    expect(mount(RatingBadge, { props: { value: null } }).text()).toBe('Unrated')
    expect(mount(RatingBadge).text()).toBe('Unrated')
  })
})

describe('LoadingState', () => {
  it('announces a default busy message', () => {
    const wrapper = mount(LoadingState)
    const state = wrapper.get('[data-testid="loading-state"]')

    expect(state.attributes('aria-busy')).toBe('true')
    expect(state.text()).toBe('Loading…')
  })

  it('accepts a custom message', () => {
    const wrapper = mount(LoadingState, { props: { message: 'Loading show details…' } })
    expect(wrapper.text()).toBe('Loading show details…')
  })
})
