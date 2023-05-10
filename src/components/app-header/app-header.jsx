import React from 'react'
import styles from "./app-header.module.css";
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

export const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <div className={`${styles.twoBox} ${styles.first}`}>
                        <li className={styles.menuItem}>
                            <BurgerIcon type="primary"/>
                            <NavLink to="/">
                                {({isActive, isPending}) => (
                                    <p className="text text_type_main-default ml-2">Конструктор</p>
                                )}
                            </NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <ListIcon type="secondary"/>
                            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                        </li>
                    </div>
                    <li className={styles.menuItem}>
                        <Logo className={styles.logo}/>
                    </li>
                    <li className={`${styles.menuItem} ${styles.last} mr-`}>
                        <ProfileIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;