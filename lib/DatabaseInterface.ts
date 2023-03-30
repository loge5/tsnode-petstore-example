abstract class DatabaseInterface {
  abstract findAll (): any
  abstract find (key: any): any
  abstract exists (key: any): boolean
  abstract save (key: any, value: any): any
  abstract delete (key: any): any
}

export default DatabaseInterface
