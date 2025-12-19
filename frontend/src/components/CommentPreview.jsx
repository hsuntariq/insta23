import moment from 'moment'
import React from 'react'
import { BsChat, BsThreeDots } from 'react-icons/bs'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'

const CommentPreview = ( { user, comments, setShowCommentPreview, caption, image } ) => {
    const { user: myUser } = useSelector( ( state ) => state.auth )
    return (
        <div className='min-h-screen w-full left-0 flex justify-center items-center fixed top-0 bg-black/50 z-[100]'>
            <IoClose onClick={() => setShowCommentPreview( false )} className='fixed right-5 top-5 text-white text-2xl' />
            <div className="flex h-[90vh] w-2/3">
                {/* post */}
                <div className="h-[100%] w-1/2 bg-black">
                    <img
                        className="w-full h-full object-cover"
                        src={image}
                        alt=""
                    />
                </div>
                {/* comment section */}
                {/* main user section */}
                <div className=" w-1/2 bg-white p-2">

                    <div className="flex sticky top-0 border border-gray-300 border-t-0 border-e-0 border-s-0 justify-between w-full items-center ">
                        <div className="flex items-center gap-2 p-2">
                            <div className="flex items-center gap-3">
                                <img className='w-10 h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="" />

                                <h5 className="font-semibold text-sm">
                                    {user?.username}
                                </h5>
                            </div>
                            <GoDotFill className='w-[10px] text-gray-400' />
                            <h5 className="text-sm text-blue-500 font-bold">
                                Follow
                            </h5>
                            <p className="text-gray-400 text-sm">
                            </p>
                        </div>
                        <BsThreeDots />
                    </div>
                    <div className="p-2 h-full">

                        <div className="flex gap-2">
                            <div className="flex items-start gap-2 ">
                                {caption &&
                                    <div className="flex items-start gap-3">
                                        <img className='w-10 h-10 rounded-full' src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="" />
                                        <div className="">

                                            <h5 className="font-semibold text-sm">
                                                {user?.username}
                                            </h5>

                                            <p className="text-gray-500 text-sm">
                                                {caption}
                                            </p>
                                        </div>

                                    </div>}

                            </div>

                        </div>

                        {/* comments list */}


                        {comments.length > 0 ? (
                            <>
                                {comments?.map( ( item, index ) => {
                                    return <div className="flex items-center my-2 justify-between">
                                        <div className="flex gap-2">
                                            <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" className='w-[40px] h-[40px] rounded-full border border-gray-200' alt="" />
                                            <div className="">
                                                <h6 className="text-sm font-semibold">
                                                    {item?.userName} <span className='text-sm text-gray-500 font-[400]'>{item?.comment}</span>
                                                </h6>
                                                <div className="flex gap-2">
                                                    <p className="text-[0.7rem] text-gray-600">
                                                        {moment( item.timestamp ).fromNow()}
                                                    </p>
                                                    <p className="text-[0.7rem] text-gray-600">Likes</p>
                                                    <p className="text-[0.7rem] text-gray-600">Answer</p>
                                                </div>
                                            </div>
                                        </div>
                                        <FaRegHeart className='text-[0.6rem]' />
                                    </div>
                                } )}
                            </>
                        ) : (

                            <div className="flex flex-col h-[80%] text-gray-800 justify-center items-center">
                                <BsChat className='text-9xl' />
                                <h2 className="text-3xl font-bold">
                                    No Comment
                                </h2>
                            </div>

                        )}






                    </div>




                </div>

                {/* comments list */}
            </div>
        </div>
    )
}

export default CommentPreview