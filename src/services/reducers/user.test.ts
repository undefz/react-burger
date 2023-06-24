import {setResettingPassword, unsetResettingPassword, userSlice} from "./user";
import {authUser, login, logout, register} from "../actions/user";
import {TTokenResponse, TUserResponse} from "../../utils/http";

describe('User reducers', () => {
    const reducer = userSlice.reducer;
    it('has initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual({
            user: null,
            isAuthed: false,
            isAuthFailed: false,
            isResettingPassword: false
        })
    })
    it('login.fulfilled', () => {
        const tokenResponse: TTokenResponse = {
            accessToken: '123',
            refreshToken: '456'
        }
        const userResponse: TUserResponse = {
            user: {
                name: 'test',
                email: 'test@test.com',
                password: 'test'
            }

        }
        expect(reducer(undefined, login.fulfilled({...tokenResponse, ...userResponse}, '', {email:'', password:''}, undefined))).toEqual({
            ...userResponse,
            isAuthed: true,
            isAuthFailed: false,
            isResettingPassword: false
        })
    })
    it('login.pending', () => {
        expect(reducer(undefined, login.pending)).toEqual({
            user: null,
            isAuthed: false,
            isAuthFailed: false,
            isResettingPassword: false
        })
    })
    it('login.rejected', () =>{
        expect(reducer(undefined, login.rejected)).toEqual({
            user: null,
            isAuthed: false,
            isAuthFailed: true,
            isResettingPassword: false
        })
    })
    it('register.fulfilled', () => {
        const tokenResponse: TTokenResponse = {
            accessToken: '123',
            refreshToken: '456'
        }
        const userResponse: TUserResponse = {
            user: {
                name: 'test',
                email: 'test@test.com',
                password: 'test'
            }

        }
        expect(reducer(undefined, register.fulfilled({...tokenResponse, ...userResponse}, '', {email:'', password:'', name:''}, undefined))).toEqual({
            ...userResponse,
            isAuthed: true,
            isAuthFailed: false,
            isResettingPassword: false
        })
    })
    it('register.pending', () => {
        expect(reducer(undefined, register.pending)).toEqual({
            user: null,
            isAuthed: false,
            isAuthFailed: false,
            isResettingPassword: false
        })
    })
    it('register.rejected', () => {
        expect(reducer(undefined, register.rejected)).toEqual({
            user: null,
            isAuthed: false,
            isAuthFailed: true,
            isResettingPassword: false
        })
    })
    it('logout.fulfilled', () => {
        const state = {
            user: {
                name: 'test',
                email: 'test@test.com'
            },
            isAuthed: true,
            isAuthFailed: false,
            isResettingPassword: false
        }
        expect(reducer(state, logout.fulfilled)).toEqual({
            user: null,
            isAuthed: false,
            isAuthFailed: false,
            isResettingPassword: false
        })
    })
    it('setResettingPassword', () => {
        const state = {
            user: {
                name: 'test',
                email: 'test@test.com'
            },
            isAuthed: true,
            isAuthFailed: false,
            isResettingPassword: false
        }
        expect(reducer(state, setResettingPassword)).toEqual({
            ...state,
            isResettingPassword: true
        })
    })
    it('unsetResettingPassword', () => {
        const state = {
            user: {
                name: 'test',
                email: 'test@test.com'
            },
            isAuthed: true,
            isAuthFailed: false,
            isResettingPassword: true
        }
        expect(reducer(state, unsetResettingPassword)).toEqual({
            ...state,
            isResettingPassword: false
        })
    })
})