import { createSlice } from "@reduxjs/toolkit";
import storage from "../services/storage";
import loginService from "../services/login";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action){
            storage.saveUser(action.payload)
            return action.payload
        },
        resetUser(state, action){
            storage.removeUser()
            return null
        }
    }
})

const { setUser, resetUser } = userSlice.actions

export const initializeUser = () => {
    return async dispatch => {
        const user = storage.loadUser()
        if (user) {
            dispatch(setUser(user))
        }
    }
}

export const loginUser = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        dispatch(setUser(user))
        return user
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch(resetUser())
    }
}

export default userSlice.reducer