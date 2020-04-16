import React from 'react'
import Slug from 'libe-components/lib/text-levels/Slug'
import InterTitle from 'libe-components/lib/text-levels/InterTitle'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import Svg from 'libe-components/lib/primitives/Svg'
import JSXInterpreter from 'libe-components/lib/logic/JSXInterpreter'

/*
 *   FULL ARTICLE
 *   ------------------------------------------------------
 *
 *   PROPS
 *   article, closeArticle
 *   
 */

export default function FullArticle (props) {
  /* * * * * * * * * * * * * * * *
   *
   * PROPS & STATE
   *
   * * * * * * * * * * * * * * * */
  const c = `${window.APP_GLOBAL.root_class}__full-article`
  const { article, closeArticle } = props

  /* * * * * * * * * * * * * * * *
   *
   * LOGIC
   *
   * * * * * * * * * * * * * * * */
  const style = {
    top: `${window.LBLB_GLOBAL.nav_height}px`,
    height: `calc(100vh - ${window.LBLB_GLOBAL.nav_height}px)`
  }
  const buttonStyle = {
    top: `calc(${window.LBLB_GLOBAL.nav_height}px + 2rem)`,
  }

  /* * * * * * * * * * * * * * * *
   *
   * CSS CLASSES
   *
   * * * * * * * * * * * * * * * */
  const classes = [c]

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  return <div
    style={style}
    className={classes.join(' ')}>
    <div className={`${c}__inner`}>
      <button
        style={buttonStyle}
        onClick={closeArticle}>
        <Svg src='https://www.liberation.fr/apps/static/assets/left-arrow-head-icon_40.svg' />
      </button>
      <Slug>{article.slug}</Slug>
      <InterTitle>{article.title}</InterTitle>
      <Paragraph literary>Par {article.author}</Paragraph>
      <img style={{ display: 'block' }} src={article.call_photo_url} />
      <JSXInterpreter content={article.text} />
    </div>
  </div>
}
