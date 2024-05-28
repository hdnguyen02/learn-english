
import React, { useEffect, useRef, useState } from 'react'
import { baseUrl, version } from '../global'
import { useParams } from 'react-router-dom'
import Fail from '../component/Fail'
import Success from '../component/Success'
import { Link } from 'react-router-dom'

function Card() {

    const accessToken = localStorage.getItem('accessToken')
    const params = useParams()
    const idDeck = params.id
    const failRef = useRef()
    const successRef = useRef()
    const [cards, setCards] = useState()

    // một biến index cảm biến.  
    const [index, setIndex] = useState(0)
    const [isFlip, setIsFlip] = useState(false)


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
            failRef.current.show(error.message, 2000)
        }


    }

    useEffect(() => {
        getCards()
    }, [])



    function handleFlip() {
        setIsFlip(!isFlip)
    }

    function handleNextCard() {
        setIsFlip(false)
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


    function front() {
        return <div className='flex flex-col gap-y-3'>
            {cards[index].image && <div className="h-40 flex justify-center">
                <img className="object-contain" src={cards[index].image} />
            </div>}
            <p className="text-2xl text-center">{cards[index].term}</p>
        </div>
    }


    function back() {
        return <div className='flex flex-col gap-y-3'>
            <p className="text-2xl text-center">{cards[index].definition}</p>
            {cards[index].example && <p className="text-2xl text-center">{cards[index].example}</p>}

        </div>
    }


    return <div className="flex justify-center">
        {cards && <div className="w-[700px]">
            <div className='flex justify-between items-center w-full' >
                <div>
                    <Link to={"/decks"} className='flex items-center gap-x-3 cursor-pointer text-blue-600 underline'>
                        <img className='w-5 h-5' src="../../public/back.png" alt="" />
                        <span>Chi tiết bộ thẻ</span>
                    </Link>
                </div>
                <button onClick={handleFlip} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Lật thẻ
                </button>
            </div>
            <div className="mt-5 bg-[#F0F6F6] p-3 rounded-lg shadow-lg flex flex-col justify-between h-[360px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3">
                        <span className="cursor-pointer"><i className="fa-regular fa-star"></i></span>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <span className="cursor-pointer"><i className="fa-regular fa-heart"></i></span>
                        <span className='cursor-pointer'><i className="fa-solid fa-volume-high"></i></span>
                    </div>

                </div>
                {!isFlip && front()}
                {isFlip && back()}

                <div className="flex items-center justify-between">
                    <Link to={`/cards/edit/${cards[index].id}`}><i className="fa-regular fa-pen-to-square"></i></Link>
                    <span><i className="fa-solid fa-trash"></i></span>
                </div>
            </div>
            <div className='flex gap-x-3 justify-center items-center mt-5'>
                <button onClick={handlePreCard} className="bg-[#F0F6F6]  h-10 w-10 rounded-full"><i className="fa-solid fa-arrow-left"></i></button>
                <span className='font-medium text-xl pb-1'>2/9</span>
                <button onClick={handleNextCard} className="bg-[#F0F6F6]  h-10 w-10 rounded-full"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
        }
        <Success ref={successRef} />
        <Fail ref={failRef} />
    </div>
}

export default Card