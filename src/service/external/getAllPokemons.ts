import { PokemonEntry } from "../../types/pokemon";

interface GetPokemonResponse {
    data: number,
    next: string,
    previous: any,
    results: PokemonEntry[]
}

const getAllPokemons = async () => {

    const response = await fetch('https://pokeapi.co/api/v2/pokemon');

    if(!response.ok)
        throw 'Failed to retrieve all pokemons';

    const data = await response.json() as GetPokemonResponse;

    return data.results;
}

export default getAllPokemons;