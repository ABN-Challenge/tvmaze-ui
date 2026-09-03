import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchInput from './SearchInput.vue'
import ResponsiveSearch from './ResponsiveSearch.vue'
import ShowCard from './ShowCard.vue'
import ShowCardGrid from './ShowCardGrid.vue'
import EmptyState from './EmptyState.vue'
import ErrorBanner from './ErrorBanner.vue'
import SkeletonRow from './SkeletonRow.vue'
import { createTestRouter } from '../testing'
import type { ShowCardModel } from '../../types'

const show: ShowCardModel = {
  id: 42,
  name: 'Under the Dome',
  rating: { average: 6.5 },
  image: { medium: 'https://example.com/poster.jpg' },
}

const withRouter = () => ({ global: { plugins: [createTestRouter()] } })

describe('SearchInput', () => {
  it('labels the search landmark and field', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '' } })

    const form = wrapper.get('form')
    expect(form.attributes('role')).toBe('search')
    expect(form.attributes('aria-label')).toBe('Search TV shows')
    expect(wrapper.get('label').attributes('for')).toBe('tvmaze-search')
    expect(wrapper.get('[data-testid="search-input"]').attributes('id')).toBe('tvmaze-search')
    expect(wrapper.get('[data-testid="search-input"]').attributes('placeholder')).toBe(
      'Search shows by name',
    )
  })

  it('accepts a custom id, label and placeholder', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', id: 'header-search', label: 'Site search', placeholder: 'Find' },
    })

    expect(wrapper.get('form').attributes('aria-label')).toBe('Site search')
    expect(wrapper.get('[data-testid="search-input"]').attributes('id')).toBe('header-search')
    expect(wrapper.get('[data-testid="search-input"]').attributes('placeholder')).toBe('Find')
  })

  it('emits the typed value and submits', async () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '' } })

    await wrapper.get('[data-testid="search-input"]').setValue('girls')
    expect(wrapper.emitted('update:modelValue')).toEqual([['girls']])

    await wrapper.get('form').trigger('submit')
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })

  it('renders a full-text submit button by default', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '' } })
    const submit = wrapper.get('[data-testid="search-submit"]')

    expect(submit.text()).toBe('Search')
    expect(submit.attributes('aria-label')).toBeUndefined()
    expect(wrapper.find('[data-testid="search-submit-icon"]').exists()).toBe(false)
  })

  it('collapses the submit button to a labelled icon when compact', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '', compact: true, label: 'Site search' } })
    const submit = wrapper.get('[data-testid="search-submit"]')

    // The icon keeps the control narrow on phones; aria-label carries the name
    // while the visible text uses max-sm:hidden so it appears at the same sm
    // breakpoint where the icon is sm:hidden.
    expect(wrapper.find('[data-testid="search-submit-icon"]').exists()).toBe(true)
    expect(submit.attributes('aria-label')).toBe('Site search')
    expect(submit.get('span').classes()).toEqual(['max-sm:hidden'])
  })

  it('uses the default accessible name for a compact button without a label', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '', compact: true } })
    expect(wrapper.get('[data-testid="search-submit"]').attributes('aria-label')).toBe(
      'Search TV shows',
    )
  })
})

describe('ResponsiveSearch', () => {
  it('defaults to the header search identity and compact button', () => {
    const wrapper = mount(ResponsiveSearch, { props: { modelValue: '' } })

    expect(wrapper.get('form').attributes('aria-label')).toBe('Site search')
    expect(wrapper.get('[data-testid="search-input"]').attributes('id')).toBe('tvmaze-header-search')
    expect(wrapper.find('[data-testid="search-submit-icon"]').exists()).toBe(true)
  })

  it('forwards overrides and can opt out of compact mode', () => {
    const wrapper = mount(ResponsiveSearch, {
      props: {
        modelValue: 'girls',
        id: 'custom',
        label: 'Find shows',
        placeholder: 'Type a name',
        compact: false,
      },
    })

    expect(wrapper.get('form').attributes('aria-label')).toBe('Find shows')
    expect(wrapper.get('[data-testid="search-input"]').attributes('id')).toBe('custom')
    expect(wrapper.get('[data-testid="search-input"]').attributes('placeholder')).toBe('Type a name')
    expect(wrapper.find('[data-testid="search-submit-icon"]').exists()).toBe(false)
  })

  it('re-emits input and submit from the inner field', async () => {
    const wrapper = mount(ResponsiveSearch, { props: { modelValue: '' } })

    await wrapper.get('[data-testid="search-input"]').setValue('dome')
    expect(wrapper.emitted('update:modelValue')).toEqual([['dome']])

    await wrapper.get('form').trigger('submit')
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })
})

