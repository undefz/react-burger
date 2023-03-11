import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerTwopanels from "../burger-twopanels/burger-twopanels";
import styles from "./app.module.css";

const App = () => {
    const [state, setState] = React.useState({
        isLoading: true,
        hasError: false,
        data: []
    });

    React.useEffect(() => {
        setState({...state, hasError: false, isLoading: true});
        fetch("https://norma.nomoreparties.space/api/ingredients")
            .then(res => res.json())
            .then(loaded => setState({data: loaded.data, isLoading: false, hasError: !loaded.success}))
            .catch(_ => {
                setState({...state, hasError: true, isLoading: false});
            });
    }, []);


    const {data, isLoading, hasError} = state;

    // console.log(`Loading state ${JSON.stringify(data)} ${isLoading} ${hasError}`);

    return (
        <div className={styles.app}>
            <AppHeader/>
            {!isLoading &&
                !hasError && (
                    <div>
                        <BurgerTwopanels ingredients={data}/>
                    </div>
                )}
        </div>
    );
}

export default App;
