import React from 'react'
import styles from "./app-header.module.css";
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

export const MenuItem = ({link, icon, text}) => {
    return (
        <NavLink to={link} className={styles.link}>
        {({isActive}) => (
            <div className={styles.menuItem}>
                {icon(isActive)}
                <p className={'text text_type_main-default ml-2 ' + (isActive ? 'text_color_primary' : '')}>{text}</p>
            </div>
        )}
    </NavLink>
    );
}

export const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <div className={`${styles.twoBox} ${styles.first}`}>
                        <li>
                            <MenuItem link='/' icon = {active => <BurgerIcon type={active ? 'primary' : 'secondary'}/>} text='Конструктор'/>
                        </li>
                        <li>
                            <MenuItem link='/feed' icon = {active => <ListIcon type={active ? 'primary' : 'secondary'}/>} text='Лента заказов'/>
                        </li>
                    </div>
                    <li className={styles.menuItem}>
                        <Logo className={styles.logo}/>
                    </li>
                    <li className={`${styles.menuItem} ${styles.last}`}>
                        <MenuItem link='/profile/' icon = {active => <ProfileIcon type={active ? 'primary' : 'secondary'}/>} text='Личный кабинет'/>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

MenuItem.propTypes = {
    link: PropTypes.string,
    icon: PropTypes.element,
    text: PropTypes.string
}

export default AppHeader;