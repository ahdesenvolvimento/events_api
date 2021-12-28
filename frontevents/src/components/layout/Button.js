export default function Button({ text, handleOnClick, type, title, className, icone, dataToggle, dataTarget, disabled }) {
    return (
        <button type={type} className={className} onClick={handleOnClick} disabled={disabled} title={title} data-bs-toggle={dataToggle} data-bs-target={dataTarget}>
            {icone} {text}
        </button>
    )
}