"use client";

import TeamEdit from "@/components/Team/TeamEdit";
import getTeam from "@/service/getTeam";
import updateTeam from "@/service/updateTeam";
import { ITeam } from "@/types/team";
import { useParams, useRouter  } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { toast } from 'react-toastify'

export default function Page() {

    const params = useParams();
    const router = useRouter();
    
    const teamId = parseInt(params?.id as string);

    const teamMutation = useMutation({
        mutationFn: (teamData: ITeam) => updateTeam(teamId, teamData),
        onSuccess: () => {

            toast('Team updated!', {type: 'success'});
        },
        onError: (error:any) => {
            toast(error.message ?? 'An Error occured', {type: 'error'});
        }
    });

    const teamQuery = useQuery({
        queryKey: ['team', router],
        queryFn: ()=>getTeam(teamId)
    })

    const teamUpdateHandler = (teamUpdateData: ITeam) => {

        teamMutation.mutate(teamUpdateData);
    }

    const isLoading = teamQuery.isLoading || teamMutation.isLoading;

    return <div>
        <TeamEdit
            initialTeamData={teamQuery.data}
            onSaveTeam={teamUpdateHandler}
            disableButtons={isLoading}
            saveText="Save Team"
        />
    </div>
}