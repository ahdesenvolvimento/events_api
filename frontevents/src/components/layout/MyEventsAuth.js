import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faEdit, faShareSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
export default function MyEventsAuth({ data, deleteEvent, styles, presence }) {
    var th = [];
    presence ? (th = [
        'Titulo',
        'Início',
        'Fim',
        'Ações']) : (th = [
            'Titulo',
            'Descrição',
            'Início',
            'Fim',
            'Cidade',
            'Capacidade',
            'Privado?',
            'Ações'
        ])

    return (
        <>
            {data.length == 0 ? <p className={styles.noEvents}>Você não tem nenhum evento cadastrado, clique <Link to="/newevent">aqui</Link> para criar um novo evento</p> : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                {th.map((header) => (
                                    <th>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.title}</td>
                                    <td className={styles.descriptionTable}>
                                        {event.description}
                                    </td>
                                    <td>{event.start_time}</td>
                                    <td>{event.finish_time}</td>
                                    <td>{event.city}</td>
                                    <td>{event.capacity}</td>
                                    <td>{event.private ? "Sim" : "Não"}</td>
                                    <td>
                                        {presence ? (
                                            <>
                                                <button type="button" className="btn btn-secondary" title="Enviar convites">
                                                    <FontAwesomeIcon icon={faShareSquare} /> Remover presença
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link to={"/events/" + event.id} className="btn btn-primary" title="Editar evento">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                                <button type="button" className="btn btn-danger" title="Deletar evento" onClick={(e) => deleteEvent(event.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                                <button type="button" className="btn btn-secondary" title="Enviar convites">
                                                    <FontAwesomeIcon icon={faShareSquare} />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}