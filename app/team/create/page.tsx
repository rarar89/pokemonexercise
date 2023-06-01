import { DefaultButton } from "@/app/common/Button/Index";
import Pokemon from "@/app/common/Pokemon/Index";
import { IPokemon } from "@/app/common/Pokemon/types";
import { getAllPokemons, getSinglePokemon } from "@/app/service/pokemon";
import { useEffect, useState } from "react";

export default async function Create() {

    const teamPokemons: IPokemon[] = [];
    const [allPokemons, setAllPokemons] = useState<string[]|undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddRndPokemon = async () => {

        let allPokemonsList = [];
        if(!allPokemons) {

            const pokemons = await getAllPokemons();
            const pokemonNames = pokemons.map(x=>x.name);
            allPokemonsList = pokemonNames;
            setAllPokemons(pokemonNames);
        } else {

            allPokemonsList = allPokemons;
        }

        const rndIndx = Math.round(Math.random() * (allPokemonsList.length-1));
        
        const pokemonData = getSinglePokemon(allPokemonsList[rndIndx]);
    }

    return <form>
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text-alt">Team Name</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
            <DefaultButton onClick={handleAddRndPokemon} disabled={loading}>
                Gotta Catch &apos;Em All
            </DefaultButton>
        </div>
        <div>
            {teamPokemons.map((x, i)=><div key={i}><Pokemon {...x} /></div>)}
        </div>
    </form>
}