import React, { useRef, useState } from "react"
import { fetchData } from "../global"
import Success from "./Success"
import Fail from "./Fail"

const ModelEditDeck = React.forwardRef(({ getDecks }, ref) => {

    const [isShow, setIsShow] = useState(false)
    const [id, setId] = useState()
    const [deck, setDeck] = useState()
    const refSuccess = useRef()
    const refFail = useRef()

    async function show(idDeck) {
        setId(idDeck)
        await getDeck(idDeck)
        setIsShow(true)
    }

    function close() {
        setIsShow(false)
    }

    async function getDeck(idDeck) { 
        const subUrl = `/decks/${idDeck}`
        try { 
            const response = await fetchData(subUrl, 'GET')
            setDeck(response.data)
        }
        catch(error) { 
            console.log(error.message)
        }
    }

    async function handleEditDeck(event) {
        event.preventDefault()
        const subUrl = `/decks/${id}` 
        const inputName = document.getElementById('name-deck')
        const inputDescription = document.getElementById('description-deck')
        const name = inputName.value
        const description = inputDescription.value
        const body = {name, description}
        try { 
            await fetchData(subUrl, 'PUT', body)
            await getDecks()
            refSuccess.current.show('Hiệu chỉnh bộ thẻ thành công', 2000)
        }
        catch(error) {
            refFail.current.show('Đã có lỗi xảy ra!', 2000)
        }
    }

    React.useImperativeHandle(ref, () => ({
        show
    }));

    return (isShow && deck && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded shadow-lg z-50">
            <div className="flex justify-end">
                <button onClick={close} className="pr-2">
                    <i className="fa-solid fa-xmark text-4xl text-gray-500"></i>
                </button>
            </div>
            {/* form */}    
            <div className="relative w-[500px]">
                <form onSubmit={handleEditDeck} className="relative rounded-md">

                    <div className="p-4 md:p-5 space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Tên bộ thẻ <span className='text-ctred'>*</span></label>
                            <input defaultValue={deck.name} id='name-deck' type="text" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="English" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Mô tả bộ thẻ</label>
                            <input defaultValue={deck.description} id='description-deck' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Hiệu chỉnh</button>
                    </div>
                </form>
            </div>
        </div>
        <Success ref={refSuccess}/>
        <Fail ref={refFail}/>
    </div>)
})

export default ModelEditDeck