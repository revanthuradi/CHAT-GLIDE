import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

const SearchUserCard = ({ userName, profilePic, _id, closeSearch }) => {
    const onlineUsers = useSelector(state => state.user.onlineUser)
    const isOnline = onlineUsers.includes(_id)
    return (
        <Link to={'/' + _id} onClick={closeSearch} className='flex w-full gap-3 py-4 items-center  px-3 dark:hover:bg-[#212121] hover:bg-[#bfbfbf80]  '>
            <div className='w-[40px] h-[40px]  relative '>
                {
                    isOnline && <div className='w-2 h-2 bg-green-500 absolute bottom-0 right-0 rounded-full'>

                    </div>
                }
                <div className='w-10 h-10 overflow-hidden rounded-full'>

                    <img src={profilePic} alt="" className='' /></div>
            </div>
            <div>
                <h2 className='text-white dark:text-white lg:text-black line-clamp-1'>{userName}</h2>
            </div>

        </Link>
    )
}

export default SearchUserCard
