import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowCard from './ShowCard.vue'
import GenreRow from '../organisms/GenreRow.vue'
import type { ShowCardModel } from '../../types'

const show: ShowCardModel = {
  id: 42,
  name: 'Under the Dome',
  rating: { average: 6.5 },
  image: { medium: 'https://example.com/poster.jpg' },
}

describe('ShowCard', () => {
  it('renders name, rating and image', () => {
    const wrapper = mount(ShowCard, { props: { show } })
    expect(wrapper.get('[data-testid="show-name"]').text()).toBe('Under the Dome')
    expect(wrapper.get('[data-testid="rating-badge"]').text()).toContain('6.5')
    expect(wrapper.get('[data-testid="show-image"]').attributes('alt')).toBe(
      'Poster for Under the Dome',
    )
  })

  it('shows placeholder when image is missing', () => {
    const wrapper = mount(ShowCard, {
      props: { show: { ...show, image: null, rating: { average: null } } },
    })
    expect(wrapper.get('[data-testid="show-image-placeholder"]').text()).toBe('No image')
    expect(wrapper.get('[data-testid="rating-badge"]').text()).toBe('Unrated')
  })
})

describe('GenreRow', () => {
  it('renders category and show cards in order', () => {
    const shows = [
      show,
      { id: 2, name: 'Second', rating: { average: 9 }, image: null },
    ]
    const wrapper = mount(GenreRow, {
      props: {
        category: 'Drama',
        shows,
        getShowLink: (s) => `#/shows/${s.id}`,
      },
    })
    expect(wrapper.get('[data-testid="genre-title"]').text()).toBe('Drama')
    const cards = wrapper.findAll('[data-testid="show-card"]')
    expect(cards).toHaveLength(2)
    expect(cards[0].attributes('href')).toBe('#/shows/42')
  })

  it('renders nothing when the list is empty', () => {
    const wrapper = mount(GenreRow, {
      props: { category: 'Sports', shows: [] },
    })
    expect(wrapper.find('[data-testid="genre-row"]').exists()).toBe(false)
  })
})
