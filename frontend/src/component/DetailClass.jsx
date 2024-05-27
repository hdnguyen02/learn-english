import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function DetailClass() {
    return <div>
        <div className='flex items-center gap-x-3'>
            <img className='w-12 h-12' src="/group.png" alt="" />
            <span className='text-xl font-medium'>Lớp 12A05</span>
        </div>
     
        <div className='mt-4'>
            <div className='flex gap-x-24'>
                <Link to={"/classes/1/student-session"} className='font-medium flex gap-x-2 underline text-blue-600'>
                    <img src="/folder.png" className='w-6' alt="" />
                    <span>Học phần</span>  
                </Link>
                <Link to={'/classes/1/share-student-session'} className='font-medium flex gap-x-2'>
                    <img src="/book.png" className='w-6' alt="" />
                    <span>Chia sẻ học phần</span>
                </Link>
                <Link to={"/classes/1/members"} className='font-medium flex gap-x-2'>
                    <img src="/group.png" className='w-6' alt="" />
                    <span>Thành viên</span> 
                </Link>
               
                <Link to={'/classes/1/add-member'} className='font-medium flex gap-x-2'>
                    <img src="/plus.png" className='w-6' alt="" />
                    <span>Thêm học sinh</span>
                   
                </Link>
            </div>
            <hr className='mt-8'/>
            <div className='flex gap-x-20 justify-between py-12'>
                <div className='flex-1'>
                     <Outlet />
                </div> 
                <div className='flex flex-col gap-y-3 pr-12 w-72'>
                    <span className='font-medium'>Liên kết mời</span>
                    <div className='bg-[#F0F6F6] rounded-md flex gap-x-3 px-3 py-2'>
                        <span className='text-blue-600'>vlxx.com</span>
                        <img src="/copy.png" className='w-6 h-6' alt="" />
                    </div>
                    <span className='font-medium'>Chi tiết lớp học</span>
                    <div className='flex gap-x-3 items-center'>
                        <img src="/book.png" className='w-8 h-8' alt="" />
                        <span>1 học phần</span>
                    </div>
                    <div className='flex gap-x-3 items-center'>
                        <img src="/group.png" className='w-8 h-8' alt="" />
                        <span>25 thành viên</span>
                    </div>
                    
                </div>
            </div>
        
        </div>

    </div>
}



export default DetailClass