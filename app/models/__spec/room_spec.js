import 'babel-polyfill'

import assert from 'assert'
import mocha from 'mocha'
import { Model, Collection } from './room.js'

describe('Model', () => {
  it('it has an event system', () => {
    var model = new Model(),
      eventHasFired = false
    model.on('change', () => { eventHasFired = true })
    model.set('a', 'b')
    assert.equal(eventHasFired, true)
  })

  describe('getFloorId', () => {
    it('gets floor id for single-digit floor', () => {
      var model = new Model({ id: '801' })
      assert.equal(model.getFloorId(), 'dc_08')
    })

    it('gets floor id for double-digit floor', () => {
      var model = new Model({ id: '1001' })
      assert.equal(model.getFloorId(), 'dc_10')
    })
  })
})
