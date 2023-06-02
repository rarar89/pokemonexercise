"use client";

import { SelectFilter } from "@/components/Filter";
import Team from "@/components/Team";
import { getAllPokemons } from "@/service/external/getAllPokemons";
import { getTeams } from "@/service/getTeams";
import { ITeam } from "@/types/team";
import { useEffect, useMemo, useState } from "react";
import {  useQuery } from "react-query";

export async function getStaticProps() {
    const teams = await getTeams()
    return { props: { teams } }
  }

export default function Teams() {

    const [filterType, setFilterType] = useState<string>('');

    const { data } = useQuery({
        queryKey: ['teams'],
        queryFn: ()=>getTeams()
      })

    const pokemonTypes = useMemo(()=>{

        if(!data) {
            return [];
        }

        return Array.from(new Set(data.flatMap(t => t.pokemons.flatMap(p => p.types))));
    }, [data]);


    const filteredData = useMemo(() => {

        if(!data) {
            return;
        }

        if(filterType === '') {
            return data;
        }

        return data.filter(item =>
          item.pokemons.some(pokemon => pokemon.types.includes(filterType))
        );
      }, [data, filterType]);

    const handleTypesFilter = (pokeType: string) => {

        setFilterType(pokeType);
    }

    return <div className="w-full justify-center items-center">
        <SelectFilter
            name="Pokemon Types Filter:"
            options={pokemonTypes}
            onSelect={handleTypesFilter}
        />
        <div className="flex w-full flex-wrap">
            {filteredData?.map((x, i)=><div className="m-2" key={i}><Team {...x} /></div>)}
        </div>
    </div>
}