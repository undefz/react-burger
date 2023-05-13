import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import styles from './common-styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {login} from "../services/actions/user";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.user) {
            navigate('/');
        }
    }, [user, navigate]);

    const submitLogin = (e) => {
        e.preventDefault();
        dispatch(login({email, password}));
    }

    return (
        <div className={styles.centered}>
            <h1 className="mb-6 text text_type_main-large">Вход</h1>
            <EmailInput value={email} onChange={e => setEmail(e.target.value)} extraClass="mb-6"/>
            <PasswordInput value={password} onChange={e => setPassword(e.target.value)} extraClass="mb-6"/>
            <Button htmlType="button" size="medium" extraClass="" onClick={e => submitLogin(e)}>Войти</Button>
            {user.isAuthFailed && (<span className="mt-4 text text_color_error text_type_main-medium">Ошибочка</span>)}
            <div className={styles.links}>
                <p className="mt-20 mb-4 text text_type_main-default">Вы - новый пользователь? <Link to="/register" className={styles.link}>Зарегестрироваться</Link></p>
                <p className="text text_type_main-default">Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></p>
            </div>
        </div>
    );
}