describe('ShowCard', () => {
  it('renders name, rating and image', () => {
    const wrapper = mount(ShowCard, { props: { show }, ...withRouter() })

    expect(wrapper.get('[data-testid="show-name"]').text()).toBe('Under the Dome')
    expect(wrapper.get('[data-testid="rating-badge"]').text()).toContain('6.5')
    expect(wrapper.get('[data-testid="show-image"]').attributes('alt')).toBe(
      'Poster for Under the Dome',
    )
    expect(wrapper.get('[data-testid="show-image"]').attributes('loading')).toBe('lazy')
  })

  it('shows placeholder when image is missing', () => {
    const wrapper = mount(ShowCard, {
      props: { show: { ...show, image: null, rating: { average: null } } },
      ...withRouter(),
    })

    expect(wrapper.get('[data-testid="show-image-placeholder"]').text()).toBe('No image')
    expect(wrapper.get('[data-testid="rating-badge"]').text()).toBe('Unrated')
  })

  it('renders a router link when a target is given', () => {
    const wrapper = mount(ShowCard, { props: { show, to: '/shows/42' }, ...withRouter() })
    const card = wrapper.get('[data-testid="show-card"]')

    expect(card.element.tagName).toBe('A')
    expect(card.attributes('href')).toBe('/shows/42')
  })

  it('renders a plain div without a target', () => {
    const wrapper = mount(ShowCard, { props: { show }, ...withRouter() })
    const card = wrapper.get('[data-testid="show-card"]')

    expect(card.element.tagName).toBe('DIV')
    expect(card.attributes('href')).toBeUndefined()
  })

  it('keeps a visible keyboard focus ring', () => {
    const wrapper = mount(ShowCard, { props: { show, to: '/shows/42' }, ...withRouter() })
    const classes = wrapper.get('[data-testid="show-card"]').classes()

    expect(classes).not.toContain('focus-visible:outline-none')
    expect(classes).toContain('focus-visible:outline-2')
  })
})

describe('ShowCardGrid', () => {
  it('renders a labelled list of cards with links', () => {
    const wrapper = mount(ShowCardGrid, {
      props: {
        shows: [show, { id: 2, name: 'Second', rating: { average: 9 }, image: null }],
        label: 'Search results',
        getShowLink: (s: ShowCardModel) => `/shows/${s.id}`,
      },
      ...withRouter(),
    })

    const grid = wrapper.get('[data-testid="show-card-grid"]')
    expect(grid.attributes('aria-label')).toBe('Search results')
    expect(wrapper.findAll('[data-testid="show-card"]')).toHaveLength(2)
    expect(wrapper.findAll('[data-testid="show-card"]')[0].attributes('href')).toBe('/shows/42')
  })

  it('falls back to a generic label and no links', () => {
    const wrapper = mount(ShowCardGrid, { props: { shows: [show] }, ...withRouter() })

    expect(wrapper.get('[data-testid="show-card-grid"]').attributes('aria-label')).toBe('Shows')
    expect(wrapper.get('[data-testid="show-card"]').element.tagName).toBe('DIV')
  })

  it('renders nothing when the list is empty', () => {
    const wrapper = mount(ShowCardGrid, { props: { shows: [] }, ...withRouter() })
    expect(wrapper.find('[data-testid="show-card-grid"]').exists()).toBe(false)
  })
})

describe('EmptyState', () => {
  it('renders a title only', () => {
    const wrapper = mount(EmptyState, { props: { title: 'No shows found' } })

    expect(wrapper.get('h2').text()).toBe('No shows found')
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('renders a message and slot content', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'Page not found', message: 'That link goes nowhere.' },
      slots: { default: '<a href="/">Home</a>' },
    })

    expect(wrapper.get('p').text()).toBe('That link goes nowhere.')
    expect(wrapper.get('a').text()).toBe('Home')
  })
})

describe('ErrorBanner', () => {
  it('announces the message and emits retry', async () => {
    const wrapper = mount(ErrorBanner, { props: { message: 'Search failed.' } })
    const banner = wrapper.get('[data-testid="error-banner"]')

    expect(banner.attributes('role')).toBe('alert')
    expect(banner.text()).toContain('Search failed.')
    expect(banner.classes()).toContain('mx-4')

    await wrapper.get('[data-testid="error-retry"]').trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('uses a default action label and supports overrides', () => {
    expect(mount(ErrorBanner, { props: { message: 'x' } }).get('[data-testid="error-retry"]').text()).toBe(
      'Try again',
    )

    const custom = mount(ErrorBanner, { props: { message: 'x', actionLabel: 'Retry now' } })
    expect(custom.get('[data-testid="error-retry"]').text()).toBe('Retry now')
  })

  it('drops outer margins when flush', () => {
    const wrapper = mount(ErrorBanner, { props: { message: 'x', flush: true } })
    expect(wrapper.get('[data-testid="error-banner"]').classes()).not.toContain('mx-4')
  })
})

describe('SkeletonRow', () => {
  it('renders six hidden placeholders by default', () => {
    const wrapper = mount(SkeletonRow)
    const row = wrapper.get('[data-testid="skeleton-row"]')

    expect(row.attributes('aria-hidden')).toBe('true')
    expect(wrapper.findAll('.tv-skeleton')).toHaveLength(7)
    expect(row.get('.h-6').classes()).toContain('mx-4')
  })

  it('honours a custom count and flush padding', () => {
    const wrapper = mount(SkeletonRow, { props: { count: 4, flush: true } })

    expect(wrapper.findAll('.tv-skeleton')).toHaveLength(5)
    expect(wrapper.get('.h-6').classes()).not.toContain('mx-4')
  })
})
