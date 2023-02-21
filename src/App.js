import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './App.css';

import TodoCard from './Component/TodoCard/TodoCard';

function App() {
  const [toDos, setToDos] = useState([])
  const [newTitle, setNewTitle] = useState('')
  

  useEffect(()=>{
      let data = localStorage.getItem("data")
      if(data){
        setToDos(JSON.parse(data))
      }
  },[])

  const addHandler =()=>{
    let newTodo = {  
      id: Math.random(),
      title: newTitle,
      isCompleted: false,
      isDeleted: false
  }

  toDos.push(newTodo) 
  setToDos([...toDos]) 

    localStorage.setItem("data",JSON.stringify(toDos)) 
  }


  
  const completeHandler =(id)=>{
   
    
      const todo = toDos.find(e => e.id === id); 

       todo.isCompleted = true

    setToDos([...toDos]) 
    localStorage.setItem("data",JSON.stringify(toDos)) 
  }

  
  const deleteHandler =(id)=>{
   
    
    const todo = toDos.find(e => e.id === id); 
    todo.isDeleted = true 
    setToDos([...toDos])
    localStorage.setItem("data",JSON.stringify(toDos)) 
  }

  console.log(toDos)
  return (
    <div className='main-container'>
      <div className='input-container'>

        <Box

          sx={{
            '& > :not(style)': { m: 2, width: '45ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" 
            label="new todo" 
            variant="standard" 
            onChange={(data)=>setNewTitle(data.target.value)}/>
        </Box>
        <Button variant="out lined" onClick={addHandler}>Add</Button>
      </div>
      <div className='output-container'>
        <div className='card-container'>
          <h4>Pending</h4>
          <div className='card-list'>
            {
              toDos?.map((e) => {
                if(!e.isCompleted) { 
                  return(
                  <div>
                    {!e.isDeleted &&  
                     <TodoCard key={e.id} title={e.title} id= {e.id} complete={completeHandler}  isCompleted={e.isCompleted} delete= {deleteHandler}/>}
                     </div>
                     )
                } else {
                  return <></>
                }
              })
            }
          </div>
        </div>
        <div className='card-container'>
          <h4> complete </h4>
          <div className='card-list'>
          {
              toDos?.map((e) => {
                if(e.isCompleted) {
                   return (!e.isDeleted && <TodoCard key={e.id} id={e.id} title={e.title} isCompleted={e.isCompleted} delete={deleteHandler}/>)
                } else {
                  return <></>
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
