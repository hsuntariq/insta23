import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    messageLoading: false,
    messageSuccess: false,
    messageError: false,
    errorMessage: '',
    messages: []
}




export const sendMessageData = createAsyncThunk( 'send-message', async ( messageData, thunkAPI ) => {
    try {
        const response = await axios.post( `http://localhost:5174/api/messages/send-message/${messageData?.sender_id}/${messageData?.receiver_id}`, messageData );
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data )
    }
} )
export const getMessageData = createAsyncThunk( 'get-messages', async ( messageData, thunkAPI ) => {
    try {
        const response = await axios.get( `http://localhost:5174/api/messages/get-messages/${messageData?.sender_id}/${messageData?.receiver_id}` );
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data )
    }
} )



export const messageSlice = createSlice( {
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            .addCase( sendMessageData.pending, ( state, action ) => {
                state.messageLoading = true
            } )
            .addCase( sendMessageData.rejected, ( state, action ) => {
                state.messageLoading = false
                state.messageError = true
                state.errorMessage = action.payload
            } )
            .addCase( sendMessageData.fulfilled, ( state, action ) => {
                state.messageLoading = false
                state.messageSuccess = true
                state.messages = action.payload.chats
            } )
            .addCase( getMessageData.pending, ( state, action ) => {
                state.messageLoading = true
            } )
            .addCase( getMessageData.rejected, ( state, action ) => {
                state.messageLoading = false
                state.messageError = true
                state.errorMessage = action.payload
            } )
            .addCase( getMessageData.fulfilled, ( state, action ) => {
                state.messageLoading = false
                state.messageSuccess = true
                state.messages = action.payload.chats
            } )

    }
} )


export default messageSlice.reducer