
type Option = {
    value: string, name: string
}

type SelectFilterProps = {
    options: Option[],
    onSelect: (data: Option)=>void
}
export const SelectFilter = (params: SelectFilterProps) => {

    const { options } = params;

    const selectHandler = () => {

        
    }

    return <select onSelect={selectHandler} className="select select-bordered w-full max-w-xs">
    {options.map((x:Option, i: number)=>{
        return <option key={i} value={x.value}>{x.name}</option>
    } )}
  </select>
}