import React, { useEffect, useRef, useState } from 'react'

function MemberClass() {
 
    
    return <div>
       <div>
    
            <div className='bg-[#F0F6F6] mt-4 rounded-lg px-8 py-6 flex items-center justify-between'>
                <span className='font-medium text-xl'>
                    Nguyễn Thuận
                </span>
                <span>Giáo viên</span>
                <img className='w-6 h-6' src="/key.png" alt="" />
            </div>
            <div className='bg-[#EDEFFF] mt-4 rounded-lg px-8 py-6 flex items-center justify-between'>
                <span className='font-medium text-xl'>
                    Đức Nguyên
                </span>
                <span>Học sinh</span>
                <img className='w-6 h-6' src="/delete.png" alt="" />
            </div>
       </div>
    </div>
}



export default MemberClass