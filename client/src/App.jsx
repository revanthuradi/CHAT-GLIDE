import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector(state=>state.user)
  const navigate = useNavigate() 
  // useEffect(()=>{
  //   if(user.token){
  //     navigate('/')
  //   }
  // },[])
  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
