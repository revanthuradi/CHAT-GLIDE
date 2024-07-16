import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import MessagePage from '../Pages/MessagePage';
import PageNotFound from '../Pages/PageNotFound';
import { useSelector } from 'react-redux';
// const user = useSelector(state => state.user)
// console.log(user)
const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        {
          path: "",
          element: <Home />,
          children: [{ path: ":userId", element: <MessagePage /> }],
        },
        { path: "/*", element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterComponent;
