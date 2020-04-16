import React from 'react'
import ShareArticle from 'libe-components/lib/blocks/ShareArticle'
import Svg from 'libe-components/lib/primitives/Svg'
import PageTitle from 'libe-components/lib/text-levels/PageTitle'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'

/*
 *   HEADER
 *   ------------------------------------------------------
 *
 *   PROPS
 *   tweet, url
 *   
 */

export default function Header (props) {
  /* * * * * * * * * * * * * * * *
   *
   * PROPS & STATE
   *
   * * * * * * * * * * * * * * * */
  const c = `${window.APP_GLOBAL.root_class}__header`
  const { tweet, url } = props

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
  return <div className={classes.join(' ')}>
    <PageTitle small>Faites à la maison</PageTitle>
    <Paragraph literary>
      Musique, food, séries… retrouvez notre sélection d'articles utiles en cette période de confinement.
    </Paragraph>
    <ShareArticle short iconsOnly tweet={tweet} url={url} />
  </div>
}
