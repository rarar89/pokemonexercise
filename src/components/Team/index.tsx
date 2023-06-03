import { ITeam } from "@/types/team";
import { DefaultButton } from "../Button/Index";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PokemonImage } from "../Pokemon/Index";
export { default as TeamEdit } from './TeamEdit';

export default function Team (props: ITeam) {

    const router = useRouter();

    const {name, pokemons} = props;

    return <div className="h-72 card card-compact xs:w-64 sm:w-84 md:w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="h-28 flex flex-wrap overflow-auto">
                    {props.pokemons.map((x, i)=>(<div key={i}><PokemonImage image={x.image} alt={x.name} size={50} /></div>))}
                </div>
                <p>Total Experience: {pokemons.reduce((prev, curr)=>prev+curr.baseExperience,0)}</p>
                <p>List of types: {Array.from(new Set(pokemons.flatMap(p => p.types))).join(', ')}</p>
                <div><DefaultButton onClick={()=>{router.push(`/team/${props.id}/edit`)}}>Edit</DefaultButton></div>
            </div>
        </div>
}