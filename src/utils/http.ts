import {BASE_URL} from "./app-config";
import {TIngredient, TProfileData} from "./burger-prop-types";

type TResponse = {
    success: boolean;
}

export type TUserResponse = {
    user: TProfileData;
}

type TIngredientsResponse = {
    data: Array<TIngredient>;
}

type TOrder = {
    number: number;
}

type TOrderResponse = {
    order: TOrder;
}

export type TTokenResponse = {
    accessToken: string;
    refreshToken: string;
}

export const queryGetUser = (): Promise<TProfileData> => {
    return queryEndpoint<TUserResponse>('/auth/user', undefined, true, 'GET')
        .then(response => response.user);
}

export const queryPatchUser = (profileData: TProfileData) => {
    return queryEndpoint('/auth/user', {...profileData}, true, 'PATCH');
}

export const queryLogin = (email: string, password: string): Promise<TTokenResponse & TUserResponse> => {
    return queryEndpoint('/auth/login', {email, password});
}

export const queryRegister = (email: string, password: string, name: string): Promise<TTokenResponse & TUserResponse> => {
    return queryEndpoint('/auth/register', {email, password, name});
}

export const queryLogout = (refreshToken: string|null) => {
    if (!refreshToken) {
        return Promise.resolve();
    }
    return queryEndpoint('/auth/logout', {token: refreshToken})
}

export const queryIngredients = (): Promise<Array<TIngredient>> => {
    return queryEndpoint<TIngredientsResponse>('/ingredients', undefined, false, 'GET')
        .then(res => res.data);
}

export const queryOrder = (orderIds: Array<string>): Promise<number> => {
    return queryEndpoint<TOrderResponse>('/orders', {ingredients: orderIds}, true, 'POST')
        .then(res => res.order.number);
}

export const queryForgotPassword = (email: string) => {
    return queryEndpoint('/password-reset', {email});
}

export const queryResetPassword = (password: string, token: string) => {
    return queryEndpoint('/password-reset/reset', {password, token});
}

const queryEndpoint = async <T = unknown>(url: string,
                                body: object|undefined,
                                auth: boolean = false,
                                methodType: string = 'POST',
                                attempt: number = 0): Promise<T> => {
    const headers: HeadersInit = {'Content-Type': 'application/json'}
    if (auth) {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.reject("Не авторизирован");
        }
        headers['Authorization'] = token;
    }

    const request: RequestInit = {
        method: methodType,
        headers: headers
    };

    if (body) {
        request.body = JSON.stringify(body);
    }

    console.log(`Request ${JSON.stringify(request)} attempt=${attempt}`)

    return fetch(BASE_URL + url, request)
        .then(res => {
            if (res.status === 403 && attempt === 0) {
                console.log("Starting refreshing token");
                const refreshToken = localStorage.getItem('refreshToken');
                const request: RequestInit = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({token: refreshToken}),
                }
                return fetch(BASE_URL + "/auth/token", request)
                    .then(res => {
                        if (res.ok) {
                            return (res.json() as Promise<TTokenResponse>)
                                .then(tokenBody => {
                                    console.log(`Successful token refresh ${JSON.stringify(tokenBody)}`);
                                    saveTokens(tokenBody);
                                })
                        }
                    })
                    .then(() => queryEndpoint(url, body, auth, methodType, 1));
            }

            if (res.ok) {
                return (res.json() as Promise<TResponse & T>)
                    .then(decoded => {
                        if (decoded.success) {
                            return decoded;
                        } else {
                            return Promise.reject("Сервер ответил success=false");
                        }
                    });
            }

            return Promise.reject(`Ошибка ${res.status}`);
        })

}

export const saveTokens = (response: TTokenResponse) => {
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
}

export const removeTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}