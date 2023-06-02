import { IPokemon } from "../types/pokemon";

export const getRndPokemon = async () => {

    const response = await fetch('/api/pokemon/random');

    if(!response.ok) {
        
        const errorData = await response.json();
        throw errorData?.message ?? 'an error occured';
    }

    return await response.json() as IPokemon;
}