import {requestStarted} from "../reducers/order-details";
import {ORDER_URL} from "../../utils/app-config";
import {fetchError, fetchSuccess} from "../reducers/burger-ingredients";

export const makeOrder = () => {
    return (dispatch) => {
        dispatch(requestStarted());

        fetch(ORDER_URL)
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
            .then(loaded => dispatch(fetchSuccess(loaded)))
            .catch(_ => {
                dispatch(fetchError());
            });
    }
}