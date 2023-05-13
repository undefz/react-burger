import {createAsyncThunk} from "@reduxjs/toolkit";
import {queryEndpoint, removeTokens, saveTokens} from "../../utils/http";

export const login = createAsyncThunk(
    'user/login',
    async ({email, password}) => {
        return queryEndpoint('/auth/login', {email, password})
            .then(response => {
                saveTokens(response);
                return response;
            })
    }
)

export const register = createAsyncThunk(
    'user/register',
    async ({email, password, name}) => {
        return queryEndpoint('/auth/register', {email, password, name})
            .then(response => {
                saveTokens(response);
                return response;
            })
    }
)

export const refreshToken = createAsyncThunk(
    'auth/token',
    async ({token}) => {
        return queryEndpoint('/auth/token', {token})
            .then(response => {
                saveTokens(response);
                return response;
            });
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        return queryEndpoint('/auth/logout', {token: refreshToken})
            .then(() => {
                removeTokens();
            })
            .catch(e => console.log(e));
    }
)

