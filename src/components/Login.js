import React, { useState, useContext } from "react";
import { user } from "../App";
import { ThreeDots } from "react-loader-spinner";
import { getDocs, query, where } from "firebase/firestore";
import { Userdata } from "../firebase/Firebase";
import swal from "sweetalert";
import Forgotpassword from "./Forgotpassword";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const profile = useContext(user);
  const Navigate = useNavigate();
  const [mno, Setmno] = useState("");
  const [tpass, Setpass] = useState("");
  const [uid, Setuid] = useState("");
  const [smsg, Setsmsg] = useState("Find Record");
  const [loader, Setloader] = useState(false);
  const [visible, setvisible] = useState(true);
  const [forgot, setforgot] = useState(true);
  const btnclk = async () => {
    if (mno != "") {
      Setloader(true);
      let d = {
        record: false,
      };
      console.log();
      const _q = query(Userdata, where("mobile", "==", mno));
      const _data = await getDocs(_q);
      _data.forEach((e) => {
        d = { ...e.data(), record: true, userid: e.id };
        Setuid(e.id);
      });
      Setloader(false);
      if (d.record == false) {
        Setmno("");
        Setsmsg("FInd Record");
        document.getElementById("passhidden").hidden = true;
        swal({
          title: "Record Not Found",
          icon: "error",
          buttons: false,
          timer: 2000,
        });
        Navigate("/signup");
      } else {
        document.getElementById("th").hidden = true;
        document.getElementById("passhidden").hidden = false;
        Setsmsg("Login");
        if (d.password == tpass) {
          profile.SetProfile(d);
          swal({
            title: "You Are All Set",
            icon: "success",
            buttons: false,
            timer: 2000,
          });
          Navigate("/");
        } else {
          if (tpass != "") {
            swal({
              title: "Password Does Not Match",
              icon: "error",
              buttons: false,
              timer: 2000,
            });
            Setpass("");
            Setsmsg("Find Record");
            document.getElementById("passhidden").hidden = true;
          } else {
          }
        }
      }
    } else {
      document.getElementById("th").hidden = false;
    }
  };
  return (
    <div className="mt-0">
      {forgot ? (
        <section class="text-gray-600 body-font relative">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-12">
              <h1 class="sm:text-3xl text-xl font-medium title-font mb-0 text-white">
                <div className="flex justify-center">
                  <div className="bd rounded-xl">
                    <button className="bg-orange-500 rounded-xl">
                      <h1 className="m-2 text-xl">Login</h1>
                    </button>
                    <button
                      onClick={() => {
                        Navigate("/signup");
                      }}
                    >
                      <h1 className="m-2 text-xl">signup</h1>
                    </button>
                  </div>
                </div>
              </h1>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2">
                <div class="p-2 w-full">
                  <div className="text-red-500 flex text-center w-full justify-center">
                    <h4 id="th" hidden>
                      All Feild Is Required
                    </h4>
                  </div>
                  <div class="relative">
                    <label for="Mobile no" class="leading-7 text-sm text-white">
                      Mobile No.
                    </label>
                    <input
                      type="number"
                      value={mno}
                      onClick={() => {
                        document.getElementById("th").hidden = true;
                      }}
                      onChange={(e) => Setmno(e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key == "Enter") {
                          btnclk();
                        }
                      }}
                      name="Mobileno"
                      class="w-full h-11 bg-white rounded border border-gray-300 focus:border-indigo-500    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></input>
                  </div>
                  <div id="passhidden" hidden class="relative mt-5">
                    <label for="password" class="leading-7 text-sm text-white">
                      Password
                    </label>
                    <div className="w-full bg-white flex flex-row justify-center items-center">
                      <input
                        id="p"
                        type="password"
                        autoFocus
                        value={tpass}
                        onClick={() => {
                          document.getElementById("th").hidden = true;
                        }}
                        onChange={(e) => Setpass(e.target.value)}
                        onKeyUp={(e) => {
                          if (e.key == "Enter") {
                            btnclk();
                          }
                        }}
                        name="password"
                        class="w-full h-11 bg-white rounded border border-gray-300 focus:border-indigo-500    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      />
                      <div
                        onClick={() => {
                          setvisible(!visible);
                          if (visible) {
                            document.getElementById("p").type = "text";
                          } else {
                            document.getElementById("p").type = "password";
                          }
                        }}
                        className="m-1"
                      >
                        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setforgot(false);
                      }}
                      className="w-full flex text-right justify-end cursor-pointer mt-2 float-right"
                    >
                      <h1 className="text-blue-500">Forgotpassword</h1>
                    </div>
                  </div>
                </div>
                <div class="p-2 w-full">
                  <h3 className="text-white w-full justify-center text-center mb-5">
                    Don't Have Account? Please{" "}
                    <Link to={"/signup"}>
                      <span className="text-blue-500">signup</span> First
                    </Link>
                  </h3>
                  <button
                    onClick={btnclk}
                    class="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-900 rounded text-lg"
                  >
                    {loader ? (
                      <ThreeDots color="white" height={30} width={30} />
                    ) : (
                      `${smsg}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Forgotpassword mobile={mno} id={uid} setforgot={setforgot} />
      )}
    </div>
  );
};

export default Login;
