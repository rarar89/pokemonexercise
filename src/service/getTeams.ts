import { PokemonEntry } from "../types/pokemon";
import { ITeam } from "../types/team";

type TeamParams = {

    types?: string[]
}

export const getTeams = async (params?: TeamParams): Promise<ITeam[]> => {

    const response = await fetch(process.env.NEXT_BACKEND_URL + '/api/team',  { next: { revalidate: 60 } });

    if(!response.ok)
        throw 'Failed to retrieve all pokemons';

    const data = await response.json() as ITeam[];

    return data;
}