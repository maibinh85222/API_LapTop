
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {

    const {auth} = useAuth();
    const location = useLocation();

    console.log("Auth trong require auth " + auth?.roles);

    // return (

    //     auth?.roles 
    //         ? <Outlet />
    //         : <Navigate to="/signin" state={{ from: location }} replace />
    // )

    return (
        auth?.accessToken &&  allowedRoles.includes(auth?.roles)
          ? <Outlet />
          : auth?.accessToken
            ? <Navigate to='/unauthorized' /> // navigate the user to unauthorized page
            : <Navigate to='/signin' state={{from: location}} replace />
      );
}


export default RequireAuth;