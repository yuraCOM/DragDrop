import React, { useEffect, useState } from 'react'
import './MyTrelloStyle.css'

const MyTrello = () => {
    const [boards, setBoards] = useState([
        { id: 1, title: "Сделать", items: [{ id: 1, title: "Пойти в магазин" }, { id: 2, title: "Пойти в спортзал" }, { id: 3, title: "Покормить кота" }] },
        { id: 2, title: "Проверить", items: [{ id: 4, title: "Проверить уроки" }, { id: 5, title: "Задачи по математике" }, { id: 6, title: "Коммунальные платежи" }] },
        { id: 3, title: "Сделано", items: [{ id: 7, title: "Поменять резину" }, { id: 8, title: "Приготовить ужин" }, { id: 9, title: "Постирать вещи" }] },

    ])

    const [currentBoard, setCurrentBoard] = useState(null)
    const [cureentItem, setCureentItem] = useState(null)



    function dropCardHandler(e, board) {
        console.log(boards);
        board.items.push(cureentItem)
        const currentIndex = currentBoard.items.indexOf(cureentItem)
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

    }


    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className === "item") {
            e.target.style.boxShadow = '0 5px 3px #673ab7 '
        }
    }

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCureentItem(item)
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
        const currentIndex = currentBoard.items.indexOf(cureentItem)
        currentBoard.items.splice(currentIndex, 1)
        //индекс карточки над которой держим 
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, cureentItem)
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


    }


    return (
        <div className='appTrello'>
            {boards.map((board, index) =>
                <div
                    className='board'
                    key={index + 'b'}
                    onDragOver={(e) => { dragOverHandler(e) }}
                    onDrop={(e) => { dropCardHandler(e, board) }}

                >
                    <div className="board_title" >{board.title}</div>
                    {board.items.map((item, index) =>
                        <div
                            className="item"
                            key={index + "i"}
                            draggable={true}
                            onDragOver={(e) => { dragOverHandler(e) }}
                            onDragLeave={(e) => { dragLeaveHandler(e) }}
                            onDragStart={(e) => { dragStartHandler(e, board, item) }}
                            onDragEnd={(e) => { dragEndHandler(e) }}
                            onDrop={(e) => { dropHandler(e, board, item) }}
                        >{item.title}</div>
                    )}


                </div>
            )}

        </div>
    )
}

export default MyTrello




//https://www.youtube.com/watch?v=RPtDuVba1XQ&list=PL6DxKON1uLOENy8yYgn0uLwB6p8eAW9NZ&index=4


