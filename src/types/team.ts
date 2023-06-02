import { IPokemon } from "./pokemon";

export interface ITeam {
    name: string,
    creationDate?: Date,
    pokemons: IPokemon[]
}