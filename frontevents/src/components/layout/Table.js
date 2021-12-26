import styles from "./Table.module.css";
export default function Table({ data, headers, acoes }) {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {headers.map((header) => {
                        {
                            headers.map((header) => (
                                <th>{Object.keys(data)}</th>
                            ))
                        }
                    })}
                    {data.map((event) => (
                        <tr>
                            {Object.keys(event).map((objeto) => (
                                objeto !== 'id' && <td className={styles.descriptionTable}>{event[objeto]}</td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        {acoes}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}