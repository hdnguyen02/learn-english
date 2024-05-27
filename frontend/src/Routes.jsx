import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom"
//history
import { history } from '../src/helpers/history'
import Navbar from './component/Navbar'
import Home from './page/Home'
import SignIn from './page/SignIn'
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

function Routes() {
    return (
        <Router history={history}>
            <div>
                <Navbar /> 
                <Switch>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/forgot-password" element={<ForgotPW />} />

                    <Route path="/classes" element={<ClassUser />} >
                        <Route path='' element={<Classes />} />
                        <Route path='create' element={<CreateClass />} />
                        <Route path=':id' element={<DetailClass />} >
                            <Route path='members' element={<MemberClass />} />
                            <Route path='student-session' element={<StudentSession />} />
                            <Route path='add-member' element={<AddMember />} />
                            <Route path='share-student-session' element={<ShareStudentSesion />} />
                        </Route>
                    </Route>

                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/settings' element={<Settings />} >
                        <Route path='info' element={<InfoUser />} />
                        <Route path='password' element={<ChangePW />} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Routes