import React from "react";
import { IoSearchSharp } from "react-icons/io5";
const Searchinput = () => {
  return (
    <form className="flex items-center">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered rounded-full"
      />

      <button
        type="submit"
        className="btn btn-circle bg-sky-500 text-white"
      ><IoSearchSharp className=' w-6 h-6 outline-none'></IoSearchSharp></button>
    </form>
  );
};

export default Searchinput;
