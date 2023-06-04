import { ITeam } from "@/types/team";
import { PokemonImage } from "../Pokemon/Index";
import EditTeamButton from "./EditTeamButton";

export default function Team (props: ITeam) {

    const {name, pokemons} = props;

    return <div className="h-72 card card-compact xs:w-64 sm:w-84 md:w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <div className="h-28 flex flex-wrap overflow-auto">
                {props.pokemons?.map((x, i)=>(<div key={i}><PokemonImage image={x.image} alt={x.name} size={50} /></div>))}
            </div>
            <p>Total Experience: {pokemons?.reduce((prev, curr)=>prev+curr.baseExperience,0)}</p>
            <p>List of types: {Array.from(new Set(pokemons?.flatMap(p => p.types))).join(', ')}</p>
            <div><EditTeamButton teamId={props.id ?? 0} /></div>
        </div>
    </div>
}