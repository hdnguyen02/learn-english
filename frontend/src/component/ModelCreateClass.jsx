import React, { useRef, useState } from "react"
import { fetchData } from "../global"
import Success from "./Success"
import Fail from "./Fail"

const ModelCreateClass = React.forwardRef(({ getClasses }, ref) => {

    const [isShow, setIsShow] = useState(false)
    const refSuccess = useRef()
    const refFail = useRef()

    function show() {
        setIsShow(true)
    }

    function close() {
        setIsShow(false)
    }


    async function handleCreateClass(event) {
        event.preventDefault()
        const subUrl = "/groups" 
        const inputName = document.getElementById('name-class')
        const inputDescription = document.getElementById('description-class')
        const name = inputName.value
        const description = inputDescription.value
    
        const body = {name, description}
        try { 
            const response = await fetchData(subUrl, 'POST', body)
            console.log(response)
    
            refSuccess.current.show('Tạo lớp thành công', 2000)
        }
        catch(error) {
            refFail.current.show('Đã có lỗi xảy ra!', 2000)
        }
    }


    React.useImperativeHandle(ref, () => ({
        show
    }));

    return (isShow && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded shadow-lg z-50">
            <div className="flex justify-end">
                <button onClick={close} className="pr-2">
                    <i className="fa-solid fa-xmark text-4xl text-gray-500"></i>
                </button>
            </div>
            {/* form */}    
            <div className="relative w-[500px]">
                <form onSubmit={handleCreateClass} className="relative rounded-md">

                    <div className="p-4 md:p-5 space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Tên lớp <span className='text-ctred'>*</span></label>
                            <input id='name-class' type="text" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="English" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Mô tả lớp</label>
                            <input id='description-class' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Tạo</button>
                    </div>
                </form>
            </div>
        </div>
        <Success ref={refSuccess}/>
        <Fail ref={refFail}/>
    </div>)
})

export default ModelCreateClass