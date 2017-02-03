import React from 'react'

import Loader from './../../general/loader.jsx'
import {Trophy} from './../../general/icons.jsx'
import {Model, Collection} from './../../../models/weekly_win.js'
import Base from './../base/index.jsx'
import Win from './win.jsx'

export default class WeeklyWins extends Base {
  constructor (props) {
    super(props)
    this.state = {
      activeEdition: ''
    }
  }

  render () {
    return (
      <div className='page page--weekly-wins'>
        <div className='page__content'>
          <div className='page__content__logo'>
            <Trophy />
          </div>
          <h1 className='title'>Weekly Wins</h1>
          { this.renderAddButton() }
          <select value={this.state.activeEdition} onChange={this.setActiveEdition.bind(this)}>
            { this.renderWinOptions() }
          </select>
          { this.renderWins() }
        </div>
      </div>
    )
  }

  renderWins () {
    const {weeklyWins} = this.state
    if (!weeklyWins) { return (<Loader />) }
    return weeklyWins.map((win, i) => {
      return (
        <Win
          history={this.props.history}
          win={win}
          activeEdition={this.state.activeEdition}
          key={i}
        />
      )
    })
  }

  renderWinOptions () {
    const { weeklyWins } = this.state
    if (!weeklyWins) { return }
    return weeklyWins.map((win, i) => {
      const val = `Edition ${win.get('edition')}: ${win.get('title')}`
      return (
        <option value={win.get('edition')} key={i}>{ val }</option>
      )
    })
  }

  navigateToAdd () {
    this.props.history.pushState(null, Model.prototype.getNewUrl())
  }

  componentDidMount () {
    new Collection().getClientFetchPromise().then((coll) => {
      const lastModel = coll.models[coll.models.length - 1]
      const activeEdition = lastModel ? parseInt(lastModel.get('edition'), 10) : undefined
      this.setState({
        weeklyWins: coll,
        activeEdition: activeEdition
      })
    })
  }

  setActiveEdition (e) {
    this.setState({ activeEdition: parseInt(e.nativeEvent.target.value, 10) })
  }
}
