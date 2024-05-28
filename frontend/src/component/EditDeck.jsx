import React, { useEffect, useRef, useState } from 'react'
import {baseUrl, version} from '../global'
import Fail from './Fail'
import Success from './Success'
import { Link, useParams } from 'react-router-dom'

function EditDeck() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const failRef = useRef()
    const successRef = useRef()
    const params = useParams()



    // lấy chi tiết 
    
    async function fetchDeck(id) {
        const accessToken = localStorage.getItem('accessToken')
        const url = `${baseUrl}${version}/decks/${id}`
        try {
            const jsonRp = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
              
            })
            const response = await jsonRp.json()
            if (!jsonRp.ok) {
              throw new Error(response.message)
            } 
            const deck = response.data
            setName(deck.name)
            setDescription(deck.description == null ? '' : deck.description)
          }
          catch (error) {
            failRef.current.show(error.message, 2000)
          }
    }

    


    async function handleEditDeck() {
        const accessToken = localStorage.getItem('accessToken')
        const url = `${baseUrl}${version}/decks/${params.id}`
        try {
            const jsonRp = await fetch(url, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, description })
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
        fetchDeck(params.id)
    }, [])
    
    return <div className='flex justify-center items-center flex-col'>

        <div className='flex items-center justify-between p-4 w-full max-w-2xl max-h-full'>
            <Link to={"/decks"} className='flex items-center justify-between gap-x-3 cursor-pointer text-blue-600 underline'>
                <img className='w-5 h-5' src="../../public/back.png" alt="" />
                <span>Bộ thẻ</span>
            </Link>
            <h3 className="font-medium text-gray-900">
                Hiệu chỉnh thẻ
            </h3>
        </div>

        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">

                <div className="p-4 md:p-5 space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Tên bộ thẻ <span className='text-ctred'>*</span></label>
                        <input onChange={event => setName(event.target.value)} value={name} type="text"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="English" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Mô tả bộ thẻ</label>
                        <input onChange={event => setDescription(event.target.value)} value={description} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                </div>
                <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                    <button onClick={handleEditDeck} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Hiệu chỉnh</button>
                </div>
            </div>   
        </div>
        <Fail ref={failRef}/>
        <Success ref={successRef}/>
    </div>
}



export default EditDeck