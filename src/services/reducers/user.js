import {createSlice} from "@reduxjs/toolkit";
import {login, register, logout} from "../actions/user";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthed: false,
        isAuthFailed: false,
        isResettingPassword: false
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthed = true;
            state.isAuthFailed = false;
        }).addCase(login.pending, (state, action) => {
            state.isAuthFailed = false;
        }).addCase(login.rejected, (state, action) => {
            state.user = null;
            state.isAuthed = false;
            state.isAuthFailed = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthed = true;
            state.isAuthFailed = false;
        }).addCase(register.pending, (state, action) => {
            state.isAuthFailed = false;
        }).addCase(register.rejected, (state, action) => {
            state.isAuthFailed = true;
        }).addCase(logout.fulfilled, (state, action) => {
            state.user = null;
            state.isAuthed = false;
        }).addCase(logout.pending, (state, action) => {
        }).addCase(logout.rejected, (state, action) => {
        })
    }
})