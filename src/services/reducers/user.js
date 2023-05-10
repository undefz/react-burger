import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthed: false,
        isResettingPassword: false
    },
    extraReducers: (builder) => {
        builder.addCase()
    }
})