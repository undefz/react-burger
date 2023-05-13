import styles from "./common-styles.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {queryResetPassword} from "../utils/http";

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();
        queryResetPassword(password, token)
            .then(() => {
                navigate('/login')
            })
    }

    return (
        <div className={styles.centered}>
            <h1 className="mb-6 text text_type_main-large">Восстановление пароля</h1>
            <PasswordInput
                placeholder="Введите новый пароль"
                value={password}
                name={'password'}
                onChange={e => {setPassword(e.target.value)}}
                extraClass="mb-6"
            />
            <Input value={token} onChange={e => setToken(e.target.value)} placeholder="Введите код из письма" extraClass="mb-6"/>
            <Button htmlType="button" size="medium" extraClass="mb-20" onClick={handleResetPassword}>Сохранить</Button>
            <p className="mb-4 text text_type_main-default">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></p>
        </div>
    );
}