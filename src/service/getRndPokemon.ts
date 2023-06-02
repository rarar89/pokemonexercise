import { IPokemon } from "../types/pokemon";

export const getRndPokemon = async () => {

    const response = await fetch(`/api/pokemon/random`);

    if(!response.ok)
        throw 'Failed to retrieve all pokemons';

    return await response.json() as IPokemon;
}