import React, { useEffect, useState } from "react";

const Fila = () =>{
    const [tarea, setTarea] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        fetch('https://playground.4geeks.com/todo/users/user_pcm')
        .then(response => response.json())
        .then(data=>setTodos(data.todos))
        .catch(error=>console.error(error));
    },[]);

    const agarrarCambio = (event)=>{
        setTarea(event.target.value)
    }
    const guardarTarea = (nuevaTarea) =>{
       fetch('https://playground.4geeks.com/todo/todos/user_pcm',{
        method:'POST', 
        headers : {'Content-Type': 'application/json', 'accept' : 'application/json'},
        body : JSON.stringify({'label' : nuevaTarea, 'is_done' : false}),
       })
       .then(response => {
        if (!response.ok) {
          console.log(nuevaTarea);
        }
        return response.json();
      })
       .then(data=>{setTodos([...todos, data]);setTarea("")})
       .catch(error=>console.error(error));
    }
    const pulsarTecla = (event) =>{
        if (event.key === "Enter") if ((tarea.trim().length >=4)){
            guardarTarea(tarea);
        }
    }

    const borrarTarea = (id) => {
        fetch('https://playground.4geeks.com/todo/todos/' + id, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al borrar la tarea');
                }
                setTodos(todos.filter(t => t.id !== id));
            })
            .catch(error => console.error(error));
    };
    return (
    <>
		<h1>Mis Tareas</h1>
		<div className="container">
			<ul>
                <input type="text" placeholder="¿Qué tengo pendiente?" 
                onChange={agarrarCambio} value={tarea} 
                onKeyDown={pulsarTecla}/>

				{todos.map((t)=>(
                    <li key={t.id}>
                        {t.label} <i className="borrar" onClick={()=>borrarTarea(t.id)}><strong>X</strong></i>
                    </li>
                ))}
			</ul>
			<div className="counter">{todos.length} tareas</div>
            <div className="pag1"></div>
            <div className="pag2"></div>

		</div>
		</>
    )
}

export default Fila