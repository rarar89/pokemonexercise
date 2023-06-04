import { IPokemon } from "../types/pokemon";

const getRndPokemon = async ():Promise<IPokemon> => {

    const response = await fetch(`${process.env.NEXT_BACKEND_URL ?? ''}/api/pokemon/random`, { cache: 'no-store' });

    if(!response.ok) {
        
        const errorData = await response.json();
        throw errorData?.message ?? 'an error occured';
    }

    return await response.json() as IPokemon;
}

export default getRndPokemon;