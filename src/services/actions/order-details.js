import {ORDER_URL} from "../../utils/app-config";
import {requestStarted, requestFailed, requestSuccess} from "../reducers/order-details";

export const makeOrder = (orderIds) => {
    return (dispatch) => {
        dispatch(requestStarted());

        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredients: orderIds}),
        };

        fetch(ORDER_URL, request)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(decoded => {
                if (decoded.success) {
                    return decoded.order.number;
                }
                return Promise.reject("Сервер ответил success=false");
            })
            .then(loaded => dispatch(requestSuccess(loaded)))
            .catch(_ => {
                dispatch(requestFailed());
            });
    }
}