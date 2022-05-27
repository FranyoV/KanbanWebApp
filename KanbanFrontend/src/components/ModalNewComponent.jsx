import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';



const NewTodoModal = ({ addNewCard, openNewModal, closeNewModal, addNewToGroup }) => {
    return (
        <div>
            <Modal show={openNewModal} onHide={closeNewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New Todo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={
                        (e) => {
                            e.preventDefault();
                            const newItem = {
                                title: e.target.elements[0].value,
                                description: e.target.elements[1].value,
                                deadline: e.target.elements[2].value,
                                column: addNewToGroup

                            }
                            let newCard = {title: newItem.title, description: newItem.description, priority: newItem.priority, deadline:newItem.deadline, column: addNewToGroup};
                            closeNewModal(false);
                            addNewCard(newItem);
                         
                        }}
                    >

                        <Form.Group
                            className="mb-3"
                            controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                name='title'
                                as="textarea" rows={1}
                                placeholder="eg. Note.."
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="description"
                            >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                rows={1}
                                placeholder="eg. This is the note's description.."
                            />
                        </Form.Group>

                       
                        <Form.Group
                            className="mb-3"
                            controlId="deadline"
                            >
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="deadline"
                                rows={1}
                                placeholder="eg. 2022.05.27."
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => closeNewModal(false)} >
                                Close
                            </Button>
                            <Button variant="primary" type='submit' >
                                Add
                            </Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
};


export default NewTodoModal;