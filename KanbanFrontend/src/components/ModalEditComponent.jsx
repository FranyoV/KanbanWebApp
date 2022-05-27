import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';


const EditTodoModal = ({ openEditModal, closeEditModal, item, editCard}) => {
  
  return (
      <div>  
        <Modal show={openEditModal} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Form onSubmit={
              (e) => {
                e.preventDefault();
                const newItem = {
                    id: item.id,
                    title: e.target.elements[0].value,
                    description: e.target.elements[1].value,
                    deadline: e.target.elements[2].value,
                    priority: item.priority,
                    column: e.target.elements[3].value
                  }
                  closeEditModal(false)
                  editCard(item.id, newItem, item);
              }
            }>

              <Form.Group 
                className="mb-3" 
                controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  as="textarea" rows={1}
                  name='title'
                  defaultValue={item.title}
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
                  rows={1} 
                  name="description"
                  defaultValue={item.description}
                  />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="deadline"
                >
                <Form.Label>Deadline</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={1} 
                  name="deadline"
                  defaultValue={item.deadline}
                  />
              </Form.Group>

              <Form.Group
              className="mb-3"
              controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" defaultValue={item.column}>
                  <option value="0">To Do</option>
                  <option value="1">Ongoing</option>
                  <option value="2">Blocked</option>
                  <option value="3">Done</option>      
              </Form.Select>
              </Form.Group>

              <Modal.Footer>
              <Button variant="secondary" onClick={() => closeEditModal(false)} >
                Close
              </Button>
              <Button variant="primary" type='submit' >
                Save Changes
              </Button>
            </Modal.Footer>
            </Form>
          </Modal.Body>

          
        </Modal>
      </div>
    );
}

export default EditTodoModal;
