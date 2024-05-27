import React, { useRef, useState } from 'react'
import {baseUrl, version} from '../global'
import Fail from './Fail'
import Success from './Success'
import { Link } from 'react-router-dom'

function CreateClass() {

    


    return <div className='flex justify-center items-center flex-col'>
<div className='flex items-center justify-between p-4 w-full max-w-2xl max-h-full'>
            <Link to={"/classes"} className='flex items-center justify-between gap-x-3 cursor-pointer text-blue-600 underline'>
                <img className='w-5 h-5' src="../../public/back.png" alt="" />
                <span>Danh sách lớp</span>
            </Link>
            <h3 className="font-medium text-gray-900">
                Tạo lớp
            </h3>
        </div>
      

        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">

                <div className="p-4 md:p-5 space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Tên lớp <span className='text-ctred'>*</span></label>
                        <input type="text"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="English" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Mô tả lớp</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                </div>
                <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                    <button  type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Tạo</button>
                </div>
            </div>   
        </div>
    </div>
}



export default CreateClass