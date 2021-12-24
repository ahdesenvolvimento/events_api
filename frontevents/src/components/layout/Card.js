export default function Card({ content, backgroundColor, border }) {
    return (
        <div className="card mt-3" style={{ backgroundColor: backgroundColor, border: border }}>
            <div className="card-body">
                {content}
            </div>
        </div>
    )
}