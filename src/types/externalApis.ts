import { PokemonEntry } from "./pokemon"

export type GetPokemonResponse = {
    data: number,
    next: string,
    previous: any,
    results: PokemonEntry[]
}