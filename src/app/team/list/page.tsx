import Team from "@/components/Team/TeamListEntry";
import getTeams from "@/service/getTeams";
import PokemonTypeFilter from "./PokemonTypeFilter";

export default async function Teams({searchParams}:{searchParams: any}) {

    const data =  await getTeams(searchParams.type);
   
    const teamsData = data.teams;
    const pokemonTypes = data.typesFilterValues;
    

    return <div className="w-full justify-center items-center">
        <div className="p-2">
            {<PokemonTypeFilter
                name="Pokemon Types Filter:"
                options={pokemonTypes}
            />}
        </div>
        <div className="flex flex-wrap items-stretch">
            {teamsData?.map((x, i)=><div className="p-2" key={i}><Team {...x} /></div>)}
        </div>
    </div>
}