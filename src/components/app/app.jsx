import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/actions/burger-ingredients";
import {Route, Routes} from "react-router";
import {RegisterPage} from "../../pages/register-page";
import {MainPage} from "../../pages/main-page";
import {LoginPage} from "../../pages/login-page";
import {ForgotPasswordPage} from "../../pages/forgot-password-page";
import {ResetPasswordPage} from "../../pages/reset-password-page";
import {ProfilePage} from "../../pages/profile-page";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {Page404} from "../../pages/page-404";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);

    const {isLoading, hasError} = useSelector(state => state.ingredients);

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
                    <RegisterPage/>
                }/>

                <Route path="/login" element={
                    <LoginPage/>
                }/>

                <Route path="/forgot-password" element={
                    <ForgotPasswordPage/>
                }/>

                <Route path="/reset-password" element={
                    <ResetPasswordPage/>
                }/>

                <Route path="/profile" element={
                    <ProfilePage/>
                }/>

                <Route path="/ingredients/:id" element={
                   <IngredientDetails/>
                }/>

                <Route path="*" element={
                    <Page404/>
                }/>
            </Routes>

        </div>
    );
}

export default App;
