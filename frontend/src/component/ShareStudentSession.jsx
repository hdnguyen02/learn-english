import React, { useEffect, useRef, useState } from 'react'

function ShareStudentSesion() {
 
    
    return <div>
        
                        <div className='flex justify-between items-center bg-[#EDEFFF] rounded-md py-4 px-8 mb-4'>
                            <span className='flex items-center font-medium text-xl min-w-40'>Tiếng anh</span>
                            <span className='flex items-center min-w-12'>25 thẻ</span>
                            <span className='flex items-center'>15/04/2024</span>
                            <input type="checkbox" />
                        </div>
                        <div className='flex justify-between items-center bg-[#EDEFFF] rounded-md py-4 px-8 mb-4'>
                            <span className='flex items-center font-medium text-xl min-w-40'>Tiếng nga</span>
                            <span className='flex items-center min-w-12'>21 thẻ</span>
                            <span className='flex items-center'>15/03/2024</span>
                            <input type="checkbox" />
                        </div>
                        <div className='flex justify-between items-center bg-[#EDEFFF] rounded-md py-4 px-8 mb-4'>
                            <span className='flex items-center font-medium text-xl min-w-40'>Tiếng ý</span>
                            <span className='flex items-center min-w-12'>24 thẻ</span>
                            <span className='flex items-center'>15/07/2024</span>
                            <input type="checkbox" />
                        </div>
                        <div className='flex justify-end'>
                        <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                            Chia sẽ
                        </button>
                        </div>
                      
                       
     
       
       
    </div>
}



export default ShareStudentSesion