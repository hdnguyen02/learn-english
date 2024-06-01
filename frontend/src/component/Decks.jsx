
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

    function showPopupDeleteDeck(event, id) {
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


    useEffect(() => {
        fetchDecks(searchTerm)
    }, [searchTerm])




    return <div>
        <div className='profile flex gap-x-3 items-center justify-between font-medium'>
            <div className='flex gap-x-3 items-center'>
                <h3 className='text-md md:text-2xl font-medium'>Danh sách bộ thẻ</h3>
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
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tên
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số thẻ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày tạo
                                </th>
                                <th className='text-center'>Học thẻ</th>
                                <th className='text-center'>Chia sẻ</th>
                                <th className='text-center'>Hiệu chỉnh</th>
                                <th className='text-center'>Xóa</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {decks.map(deck => (
                                <tr key={deck.id} className="odd:bg-white even:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {deck.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {deck.numberCards}
                                    </td>
                                    <td className="px-6 py-4">
                                        {deck.createAt}
                                    </td>
                                    <td className='px-6 py-4 text-center'>
                                        <Link to={`/decks/${deck.id}/learn-cards`}>
                                            <i className="fa-solid fa-graduation-cap text-xl"></i>
                                        </Link>
                                        
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <i className="fa-solid fa-share text-xl"></i>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <Link to={`/decks/edit/${deck.id}`}><i className="fa-regular fa-pen-to-square text-xl"></i>
                                        </Link>
                                    </td>
                                    <td onClick={(event) => showPopupDeleteDeck(event, deck.id)} className="px-6 py-4 text-center">
                                        <i className="fa-regular fa-trash-can text-xl"></i>
                                    </td>
                                  
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* ))} */}
            </div>
        }
        <DeleteDeck idDeckDelete={idDeckDelete} handleCancle={handleCancel} handleDeleteDeck={handleDeleteDeck} />
        <Success ref={refSuccess} />
        <Fail ref={refFail} />
    </div>
}

export default Decks