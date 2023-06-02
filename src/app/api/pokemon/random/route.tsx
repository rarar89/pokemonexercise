import { getAllPokemons } from "@/service/external/getAllPokemons";
import { getPokemon } from "@/service/external/getPokemon";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        
        const allPokemons = await getAllPokemons();
        const rnd = Math.round(Math.random() * allPokemons.length);
        const pokemonData = await getPokemon(allPokemons[rnd].name);
        return NextResponse.json(pokemonData);

    } catch (error: any) {

        return NextResponse.json({message: error?.message ?? error ?? 'An error occured' }), {status: 500};
    }
}