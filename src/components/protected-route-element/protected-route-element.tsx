import {Navigate} from "react-router-dom";
import React, {ReactElement} from "react";
import {useLocation} from "react-router";
import {useAppSelector} from "../../services/hooks";

type TProtectedRouteProps = {
    checkAuth?: boolean;
    element: ReactElement;
}
export const ProtectedRouteElement = ({checkAuth = true, element}: TProtectedRouteProps) => {
    const { isAuthed } = useAppSelector(state => state.user);
    const location = useLocation()


    if (checkAuth) {
        return isAuthed ? element : <Navigate to="/login" state={{returnTo: location.pathname}}/>;
    } else {
        if (isAuthed) {
            return <Navigate to={location.state?.returnTo || '/'}/>;
        } else {
            return element;
        }
    }
}
