import styles from "./common-styles.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {queryForgotPassword} from "../utils/http";
import {FormEvent, useState} from "react";
import {setResettingPassword} from "../services/reducers/user";
import {useAppDispatch} from "../services/hooks";

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();

    const handleForgotPassword = (e: FormEvent) => {
        e.preventDefault();
        queryForgotPassword(email)
            .then(() => {
                dispatch(setResettingPassword());
                navigate('/reset-password');
            })
    }

    return (
        <div className={styles.centered}>
            <h1 className="mb-6 text text_type_main-large">Восстановление пароля</h1>
            <form className={styles.form} onSubmit={handleForgotPassword}>
                <EmailInput value={email} placeholder="Укажите e-mail" onChange={e => setEmail(e.target.value)} extraClass="mb-6"/>
                <Button htmlType="submit" size="medium" extraClass="mb-20">Восстановить</Button>
            </form>
            <p className="mb-4 text text_type_main-default">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></p>
        </div>
    );
}