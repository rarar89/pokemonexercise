import { ITeam } from "../types/team";

const addTeam = async (data: ITeam):Promise<ITeam> => {

    const response = await fetch(`${process.env.NEXT_BACKEND_URL ?? ''}/api/team`, {method: 'POST', body: JSON.stringify(data)});

    if(!response.ok) {
        
        const errorData = await response.json();
        throw errorData?.message ?? 'an error occured';
    }

    return await response.json() as ITeam;
}

export default addTeam;