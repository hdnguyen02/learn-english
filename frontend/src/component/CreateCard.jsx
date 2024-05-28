import { useState, useEffect, useRef } from "react"
import { useParams, Link } from 'react-router-dom'
import { baseUrl, version } from '../global'
import Fail from "./Fail"
import Success from "./Success"

function CreateCard() {
    const [deck, setDeck] = useState()
    const params = useParams()
    const failRef = useRef()
    const successRef = useRef()

    async function fetchDeck(id) {
        const accessToken = localStorage.getItem('accessToken')
        const url = `${baseUrl}${version}/decks/${id}`

        const jsonRp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        const response = await jsonRp.json()
        setDeck(response.data)
    }

    async function handleCreateCard() {

        const inputTermCard = document.getElementById('card-term')
        const inputDefinitionCard = document.getElementById('card-definition')
        const inputExampleCard = document.getElementById('card-example')
        const inputImageCard = document.getElementById('card-image')
        const inputAudioCard = document.getElementById('card-audio')

        const formData = new FormData()
        formData.append('idDeck', params.id)
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
            successRef.current.show(response.message, 2000)
            inputTermCard.value = ''
            inputDefinitionCard.value = ''
            inputExampleCard.value = ''
            inputAudioCard.value = null
            inputImageCard.value = null

        }
        catch (error) {
            console.log(error)
            failRef.current.show(error.message, 2000)
        }
    }

    useEffect(() => {
        fetchDeck(params.id)
    }, [])


    return <div>
        <Link to={`/decks/${params.id}`} className='flex items-center gap-x-3 cursor-pointer text-blue-600 underline'>
            <img className='w-5 h-5' src="../../public/back.png" alt="" />
            <span>Chi tiết bộ thẻ</span>
        </Link>
        {deck && <div className="mt-10">
            <div className="info-deck flex justify-between items-center">
                <div className="flex flex-col gap-y-6">
                    <div>
                        <span className="font-medium">Tên bộ thẻ: </span>
                        <span>{deck.name}</span>
                    </div>

                    <div>
                        <span className="font-medium">Mô tả: </span>
                        <span>{deck.description}</span>
                    </div>
                </div>
                
                <div>
                    <button onClick={handleCreateCard} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Thêm
                    </button>
                </div>
            </div>

            <form className="site-create bg-[#F6F7FB] rounded-lg px-6 py-12 mt-16">
                <div className="flex items-center justify-between gap-x-8">
                    <div className="w-full border-r pr-6 border-gray-400">
                        <div className="flex justify-between gap-x-16">
                            <div className="flex flex-col w-full gap-y-3">
                                <label htmlFor="">Thuật ngữ</label>
                                <input id="card-term" className="bg-transparent h-8 px-4" type="text" />
                            </div>

                            <div className="flex flex-col w-full gap-y-3">
                                <label htmlFor="">Định nghĩa</label>
                                <input id="card-definition" className="bg-transparent h-8 px-4" type="text" />
                                
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex flex-col gap-y-3">
                                <label htmlFor="">Thông tin thêm, ví dụ</label>
                                <input id="card-example" className="bg-transparent h-8 px-4" type="text" />
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
            </form>
        </div>}
        <Fail ref={failRef} />
        <Success ref={successRef} />
    </div>
}

export default CreateCard