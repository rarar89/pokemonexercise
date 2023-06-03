import { IPokemon } from "@/types/pokemon";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try{
        const prismaClient = new PrismaClient();
        const data = await req.json();

        const filesToFetch:string[] = [];

        const pokemons:IPokemon[] = data.pokemons;
        
        data.pokemons = {create: pokemons};
        const resultCreate = await prismaClient.team.create({data})

        return NextResponse.json(resultCreate);
    } catch(error:any) {

        return NextResponse.json({message: error?.message ?? 'An error occured' }, { status: 500 });
    }
}

export async function GET(req: Request) {

    try {

        const prismaClient = new PrismaClient();
        const resultTeams = await prismaClient.team.findMany({
            include: {
                pokemons: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(resultTeams);

    } catch(error:any) {

        return NextResponse.json({ message: error?.message ?? 'An error occured' }, { status: 500 });
    }
}
