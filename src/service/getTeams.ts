import { ITeam } from "../types/team";

export const getTeams = async (): Promise<ITeam[]> => {

    const response = await fetch('/api/team');

    if(!response.ok) {
        
        const errorData = await response.json();
        throw errorData?.message ?? 'an error occured';
    }
    
    const data = await response.json() as ITeam[];

    return data;
}