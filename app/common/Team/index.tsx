import { ITeam } from "./types";

export default function Team (props: ITeam) {

    const {name, pokemons} = props;

    return <div>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <p>Images:</p>
                <p>Total Experience:</p>
                <p>List of types:</p>
            </div>
        </div>
    </div>
}