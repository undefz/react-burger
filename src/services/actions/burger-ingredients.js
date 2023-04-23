import {fetchError, fetchStarted, fetchSuccess} from "../reducers/burger-ingredients";
import {REMOTE_URL} from "../../utils/app-config";
import {fillBasket} from "../reducers/burger-constructor";

export const fetchIngredients = () => {
    return (dispatch) => {
        dispatch(fetchStarted());

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
            .then(loaded => {
                dispatch(fetchSuccess(loaded));
            })
            .catch(_ => {
                dispatch(fetchError());
            });
    }
}