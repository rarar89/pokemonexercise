import { ITeam } from "./team"

export type GetTeamsResponse = {
    teams: ITeam[],
    typesFilterValues: string[]
}

export type ErrorResponse = {
    message: string
}