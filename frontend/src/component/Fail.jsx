import React, { useState, forwardRef } from 'react'

const Fail = React.forwardRef((props, ref) => {

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
        show
      }));


    return (
        <div>
            {isShow &&
                (<div className="fixed bottom-2 right-8 max-w-sm items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
                    <div>
                        <i className="fas fa-bell mr-2"></i>
                        <span className="font-medium">{message}</span>
                    </div>
                </div>)
            }
        </div>
    );
})


export default Fail