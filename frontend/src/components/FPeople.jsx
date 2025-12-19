import React from 'react'

const Fpeoples = () => {
    return (
        <>
            <div className="flex justify-between  items-center">
                <div className="flex p-2 gap-2 items-center">
                    <img className='w-[35px] h-[35px] cursor-pointer'
                        src="https://cdn-icons-png.freepik.com/256/10796/10796945.png?semt=ais_white_label" alt="" />
                    <div className="">
                        <div className="flex gap-2 items-center justify-center">
                            <h4 className='font-semibold  text-[14px] cursor-pointer'>Username</h4>

                        </div>
                        <p className='text-sm'>User ID</p>
                    </div>
                </div>
                <button className="p-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-md duration-100 cursor-pointer">Follow</button>
            </div>
        </>
    )
}

export default Fpeoples