type SelectFilterProps = {
    name: string,
    options: string[],
    onSelect: (value: string)=>void
}
export const SelectFilter = (params: SelectFilterProps) => {

    const { options, name, onSelect } = params;

    const selectHandler = (ev: React.ChangeEvent<HTMLSelectElement>) => {

        onSelect(ev.target.value);
    }

    return <div>
        <div>{name}</div>
        <div>
            <select onChange={selectHandler} className="select select-bordered w-full max-w-xs">
                {options.map((x:string, i: number)=>{
                    return <option key={i} value={x}>{x}</option>
                })}
            </select>
        </div>
    </div>;
}