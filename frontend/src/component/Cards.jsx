
import { useRef, useState, useEffect } from 'react'
import { fetchData, convertValueFromSelect } from '../global'
import Success from './Success'
import Fail from './Fail'
import ModelCreateCard from './ModelCreateCard'
import ModelEditCard from './ModelEditCard'

export default function Cards() {

    const [cards, setCards] = useState()

    // viết hàm fetch data. 
    async function getCards() {
        const subUrl = '/cards'
        try {
            const response = await fetchData(subUrl, 'GET')
            setCards(response.data)
        }
        catch (error) {
            console.log(error.message)
            console.log("gây ra lỗi")
        }
    }
    const [decks, setDecks] = useState()
    const refSuccess = useRef()
    const refFail = useRef()
    const refModelCreateCard = useRef()
    const refModelEditCard = useRef()
    const [searchContent, setSearchContent] = useState('')
    

    async function getDecks() { 
        try {
            const subUrl = '/decks'
            const response = await fetchData(subUrl, 'GET')
            setDecks(response.data)
        } 
        catch(error) {console.log(error.message)}
    }

    function handleEditCard(event, idCard) { 
        refModelEditCard.current.show(idCard)
    }


    function handleShowModelCreateCard() {
        // sau khi thành công => hàm kia phải trả ra giá trị đó nhá. 
        refModelCreateCard.current.show()
    }


    async function handleFilter() {
        const idDeck = convertValueFromSelect(document.getElementById('filter-deck').value) // nếu là null thì vẫn là null thôi. 
        const isFavourite = convertValueFromSelect(document.getElementById('filter-is-favourite').value)
        const isRemembered = convertValueFromSelect(document.getElementById('filter-is-remembered').value)
        let subUrl = `/cards/filter?`
        if (idDeck) subUrl += `idDeck=${idDeck}`
        if (isFavourite != null) subUrl += `&isFavourite=${isFavourite}`
        if (isRemembered != null) subUrl += `&isRemembered=${isRemembered}`

        try { 
            const response = await fetchData(subUrl, 'GET')
            setCards(response.data)
        }
        catch(error) {console.log(error.message)}
    }
    
    function handleCheckAll(event) {
        const checkboxCards = document.querySelectorAll('input[name="checkbox-card"]')
        const target = event.target
        checkboxCards.forEach(checkboxCard => {
            checkboxCard.checked = target.checked
        })
    }

    async function handleDeleteCards(event) { 
        const checkboxCards = document.querySelectorAll('input[name="checkbox-card"]') // trả về nodeList 
        const checkedCheckboxes = Array.from(checkboxCards).filter(checkbox => checkbox.checked);
        const idCards = checkedCheckboxes.map(checkedCheckbox => checkedCheckbox.value)
        const queryString = idCards.map(id => `ids=${encodeURIComponent(id)}`).join('&')
        const subUrl = `/cards?${queryString}`
        try {
            const response = await fetchData(subUrl, 'DELETE')
            getCards()
            refSuccess.current.show(response.message, 2000)
        }
        catch(error) {
            refFail.current.show('Xóa thẻ thất bại!', 2000)
        }
        
    }

    function handleDeleteFilter() {

        const slDeck = document.getElementById('filter-deck')
        const slIsFavourite = document.getElementById('filter-is-favourite')
        const slIsRemembered = document.getElementById('filter-is-remembered')
        slDeck.value = slIsFavourite.value = slIsRemembered.value = 'null'
        getCards()   
    }

        useEffect(() => {
            getDecks()
            getCards()
        }, [])

    useEffect(() => {
        async function search() {
            const subUrl = `/cards/search?content=${searchContent}`
            try {
                const response = await fetchData(subUrl, 'GET')
                setCards(response.data)
            }
            catch(error) { console.log(error.message) }
        }
        search()
    }, [searchContent])




    return <div>
        <ModelCreateCard decks={decks} ref={refModelCreateCard} />
        <ModelEditCard decks={decks} ref={refModelEditCard} />
        <div className='flex justify-between mt-10'>
            <div className='flex gap-x-8 items-center'>
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(event) => {
                            setSearchContent(event.target.value)
                        }} type="search" id="decks-search" className="block w-56 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Thuật ngữ, Định nghĩa ..." />
                    </div>
                </div>
            </div>
            <form onSubmit={handleFilter} className='flex gap-x-12'>
                <label htmlFor="" className='flex gap-x-4 items-center'>
                    <span className='text-sm'>Bộ thẻ</span>
                    <select className='h-10 w-56 px-3' name="" id="filter-deck">
                        <option value="null">-</option>
                        {decks && decks.map((deck) => (
                            <option key={deck.id} value={deck.id}>{deck.name}</option>
                        ))}
                    </select>

                </label>
                <label htmlFor="" className='flex gap-x-4 items-center'>
                    <span className='text-sm'>Yêu thích</span>
                    <select className='h-10 w-24 px-3' name="" id="filter-is-favourite">
                        <option value="null">-</option>
                        <option value="false">Không</option>
                        <option value="true">Có</option>
                    </select>
                </label>

                <label htmlFor="" className='flex gap-x-4 items-center'>
                    <span className='text-sm'>Đã nhớ</span>
                    <select className='h-10 w-24 px-3' name="" id="filter-is-remembered">
                        <option value="null">-</option>
                        <option value="false">Không</option>
                        <option value="true">Có</option>
                    </select>

                </label>
                <button
                    onClick={handleDeleteFilter}
                    type='button' className='bg-red-500 hover:bg-red-400 text-white h-10 px-4 border-b-4 border-red-700 hover:border-red-500 rounded flex items-center gap-x-2'>
                    <i className="fa-regular fa-trash-can font-light"></i>
                   <span className='text-sm'>Xóa bộ lọc</span>
                </button>

                <button 
                    onClick={handleFilter}
                    type='button'
                    className='bg-blue-500 hover:bg-blue-400 text-white h-10 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded flex items-center gap-x-2'>
                    <i className="fa-solid fa-filter"></i>
                    <span className='text-sm'>Lọc</span>
                </button>

            </form>
        </div>

        <hr className='my-10'></hr>
        <div className='flex justify-between gap-x-12'>
            <div>
                <button onClick={handleShowModelCreateCard} className='bg-green-500 hover:bg-green-400 text-white h-10 w-24 justify-center border-b-4 border-green-700 hover:border-green-500 rounded flex items-center gap-x-2'>
                    <span className='text-sm'>Thêm thẻ</span>
                    <i className="hidden md:block fa-solid fa-plus"></i>
                </button>
            </div>
            <div className='flex gap-x-12'>
                <button
                    onClick={handleDeleteCards}
                    type='button' className='bg-red-700 hover:bg-red-700 text-white h-10 w-24 justify-center border-b-4 border-red-900 hover:border-red-700 rounded flex items-center gap-x-2'>
                    <span className='text-sm'>Xóa thẻ</span>
                    <i className="fa-regular fa-trash-can font-light"></i>
                </button>
            
                <button className='bg-gray-500 hover:bg-gray-400 text-white h-10 w-24 justify-center border-b-4 border-gray-700 hover:border-gray-500 rounded flex items-center gap-x-2'>
                    <span className='text-sm'>Học thẻ</span>
                    <i className="fa-solid fa-graduation-cap"></i>
                </button>
            </div>
        </div>

        {cards &&
            <div className='mt-8'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <input onChange={handleCheckAll} type='checkbox' />
                                    </th>
                                <th scope="col" className="px-6 py-3">
                                    Thuật ngữ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Định nghĩa
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bộ thẻ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày tạo
                                </th>
                                <th className='text-center'>Hiệu chỉnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards.map(card => (
                                <tr key={card.id} className="odd:bg-white even:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <input name='checkbox-card' value={card.id} type="checkbox" />
                                    </th>
                                    <td className="px-6 py-4">
                                        {card.term}
                                    </td>
                                    <td className="px-6 py-4">
                                        {card.definition}
                                    </td>
                                    <td className="px-6 py-4">
                                        {card.createAt}
                                    </td>
                                    <td className="px-6 py-4">
                                        {card.deck.name}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={event => { 
                                                handleEditCard(event, card.id)
                                            }}
                                            type='button'
                                        >
                                            <i className="fa-regular fa-pen-to-square text-xl"></i>
                                        </button>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        }
        <Success ref={refSuccess} />
        <Fail ref={refFail} />
    </div>
}