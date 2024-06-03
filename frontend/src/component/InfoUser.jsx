import Fail from "./Fail"
import Success from "./Success"
import { useEffect, useRef, useState } from "react"
import { baseUrl } from "../global"
export default function InfoUser() {

    const failRef = useRef(null)
    const successRef = useRef(null)
    let isChangeAvatar = false
    const [user, setUser] = useState()
    async function getUser() {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const url = baseUrl + '/api/v1/users/info'
            const jsonRp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            const response = await jsonRp.json()
            if (!jsonRp.ok) {
                console.log("vào lỗi")
                throw new Error(response.message)
            }
            setUser(response.data)
        }
        catch (error) {
            failRef.current.show(error.message, 2000)
        }
    }


    async function handleChangeInfo(event) {
        event.preventDefault()
        const accessToken = localStorage.getItem('accessToken')
        const url = `${baseUrl}/api/v1/users/info`
        const elName = document.getElementById('name')
        const elGender = document.getElementById('gender')
        const elAge = document.getElementById('age')
        const elPhone = document.getElementById('phone')
        const elDateOfBirth = document.getElementById('date-of-birth')
        const elAvatar = document.getElementById('input-avatar')
        const formData = new FormData()


        formData.append('name', elName.value)
        formData.append('gender', elGender.value)
        formData.append('age', elAge.value)
        formData.append('phone', elPhone.value)
        formData.append('dateOfBirth', elDateOfBirth.value)
        formData.append('avatar', elAvatar.files[0])
        try {
            const jsonRp = await fetch(url, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            const response = await jsonRp.json()
            if (!jsonRp.ok) {
                throw new Error(response.message)
            }
            successRef.current.show(response.message, 2000)
        }
        catch (error) {
            failRef.current.show(error.message, 2000)
        }
    }

    function handleUploadAvatar(event) {
        isChangeAvatar = true
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
            document.getElementById('avatar').src = e.target.result;
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (user && <div className="flex justify-center items-center w-full px-12">
        <div className="flex flex-col items-center shadow-2xl sm:max-w-md p-12 rounded-lg">
            <form
                onSubmit={handleChangeInfo}
                className="w-full max-w-lg"
            >
                {/* <div className="flex justify-center">
                    {user.avatar ? (<img
                        id="avatar"
                        className="w-20 h-20 object-cover rounded-lg-full"
                        src={`${baseUrl + '/avatar/'+ user.avatar}`}
                        alt=""
                    />):(
                        <img
                        id="avatar"
                        className="w-20 h-20 object-cover rounded-lg-full"
                        src="/user.png"
                        alt=""
                    />
                    )
                    }
                    
                </div> */}
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Thông tin chung
                </h2>
                <div className="mt-4 flex flex-wrap md:-mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            Tên hiển thị
                        </label>
                        <input defaultValue={user.name ? user.name : ''}
                            name="name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="name"
                            type="text"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Giới tính
                        </label>
                        <select defaultValue={user.gender ? user.gender : ''}
                            name="gender"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="gender"
                        >
                            <option value="null">-</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap md:-mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Email
                        </label>
                        <input defaultValue={user.email}
                            readOnly
                            name="email"
                            className="appearance-none block w-full bg-gray-300 text-gray-700 rounded-lg py-3 px-4 mb-3 leading-tight focus:bg-white"
                            id="email"
                        >

                        </input>
                    </div>
                </div>
                <div className="flex flex-wrap md:-mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            Tuổi
                        </label>
                        <input defaultValue={user.age ? user.age : ''}
                            name="age"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="age"
                            type="number"

                        />
                    </div>

                </div>
                <div className="flex flex-wrap md:-mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            Số điện thoại
                        </label>
                        <input
                            defaultValue={user.phone ? user.phone : ''}
                            name="phone"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="phone"
                            type="text"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name">
                            Ngày sinh
                        </label>
                        <input defaultValue={user.dateOfBirth ? user.dateOfBirth : ''}
                            name="dateOfBirth"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="date-of-birth"
                            type="date"
                        />
                    </div>
                </div>
                <div>
                    <label>
                        <span className="mr-4">Tải lên ảnh đại diện</span>
                        <input onChange={handleUploadAvatar} name="avatar" id="input-avatar" type="file" accept="image/*" className="border-0" />
                    </label>
                </div>
                <div className="mt-6 flex justify-end">

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Hiệu chỉnh
                    </button>
                </div>
            </form>
        </div>
        <Fail ref={failRef} />
        <Success ref={successRef} />
    </div>)
}