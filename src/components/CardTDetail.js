import React from "react";
import ReactStars from "react-stars";
const CardTDetail = (h) => {
  return (
    <div id="kk" className="opacity-100">
      <div
        onMouseEnter={() => {
          document.getElementById("thidden").hidden = false;
          document.getElementById("kk").style.opacity = "0.8";
        }}
        onMouseLeave={() => {
          document.getElementById("thidden").hidden = true;
          document.getElementById("kk").style.opacity = "1";
        }}
        className="w-full flex flex-row justify-center items-center"
      >
        <img
          className=" h-80 w-1/2  md:max-w-4/5 pt-5 m-5"
          src={h.h.img}
          alt="img not found"
        />
        <div className="pl-3  flex flex-col items-start h-96 w-1/2">
          <div className="mt-11 w-full flex flex-col h-full justify-start">
            <h1 className="text-4xl">
              {h.h.title} <span className="text-2xl">({h.h.year})</span>
            </h1>
            <ReactStars
              className="w-full"
              value={h.h.rating}
              half={true}
              edit={false}
              size={25}
            />
            <h4 className="w-full mt-5 h-[30%] overflow-scroll ">{h.h.description}</h4>
          </div>
          {/* <h4
            hidden
            id="thidden"
            className="w-full text-center md:mt-10 text-xl h-11"
          >
            Tap To More Info
          </h4> */}
        </div>
      </div>
    </div>
  );
};

export default CardTDetail;
