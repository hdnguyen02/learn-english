import { Link, Outlet, useLocation } from 'react-router-dom'

function Settings() {
  
  const location = useLocation()
  function handleShowSideBar() {
    document.getElementById('side-bar').style.display = 'block'
  }
  function handleCloseSideBar() {
    document.getElementById('side-bar').style.display = 'none'
  }

  return <div className=''>
    {/* sidebar */}
    <div id='side-bar' className=' z-10 selection:hidden md:block bg-[#1D1918] text-[#E2E0DE] h-screen w-[230px] px-6 py-12 fixed top-0 bottom-0'>
        {/* <h1 className='font-medium text-3xl'>Cài đặt</h1> */}
        <button onClick={handleCloseSideBar} className='md:hidden absolute top-[48px] right-6'><i className="fa-solid fa-xmark text-3xl"></i></button>
        <ul className='mt-8 flex flex-col gap-y-3'>
            
            <li className='flex items-center gap-x-3'>

                <Link to={"/"}>Trang chủ</Link>
            </li>
            <hr className='opacity-10'/>
            <li  className='flex items-center gap-x-3'>
            
                <Link className={location.pathname.includes('/settings/info') ? 'link-active-mobile': ''} to={"/settings/info"}>Thông tin chung</Link>
            </li>
            <hr className='opacity-10'/>
            <li className='flex items-center gap-x-3'>
                <Link className={location.pathname.includes('/settings/password') ? 'link-active-mobile': ''} to={"/settings/password"}>Mật khẩu</Link>
            </li>
            <hr className='opacity-10'/>
            <li className='flex gap-x-3 items-center'>

                <button>Đăng xuất</button>
            </li>
        </ul>
    </div>
    <img onClick={handleShowSideBar} className='md:hidden fixed top-4 left-4 w-8 z-0' src="/menu.png" alt="" />
    <div className='md:ml-[230px] my-12'>    

        <Outlet></Outlet>
    </div>
  </div>

}
export default Settings
