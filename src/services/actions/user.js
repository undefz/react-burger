import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    queryGetUser,
    removeTokens,
    saveTokens,
    queryLogout,
    queryLogin,
    queryRegister
} from "../../utils/http";

export const login = createAsyncThunk(
    'user/login',
    async ({email, password}) => {
        return queryLogin(email, password)
            .then(response => {
                saveTokens(response);
                return response;
            })
    }
)

export const register = createAsyncThunk(
    'user/register',
    async ({email, password, name}) => {
        return queryRegister(email, password, name)
            .then(response => {
                saveTokens(response);
                return response;
            })
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        return queryLogout(refreshToken)
            .then(() => {
                removeTokens();
            })
            .catch(e => console.log(e));
    }
)

export const authUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        return queryGetUser();
    }
)
