import { Link, Outlet } from 'react-router-dom'

function Settings() {


  function handleShowSideBar() {
    document.getElementById('side-bar').style.display = 'block'
  }
  function handleCloseSideBar() {
    document.getElementById('side-bar').style.display = 'none'
  }

  return <div className=''>
    {/* sidebar */}
    <div id='side-bar' className=' z-10 selection:hidden md:block bg-blue-600 text-white h-screen w-[230px] px-6 py-12 fixed top-0 bottom-0'>
        <h1 className='font-medium text-3xl'>Cài đặt</h1>
        <button onClick={handleCloseSideBar} className='md:hidden absolute top-[48px] right-6'><i class="fa-solid fa-xmark text-3xl"></i></button>
        <ul className='mt-8 flex flex-col gap-y-3'>
            
            <li className='flex items-center gap-x-3'>
                <i class="fa-solid fa-house"></i>
                <Link to={"/"}>Trang chủ</Link>
            </li>
            <hr className='opacity-60'/>
            <li className='flex items-center gap-x-3'>
                <i class="fa-solid fa-user"></i>
                <Link to={"/settings/info"}>Thông tin chung</Link>
            </li>
            <hr className='opacity-60'/>
            <li className='flex items-center gap-x-3'>
                <i class="fa-solid fa-lock"></i>
                <Link to={"/settings/password"}>Mật khẩu</Link>
            </li>
            <hr className='opacity-60'/>
            <li className='flex gap-x-3 items-center'>
                <i class="fa-solid fa-right-from-bracket"></i>
                <button>Đăng xuất</button>
            </li>
        </ul>
    </div>
    <img onClick={handleShowSideBar} className='md:hidden fixed top-4 left-4 w-8 z-0' src="/menu.png" alt="" />
    <div className='md:ml-[230px] my-8'>    
        <Outlet></Outlet>
    </div>
  </div>

}
export default Settings
