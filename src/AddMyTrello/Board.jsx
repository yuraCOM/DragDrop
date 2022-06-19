import React, { useState } from 'react'
import Item from './Item'
import AddModalTodo from './ModalAddTodo/AddModalTodo'


const Board = (props) => {

    const [TodoModal, setTodoModal] = useState(false)
    const [todo, setTodo] = useState(null)

    let board = props.board
    let currentBoard = props.currentBoard

    let cureentItem = props.cureentItem
    let boards = props.boards
    let setBoards = props.setBoards


    function dropCardHandler(e, board) {
        board.items.push(cureentItem)
        const currentIndex = currentBoard.items.indexOf(cureentItem)
        // console.log('board', board, 'cureentItem', cureentItem, 'currentBoard', currentBoard);
        // console.log(currentIndex);
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }
        ))
        e.target.style.boxShadow = 'none'
    }

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className === "item") {
            e.target.style.boxShadow = '0 5px 3px #673ab7 '
        }
    }

    function delBoard(board) {
        let del = window.confirm(`Удалить доску: ${board.title}?!`);
        if (del) {
            const currentIndex = boards.indexOf(board)
            boards.splice(currentIndex, 1)
            setBoards(boards.map(b => {
                return b
            }
            ))
        }
    }

    function addTodo() {
        if (todo) {
            board.items.push(todo)
        } else {
            return false
        }
        setTodoModal(false)
    }


    return (

        <div>
            <AddModalTodo TodoModal={TodoModal} setTodoModal={setTodoModal}
                todo={todo} setTodo={setTodo} addTodo={addTodo}
            ></AddModalTodo>

            <div className={`card text-white bg-${board.background} mb-3`}
                style={{ maxWidth: '20rem' }}
            >
                <div className='headCard'>
                    <span className="badge rounded-pill bg-success" onClick={() => setTodoModal(true)}>+Todo</span>
                    <div className="card-header">{(!board.title ? 'Без Заголовка' : board.title)}</div>
                </div>

                <div className="card-body"
                    onDragOver={(e) => { dragOverHandler(e) }}
                    onDrop={(e) => { dropCardHandler(e, board) }}
                >
                    {<Item
                        props={props}
                    />}
                </div>
                <span className="badge bg-danger" onClick={e => delBoard(board)}>DelBoard</span>

            </div>
        </div >

    )
}

export default Board