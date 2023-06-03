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
import { toast } from 'react-toastify'

export default function Page() {

    const params = useParams();
    const router = useRouter();
    
    const teamId = parseInt(params?.id as string);

    const [teamData, setTeamData] = useState<ITeam>({
        name: '',
        pokemons: []
    });

    const teamMutation = useMutation({
        mutationFn: () => updateTeam(teamId, teamData),
        onSuccess: () => {

            toast('Team updated!', {type: 'success'});
        },
        onError: (error:any) => {
            toast(error.message ?? 'An Error occured', {type: 'error'});
        }
    });

    const genPokeMutation = useMutation({
        mutationFn: () => {
          return getRndPokemon();
        },
        onSuccess: (data) => {
            
            const teamDataNew = {...teamData};
            teamDataNew.pokemons = [...teamDataNew.pokemons, ...[data]]
            
            setTeamData(teamDataNew);
            toast(`${data.name} added to team`, {type: 'success'});
        },
        onError: (error:any) => {
            toast(error.message ?? 'An Error occured', {type: 'error'});
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

    const teamUpdateHandler = () => {

        if(teamData.name === '') {
            toast(`Team name cannot be empty!`, {type: 'info'});
            return;
        }

        teamMutation.mutate();
    }

    const isLoading = teamQuery.isLoading || teamMutation.isLoading;

    return <div>
        <TeamEdit
            teamName={teamData?.name}
            onTeamNameChange={teamNameHandler}
            onAddPokemon={()=>genPokeMutation.mutate()}
            onSaveTeam={teamUpdateHandler}
            disableButtons={isLoading}
            pokemons={teamData.pokemons}
        />
    </div>
}