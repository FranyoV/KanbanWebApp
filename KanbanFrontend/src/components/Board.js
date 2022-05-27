import React, { useState } from "react";
import {Container, Button, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewTodoModal from "./ModalNewComponent";
import CardComponent from "./CardComponent";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";


function Board({data}) {

    const [list, setList] = useState(data);

    const [addNewToGroup, setAddNewtoGroup] = useState();
    const [openNewModal, setOpenNewModal] = useState(false)

    const openModal = (e, params) => {
        setOpenNewModal(true);
        setAddNewtoGroup(params.groupIndex);
    }

    const deleteCard = (params) => {
        const id= params.item.id;
        setList(oldList => {
            let newList = JSON.parse(JSON.stringify(oldList));
            newList[params.groupIndex].items.splice(params.itemIndex, 1);         
            axios.delete(`api/todoitems/${id}`, params.item).catch(error => console.error('Delete unsuccesful', error))  

            newList[params.groupIndex].items.map((todo) => {
                const index = newList[params.groupIndex].items.findIndex(n => n.id === todo.id);
                todo.priority = index;
                return todo
            })
            axios.put(`api/todoitems/columns/${params.groupIndex}`, newList[params.groupIndex].items)
            .catch(error => console.error('Column update unsuccessful.', error))
            return newList;
        },
      
        )
        
    }


    const addNewCard = (newItem) => {
        const columnLength = list[newItem.column].items.length;
        const newCard ={
            title: newItem.title, 
            description: newItem.description, 
            priority: columnLength, 
            deadline:newItem.deadline, 
            column: addNewToGroup
        }
        axios.post(`api/todoitems`, newCard).then(res => {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[newCard.column].items.push(newCard)
                return newList
            })}
               
            ).catch(error => console.error('Adding unsuccesful', error));
    }


    const editCard = (id, updatedCard, oldCard) => {
        const originalColumn = oldCard.column;

        if(updatedCard.column == originalColumn){
            const index = list[updatedCard.column].items.findIndex(n => n.id === updatedCard.id);
            axios.put(`api/todoitems/${id}`, updatedCard).catch(error => console.error('Unsuccessful update', error));

            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[updatedCard.column].items[index] = updatedCard
                return newList
            })
            
        }else{
            const newPriority =list[updatedCard.column].items.length
            const newCard = {
                title: updatedCard.title,
                description: updatedCard.description,
                priority: newPriority,
                deadline: updatedCard.deadline,
                column: updatedCard.column
            }
            
            const index = list[originalColumn].items.findIndex(n => n.id === oldCard.id);

            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));

                axios.post(`api/todoitems`, newCard).then(res => {
                    setList(oldList => {
                        let newList = JSON.parse(JSON.stringify(oldList));
                        newList[newCard.column].items.push(newCard)
                        return newList
                    })}
                ).catch(error => console.error('Adding unsuccesful', error));

                newList[originalColumn].items.splice(index, 1);  
                axios.delete(`api/todoitems/${oldCard.id}`, oldCard).catch(error => console.error('Delete unsuccesful', error))

                newList[originalColumn].items.map((todo) => {
                    const index = newList[originalColumn].items.findIndex(n => n.id === todo.id);
                    todo.priority = index;
                    return todo
                })  
                axios.put(`api/todoitems/columns/${originalColumn}`, newList[originalColumn].items)
                .catch(error => console.error('Column update unsuccessful.', error))

                axios.put(`api/todoitems/columns/${updatedCard.column}`, newList[updatedCard.column].items)
                .catch(error => console.error('Column update unsuccessful.', error))
     
                return newList;
        },)
        }

    }
    

    const moveUp = (item) => {
        
        if(0 === item.priority){
            console.log("már a legtetején van");
        }else{
            console.log("lehet feljebb menni");
            const lowerIndex = (list[item.column].items[item.priority-1].priority +1)
            const higherIndex = (list[item.column].items[item.priority].priority -1 )
    
            const toBeMovedUp = {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    priority: higherIndex,
                    deadline: item.deadline,
                    column: item.column
            }
            const toBeMovedDown = {
                id: list[item.column].items[item.priority-1].id,
                title: list[item.column].items[item.priority-1].title,
                description: list[item.column].items[item.priority-1].description,
                priority: lowerIndex,
                deadline: list[item.column].items[item.priority-1].deadline,
                column: list[item.column].items[item.priority-1].column
            }
       
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[item.column].items[item.priority] = toBeMovedDown;
                newList[item.column].items[item.priority-1] = toBeMovedUp;
                return newList
            })

            axios.put(`api/todoitems/${toBeMovedUp.id}`, toBeMovedUp)
            axios.put(`api/todoitems/${toBeMovedDown.id}`, toBeMovedDown)
           
         
        }
    }

    const moveDown = (item) => {
        let columnLength = Object.keys(list[item.column].items).length-1
       
        if(columnLength === item.priority){
            console.log("már a legalján van");
            
        }else{
            const lowerIndex = (list[item.column].items[item.priority].priority +1)
            const higherIndex = (list[item.column].items[item.priority+1].priority -1 )
            console.log("lehet feljebb menni");
            const toBeMovedDown = {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    priority: lowerIndex,
                    deadline: item.deadline,
                    column: item.column
            }
            const toBeMovedUp = {
                id: list[item.column].items[item.priority+1].id,
                title: list[item.column].items[item.priority+1].title,
                description: list[item.column].items[item.priority+1].description,
                priority: higherIndex,
                deadline: list[item.column].items[item.priority+1].deadline,
                column: list[item.column].items[item.priority+1].column
            }
        
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[item.column].items[item.priority] = toBeMovedUp;
                newList[item.column].items[item.priority+1] = toBeMovedDown;
                return newList
            })

            axios.put(`api/todoitems/${toBeMovedUp.id}`, toBeMovedUp)
            axios.put(`api/todoitems/${toBeMovedDown.id}`, toBeMovedDown)
            
        }
    }



    if(list !=null){
    return (      
        <Container>
        {openNewModal && <NewTodoModal addNewCard={addNewCard} openNewModal={openNewModal} closeNewModal={setOpenNewModal} addNewToGroup={addNewToGroup} />}
       
            <Row className='drag-n-drop row' >
                {list.map((group, groupIndex) => (
                    
                    <Col
                        key={group.title}
                        className="dnd-group col-sm" >

                        <Row className="group-title">
                            <Col className="title">{group.title}</Col>
                            <Col className="addButton">
                                <Button className="col" onClick={(e) => openModal(e, { groupIndex })}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </Col>
                           
                        </Row>
                        
                        {group.items.sort((a, b)=> (a.priority > b.priority) || (group.items.lenght<1) || (a.priority === b.priority) ? 1 : -1)
                            .map((item, itemIndex) => (

                            <div key={itemIndex} >

                                <CardComponent kulcs={itemIndex} 
                                groupIndex={groupIndex} 
                                itemIndex={itemIndex} 
                                item={list[groupIndex].items[itemIndex]} 
                                deleteCard={deleteCard}
                                editCard={editCard}
                                moveUp={moveUp}
                                moveDown={moveDown}
                                 />

                            </div>
                        ))}

                    </Col>
                ))}
            </Row>

        </Container>
    )
}
}

export default Board;
