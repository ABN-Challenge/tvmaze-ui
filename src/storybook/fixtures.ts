import type { ShowCardModel } from '../types'

export const demoShow: ShowCardModel = {
  id: 1,
  name: 'Band of Brothers',
  rating: { average: 9.0 },
  genres: ['Drama', 'Action', 'War'],
  status: 'Ended',
  premiered: '2001-09-09',
  summary:
    '<p>Drawn from interviews with survivors of Easy Company, <b>Band of Brothers</b> chronicles their experiences.</p>',
  officialSite: 'https://www.hbo.com/',
  network: { name: 'HBO' },
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/81.jpg',
    original: 'https://static.tvmaze.com/uploads/images/original_untouched/0/81.jpg',
  },
}

export const unratedShow: ShowCardModel = {
  id: 2,
  name: 'Unrated Demo',
  rating: { average: null },
  image: null,
}

export const demoShows: ShowCardModel[] = [
  demoShow,
  {
    id: 3,
    name: 'Person of Interest',
    rating: { average: 8.8 },
    image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg' },
  },
  unratedShow,
]
