type DefaultButtonProps = {
    onClick: ()=>void,
    disabled?: boolean,
    children: string | JSX.Element | JSX.Element[]
}

export const DefaultButton = ({onClick, children, disabled} : DefaultButtonProps) => (
    <button onClick={onClick} disabled={disabled} className="btn btn-primary">
        {children}
    </button>
)