import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null,
    },
    reducers: {
        setUser: (state, actions) => {
            state.value = actions.payload
        },
        clearUser: state => {
            state.value = null
        }
    }
})

export default userSlice.reducer

export const {setUser, clearUser} = userSlice.actions