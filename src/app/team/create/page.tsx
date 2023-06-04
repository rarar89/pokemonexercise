"use client";

import TeamEdit from "@/components/Team/TeamEdit";
import addTeam from "@/service/addTeam";
import { ITeam } from "@/types/team";
import { useState } from "react";
import { useMutation, QueryClient } from "react-query";
import { toast } from 'react-toastify'

export default function Create() {

    const queryClient = new QueryClient();

    const [teamData, setTeamData] = useState<ITeam>();

    const teamMutation = useMutation({
        mutationFn: (teamData: ITeam) => {
          return addTeam(teamData);
        },
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['teams'] });
            toast('Team Added! Good Luck!', {type: 'success'});
            setTeamData({name: '', pokemons: []})
        },
        onError: (error:any) => {
            toast(error.message ?? error ?? 'An Error occured', {type: 'error'});
        }
    });

    const saveTeamHandler = async (teamData: ITeam) => {

        teamMutation.mutate(teamData);
    }

    return <div>
        <TeamEdit
            initialTeamData={teamData}
            onSaveTeam={saveTeamHandler}
            disableButtons={teamMutation.isLoading}
            saveText="Create Team"
        />
    </div>
}
