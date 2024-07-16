import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schema";
import uploadFile from '../Hooks/uploadFile.js'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import toast from "react-hot-toast";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser, setToken } from '../features/user.js'

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  };
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          setIsLoading(true)

          const res = await axios.post(`https://chat-glide-api.vercel.app/auth/signup`, {
            ...values,
            profilePic: profilePic
          })

          action.resetForm();
          setIsLoading(false)
          toast.success(res?.data?.message)
          dispatch(setUser(res.data.user))
          dispatch(setToken(res.data.token))
          navigate("/")

        } catch (error) {
          setIsLoading(false)
          toast.error(error?.response?.data?.message, {
            position: "top-right"
          })
          console.log(error)
        }
      },
    });

  const handlePhotoChange = async (e) => {
    setIsLoading(true)
    const res = await uploadFile(e.target.files[0])
    setIsLoading(false)
    console.log(res?.url)
    setProfilePic(res.url)
  }

  return (
    <div className=" dark:text-white  min-h-full flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-wide text-gray-900">Welcome to ChatGlide!</h2>
        <h2 className="mt- text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="UserName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="off"
                required
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              {touched.userName && errors.userName && (
                <p className="text-red-400">{errors.userName}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              {touched.email && errors.email && (
                <p className="text-red-400">{errors.email}</p>
              )}
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
            </div>
            <div className="mt-2 relative">
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}

                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              {touched.password && errors.password && (
                <p className="text-red-400">{errors.password}</p>
              )}
              <div className="absolute top-0 right-0">

                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffOutlinedIcon fontSize={"small"} /> : <VisibilityOutlinedIcon fontSize={"small"} />}
                </IconButton>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="profilePic"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload profile pic
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={handlePhotoChange}
                id="profilePic"
                name="profilePic"
                type="file"
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></input>

            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={profilePic ? false : true}
              className={`flex w-full justify-center rounded-md ${profilePic ? "bg-indigo-600" : "bg-indigo-200"}  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4 text-indigo-600">
          <Link to='/login' >Already have an account?</Link>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Signup;
