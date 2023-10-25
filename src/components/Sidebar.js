import React, { useContext } from "react";
import { user } from "../App";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const profile = useContext(user);
  const Navigate = useNavigate();
  return (
    <h1
      hidden
      id="udetail"
      className="w-full text-white z-40 absolute h-screen sticky top-11 lpage pt-5 bg-[#121212]"
    >
      <div className=" flex text-lg justify-start text-start flex-col">
        <div
          onClick={() => {
            Navigate("/");
            document.getElementById("udetail").hidden =
              !document.getElementById("udetail").hidden;
          }}
          className="w-full hover:bg-black mt-5"
        >
          <hr />
          <h3 className="m-5 text-xl">Home</h3>
          <hr />
        </div>
        <div
          onClick={() => {
            Navigate("/addmovie");
            document.getElementById("udetail").hidden =
              !document.getElementById("udetail").hidden;
          }}
          className="w-full hover:bg-black mt-5"
        >
          <h3 className="m-5 text-xl">Add New Movie</h3>
          <hr />
        </div>
        <div
          onClick={() => {
            Navigate("/user/wishlist");
            document.getElementById("udetail").hidden =
              !document.getElementById("udetail").hidden;
          }}
          className="w-full hover:bg-black mt-5"
        >
          <h3 className="m-5 text-xl">WishList</h3>
          <hr />
        </div>
        <div
          onClick={() => {
            profile.SetProfile({
              userName: "",
              mobile: "",
              password: "",
              userid: "",
            });
            document.getElementById("udetail").hidden =
              !document.getElementById("udetail").hidden;
          }}
          className="w-full hover:bg-black mt-5"
        >
          <h3 className="m-5 text-xl">Log out</h3>
          <hr />
        </div>
      </div>
    </h1>
  );
};

export default Sidebar;
