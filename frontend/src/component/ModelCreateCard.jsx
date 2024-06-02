import React, { useState } from "react"
import { baseUrl, version } from "../global"

const ModelCreateCard = React.forwardRef(({ decks, getCards }, ref) => {

    const [isShow, setIsShow] = useState(false)
    const [message, setMessage] = useState()
    const [messageCss, setMessageCss] = useState()


    // kích hoạt model lên. 
    function show() {
        setIsShow(true)
    }

    function close() {
        setIsShow(false)
    }

    async function handleCreateCard(event) {
        event.preventDefault()
        const inputTermCard = document.getElementById('card-term')
        const inputDefinitionCard = document.getElementById('card-definition')
        const inputExampleCard = document.getElementById('card-example')
        const inputImageCard = document.getElementById('card-image')
        const inputAudioCard = document.getElementById('card-audio')
        const inputIdDeckCard = document.getElementById('card-id-deck')

        const formData = new FormData()
        formData.append('idDeck', inputIdDeckCard.value)
        formData.append('term', inputTermCard.value)
        formData.append('definition', inputDefinitionCard.value)
        formData.append('example', inputExampleCard.value)

        const accessToken = localStorage.getItem('accessToken')
        const url = `${baseUrl}${version}/cards`
        if (inputAudioCard.files.length > 0) {
            formData.append('audio', inputAudioCard.files[0])
        }
        if (inputImageCard.files.length > 0) {
            formData.append('image', inputImageCard.files[0])
        }
        try {
            const jsonRp = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            const response = await jsonRp.json()
            if (!jsonRp.ok) {
                throw new Error(response.message)
            }
            setMessageCss({
                'color': 'green'
            })
            setMessage(response.message)
            inputTermCard.value = ''
            inputDefinitionCard.value = ''
            inputExampleCard.value = ''
            inputAudioCard.value = null
            inputImageCard.value = null
            getCards()

        }
        catch (error) {
            setMessageCss({
                'color': 'red'
            })
            setMessage('Đã có lỗi xảy ra!')
        }
        setTimeout(() => {setMessage(null)}, 2000) // ẩn thông báo sau 2s 
    }

    React.useImperativeHandle(ref, () => ({
        show
    }));

    return (isShow && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded shadow-lg z-50">
            <div className="flex justify-end">
                <button onClick={close} className="pr-2">
                    <i className="fa-solid fa-xmark text-4xl text-gray-500"></i>
                </button>
            </div>
            <form onSubmit={handleCreateCard} className="site-create rounded-lg p-6">
                <div className="flex items-center justify-between gap-x-8">
                    <div className="w-full border-r pr-6 border-gray-400">
                        <div className="flex-col md:flex-row flex justify-between gap-x-16 mt-4">
                            <div className="flex flex-col w-full gap-y-3">
                                <label htmlFor="card-term">Thuật ngữ</label>
                                <input defaultValue={''} id="card-term" className="bg-transparent h-10 px-4" type="text" />
                            </div>

                            <div className="mt-4 md:mt-0 flex flex-col w-full gap-y-3">
                                <label htmlFor="">Định nghĩa</label>
                                <input defaultValue={''} id="card-definition" className="bg-transparent h-10 px-4" type="text" />

                            </div>
                        </div>
                        <div className="flex-col md:flex-row flex justify-between gap-x-16 mt-4">
                            <div className="flex flex-col w-full gap-y-3">
                                <label htmlFor="">Thông tin thêm, ví dụ</label>
                                <input defaultValue={''} id="card-example" className="bg-transparent h-10 px-4" type="text" />
                            </div>
                            <div className="mt-4 md:mt-0 flex flex-col w-full gap-y-3">
                                <label>Bộ thẻ</label>
                                <select id='card-id-deck' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    {decks.map((deck) => (
                                        <option key={deck.id} value={deck.id}>{deck.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="site-file flex flex-col gap-y-3">
                        <span>Hình ảnh</span>
                        <input id="card-image" type="file" />
                        <span>Âm thanh</span>
                        <input id="card-audio" type="file" />
                    </div>
                </div>

                <hr className="my-12"></hr>
                <div className='flex justify-between items-center'>
                    <div style={messageCss}>{message}</div>
                    <button className='bg-green-500 hover:bg-green-400 text-white h-10 w-24 justify-center border-b-4 border-green-700 hover:border-green-500 rounded flex items-center gap-x-2'>
                        <span className='text-sm'>Thêm thẻ</span>
                        <i className="hidden md:block fa-solid fa-plus"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>)
})

export default ModelCreateCard