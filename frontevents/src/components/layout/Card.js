export default function Card({ content, backgroundColor, border, title, footer, styles }) {
    return (
        <div className={styles + " card mt-3"} style={{ backgroundColor: backgroundColor, border: border }}>
            {title && (
                <>
                    <div className="card-header">
                        <h5>{title}</h5>
                    </div>
                </>
            )}
            <div className="card-body">
                {content}
            </div>
            {footer && (
                <>
                    <div className="card-footer">
                        {footer}
                    </div>
                </>
            )}
        </div>
    )
}