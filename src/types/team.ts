import { IPokemon } from "./pokemon";

export interface ITeam {
    id?: number,
    name: string,
    creationDate?: Date,
    pokemons: IPokemon[]
}