import { ITeam } from "../types/team";

export const saveTeam = async (data: ITeam) => {

    const response = await fetch('/api/team', {method: 'POST', body: JSON.stringify(data)});

    if(!response.ok) {
        
        const errorData = await response.json();
        throw errorData?.message ?? 'an error occured';
    }

    return true;
}