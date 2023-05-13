import styles from "./common-styles.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {queryForgotPassword} from "../utils/http";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setResettingPassword} from "../services/reducers/user";

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const handleForgotPassword = (e) => {
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
            <EmailInput value={email} placeholder="Укажите e-mail" onChange={e => setEmail(e.target.value)} extraClass="mb-6"/>
            <Button htmlType="button" size="medium" extraClass="mb-20" onClick={handleForgotPassword}>Восстановить</Button>
            <p className="mb-4 text text_type_main-default">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></p>
        </div>
    );
}