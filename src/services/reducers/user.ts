import {createSlice} from "@reduxjs/toolkit";
import {login, register, logout, authUser} from "../actions/user";
import {TProfileData} from "../../utils/burger-prop-types";

type TUserState = {
    user: TProfileData|null;
    isAuthed: boolean;
    isAuthFailed: boolean;

    isResettingPassword: boolean;
}

const initialState: TUserState = {
    user: null,
    isAuthed: false,
    isAuthFailed: false,
    isResettingPassword: false
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setResettingPassword: (state) => {
            state.isResettingPassword = true;
        },
        unsetResettingPassword: (state) => {
            state.isResettingPassword = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthed = true;
            state.isAuthFailed = false;
        }).addCase(login.pending, (state) => {
            state.isAuthFailed = false;
        }).addCase(login.rejected, (state) => {
            state.user = null;
            state.isAuthed = false;
            state.isAuthFailed = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthed = true;
            state.isAuthFailed = false;
        }).addCase(register.pending, (state) => {
            state.isAuthFailed = false;
        }).addCase(register.rejected, (state) => {
            state.isAuthFailed = true;
        }).addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.isAuthed = false;
        }).addCase(authUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthed = true;
            state.isAuthFailed = false;
        })
    }
})

export const {setResettingPassword, unsetResettingPassword} = userSlice.actions;