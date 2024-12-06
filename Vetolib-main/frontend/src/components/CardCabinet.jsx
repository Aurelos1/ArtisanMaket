import axios from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CardCabinet = ({ appointment }) => {
    const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString();
    const [cabinet, setCabinet] = useState({});
    const [owner, setOwner] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/cabinet/${appointment.cabinet_id}`)
            .then(response => {
                const cabinetData = response.data;
                setCabinet(cabinetData);
                return axios.get(`/user/${cabinetData.owner_id}`); 
            })
            .then(response => {
                setOwner(response.data); 
            })
            .catch(error => {
                console.log(error);
            });
    }, [appointment.cabinet_id]);

    const deleteRdv = async (appointment_id) => {
        try {
            await axios.delete(`/appointments/${appointment_id}`);
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='col-3'>
            <Card className='m-4  bg-primary text-white' style={{ height: "550px" }}>
                <Card.Header className='bg-primary text-danger text-end'>
                <button className='btn p-0' onClick={() => deleteRdv(appointment.appointment_id)}>
                        <i className="bi text-danger bi-x-octagon"></i>
                    </button>
                    {cabinet.image && <Card.Img variant="top" src={'../../public/images/'+cabinet.image} />}
           
                </Card.Header>
                <Card.Body>
                    <Card.Title>{cabinet.cabinet_name || "Nom du cabinet"}</Card.Title>
                    <Card.Text style={{ fontSize : "13px" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        <span className='fw-bold'>Numero</span>: {cabinet.phone_number || "065098048"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className='fw-bold'>Adresse </span>: {cabinet.address || "Adresse du cabinet"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className='fw-bold'>Date RDV </span>: {appointmentDate || "Date RDV"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='d-flex fw-bold'>
                            <div>
                                {owner.image && <img src={owner.image} alt="Image du Propriétaire du cabinet" />}
                            </div>
                            <div>
                                {owner.nom ? `${owner.nom} ${owner.prenom}` : "Nom et Prenom du propriétaire du cabinet"}
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

export default CardCabinet;
