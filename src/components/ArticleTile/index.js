import React, { useState, useEffect } from 'react'
import chroma from 'chroma-js'
import colors from 'colors'
import SectionTitle from 'libe-components/lib/text-levels/SectionTitle'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import Slug from 'libe-components/lib/text-levels/Slug'

/*
 *   ARTICLE TILE
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
  const [colors, setColors] = useState(['#FAFAFA', '#e91845', '#333333'])

  /* * * * * * * * * * * * * * * *
   *
   * EFFECTS
   *
   * * * * * * * * * * * * * * * */
  // Define colors when mounting
  useEffect(() => {
    const possibleBgColors = article.call_photo_colors.split(',').map(color => color.trim())
    if (possibleBgColors.length !== 5) return

    const mostVivid = possibleBgColors.map(hex => {
      const color = chroma(hex)
      const [h, s, l] = color.hsl()
      const distToAvgL = Math.random() // Math.abs(l - .5) * (s / 2)
      return { hex, distToAvgL }
    }).sort((a, b) => a.distToAvgL - b.distToAvgL)[0].hex
    const twoBestContrasts = possibleBgColors.map(hex => {
      const color = chroma(hex)
      const contrast = chroma.contrast(hex, mostVivid)
      return { hex, contrast }
    }).sort((a, b) => b.contrast - a.contrast)
      .slice(0, 2)
      .map(val => val.hex)
    const finalColorList = possibleBgColors.map(hex => {
      const color = chroma(hex)
      const isContrast = twoBestContrasts.indexOf(hex) !== -1
      const isVivid = hex === mostVivid
      return { hex, color, isContrast, isVivid }
    })
    setColors([mostVivid, ...twoBestContrasts])
  }, [])

  const wrapperStyle = { backgroundColor: colors[1], backgroundImage: `url(${article.call_photo_url})` }
  const hoverBoxStyle = { backgroundColor: colors[1] }
  const textStyle = { color: colors[0], textShadow: `.125rem .125rem 0 ${colors[2]}` }
  const tagStyle = { color: colors[2], backgroundColor: colors[0], }
  const linkStyle = { color: colors[0], borderBottomColor: colors[2], }

  /* * * * * * * * * * * * * * * *
   *
   * HANDLERS
   *
   * * * * * * * * * * * * * * * */
  function handleTileClick (e) {
    openArticleInNewTab()
  }

  /* * * * * * * * * * * * * * * *
   *
   * METHODS
   *
   * * * * * * * * * * * * * * * */
  function openArticleInNewTab () {
    window.open(article.url, '_blank')
  }

  /* * * * * * * * * * * * * * * *
   *
   * CSS CLASSES
   *
   * * * * * * * * * * * * * * * */
  const classes = [c]

  return <div
    style={wrapperStyle}
    onClick={handleTileClick}
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
        {article.slug && <span className={`${c}__tag`}>
          <Slug style={tagStyle}>{article.slug}</Slug>
        </span>}
      </div>
      <div className={`${c}__open-article`}>
        <Paragraph><a style={linkStyle}>Lire l'article</a></Paragraph>
      </div>
    </div>
  </div>
}
