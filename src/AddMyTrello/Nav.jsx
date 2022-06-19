import React, { useState } from 'react'
import MyModal from './MyModal/MyModal'
import Tools from './Tools'

const Nav = (props) => {

    const [activeModal, setActiveModal] = useState(false)
    const [newNameBoard, setNewNameBoard] = useState(null)

    const openModalAddBoardBtn = () => {
        setActiveModal(true)
    }


    function greatNewBoard(e, item) {
        props.setNewColorOfBoard(item)
        let newBoard = { id: Tools.randomN(), title: newNameBoard, items: [{ id: Tools.randomN(), title: "Внеси задачу!!" }], background: item }
        props.setBoards([...props.boards, newBoard])
        // changeBoards(newBoard, props.boards)
        setActiveModal(false)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://github.com/yuraCOM/DragDrop">MyTrello</a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* <button onClick={addBord} type="button" className="btn btn-primary">Primary</button> */}

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={openModalAddBoardBtn}>ADD Board</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">EMPTY</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://yuracom.github.io/CV10-12-2021/">AboutMe</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
            <MyModal activeModal={activeModal} setActiveModal={setActiveModal}
                newNameBoard={newNameBoard} setNewNameBoard={setNewNameBoard}
                newColorOfBoard={props.newColorOfBoard} setNewColorOfBoard={props.setNewColorOfBoard}
                greatNewBoard={greatNewBoard}

            ></MyModal>
        </div >

    )
}

export default Nav