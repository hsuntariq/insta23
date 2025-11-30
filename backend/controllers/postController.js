import { Post } from "../models/postModal.js"

export const addPost = async ( req, res ) => {
    const { user_id } = req.params
    console.log( user_id )
    if ( !user_id ) {
        res.status( 401 )
        throw new Error( 'ID required' )
    }

    const { image, filter, caption } = req.body
    if ( !image || !filter ) {
        res.status( 400 )
        throw new Error( 'Please upload image/filter' )
    }

    // add to mongodb
    let newPost = await Post.create( {
        caption, filter, image, user_id
    } )

    // respond me with new post

    res.send( newPost )

}


export const getPosts = async ( req, res ) => {
    let allPosts = await Post.find().populate( 'user_id', 'username image _id' ).sort( { createdAt: -1 } )
    res.send( allPosts )
}


export const addComments = async ( req, res ) => {
    const { user_id, post_id } = req.params
    const { comment } = req.body
    //find the relavent post
    const findPost = await Post.findOne( { _id: post_id } )
    findPost.comments.unshift( {
        comment,
        user_id,
        timestamp: Date.now()
    } );
    await findPost.save();
    res.send( findPost )
}

export const addLikes = async ( req, res ) => {
    const { user_id, post_id } = req.params
    // find the post to Like
    const findPost = await Post.findOne( { _id: post_id } )
    if ( findPost.likes.includes( user_id ) ) {
        findPost.likes.pull( user_id )
    } else {
        findPost.likes.push( user_id )
    }
    await findPost.save()
    res.send( findPost )
}