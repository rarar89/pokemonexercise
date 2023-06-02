import { ITeam } from "../types/team";

const getTeam = async (id: number): Promise<ITeam> => {

    const response = await fetch(`/api/team/${id}`);

    if(!response.ok) {
        
        const errorData = await response.json();
        throw errorData?.message ?? 'an error occured';
    }
    
    const data = await response.json() as ITeam;

    return data;
}

export default getTeam;