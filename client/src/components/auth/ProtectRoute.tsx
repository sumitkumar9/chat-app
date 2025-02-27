import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = ({children, user, redirect = "/login"}: {children: React.ReactNode, user: boolean, redirect?: string}) => {
    if (!user) {
        return <Navigate to={redirect}/>
    }
  return children ? children : <Outlet/>
}

export default ProtectRoute