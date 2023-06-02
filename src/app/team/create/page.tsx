"use client";

import { DefaultButton } from "@/components/Button/Index";
import Pokemon from "@/components/Pokemon/Index";
import { getRndPokemon } from "@/service/getRndPokemon";
import { saveTeam } from "@/service/saveTeam";
import { IPokemon } from "@/types/pokemon";
import { ITeam } from "@/types/team";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useQuery, useMutation, QueryClient } from "react-query";

export default function Create() {

    const queryClient = new QueryClient();

    const [teamName, setTeamName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    const teamMutation = useMutation({
        mutationFn: (teamData: ITeam) => {
          return saveTeam(teamData);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teams'] }),
        onError: (error:any) => {
            setError(error.message ?? error ?? 'An Error occured');
        }
    });

    const genPokeMutation = useMutation({
        mutationFn: () => {
          return getRndPokemon();
        },
        onSuccess: (data) => setPokemons([...pokemons, ...[data]]),
        onError: (error:any) => {
            setError(error.message ?? error ?? 'An Error occured');
        }
    });


    const addPokemonHandler = async () => {

        genPokeMutation.mutate();
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
            setError('');
            setPokemons([]);
        }

    }, [teamMutation.isSuccess])

    const isLoading = genPokeMutation.isLoading || teamMutation.isLoading;

    return <div>
        { teamMutation.isSuccess ? <div className="alert alert-success">Team added!</div> : null }
        { error ? <div className="alert alert-error">{ error }</div> : null }
        <div className="form-control w-full max-w-xs p-2">
            <label className="label">
                <span className="label-text-alt">Team Name</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={teamName} onChange={teamNameHandler} />
        </div>
        <div className="form-control w-full max-w-xs p-2">
            <DefaultButton disabled={isLoading} onClick={addPokemonHandler}>
                Gotta Catch &apos;Em All
            </DefaultButton>
        </div>
        <div className="flex w-full flex-wrap">
            { pokemons.map((x, i)=><div className="p-2" key={i}><Pokemon {...x} /></div>) }
        </div>
        <div className="form-control w-full max-w-xs p-2">
            <DefaultButton disabled={isLoading} onClick={saveTeamHandler}>
                Save Team
            </DefaultButton>
        </div>
    </div>
}