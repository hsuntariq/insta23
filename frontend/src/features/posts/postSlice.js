import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



const initialState = {
    posts: [],
    postLoading: false,
    postError: false,
    postSuccess: false,
    postMessage: '',
    commentLoading: false,
    commentError: false,
    commentSuccess: false,
    commentMessage: '',
    likeLoading: false,
    likeError: false,
    likeSuccess: false,
    likeMessage: '',
    myPosts: []
}



export const addDaak = createAsyncThunk( 'add-daak', async ( postData, thunkAPI ) => {
    try {
        const response = await axios.post( `http://localhost:5174/api/posts/add-post/${postData.user_id}`, postData )
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data.error )
    }
} )


export const getDaak = createAsyncThunk( 'get-daaks', async ( _, thunkAPI ) => {
    try {
        const response = await axios.get( 'http://localhost:5174/api/posts/get-post' )
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data.error )
    }
} )


export const addCommentData = createAsyncThunk( 'add-comment', async ( commentData, thunkAPI ) => {
    try {
        const response = await axios.post( `http://localhost:5174/api/posts/add-comment/${commentData.post_id}/${commentData.user_id}`, commentData )
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data )
    }
} )

export const addLikes = createAsyncThunk( 'add-likes', async ( likesData, thunkAPI ) => {
    try {
        const response = await axios.post( `http://localhost:5174/api/posts/add-likes/${likesData?.post_id}/${likesData?.user_id}` )
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data )
    }
} )
export const getRelaventPosts = createAsyncThunk( 'get-posts', async ( user_id, thunkAPI ) => {
    try {
        const response = await axios.get( `http://localhost:5174/api/posts/get-my-posts/${user_id}` )
        return response.data
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response.data )
    }
} )



export const postSlice = createSlice( {
    name: 'daak',
    initialState,
    reducers: {

    },
    extraReducers: ( builder ) => {
        builder
            .addCase( addDaak.pending, ( state, action ) => {
                state.postLoading = true
            } )
            .addCase( addDaak.rejected, ( state, action ) => {
                state.postLoading = false
                state.postError = true
                state.postMessage = action.payload
            } )
            .addCase( addDaak.fulfilled, ( state, action ) => {
                state.postLoading = false
                state.postSuccess = true
                state.posts.shift( action.payload )
            } )
            .addCase( getDaak.pending, ( state, action ) => {
                state.postLoading = true
            } )
            .addCase( getDaak.rejected, ( state, action ) => {
                state.postError = true
                state.postMessage = action.payload
                state.postLoading = false
                state.posts = []
            } )
            .addCase( getDaak.fulfilled, ( state, action ) => {
                state.postSuccess = true
                state.postLoading = false
                state.posts = action.payload
            } )
            .addCase( addCommentData.pending, ( state, action ) => {
                state.commentLoading = true
            } )
            .addCase( addCommentData.rejected, ( state, action ) => {
                state.commentLoading = false
                state.commentError = true
                state.commentMessage = action.payload
            } )
            .addCase( addCommentData.fulfilled, ( state, action ) => {
                state.commentLoading = false
                state.commentSuccess = true

                state.posts = state.posts.map( ( item, index ) => {
                    if ( item._id == action.payload._id ) {
                        item.comments = action.payload.comments
                    }

                    return item
                } )
            } )
            .addCase( addLikes.pending, ( state, action ) => {
                state.likeLoading = true
            } )
            .addCase( addLikes.rejected, ( state, action ) => {
                state.likeLoading = false
                state.likeError = true
                state.likeMessage = action.payload
            } )
            .addCase( addLikes.fulfilled, ( state, action ) => {
                state.likeLoading = false
                state.likeSuccess = true

                state.posts = state.posts.map( ( item, index ) => {
                    if ( item._id == action.payload._id ) {
                        item.likes = action.payload.likes
                    }
                    return item
                } )
            } )

            .addCase( getRelaventPosts.pending, ( state, action ) => {
                state.postLoading = true
            } )
            .addCase( getRelaventPosts.rejected, ( state, action ) => {
                state.postLoading = false
                state.postError = true
                state.postMessage = action.payload
            } )
            .addCase( getRelaventPosts.fulfilled, ( state, action ) => {
                state.postLoading = false
                state.postSuccess = true
                state.myPosts = action.payload
            } )
    }
} )


export default postSlice.reducer