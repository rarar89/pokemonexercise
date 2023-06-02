import { IPokemon } from "@/types/pokemon";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, options: {params: {id: string} }) {

    const id = options.params.id;

    if(!id) {
        return NextResponse.json({ message: 'Team id is missing' }, { status: 404 });
    }
    
    try{
        const prismaClient = new PrismaClient();
        const resultTeam = await prismaClient.team.findFirst({
            include: {pokemons: true},
            where: {id: parseInt(id)}
        });
    
        return NextResponse.json(resultTeam);
    } catch(error:any) {

        return NextResponse.json({ message: error?.message ?? error ?? 'An error occured' }, { status: 500 });
    }
}


export async function PUT(req: Request, options: {params: {id: string} }) {

    const id = options.params.id;
    
    if(!id) {
        return NextResponse.json({ message: 'Team id is missing' }, { status: 404 });
    }

    try {

        const prismaClient = new PrismaClient();
        const data = await req.json();
        if(data.id) {
            delete data.id;
        }

        const pokemons:IPokemon[] = data.pokemons.map((x:IPokemon)=>{

            if(x.teamId) {
                delete x.teamId
            }

            return x;
        });

        data.pokemons = {
            deleteMany: {teamId: parseInt(id)},
            createMany: {
                data: pokemons
            }
        };

        const resultUpdate = await prismaClient.team.update({where: {id: parseInt(id)}, data: data});

        return NextResponse.json(resultUpdate);

    } catch(error:any) {

        return NextResponse.json({ message: error?.message ?? error ?? 'An error occured' }, { status: 500 });
    }
}