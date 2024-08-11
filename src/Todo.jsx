import './Todo.css';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
function Todo() {
    const [todos, setTodos] = useState([{task:"first task",id:uuidv4(),isDone:false}]);
    const [newTodo,setNewTodo] = useState("");

    const addNewTask = (event)=>{
        //console.log("event.target.value = ",event.target.value);
        setNewTodo(()=>{
            return event.target.value;
        });
    }
    const addNewTodo = ()=>{

        setTodos((prevTodo)=>{
            //console.log("new todo=",[...prevTodo,{task:newTodo,id:uuidv4()}]);
            return [...prevTodo,{task:newTodo,id:uuidv4(),isDone:false}];
        });
    }
    const UpperCaseAll = ()=>{
        setTodos((prevTodo)=>{
            // console.log("previous todo=",prevTodo);
            return prevTodo.map((todoObject)=>{

                    //console.log(todoObject.task.toUpperCase());
                    return {...todoObject,task:todoObject.task.toUpperCase()};

            });
        });
    }
    const markAllAsDone = ()=>{
        setTodos((prevTodo)=>{
            return prevTodo.map((todoObject)=>{
                return {...todoObject,isDone:true}
            });
        });
    }
    const upperCaseOne = (id)=>{
        setTodos((prevTodo)=>{
            return prevTodo.map((todoObject)=>{
                return todoObject.id === id ? {...todoObject,task:todoObject.task.toUpperCase()} : todoObject;

            });
        });
    }
    const markOneAsDone = (id)=>{
        setTodos((prevTodo)=>{
            // return prevTodo.map((todoObject)=>{
            //     return todoObject.id === id ? {...todoObject,isDone:true} : {...todoObject};

            // });
            return prevTodo.filter((todoObject)=>{
                return todoObject.id !== id;

            });
        });
    }
    return (
        <div>
            <h1 className="heading">Todo List</h1>
            <div className="input m-4" style={{display:"flex",justifyContent:"space-around"}}>
                <input placeholder="enter task..." style={{display:"inline-flex",color:"white"}} className="mx-3 form-control bg-dark" value={newTodo} onChange={addNewTask}/>
                <button className="btn btn-light mx-3" onClick={addNewTodo}>Add</button>
            </div>
            {/* Display all the todos */}
            <ul>
                {todos.map((todo)=>{
                    return (
                        <li key={uuidv4()} style={{display:"flex","flexDirection":"row","justifyContent":"space-between","alignItems":"center"}}>

                           <div style={todo.isDone ? {textDecoration:"line-through"}:{}}>
                                {todo.task}
                           </div>
                            <div>
                                <button className='ms-5 mb-2' onClick={()=>{upperCaseOne(todo.id)}}>UpperCase</button>
                                <button className='ms-5 mb-2' onClick={()=>{markOneAsDone(todo.id)}}><i className="fa-solid fa-trash-can"></i></button>
                           </div>
                        </li>)
                })}
            </ul>

            <div>
                <button className='mx-2 mt-5' onClick={UpperCaseAll}>UpperCase All</button>
                <button className='mx-2 mt-5' onClick={markAllAsDone}>Mark As Done All</button>
            </div>
        </div>
    );
}

export default Todo;