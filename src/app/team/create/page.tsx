"use client";

import { DefaultButton } from "@/components/Button/Index";
import Pokemon from "@/components/Pokemon/Index";
import { getRndPokemon } from "@/service/getRndPokemon";
import { saveTeam } from "@/service/saveTeam";
import { IPokemon } from "@/types/pokemon";
import { ITeam } from "@/types/team";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";

export default function Create() {

    const teamMutation = useMutation({
        mutationFn: (teamData: ITeam) => {
          return saveTeam(teamData);
        },
    });

    const [teamName, setTeamName] = useState<string>('');
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    const addPokemonHandler = async () => {

        const pokemonData = await getRndPokemon();

        setPokemons([...pokemons, ...[pokemonData]])
    }

    const teamNameHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault();
        setTeamName(e.target.value);
    }

    const saveTeamHandler = async () => {

        teamMutation.mutate({ 
            name: teamName,
            pokemons: pokemons
        })
    }

    useEffect(()=>{

        if(teamMutation.isSuccess) {
            setTeamName('');
            setPokemons([]);
        }

    }, [teamMutation.isSuccess])

    return <div>
        {teamMutation.isSuccess ? <div>Team added!</div> : null}
        <div className="form-control w-full max-w-xs p-2">
            <label className="label">
                <span className="label-text-alt">Team Name</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={teamNameHandler} />
        </div>
        <div className="form-control w-full max-w-xs p-2">
            <DefaultButton onClick={addPokemonHandler}>
                Gotta Catch &apos;Em All
            </DefaultButton>
        </div>
        <div className="flex w-full flex-wrap">
            {pokemons.map((x, i)=><div className="p-2" key={i}><Pokemon {...x} /></div>)}
        </div>
        <div className="form-control w-full max-w-xs p-2">
            <DefaultButton onClick={saveTeamHandler}>
                Save Team
            </DefaultButton>
        </div>
    </div>
}