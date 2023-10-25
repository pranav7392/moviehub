import React, { useState } from "react";
import swal from "sweetalert";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import app from "../firebase/Firebase";
const Forgotpassword = (t) => {
  const auth = getAuth(app);
  const [pass1, setpass1] = useState("");
  const [pass2, setpass2] = useState("");
  const [otp, setotp] = useState("");
  const [votp, setvotp] = useState(true);
  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {},
    });
  };

  const requestOtp = () => {
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${t.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      })
      .catch((error) => {
        swal({
          text: "Invalid No or Password",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
        console.log(error);
      });
  };
  async function btnclk() {
    if (votp) {
      if (pass1 == "" && pass2 == "") {
        swal({
          text: "All Field Are Required",
          icon: "info",
          buttons: false,
          timer: 3000,
        });
      } else {
        if (pass1 != pass2) {
          swal({
            text: "Entered Both Password Are Different",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
          setpass1("");
          setpass2("");
        } else {
          requestOtp();
          setvotp(false);
        }
      }
    } else {
      try {
        window.confirmationResult
          .confirm(otp)
          .then(async (result) => {
            await updateDoc(doc(db, "users", t.id), {
              password: pass1,
            });
            swal({
              text: "password Updated",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            t.setforgot(true);
          })
          .catch((error) => {
            swal({
              text: "Otp Not Match",
              icon: "error",
              buttons: false,
              timer: 3000,
            });
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-3/5 mt-11">
        {votp ? (
          <div>
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-white">
                Enter New Password
              </label>
              <div className="w-full bg-white flex flex-row justify-center items-center">
                <input
                  type="password"
                  value={pass1}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      btnclk();
                    }
                  }}
                  onChange={(e) => setpass1(e.target.value)}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-white">
                Conform Password
              </label>
              <div className="w-full bg-white flex flex-row justify-center items-center">
                <input
                  type="text"
                  value={pass2}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      btnclk();
                    }
                  }}
                  onChange={(e) => setpass2(e.target.value)}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-white">
                Enter Otp
              </label>
              <div className="w-full bg-white flex flex-row justify-center items-center">
                <input
                  type="text"
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
          </div>
        )}
        <div className="w-full flex justify-center mt-11">
          <button
            onClick={btnclk}
            className="p-4 py-2 rounded-lg bg-orange-500 text-white"
          >
            {votp ? "Sent Otp" : "Verify Otp"}
          </button>
        </div>
      </div>
      <div id="sign-in-button"></div>
    </div>
  );
};

export default Forgotpassword;
