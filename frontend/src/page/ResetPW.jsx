
import Success from '../component/Success'
import Fail from '../component/Fail'
import { baseUrl } from '../global'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ForgotPW() {

    const failRef = useRef()
    const successRef = useRef()
    const location = useLocation()


    async function handleResetPW(event) {
        event.preventDefault()


        // lấy ra token để có thể gửi lên. 
        const newPassword = document.getElementById('new-password').value
        const confirmPassword = document.getElementById('confirm-password').value
        if (newPassword !== confirmPassword) {
            
            failRef.current.show('Mật khẩu mới và mật khẩu xác nhận không trùng nhau!')
            return
        }
        // lấy ra token trên url đó. 
        const searchParams = new URLSearchParams(location.search)
        const accessToken = searchParams.get('access-token')

        
        try {
            const url = baseUrl + '/api/v1/reset-password'
            const jsonRp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ newPassword, accessToken })
            })
            const response = await jsonRp.json()
                if (!jsonRp.ok) {
                    throw new Error(response.message)
                }
                successRef.current.show(response.message, 2000)
            }
            catch (error) {
                successRef.current.show(error.message, 2000)
            }
    }






    return (
        <div className='flex w-full justify-center'>
            <form onSubmit={handleResetPW} className='flex flex-col max-w-lg gap-y-6'>
                <h1 className='font-medium text-3xl'>Đặt lại mật khẩu của bạn</h1>
                <p>Đặt lại mật khẩu và xác nhận mật khẩu khẩu, vui lòng không chia sẻ link này cho bất cứ ai!</p>
                <div>
                    <label className='text-sm' htmlFor="email">Mật khẩu</label>
                    <input
                        type="password"
                        id="new-password"
                        name="newPassworđ"
                        className="w-full rounded-md py-2 px-3 mt-2"
                        required
                        minLength={6}
                    />
                </div>
                <div>
                    <label className='text-sm' htmlFor="email">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        className="w-full rounded-md py-2 px-3 mt-2"
                        required
                        minLength={6}
                    />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Gửi</button>


            </form>
            < Success ref={successRef} />
            < Fail ref={failRef} />
        </div>
    )
}