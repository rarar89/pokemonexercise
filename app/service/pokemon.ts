type PokemonEntry = {
    name: string,
    url: string
}

interface GetPokemonResponse {
    count: number,
    next: string,
    previous: any,
    results: PokemonEntry[]
}

export const getAllPokemons = async () => {

    const response = await fetch('/api/v2/pokemon');

    if(!response.ok)
        throw 'Failed to retrieve all pokemons';

    const data = await response.json() as GetPokemonResponse;

    return data.results;
}

export const getSinglePokemon = async (name: string) => {

    const response = await fetch(`/api/v2/pokemon/${name}`);

    if(!response.ok)
        throw 'Failed to retrieve all pokemons';

    const data = await response.json() as GetPokemonResponse;

    return data.results;
}