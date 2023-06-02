import { IPokemon } from "@/types/pokemon";
import Image from "next/image";

export default function Pokemon (props: IPokemon) {

    const {name, baseExperience, image, abilities, types} = props;

    return <div>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Experience: {baseExperience}</p>
                <img width={120} height={120} src={image} alt={name} />
                <p>Abilities: {abilities.join(', ')}</p>
                <p>Types: {types.join(', ')}</p>
            </div>
        </div>
    </div>
}