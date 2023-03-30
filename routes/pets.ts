import express, { Request, Response } from 'express'
import * as RequestParser from '../lib/RequestParser'
import PetStore from '../lib/PetStore'
import MockDatabase from '../lib/MockDatabase'
import asyncHanlder from 'express-async-handler'
const router = express.Router()
const mockDatabase = new MockDatabase()

router.get('/', asyncHanlder(async (req: Request, res: Response) => {
  const petStore = new PetStore(mockDatabase)
  const pets = petStore.findPets()
  res.status(200).json(pets)
}))

router.post('/', asyncHanlder(async (req: Request, res: Response) => {
  const pet = RequestParser.parsePet(req.body)
  const petStore = new PetStore(mockDatabase)
  petStore.insertPet(pet)
  res.status(201).send()
}))

router.get('/:petId', asyncHanlder(async (req: Request, res: Response) => {
  const petId = RequestParser.parsePetId(req.params)
  const petStore = new PetStore(mockDatabase)
  const pets = petStore.findPet(petId)
  res.status(200).send(pets)
}))

router.put('/:petId', asyncHanlder(async (req: Request, res: Response) => {
  const petId = RequestParser.parsePetId(req.params)
  const pet = RequestParser.parsePet(req.body)
  const petStore = new PetStore(mockDatabase)
  petStore.updatePet(petId, pet)
  res.status(200).send()
}))

router.delete('/:petId', asyncHanlder(async (req: Request, res: Response) => {
  const petId = RequestParser.parsePetId(req.params)
  const petStore = new PetStore(mockDatabase)
  petStore.deletePet(petId)
  res.status(200).send()
}))

export default router
