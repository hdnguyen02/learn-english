import React, { useEffect, useRef, useState } from 'react'

function AddMember() {
 
    
    return <div>
         <label for="email">
                <p class="font-medium text-slate-700 pb-2">Địa chỉ email</p>
                <input id="email" name="email" type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address"/>
        </label>
        <div className='flex justify-end mt-4'>
        <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                    Gửi lời mời         
        </button>
        </div>
       
       
    </div>
}



export default AddMember