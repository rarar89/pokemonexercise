import { ITeam } from "@/types/team";
import { DefaultButton } from "../Button/Index";
import { useRouter } from "next/router";
export { default as TeamEdit } from './TeamEdit';

export default function Team (props: ITeam) {

    const router = useRouter();

    const {name, pokemons} = props;

    return <div>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Images:</p>
                <div>
                    {props.pokemons.map(x=>(x.image))}
                </div>
                <p>Total Experience: {pokemons.reduce((prev, curr)=>prev+curr.baseExperience,0)}</p>
                <p>List of types: {Array.from(new Set(pokemons.flatMap(p => p.types))).join(', ')}</p>
                <div><DefaultButton onClick={()=>{() => router.push(`/team/${props.id}/edit`)}}>Edit</DefaultButton></div>
            </div>
        </div>
    </div>
}