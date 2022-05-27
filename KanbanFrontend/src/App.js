import React, { Component, useRef, useState } from "react";
import {Col} from 'react-bootstrap';
import Board from './components/Board';
import './index.css';
import axios from "axios";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [
                { title: 'TODO', items: [] },
                { title: 'ONGOING', items:[] },
                { title: 'BLOCKED', items: [] },
                { title: 'DONE', items: [] },
            ]
        }
    }
    
    componentDidMount(){
        axios.get('api/TodoItems').then(res => {
                if(res.status === 200 ){
                    this.loadData(res.data);
                }    
        })
    }

    loadData(temp){
        
        if (this.state.todos.some(arr => arr.items.length !== 0)){
            return
        }   
       
        temp.map((todo) => 
        
            this.setState({
                ...this.state.todos[todo.column].items.push(
                    {id: todo.id,
                        title: todo.title,
                        description: todo.description,
                        priority: todo.priority,
                        deadline: todo.deadline,
                        column: todo.column,
                        
                    }
                )
            })
        )
    };
    
 
render(){
    return (
        <div id="whole" className='App'>
                <Col className="header">Board</Col>
                <Board data={this.state.todos}/>

        </div>
        );
    }
}
   
export default App;

