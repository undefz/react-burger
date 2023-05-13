import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/actions/burger-ingredients";
import {Route, Routes, useLocation} from "react-router";
import {RegisterPage} from "../../pages/register-page";
import {MainPage} from "../../pages/main-page";
import {LoginPage} from "../../pages/login-page";
import {ForgotPasswordPage} from "../../pages/forgot-password-page";
import {ResetPasswordPage} from "../../pages/reset-password-page";
import {ProfilePage} from "../../pages/profile-page";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {Page404} from "../../pages/page-404";
import {ProtectedRouteElement} from "../protected-route-element/protected-route-element";
import Modal from "../modal/modal";
import {useNavigate} from "react-router-dom";
import {authUser} from "../../services/actions/user";
import {ProfileEditor} from "../profile-editor/profile-editor";
import {ProfileOrders} from "../profile-orders/profile-orders";

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const showModal = location.state?.modal;

    const user = useSelector(state => state.user);

    useEffect(() => {
        console.log('Page navigated to: ', location.pathname);
    }, [location]);

    useEffect(() => {
        dispatch(fetchIngredients());

        if (!user.isAuthed && localStorage.getItem('token')) {
            dispatch(authUser());
        }
    }, [dispatch, user]);

    const {isLoading, hasError} = useSelector(state => state.ingredients);

    const onModalClose = () => {
        console.log("Navigating from modal close");
        navigate(-1);
    }

    return (
        <div className={styles.app}>
            <AppHeader/>

            <Routes>
                <Route path="/" element={
                    !isLoading &&
                    !hasError && (
                        <MainPage/>
                    )
                }/>

                <Route path="register" element={
                    <ProtectedRouteElement checkAuth={false} element={
                        <RegisterPage/>
                    }/>
                }/>

                <Route path="/login" element={
                    <ProtectedRouteElement checkAuth={false} element={
                        <LoginPage/>
                    }/>
                }/>

                <Route path="/forgot-password" element={
                    <ProtectedRouteElement checkAuth={false} element={
                        <ForgotPasswordPage/>
                    }/>
                }/>

                {
                    user.isResettingPassword && (
                        <Route path="/reset-password" element={
                            <ProtectedRouteElement checkAuth={false} element={
                                <ResetPasswordPage/>
                            }/>
                        }/>
                    )
                }

                <Route path="/profile" element={
                    <ProtectedRouteElement element={
                        <ProfilePage>
                            <ProfileEditor/>
                        </ProfilePage>
                    }/>
                }/>

                <Route path="/profile/orders" element={
                    <ProtectedRouteElement element={
                        <ProfilePage>
                            <ProfileOrders/>
                        </ProfilePage>
                    }/>
                }/>

                <Route path="/ingredients/:id" element={
                    showModal
                        ?
                        (
                            <Modal closeModal={onModalClose}>
                                <IngredientDetails/>
                            </Modal>
                        )
                        : (
                            <IngredientDetails/>
                        )
                }/>

                <Route path="*" element={
                    <Page404/>
                }/>
            </Routes>

        </div>
    );
}

export default App;
