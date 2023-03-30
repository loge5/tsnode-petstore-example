import { it, describe } from 'mocha'
import { expect } from 'chai'
import DatabaseInterface from './DatabaseInterface'

describe('DatabaseInterface', () => {
  it('should be defined', () => {
    expect(DatabaseInterface).to.be.a('Function')
  })
})
