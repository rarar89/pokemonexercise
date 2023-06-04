"use client";

type SelectFilterProps = {
    name: string,
    options: string[],
    onSelect: (value: string|null)=>void
}

const NoneSelected = 'None';

export const SelectFilter = (params: SelectFilterProps) => {

    const { options, name, onSelect } = params;

    const selectHandler = (ev: React.ChangeEvent<HTMLSelectElement>) => {

        const value = ev.target.value;

        if(value !== NoneSelected) {
            onSelect(ev.target.value);
        } else {
            onSelect(null);
        }
    }

    const filterOptions = [...[NoneSelected], ...options]

    return <div>
        <div>{name}</div>
        <div>
            <select onChange={selectHandler} className="select select-bordered w-full max-w-xs">
                {filterOptions.map((x:string, i: number)=>{
                    return <option key={i} value={x}>{x}</option>
                })}
            </select>
        </div>
    </div>;
}