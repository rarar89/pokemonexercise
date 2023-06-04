import { GetTeamsResponse } from "@/types/apis";

const getTeams = async (typeFilter?: string): Promise<GetTeamsResponse> => {

    let searchString = '';
    if(typeFilter) {
        const searchParams = new URLSearchParams({
            typeFilter: typeFilter
        })
        searchString = '?' + searchParams;
    }


    const response = await fetch(
        `${process.env.NEXT_BACKEND_URL ?? ''}/api/team` + searchString, 
        { next: { tags: ['teams'] } }
    );

    if(!response.ok) {
        
        const errorData = await response.json();
        throw errorData?.message ?? 'an error occured';
    }
    
    const data = await response.json() as GetTeamsResponse;

    return data;
}

export default getTeams;