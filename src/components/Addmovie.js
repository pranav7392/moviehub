import React, { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { Moviedata } from "../firebase/Firebase";
import { user } from "../App";
import swal from "sweetalert";

const Addmovie = () => {
  const profile = useContext(user);
  const [form, Setform] = useState({
    title: "",
    year: "",
    img: "",
    description: "",
    rating: 0,
    ratingcount: 0,
    uname: `${profile.profile.userName}`,
  });
  const [loader, Setloader] = useState(false);
  const btnclk = async () => {
    if (form.uname != "") {
      if (
        form.title != "" &&
        form.year != "" &&
        form.img != "" &&
        form.description != ""
      ) {
        Setloader(true);

        try {
          await addDoc(Moviedata, form);
          form.title = "";
          form.year = "";
          form.img = "";
          form.description = "";
          swal({
            title: "Succesfully Added",
            icon: "success",
            buttons: false,
            timer: 2000,
          });
        } catch (e) {
          swal({
            title: e,
            icon: "error",
            buttons: false,
            timer: 2000,
          });
        }
      } else {
        document.getElementById("movhidden").hidden = false;
      }
      Setloader(false);
    } else {
      swal({
        title: "You Are Not Login",
        icon: "info",
        buttons: false,
        timer: 2000,
      });
      document.getElementById("movhidden").hidden = true;
    }
  };
  return (
    <div className="mt-0">
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-0 text-white">
              Add New Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex justify-center w-full text-center">
              <h4 hidden id="movhidden" className="text-red-500">
                All Field Are Required
              </h4>
            </div>
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-white">
                    title
                  </label>
                  <input
                    type="text"
                    onClick={() => {
                      document.getElementById("movhidden").hidden = true;
                    }}
                    id="name"
                    value={form.title}
                    onChange={(e) =>
                      Setform({ ...form, title: e.target.value })
                    }
                    name="name"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label class="leading-7 text-sm text-white">Year</label>
                  <input
                    type="number"
                    id="year"
                    value={form.year}
                    onClick={() => {
                      document.getElementById("movhidden").hidden = true;
                    }}
                    onChange={(e) => Setform({ ...form, year: e.target.value })}
                    name="year"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-white">
                    Image Link
                  </label>
                  <textarea
                    id="imglink"
                    value={form.img}
                    onClick={() => {
                      document.getElementById("movhidden").hidden = true;
                    }}
                    onChange={(e) => Setform({ ...form, img: e.target.value })}
                    name="img"
                    class="w-full h-11 bg-white rounded border border-gray-300 focus:border-indigo-500    focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-white">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="Description"
                    onClick={() => {
                      document.getElementById("movhidden").hidden = true;
                    }}
                    value={form.description}
                    onChange={(e) =>
                      Setform({ ...form, description: e.target.value })
                    }
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500    focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={btnclk}
                  class="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-900 rounded text-lg"
                >
                  {loader ? (
                    <ThreeDots color="white" height={30} width={30} />
                  ) : (
                    "Add Movie"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
