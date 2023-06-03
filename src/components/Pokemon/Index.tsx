import { IPokemon } from "@/types/pokemon";
import Image from "next/image";

const API_IMAGE_PATH = '/api/pokemon/image/[image_file]';

export const PokemonImage = (porps: {image: string, alt:string, size: number}) => <Image 
    width={porps.size} 
    height={porps.size} 
    alt={porps.alt} 
    src={API_IMAGE_PATH.replace('[image_file]', porps.image)}
/>

export default function Pokemon (props: IPokemon) {

    const {name, baseExperience, image, abilities, types} = props;

    return <div>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Experience: {baseExperience}</p>
                <PokemonImage image={image} alt={name} size={120} />
                <p>Abilities: {abilities.join(', ')}</p>
                <p>Types: {types.join(', ')}</p>
            </div>
        </div>
    </div>
}