"use client";

import { ErrorMessage, SuccessMessage } from "@/components/Message";
import { TeamEdit } from "@/components/Team";
import addTeam from "@/service/addTeam";
import getRndPokemon from "@/service/getRndPokemon";
import { IPokemon } from "@/types/pokemon";
import { ITeam } from "@/types/team";
import { useEffect, useState } from "react";
import { useMutation, QueryClient } from "react-query";

export default function Create() {

    const queryClient = new QueryClient();

    const [teamName, setTeamName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    const teamMutation = useMutation({
        mutationFn: (teamData: ITeam) => {
          return addTeam(teamData);
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
            setError(error.message ?? 'An Error occured');
        }
    });


    const addPokemonHandler = async () => {

        genPokeMutation.mutate();
    }

    const teamNameHandler = async (name: string) => {

        setTeamName(name);
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
        { teamMutation.isSuccess ? <SuccessMessage message={'Team Added! Good Luck!'} /> : null }
        { error ? <ErrorMessage message={ error } /> : null }
        <TeamEdit 
            teamName={teamName}
            onTeamNameChange={teamNameHandler}
            onAddPokemon={addPokemonHandler}
            onSaveTeam={saveTeamHandler}
            disableButtons={isLoading}
            pokemons={pokemons}
        />
    </div>
}
