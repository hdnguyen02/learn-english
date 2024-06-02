import Navbar from './component/Navbar'
import Home from './page/Home'
import SignIn from './page/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ClassUser from './page/ClassUser'
import Classes from './component/Classes'
import DetailClass from './component/DetailClass'
import MemberClass from './component/MemberClass'
import StudentSession from './component/StudentSession'
import AddMember from './component/AddMember'
import ShareStudentSesion from './component/ShareStudentSession'
import CreateClass from './component/CreateClass'
import SignUp from './page/SignUp'
import Settings from './page/Settings'
import InfoUser from './component/InfoUser'
import ChangePW from './component/ChangePW'
import ForgotPW from './page/Forgot-PW'
import ResetPW from './page/ResetPW'
import PrivateRoutes from './helper/PrivateRoutes'
import Deck from './page/Deck'
import Decks from './component/Decks'
import CreateCard from './component/CreateCard'
import FlipCard from './page/FlipCard'
import EditDeck from './component/EditDeck'
import Contact from './page/Contact'
import CreateDeck from './component/CreateDeck'
import EditCard from './component/EditCard'
import Card from './page/Card'
import Cards from './component/Cards'
import { useEffect } from 'react'
import { fetchData } from './global'



function App() {
  async function checkAuth() {
    const subUrl = '/users/info'
    try {
      await fetchData(subUrl, 'GET')
    }
    catch (error) {
      if (error.code == 400) { // token không hợp lệ
        localStorage.clear()
        window.location.reload() // load lại áp dụng cho trang
      }
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      checkAuth()
    }
    else {
      localStorage.clear()
    }
  }, [])

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {/* private router */}
          <Route element={<PrivateRoutes />}>

            {/* classes */}
            <Route path='/classes' element={<ClassUser />}>
              <Route path='' element={<Classes />} />
              <Route path='create' element={<CreateClass />} />
              <Route path=':id' element={<DetailClass />} >
                <Route path='members' element={<MemberClass />} />
                <Route path='student-session' element={<StudentSession />} />
                <Route path='add-member' element={<AddMember />} />
                <Route path='share-student-session' element={<ShareStudentSesion />} />
              </Route>
            </Route>

            <Route path='/decks' element={<Deck />}>
              <Route path='' element={<Decks />} />
              <Route path='create' element={<CreateDeck />} />
              <Route path=':id/create-cards' element={<CreateCard />} />
              <Route path='edit/:id' element={<EditDeck />} />
              <Route path=':id/learn-cards' element={<FlipCard />} />
            </Route>

            <Route path="/cards" element={<Card />} >
              <Route path='' element={<Cards />} />
              <Route path='edit/:id' element={<EditCard />} />
            </Route>

            {/* settings */}
            <Route path='/settings' element={<Settings />} >
              <Route path='info' element={<InfoUser />} />
              <Route path='password' element={<ChangePW />} />
            </Route>
          </Route>

          {/* public */}
          <Route path='/' exact element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPW />} />
          <Route path='/reset-password' element={<ResetPW />} />
          <Route path='/contact' element={<Contact />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App