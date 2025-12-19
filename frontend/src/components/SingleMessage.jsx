import React from 'react'
import { useSelector } from 'react-redux'

const SingleMessage = ( { message, sender_id, receiver_id } ) => {
    const { user } = useSelector( ( state ) => state.auth )
    return (
        <>

            {user?._id == sender_id ? (
                <>
                    <div className="px-3 ms-auto text-white my-2 rounded-[20px] py-2 max-w-1/3 w-max break-all bg-blue-400">
                        {message}
                    </div>
                </>
            )
                :
                (
                    <>
                        <div className="px-3 me-auto text-white my-2 rounded-[20px] py-2 max-w-1/3 w-max break-all bg-gray-400">
                            {message}
                        </div>
                    </>
                )
            }

        </>
    )
}

export default SingleMessage