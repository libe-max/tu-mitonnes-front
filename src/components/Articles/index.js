import React, { useEffect, useRef } from 'react'
import ArticleTile from '../ArticleTile'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'

/*
 *   ARTICLES
 *   ------------------------------------------------------
 *
 *   PROPS
 *   articles, displayMoreEntries, showLoadMore
 *   
 */

export default function Articles (props) {
  /* * * * * * * * * * * * * * * *
   *
   * PROPS & STATE
   *
   * * * * * * * * * * * * * * * */
  const c = `${window.APP_GLOBAL.root_class}__articles`
  const { articles, displayMoreEntries, showLoadMore } = props

  /* * * * * * * * * * * * * * * *
   *
   * LOGIC
   *
   * * * * * * * * * * * * * * * */
  const loadMoreButton = useRef()
  const everythingIsLoaded = 

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
  if (showLoadMore) classes.push(`${c}_show-load-more`)

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  return <div className={classes.join(' ')}>
    <div className={`${c}__tiles`}>{
      articles.map(article => {
        return <ArticleTile
          c={c}
          key={article.id}
          article={article} />
      })}
    </div>
    <div className={`${c}__load-more`}>
      <Paragraph>
        <a
          ref={loadMoreButton}
          onClick={handleDisplayMoreEntries}>
          Afficher plus
        </a>
      </Paragraph>
    </div>
  </div>  
}
