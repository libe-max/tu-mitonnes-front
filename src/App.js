import React, { Component } from 'react'
import Loader from 'libe-components/lib/blocks/Loader'
import LoadingError from 'libe-components/lib/blocks/LoadingError'
import ShareArticle from 'libe-components/lib/blocks/ShareArticle'
import LibeLaboLogo from 'libe-components/lib/blocks/LibeLaboLogo'
import ArticleMeta from 'libe-components/lib/blocks/ArticleMeta'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import { parseTsv } from 'libe-utils'
import Header from './components/Header'
import Filters from './components/Filters'
import Articles from './components/Articles'

window.APP_GLOBAL = {
  root_class: 'lblb-tu-mitonnes'
}

export default class App extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = window.APP_GLOBAL.root_class
    this.state = {
      loading_sheet: true,
      error_sheet: null,
      data_sheet: [],
      active_filters: {},
      nb_articles_shown: 8,
      keystrokes_history: [],
      konami_mode: false
    }
    this.fetchSheet = this.fetchSheet.bind(this)
    this.fetchCredentials = this.fetchCredentials.bind(this)
    this.listenToKeyStrokes = this.listenToKeyStrokes.bind(this)
    this.watchKonamiCode = this.watchKonamiCode.bind(this)
    this.addCategoriesToData = this.addCategoriesToData.bind(this)
    this.listCategoriesOptions = this.listCategoriesOptions.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
    this.displayMoreEntries = this.displayMoreEntries.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    document.addEventListener('keydown', this.listenToKeyStrokes)
    this.fetchCredentials()
    if (this.props.spreadsheet) return this.fetchSheet()
    return this.setState({ loading_sheet: false })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    document.removeEventListener('keydown', this.listenToKeyStrokes)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * SHOULD UPDATE
   *
   * * * * * * * * * * * * * * * * */
  shouldComponentUpdate (props, nextState) {
    const changedKeys = []
    Object.keys(nextState).forEach(key => {
      if (this.state[key] !== nextState[key]) changedKeys.push(key)
    })
    if (changedKeys.length === 1 &&
      changedKeys.includes('keystrokes_history')) return false
    return true
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH CREDENTIALS
   *
   * * * * * * * * * * * * * * * * */
  async fetchCredentials () {
    const { api_url } = this.props
    const { format, article } = this.props.tracking
    const api = `${api_url}/${format}/${article}/load`
    try {
      const reach = await window.fetch(api, { method: 'POST' })
      const response = await reach.json()
      const { lblb_tracking, lblb_posting } = response._credentials
      if (!window.LBLB_GLOBAL) window.LBLB_GLOBAL = {}
      window.LBLB_GLOBAL.lblb_tracking = lblb_tracking
      window.LBLB_GLOBAL.lblb_posting = lblb_posting
      return { lblb_tracking, lblb_posting }
    } catch (error) {
      console.error('Unable to fetch credentials:')
      console.error(error)
      return Error(error)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH SHEET
   *
   * * * * * * * * * * * * * * * * */
  async fetchSheet () {
    this.setState({ loading_sheet: true, error_sheet: null })
    const sheet = this.props.spreadsheet
    try {
      const reach = await window.fetch(this.props.spreadsheet)
      if (!reach.ok) throw reach
      const data = await reach.text()
      const parsedData = parseTsv(data, [20])[0]//.filter(article => article.ok === '1')
      const articles = this.addCategoriesToData(parsedData)
      const categories = this.listCategoriesOptions(articles)
      const defaultActiveFilters = {}
      Object.keys(categories).forEach(category => {
        defaultActiveFilters[category] = '-'
      })
      this.setState({
        loading_sheet: false,
        error_sheet: null,
        data_sheet: { articles, categories },
        active_filters: defaultActiveFilters
      })
      return data
    } catch (error) {
      if (error.status) {
        const text = `${error.status} error while fetching : ${sheet}`
        this.setState({ loading_sheet: false, error_sheet: error })
        console.error(text, error)
        return Error(text)
      } else {
        this.setState({ loading_sheet: false, error_sheet: error })
        console.error(error)
        return Error(error)
      }
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * START LISTENING KEYSTROKES
   *
   * * * * * * * * * * * * * * * * */
  listenToKeyStrokes (e) {
    if (!e || !e.keyCode) return
    const currHistory = this.state.keystrokes_history
    const newHistory = [...currHistory, e.keyCode]
    this.setState({ keystrokes_history: newHistory })
    this.watchKonamiCode()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WATCH KONAMI CODE
   *
   * * * * * * * * * * * * * * * * */
  watchKonamiCode () {
    const konamiCodeStr = '38,38,40,40,37,39,37,39,66,65'
    const lastTenKeys = this.state.keystrokes_history.slice(-10)
    if (lastTenKeys.join(',') === konamiCodeStr) this.setState({ konami_mode: true })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * ADD CATEGORIES TO DATA
   *
   * * * * * * * * * * * * * * * * */
  addCategoriesToData (data) {
    const categoriezed = data.map(article => {
      // const ingredients = article.ingredients.split(',').map(chunk => chunk.trim()).filter(e => e)
      // const dishType = article.dish_type.split(',').map(chunk => chunk.trim()).filter(e => e)
      const season = article.season.split(',').map(chunk => chunk.trim()).filter(e => e)
      return {
        ...article,
        // _ingredients: ingredients,
        // _dish_type: dishType,
        _season: season
      }
    })
    return categoriezed
  }

  /* * * * * * * * * * * * * * * * *
   *
   * LIST CATEGORIES OPTIONS
   *
   * * * * * * * * * * * * * * * * */
  listCategoriesOptions (data) {
    // const ingredientsList = []
    // const dishTypeList = []
    const seasonList = []
    data.forEach(article => {
      // article._ingredients.forEach(ingredient => {
      //   if (!ingredientsList.find(e => e === ingredient)) {
      //     ingredientsList.push(ingredient)
      //   }
      // })
      // article._dish_type.forEach(dishType => {
      //   if (!dishTypeList.find(e => e === dishType)) {
      //     dishTypeList.push(dishType)
      //   }
      // })
      article._season.forEach(season => {
        if (!seasonList.find(e => e === season)) {
          seasonList.push(season)
        }
      })
    })
    return {
      // ingredients: ingredientsList,
      // dish_type: dishTypeList,
      season: seasonList
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * APPLY FILTER
   *
   * * * * * * * * * * * * * * * * */
  applyFilter (category, value) {
    this.setState(current => {
      return {
        ...current,
        active_filters: {
          ...current.active_filters,
          [category]: value
        }
      }
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RESET FILTERS
   *
   * * * * * * * * * * * * * * * * */
  resetFilters () {
    this.setState(current => {
      const newActiveFilters = {}
      Object
        .keys(current.active_filters)
        .forEach(category => { newActiveFilters[category] = '-' })
      return {
        ...current,
        active_filters: newActiveFilters
      }
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DISPLAY MORE ENTRIES
   *
   * * * * * * * * * * * * * * * * */
  displayMoreEntries () {
    this.setState(current => ({
      ...current,
      nb_articles_shown: current.nb_articles_shown + 5      
    }))
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, state, props } = this

    /* Inner logic */
    const {
      data_sheet: data,
      active_filters: activeFilters,
      nb_articles_shown: nbArticlesShown
    } = state
    const {
      articles,
      categories
    } = data
    const {
      ingredients: activeIngredient,
      dish_type: activeDishType,
      season: activeSeason
    } = activeFilters
    const filteredArticles = (articles || []).filter(article => {
      // const hasCurrentIngredient = (activeIngredient === '-' || article._ingredients.find(e => e === activeIngredient))
      // const hasCurrentDishType = (activeDishType === '-' || article._dish_type.find(e => e === activeDishType))
      const hasCurrentSeason = (activeSeason === '-' || article._season.find(e => e === activeSeason))
      // return hasCurrentIngredient && hasCurrentDishType && hasCurrentSeason
      return hasCurrentSeason
    })
    const slicedArticles = filteredArticles.slice(0, nbArticlesShown)
    const someRandomArticles = (articles || [])
      .map(e => ({ value: e, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(e => e.value)
      .slice(0, 12)
    const articlesToDisplay = slicedArticles.length ? slicedArticles : someRandomArticles

    /* Assign classes */
    const classes = [c]
    if (state.loading_sheet) classes.push(`${c}_loading`)
    if (state.error_sheet) classes.push(`${c}_error`)

    /* Load & errors */
    if (state.loading_sheet) return <div className={classes.join(' ')}><div className='lblb-default-apps-loader'><Loader /></div></div>
    if (state.error_sheet) return <div className={classes.join(' ')}><div className='lblb-default-apps-error'><LoadingError /></div></div>

    /* Display component */
    return <div className={classes.join(' ')}>
      <Header
        tweet={props.meta.tweet}
        url={props.meta.url} />
      <Filters
        categories={categories}
        activeFilters={activeFilters}
        applyFilter={this.applyFilter}
        resetFilters={this.resetFilters} />
      {!slicedArticles.length && <span className={`${c}__no-filter-result`}>
        <Paragraph>
          Aucune recette ne correspond à vos critères. En voici quelques unes au hasard.
        </Paragraph>
      </span>}
      <Articles
        articles={articlesToDisplay}
        displayMoreEntries={this.displayMoreEntries}
        showLoadMore={slicedArticles.length !== filteredArticles.length} />
      {!slicedArticles.length && <span className={`${c}__no-filter-result`}>
        <Paragraph>
          Aucune recette ne correspond à vos critères. Ci-dessus, quelques unes au hasard.
        </Paragraph>
      </span>}
      <div className='lblb-default-apps-footer'>
        <ShareArticle short iconsOnly tweet={props.meta.tweet} url={props.meta.url} />
        <ArticleMeta
          authors={[{
            name: 'Libé Labo',
            role: 'Production',
            link: 'https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538'
          }]} />
        <LibeLaboLogo target='blank' />
      </div>
    </div>
  }
}
