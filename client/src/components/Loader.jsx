import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
const Loader = ({message}) => {
  return (
    <div className='fixed inset-0 bg-red-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <CircularProgress />
      <h2>{message}</h2>
    </div>
  )
}

export default Loader
