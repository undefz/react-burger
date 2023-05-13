import {BASE_URL} from "./app-config";

export const queryEndpoint = async (url, body, auth = false, methodType = 'POST', attempt = 0) => {
    const headers = {'Content-Type': 'application/json'}
    if (auth) {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.reject("Не авторизирован");
        }
        headers['Authorization'] = token;
    }

    const request = {
        method: methodType,
        headers: headers
    };

    if (body) {
        request.body = JSON.stringify(body);
    }

    console.log(`Request ${JSON.stringify(request)}`)

    return fetch(BASE_URL + url, request)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(decoded => {
            if (decoded.success) {
                return decoded;
            } else {
                return Promise.reject("Сервер ответил success=false");
            }
        })
}
export const saveTokens = (response) => {
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
}

export const removeTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}