"use client";

import { ErrorMessage, SuccessMessage } from "@/components/Message";
import { TeamEdit } from "@/components/Team";
import getRndPokemon from "@/service/getRndPokemon";
import getTeam from "@/service/getTeam";
import updateTeam from "@/service/updateTeam";
import { ITeam } from "@/types/team";
import { useParams, useRouter  } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

export default function Page() {

    const params = useParams();
    const router = useRouter();
    
    const teamId = parseInt(params.id as string);

    const [teamData, setTeamData] = useState<ITeam>({
        name: '',
        pokemons: []
    });

    const [error, setError] = useState<string>('');

    const teamMutation = useMutation(() => updateTeam(teamId, teamData));

    const genPokeMutation = useMutation({
        mutationFn: () => {
          return getRndPokemon();
        },
        onSuccess: (data) => {
            
            const teamDataNew = {...teamData};
            teamDataNew.pokemons = [...teamDataNew.pokemons, ...[data]]

            setTeamData(teamDataNew);
        },
        onError: (error:any) => {
            setError(error.message ?? 'An Error occured');
        }
    });

    const teamQuery = useQuery({
        queryKey: ['team', router],
        queryFn: ()=>getTeam(teamId)
    })

    useEffect(()=>{

        if(teamQuery.data) {
            setTeamData(teamQuery.data);
        }
    }, [teamQuery.data]);

    const teamNameHandler = (name: string) => {

        setTeamData({...teamData, ...{name: name}});
    }

    const isLoading = teamQuery.isLoading || teamMutation.isLoading;

    return <div>
        { teamMutation.isSuccess ? <SuccessMessage message={'Team Updated!'} /> : null }
        { error ? <ErrorMessage message={ error } /> : null }
        <TeamEdit
            teamName={teamData?.name}
            onTeamNameChange={teamNameHandler}
            onAddPokemon={()=>genPokeMutation.mutate()}
            onSaveTeam={()=>teamMutation.mutate()}
            disableButtons={isLoading}
            pokemons={teamData.pokemons}
        />
    </div>
}