import { IPokemon } from "../Pokemon/types";

export interface ITeam {
    name: string,
    creationDate: Date,
    pokemons: IPokemon[]
}