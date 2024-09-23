import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  
 
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
