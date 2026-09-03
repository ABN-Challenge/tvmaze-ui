import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import AppShell from './AppShell.vue'
import PageContainer from './PageContainer.vue'
import GenreRow from './GenreRow.vue'
import ShowHero from './ShowHero.vue'
import { createTestRouter } from '../testing'
import type { ShowCardModel } from '../../types'

const show: ShowCardModel = {
  id: 42,
  name: 'Under the Dome',
  rating: { average: 6.5 },
  image: { medium: 'https://example.com/poster.jpg' },
}

const withRouter = () => ({ global: { plugins: [createTestRouter()] } })

describe('AppHeader', () => {
  it('renders the default brand, subtitle and home link', () => {
    const wrapper = mount(AppHeader)

    expect(wrapper.get('[data-testid="app-header"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('TVmaze Explorer')
    expect(wrapper.text()).toContain('Browse shows by genre and rating')
    expect(wrapper.get('a').attributes('href')).toBe('#/')
  })

  it('accepts overrides and renders slot content', () => {
    const wrapper = mount(AppHeader, {
      props: { title: 'Catalog playground', subtitle: 'Remote', homeHref: '#/home' },
      slots: { default: '<span data-testid="slotted">search</span>' },
    })

    expect(wrapper.text()).toContain('Catalog playground')
    expect(wrapper.text()).toContain('Remote')
    expect(wrapper.get('a').attributes('href')).toBe('#/home')
    expect(wrapper.get('[data-testid="slotted"]').exists()).toBe(true)
  })

  it('gives the search slot the remaining width', () => {
    const wrapper = mount(AppHeader, { slots: { default: '<span>search</span>' } })
    const slotWrapper = wrapper.findAll('div').at(-1)

    expect(slotWrapper?.classes()).toContain('flex-1')
    expect(slotWrapper?.classes()).toContain('min-w-0')
  })
})

describe('AppFooter', () => {
  it('attributes TVmaze by default', () => {
    const wrapper = mount(AppFooter)
    const link = wrapper.get('a')

    expect(wrapper.text()).toContain('Show data from')
    expect(link.text()).toBe('TVmaze')
    expect(link.attributes('href')).toBe('https://www.tvmaze.com/')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(wrapper.text()).toContain('CC BY-SA')
  })

  it('accepts a different source and license note', () => {
    const wrapper = mount(AppFooter, {
      props: { sourceName: 'Example', sourceHref: 'https://example.com', licenseNote: 'MIT' },
    })

    expect(wrapper.get('a').text()).toBe('Example')
    expect(wrapper.get('a').attributes('href')).toBe('https://example.com')
    expect(wrapper.text()).toContain('MIT')
  })

  it('lets the slot replace the attribution', () => {
    const wrapper = mount(AppFooter, { slots: { default: 'Custom footer' } })
    expect(wrapper.text()).toBe('Custom footer')
  })
})

describe('AppShell', () => {
  it('renders a skip link and a focusable main landmark', () => {
    const wrapper = mount(AppShell)

    expect(wrapper.get('[data-testid="skip-link"]').attributes('href')).toBe('#main')
    const main = wrapper.get('main')
    expect(main.attributes('id')).toBe('main')
    // Focus must be able to land on main for the skip link to work.
    expect(main.attributes('tabindex')).toBe('-1')
  })

  it('supports a custom main id', () => {
    const wrapper = mount(AppShell, { props: { mainId: 'content' } })

    expect(wrapper.get('[data-testid="skip-link"]').attributes('href')).toBe('#content')
    expect(wrapper.get('main').attributes('id')).toBe('content')
  })

  it('renders header, default and footer slots', () => {
    const wrapper = mount(AppShell, {
      slots: {
        header: '<header data-testid="slot-header" />',
        default: '<p data-testid="slot-body" />',
        footer: '<footer data-testid="slot-footer" />',
      },
    })

    expect(wrapper.find('[data-testid="slot-header"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="slot-body"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="slot-footer"]').exists()).toBe(true)
  })

  it('falls back to the default footer', () => {
    const wrapper = mount(AppShell)
    expect(wrapper.find('[data-testid="app-footer"]').exists()).toBe(true)
  })

  it('can hide the footer entirely', () => {
    const wrapper = mount(AppShell, { props: { showFooter: false } })
    expect(wrapper.find('[data-testid="app-footer"]').exists()).toBe(false)
  })
})

describe('PageContainer', () => {
  it('centres slot content and merges incoming classes', () => {
    const wrapper = mount(PageContainer, {
      attrs: { class: 'space-y-8' },
      slots: { default: '<p data-testid="body" />' },
    })
    const container = wrapper.get('[data-testid="page-container"]')

    expect(container.classes()).toContain('max-w-7xl')
    expect(container.classes()).toContain('space-y-8')
    expect(wrapper.find('[data-testid="body"]').exists()).toBe(true)
  })
})

describe('GenreRow', () => {
  it('renders category and show cards in order', () => {
    const wrapper = mount(GenreRow, {
      props: {
        category: 'Drama',
        shows: [show, { id: 2, name: 'Second', rating: { average: 9 }, image: null }],
        getShowLink: (s: ShowCardModel) => `/shows/${s.id}`,
      },
      ...withRouter(),
    })

    expect(wrapper.get('[data-testid="genre-title"]').text()).toBe('Drama')
    expect(wrapper.get('[data-testid="genre-row"]').attributes('aria-label')).toBe('Drama shows')

    const cards = wrapper.findAll('[data-testid="show-card"]')
    expect(cards).toHaveLength(2)
    expect(cards[0].attributes('href')).toBe('/shows/42')
  })

  it('pads the row unless flush', () => {
    const padded = mount(GenreRow, { props: { category: 'Drama', shows: [show] }, ...withRouter() })
    expect(padded.get('[data-testid="genre-title"]').classes()).toContain('px-4')

    const flush = mount(GenreRow, {
      props: { category: 'Drama', shows: [show], flush: true },
      ...withRouter(),
    })
    expect(flush.get('[data-testid="genre-title"]').classes()).not.toContain('px-4')
  })

  it('renders cards without links when no resolver is given', () => {
    const wrapper = mount(GenreRow, { props: { category: 'Sports', shows: [show] }, ...withRouter() })
    expect(wrapper.get('[data-testid="show-card"]').element.tagName).toBe('DIV')
  })

  it('renders nothing when the list is empty', () => {
    const wrapper = mount(GenreRow, { props: { category: 'Sports', shows: [] }, ...withRouter() })
    expect(wrapper.find('[data-testid="genre-row"]').exists()).toBe(false)
  })
})

describe('ShowHero', () => {
  const full: ShowCardModel = {
    id: 1,
    name: 'Band of Brothers',
    rating: { average: 9 },
    genres: ['Drama', 'War'],
    status: 'Ended',
    premiered: '2001-09-09',
    network: { name: 'HBO' },
    officialSite: 'https://www.hbo.com/',
    summary: '<p>A sanitised summary.</p>',
    image: { medium: 'https://example.com/m.jpg', original: 'https://example.com/o.jpg' },
  }

  it('renders every metadata field it is given', () => {
    const wrapper = mount(ShowHero, { props: { show: full, castNames: ['Damian Lewis'] } })

    expect(wrapper.get('h1').text()).toBe('Band of Brothers')
    expect(wrapper.get('[data-testid="show-hero"]').attributes('aria-label')).toBe(
      'Band of Brothers details',
    )
    expect(wrapper.text()).toContain('Drama · War')
    expect(wrapper.text()).toContain('Ended')
    expect(wrapper.text()).toContain('Premiered 2001-09-09')
    expect(wrapper.text()).toContain('Network: HBO')
    expect(wrapper.get('[data-testid="show-summary"]').html()).toContain('A sanitised summary.')
    expect(wrapper.text()).toContain('Damian Lewis')
    expect(wrapper.get('img').attributes('src')).toBe('https://example.com/o.jpg')
  })

  it('prefers the medium image when no original exists', () => {
    const wrapper = mount(ShowHero, {
      props: { show: { ...full, image: { medium: 'https://example.com/m.jpg' } } },
    })
    expect(wrapper.get('img').attributes('src')).toBe('https://example.com/m.jpg')
  })

  it('falls back to a placeholder without an image', () => {
    const wrapper = mount(ShowHero, { props: { show: { ...full, image: null } } })

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('No image')
  })

  it('uses the web channel when there is no network', () => {
    const wrapper = mount(ShowHero, {
      props: { show: { ...full, network: null, webChannel: { name: 'Netflix' } } },
    })
    expect(wrapper.text()).toContain('Network: Netflix')
  })

  it('omits optional sections that have no data', () => {
    const wrapper = mount(ShowHero, {
      props: {
        show: { id: 2, name: 'Sparse', rating: { average: null }, image: null },
      },
    })

    expect(wrapper.text()).not.toContain('Network:')
    expect(wrapper.find('[data-testid="show-summary"]').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Cast')
    expect(wrapper.text()).not.toContain('Official site')
    expect(wrapper.get('[data-testid="rating-badge"]').text()).toBe('Unrated')
  })

  it('renders an empty cast list as no cast section', () => {
    const wrapper = mount(ShowHero, { props: { show: full, castNames: [] } })
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('links the official site safely', () => {
    const wrapper = mount(ShowHero, { props: { show: full } })
    const link = wrapper.findAll('a').at(-1)

    expect(link?.attributes('href')).toBe('https://www.hbo.com/')
    expect(link?.attributes('rel')).toBe('noopener noreferrer')
    expect(link?.attributes('target')).toBe('_blank')
  })
})
