import { ErrorResponse, GetTeamsResponse } from "@/types/apis";
import { IPokemon } from "@/types/pokemon";
import { ITeam } from "@/types/team";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";


export async function POST(req: Request):Promise<NextResponse<ITeam | {message: string}>> {

    try{
        const prismaClient = new PrismaClient();
        const data = await req.json();

        const pokemons:IPokemon[] = data.pokemons;
        
        data.pokemons = {create: pokemons};
        const resultCreate = await prismaClient.team.create({data})

        revalidateTag('teams');

        return NextResponse.json(resultCreate);
    } catch(error:any) {

        return NextResponse.json({message: error?.message as string ?? 'An error occured' }, { status: 500 });
    }
}

export async function GET(req: Request):Promise<NextResponse<GetTeamsResponse | ErrorResponse>> {

    try {

        const { searchParams } = new URL(req.url);
        const typeFilter = searchParams.get('typeFilter');

        const prismaClient = new PrismaClient();
        const teamsDataAll = await prismaClient.team.findMany({
            include: {
                pokemons: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const teamsDataFiltred = typeFilter ? teamsDataAll.filter(item =>
            item.pokemons.some(pokemon => pokemon.types.includes(typeFilter))
        ) : teamsDataAll;

        const typeFilterValues = Array.from(new Set(teamsDataAll.flatMap(t => t.pokemons.flatMap(p => p.types))));

        const resultTeams = {
            teams: teamsDataFiltred,
            typesFilterValues: typeFilterValues
        }

        return NextResponse.json(resultTeams);

    } catch(error:any) {

        return NextResponse.json({ message: error?.message as string ?? 'An error occured' }, { status: 500 });
    }
}
