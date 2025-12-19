import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import SinglePost from '../components/SinglePost'
import SmallBottomBar from '../components/SmallBottomBar'
import PostModal from '../components/PostModal'
import { useDispatch, useSelector } from 'react-redux'
import { getDaak } from '../features/posts/postSlice'
import PostSkeleton from '../components/PostSkeleton'
import CommentPreview from '../components/CommentPreview'
import Suggestions from '../components/Suggestions'

const Home = () => {
    const [showModal, setShowModal] = useState( false )
    const [allSuggestions, setAllSuggestions] = useState( false );
    const dispatch = useDispatch()



    // get the data from global store

    const { posts, postLoading, postError, postSuccess, postMessage } = useSelector( ( state ) => state.daak )


    useEffect( () => {
        dispatch( getDaak() )
    }, [] )

    {/* skeleton loader */ }

    if ( postLoading ) {
        return [...Array( 5 )].map( ( _, index ) => {
            return <PostSkeleton key={index} />
        } )
    }


    return (
        <>

            <PostModal showModal={showModal} setShowModal={setShowModal} />
            <SmallBottomBar />
            <div className="grid grid-cols-4 gap-4">
                {/* Sidebar - visible on md and larger screens */}
                <div className="hidden md:block col-span-1">
                    <Sidebar showModal={showModal} setShowModal={setShowModal} />
                </div>

                {/* Main content - takes full width on mobile, center 2 columns on larger screens */}
                <div className="col-span-4 md:col-span-2">
                    {posts?.map( ( item, index ) => {
                        return <SinglePost {...item} key={item._id} />
                    } )}
                </div>

                {/* Right section - visible on large screens */}
                <div className="hidden lg:block col-span-1">
                    {/* Reserved for future widgets or suggestions */}
                    <Suggestions
                        allSuggestions={allSuggestions}
                        setAllSuggestion={setAllSuggestions}
                    />
                </div>
            </div>
        </>
    )
}

export default Home
