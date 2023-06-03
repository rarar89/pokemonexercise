"use client";

import { ErrorMessage, SuccessMessage } from "@/components/Message";
import { TeamEdit } from "@/components/Team";
import addTeam from "@/service/addTeam";
import getRndPokemon from "@/service/getRndPokemon";
import { IPokemon } from "@/types/pokemon";
import { ITeam } from "@/types/team";
import { useEffect, useState } from "react";
import { useMutation, QueryClient } from "react-query";
import { toast } from 'react-toastify'

export default function Create() {

    const queryClient = new QueryClient();

    const [teamName, setTeamName] = useState<string>('');
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    const teamMutation = useMutation({
        mutationFn: (teamData: ITeam) => {
          return addTeam(teamData);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teams'] }),
        onError: (error:any) => {
            toast(error.message ?? error ?? 'An Error occured', {type: 'error'});
        }
    });

    const genPokeMutation = useMutation({
        mutationFn: () => {
          return getRndPokemon();
        },
        onSuccess: (data) => {
            toast(`${data.name} added to the team!`, {type: 'success'});
            setPokemons([...pokemons, ...[data]]);
        },
        onError: (error:any) => {
            toast(error.message ?? 'An Error occured', {type: 'error'});
        }
    });


    const addPokemonHandler = async () => {

        genPokeMutation.mutate();
    }

    const teamNameHandler = async (name: string) => {

        setTeamName(name);
    }

    const saveTeamHandler = async () => {

        if(teamName === '') {
            toast(`Team name cannot be empty!`, {type: 'info'});
            return;
        }

        if(pokemons.length === 0) {
            toast(`Please add pokemons!`, {type: 'info'});
            return;
        }

        teamMutation.mutate({
            name: teamName,
            pokemons: pokemons
        })
    }

    useEffect(()=>{

        if(teamMutation.isSuccess) {
            toast('Team Added! Good Luck!', {type: 'success'});
            setTeamName('');
            setPokemons([]);
        }

    }, [teamMutation.isSuccess])

    const isLoading = genPokeMutation.isLoading || teamMutation.isLoading;

    return <div>
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
