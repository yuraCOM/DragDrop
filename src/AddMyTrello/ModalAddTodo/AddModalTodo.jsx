import React from "react";
import "./adModalTodo.css";
import Tools from '../Tools'



const AddModalTodo = (props) => {


  function handlerAddTodo(e) {
    let title = e.target.value
    let todo = title ? { id: Tools.randomN(), title: title } :
      { id: Tools.randomN(), title: 'нет данных' }
    props.setTodo(todo)
  }

  function addhandler() {
    props.addTodo()
  }

  return (
    <div className={props.TodoModal ? "mymodal " : "mymodal close"} onClick={() => props.setTodoModal(false)}>

      {/* остановить всплытие события выше этого блока */}
      <div className="mymodal-body" onClick={(e) => e.stopPropagation()}>

        <button type="button" className="btn btn-danger btnModalClose" onClick={() => props.setTodoModal(false)}>x</button>

        <div className="divAddToDo">

          <input type="text" className="form-control inputAddToDo" placeholder="Внесите дело"
            id="inputDefault" onFocus={(event) => (event.target.value = "")}

            onChange={handlerAddTodo}
          ></input>

          <button type="button" className="btn btn-success" onClick={addhandler}>+ADD</button>

        </div>

        <button type="button" className="btn btn-danger "
          onClick={() => props.setTodoModal(false)}>Cancel</button>

      </div>

    </div >
  )
}

export default AddModalTodo
