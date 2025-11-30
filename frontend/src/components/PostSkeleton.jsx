import React from 'react'
import Skeleton from 'react-loading-skeleton'

const PostSkeleton = () => {
    return (
        <div className="flex my-6 flex-col xl:w-[65%] lg:w-[80%] md:w-[100%] sm:w-[80%] w-[90%] shadow mx-auto m-10 
                 ">

            <div className="flex justify-between w-full items-center ">
                <div className="flex items-center gap-2 p-2">
                    <div className="flex items-center gap-3">
                        <Skeleton circle height={50} width={50} />
                        <h5 className="font-semibold">
                            <Skeleton width={100} height={10} />
                        </h5>
                    </div>
                    <Skeleton circle height={10} width={10} />
                    <p className="text-gray-400 flex gap-2 text-sm">
                        <Skeleton width={100} height={10} />

                    </p>
                </div>
                <Skeleton width={30} height={10} />
            </div>
            <Skeleton width={'100%'} height={400} />
            <div className="p-4">
                <div className="flex mb-3 justify-between w-full items-center">
                    <div className="flex text-2xl gap-3">
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />

                    </div>
                    <div className="text-2xl">
                        <Skeleton width={20} height={20} />
                    </div>
                </div>

                <h3 className="text-sm text-start  font-semibold">
                    <Skeleton width={50} />
                </h3>
                <p className='text-sm text-gray-600 py-2 '><span className="font-semibold text-black">
                    <Skeleton width={80} />
                </span>
                    <Skeleton /></p>
                <div className="">

                    <Skeleton height={30} width={'100%'} />
                </div>
            </div>
        </div>
    )
}

export default PostSkeleton