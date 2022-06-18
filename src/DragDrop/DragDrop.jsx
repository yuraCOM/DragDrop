import React, { useState } from 'react'
import './DragDrop.css'

const DragDrop = () => {
    const [cardsList, setCardsList] = useState([
        { id: 1, order: 3, text: 'Card 3' },
        { id: 2, order: 2, text: 'Card 2' },
        { id: 3, order: 1, text: 'Card 1' },
        { id: 4, order: 4, text: 'Card 4' },
    ])

    const [curentCard, setCarrentCard] = useState(null)

    //take card
    function dragStartHandler(e, card) {
        // console.log('drag take card carrent', card);
        setCarrentCard(card)

    }

    // way out over card
    function dragEndHandler(e) {
        e.target.style.background = 'white'
    }


    //way over card
    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = 'lightgray'
    }

    //put on card
    function dropHandler(e, card) {
        e.preventDefault()
        console.log('drop', card);

        // @ts-ignore
        setCardsList(cardsList.map(c => {
            if (c.id === card.id) {
                return { ...c, order: curentCard.order }
            }
            if (c.id === curentCard.id) {
                return { ...c, order: card.order }
            }
            console.log(c, card, cardsList);
            return c
        }))
        e.target.style.background = 'white'
    }


    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <div className='wrapper'>
            {cardsList.sort(sortCards).map((card, index) =>
                <div
                    onDragStart={(e) => { dragStartHandler(e, card) }}
                    onDragLeave={(e) => { dragEndHandler(e) }}
                    onDragEnd={(e) => { dragStartHandler(e) }}
                    onDragOver={(e) => { dragOverHandler(e) }}
                    onDrop={(e) => { dropHandler(e, card) }}
                    draggable={true}
                    className='card' key={index}>
                    {card.text}
                </div>
            )}
        </div>
    )
}

export default DragDrop

