import {userSlice} from "./user";

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
})