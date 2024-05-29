export default function Contact() {
    return <section className="mt-32">
    <div className="px-4 pb-12 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Liên hệ chúng tôi</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">Có một vấn đề kỹ thuật? Bạn muốn gửi phản hồi về tính năng beta? Cần thông tin chi tiết về kế hoạch kinh doanh của chúng tôi? Hãy cho chúng tôi biết.</p>
        <form  className="space-y-8">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="name@flowbite.com" required/>
            </div>
            <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="Let us know how we can help you" required/>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Your message</label>
                <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
            </div>
            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">Send message</button>
        </form>
    </div>
  </section>
}