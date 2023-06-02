export type PokemonEntry = {
    name: string,
    url: string
}

export interface IPokemon {
    name: string,
    baseExperience: number
    image: string,
    abilities: string[],
    types: string[],
    teamId?: number 
}