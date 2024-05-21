export type Toilet = {
  id: number
  name: string
  location: string
  status: 'in use' | 'deploying' | 'suspended'
  creation_date: string
}

export type EmptyToilet = Omit<Toilet, 'id' | 'creation_date' | 'status'> & {
  status: Toilet['status'] | undefined
}
