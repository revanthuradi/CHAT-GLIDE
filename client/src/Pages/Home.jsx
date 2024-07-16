import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader"
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import io from 'socket.io-client'
import { setOnlineUser, setSocketConnection } from "../features/user";
import { useNavigate } from "react-router-dom";
import StartConversation from "../components/StartConversation";
const Home = () => {
  const navigate = useNavigate()
  const darkMode = useSelector(state => state.darkMode)
  const dispatch = useDispatch()
  const location = useLocation()
  const basePath = location.pathname === "/"
  useEffect(() => {
    const socketConnection = io(`https://chat-glide-git-main-revanth-uradis-projects.vercel.app/app`, {
      auth: {
        token: localStorage.getItem("token")
      }
    })
    dispatch(setSocketConnection(socketConnection))
    socketConnection.on('onlineUser', (data) => {
      dispatch(setOnlineUser(data))
    })
    return () => {
      socketConnection.disconnect()
    }
  }, [])
  useEffect(() => {
    if (!localStorage.getItem('userData')) {
      navigate('/login')
    }
  })

  useEffect(() => {
    if (darkMode === 'light') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])



  return (
    <div className=" grid lg:grid-cols-[370px,1fr]   h-screen max-h-screen relative">
      <section className={`${!basePath && "hidden"} lg:block `} >
        <Sidebar />
      </section>
      <section className={`${basePath && "hidden"} `}>
        <Outlet />
      </section>
      <section className={`${basePath && "hidden lg:flex"} hidden    justify-center items-center`}>
       <StartConversation/>
      </section>
    </div>
  );
};

export default Home;