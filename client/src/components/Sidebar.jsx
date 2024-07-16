import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useSelector, useDispatch } from 'react-redux';
import SearchUser from './SearchUser';
import { logOut } from '../features/user.js'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../features/themeSlice.js'
import toast from 'react-hot-toast';

const Sidebar = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const darkMode = useSelector(state => state.darkMode)
  const socketConnection = useSelector(state => state.user.socketConnection)
  const dispatch = useDispatch()
  const [showSearch, setShowSearch] = useState(false)
  const [chats, setChats] = useState([])

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('sidebar', user.userID)

      socketConnection.on('sidebar-chat', (data) => {

        const conversationUserData = data.map((conversationUser, index) => {
          if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender
            }
          }
          else if (conversationUser?.receiver?._id !== user?.userID) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver
            }
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender
            }
          }
        })
        console.log('conversationUserData', conversationUserData)
        setChats(conversationUserData)
      })

    }

  }, [socketConnection, user])

  const handleLogout = () => {
    dispatch(logOut())
    toast.success('Logout successfull')
    navigate('/login')
  }

  return (
    <div className=' h-screen overflow-hidden grid lg:grid-cols-[55px,1fr] grid-cols-[55px,1fr] dark:bg-darkBg dark:text-white divide-x divide-x-reverse divide-gray-700 '>
      <div className='dark: bg-primary  px-3 py-4 h-full flex flex-col items-center justify-between '>
        <div>
          <IconButton title='chats'>
            <ChatBubbleOutlineOutlinedIcon fontSize='medium' className='text-white' onClick={() => navigate('/')} />
          </IconButton>
          <IconButton title='add friend' onClick={() => setShowSearch(true)}>
            <PersonAddAltOutlinedIcon className='text-white' />
          </IconButton>
        </div>
        <div className='flex flex-col gap-3 items-center py-2'>
          <div className='rounded-full w-7' title={user.userName}>
            <img src={user.profilePic} alt="" className='rounded-full   ' />
          </div>
          <IconButton title='night mode' onClick={() => dispatch(toggleTheme())}>
            {
              darkMode === "dark" ?
                <NightlightOutlinedIcon className='text-white' /> :
                <LightModeOutlinedIcon className='text-white' />
            }
          </IconButton>
          <IconButton title='logout' onClick={handleLogout} >
            <LogoutOutlinedIcon className='text-white' />
          </IconButton>
        </div>
      </div>
      <div className=''>
        <div className='h-10 m-auto   flex items-center py-[27px] px-2 '>
          <h1 className='font-semibold text-xl tracking-wide '>Chats</h1>
        </div>

        <div className=' h-[calc(100vh-40px)] overflow-x-hidden  '>
          {
            chats.map(chat => <div onClick={() => navigate(`/${chat.userDetails._id}`)} className='flex items-center justify-between gap-3 px-3 py-3 hover:cursor-pointer dark:hover:bg-[#212121] hover:bg-[#bfbfbf80]  '>
              <div className='flex gap-3'>
                <div className='lg:w-[40%] flex items-center'>
                  <div className='w-10 bg-red-300 h-10 overflow-hidden flex items-center justify-center rounded-full bg-cover bg-center' style={{ backgroundImage: ` url(${chat.userDetails.profilePic})` }}></div>
                </div>
                <div className=''>
                  <p className='font-semibold '>{chat.userDetails.userName}</p>
                  <p className=' line-clamp-1 text-sm '>{chat.lastMsg?.text}</p>
                </div>
              </div>
              <div className={`${chat.unseenMsg > 0 ? 'text-green-500' : 'text-white'} flex flex-col items-center`}>
                <div >
                  <p className='dark:text-gray-400 text-gray-700'>{moment(chat.lastMsg?.updatedAt).format('hh:mm')}</p>
                </div>
                <div>
                  {

                    chat.unseenMsg > 0 && <p className='text-white text-xs bg-green-600 w-5 text-center px-1 py-1 rounded-full'>{chat.unseenMsg}</p>
                  }
                </div>
              </div>
            </div>
            )
          }
        </div>

        {
          showSearch && <SearchUser closeSearch={() => setShowSearch(false)} />
        }
      </div>
    </div>
  )
}

export default Sidebar
