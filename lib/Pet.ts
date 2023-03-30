class Pet {
  public id: number
  public name: string
  public tag: string | undefined

  constructor (id: number, name: string) {
    this.id = id
    this.name = name
  }
}

export default Pet
