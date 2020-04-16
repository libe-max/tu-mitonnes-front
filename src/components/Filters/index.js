import React, { useState, useEffect, useRef } from 'react'
import ParagraphTitle from 'libe-components/lib/text-levels/ParagraphTitle'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import Svg from 'libe-components/lib/primitives/Svg'

/*
 *   FILTERS
 *   ------------------------------------------------------
 *
 *   PROPS
 *   categories, activeFilters, applyFilter, resetFilters
 *   
 */

export default function Filters (props) {
  /* * * * * * * * * * * * * * * *
   *
   * PROPS & STATE
   *
   * * * * * * * * * * * * * * * */
  const c = `${window.APP_GLOBAL.root_class}__filters`
  const { categories, activeFilters, applyFilter, resetFilters } = props
  const {
    season: activeSeason
  } = activeFilters
  const [isOpen, setIsOpen] = useState(false)

  /* * * * * * * * * * * * * * * *
   *
   * LOGIC
   *
   * * * * * * * * * * * * * * * */
  const seasonListRef = useRef(null)
  const style = { top: `${window.LBLB_GLOBAL.body_padding_top || 0}px` }

  /* * * * * * * * * * * * * * * *
   *
   * HANDLERS
   *
   * * * * * * * * * * * * * * * */
  function handleSeasonChange (e) {
    applyFilter('season', e.target.value)
  }

  function handleResetClick (e) {
    resetFilters()
    closePanel()
  }

  function handleOpenButtonClick (e) {
    e.stopPropagation()
    togglePanel()
  }

  function handleCloseButtonClick (e) {
    e.stopPropagation()
    togglePanel()
  }

  function handleTitleAndActionsClick (e) {
    e.stopPropagation()
    togglePanel()
  }

  /* * * * * * * * * * * * * * * *
   *
   * METHODS
   *
   * * * * * * * * * * * * * * * */
  function togglePanel () {
    setIsOpen(current => !current)
  }

  function openPanel () {
    setIsOpen(true)
  }

  function closePanel () {
    setIsOpen(false)
  }

  /* * * * * * * * * * * * * * * *
   *
   * EFFECTS
   *
   * * * * * * * * * * * * * * * */
  useEffect(() => {
    seasonListRef.current.value = activeFilters.season
  }, [activeSeason])

  /* * * * * * * * * * * * * * * *
   *
   * CSS CLASSES
   *
   * * * * * * * * * * * * * * * */
  const classes = [c]
  if (isOpen) classes.push(`${c}_is-open`)

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  return <div
    style={style}
    className={classes.join(' ')}>
    <span
      onClick={handleTitleAndActionsClick}
      className={`${c}__title-and-actions`}>
      <span className={`${c}__title`}>
        <ParagraphTitle>Filtres</ParagraphTitle>
      </span>
      <span className={`${c}__actions`}>
        <span className={`${c}__open`}>
          <button onClick={handleOpenButtonClick}>
            <Svg src='https://www.liberation.fr/apps/static/assets/down-arrow-head-icon_24.svg' />
          </button>
        </span>
        <span className={`${c}__close`}>
          <button onClick={handleCloseButtonClick}>
            <Svg src='https://www.liberation.fr/apps/static/assets/up-arrow-head-icon_24.svg' />
          </button>
        </span>
      </span>
    </span>
    <span className={`${c}__filter`}>
      <Paragraph>par saison</Paragraph>
      <select
        defaultValue='-'
        ref={seasonListRef}
        onChange={handleSeasonChange}>
        <option value='-'>Tous</option>
        {categories.season.map(opt => (
          <option
            key={opt}
            value={opt}>
            {`${opt.slice(0, 1).toUpperCase()}${opt.slice(1)}`}
          </option>
        ))}
      </select>
    </span>
    <span className={`${c}__reset`}>
      <Paragraph>
        <a onClick={handleResetClick}>Réinitialiser</a>
      </Paragraph>
    </span>
  </div>
}
