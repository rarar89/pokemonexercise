import Team from "@/components/Team";
import { getAllPokemons } from "@/service/external/getAllPokemons";
import { getTeams } from "@/service/getTeams";

export default async function Teams() {

    const teams = await getTeams();

    return <div className="w-full flex justify-center items-center">
        <div className="flex w-full flex-wrap">
            {teams.map((x, i)=><div className="m-2" key={i}><Team {...x} /></div>)}
        </div>
    </div>
}