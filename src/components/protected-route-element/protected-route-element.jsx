import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";
import {useLocation} from "react-router";

export const ProtectedRouteElement = ({checkAuth = true, element, t}) => {
    const { isAuthed } = useSelector(state => state.user);
    const location = useLocation()


    if (checkAuth) {
        return isAuthed ? element : <Navigate to="/login" state={{returnTo: location.pathname}}/>;
    } else {
        if (isAuthed) {
            console.log('Navigation from protected route element ' + t);
            return <Navigate to={location.state?.returnTo || '/'}/>;
        } else {
            return element;
        }
    }
}