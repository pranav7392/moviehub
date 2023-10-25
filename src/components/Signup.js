import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { getDocs, addDoc, query, where } from "firebase/firestore";
import { Userdata } from "../firebase/Firebase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import app from "../firebase/Firebase";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
const Signup = () => {
  const Navigate = useNavigate();
  const [form, Setform] = useState({
    userName: "",
    mobile: "",
    password: "",
  });
  const auth = getAuth(app);
  const [loader, Setloader] = useState(false);
  const [visible, setvisible] = useState(true);
  const [t1, sett1] = useState(true);
  const [t2, sett2] = useState(true);
  const [otp, setotp] = useState("");
  const [smsg, setsmsg] = useState("Request Otp");
  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {},
    });
  };

  const requestOtp = () => {
    Setloader(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        Setloader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const btnclk = async () => {
    if (t1) {
      let d = false;
      if (form.userName != "" && form.mobile != "") {
        Setloader(true);
        const _q = query(Userdata, where("mobile", "==", form.mobile));
        const _data = await getDocs(_q);
        _data.forEach((e) => {
          d = true;
        });
        if (d != false) {
          sett1(true);
          swal({
            title: "You Are Existing user,Plz Login",
            icon: "info",
            buttons: false,
            timer: 2000,
          });
          Navigate("/login");
        } else {
          await requestOtp();
          await sett1(false);
          setsmsg("Verify Otp");
        }
        Setloader(false);
      } else {
        document.getElementById("hidden").hidden = false;
      }
      sett2(true);
    } else {
      if (t2) {
        try {
          Setloader(true);
          window.confirmationResult
            .confirm(otp)
            .then((result) => {
              sett2(false);
              Setloader(false);
              setsmsg("Register Data");
            })
            .catch((error) => {
              console.log(error);
              Setloader(false);
            });
        } catch (error) {
          console.log(error);
          Setloader(false);
        }
      } else {
        Setloader(true);
        await addDoc(Userdata, form);
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        Setloader(false);
        Navigate("/login");
      }
    }
  };
  return (
    <div className="mt-0">
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-0 text-white">
              <div className="flex justify-center">
                <div className="bd rounded-xl">
                  <button
                    onClick={() => {
                      Navigate("/login");
                    }}
                  >
                    <h1 className="m-2 text-xl">Login</h1>
                  </button>
                  <button className="bg-orange-500 rounded-xl">
                    <h1 className="m-2 text-xl">signup</h1>
                  </button>
                </div>
              </div>
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="text-red-500 flex justify-center text-center w-full">
              <h4 hidden id="hidden">
                All Feild Are Required
              </h4>
            </div>
            <div class="flex flex-wrap -m-2">
              {t1 ? (
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="name" class="leading-7 text-sm text-white">
                      name
                    </label>
                    <input
                      type="text"
                      id="name"
                      onClick={() => {
                        document.getElementById("hidden").hidden = true;
                      }}
                      onKeyUp={(e) => {
                        if (e.key == "Enter") {
                          btnclk();
                        }
                      }}
                      value={form.userName}
                      required
                      onChange={(e) =>
                        Setform({ ...form, userName: e.target.value })
                      }
                      name="name"
                      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div class="relative">
                    <label for="message" class="leading-7 text-sm text-white">
                      Mobile No
                    </label>
                    <input
                      required
                      onClick={() => {
                        document.getElementById("hidden").hidden = true;
                      }}
                      type="number"
                      id="mno"
                      value={form.mobile}
                      onKeyUp={(e) => {
                        if (e.key == "Enter") {
                          btnclk();
                        }
                      }}
                      onChange={(e) =>
                        Setform({ ...form, mobile: e.target.value })
                      }
                      name="mno"
                      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
              ) : (
                <div class="p-2 w-full">
                  {t2 ? (
                    <div class="relative">
                      <label for="message" class="leading-7 text-sm text-white">
                        OTP
                      </label>
                      <div className="w-full bg-white flex flex-row justify-center items-center">
                        <input
                          type="text"
                          required
                          onClick={() => {
                            document.getElementById("hidden").hidden = true;
                          }}
                          id="otp"
                          name="otp"
                          value={otp}
                          onKeyUp={(e) => {
                            if (e.key == "Enter") {
                              btnclk();
                            }
                          }}
                          onChange={(e) => setotp(e.target.value)}
                          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                  ) : (
                    <div class="relative">
                      <label for="message" class="leading-7 text-sm text-white">
                        password
                      </label>
                      <div className="w-full bg-white flex flex-row justify-center items-center">
                        <input
                          type="password"
                          required
                          onClick={() => {
                            document.getElementById("hidden").hidden = true;
                          }}
                          id="password"
                          name="password"
                          value={form.password}
                          onKeyUp={(e) => {
                            if (e.key == "Enter") {
                              btnclk();
                            }
                          }}
                          onChange={(e) =>
                            Setform({ ...form, password: e.target.value })
                          }
                          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <div
                          onClick={() => {
                            setvisible(!visible);
                            if (visible) {
                              document.getElementById("password").type = "text";
                            } else {
                              document.getElementById("password").type =
                                "password";
                            }
                          }}
                          className="m-1"
                        >
                          {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div class="p-2 w-full">
                <h3 className="text-white w-full justify-center text-center mb-5">
                  Allready Have Account? Please{" "}
                  <Link to={"/login"}>
                    <span className="text-blue-500">login</span>
                  </Link>
                </h3>
                <button
                  onClick={btnclk}
                  class="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-900 rounded text-lg"
                >
                  {loader ? (
                    <ThreeDots color="white" height={30} width={30} />
                  ) : (
                    <h1>{smsg}</h1>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="sign-in-button"></div>
    </div>
  );
};

export default Signup;
