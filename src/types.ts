export type User = {
    readonly id?: string
    username: string
    email: string
    password: string
    first_name?: string
    last_name?: string
    setter: boolean
  }

export type MoonboardBoulder = {
  readonly id?: string
  boulder_name: string
  grade: string
  starting_hold: string[]
  usable_holds: string[]
  finish_hold: string[]
  moonboard_configuration: string
}

export type LoggedUser = {
  token: string
  username: string
}

export type Holds = {
  starting_holds: string[]
  usable_holds: string[]
  finish_holds: string[]
}

export type BoulderProject = {
  readonly id?: string
  boulder_name: string
  grade: string
  starting_hold: string[]
  usable_holds: string[]
  finish_hold: string[]
  moonboard_configuration: string
  completed: boolean
  attempts: number
  moonboard_info: []
}