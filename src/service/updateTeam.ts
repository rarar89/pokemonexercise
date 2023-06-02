import { ITeam } from "../types/team";

const updateTeam = async (id: number, data: ITeam):Promise<ITeam> => {

    const response = await fetch(`/api/team/${id}`, {method: 'PUT', body: JSON.stringify(data)});

    if(!response.ok) {
        
        const errorData = await response.json();
        throw errorData?.message ?? 'an error occured';
    }

    const responseData = await response.json() as ITeam;

    return responseData;
}

export default updateTeam;