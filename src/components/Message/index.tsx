type MessageProps = {
    message: string
}

const message = (type: 'error' | 'success', message: string) => <div className={`alert alert-${type}`}><span>{message}</span></div>

export const SuccessMessage = (props: MessageProps) => message('success', props.message);
export const ErrorMessage = (props: MessageProps) => message('error', props.message);