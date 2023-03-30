import { it, describe } from 'mocha'
import { expect } from 'chai'
import * as RequestParser from './RequestParser'
import Pet from './Pet'

describe('RequestParser', () => {
  it('parsePetId should throw an error on invalid input', () => {
    expect(RequestParser.parsePetId({ petId: 2 })).equals(2)
    expect(() => RequestParser.parsePetId(undefined)).to.throw(Error, /petId/)
    expect(() => RequestParser.parsePetId({ petId: undefined })).to.throw(Error, /petId/)
    expect(() => RequestParser.parsePetId({ petId: false })).to.throw(Error, /petId/)
    expect(() => RequestParser.parsePetId({ petId: true })).to.throw(Error, /petId/)
    expect(() => RequestParser.parsePetId({ petId: 'ABC' })).to.throw(Error, /petId/)
  })

  it('parsePet should throw an error on invalid input', () => {
    /**
     * what we get from an untyped request
     */
    interface DirtyPetObject {
      id?: number | string
      name?: string
      tag?: string
    }

    const petObj: DirtyPetObject = {
      id: 1,
      name: 'Horse',
      tag: 'Mammal'
    }
    expect(RequestParser.parsePet(petObj)).is.instanceof(Pet)
    petObj.id = undefined
    expect(() => RequestParser.parsePet(petObj)).to.throw(Error, /pet id/)
    petObj.id = 'ABC'
    expect(() => RequestParser.parsePet(petObj)).to.throw(Error, /pet id/)
    petObj.id = 1
    petObj.name = undefined
    expect(() => RequestParser.parsePet(petObj)).to.throw(Error, /pet name/)
    petObj.name = 'Horse'
    petObj.tag = undefined
    expect(() => RequestParser.parsePet(petObj)).to.throw(Error, /pet tag/)
  })
})
