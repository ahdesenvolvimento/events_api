import { useEffect, useState } from "react";
import Card from "../layout/Card";
import Select from "../form/Select";
import Form from "../form/Form";
import SubmitButton from "../form/SubmitButton";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faEdit, faShareSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import MyModal from "../layout/MyModal";
export default function EventsInvite() {
    const [users, setUsers] = useState([]);
    const [convites, setConvites] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const handleClose = () => setShow(false);
    const handleShow = (message) => {
        setShow(true);
        setMessage(message)
    }
    const { id } = useParams();
    useEffect(() => {
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access-token"),
            },
        };
        fetch("http://localhost:8000/user/events/", init)
            .then((response) => response.json())
            .then((data) => {
                let new_array = []
                data.map((item) => {
                    new_array.push({ value: item.id, text: item.username })
                })
                setUsers(new_array);
            })
            .catch((error) => console.log(error));
    }, [])

    const inviteUsers = (e) => {
        e.preventDefault();
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access-token"),
            },
            body: JSON.stringify({ "event": id, "invitations": convites })
        };
        fetch("http://localhost:8000/events/invite/", init)
            .then((response) => response.json())
            .then((data) => {handleShow(data.message)})
            .catch((error) => console.log(error));
    }
    const handleChange = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setConvites(value)
    }
    const content = (
        <>
            <Select text="Selecione os usuários" name="invite" handleOnChange={handleChange} multiple="multiple" options={users} value="" />
            <SubmitButton text="Convidar usuários" />
        </>
    )

    return (
        <div className="row">
            <Card content={<Form content={content} method="POST" border="none" handleOnSubmit={inviteUsers} />} />
            <MyModal show={show} handleClose={handleClose} message={message} title={"Sucesso!"}/>
        </div>
        
    );
}
