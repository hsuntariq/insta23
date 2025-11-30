import React from 'react'
import { sidebarData } from '../data/sidebarData'

const SmallBottomBar = () => {
    return (
        <>
            <ul className="flex md:hidden flex-row   fixed bottom-0 bg-white w-full justify-center  border-t-1 border-gray-200 select-none">
                {
                    sidebarData.map( ( item, index ) => {
                        return <li key={item.id} className="flex justify-center xl:justify-start items-center text-xl gap-4 p-4 hover:bg-gray-100 rounded-lg cursor-pointer active:scale-98">
                            {item.icon} <span className='hidden xl:block'>{item.title}</span>
                        </li>
                    } )
                }
            </ul>
        </>
    )
}

export default SmallBottomBar