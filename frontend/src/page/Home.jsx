import React from 'react'


function Home() {
  return (
    <div className="relative">
       <img src="/study.jpg" alt=""/>
       <div className="absolute top-16 left-20 text-xl lg:top-48 lg:left-52 lg:text-5xl font-bold text-white">
            <h2>Thẻ ghi nhớ kỹ thuật số và</h2>
            <h2>các công cụ học tốt nhất</h2>
       </div>
       <button type="button" className="absolute top-32 left-20 lg:top-[330px] lg:left-52 focus:outline-none text-white bg-[#4255FF] hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-3 mb-2">Đăng ký miễn phí</button>
    </div>
  )
}

export default Home
