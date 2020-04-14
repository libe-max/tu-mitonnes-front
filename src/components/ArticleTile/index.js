import React from 'react'
import SectionTitle from 'libe-components/lib/text-levels/SectionTitle'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import Slug from 'libe-components/lib/text-levels/Slug'

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
  const possibleBgColors = article.call_photo_colors.split(',').map(color => color.trim())
  const wrapperStyle = {
    backgroundColor: possibleBgColors.length ? possibleBgColors[1] : '#FAFAFA',
    backgroundImage: `url(${article.call_photo_url})`
  }
  const hoverBoxStyle = {
    backgroundColor: possibleBgColors.length ? possibleBgColors[1] : '#333333'
  }
  const textStyle = {
    color: possibleBgColors.length ? possibleBgColors[0] : '#FFFFFF',
    textShadow: `.125rem .125rem 0 ${possibleBgColors.length ? possibleBgColors[2] : '#333333'}`
  }
  const tagStyle = {
    color: possibleBgColors.length ? possibleBgColors[2] : '#333333',
    backgroundColor: possibleBgColors.length ? possibleBgColors[3] : '#FFFFFF',
  }
  const linkStyle = {
    color: possibleBgColors.length ? possibleBgColors[3] : '#FFFFFF',
    borderBottomColor: possibleBgColors.length ? possibleBgColors[3] : '#FFFFFF',
  }

  /* * * * * * * * * * * * * * * *
   *
   * CSS CLASSES
   *
   * * * * * * * * * * * * * * * */
  const classes = [c]

  return <div
    style={wrapperStyle}
    className={classes.join(' ')}>
    <div
      style={hoverBoxStyle}
      className={`${c}__shaded-hover-bg`}>
      &nbsp;
    </div>
    <div className={`${c}__content`}>
      <SectionTitle big>
        <span style={textStyle}>{article.title}</span>
      </SectionTitle>
      <div className={`${c}__tags`}>
        {article.dish_type && <span className={`${c}__tag`}>
          <Slug style={tagStyle}>{article.dish_type}</Slug>
        </span>}
        {article.season && <span className={`${c}__tag`}>
          <Slug style={tagStyle}>{article.season}</Slug>
        </span>}
        {article._ingredients.map(ingredient => (
          <span key={ingredient} className={`${c}__tag`}>
            <Slug style={tagStyle}>{ingredient}</Slug>
          </span>
        ))}
      </div>
      <div className={`${c}__open-article`}>
        <Paragraph><a style={linkStyle} href={article.url}>Lire l'article</a></Paragraph>
      </div>
    </div>
  </div>
}
