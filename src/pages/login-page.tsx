import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from './common-styles.module.css';
import {FormEvent, useState} from "react";
import {login} from "../services/actions/user";
import {useAppDispatch, useAppSelector} from "../services/hooks";

export const LoginPage = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = useAppSelector(state => state.user);


    const submitLogin = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login({email, password}));
    }

    return (
        <div className={styles.centered}>
            <h1 className="mb-6 text text_type_main-large">Вход</h1>
            <form className={styles.form} onSubmit={submitLogin}>
                <EmailInput value={email} onChange={e => setEmail(e.target.value)} extraClass="mb-6"/>
                <PasswordInput value={password} onChange={e => setPassword(e.target.value)} extraClass="mb-6"/>
                <Button htmlType="submit" size="medium" extraClass="">Войти</Button>
            </form>
            {user.isAuthFailed && (<span className="mt-4 text text_color_error text_type_main-medium">Ошибочка</span>)}
            <div className={styles.links}>
                <p className="mt-20 mb-4 text text_type_main-default">Вы - новый пользователь? <Link to="/register" className={styles.link}>Зарегестрироваться</Link></p>
                <p className="text text_type_main-default">Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></p>
            </div>
        </div>
    );
}