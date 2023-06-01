import { IPokemon } from "./types";

export default function Pokemon (props: IPokemon) {

    const {name, baseExperience, image, abilities, types} = props;

    return <div>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <p>Experience: {baseExperience}</p>
                <p>Image: {image}</p>
                <p>Abilities: {abilities}</p>
                <p>Types: {types}</p>
            </div>
        </div>
    </div>
}