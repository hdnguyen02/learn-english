
import React, { useEffect, useRef, useState } from 'react'
import { baseUrl, version } from '../global'
import { useParams } from 'react-router-dom'
import '../card.css'

function Card() {

    const accessToken = localStorage.getItem('accessToken')
    const params = useParams()
    const idDeck = params.id
    const [cards, setCards] = useState()
    const [deck, setDeck] = useState()
    const [index, setIndex] = useState(0)


    async function getCards() {
        const url = `${baseUrl + version}/cards?idDeck=${idDeck}`
        try {
            const jsonRp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            const response = await jsonRp.json()
            if (!jsonRp.ok) {
                throw new Error(response.message)
            }
            setCards(response.data)
        }
        catch (error) {

        }
    }

    async function getDeck() {
        const url = `${baseUrl}${version}/decks/${params.id}`
        const jsonRp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        const response = await jsonRp.json()
        setDeck(response.data)
    }

    useEffect(() => {
        getDeck()
        getCards()
    }, [])


    function handleNextCard() {
        document.getElementById('card').classList.remove('is-flipped')
        const lenCards = cards.length
        if (index == lenCards - 1) {
            setIndex(0)
        }
        else {
            setIndex(index + 1)
        }
    }
    function handlePreCard() {
        setIsFlip(false)
        const lenCards = cards.length
        if (index == 0) {
            setIndex(lenCards - 1)
        }
        else {
            setIndex(index - 1)
        }
    }

    async function handleDelete() {
        const idCard = cards[index].id
        const url = `${baseUrl + version}/cards/${idCard}`
        try {
            const jsonRp = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            const response = await jsonRp.json()
            if (!jsonRp.ok) {
                throw new Error(response.message)
            }
            setCards(cards.slice(0, index).concat(cards.slice(index + 1)))
            await getCards()
        }
        catch (error) {
            failRef.current.show(error.message, 2000)
        }
    }

    function front() {
        return <div className='h-full relative flex flex-col items-center justify-center'>
            {action()}
            {cards[index].image && <div className="h-40 flex justify-center">
                <img className="object-contain" src={cards[index].image} />
            </div>}
            <p className="text-2xl text-center">{cards[index].term}</p>
        </div>
    }

    function back() {
        return <div className='h-full relative flex flex-col items-center justify-center'>
            {action()}
            <p className="text-2xl text-center">{cards[index].definition}</p>
            {cards[index].example && <p className="text-xl text-center">{cards[index].example}</p>}
        </div>
    }

    function action() {
        return (
            <div className='absolute top-4 right-8 flex items-center gap-x-3'>
                <button>
                    <i className="fa-regular fa-star text-xl font-light"></i>
                </button>
                <button><i className="fa-regular fa-heart text-xl font-light"></i></button>
            </div>
        )
    }

    function handleFlipCard(event) {
        event.currentTarget.classList.toggle('is-flipped')
    }

    return (cards && cards.length != 0 &&
        <div className='flex justify-center'>
            <div className="card-container">
                <h3 className='text-3xl font-medium'>{ deck.name }</h3>
                <div className="mt-12 card mx-auto" id="card" onClick={handleFlipCard}>
                    <div className="card-front">
                        {front()}
                    </div>
                    <div className="card-back">
                        {back()}
                    </div>
                </div>
                <div className='flex gap-x-6 justify-center items-center mt-5'>
                    <button onClick={handlePreCard} className="bg-[#F0F6F6]  h-12 w-12 rounded-full"><i className="fa-solid fa-chevron-left text-xl"></i></button>
                    <span className='text-xl'>{index + 1}/{cards.length}</span>
                    <button onClick={handleNextCard} className="bg-[#F0F6F6]  h-12 w-12 rounded-full"><i className="fa-solid fa-chevron-right text-xl"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Card