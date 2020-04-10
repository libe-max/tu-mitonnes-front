import React from 'react'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'

/*
 *   ARTICLES
 *   ------------------------------------------------------
 *
 *   PROPS
 *   article
 *   
 */

export default function ArticleTile (props) {
  /* * * * * * * * * * * * * * * *
   *
   * PROPS & STATE
   *
   * * * * * * * * * * * * * * * */
  const c = `${window.APP_GLOBAL.root_class}__article-tile`
  const { article } = props

  /* * * * * * * * * * * * * * * *
   *
   * LOGIC
   *
   * * * * * * * * * * * * * * * */
  const style = {
    backgroundImage: `url(${article.call_photo_url})`
  }

  /* * * * * * * * * * * * * * * *
   *
   * CSS CLASSES
   *
   * * * * * * * * * * * * * * * */
  const classes = [c]

  return <div
    style={style}
    className={classes.join(' ')}>
    <div className={`${c}_content`}>
      <Paragraph>{
        article.title
      }</Paragraph>
    </div>
  </div>
}
