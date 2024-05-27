import React, { useState, forwardRef } from 'react'

const Success = React.forwardRef((props, ref) => {

    let [message, setMessage] = useState('')
    let [isShow, setIsShow] = useState(false)

    function show(message, showTime) {
        setMessage(message)
        setIsShow(true)
        setTimeout(() => {
            setIsShow(false)
        }, showTime)
    }

    React.useImperativeHandle(ref, () => ({
        show // Chỉ định phương thức vào ref
      }));


    return (
        <div>
            {isShow &&
                <div className="fixed bottom-2 right-8 max-w-sm items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50">
                    <div>
                        <i className="fas fa-bell mr-2"></i>
                        <span className="font-medium">{message}</span>
                    </div>
                </div>
            }
        </div>
    );
})


export default Success