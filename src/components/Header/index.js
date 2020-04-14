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
    <div className={`${c}__logo`}>
      <Svg src='./logo-tu-mitonnes.svg' />
    </div>
    <PageTitle small>le moteur<br/>de recherche</PageTitle>
    <Paragraph literary>
      Depuis 2009, les pages culinaires Tu mitonnes proposent découvertes gustatives et recettes, d'abord dans le journal, puis sur le site de Libération. Elles ont été rassemblées dans ce moteur de recherche, où des filtres permettent de faire varier les couleurs et les saisons. Jacky Durand aux textes et aux fourneaux, Emmanuel Pierrot aux gifs et aux photos.
      <br/><br/>
      <strong>Lire l'interview croisée :</strong>
      <br/><br/>
      <a href='https://next.liberation.fr/food/2016/09/13/quand-emmanuel-travaille-la-sardine-ou-le-maquereau-cela-ressemble-a-du-court-metrage_1484560'>«Quand Emmanuel travaille la sardine ou le maquereau, cela ressemble à du court-métrage»</a>
    </Paragraph>
    <ShareArticle short iconsOnly tweet={tweet} url={url} />
  </div>
}
