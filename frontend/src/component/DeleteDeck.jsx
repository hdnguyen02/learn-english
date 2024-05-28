
import React from 'react'

function DeleteDeck({handleCancle, handleDeleteDeck, idDeckDelete}) {





    return <div id="popup-delete-deck" className="fixed top-0 left-0 w-full h-full hidden">
        <div className="absolute top-1/2 left-1/2 bg-white px-8 py-10 rounded-lg"
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px"
              }}>
            <button onClick={handleCancle}
                className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>


            <div className="mb-6">
              <h3 className='text-center'>Xác nhận xóa bộ thẻ</h3>
              <p className='text-red-600 text-center'>Lưu ý: Thao tác không thể quay lại</p>
            </div>


            <div className="flex md:flex-row flex-col gap-4 justify-between items-center">
                <button onClick={handleCancle}
                    className="py-2 w-32 text-sm font-medium text-center hover:text-white bg-gray-300 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                    Không, cảm ơn
                </button>
                <button onClick={handleDeleteDeck}
                    className="py-2 w-32 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                    Xóa bộ thẻ
                </button>
            </div>
        </div>
    </div>

}

export default DeleteDeck






