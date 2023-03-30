import Pet from './Pet'
import DatabaseInterface from './DatabaseInterface'
import HttpError from './HttpError'

class PetStore {
  private readonly database: DatabaseInterface

  constructor (database: DatabaseInterface) {
    this.database = database
  }

  insertPet (pet: Pet): void {
    if (this.database.exists(pet.id)) {
      throw HttpError.fromStatus(409)
    }
    this.database.save(pet.id, pet)
  }

  updatePet (petId: number, pet: Pet): void {
    if (petId !== pet.id) {
      throw new HttpError('pet id is read only', 400)
    }
    this.database.save(petId, pet)
  }

  findPet (petId: number): Pet {
    if (!this.database.exists(petId)) {
      throw HttpError.fromStatus(404)
    }
    return this.database.find(petId)
  }

  deletePet (petId: number): void {
    if (!this.database.exists(petId)) {
      throw HttpError.fromStatus(404)
    }
    this.database.delete(petId)
  }

  findPets (): Pet[] {
    return this.database.findAll()
  }
}

export default PetStore
