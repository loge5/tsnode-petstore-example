import { it, describe } from 'mocha'
import { expect } from 'chai'
import Pet from './Pet'

describe('Pet', () => {
  it('should be defined', () => {
    expect(Pet).to.be.a('Function')
  })
})
