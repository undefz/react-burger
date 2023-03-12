import React from 'react';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import styles from "./app.module.css";
import {REMOTE_URL} from "../../utils/app-config"
import {generateBasket} from "../../utils/utils";

const App = () => {
    const [state, setState] = React.useState({
        isLoading: true,
        hasError: false,
        data: []
    });

    React.useEffect(() => {
        setState({...state, hasError: false, isLoading: true});
        fetch(REMOTE_URL)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(decoded => {
                if (decoded.success) {
                    return decoded.data;
                }
                return Promise.reject("Сервер ответил success=false");
            })
            .then(loaded => setState({data: loaded, isLoading: false, hasError: false}))
            .catch(_ => {
                setState({...state, hasError: true, isLoading: false});
            });
    }, []);


    const {data, isLoading, hasError} = state;

    // console.log(`Loading state ${JSON.stringify(data)} ${isLoading} ${hasError}`);

    const basket = generateBasket(data);

    return (
        <div className={styles.app}>
            <AppHeader/>
            {!isLoading &&
                !hasError && (
                    <Main ingredients={data} basket={basket}/>
                )}
        </div>
    );
}

export default App;
