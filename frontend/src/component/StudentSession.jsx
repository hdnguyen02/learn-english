import React, { useEffect, useRef, useState } from 'react'

function StudentSession() {
    return <div>
       <div className='flex flex-col gap-y-2'>
            
            <div className='bg-[#F0F6F6] mt-4 rounded-lg px-8 py-6 flex items-center justify-between'>
                <span className='font-medium text-xl'>
                    Từ vựng bida
                </span>
                <span>9 thẻ</span>
                <button><img className='w-6 h-6' src="/download.png" alt="" /></button>
                <button><img className='w-6 h-6' src="/delete.png" alt="" /></button>
            </div>
            <span>2 ngày trước, <span className='text-blue-500'>Thầy Thuận badboi</span></span>
       </div>
    </div>
}



export default StudentSession