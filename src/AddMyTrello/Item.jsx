import React from 'react'
import { randomN } from './Tools'

const Item = (props) => {
    // console.log('Item', props);

    props = props.props
    let board = props.board
    // console.log(board);

    function dragStartHandler(e, board, item) {
        // console.log('item', item);
        props.setCurrentBoard(board)
        props.setCureentItem(item)
    }

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.classList.contains("item")) {
            e.target.style.boxShadow = '0 15px 3px #f30ee5 '
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'

    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e, board, item) {
        e.preventDefault()
        e.stopPropagation()
        // индекс карточки которую держим
        const currentIndex = props.currentBoard.items.indexOf(props.cureentItem)
        props.currentBoard.items.splice(currentIndex, 1)

        //индекс карточки над которой держим 
        const dropIndex = board.items.indexOf(item)

        board.items.splice(dropIndex + 1, 0, props.cureentItem)

        board.items.map(item => item.id = randomN())

        props.setBoards(props.boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === props.currentBoard.id) {
                return props.currentBoard
            }
            return b
        }
        ))
        e.target.style.boxShadow = 'none'
    }

    function delTodo(e, board, item) {

        //индекс удаленного дела
        const todoIndex = board.items.indexOf(item)
        console.log(todoIndex);
        board.items.splice(todoIndex, 1)
        console.log(board);
        console.log('props.boards', props.boards);

        let freshBoards = props.boards
        console.log(freshBoards);
        props.setBoards(freshBoards)

        let data = JSON.stringify(props.boards);
        localStorage.setItem('boards', data);
        // console.log('set local store', localStorage.getItem('boards'));

    }

    return (
        board.items.map((item, index) =>

            <div className="alert alert-dismissible alert-secondary item"
                key={index + 'i'}
                draggable={true}
                onDragStart={(e) => { dragStartHandler(e, board, item) }}
                onDragOver={(e) => { dragOverHandler(e) }}
                onDragLeave={(e) => { dragLeaveHandler(e) }}
                onDragEnd={(e) => { dragEndHandler(e) }}
                onDrop={(e) => { dropHandler(e, board, item) }}>
                <button type="button" className="btn-close" data-bs-dismiss="alert"
                    onClick={(e) => { delTodo(e, board, item) }}></button>

                {item.title}
            </div>

        )
    )
}

export default Item