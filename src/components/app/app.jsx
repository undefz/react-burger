import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerTwopanels from "../burger-twopanels/burger-twopanels";
import {burgerData} from "../../utils/data";
import styles from "./app.module.css";

function App() {
    return (
        <div className={styles.app}>
            <AppHeader/>
            <div>
                <BurgerTwopanels ingredients={burgerData}/>
            </div>
        </div>
    );
}

export default App;
