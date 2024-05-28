import { useState, useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import { baseUrl, version } from '../global'
import Fail from "./Fail"
import Success from "./Success"

function EditCard() {
    const params = useParams()
    const failRef = useRef()
    const successRef = useRef()
    const [card, setCard] = useState()
    const [decks, setDecks] = useState()
    const accessToken = localStorage.getItem('accessToken')
    const idCard = params.id



    async function fetchDecks(searchDecks) {
        let url = `${baseUrl + version}/decks`
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

    async function getCard() {


        const url = `${baseUrl}${version}/cards/${idCard}`

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
            setCard(response.data)
        }
        catch (error) {
            console.log(error)
            failRef.current.show(error.message, 2000)
        }
    }




    async function handleEditCard() {

        const url = `${baseUrl + version}/cards/${params.id}`
        console.log(url)

        const formData = new FormData()

        const inputTermCard = document.getElementById('card-term')
        const inputDefinitionCard = document.getElementById('card-definition')
        const inputExampleCard = document.getElementById('card-example')
        const inputImageCard = document.getElementById('card-image')
        const inputAudioCard = document.getElementById('card-audio')
        const selectIdDeckCard = document.getElementById('card-id-deck')

        formData.append('idDeck', selectIdDeckCard.value)
        formData.append('term', inputTermCard.value)
        formData.append('definition', inputDefinitionCard.value)
        formData.append('example', inputExampleCard.value)

        if (inputAudioCard.files.length > 0) {
            formData.append('audio', inputAudioCard.files[0])
        }
        if (inputImageCard.files.length > 0) {
            formData.append('image', inputImageCard.files[0])
        }

        try {
            const jsonRp = await fetch(url, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
              body: formData
            })
            const response = await jsonRp.json()
            if (!jsonRp.ok) {
              throw new Error(response.message)
            }
            successRef.current.show(response.message, 2000)
          }
          catch (error) {
            failRef.current.show(error.message, 2000)
          }

    }



    useEffect(() => {
        fetchDecks()
        getCard()
    }, [])


    return <div>

        {card && <div className="mt-10">
            <div className="info-deck flex justify-end items-center">
                <button onClick={handleEditCard} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Hiệu chỉnh
                </button>
            </div>

            <form className="site-create bg-[#F6F7FB] rounded-lg p-6 mt-16">
                <div className="flex items-center justify-between gap-x-8">
                    <div className="w-full border-r pr-6 border-gray-400">
                        <div className="flex justify-between gap-x-16 mt-4">
                            <div className="flex flex-col w-full gap-y-3">
                                <input defaultValue={card.term} id="card-term" className="border-0 border-b bg-transparent border-gray-400 focus:outline-0" type="text" />
                                <label htmlFor="">Thuật ngữ</label>
                            </div>

                            <div className="flex flex-col w-full gap-y-3">
                                <input defaultValue={card.definition} id="card-definition" className="border-0 border-b bg-transparent border-gray-400 focus:outline-none" type="text" />
                                <label htmlFor="">Định nghĩa</label>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex flex-col gap-y-3">
                                <input defaultValue={card.example} id="card-example" className="border-0 border-b bg-transparent border-gray-400 focus:outline-none" type="text" />
                                <label htmlFor="">Thông tin thêm, ví dụ</label>
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


                <div className="flex justify-between items-center">
                    <div>
                        <span>Bộ thẻ</span>
                        
                        <select id="card-id-deck" defaultValue={card.deck.id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            {decks.map((deck) => (
                                <option key={deck.id} value={deck.id}>{deck.name}</option>
                            ))}
                        </select>
                    </div>
                    {card.audio && <div className="">
                        <div className="">  
                            <audio controls>
                                <source src={card.audio} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>}

                    {card.image && <div className="h-20 flex justify-center">
                        <img className="object-contain" src={card.image} />
                    </div>}
                </div>

            </form>
        </div>
        }
        <Fail ref={failRef} />
        <Success ref={successRef} />
    </div>
}

export default EditCard