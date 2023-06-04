import { IPokemon } from "../../types/pokemon";

const getPokemon = async (name: string):Promise<IPokemon> => {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, { cache: 'no-store' });

    if(!response.ok)
        throw 'Failed to retrieve all pokemons';

        
    const data = await response.json();

    return {
        name: data.name,
        baseExperience: data.base_experience,
        image: data.sprites.front_default,
        abilities: data.abilities.map((a:any)=>a.ability.name),
        types: data.types.map((t:any)=>t.type.name)
    };
}

export default getPokemon;