import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeatureMovie from './components/FeatureMovie'
import Header from './components/Header'
import Footer from './components/Footer'


export default () => {

  const [movieList, setMovieList] = useState([])
  const [featureData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  
  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      // pegando o Featured
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeatureData(chosenInfo)
    }
    loadAll()
  }, [])

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])
  
  return (
    <div className="page">
      <Header black={blackHeader}/>
      
      {
        featureData &&
        <FeatureMovie item={featureData}/>
      }
      <section className="list">
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
      </section>
      
      <Footer/>

      {movieList.length <= 0 && 
        <div className="loading">
              <img src="http://cdn.lowgif.com/full/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="carregando"/>
        </div>
      }
    </div>
  )
}