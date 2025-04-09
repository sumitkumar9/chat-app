import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks';

const ProtectRoute = ({children, redirect = "/login"}: {children?: React.ReactNode, redirect?: string;}) => {

  const { user } = useAppSelector((state) => state.auth);

  if (user === null) {
    return <Navigate to={redirect} replace/>
  }
  return children ? children : <Outlet/>
}

export default ProtectRoute