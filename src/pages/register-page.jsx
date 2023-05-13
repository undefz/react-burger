import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import styles from "./common-styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {register} from "../services/actions/user";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user.user) {
            navigate('/');
        }
    }, [user, navigate]);

    const submitRegister = (e) => {
        e.preventDefault();
        dispatch(register({email, password, name}))
    }

    return (
        <div className={styles.centered}>
            <h1 className="mb-6 text text_type_main-large">Регистрация</h1>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" extraClass="mb-6"/>
            <EmailInput value={email} onChange={e => setEmail(e.target.value)} extraClass="mb-6"/>
            <PasswordInput value={password} onChange={e => setPassword(e.target.value)} extraClass="mb-6"/>
            <Button htmlType="button" size="medium" extraClass="mb-20" onClick={submitRegister}>Зарегестрироваться</Button>
            <p className="mb-4 text text_type_main-default">Уже зарегестрированы? <Link to="/login" className={styles.link}>Войти</Link></p>
        </div>
    );
}