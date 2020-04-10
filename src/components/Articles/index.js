import React, { useEffect, useRef } from 'react'
import ArticleTile from '../ArticleTile'

/*
 *   ARTICLES
 *   ------------------------------------------------------
 *
 *   PROPS
 *   articles, displayMoreEntries
 *   
 */

export default function Articles (props) {
  /* * * * * * * * * * * * * * * *
   *
   * PROPS & STATE
   *
   * * * * * * * * * * * * * * * */
  const c = `${window.APP_GLOBAL.root_class}__articles`
  const { articles, displayMoreEntries } = props

  /* * * * * * * * * * * * * * * *
   *
   * LOGIC
   *
   * * * * * * * * * * * * * * * */
  const loadMoreButton = useRef()

  /* * * * * * * * * * * * * * * *
   *
   * EFFECTS
   *
   * * * * * * * * * * * * * * * */
  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibilityEvent)
    observer.observe(loadMoreButton.current)
  }, [])

  /* * * * * * * * * * * * * * * *
   *
   * HANDLERS
   *
   * * * * * * * * * * * * * * * */
  function handleVisibilityEvent (entries) {
    if (!entries[0].isIntersecting) return
    displayMoreEntries()
  }

  function handleDisplayMoreEntries (e) {
    if (!e) return
    displayMoreEntries()
  }

  /* * * * * * * * * * * * * * * *
   *
   * ASSIGN CLASSES
   *
   * * * * * * * * * * * * * * * */
  const classes = [c]

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  return <div className={classes.join(' ')}>{
    articles.map(article => {
      return <ArticleTile
        c={c}
        key={article.id}
        article={article} />
    })}
    <button
      ref={loadMoreButton}
      onClick={handleDisplayMoreEntries}>
      Afficher plus
    </button>
  </div>  
}
