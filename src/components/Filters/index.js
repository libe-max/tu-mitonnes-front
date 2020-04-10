import React, { useRef } from 'react'
import ParagraphTitle from 'libe-components/lib/text-levels/ParagraphTitle'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'

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
    ingredients: activeIngredient,
    dish_type: activeDishType,
    season: activeSeason
  } = activeFilters

  /* * * * * * * * * * * * * * * *
   *
   * LOGIC
   *
   * * * * * * * * * * * * * * * */
  const ingredientsListRef = useRef(null)
  const dishTypeListRef = useRef(null)
  const seasonListRef = useRef(null)

  /* * * * * * * * * * * * * * * *
   *
   * HANDLERS
   *
   * * * * * * * * * * * * * * * */
  function handleIngredientsChange (e) {
    if (!e || !e.target) return
    applyFilter('ingredients', e.target.value)
  }

  function handleDishTypeChange (e) {
    if (!e || !e.target) return
    applyFilter('dish_type', e.target.value)
  }

  function handleSeasonChange (e) {
    if (!e || !e.target) return
    applyFilter('season', e.target.value)
  }

  function handleResetClick (e) {
    if (!e || !e.target) return
    ingredientsListRef.current.value = '-'
    dishTypeListRef.current.value = '-'
    seasonListRef.current.value = '-'
    resetFilters()
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
  return <div className={classes.join(' ')}>
    <ParagraphTitle>Filtres</ParagraphTitle>
    <Paragraph>Ingrédients :</Paragraph>
    <select
      defaultValue='-'
      ref={ingredientsListRef}
      onChange={handleIngredientsChange}>
      <option value='-'>Tous</option>
      {categories.ingredients.map(opt => (
        <option
          key={opt}
          value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <Paragraph>Type de plat :</Paragraph>
    <select
      defaultValue='-'
      ref={dishTypeListRef}
      onChange={handleDishTypeChange}>
      <option value='-'>Tous</option>
      {categories.dish_type.map(opt => (
        <option
          key={opt}
          value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <Paragraph>Saison :</Paragraph>
    <select
      defaultValue='-'
      ref={seasonListRef}
      onChange={handleSeasonChange}>
      <option value='-'>Tous</option>
      {categories.season.map(opt => (
        <option
          key={opt}
          value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <button onClick={handleResetClick}>
      Réinitialiser
    </button>
  </div>
}
