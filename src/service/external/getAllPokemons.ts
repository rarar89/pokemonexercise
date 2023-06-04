import { GetPokemonResponse } from "@/types/externaApis";
import { PokemonEntry } from "@/types/pokemon";

const getAllPokemons = async ():Promise<PokemonEntry[]> => {

    const response = await fetch('https://pokeapi.co/api/v2/pokemon');

    if(!response.ok)
        throw 'Failed to retrieve all pokemons';

    const data = await response.json() as GetPokemonResponse;

    return data.results;
}

export default getAllPokemons;