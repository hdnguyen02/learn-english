
import Success from '../component/Success'
import Fail from '../component/Fail'
import { baseUrl } from '../global'
import { useRef } from 'react'


export default function ForgotPW() {

    const failRef = useRef()
    const successRef = useRef()



    async function handleForgotPW(event) {
        event.preventDefault()
        const elEmail = document.getElementById('email')
        try {
            const url = baseUrl + '/forgot-password'
            const jsonRp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: elEmail.value })
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
            <form onSubmit={handleForgotPW} className='flex flex-col max-w-lg gap-y-6'>
                <h1 className='font-medium text-3xl'>Đặt lại mật khẩu của bạn</h1>
                <p>Hay nhập địa chỉ email ma bạn đa đăng kí. Chúng tôi sẽ gửi cho bạn một liên kết để đăng nhập và đặt lại mật khẩu của bạn.</p>
                <div>
                    <label className='text-sm' htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full rounded-md py-2 px-3 mt-2"
                        placeholder='name@gmail.com'
                        required
                    />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Gửi</button>


            </form>
            < Success ref={successRef} />
            < Fail ref={failRef} />
        </div>
    )
}