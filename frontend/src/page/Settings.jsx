import React, { useState, useRef } from 'react'
import { baseUrl, authSignInUrl } from '../global'
import Fail from '../component/Fail'
import { Link, Outlet } from 'react-router-dom'

function Settings() {


  return <div className=''>
    {/* sidebar */}
    <div className='bg-blue-600 text-white h-screen w-[230px] p-6 fixed top-0 bottom-0'>
        <h1 className='font-medium text-3xl'>Cài đặt</h1>
        <ul className='mt-8 flex flex-col gap-y-3'>
            <li className='flex gap-x-3'>
                <img src="/home.png" alt="" />
                <Link to={"/"}>Trang chủ</Link>
            </li>
            <hr className='text-black'/>
            <li className='flex gap-x-3'>
                <img src="/info.png" alt="" />
                <Link to={"/settings/info"}>Thông tin chung</Link>
            </li>
            <hr />
            <li className='flex gap-x-3 items-center'>
                <img src="/password.png" alt="" />
                <Link to={"/settings/password"}>Mật khẩu</Link>
            </li>
            <hr />
            <li className='flex gap-x-3 items-center'>
                <img src="/logout.png" alt="" />
                <button>Đăng xuất</button>
            </li>
        </ul>
    </div>
    <div className='ml-[230px]'>    
        <Outlet></Outlet>
    </div>

  </div>

}
export default Settings
