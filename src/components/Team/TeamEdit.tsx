import { DefaultButton } from "../Button/Index";
import Pokemon from "../Pokemon/Index";
import { useMutation } from "react-query";
import getRndPokemon from "@/service/getRndPokemon";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ITeam } from "@/types/team";

type TeamEditProps = {
    disableButtons?: boolean,
    initialTeamData?: ITeam,
    saveText: string,
    onSaveTeam: (data: ITeam) => void
}

export default function TeamEdit(props: TeamEditProps) {
    
    const {disableButtons, initialTeamData, onSaveTeam, saveText} = props;

    const [teamData, setTeamData] = useState<ITeam>(initialTeamData ?? {
        name: '',
        pokemons: []
    });

    const genPokeMutation = useMutation({
        mutationFn: () => {
          return getRndPokemon();
        },
        onSuccess: (data) => {
            
            const teamDataNew = {...teamData};
            teamDataNew.pokemons = [...teamDataNew.pokemons ?? [], ...[data]]
            
            setTeamData(teamDataNew);
            toast(`${data.name} added to team`, {type: 'success'});
        },
        onError: (error:any) => {
            toast(error.message ?? 'An Error occured', {type: 'error'});
        }
    });

    useEffect(()=>{
        if(initialTeamData) {

            setTeamData(initialTeamData);
        }
    }, [initialTeamData]);
    
    const saveTeamHandler = () => {

        if(teamData.name === '') {
            toast(`Team name cannot be empty!`, {type: 'info'});
            return;
        }

        if(teamData.pokemons?.length === 0) {
            toast(`Please add pokemons!`, {type: 'info'});
            return;
        }

        onSaveTeam(teamData);
    }

    const addPokemonHandler = () => {

        genPokeMutation.mutate();
    }

    const teamNameChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {

        setTeamData({...teamData, ...{name: ev.target.value}})
    }
    
    const disableBttInternal = disableButtons || genPokeMutation.isLoading;

    return <><div className="form-control w-full max-w-xs p-2">
            <label className="label">
                <span className="label-text-alt">Team Name</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={teamData.name} onChange={teamNameChangeHandler} />
        </div>
        <div className="form-control w-full max-w-xs p-2">
            <DefaultButton disabled={disableBttInternal} onClick={addPokemonHandler}>
                Gotta Catch &apos;Em All
            </DefaultButton>
        </div>
        <div className="flex w-full flex-wrap">
            { teamData.pokemons?.map((x, i)=><div className="p-2" key={i}><Pokemon {...x} /></div>) }
        </div>
        <div className="form-control w-full max-w-xs p-2">
            <DefaultButton disabled={disableBttInternal} onClick={saveTeamHandler}>
                {saveText}
            </DefaultButton>
        </div>
    </>
}