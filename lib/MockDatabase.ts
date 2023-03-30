import DatabaseInterface from './DatabaseInterface'

class MockDatabase extends DatabaseInterface {
  private readonly items: Map<string, any>
  constructor () {
    super()
    this.items = new Map()
  }

  findAll (): any {
    return Array.from(this.items.values())
  }

  find (key: any): any {
    return this.items.get(key)
  }

  exists (key: any): boolean {
    return this.items.has(key)
  }

  save (key: any, value: any): void {
    this.items.set(key, value)
  }

  delete (key: any): void {
    this.items.delete(key)
  }
}

export default MockDatabase
