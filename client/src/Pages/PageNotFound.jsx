import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <section className=" h-[100vh] flex justify-center items-center md:bg-red-500 sm:bg-green-400">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-indigo-600 dark:text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-black md:text-4xl ">Something's missing.</p>
            <p className="mb-4 text-lg font-light text-black">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <span onClick={()=>navigate('/')} href="#" className="inline-flex cursor-pointer text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</span>
        </div>   
    </div>
</section>
  )
}

export default PageNotFound
