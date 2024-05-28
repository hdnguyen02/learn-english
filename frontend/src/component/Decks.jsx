
import { useRef, useState, useEffect } from 'react'
import { baseUrl, version } from '../global'
import { Link } from 'react-router-dom'
import DeleteDeck from './DeleteDeck'
import Success from './Success'
import Fail from './Fail'
import { useNavigate } from 'react-router-dom'

function Decks() {

    const [decks, setDecks] = useState()
    const refSuccess = useRef()
    const refFail = useRef()
    const [idDeckDelete, setIdDeckDelete] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    async function handleDeleteDeck() {


        const accessToken = localStorage.getItem('accessToken')
        const url = `${baseUrl + version}/decks/${idDeckDelete}`
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
            const data = response.data
            const message = response.message
            refSuccess.current.show(2000, message)
            fetchDecks()
            handleCancel() // đóng thẻ lại
        }
        catch (error) {
            failRef.current.show(error.message, 2000)
        }
        setIdDeckDelete(null)

    }

    function handleCancel() {
        document.getElementById('popup-delete-deck').style.display = 'none'
        setIdDeckDelete(null)
    }

    function showPopupDeleteDeck(event,id) {
        event.stopPropagation()
        document.getElementById('popup-delete-deck').style.display = 'flex'
        setIdDeckDelete(id)
    }



    async function fetchDecks(searchDecks) {
        const accessToken = localStorage.getItem('accessToken')
        let url
        if (searchDecks && searchDecks != '') url = url = `${baseUrl + version}/decks?searchTerm=${searchDecks}`
        else url = `${baseUrl + version}/decks`
        try {
            const jsonRp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            const response = await jsonRp.json()
            if (!jsonRp.ok) {
                throw new Error(response.message)
            }
            setDecks(response.data)
        }
        catch (error) {
            console.log(error.message)
        }
    }

    function handleDetailDeck(id) {
        navigate(`/decks/${id}`)
    }

    useEffect(() => {
        fetchDecks(searchTerm)
    }, [searchTerm])


    

    return <div>
        <div className='profile flex gap-x-3 items-center justify-between font-medium'>
            <div className='flex gap-x-3 items-center'>
                <div className='rounded-full overflow-hidden h-9 w-9'>
                    <img className='object-cover w-full h-full' src='../../public/avatar.avif' alt='Avatar' />
                </div>
                <h1>Thầy Thuận badboi</h1>
            </div>
            <div className='flex gap-x-8 items-center'>

                <Link to={'/decks/create'} className=''>
                    <img src="plus.png" className='w-9' alt="" />
                </Link>
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }} type="search" id="decks-search" className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Tên, mô tả..." />
                    </div>
                </div>
            </div>
        </div>

        <hr className='my-12'></hr>

        {decks &&
            <div className='mt-8'>
                {decks.map(deck => (
                    <div onClick={() => {handleDetailDeck(deck.id)}} key={deck.id} className='cursor-pointer deck flex justify-between bg-[#EDEFFF] rounded-md py-4 px-8 mb-4'>
                        <div className='deck-left flex gap-x-6'>
                            <span className='flex items-center font-medium min-w-40'>{deck.name}</span>
                            <span className='flex items-center min-w-12'>{deck.numberCards} thẻ</span>
                            <span className='flex items-center'>{deck.createAt}</span>
                        </div>
                        <div className='deck-right flex gap-x-2 items-center'>
                            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                                Chia sẽ
                            </button>
                            <Link to={`/decks/edit/${deck.id}`} onClick={event => {
                                event.stopPropagation()
                            }} className='bg-ctgray hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>Hiệu chỉnh
                            </Link>
                            <button onClick={(event) => showPopupDeleteDeck(event, deck.id)} className='bg-ctred hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-600 rounded'>
                                Xóa
                            </button>       
                        </div>
                    </div>
                ))}
            </div>
        }
        <DeleteDeck idDeckDelete={idDeckDelete} handleCancle={handleCancel} handleDeleteDeck={handleDeleteDeck} />
        <Success ref={refSuccess} />
        <Fail ref={refFail} />
    </div>
}

export default Decks