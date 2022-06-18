import React, { useEffect, useState } from 'react'
import Board from './Board'
import './AddMyTrelloStyle.css'
// import '../bootstrap.min.css'
import 'bootswatch/dist/darkly/bootstrap.min.css';
import Nav from './Nav'
import { randomN } from './Tools';

const AddMyTrello = () => {

    let dataStore = () => {
        if (localStorage.boards) {
            return JSON.parse(localStorage.getItem('boards'))
        } else {
            return [
                { id: 10, title: "Сделать (пример)", background: 'primary', items: [{ id: 1, title: "Пойти в магазин" }, { id: 2, title: "Пойти в спортзал" }, { id: 3, title: "Покормить кота" }] },
                { id: 20, title: "Проверить (пример)", background: 'success', items: [{ id: 4, title: "Проверить уроки" }, { id: 5, title: "Задачи по математике" }, { id: 6, title: "Коммунальные платежи" }] },
                { id: 30, title: "Сделано (пример)", background: 'warning', items: [{ id: 7, title: "Поменять резину" }, { id: 8, title: "Приготовить ужин" }, { id: 9, title: "Постирать вещи" }] },

            ]
        }

    }

    const [boards, setBoards] = useState(dataStore)

    const [newColorOfBoard, setNewColorOfBoard] = useState(null)
    const [currentBoard, setCurrentBoard] = useState(null)
    const [cureentItem, setCureentItem] = useState(null)

    const [key, setKey] = useState(randomN)


    useEffect(() => {
        let data = JSON.stringify(boards);
        localStorage.setItem('boards', data);
        setKey(randomN())

    }, [boards])



    return (
        <div>
            {/* changeBoards={changeBoards} */}
            <Nav boards={boards} setBoards={setBoards}
                newColorOfBoard={newColorOfBoard} setNewColorOfBoard={setNewColorOfBoard}
            ></Nav>

            <div key={key} className='appTrello'>

                {boards.length === 0 ? <h1>Добавьте доску</h1> : false}

                {boards.map((board, index) =>
                    <Board
                        key={index + 'Board'}
                        board={board}
                        index={index}
                        currentBoard={currentBoard}
                        setCurrentBoard={setCurrentBoard}
                        cureentItem={cureentItem}
                        setCureentItem={setCureentItem}
                        boards={boards}
                        setBoards={setBoards}
                        newColorOfBoard={newColorOfBoard}
                    >
                    </Board>)}
            </div>

        </div>

    )
}

export default AddMyTrello


//https://www.youtube.com/watch?v=RPtDuVba1XQ&list=PL6DxKON1uLOENy8yYgn0uLwB6p8eAW9NZ&index=4


