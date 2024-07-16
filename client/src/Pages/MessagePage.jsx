import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import moment from 'moment'
import backGroundIMG from '../assets/bg.jpeg'
const MessagePage = () => {
  const params = useParams()
  const [messageUser, setMessageUser] = useState({})
  const [allMessages, setAllMessages] = useState([])
  const currentMessage = useRef(null)
  const socketConnection = useSelector(state => state.user.socketConnection)
  const mode = useSelector(state => state.darkMode)
  const user = useSelector(state => state?.user)
  const onlineUser = useSelector(state => state?.user.onlineUser)
  const navigate = useNavigate()

  const [message, setMessage] = useState({
    text: '',
    imageUrl: "",
    videoUrl: ''
  })

  const handleMessageChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value
    })

  }

  useEffect(() => {
    if (!localStorage.getItem('userData')) {
      console.log("ajlxbnbnjlax")
      navigate('/login')
    }
  })

  const handleSendMessage = () => {
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {

        socketConnection.emit('new-message', {
          sender: user?.userID,
          receiver: params.userId,
          ...message

        })

        setMessage({
          text: '',
          imageUrl: "",
          videoUrl: ''
        })
      }
    }
  }

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behaviour: "smooth", block: "end" })
    }
  }, [allMessages])

  useEffect(() => {
    if (socketConnection) {
      try {
        socketConnection.emit('message-page', params.userId)

        socketConnection.emit('seen', params.userId)

        socketConnection.on('previous-conversation', (data) => {
          setAllMessages(data)
        })
        socketConnection.on('message-user', (data) => {
          setMessageUser(data)
        })

        socketConnection.on("message", (data) => {
          setAllMessages(data)
        })

      } catch (error) {
        console.log(err.message)
      }
    }
  }, [socketConnection, params?.userId, user, onlineUser])

  return (
    <div className='w-full overflow-x-hidden h-[100vh] dark:bg-darkBg lg:bg-contain bg-cover   ' >
      <div className='h-[55px]  dark:bg-darkBg  bg-secondary lg:bg-white flex items-center  justify-between  border-b dark:border-gray-800 border-darkBg lg:px-3 '>
        <div className='flex items-center gap-2'>
          <div className='lg:hidden'>
            <IconButton onClick={() => navigate('/')}>
              <ArrowBackIosNewIcon className='text-white' />
            </IconButton>
          </div>
          <div className=' gap-2 relative'>
            {
              messageUser.online && <div className='w-2 h-2 bg-green-500 absolute bottom-0 right-0 rounded-full'></div>
            }
            <div className='h-9 w-9 overflow-hidden rounded-full '>

              <img src={messageUser.profilePic} alt="" className='w-9 ' />
            </div>

          </div>
          <div>
            <h2 className='text-white dark:text-white lg:text-black font-semibold'>{messageUser.userName}</h2>
            {
              messageUser.online ? <span className='  dark:text-white lg:text-black'>online</span> : <span className='dark:text-white  lg:text-black text-sm'>offline</span>
            }
          </div>
        </div>

        <div>
          <IconButton>
            <VideoCallIcon className='dark:text-white' />
          </IconButton>
          <IconButton>
            <CallIcon className='dark:text-white' />
          </IconButton>
        </div>
      </div>
      {/* {message} */}
      <div className='h-[calc(100vh-55px)]  py-2 px-2 dark:bg-darkBg  bg-cover bg-opacity-10' style={mode === 'dark' ? { backgroundImage: ` url(${backGroundIMG})` } : {}}>
        <div className='h-[90%] overflow-scroll'>

          {
            allMessages.map(msg => <div ref={currentMessage} className={`mb-3 text-white flex ${params.userId === msg.msgByUserId ? "" : "justify-end"}`}>
              <div className='flex items-center gap-1'>
                {
                  params.userId === msg.msgByUserId && <div className='text-black w-[35px]'>
                    <div className='h-7 w-7 overflow-hidden rounded-full '>

                      <img src={messageUser.profilePic} alt="" className='w-9 ' />
                    </div>
                  </div>
                }
                <div className={`py-1 px-2 rounded-lg w-fit ${params.userId === msg.msgByUserId ? "bg-[#404040]" : "bg-secondary"} lg:max-w-[40vw] max-w-[50vw]  `}>
                  <p className=' break-words'>{msg.text}</p>
                  <p className={`mt-1 text-sm text-white ${params.userId === msg.msgByUserId ? "text-start" : "text-end"}`}>{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              </div>
            </div>)
          }
        </div>

        {/* {send messages} */}

        <div className='h-[10%] w-[100%] flex items-center justify-center'>
          <div className='px-3 flex items-center justify-between h-[80%] lg:w-[80%] w-full  rounded-3xl   bg-white'>
            <div className='w-[90%] flex '>
              <IconButton className=''>
                <ControlPointOutlinedIcon className='  ' />
              </IconButton>
              <div className='w-full'>
                <input onChange={handleMessageChange} value={message.text} name='text' type="text" placeholder='Message...' className='w-full dark:bg-transparent  h-full px-2  text-black  rounded-md focus:outline-none' />
              </div>
            </div>
            <div className='w-[8%]  flex justify-end items-center '>
              <IconButton onClick={handleSendMessage} className=''>
                <div className='bg-secondary rounded-full h-fit w-fit px-3 py-2 flex justify-center items-center'>

                  <SendOutlinedIcon fontSize='' className='text-white bg-secondary   ' />
                </div>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagePage
