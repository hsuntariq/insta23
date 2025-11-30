import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


let checkUser = JSON.parse( localStorage.getItem( 'user' ) )


const initialState = {
    user: checkUser ? checkUser : null,
    userLoading: false,
    userSuccess: false,
    userError: false,
    userMessage: '',
}



export const regUser = createAsyncThunk( 'user', async ( userData, thunkAPI ) => {
    try {
        const response = await axios.post( 'http://localhost:5174/api/users/register', userData )
        localStorage.setItem( 'user', JSON.stringify( response.data ) )
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data )
    }
} )


export const userSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        userReset: ( state ) => {
            state.userError = false
            state.userMessage = ''
            state.userSuccess = false
            state.userLoading = false
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( regUser.pending, ( state, action ) => {
                state.userLoading = true
            } )
            .addCase( regUser.rejected, ( state, action ) => {
                state.userLoading = false
                state.userError = true
                state.userMessage = action.payload
                state.user = null
            } )
            .addCase( regUser.fulfilled, ( state, action ) => {
                state.userLoading = false
                state.userSuccess = true
                state.user = action.payload
            } )
    }
} )


export default userSlice.reducer
export const { userReset } = userSlice.actions