import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../App";
const HeaderComponents = () => {
  const Navigate = useNavigate();
  const profile = useContext(user);
  return (
    <div className="justify-center flex w-full">
      <div className="w-full text-white flex text-lg  flex-row justify-end text-center items-center">
        {/* <div className="m-3">
          <button
            onClick={() => {
              Navigate("/");
            }}
            className="underlineAnimation"
          >
            Home
          </button>
        </div> */}
        <div className="m-3">
          <button
            onClick={() => {
              Navigate("/addmovie");
            }}
            className="underlineAnimation"
          >
            Add New
          </button>
        </div>
        <div className="m-3">
          <button
            onClick={() => {
              Navigate("/user/wishlist");
            }}
            className="underlineAnimation"
          >
            WishList
          </button>
        </div>
        <div className="m-3">
          <button
            onClick={() => {
              profile.SetProfile({
                userName: "",
                mobile: "",
                password: "",
                userid: "",
              });
            }}
            className="underlineAnimation"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponents;
