import React from 'react'
import { Link } from 'react-router-dom'

function Classes() {
    return <div>

<div className='profile flex gap-x-3 items-center justify-between font-medium'>
            <div className='flex gap-x-3 items-center'>
                <div className='rounded-full overflow-hidden h-9 w-9'>
                    <img className='object-cover w-full h-full' src='../../public/avatar.avif' alt='Avatar' />
                </div>
                <h1>Thầy Thuận badboi</h1>
            </div>
            <div className='flex gap-x-8 items-center'>

                <Link to={'/classes/create'} className=''>
                    <img src="plus.png" className='w-9' alt="" />
                </Link>
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="decks-search" className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Tên, mô tả..." />
                    </div>
                </div>
            </div>
        </div>
        <hr className='my-8' />
        <div>
            <h3 className='font-medium text-xl text-blue-600'>Lớp đã tạo</h3>
            {/* render lớp */}
            <div className='mt-8'>

                    <div className='cursor-pointer deck flex justify-between bg-[#EDEFFF] rounded-md py-4 px-8 mb-4'>
                        <div className='deck-left flex gap-x-6'>
                            <span className='text-xl flex items-center font-medium min-w-40'>12A05</span>
                            <span className='flex items-center min-w-12'>25 thành viên</span>
                        </div>
                        <div className='deck-right flex gap-x-12 items-center'>
                            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                                Xóa lớp
                            </button>
                            <button className='bg-ctred hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-600 rounded'>
                                Chỉnh sửa
                            </button>       
                            
                        </div>
                    </div>

                    <div className='cursor-pointer deck flex justify-between bg-[#EDEFFF] rounded-md py-4 px-8 mb-4'>
                        <div className='deck-left flex gap-x-6'>
                            <span className='text-xl flex items-center font-medium min-w-40'>12A07</span>
                            <span className='flex items-center min-w-12'>13 thành viên</span>
                        </div>
                        <div className='deck-right flex gap-x-12 items-center'>
                            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                                Xóa lớp
                            </button>
                            <button className='bg-ctred hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-600 rounded'>
                                Chỉnh sửa
                            </button>       
                            
                        </div>
                    </div>

            </div>
            <div>

            </div>

        </div>
    </div>
}



export default Classes