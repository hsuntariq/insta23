import React from 'react'
import { sidebarData } from '../data/sidebarData'
import SmallBottomBar from './SmallBottomBar'
import { Link } from 'react-router-dom'

const Sidebar = ( { showModal, setShowModal } ) => {

    return (
        <>
            <div className="min-h-screen border-t-0 border-s-0 border-b-0  w-max xl:w-[60%]  border border-e border-gray-200 ">
                <img src="/images/logo2.webp" className='w-20 hidden md:block h-20' alt="" />
                <ul className="flex md:flex-col flex-row md:relative fixed bottom-0 bg-white w-full justify-center md:border-t-0 border-t-1 border-gray-200 select-none">
                    {
                        sidebarData.map( ( item, index ) => {
                            return <Link to={item.link} onClick={index == 6 ? () => setShowModal( true ) : ''} key={item.id} className="flex  justify-center xl:justify-start items-center  gap-4 p-4 hover:bg-gray-100 rounded-lg cursor-pointer active:scale-98">
                                {item.icon} <span className='hidden xl:block'>{item.title}</span>
                            </Link>
                        } )
                    }
                </ul>

            </div>

        </>
    )
}

export default Sidebar