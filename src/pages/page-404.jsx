import {Link} from "react-router-dom";
import styles from './common-styles.module.css';

export const Page404 = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 50}}>
            <h1 className={"text text_type_main-large"}>404</h1>
            <h2 className={"text text_type_main-large"}>Увы</h2>
            <p className={"text text_type_main-medium"}>Но запрошенной страницы не существует</p>
            <Link to="/" className={styles.link}>Вернуться на главную</Link>
        </div>
    )
}