import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faShareSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Button from '../layout/Button';
export default function MyEventsAuth({ data, deleteEvent, styles }) {
    return (
        <>
        {data.length == 0 ? <p className={"alert alert-danger"}>Você não tem nenhum evento cadastrado, clique <Link to="/newevent">aqui</Link> para criar um novo evento</p> : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Descrição</th>
                                <th>Início</th>
                                <th>Fim</th>
                                <th>Cidade</th>
                                <th>Capacidade</th>
                                <th>Privado?</th>
                                <th>Ações</th>
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
                                    <td>{event.localidade}</td>
                                    <td>{event.capacity}</td>
                                    <td>{event.private ? "Sim" : "Não"}</td>
                                    <td>
                                        <Link to={"/events/" + event.id} className="btn btn-primary" title="Editar evento">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                        <Button type="button" className="btn btn-danger" text={<FontAwesomeIcon icon={faTrash} />} title="Deletar evento" handleOnClick={(e) => deleteEvent(event.id)}/>
                                        <Link to={"/events/invite/" + event.id} className="btn btn-secondary" title="Enviar convites">
                                            <FontAwesomeIcon icon={faShareSquare} />
                                        </Link>
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