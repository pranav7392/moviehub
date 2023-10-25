import React, { useContext, useState, useEffect } from "react";
import { user } from "../App";
import CardTDetail from "./CardTDetail";
import { Link, useNavigate } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import { Wishlistdata, db } from "../firebase/Firebase";
import swal from "sweetalert";
import { getDocs, getDoc, doc, query, where } from "firebase/firestore";

const Wishlist = () => {
  const [simg, setsimg] = useState({});
  const [data, Setdata] = useState([]);
  const [tedata, Settedata] = useState([]);
  const [load, SetLoad] = useState(false);
  const [dep, Setdep] = useState(false);
  const [w_Not_Found, Setw_Not_Found] = useState(true);
  const [tdep, Settdep] = useState(false);
  const Navigate = useNavigate();
  const profile = useContext(user);
  let _tdata;
  var _data;
  if (profile.profile.mobile == "") {
    swal({
      title: "You Are Not Login,Plz Login",
      icon: "info",
      buttons: false,
      timer: 2000,
    });
  }
  useEffect(() => {
    async function getdata() {
      SetLoad(true);
      const _q = query(
        Wishlistdata,
        where("mobile", "==", profile.profile.mobile)
      );
      _tdata = await getDocs(_q);
      _tdata.forEach(async (doc) => {
        const d = doc.data();
        await Settedata((p) => [...p, d.movieid]);
        Settdep(!tdep);
      });
      SetLoad(false);
    }
    getdata();
  }, [dep]);
  useEffect(() => {
    async function k() {
      let _e = {
        record: true,
      };
      tedata.forEach(async (e) => {
        const _d = doc(db, "movie", e);
        _data = await getDoc(_d);
        _e = _data.data();
        console.log(typeof _e,_e,"llllllllll");
        await Setdata((p) => [...p, { ..._e, id: e }]);
        if (_e.record == false) {
          Setw_Not_Found(false);
        } else {
          Setw_Not_Found(true);
        }
      });
    }
    k();
  }, [tdep]);
  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex w-full  flex-wrap justify-between p-3 mt-2 text-white">
        {load ? (
          <div className="w-full flex justify-center items-center min-h-screen pb-8">
            {" "}
            <Puff color="white" />
          </div>
        ) : (
          <div className="w-full">
            {w_Not_Found ? (
              <div className="w-full flex flex-col items-center">
                <div className="w-full max-h-96 flex justify-center">
                  <div
                    id="cimgh"
                    className="flex justify-center relative w-full md:w-1/2 h-96 bg-[#1A1A1A] items-center"
                  >
                    <h4
                      hidden
                      id="thidden"
                      className="w-full text-center absolute text-xl h-11"
                    >
                      Tap To See All Review
                    </h4>
                    <Link to={`/details/${simg.id}`}>
                      <CardTDetail h={simg} />
                    </Link>
                  </div>
                </div>
                <div className="w-full flex flex-wrap justify-center">
                  {data.map((e, i) => {
                    return (
                      <div className="mx-2">
                        <div
                          onClick={() => {
                            setsimg(e);
                            document.getElementById("cimgh").style.display =
                              "block";
                          }}
                          onDoubleClick={() => {
                            Navigate(`/details/${e.id}`);
                          }}
                          key={i}
                          className="card bg-[#1A1A1A] font-medium transition-all duration-500 shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6"
                        >
                          <img
                            className=" h-60 md:h-72"
                            src={e.img}
                            alt="img not found"
                          />
                          <h1>{e.title}</h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="w-full justify-center flex">
                <h1 className="text-4xl mt-11">Your Wishlist Is Empty</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
