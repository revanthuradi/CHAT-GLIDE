import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import SearchUserCard from "./SearchUserCard";
import CloseIcon from '@mui/icons-material/Close';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useDispatch, useSelector } from "react-redux";

const SearchUser = ({ closeSearch }) => {
  const id = useSelector(state => state.user.userID)
  console.log()
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch()
  const handleSearch = async () => {
    try {

      if (search !== "") {
        const token = localStorage.getItem('token')
        const url = `https://chat-glide-api.vercel.app/api/find-user?search=${search}&id=${id}`
        const res = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setUsers(res.data.users)
      } else {
        setUsers([])
      }
    } catch (err) {

    }
  }
  useEffect(() => {
    handleSearch()
  }, [search])

  return (
    <div className="fixed z-40 h-full bg-black bg-opacity-30 backdrop-blur-sm   inset-0 top-0 lg:flex lg:justify-center ">
      <div className="flex justify-end absolute right-5 top-3" >
        <IconButton className="w-12 " onClick={closeSearch}>
          <CloseIcon className="text-white" />
        </IconButton>
      </div>

      <div className="relative  w-full lg:w-[500px] lg:h-full  h-[90vh]  mt-16 lg:mt-11  lg:px-3 lg:py-8   flex flex-col items-center ">
        <div className="w-full dark:lg:bg-darkBg dark:lg:border  flex justify-center lg:bg-white ">

          <input
            placeholder="Search user"
            id="search"
            name="search"
            type="text"
            autoComplete="off"
            required
            className="block dark:text-white dark:lg:bg-darkBg w-[80vw] lg:w-full  rounded-md px-2 py-3 text-gray-900 shadow-sm   placeholder:text-gray-400 focus:outline-0 sm:text-sm sm:leading-6 lg:text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        <div className="w-full lg:h-[65vh]  dark:lg:bg-darkBg dark:lg:border  mt-4 overflow-y-scroll lg:bg-white text-black dark:text-white ">
          {
            users.length !== 0 ? users.map(user => <SearchUserCard userName={user.userName} profilePic={user.profilePic} _id={user._id} closeSearch={closeSearch} />) : (<div className=" text-center py-3 mt-7 flex justify-center items-center gap-2 text-gray-500"> <h2 className="text-lg">NO USER FOUND</h2> <SentimentVeryDissatisfiedIcon /> </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
