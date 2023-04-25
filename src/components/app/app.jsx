import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import styles from "./app.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/actions/burger-ingredients";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);

    const {isLoading, hasError} = useSelector(state => state.ingredients);

    return (
        <div className={styles.app}>
            <AppHeader/>
            {!isLoading &&
                !hasError && (
                    <Main/>
                )}
        </div>
    );
}

export default App;
