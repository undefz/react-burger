import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
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
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {OrderFeed} from "../order-feed/order-feed";
import {OrderDetails} from "../order-details/order-details";

const App = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const state = location.state;

    const user = useAppSelector(state => state.user);

    useEffect(() => {
        console.log('Page navigated to: ', location.pathname);
    }, [location]);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (!user.isAuthed && localStorage.getItem('token')) {
            dispatch(authUser());
        }
    }, [dispatch, user.isAuthed]);

    const {isLoading, hasError} = useAppSelector(state => state.ingredients);

    const onModalClose = () => {
        console.log("Navigating from modal close");
        navigate(-1);
    }

    return (
        <div className={styles.app}>
            <AppHeader/>

            <Routes location={state?.backgroundLocation || location}>
                <Route index element={
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

                <Route path="/feed" element={
                    <OrderFeed/>
                }/>

                <Route path="/profile" element={
                    <ProtectedRouteElement element={
                        <ProfilePage/>
                    }/>
                }>
                    <Route index element={<ProfileEditor/>}/>
                    <Route path='orders' element={<ProfileOrders/>}/>
                </Route>

                <Route path="/ingredients/:id" element={
                    <IngredientDetails/>
                }/>

                <Route path="/profile/orders/:id" element={
                    <OrderDetails/>
                }/>
                <Route path="/feed/:id" element={
                    <OrderDetails/>
                }/>

                <Route path="*" element={
                    <Page404/>
                }/>
            </Routes>

            {
                state?.backgroundLocation &&
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal closeModal={onModalClose}>
                            <IngredientDetails/>
                        </Modal>
                    }/>
                    <Route path="/profile/orders/:id" element={
                        <Modal closeModal={onModalClose}>
                            <OrderDetails/>
                        </Modal>
                    }/>
                    <Route path="/feed/:id" element={
                        <Modal closeModal={onModalClose}>
                            <OrderDetails/>
                        </Modal>
                    }/>
                </Routes>
            }
        </div>
    );
}

export default App;
