import React, { useEffect, useState, useContext } from "react";
import ReactStars from "react-stars";
import { user } from "../App";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ThreeDots, Vortex } from "react-loader-spinner";
import {
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { Wishlistdata, Reviewdata, db } from "../firebase/Firebase";
import swal from "sweetalert";
const Review = (id) => {
  const profile = useContext(user);
  const Navigate = useNavigate();
  const [loader, Setloader] = useState(false);
  const [di, setdi] = useState("");
  const [dep, setdep] = useState(true);
  const [review, setreview] = useState([]);
  const [load, SetLoad] = useState(false);
  const [wishlist_b, Setwishlist_b] = useState(false);
  const wform = {
    mobile: `${profile.profile.mobile}`,
    movieid: id.id,
  };
  const [form, Setform] = useState({
    Username: `${profile.profile.userName}`,
    review: "",
    movieid: id.id,
    date: new Date().toLocaleString(),
    rating: 0,
  });
  async function h() {
    if (profile.profile.mobile != "") {
      let _d = {
        value: false,
      };
      const _z = query(Wishlistdata, where("mobile", "==", wform.mobile));
      _d = await getDocs(_z);
      _d.forEach((doc) => {
        if (doc.data().movieid == id.id) {
          Setwishlist_b(true);
          setdi(doc.id);
        }
      });
    }
  }

  useEffect(() => {
    async function getdata() {
      await setreview([]);
      SetLoad(true);
      const _q = query(Reviewdata, where("movieid", "==", id.id));
      const _data = await getDocs(_q);
      _data.forEach((doc) => {
        setreview((p) => [...p, { ...doc.data() }]);
      });
      SetLoad(false);
    }
    h();
    getdata();
  }, [dep]);
  async function Wishlist() {
    if (profile.profile.mobile != "") {
      setdep(!dep);
      if (wishlist_b) {
        await deleteDoc(doc(db, "wishlist", di));
        Setwishlist_b(false);
      } else {
        await addDoc(Wishlistdata, wform);
        Setwishlist_b(true);
      }
    } else {
      swal({
        title: "Please Login First",
        icon: "info",
        buttons: false,
        timer: 2000,
      });
      Navigate("/login");
    }
  }
  const reviewsent = async () => {
    if (profile.profile.mobile != "") {
      Setloader(true);
      await addDoc(Reviewdata, form);
      swal({
        title: "Thank You",
        icon: "success",
        buttons: false,
        timer: 2000,
      });
      Setform({ ...form, review: "" });
      Setloader(false);
      setdep(!dep);
      if (form.rating != 0) {
        await updateDoc(doc(db, "movie", id.id), {
          rating:
            (id.rating * id.ratingcount + form.rating) / (id.ratingcount + 1),
          ratingcount: id.ratingcount + 1,
        });
      }
    } else {
      swal({
        title: "You Are Not Login",
        icon: "info",
        buttons: false,
        timer: 2000,
      });
    }
  };
  return (
    <div className="mt-5 pl-4">
      <div className="w-full flex justify-between items-center">
        <ReactStars
          className=""
          value={form.rating}
          half={true}
          edit={true}
          size={50}
          onChange={(e) => Setform({ ...form, rating: e })}
        />
        <button className="text-orange-300" onClick={Wishlist}>
          {wishlist_b ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
      </div>
      <div className="flex flex-col sticky top-[65px]">
        <input
          className="w-full h-10 bg-gray-900 text-center outline-none"
          type="text"
          value={form.review}
          onChange={(e) =>
            Setform({
              ...form,
              review: e.target.value,
              date: new Date().toLocaleString(),
            })
          }
          placeholder="add your review"
        />
        <button
          onClick={reviewsent}
          className="w-full h-9 text-white bg-orange-400"
        >
          {loader ? (
            <div className="w-full flex text-center justify-center">
              <ThreeDots color="white" height={30} width={30} />
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
      <div className="mt-7">
        {load ? (
          <div className="w-full flex justify-center items-center h-2">
            <Vortex
              height={50}
              colors={["white", "white", "white", "white", "white", "white"]}
            />
          </div>
        ) : (
          review.map((e, id) => {
            return (
              <div className="mb-3">
                <div className="flex justify-between text-green-200">
                  <h4>{e.date}</h4>
                  <ReactStars
                    className="-z-10"
                    value={e.rating}
                    half={true}
                    size={20}
                  />
                </div>
                <div>
                  <p className="mb-1">{e.review}</p>
                  <h4 className="flex justify-end text-green-200">{e.Username}</h4>
                </div>
                <hr />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Review;