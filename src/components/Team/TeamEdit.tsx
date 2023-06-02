import { IPokemon } from "@/types/pokemon";
import { DefaultButton } from "../Button/Index";
import Pokemon from "../Pokemon/Index";

type TeamEditProps = {
    disableButtons?: boolean,
    onAddPokemon: ()=>void,
    pokemons: IPokemon[],
    teamName: string,
    onTeamNameChange: (name: string)=>void,
    onSaveTeam: ()=>void
}

export default function TeamEdit(props: TeamEditProps) {
    
    const {disableButtons, onAddPokemon, pokemons, teamName, onTeamNameChange, onSaveTeam} = props;

    return <><div className="form-control w-full max-w-xs p-2">
        <label className="label">
            <span className="label-text-alt">Team Name</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={teamName} onChange={(ev)=>onTeamNameChange(ev.target.value)} />
    </div>
    <div className="form-control w-full max-w-xs p-2">
        <DefaultButton disabled={disableButtons} onClick={onAddPokemon}>
            Gotta Catch &apos;Em All
        </DefaultButton>
    </div>
    <div className="flex w-full flex-wrap">
        { pokemons.map((x, i)=><div className="p-2" key={i}><Pokemon {...x} /></div>) }
    </div>
    <div className="form-control w-full max-w-xs p-2">
        <DefaultButton disabled={disableButtons} onClick={onSaveTeam}>
            Save Team
        </DefaultButton>
    </div>
    </>
}