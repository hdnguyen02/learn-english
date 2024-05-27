import { Outlet, Navigate } from 'react-router-dom'
import NotFound from '../page/NotFound'

const PrivateRoutes = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'))
    return(
        isAuthenticated ? <Outlet/> : <NotFound/>
    )
}

export default PrivateRoutes    