import Pet from './Pet'
import HttpError from './HttpError'
const FluentValidator = require('another-fluent-validator') // eslint-disable-line @typescript-eslint/no-var-requires

/**
 * @throws Error
 */
export function parsePetId (obj: any): number {
  return new FluentValidator(obj.petId, 'petId')
    .toInteger()
}

/**
 * @throws Error
 */
export function parsePet (obj: any): Pet {
  try {
    const id = new FluentValidator(obj.id, 'pet id')
      .toInteger()
    const name = new FluentValidator(obj.name, 'pet name')
      .isString()
      .hasMinimumLength(1)
      .hasMaximumLength(256)
      .value
    const pet = new Pet(id, name)
    pet.tag = new FluentValidator(obj.tag, 'pet tag')
      .isString()
      .hasMinimumLength(1)
      .hasMaximumLength(256)
      .value
    return pet
  } catch (e) {
    if (e instanceof Error) {
      throw HttpError.fromError(e, 400)
    } else {
      throw HttpError.fromError(new Error('unkown error'), 400)
    }
  }
}
