import React, { useRef } from 'react'
import { baseUrl } from '../global'
import Fail from '../component/Fail'
import { Link, useNavigate   } from 'react-router-dom'

function SignIn() {
  const failRef = useRef()
  const navigate = useNavigate()
  // khởi tạo 1 biến. 
  let isShowPassword = false
  const emailRef = useRef(null)
  const passwordRef = useRef(null)


  function handleChangeView() {   
    const elPassword = document.getElementById('password')
    const elViewPassword = document.getElementById('view-password')
    if (isShowPassword) { 
      elPassword.type = 'password'
      elViewPassword.src = '/hide.png'
      
    }
    else {
      elPassword.type = 'text'
      elViewPassword.src = '/view.png'
    }
    isShowPassword = !isShowPassword

  }

  async function postSignIn(email, password, isRemember) {
    const url = baseUrl + '/api/v1/auth/sign-in'
    try {
      const jsonRp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password,isRemember })
      })
      const response = await jsonRp.json()
      if (!jsonRp.ok) {
        throw new Error(response.message)
      } 
      const data = response.data
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('email', data.user.email)
      navigate('/')

    }
    catch (error) {
      failRef.current.show(error.message, 2000)
    }
  }
  function handleSignIn(event) {
    event.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const isRemember = document.getElementById('is-remember').checked

    postSignIn(email, password, isRemember)
  }


  return (<div className="flex justify-center items-center h-screen">
  {/* Left: Image */}
  <div className="w-1/2 hidden lg:block h-screen">
    <img
      src="/touann-gatouillat-vergos-dSBJv66Yjlk-unsplash.jpg"
      alt="login image"
      className="object-cover w-full h-full"
    />
  </div>
  {/* Right: Login Form */}
  <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <h1 className="text-2xl font-semibold mb-4">Đăng nhập</h1>
    <form onSubmit={handleSignIn}>
      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">
          Email
        </label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          name="email"
          className="mt-2 w-full rounded-md py-2 px-3"
          required
        />
      </div>
      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600 mb-2">
          Password
        </label>
        <div className='relative'>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            className="w-full rounded-md py-2 px-3"
            required
          />
          <img onClick={handleChangeView} id='view-password' src="/hide.png" className='cursor-pointer absolute top-1/2 right-4' style={{transform: 'translateY(-50%)'}} alt="" />
        </div>
        
      </div>
      {/* Remember Me Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          id="is-remember"
          type="checkbox"
          name="remember"
          className="text-blue-500"
          
        />
        <label htmlFor="remember" className="text-gray-600 ml-2">
          Nhớ tài khoản
        </label>
      </div>
      {/* Forgot Password Link */}
      <div className="mb-6 text-blue-500">
        <Link to={'/forgot-password'} className="hover:underline">
          Quên mật khẩu
        </Link>
      </div>
      {/* Login Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Đăng nhập
      </button>
    </form>
    {/* Sign up  Link */}
    <div className="mt-6 text-blue-500 text-center">
      <Link to={'/sign-up'} className="hover:underline">
        Đăng ký
      </Link>
    </div>
  </div>
  <Fail ref={failRef}/>
</div>)

}
export default SignIn
