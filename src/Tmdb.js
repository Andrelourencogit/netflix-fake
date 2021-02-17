const API_KEY = '3794f8f34019bd969efa55f4454cc301'
const API_BASE = 'https://api.themoviedb.org/3'

/*
- originais da Netflix
- reconmendados (Trending)
- em alta (top rated)
- ação
- comédia 
- romance
- documentarios

*/

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`)
  const json = await req.json()
  return json
} 
export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais da Netflix',
        items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'trending',
        title: 'Recomendados para você',
        items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'toprated',
        title: 'Em alta',
        items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`/discover/movie?with_genrtes=28&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`/discover/movie?with_genrtes=35&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(`/discover/movie?with_genrtes=27&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genrtes=10749&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(`/discover/movie?with_genrtes=99&language=pt-BR&api_key=${API_KEY}`)
      },
    ]
  },
  getMovieInfo: async (movieId, type) => {
    let info = {}
    if(movieId) {
      switch(type) {
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        break
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        break
        default:
          info = null
        break
      }
    }
    return info
  } 
}