import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Card, Nav, Button, Row, Col } from "react-bootstrap";
import EditTodoModal from "./ModalEditComponent";

const CardComponent = ({ groupIndex, itemIndex, item, deleteCard, editCard, moveUp, moveDown }) => {

    const [openEditModal, setOpenEditModal] = useState(false)

    const openEdit = (e, params) => {
        console.log("adding");
        setOpenEditModal(true);
    }

    if (item != null) {
        return (

            <div className={'dnd-item card'}>
                {openEditModal && <EditTodoModal openEditModal={openEditModal} closeEditModal={setOpenEditModal} item={item} editCard={editCard} />}
                <Col className="card-header">
                    <Card.Title >
                        <Button className="button" onClick={() => deleteCard({ groupIndex, itemIndex, item })}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                        <Button className="button" onClick={(e) => openEdit(e, { groupIndex })}>
                            <FontAwesomeIcon icon={faPencil} />
                        </Button>
                        <Button className="button" onClick={() => moveDown(item)}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                        <Button className="button" onClick={() => moveUp(item)}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                    </Card.Title>


                </Col>

                <Card.Body className="card-body">
                    <div>{item.title}</div>
                    <div>{item.description}</div>
                    <div >{'Deadline:' + item.deadline}</div>
                    <div className="card-prior">{'Priority: ' + (item.priority + 1)}</div>
                </Card.Body>

            </div>
        )
    }
}

export default CardComponent;