import { Link, useLocation } from 'react-router-dom'


function Navbar() {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'))
  const location = useLocation()


  function handleSignOut() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('isAuthenticated')
    window.location.reload('/')
  }

  if (location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && !location.pathname.includes('settings')) {
    return <nav className="bg-[#F0F6F6] h-20 px-24 flex justify-between items-center fixed left-0 right-0 top-0 z-10">
      <div className=''>
        <Link to={"/"} className='text-blue-700 text-3xl font-bold'>
          Online learning
        </Link>

      </div>
      <div className='flex gap-x-8'>
        <Link to={"/"} className='hover:cursor-pointer font-medium'>Trang chủ</Link>
        {isAuthenticated && <Link to={"/decks"} className='hover:cursor-pointer font-medium'>Bộ thẻ</Link>}  
        {isAuthenticated && <Link to={"/classes"} className='hover:cursor-pointer font-medium'>Lớp</Link>}
        <a className='hover:cursor-pointer font-medium'>Liên hệ</a>
      </div>
      {/* ẩn hiện tùy theo authenticate*/}
      {!isAuthenticated && (
        <div className='flex gap-x-3'>
          <Link to="sign-in" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Đăng nhập
          </Link>
          <Link to="sign-up" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Đăng ký
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <div className='flex gap-x-2 items-center'>
          <div className='dropdown'>
            <div className='h-2'></div>
            <div className='dropdown-btn h-9 w-9 rounded-full overflow-hidden cursor-pointer'>
              <img src="/avatar.avif" className='w-full h-full' alt="" />
            </div>
            <div className='h-2'></div>
            <div className="dropdown-content-left">
              <Link to={'/settings'} className=''>Cài đặt</Link>
              <a onClick={handleSignOut}>Đăng xuất</a>
            </div>
          </div>
          <img src='/down-arrow.png' className='w-4 h-4'></img>
        </div>
      )}
    </nav>
  }
  else {
    return null
  }
}

export default Navbar