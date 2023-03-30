import { it, describe } from 'mocha'
import { expect } from 'chai'
import MockDatabase from './MockDatabase'

describe('MockDatabase', () => {
  it('should be defined', () => {
    expect(MockDatabase).to.be.a('Function')
  })
})
