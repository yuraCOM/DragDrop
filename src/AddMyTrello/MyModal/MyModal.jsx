import React, { useState } from "react";
import "./mymodal.css";


const addBoardBtnolors = ["primary", "secondary", "success", "info", "warning", "danger", "light"]


const MyModal = (props) => {

  const [txtInput, setTxtInput] = useState("Введите название доски")

  const handlerColorBtn = (e, item) => {
    props.greatNewBoard(e, item)
    document.querySelector("#inputDefault").value = ''
    document.querySelector("#inputDefault").placeholder = 'Введите название доски'

  }

  const handlerClearInput = () => {
    props.setActiveModal(false)
    document.querySelector("#inputDefault").value = ''
    document.querySelector("#inputDefault").placeholder = 'Введите название доски'

  }

  return (
    <div className={props.activeModal ? "mymodal " : "mymodal close"} onClick={() => props.setActiveModal(false)}>

      {/* остановить всплытие события выше этого блока */}
      <div className="mymodal-body" onClick={(e) => e.stopPropagation()}>

        <button type="button" className="btn btn-danger btnModalClose" onClick={handlerClearInput}>x</button>
        <div>

          <input type="text" className="form-control" placeholder="Введите название доски"
            id="inputDefault" onFocus={(event) => (event.target.placeholder = "")}
            onChange={(event) => {
              props.setNewNameBoard(event.target.value)
            }}
          ></input>

          {addBoardBtnolors.map((item, index) =>
            <button type="button" className={`btn btn-${item}`} key={index + 'btnnewboard'}
              // onClick={props.addBoard}
              // onClick={props.addBoard}
              onClick={(e) => { handlerColorBtn(e, item) }}
            >{item.charAt(0).toUpperCase() + item.slice(1)}</button>)}
        </div>

        <button type="button" className="btn btn-danger "
          onClick={handlerClearInput}>Cancel</button>
      </div>

    </div >
  )
}

export default MyModal
