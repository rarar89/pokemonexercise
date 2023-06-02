import { IPokemon } from "@/types/pokemon";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try{
        const prismaClient = new PrismaClient();
        const data = await req.json();

        const pokemons:IPokemon[] = data.pokemons;

        data.pokemons = {create: pokemons};
        const resultCreate = await prismaClient.team.create({data})

        return NextResponse.json(resultCreate);
    } catch(error:any) {

        return NextResponse.json({message: error?.message ?? error ?? 'An error occured' }, { status: 500 });
    }
}

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    try {

        if(id) {
            const prismaClient = new PrismaClient();
            const resultTeam = await prismaClient.team.findFirst({where: {id: parseInt(id)}});
    
            return NextResponse.json(resultTeam);


        } else {

            const prismaClient = new PrismaClient();
            const resultTeams = await prismaClient.team.findMany({
                include: {
                    pokemons: true
                }
            });
    
            const allTypes: string[] = resultTeams.flatMap(t => t.pokemons.flatMap(p => p.types));


            return NextResponse.json({
                data: resultTeams,
                filter: {
                    type: allTypes
                }
            });
        }


    } catch(error:any) {

        return NextResponse.json({ message: error?.message ?? error ?? 'An error occured' }, { status: 500 });
    }
}

export async function PUT(req: Request) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if(!id) {
        return NextResponse.json({ message: 'Team id is missing' }, { status: 404 });
    }

    try {

        const prismaClient = new PrismaClient();
        const resultTeams = await prismaClient.team.findMany();

        return NextResponse.json(resultTeams);

    } catch(error:any) {

        return NextResponse.json({ message: error?.message ?? error ?? 'An error occured' }, { status: 500 });
    }
}