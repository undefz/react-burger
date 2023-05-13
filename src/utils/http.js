import {BASE_URL} from "./app-config";

export const queryGetUser = () => {
    return queryEndpoint('/auth/user', null, true, 'GET');
}

export const queryPatchUser = (profileData) => {
    return queryEndpoint('/auth/user', {...profileData}, true, 'PATCH');
}

export const queryLogin = (email, password) => {
    return queryEndpoint('/auth/login', {email, password});
}

export const queryRegister = (email, password, name) => {
    return queryEndpoint('/auth/register', {email, password, name});
}

export const queryLogout = (refreshToken) => {
    return queryEndpoint('/auth/logout', {token: refreshToken})
}

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
            if (res.status === 403) {
                console.log("Starting refreshing token");
                const refreshToken = localStorage.getItem('refreshToken');
                const request = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({token: refreshToken}),
                }
                fetch(BASE_URL + "/auth/token", request)
                    .then(res => {
                        if (res.ok) {
                            console.log(`Successful token refresh ${res}`);
                            const tokenBody = res.json()
                            saveTokens(tokenBody);
                        }
                    })
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