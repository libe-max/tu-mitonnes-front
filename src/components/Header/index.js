import React from 'react'
import ShareArticle from 'libe-components/lib/blocks/ShareArticle'
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
    <PageTitle>Header</PageTitle>
    <Paragraph>Lorem ipsum dolor sit amet</Paragraph>
    <ShareArticle short iconsOnly tweet={tweet} url={url} />
  </div>
}
