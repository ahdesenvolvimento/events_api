export default function Button({text, handleOnClick, type, title, className, icone}){
    return (
        <button type={type} className={className} onClick={handleOnClick} title={title}>
            {icone} {text}
        </button>
    )
}