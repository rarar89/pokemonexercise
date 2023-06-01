import { DefaultButton } from "@/app/common/Button/Index";
import Pokemon from "@/app/common/Pokemon/Index";
import {IPokemon} from "@/app/common/Pokemon/types";
import { ITeam } from "@/app/common/Team/types";

export default function Create() {

    const teams: ITeam[] = [];

    const handleAddRndPokemon = () => {

    }

    return <form>
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text-alt">Team Name</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
            <DefaultButton onClick={handleAddRndPokemon}>
                Gotta Catch &apos;Em All
            </DefaultButton>
        </div>
        <div>
            {teams.map((x, i)=><div key={i}><Pokemon {...x} /></div>)}
        </div>
    </form>
}