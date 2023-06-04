'use client';

import { SelectFilter } from "@/components/Filter";
import { useRouter } from "next/navigation";

type PokemonTypeFilterProps = {
    name: string,
    options: string[]
}

export default function PokemonTypeFilter (props: PokemonTypeFilterProps) {

    const router = useRouter();

    const handleTypesFilter = (pokeType: string | null) => {
        
        if(pokeType) {
            router.push(`/team/list?type=${pokeType}`); 
        } else {
            router.push(`/team/list`);
        }
    }

    return <SelectFilter
        name={props.name}
        options={props.options}
        onSelect={handleTypesFilter}
    />
}