import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate ,Link} from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import toast from 'react-hot-toast';
import { setUser, setToken } from '../features/user.js'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton } from "@mui/material";
const Login = () => {

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      navigate('/')
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { userName: e.target[0].value, password: e.target[1].value };
    try {
      setIsLoading(true)
      const res = await axios.post(`https://chat-glide-api.vercel.app/app/auth/login`, user)
      console.log(res)
      toast.success(res.data.message)
      navigate('/')
      dispatch(setUser(res.data.user))
      dispatch(setToken(res.data.token))
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      toast.error(err?.response?.data?.message, {
        position: "top-center"
      })
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          ChatGlide!
        </h2>
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              <div className="absolute top-0 right-0">

                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffOutlinedIcon fontSize={"small"} /> : <VisibilityOutlinedIcon />}
                </IconButton>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4 text-indigo-600 text-lg">
          <Link to='/signup' >Don't have an account?</Link>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Login;
