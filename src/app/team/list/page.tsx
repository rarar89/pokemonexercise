"use client";

import { SelectFilter } from "@/components/Filter";
import { ErrorMessage } from "@/components/Message";
import Team from "@/components/Team";
import getTeams from "@/service/getTeams";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { toast } from 'react-toastify';

export default function Teams() {

    const [filterType, setFilterType] = useState<string>('');

    const { data, isError } = useQuery({
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

    const handleTypesFilter = (pokeType: string | null) => {

        if(pokeType) {
            setFilterType(pokeType);
        } else {
            setFilterType('');
        }

    }

    useEffect(()=>{
        if(isError) {
            toast('An error occured fetching teams!', {type: 'error'});
        }
    }, [isError]);

    return <div className="w-full justify-center items-center">
        <div className="p-2">
            <SelectFilter
                name="Pokemon Types Filter:"
                options={pokemonTypes}
                onSelect={handleTypesFilter}
            />
        </div>
        <div className="flex flex-wrap items-stretch">
            {filteredData?.map((x, i)=><div className="p-2" key={i}><Team {...x} /></div>)}
        </div>
    </div>
}