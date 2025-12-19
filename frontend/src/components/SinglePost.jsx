import React, { useState } from 'react'
import { FaDotCircle, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa'
import { GoDotFill } from "react-icons/go";
import { BsSend, BsThreeDots } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import Skeleton from 'react-loading-skeleton'
import moment from 'moment'
import PostSkeleton from './PostSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentData, addLikes } from '../features/posts/postSlice';
import { CircularProgress } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import CommentPreview from './CommentPreview';
import { Link } from 'react-router-dom';
const SinglePost = ( { caption, image, filter, createdAt, user_id, _id, comments, likes } ) => {
    const [showCommentPreview, setShowCommentPreview] = useState( false )
    const { postLoading, commentLoading, commentSuccess, commentError, commentMessage } = useSelector( ( state ) => state.daak )
    const [comment, setComment] = useState( '' )
    const [liked, setLiked] = useState( false )
    const dispatch = useDispatch()

    const handleComment = () => {
        const commentData = {
            post_id: _id,
            user_id: user_id._id,
            comment,
            userName: user_id.username
        }

        dispatch( addCommentData( commentData ) )
        toast.success( 'Comment added!' )
        setComment( '' )
    }

    const handleLike = () => {
        const likeData = {
            post_id: _id,
            user_id: user_id._id
        }

        dispatch( addLikes( likeData ) )
        setLiked( true )
        setTimeout( () => {
            setLiked( false )
        }, 800 );
    }



    return (
        <>

            {showCommentPreview && <CommentPreview image={image} user={user_id} comments={comments} setShowCommentPreview={setShowCommentPreview} caption={caption} />}




            <div className="flex flex-col xl:w-[65%] lg:w-[80%] md:w-[100%] sm:w-[80%] w-[90%] shadow mx-auto m-10 
             ">

                <div className="flex justify-between w-full items-center ">
                    <div className="flex items-center gap-2 p-2">
                        <div className="flex items-center gap-3">
                            {user_id.image ? <img src={user_id.image} className='w-10 h-10 rounded-full' alt="" /> : <img className='w-10 h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="" />}

                            <Link to={`/profile-page/${user_id?._id}`} className="font-semibold">
                                {user_id?.username}
                            </Link>
                        </div>
                        <GoDotFill className='w-[10px] text-gray-400' />
                        <p className="text-gray-400 text-sm">
                            {moment( createdAt ).startOf( 'second' ).fromNow()}
                        </p>
                    </div>
                    <BsThreeDots />
                </div>
                <div className='relative'>
                    <img src={image} className='w-full h-[500px] object-cover' alt="" />
                    <svg
                        className={`heart ${liked ? "liked" : ""}`}
                        viewBox="0 0 24 24"
                        fill="url(#heartGradient)"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" />  {/* purple */}
                                <stop offset="100%" stopColor="#ef4444" /> {/* red */}
                            </linearGradient>
                        </defs>

                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
           5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 
           2.09C13.09 3.81 14.76 3 16.5 3 
           19.58 3 22 5.42 22 8.5c0 
           3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>

                </div>

                <div className="p-4">
                    <div className="flex mb-3 justify-between w-full items-center">
                        <div className="flex text-2xl gap-3">
                            <span className="heart-anim">
                                {likes.includes( user_id._id ) ? (
                                    <FaHeart className="cursor-pointer" color="purple" onClick={handleLike} />
                                ) : (
                                    <FaRegHeart className="cursor-pointer" onClick={handleLike} />
                                )}
                            </span>

                            <FaRegComment onClick={() => setShowCommentPreview( true )} className='cursor-pointer' />
                            <LuSend />

                        </div>
                        <div className="text-2xl">
                            <FaRegBookmark />
                        </div>
                    </div>

                    <h3 className="text-sm text-start  font-semibold">
                        {likes.length} Likes
                    </h3>
                    <p className='text-sm text-gray-600 pt-2 '><span className="font-semibold me-2 text-black">
                        {user_id?.username}
                    </span>
                        {caption}</p>

                    <p className="text-[0.8rem] text-gray-400 my-1 cursor-pointer">
                        {
                            comments?.length > 1 ? `View All ${comments?.length} comments` : comments.length == 1 ? 'View comment' : 'Koi comment nahi'
                        }
                    </p>
                    <div className="flex justify-between items-center">

                        <input value={comment} onChange={( e ) => setComment( e.target.value )} type="text" placeholder='Add a comment...' className='w-full placeholder:text-gray-500 placeholder:text-sm outline-0 text-sm' />
                        {commentLoading ? <CircularProgress
                            height="15"
                            width="15"
                            color="purple"
                            ariaLabel="circular-progress-loading"
                            wrapperStyle={{}}
                            wrapperClass="wrapper-class"
                            visible={true}
                            strokeWidth={2}
                            animationDuration={1}
                        /> : <BsSend onClick={handleComment} className='cursor-pointer' />}

                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePost